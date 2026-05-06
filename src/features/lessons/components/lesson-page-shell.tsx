"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { applyLessonContentOverride, getLessonContentOverride } from "@/features/lessons/content-override";

import { LessonQuiz } from "./lesson-quiz";
import type { Lesson } from "../types";

type LessonPageShellProps = {
  lesson: Lesson;
  courseLessonIds: string[];
  backToCourseHref?: string;
  backToLessonHref?: string;
};

export function LessonPageShell({ lesson, courseLessonIds }: LessonPageShellProps) {
  const [lessonContent, setLessonContent] = useState(lesson);

  useEffect(() => {
    void getLessonContentOverride(lesson.id)
      .then((override) => setLessonContent(applyLessonContentOverride(lesson, override)))
      .catch(() => null);
  }, [lesson]);

  return (
    <>
      <section className="mb-6 rounded-xl border border-black/10 bg-white p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            Curso {lessonContent.courseName}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
            Lección {lessonContent.lessonNumber}
          </span>
        </div>
        <p className="text-xs uppercase tracking-wide text-zinc-500">{lessonContent.source}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">{lessonContent.title}</h1>
        <p className="mt-2 text-zinc-700">{lessonContent.subtitle}</p>
      </section>

      <section className="mb-6 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-emerald-900">Contenido de la lección</h2>
        <p className="mt-4 whitespace-pre-line text-lg leading-8 text-emerald-950">{lessonContent.passage}</p>
      </section>

      <LessonQuiz lesson={lessonContent} courseLessonIds={courseLessonIds} />
    </>
  );
}

type LessonReforceShellProps = {
  lesson: Lesson;
  backToLessonHref: string;
  backToCourseHref: string;
};

export function LessonReforceShell({
  lesson,
  backToLessonHref,
  backToCourseHref,
}: LessonReforceShellProps) {
  const [lessonContent, setLessonContent] = useState(lesson);

  useEffect(() => {
    void getLessonContentOverride(lesson.id)
      .then((override) => setLessonContent(applyLessonContentOverride(lesson, override)))
      .catch(() => null);
  }, [lesson]);

  const buttonClass =
    "inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700";

  return (
    <>
      <div className="mb-6">
        <Link
          href={backToLessonHref}
          className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
        >
          ← Volver a la lección
        </Link>
      </div>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          Reforzar lo aprendido
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            Lección {lessonContent.lessonNumber}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
            Curso {lessonContent.courseName}
          </span>
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          {lessonContent.title}
        </h1>
        <h2 className="mt-8 text-sm font-bold uppercase tracking-wide text-zinc-500">
          Lo esencial
        </h2>
        <ul className="mt-3 list-disc space-y-3 pl-5 text-base leading-relaxed text-zinc-800">
          {lessonContent.essentialTakeaways.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href="/dashboard" className={buttonClass}>
          Volver al panel del estudiante
        </Link>
        <Link href={backToCourseHref} className={buttonClass}>
          Volver al listado del curso
        </Link>
      </section>
    </>
  );
}
