import { notFound } from "next/navigation";

import { MainNav } from "@/components/layout/main-nav";
import {
  effectivePrayerLessons,
  getEffectivePrayerLessonById,
} from "@/features/effective-prayer/data/lessons";
import { LessonPageShell } from "@/features/lessons/components/lesson-page-shell";

type PrayerLessonPageProps = {
  params: Promise<{ lessonId: string }>;
};

export default async function PrayerLessonPage({ params }: PrayerLessonPageProps) {
  const { lessonId } = await params;
  const lesson = getEffectivePrayerLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <MainNav />
      <main className="mx-auto w-full max-w-4xl px-6 py-10">
        <LessonPageShell lesson={lesson} courseLessonIds={effectivePrayerLessons.map((item) => item.id)} />
      </main>
    </div>
  );
}
