import { notFound } from "next/navigation";

import { MainNav } from "@/components/layout/main-nav";
import { LessonQuiz } from "@/features/lessons/components/lesson-quiz";
import { getLessonById } from "@/features/lessons/data/lessons";

type LessonPageProps = {
  params: Promise<{ lessonId: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <MainNav />
      <main className="mx-auto w-full max-w-4xl px-6 py-10">
        <section className="mb-6 rounded-xl border border-black/10 bg-white p-6">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
              Curso {lesson.courseName}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
              Lección {lesson.lessonNumber}
            </span>
          </div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">{lesson.source}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">
            {lesson.title}
          </h1>
          <p className="mt-2 text-zinc-700">{lesson.subtitle}</p>
        </section>

        <section className="mb-6 rounded-xl border border-black/10 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Pasaje de la lección</h2>
          <p className="mt-3 leading-7 text-zinc-700">{lesson.passage}</p>
        </section>

        <LessonQuiz lesson={lesson} />
      </main>
    </div>
  );
}
