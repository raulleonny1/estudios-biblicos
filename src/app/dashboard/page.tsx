"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Award, BookOpen, CalendarDays, Gift, Megaphone, Sparkles, Star } from "lucide-react";

import { MainNav } from "@/components/layout/main-nav";
import {
  listenAnnouncementAttendance,
  saveAnnouncementAttendance,
  type AnnouncementAttendanceChoice,
} from "@/features/announcements/firebase-announcement-attendance";
import { useAuth } from "@/features/auth/auth-context";
import { listenActiveAnnouncements } from "@/features/announcements/firebase-announcements";
import type { Announcement } from "@/features/announcements/types";
import { StudyCard } from "@/features/studies/components/study-card";
import { studies } from "@/features/studies/data/studies";

function getAnnouncementVisualStyles(kind: Announcement["kind"]) {
  if (kind === "event") {
    return {
      badgeClass: "bg-sky-100 text-sky-700",
      fallbackBackground: "bg-gradient-to-br from-sky-500 via-indigo-500 to-violet-600",
      accentClass: "from-sky-300/40 via-cyan-200/20 to-transparent",
    };
  }
  if (kind === "award") {
    return {
      badgeClass: "bg-amber-100 text-amber-700",
      fallbackBackground: "bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500",
      accentClass: "from-amber-300/40 via-yellow-200/20 to-transparent",
    };
  }
  return {
    badgeClass: "bg-fuchsia-100 text-fuchsia-700",
    fallbackBackground: "bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-600",
    accentClass: "from-fuchsia-300/40 via-violet-200/20 to-transparent",
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const { authUser, profile, loading } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [attendanceByAnnouncement, setAttendanceByAnnouncement] = useState<Record<string, "yes" | "no">>({});
  const [activeStudySection, setActiveStudySection] = useState<
    "estudios" | "seminarios" | "libros" | "temas-reflexion"
  >("estudios");

  useEffect(() => {
    if (!loading && !authUser) {
      router.replace("/");
    }
  }, [authUser, loading, router]);

  useEffect(() => {
    if (!loading && authUser && profile?.role === "admin") {
      router.replace("/admin");
    }
  }, [authUser, loading, profile?.role, router]);

  useEffect(() => {
    if (!authUser) return;

    const unsubscribe = listenActiveAnnouncements(authUser.uid, (items) => {
      setAnnouncements(items);
    });

    return () => unsubscribe();
  }, [authUser]);

  useEffect(() => {
    if (!authUser) return;

    const unsubscribe = listenAnnouncementAttendance((items) => {
      const map = items.reduce<Record<string, "yes" | "no">>((acc, item) => {
        if (item.uid === authUser.uid) {
          acc[item.announcementId] = item.choice;
        }
        return acc;
      }, {});
      setAttendanceByAnnouncement(map);
    });

    return () => unsubscribe();
  }, [authUser]);

  async function setAttendance(announcementId: string, choice: AnnouncementAttendanceChoice) {
    if (!authUser) return;
    await saveAnnouncementAttendance(announcementId, authUser.uid, choice);
  }

  if (loading || !authUser || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-zinc-700">Cargando...</p>
      </main>
    );
  }

  const roleLabel = profile.role === "admin" ? "Administrador" : "Estudiante";
  const courseStudies = studies.filter((study) => study.kind === "curso");
  const seminarStudies = studies.filter((study) => study.kind === "seminario");

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-sky-50 to-amber-50 font-sans">
      <MainNav />
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-indigo-300/40 bg-gradient-to-br from-indigo-700 via-violet-700 to-fuchsia-700 p-6 text-white shadow-xl shadow-indigo-200/80 sm:p-8">
          <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute -bottom-16 left-10 h-44 w-44 rounded-full bg-sky-300/20 blur-3xl" />

          <div className="relative z-10">
            <p className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-100">
              Panel del estudiante
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Bienvenido, {profile.fullName}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-indigo-100 sm:text-base">
              Tu avance espiritual también se refleja en tus puntos. Completa lecciones,
              mantén tu constancia diaria y sube de nivel en la Escuela Bíblica.
            </p>
          </div>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-600 to-violet-600 p-5 text-white shadow-lg shadow-indigo-200/70">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-indigo-100">Puntos acumulados</p>
              <span className="rounded-lg bg-white/20 p-2">
                <Award size={18} />
              </span>
            </div>
            <p className="text-4xl font-black">{profile.points}</p>
            <div className="mt-2 flex items-center gap-1 text-amber-200">
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <Star size={14} fill="currentColor" />
              <span className="ml-1 text-xs font-semibold uppercase tracking-wide text-indigo-100">
                Nivel en progreso
              </span>
            </div>
          </article>

          <article className="rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-cyan-100 p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-sky-700">Rol actual</p>
              <span className="rounded-lg bg-sky-600 p-2 text-white">
                <Sparkles size={18} />
              </span>
            </div>
            <p className="text-xl font-bold text-sky-900">{roleLabel}</p>
            <p className="mt-2 text-sm text-sky-800">Tu panel está adaptado a tu rol.</p>
          </article>

          <article className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-100 p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wide text-amber-700">Bono diario</p>
              <span className="rounded-lg bg-amber-500 p-2 text-white">
                <Star size={18} fill="currentColor" />
              </span>
            </div>
            <p className="text-xl font-bold text-amber-900">+1 punto por ingreso</p>
            <p className="mt-2 text-sm text-amber-800">Entra cada día para mantener tu racha.</p>
          </article>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-lg bg-fuchsia-600 p-2 text-white">
              <Megaphone size={16} />
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
              Eventos, premios y anuncios
            </h3>
          </div>

          {announcements.length === 0 ? (
            <article className="rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-sm text-zinc-600">
              Aún no hay anuncios publicados. Pronto verás aquí nuevos eventos y premios.
            </article>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {announcements.map((item) => {
                const attendanceChoice = attendanceByAnnouncement[item.id];
                const isAttendanceResolved = item.kind === "event" && Boolean(attendanceChoice);
                const icon =
                  item.kind === "event" ? (
                    <CalendarDays size={16} />
                  ) : item.kind === "award" ? (
                    <Gift size={16} />
                  ) : (
                    <Megaphone size={16} />
                  );
                const badgeLabel =
                  item.kind === "event"
                    ? "Evento"
                    : item.kind === "award"
                      ? "Premio"
                      : "Publicidad";
                const badgeClass =
                  getAnnouncementVisualStyles(item.kind).badgeClass;
                const fallbackBackground =
                  getAnnouncementVisualStyles(item.kind).fallbackBackground;
                const accentClass = getAnnouncementVisualStyles(item.kind).accentClass;
                const hasImage = item.imageUrl.trim().length > 0;

                return (
                  <article
                    key={item.id}
                    className={`overflow-hidden rounded-2xl border p-0 shadow-md transition duration-300 hover:shadow-lg ${
                      isAttendanceResolved
                        ? "border-zinc-300 bg-zinc-100/80"
                        : "animate-heartbeat border-zinc-200 bg-white"
                    }`}
                  >
                    <div
                      className={`relative h-36 ${
                        hasImage ? "" : fallbackBackground
                      } ${isAttendanceResolved ? "grayscale" : ""}`}
                      style={
                        hasImage && !isAttendanceResolved
                          ? {
                              backgroundImage: `linear-gradient(rgba(9, 9, 11, 0.45), rgba(9, 9, 11, 0.45)), url(${item.imageUrl})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }
                          : undefined
                      }
                    >
                      {!isAttendanceResolved ? (
                        <>
                          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 animate-pulse rounded-full bg-white/20 blur-2xl" />
                          <div
                            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentClass} animate-shimmer`}
                          />
                        </>
                      ) : null}
                      <div className="absolute inset-0 p-4">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}
                          >
                            {icon}
                            {badgeLabel}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold text-white">
                            {item.audience === "all" ? "General" : "Nota especial para ti"}
                          </span>
                          {isAttendanceResolved ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-zinc-700">
                              Respondido
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/50 bg-amber-100/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800">
                              <span className="relative inline-flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-70" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
                              </span>
                              Alerta
                            </span>
                          )}
                        </div>
                        <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      </div>
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 text-amber-200">
                        <Star size={13} fill="currentColor" />
                        <Star size={13} fill="currentColor" />
                        <Star size={13} fill="currentColor" />
                      </div>
                    </div>

                    <div className="p-5">
                      <p className={`text-sm ${isAttendanceResolved ? "text-zinc-600" : "text-zinc-700"}`}>
                        {item.message}
                      </p>
                      {isAttendanceResolved ? (
                        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-zinc-700">
                          Respuesta registrada correctamente.
                        </p>
                      ) : null}
                      {item.startAt || item.endAt ? (
                        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                          {item.startAt ? `Desde: ${item.startAt.replace("T", " ").slice(0, 16)}` : ""}
                          {item.startAt && item.endAt ? " · " : ""}
                          {item.endAt ? `Hasta: ${item.endAt.replace("T", " ").slice(0, 16)}` : ""}
                        </p>
                      ) : null}

                      {item.ctaUrl ? (
                        <Link
                          href={item.ctaUrl}
                          className="mt-4 inline-flex rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
                        >
                          {item.ctaLabel || "Ver más"}
                        </Link>
                      ) : null}

                      {item.kind === "event" ? (
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setAttendance(item.id, "yes")}
                            className={`rounded-md border px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                              attendanceByAnnouncement[item.id] === "yes"
                                ? "border-emerald-300 bg-emerald-100 text-emerald-800"
                                : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            }`}
                          >
                            Sí asistiré
                          </button>
                          <button
                            type="button"
                            onClick={() => setAttendance(item.id, "no")}
                            className={`rounded-md border px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                              attendanceByAnnouncement[item.id] === "no"
                                ? "border-rose-300 bg-rose-100 text-rose-800"
                                : "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100"
                            }`}
                          >
                            No podré asistir
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-lg bg-indigo-600 p-2 text-white">
              <BookOpen size={16} />
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900">
              Recursos de formacion
            </h3>
          </div>
          <p className="mt-2 text-sm text-zinc-700 sm:text-base">
            Elige una categoria para ver su contenido. Por defecto veras los estudios disponibles.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveStudySection("estudios")}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                activeStudySection === "estudios"
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-indigo-300 hover:text-indigo-700"
              }`}
            >
              Estudios
            </button>
            <button
              type="button"
              onClick={() => setActiveStudySection("seminarios")}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                activeStudySection === "seminarios"
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-indigo-300 hover:text-indigo-700"
              }`}
            >
              Seminarios
            </button>
            <button
              type="button"
              onClick={() => setActiveStudySection("libros")}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                activeStudySection === "libros"
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-indigo-300 hover:text-indigo-700"
              }`}
            >
              Libros
            </button>
            <button
              type="button"
              onClick={() => setActiveStudySection("temas-reflexion")}
              className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                activeStudySection === "temas-reflexion"
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-indigo-300 hover:text-indigo-700"
              }`}
            >
              Temas de reflexion
            </button>
          </div>

          <div className="mt-5">
            {activeStudySection === "estudios" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {courseStudies.map((study) => (
                  <StudyCard key={study.id} study={study} />
                ))}
              </div>
            ) : null}

            {activeStudySection === "seminarios" ? (
              seminarStudies.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {seminarStudies.map((study) => (
                    <StudyCard key={study.id} study={study} />
                  ))}
                </div>
              ) : (
                <article className="rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-sm text-zinc-600">
                  Aun no hay seminarios publicados. Muy pronto veras aqui los proximos seminarios.
                </article>
              )
            ) : null}

            {activeStudySection === "libros" ? (
              <article className="rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-sm text-zinc-600">
                Esta seccion de libros estara disponible pronto con material recomendado para tu
                crecimiento.
              </article>
            ) : null}

            {activeStudySection === "temas-reflexion" ? (
              <article className="rounded-2xl border border-dashed border-zinc-300 bg-white/70 p-5 text-sm text-zinc-600">
                Proximamente veras aqui temas de reflexion para meditacion personal y devocionales.
              </article>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
