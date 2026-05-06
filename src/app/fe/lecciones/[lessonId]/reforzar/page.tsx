import { notFound } from "next/navigation";

import { MainNav } from "@/components/layout/main-nav";
import { getFaithTransformLessonById } from "@/features/faith-transform/data/lessons";
import { LessonReforceShell } from "@/features/lessons/components/lesson-page-shell";

const FAITH_COURSE_SLUG = "curso-fe-que-transforma";

type FaithLessonReforzarPageProps = {
  params: Promise<{ lessonId: string }>;
};

export default async function FaithLessonReforzarPage({ params }: FaithLessonReforzarPageProps) {
  const { lessonId } = await params;
  const lesson = getFaithTransformLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <MainNav />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <LessonReforceShell
          lesson={lesson}
          backToLessonHref={`/fe/lecciones/${lesson.id}`}
          backToCourseHref={`/estudios/${FAITH_COURSE_SLUG}`}
        />
      </main>
    </div>
  );
}
