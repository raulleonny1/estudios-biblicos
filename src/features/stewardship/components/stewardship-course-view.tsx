"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Baby,
  BookOpen,
  CheckCircle2,
  Crown,
  Sparkles,
  Star,
  User,
  UserRound,
  Users,
} from "lucide-react";

import { MainNav } from "@/components/layout/main-nav";
import { useAuth } from "@/features/auth/auth-context";
import { getLessonCardMeta } from "@/features/lessons/lesson-card-meta";
import {
  listenUserLessonSubmissions,
  type LessonSubmission,
} from "@/features/lessons/firebase-progress";
import { getUnlockedLessonIds } from "@/features/lessons/progression";
import type { Study } from "@/features/studies/types";
import { stewardshipLessons } from "@/features/stewardship/data/lessons";

type StewardshipCourseViewProps = {
  study: Study;
};

export function StewardshipCourseView({ study }: StewardshipCourseViewProps) {
  const router = useRouter();
  const { authUser, profile, loading } = useAuth();
  const [submissions, setSubmissions] = useState<LessonSubmission[]>([]);

  useEffect(() => {
    if (!loading && !authUser) {
      router.replace("/");
    }
  }, [authUser, loading, router]);

  useEffect(() => {
    if (!authUser) return;
    const unsubscribe = listenUserLessonSubmissions(authUser.uid, (items) => {
      setSubmissions(items);
    });
    return () => unsubscribe();
  }, [authUser]);

  const approvedLessons = useMemo(
    () => submissions.filter((item) => item.status === "approved"),
    [submissions]
  );
  const approvedCount = approvedLessons.length;
  const totalStudies = stewardshipLessons.length;
  const progressPercent = Math.round((approvedCount / totalStudies) * 100);
  const earnedCoursePoints = approvedLessons.reduce((total, item) => total + item.pointsReward, 0);
  const levelStages = useMemo(() => {
    const childThreshold = Math.max(1, Math.ceil(totalStudies * 0.25));
    const teenThreshold = Math.max(childThreshold + 1, Math.ceil(totalStudies * 0.55));
    const youthThreshold = totalStudies;

    return [
      {
        id: "baby",
        label: "Bebé",
        emoji: "👶",
        description: "Iniciando tu camino",
        minApproved: 0,
        icon: Baby,
        palette: "from-amber-400 via-orange-400 to-rose-400",
      },
      {
        id: "child",
        label: "Niño",
        emoji: "🧒",
        description: "Aprendiendo con constancia",
        minApproved: childThreshold,
        icon: UserRound,
        palette: "from-sky-400 via-cyan-400 to-blue-500",
      },
      {
        id: "teen",
        label: "Adolescente",
        emoji: "🧑‍🎓",
        description: "Creciendo en madurez",
        minApproved: teenThreshold,
        icon: Users,
        palette: "from-violet-400 via-fuchsia-400 to-purple-500",
      },
      {
        id: "young",
        label: "Joven",
        emoji: "🧑",
        description: "Meta de formación completada",
        minApproved: youthThreshold,
        icon: User,
        palette: "from-emerald-400 via-teal-400 to-cyan-500",
      },
    ];
  }, [totalStudies]);

  const currentStage =
    [...levelStages].reverse().find((stage) => approvedCount >= stage.minApproved) ?? levelStages[0];
  const unlockedLessonIds = useMemo(
    () =>
      getUnlockedLessonIds({
        lessonIds: stewardshipLessons.map((item) => item.id),
        submissions,
      }),
    [submissions]
  );

  if (loading || !authUser || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-zinc-700">Cargando...</p>
      </main>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 via-indigo-50 to-sky-50 font-sans">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />
      <MainNav />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <Link href="/dashboard" className="text-sm text-zinc-600 transition hover:text-zinc-900">
          Volver al dashboard
        </Link>

        <section className="mt-4 overflow-hidden rounded-3xl border border-white/40 bg-white/90 p-6 shadow-xl shadow-indigo-100/60 backdrop-blur-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                <BookOpen size={12} />
                Curso de mayordomía
              </p>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                {study.title}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-zinc-700">{study.summary}</p>
              <p className="mt-2 text-sm font-medium text-zinc-900">
                Pasaje base: <span className="text-zinc-700">{study.keyVerse}</span>
              </p>
            </div>

            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-[1px] shadow-lg">
              <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3">
                <div className="rounded-xl bg-gradient-to-br from-amber-300 to-orange-400 p-2 text-white">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    Nivel actual
                  </p>
                  <p className="text-sm font-bold text-zinc-900">
                    {currentStage.emoji} {currentStage.label}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-indigo-100/60 p-4">
              <p className="text-xs uppercase tracking-wide text-indigo-700/80">Estudios aprobados</p>
              <p className="mt-1 text-2xl font-extrabold text-indigo-900">
                {approvedCount}/{totalStudies}
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-100/60 p-4">
              <p className="text-xs uppercase tracking-wide text-emerald-700/80">Puntos en este curso</p>
              <p className="mt-1 text-2xl font-extrabold text-emerald-700">+{earnedCoursePoints}</p>
            </div>
            <div className="rounded-2xl border border-fuchsia-100 bg-gradient-to-br from-fuchsia-50 to-rose-100/60 p-4">
              <p className="text-xs uppercase tracking-wide text-fuchsia-700/80">Avance general</p>
              <p className="mt-1 text-2xl font-extrabold text-fuchsia-700">{progressPercent}%</p>
            </div>
          </div>

          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-zinc-200/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wide text-zinc-700">
                Evolución de niveles
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                <Star size={12} fill="currentColor" />
                Sigue avanzando
              </span>
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              {levelStages.map((stage) => {
                const unlocked = approvedCount >= stage.minApproved;
                const isCurrent = stage.id === currentStage.id;
                const StageIcon = stage.icon;

                return (
                  <article
                    key={stage.id}
                    className={`rounded-2xl border p-4 transition ${
                      isCurrent
                        ? "border-transparent bg-white shadow-lg ring-2 ring-indigo-300"
                        : unlocked
                          ? "border-zinc-200 bg-white shadow-sm"
                          : "border-zinc-200 bg-zinc-50/80 opacity-80"
                    }`}
                  >
                    <div
                      className={`mb-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-3 py-2 text-sm font-bold text-white ${stage.palette}`}
                    >
                      <StageIcon size={16} />
                      {stage.emoji} {stage.label}
                    </div>
                    <p className="text-xs text-zinc-600">{stage.description}</p>
                    <p className="mt-2 text-xs font-semibold text-zinc-500">
                      Requiere: {stage.minApproved}/{totalStudies} aprobadas
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold">
                      {unlocked ? (
                        <>
                          <CheckCircle2 size={14} className="text-emerald-600" />
                          <span className="text-emerald-700">Desbloqueado</span>
                        </>
                      ) : (
                        <>
                          <Crown size={14} className="text-zinc-400" />
                          <span className="text-zinc-500">Por desbloquear</span>
                        </>
                      )}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 sm:grid-cols-2">
          {stewardshipLessons.map((lesson) => {
            const isUnlocked = unlockedLessonIds.has(lesson.id);
            const submission = submissions.find((item) => item.lessonId === lesson.id);
            const status = submission?.status ?? null;
            const lessonMeta = getLessonCardMeta(lesson);
            const statusStyles =
              status === "approved"
                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                : status === "pending"
                  ? "bg-amber-100 text-amber-700 border-amber-200"
                  : status === "rejected"
                    ? "bg-rose-100 text-rose-700 border-rose-200"
                    : "bg-zinc-100 text-zinc-600 border-zinc-200";

            return (
              <article
                key={lesson.id}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white/95 shadow-md shadow-zinc-200/60 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className={`bg-gradient-to-r p-4 text-white shadow-inner shadow-black/10 ${lessonMeta.gradient}`}>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-white/40 bg-black/15 px-3 py-1 text-xs font-semibold">
                        Estudio {lesson.lessonNumber}
                      </span>
                      <span className="rounded-full border border-white/40 bg-black/15 px-3 py-1 text-xs font-semibold">
                        +{lesson.pointsReward} pts
                      </span>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/40 bg-black/20 text-xl">
                      {lessonMeta.illustration}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold">{lesson.title}</h2>
                  <p className="mt-1 text-sm text-white/95">{lesson.subtitle}</p>
                </div>

                <div className="p-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isUnlocked ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      <BookOpen size={12} />
                      {isUnlocked ? "Disponible" : "Bloqueado"}
                    </span>
                    <p
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${statusStyles}`}
                    >
                      {status === "approved"
                        ? "Aprobado"
                        : status === "pending"
                          ? "Pendiente de revisión"
                          : status === "rejected"
                            ? "Rechazado, puedes reenviar"
                            : "Sin enviar"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
                      Objetivo principal
                    </p>
                    <p className="mt-1 text-sm font-medium leading-6 text-indigo-900">
                      {lessonMeta.objective}
                    </p>
                  </div>

                  <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">
                    Pasaje principal: <span className="text-amber-800">{lessonMeta.keyPassage}</span>
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={isUnlocked ? `/mayordomia/lecciones/${lesson.id}` : "#"}
                      aria-disabled={!isUnlocked}
                      className={`inline-flex rounded-md px-4 py-2 text-sm font-medium text-white transition ${
                        isUnlocked
                          ? "bg-zinc-900 hover:bg-indigo-700"
                          : "cursor-not-allowed bg-zinc-400 opacity-70"
                      }`}
                    >
                      Abrir estudio
                    </Link>
                    <Link
                      href={isUnlocked ? `/mayordomia/lecciones/${lesson.id}/reforzar` : "#"}
                      aria-disabled={!isUnlocked}
                      className={`inline-flex rounded-md px-4 py-2 text-sm font-medium text-white transition ${
                        isUnlocked
                          ? "bg-zinc-900 hover:bg-indigo-700"
                          : "cursor-not-allowed bg-zinc-400 opacity-70"
                      }`}
                    >
                      Reforzar lo aprendido
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
