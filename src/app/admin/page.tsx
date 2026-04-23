"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Gift, Megaphone, Star } from "lucide-react";

import { MainNav } from "@/components/layout/main-nav";
import {
  createAnnouncement,
  listenAnnouncements,
  removeAnnouncement,
  setAnnouncementPublished,
} from "@/features/announcements/firebase-announcements";
import type {
  Announcement,
  AnnouncementAudience,
  AnnouncementKind,
} from "@/features/announcements/types";
import { useAuth } from "@/features/auth/auth-context";
import { listUsers } from "@/features/auth/firebase-user";
import type { UserProfile } from "@/features/auth/types";
import {
  listenAllLessonSubmissions,
  reviewLessonSubmission,
  type LessonSubmission,
} from "@/features/lessons/firebase-progress";

export default function AdminPage() {
  const router = useRouter();
  const { authUser, profile, loading, isAdminMasterSession } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [error, setError] = useState("");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [announcementsError, setAnnouncementsError] = useState("");
  const [savingAnnouncement, setSavingAnnouncement] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    message: "",
    kind: "event" as AnnouncementKind,
    audience: "all" as AnnouncementAudience,
    targetUserId: "",
    ctaLabel: "",
    ctaUrl: "",
    startAt: "",
    endAt: "",
    isPublished: true,
  });
  const [submissions, setSubmissions] = useState<LessonSubmission[]>([]);
  const [reviewLoadingId, setReviewLoadingId] = useState("");

  function datetimeLocalToIso(value: string) {
    if (!value.trim()) {
      return null;
    }
    return new Date(value).toISOString();
  }

  function isoToDatetimeLocal(value: string | null) {
    if (!value) {
      return "";
    }
    return value.slice(0, 16);
  }

  useEffect(() => {
    if (!loading && !authUser) {
      router.replace("/");
      return;
    }

    if (!loading && (!isAdminMasterSession || profile?.role !== "admin")) {
      router.replace("/dashboard");
    }
  }, [authUser, isAdminMasterSession, loading, profile?.role, router]);

  useEffect(() => {
    if (profile?.role !== "admin") {
      return;
    }

    async function loadUsers() {
      setError("");
      try {
        const data = await listUsers();
        setUsers(data);
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : "Error inesperado";
        setError(message);
      }
    }

    void loadUsers();
  }, [profile?.role]);

  useEffect(() => {
    if (profile?.role !== "admin") {
      return;
    }

    const unsubscribe = listenAnnouncements((items) => {
      setAnnouncements(items);
    });

    return () => unsubscribe();
  }, [profile?.role]);

  useEffect(() => {
    if (profile?.role !== "admin") {
      return;
    }

    const unsubscribe = listenAllLessonSubmissions((items) => {
      setSubmissions(items);
    });

    return () => unsubscribe();
  }, [profile?.role]);

  if (loading || !authUser || !isAdminMasterSession || profile?.role !== "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-zinc-700">Cargando...</p>
      </main>
    );
  }

  const studentUsers = users.filter((user) => user.role === "student");
  const userNameById = new Map(users.map((user) => [user.uid, user.fullName]));

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <MainNav />
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Panel admin</h1>
        <p className="mt-2 text-zinc-700">
          Gestion de anuncios, eventos y revision de lecciones.
        </p>

        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

        <section className="mt-6 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900">
            Publicidad, eventos y premios en tiempo real
          </h2>
          <p className="mt-1 text-sm text-zinc-700">
            Lo que publiques aquí se mostrará al instante en el dashboard del estudiante.
          </p>

          <form
            className="mt-5 grid gap-3 sm:grid-cols-2"
            onSubmit={async (event) => {
              event.preventDefault();
              setSavingAnnouncement(true);
              setAnnouncementsError("");
              try {
                await createAnnouncement({
                  title: announcementForm.title,
                  message: announcementForm.message,
                  kind: announcementForm.kind,
                  audience: announcementForm.audience,
                  targetUserId:
                    announcementForm.audience === "student"
                      ? announcementForm.targetUserId
                      : null,
                  ctaLabel: announcementForm.ctaLabel,
                  ctaUrl: announcementForm.ctaUrl,
                  startAt: datetimeLocalToIso(announcementForm.startAt),
                  endAt: datetimeLocalToIso(announcementForm.endAt),
                  isPublished: announcementForm.isPublished,
                });
                setAnnouncementForm({
                  title: "",
                  message: "",
                  kind: "event",
                  audience: "all",
                  targetUserId: "",
                  ctaLabel: "",
                  ctaUrl: "",
                  startAt: "",
                  endAt: "",
                  isPublished: true,
                });
              } catch (saveError) {
                const message =
                  saveError instanceof Error ? saveError.message : "No se pudo guardar el anuncio";
                setAnnouncementsError(message);
              } finally {
                setSavingAnnouncement(false);
              }
            }}
          >
            <label className="flex flex-col gap-1 text-sm text-zinc-700 sm:col-span-2">
              Titulo
              <input
                required
                value={announcementForm.title}
                onChange={(event) =>
                  setAnnouncementForm((prev) => ({ ...prev, title: event.target.value }))
                }
                className="rounded-md border border-zinc-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
                placeholder="Ej: Semana de oración especial"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-700 sm:col-span-2">
              Mensaje
              <textarea
                required
                value={announcementForm.message}
                onChange={(event) =>
                  setAnnouncementForm((prev) => ({ ...prev, message: event.target.value }))
                }
                className="min-h-24 rounded-md border border-zinc-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
                placeholder="Describe el evento, premio o anuncio"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Tipo
              <select
                value={announcementForm.kind}
                onChange={(event) =>
                  setAnnouncementForm((prev) => ({
                    ...prev,
                    kind: event.target.value as AnnouncementKind,
                  }))
                }
                className="rounded-md border border-zinc-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
              >
                <option value="event">Evento</option>
                <option value="award">Premio</option>
                <option value="promotion">Publicidad</option>
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Destino
              <select
                value={announcementForm.audience}
                onChange={(event) =>
                  setAnnouncementForm((prev) => ({
                    ...prev,
                    audience: event.target.value as AnnouncementAudience,
                    targetUserId:
                      event.target.value === "student" ? prev.targetUserId : "",
                  }))
                }
                className="rounded-md border border-zinc-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
              >
                <option value="all">General (todos los estudiantes)</option>
                <option value="student">Nota especial a un alumno</option>
              </select>
            </label>

            {announcementForm.audience === "student" ? (
              <label className="flex flex-col gap-1 text-sm text-zinc-700 sm:col-span-2">
                Alumno destinatario
                <select
                  required
                  value={announcementForm.targetUserId}
                  onChange={(event) =>
                    setAnnouncementForm((prev) => ({
                      ...prev,
                      targetUserId: event.target.value,
                    }))
                  }
                  className="rounded-md border border-zinc-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
                >
                  <option value="">Selecciona un alumno</option>
                  {studentUsers.map((user) => (
                    <option key={user.uid} value={user.uid}>
                      {user.fullName}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}

            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Texto del boton (opcional)
              <input
                value={announcementForm.ctaLabel}
                onChange={(event) =>
                  setAnnouncementForm((prev) => ({ ...prev, ctaLabel: event.target.value }))
                }
                className="rounded-md border border-zinc-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
                placeholder="Ej: Ver detalles"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-700 sm:col-span-2">
              URL del boton (opcional)
              <input
                value={announcementForm.ctaUrl}
                onChange={(event) =>
                  setAnnouncementForm((prev) => ({ ...prev, ctaUrl: event.target.value }))
                }
                className="rounded-md border border-zinc-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
                placeholder="Ej: /lecciones/curso-especial o https://..."
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Inicio programado (opcional)
              <input
                type="datetime-local"
                value={announcementForm.startAt}
                onChange={(event) =>
                  setAnnouncementForm((prev) => ({ ...prev, startAt: event.target.value }))
                }
                className="rounded-md border border-zinc-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-zinc-700">
              Fin programado (opcional)
              <input
                type="datetime-local"
                value={announcementForm.endAt}
                onChange={(event) =>
                  setAnnouncementForm((prev) => ({ ...prev, endAt: event.target.value }))
                }
                className="rounded-md border border-zinc-300 px-3 py-2 outline-none ring-indigo-300 focus:ring"
              />
            </label>

            <label className="inline-flex items-center gap-2 text-sm text-zinc-700 sm:col-span-2">
              <input
                type="checkbox"
                checked={announcementForm.isPublished}
                onChange={(event) =>
                  setAnnouncementForm((prev) => ({ ...prev, isPublished: event.target.checked }))
                }
                className="h-4 w-4 rounded border-zinc-300"
              />
              Publicar inmediatamente
            </label>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={savingAnnouncement}
                className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingAnnouncement ? "Guardando..." : "Guardar anuncio"}
              </button>
            </div>
          </form>

          {announcementsError ? <p className="mt-3 text-sm text-red-700">{announcementsError}</p> : null}

          <div className="mt-6 space-y-3">
            {announcements.length === 0 ? (
              <p className="rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-600">
                Aun no has creado anuncios.
              </p>
            ) : (
              announcements.map((item) => {
                const icon =
                  item.kind === "event" ? (
                    <CalendarDays size={14} />
                  ) : item.kind === "award" ? (
                    <Gift size={14} />
                  ) : (
                    <Megaphone size={14} />
                  );
                const kindLabel =
                  item.kind === "event"
                    ? "Evento"
                    : item.kind === "award"
                      ? "Premio"
                      : "Publicidad";

                return (
                  <article
                    key={item.id}
                    className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                          {icon}
                          {kindLabel}
                        </p>
                        <h3 className="mt-2 text-base font-semibold text-zinc-900">{item.title}</h3>
                        <p className="mt-1 text-sm text-zinc-700">{item.message}</p>
                        <p className="mt-2 text-xs uppercase tracking-wide text-zinc-500">
                          Inicio: {isoToDatetimeLocal(item.startAt) || "inmediato"} · Fin:{" "}
                          {isoToDatetimeLocal(item.endAt) || "sin limite"}
                        </p>
                        <p className="mt-1 text-xs font-semibold text-zinc-600">
                          Destino:{" "}
                          {item.audience === "all"
                            ? "General"
                            : userNameById.get(item.targetUserId ?? "") || "Alumno especifico"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            item.isPublished
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-zinc-200 text-zinc-700"
                          }`}
                        >
                          {item.isPublished ? "Publicado" : "Pausado"}
                        </span>
                        <span className="inline-flex items-center gap-0.5 text-amber-500">
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                          <Star size={12} fill="currentColor" />
                        </span>
                        <button
                          type="button"
                          onClick={async () => {
                            await setAnnouncementPublished(item.id, !item.isPublished);
                          }}
                          className="rounded-md border border-zinc-300 px-3 py-1 text-xs hover:bg-zinc-100"
                        >
                          {item.isPublished ? "Pausar" : "Publicar"}
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await removeAnnouncement(item.id);
                          }}
                          className="rounded-md border border-red-200 px-3 py-1 text-xs text-red-700 hover:bg-red-50"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900">
            Revisión de lecciones (aprueba y asigna puntos)
          </h2>
          <p className="mt-1 text-sm text-zinc-700">
            Cuando apruebas una lección, el sistema suma los puntos y desbloquea la siguiente.
          </p>

          <div className="mt-5 space-y-3">
            {submissions.length === 0 ? (
              <p className="rounded-xl border border-dashed border-zinc-300 p-4 text-sm text-zinc-600">
                Aún no hay lecciones enviadas para revisión.
              </p>
            ) : (
              submissions.map((submission) => {
                const studentName = userNameById.get(submission.uid) || submission.uid;
                return (
                  <article
                    key={submission.id}
                    className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-zinc-500">
                          {studentName}
                        </p>
                        <h3 className="mt-1 text-base font-semibold text-zinc-900">
                          Estudio {submission.lessonNumber}: {submission.lessonTitle}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-700">
                          Puntaje de opciones: {submission.score}/{submission.total} · Premio: +
                          {submission.pointsReward} puntos
                        </p>
                        <div className="mt-3 space-y-2 rounded-lg border border-zinc-200 bg-white p-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                            Respuestas abiertas del estudiante
                          </p>
                          {submission.reflectionAnswers.map((answer, index) => (
                            <div key={`${submission.id}-reflection-${index + 1}`}>
                              <p className="text-xs font-semibold text-zinc-600">
                                Respuesta {index + 1}
                              </p>
                              <p className="text-sm text-zinc-800">
                                {answer || "Sin respuesta"}
                              </p>
                            </div>
                          ))}
                          <div>
                            <p className="text-xs font-semibold text-zinc-600">
                              Pregunta del estudiante
                            </p>
                            <p className="text-sm text-zinc-800">
                              {submission.studentQuestion || "Sin pregunta adicional"}
                            </p>
                          </div>
                        </div>
                        <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
                          Estado:{" "}
                          {submission.status === "approved"
                            ? "Aprobado"
                            : submission.status === "rejected"
                              ? "Rechazado"
                              : "Pendiente"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={
                            submission.status === "approved" ||
                            reviewLoadingId === `${submission.id}:approve`
                          }
                          onClick={async () => {
                            setReviewLoadingId(`${submission.id}:approve`);
                            try {
                              await reviewLessonSubmission({
                                submissionId: submission.id,
                                reviewerUid: authUser.uid,
                                approve: true,
                              });
                            } finally {
                              setReviewLoadingId("");
                            }
                          }}
                          className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-60"
                        >
                          Aprobar
                        </button>
                        <button
                          type="button"
                          disabled={
                            submission.status === "approved" ||
                            reviewLoadingId === `${submission.id}:reject`
                          }
                          onClick={async () => {
                            setReviewLoadingId(`${submission.id}:reject`);
                            try {
                              await reviewLessonSubmission({
                                submissionId: submission.id,
                                reviewerUid: authUser.uid,
                                approve: false,
                              });
                            } finally {
                              setReviewLoadingId("");
                            }
                          }}
                          className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
