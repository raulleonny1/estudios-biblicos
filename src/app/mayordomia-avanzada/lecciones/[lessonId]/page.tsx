import { notFound } from "next/navigation";

import { MainNav } from "@/components/layout/main-nav";
import { LessonPageShell } from "@/features/lessons/components/lesson-page-shell";
import {
  getStewardshipAdvancedLessonById,
  stewardshipAdvancedLessons,
} from "@/features/stewardship-advanced/data/lessons";

type StewardshipAdvancedLessonPageProps = {
  params: Promise<{ lessonId: string }>;
};

export default async function StewardshipAdvancedLessonPage({
  params,
}: StewardshipAdvancedLessonPageProps) {
  const { lessonId } = await params;
  const lesson = getStewardshipAdvancedLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <MainNav />
      <main className="mx-auto w-full max-w-4xl px-6 py-10">
        <LessonPageShell
          lesson={lesson}
          courseLessonIds={stewardshipAdvancedLessons.map((item) => item.id)}
        />
      </main>
    </div>
  );
}
