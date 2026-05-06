import { notFound } from "next/navigation";

import { MainNav } from "@/components/layout/main-nav";
import { getLessonById } from "@/features/lessons/data/lessons";
import { LessonReforceShell } from "@/features/lessons/components/lesson-page-shell";

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

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <MainNav />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <LessonReforceShell
          lesson={lesson}
          backToLessonHref={`/lecciones/${lesson.id}`}
          backToCourseHref={`/estudios/${BASIC_COURSE_SLUG}`}
        />
      </main>
    </div>
  );
}
