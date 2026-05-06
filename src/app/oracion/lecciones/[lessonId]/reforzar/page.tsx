import { notFound } from "next/navigation";

import { MainNav } from "@/components/layout/main-nav";
import { getEffectivePrayerLessonById } from "@/features/effective-prayer/data/lessons";
import { LessonReforceShell } from "@/features/lessons/components/lesson-page-shell";

const PRAYER_COURSE_SLUG = "curso-orar-efectivamente";

type PrayerLessonReforzarPageProps = {
  params: Promise<{ lessonId: string }>;
};

export default async function PrayerLessonReforzarPage({ params }: PrayerLessonReforzarPageProps) {
  const { lessonId } = await params;
  const lesson = getEffectivePrayerLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <MainNav />
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <LessonReforceShell
          lesson={lesson}
          backToLessonHref={`/oracion/lecciones/${lesson.id}`}
          backToCourseHref={`/estudios/${PRAYER_COURSE_SLUG}`}
        />
      </main>
    </div>
  );
}
