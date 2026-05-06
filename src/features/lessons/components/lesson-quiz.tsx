"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/auth-context";
import {
  applyLessonContentOverride,
  getLessonContentOverride,
} from "@/features/lessons/content-override";
import {
  listenUserLessonSubmissions,
  submitLessonForReview,
  type LessonSubmission,
} from "@/features/lessons/firebase-progress";
import {
  enqueueOfflineLessonSubmission,
  flushOfflineLessonSubmissions,
  hasOfflineLessonSubmission,
  removeOfflineLessonSubmission,
} from "@/features/lessons/offline-submissions";
import { getUnlockedLessonIds } from "@/features/lessons/progression";
import { trackAnalyticsEvent } from "@/features/analytics/firebase-analytics";

import type { Lesson } from "../types";

type LessonQuizProps = {
  lesson: Lesson;
  courseLessonIds?: string[];
};

export function LessonQuiz({ lesson, courseLessonIds }: LessonQuizProps) {
  const router = useRouter();
  const { authUser } = useAuth();
  const [submissions, setSubmissions] = useState<LessonSubmission[]>([]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [reflectionAnswers, setReflectionAnswers] = useState<string[]>(["", "", ""]);
  const [studentQuestion, setStudentQuestion] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [lessonContent, setLessonContent] = useState<Lesson>(lesson);
  const [offlineQueueVersion, setOfflineQueueVersion] = useState(0);
  const lessonStartedRef = useRef(false);
  const lessonSubmittedRef = useRef(false);

  const answeredCount = Object.keys(selected).length;
  const allAnswered = answeredCount === lessonContent.questions.length;

  const score = useMemo(
    () =>
      lessonContent.questions.reduce((total, question) => {
        const selectedOptionId = selected[question.id];
        const selectedOption = question.options.find((option) => option.id === selectedOptionId);
        return selectedOption?.isCorrect ? total + 1 : total;
      }, 0),
    [lessonContent.questions, selected]
  );
  const allReflectionAnswered = reflectionAnswers.every((answer) => answer.trim().length > 0);

  useEffect(() => {
    void getLessonContentOverride(lesson.id)
      .then((override) => setLessonContent(applyLessonContentOverride(lesson, override)))
      .catch(() => null);
  }, [lesson]);

  useEffect(() => {
    if (!authUser) return;
    const unsubscribe = listenUserLessonSubmissions(authUser.uid, (items) => {
      setSubmissions(items);
    });
    return () => unsubscribe();
  }, [authUser]);

  const hasPendingOfflineSubmission = useMemo(() => {
    const version = offlineQueueVersion;
    void version;
    if (!authUser) {
      return false;
    }
    return hasOfflineLessonSubmission(authUser.uid, lesson.id);
  }, [authUser, lesson.id, offlineQueueVersion]);

  const unlockedLessonIds = useMemo(
    () =>
      getUnlockedLessonIds({
        lessonIds: courseLessonIds ?? [lesson.id],
        submissions,
      }),
    [courseLessonIds, lesson.id, submissions]
  );
  const isUnlocked = unlockedLessonIds.has(lesson.id);
  const currentSubmission = submissions.find((item) => item.lessonId === lesson.id);
  const currentStatus = currentSubmission?.status ?? null;

  useEffect(() => {
    if (!authUser || lessonStartedRef.current) return;
    lessonStartedRef.current = true;
    void trackAnalyticsEvent({
      event: "lesson_start",
      uid: authUser.uid,
      lessonId: lesson.id,
      lessonNumber: lesson.lessonNumber,
      courseName: lesson.courseName,
      metadata: {
        totalQuestions: lessonContent.questions.length,
      },
    }).catch(() => null);
  }, [authUser, lesson.courseName, lesson.id, lesson.lessonNumber, lessonContent.questions.length]);

  useEffect(() => {
    return () => {
      if (!authUser || lessonSubmittedRef.current) return;
      const hasWorkInProgress =
        Object.keys(selected).length > 0 ||
        reflectionAnswers.some((item) => item.trim().length > 0) ||
        studentQuestion.trim().length > 0;
      if (!hasWorkInProgress) return;
      void trackAnalyticsEvent({
        event: "lesson_abandon",
        uid: authUser.uid,
        lessonId: lesson.id,
        lessonNumber: lesson.lessonNumber,
        courseName: lesson.courseName,
      }).catch(() => null);
    };
  }, [authUser, lesson.courseName, lesson.id, lesson.lessonNumber, reflectionAnswers, selected, studentQuestion]);

  useEffect(() => {
    if (!authUser) return;

    const syncPendingSubmissions = async () => {
      const result = await flushOfflineLessonSubmissions(authUser.uid);
      setOfflineQueueVersion((prev) => prev + 1);
      if (result.synced > 0) {
        setFeedback(
          `Se sincronizaron ${result.synced} envio(s) pendiente(s) al recuperar conexion.`
        );
      }
    };

    void syncPendingSubmissions();

    const handleOnline = () => {
      void syncPendingSubmissions();
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [authUser, lesson.id]);

  async function completeLesson() {
    if (!authUser || !allAnswered || !allReflectionAnswered || !isUnlocked) {
      return;
    }

    setSaving(true);
    setFeedback("");
    const normalizedReflectionAnswers: [string, string, string] = [
      reflectionAnswers[0]?.trim() ?? "",
      reflectionAnswers[1]?.trim() ?? "",
      reflectionAnswers[2]?.trim() ?? "",
    ];

    try {
      const result = await submitLessonForReview({
        uid: authUser.uid,
        lessonId: lesson.id,
        lessonNumber: lesson.lessonNumber,
        courseName: lesson.courseName,
        lessonTitle: lessonContent.title,
        reflectionAnswers: normalizedReflectionAnswers,
        studentQuestion,
        pointsReward: lessonContent.pointsReward,
        score,
        total: lessonContent.questions.length,
      });
      removeOfflineLessonSubmission(authUser.uid, lesson.id);
      setOfflineQueueVersion((prev) => prev + 1);

      if (result.alreadyApproved) {
        setFeedback(
          "Esta lección ya fue aprobada por administración. Ya no requiere nueva revisión."
        );
      } else {
        setFeedback(
          "Lección enviada a revisión. El admin revisará tus respuestas abiertas y te asignará puntos al aprobar."
        );
      }
      lessonSubmittedRef.current = true;
      await trackAnalyticsEvent({
        event: "lesson_submit",
        uid: authUser.uid,
        lessonId: lesson.id,
        lessonNumber: lesson.lessonNumber,
        courseName: lesson.courseName,
        metadata: {
          score,
          total: lessonContent.questions.length,
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado";
      const offlineDetected =
        (typeof navigator !== "undefined" && !navigator.onLine) ||
        /network|offline|failed|unavailable/i.test(message);

      if (offlineDetected) {
        enqueueOfflineLessonSubmission({
          uid: authUser.uid,
          lessonId: lesson.id,
          lessonNumber: lesson.lessonNumber,
          courseName: lesson.courseName,
          lessonTitle: lessonContent.title,
          reflectionAnswers: normalizedReflectionAnswers,
          studentQuestion,
          pointsReward: lessonContent.pointsReward,
          score,
          total: lessonContent.questions.length,
        });
        lessonSubmittedRef.current = true;
        setOfflineQueueVersion((prev) => prev + 1);
        setFeedback(
          "No hay conexion. Tu envio quedo guardado localmente y se sincronizara al reconectar."
        );
      } else {
        setFeedback(`No se pudo guardar el progreso: ${message}`);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {lessonContent.questions.map((question, index) => {
        const selectedOptionId = selected[question.id];
        const selectedOption = question.options.find((option) => option.id === selectedOptionId);

        return (
          <article key={question.id} className="rounded-xl border border-black/10 bg-white p-6">
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Pregunta {index + 1}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900">{question.question}</h3>

            <div className="mt-4 space-y-3">
              {question.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setSelected((prev) => ({
                        ...prev,
                        [question.id]: option.id,
                      }))
                    }
                    className={
                      isSelected
                        ? "w-full rounded-lg border border-zinc-900 bg-zinc-900 px-4 py-3 text-left text-white"
                        : "w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-left text-zinc-800 hover:bg-zinc-50"
                    }
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>

            {selectedOption ? (
              <div className="mt-4 rounded-lg bg-zinc-100 p-4">
                <p className="text-sm font-medium text-zinc-900">
                  {selectedOption.isCorrect ? "Respuesta correcta" : "Respuesta incorrecta"}
                </p>
                <p className="mt-1 text-sm text-zinc-700">{question.explanation}</p>
              </div>
            ) : null}
          </article>
        );
      })}

      <section className="rounded-xl border border-black/10 bg-white p-6">
        <h3 className="text-lg font-semibold text-zinc-900">
          Respuestas abiertas para revisión
        </h3>
        <p className="mt-1 text-sm text-zinc-700">
          Estas 3 respuestas son las que revisará el administrador.
        </p>

        <div className="mt-4 space-y-4">
          {lesson.reflectionPrompts.map((prompt, index) => (
            <label key={`${lesson.id}-reflection-${index + 1}`} className="block">
              <p className="text-sm font-medium text-zinc-800">
                Pregunta abierta {index + 1}
              </p>
              <p className="mt-1 text-sm text-zinc-700">{prompt}</p>
              <textarea
                value={reflectionAnswers[index]}
                onChange={(event) =>
                  setReflectionAnswers((prev) => {
                    const next = [...prev];
                    next[index] = event.target.value;
                    return next;
                  })
                }
                className="mt-2 min-h-24 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-indigo-300 focus:ring"
                placeholder="Escribe tu respuesta..."
              />
            </label>
          ))}
        </div>

        <label className="mt-4 block">
          <p className="text-sm font-medium text-zinc-800">
            ¿Tienes alguna pregunta para el profesor/admin? (opcional)
          </p>
          <textarea
            value={studentQuestion}
            onChange={(event) => setStudentQuestion(event.target.value)}
            className="mt-2 min-h-20 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-indigo-300 focus:ring"
            placeholder="Escribe aquí tu duda..."
          />
        </label>
      </section>

      <section className="rounded-xl border border-black/10 bg-white p-6">
        {!isUnlocked ? (
          <p className="mb-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm font-medium text-amber-900">
            Esta lección está bloqueada. Debes aprobar la lección anterior para continuar.
          </p>
        ) : null}
        <p className="text-sm text-zinc-700">
          Respondidas: {answeredCount}/{lessonContent.questions.length}
        </p>
        <p className="mt-1 text-sm text-zinc-700">
          Respuestas abiertas completadas:{" "}
          {reflectionAnswers.filter((item) => item.trim().length > 0).length}/3
        </p>
        <p className="mt-1 text-sm text-zinc-700">
          Recompensa al completar: {lesson.pointsReward} puntos
        </p>

        <p className="mt-1 text-sm text-zinc-700">
          Estado de revisión:{" "}
          <span className="font-semibold">
            {currentStatus === "approved"
              ? "Aprobada"
              : currentStatus === "pending"
                ? "Pendiente de revisión admin"
                : currentStatus === "rejected"
                  ? "Necesita mejora (rechazada)"
                  : "Sin enviar"}
          </span>
        </p>
        {hasPendingOfflineSubmission ? (
          <p className="mt-1 text-sm font-medium text-amber-700">
            Tienes un envio offline pendiente de sincronizacion para esta leccion.
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!allAnswered || !allReflectionAnswered || saving || !isUnlocked}
            onClick={completeLesson}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Enviando..." : "Enviar para revisión"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-800"
          >
            Volver al menu
          </button>
        </div>

        {feedback ? <p className="mt-4 text-sm font-medium text-zinc-900">{feedback}</p> : null}
      </section>
    </div>
  );
}
