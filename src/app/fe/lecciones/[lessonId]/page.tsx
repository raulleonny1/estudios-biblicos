import { notFound } from "next/navigation";

import { MainNav } from "@/components/layout/main-nav";
import {
  faithTransformLessons,
  getFaithTransformLessonById,
} from "@/features/faith-transform/data/lessons";
import { LessonPageShell } from "@/features/lessons/components/lesson-page-shell";

type FaithLessonPageProps = {
  params: Promise<{ lessonId: string }>;
};

export default async function FaithLessonPage({ params }: FaithLessonPageProps) {
  const { lessonId } = await params;
  const lesson = getFaithTransformLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <MainNav />
      <main className="mx-auto w-full max-w-4xl px-6 py-10">
        <LessonPageShell lesson={lesson} courseLessonIds={faithTransformLessons.map((item) => item.id)} />
      </main>
    </div>
  );
}
