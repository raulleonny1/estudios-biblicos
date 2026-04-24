import Link from "next/link";
import { notFound } from "next/navigation";

import { MainNav } from "@/components/layout/main-nav";
import { getLessonById } from "@/features/lessons/data/lessons";

const BASIC_COURSE_SLUG = "estudio-basico-biblia";

type LessonReforzarPageProps = {
  params: Promise<{ lessonId: string }>;
};

export default async function LessonReforzarPage({ params }: LessonReforzarPageProps) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  const buttonClass =
    "inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700";

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <MainNav />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href={`/lecciones/${lesson.id}`}
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
              Estudio {lesson.lessonNumber}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700">
              Curso {lesson.courseName}
            </span>
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            {lesson.title}
          </h1>
          <p className="mt-2 text-zinc-600">{lesson.subtitle}</p>

          <h2 className="mt-8 text-sm font-bold uppercase tracking-wide text-zinc-500">
            Lo esencial
          </h2>
          <ul className="mt-3 list-disc space-y-3 pl-5 text-base leading-relaxed text-zinc-800">
            {lesson.essentialTakeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/dashboard" className={buttonClass}>
            Volver al panel del estudiante
          </Link>
          <Link href={`/estudios/${BASIC_COURSE_SLUG}`} className={buttonClass}>
            Volver al listado del curso
          </Link>
        </section>
      </main>
    </div>
  );
}
