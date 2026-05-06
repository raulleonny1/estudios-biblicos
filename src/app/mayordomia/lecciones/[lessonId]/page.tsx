import { notFound } from "next/navigation";

import { MainNav } from "@/components/layout/main-nav";
import { LessonQuiz } from "@/features/lessons/components/lesson-quiz";
import { getStewardshipLessonById, stewardshipLessons } from "@/features/stewardship/data/lessons";

type StewardshipLessonPageProps = {
  params: Promise<{ lessonId: string }>;
};

export default async function StewardshipLessonPage({ params }: StewardshipLessonPageProps) {
  const { lessonId } = await params;
  const lesson = getStewardshipLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  const pastoralActionCall = `¿Cómo vas a aplicar hoy lo aprendido en "${lesson.title}" para administrar fielmente lo que Dios puso en tus manos?`;

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
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900">{lesson.title}</h1>
          <p className="mt-2 text-zinc-700">{lesson.subtitle}</p>
        </section>

        <section className="mb-6 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-emerald-900">Contenido de la lección</h2>
          <p className="mt-4 whitespace-pre-line text-lg leading-8 text-emerald-950">{lesson.passage}</p>
        </section>

        <section className="mb-6 rounded-xl border border-indigo-200 bg-indigo-50/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
            Llamado a la accion
          </p>
          <p className="mt-2 text-sm leading-7 text-indigo-900">{pastoralActionCall}</p>
        </section>

        <LessonQuiz lesson={lesson} courseLessonIds={stewardshipLessons.map((item) => item.id)} />
      </main>
    </div>
  );
}
