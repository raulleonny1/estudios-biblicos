import { notFound } from "next/navigation";

import { MainNav } from "@/components/layout/main-nav";
import { LessonPageShell } from "@/features/lessons/components/lesson-page-shell";
import { getLessonById, lessons } from "@/features/lessons/data/lessons";

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
        <LessonPageShell lesson={lesson} courseLessonIds={lessons.map((item) => item.id)} />
      </main>
    </div>
  );
}
