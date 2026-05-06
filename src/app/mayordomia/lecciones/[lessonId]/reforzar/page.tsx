import { notFound } from "next/navigation";

import { MainNav } from "@/components/layout/main-nav";
import { LessonReforceShell } from "@/features/lessons/components/lesson-page-shell";
import { getStewardshipLessonById } from "@/features/stewardship/data/lessons";

const STEWARDSHIP_COURSE_SLUG = "curso-mayordomia-cristiana";

type StewardshipLessonReforzarPageProps = {
  params: Promise<{ lessonId: string }>;
};

export default async function StewardshipLessonReforzarPage({
  params,
}: StewardshipLessonReforzarPageProps) {
  const { lessonId } = await params;
  const lesson = getStewardshipLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <MainNav />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <LessonReforceShell
          lesson={lesson}
          backToLessonHref={`/mayordomia/lecciones/${lesson.id}`}
          backToCourseHref={`/estudios/${STEWARDSHIP_COURSE_SLUG}`}
        />
      </main>
    </div>
  );
}
