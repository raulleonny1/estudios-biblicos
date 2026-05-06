import type { LessonSubmission } from "./firebase-progress";

export function getUnlockedLessonIds(params: {
  lessonIds: string[];
  submissions: LessonSubmission[];
}) {
  const { lessonIds, submissions } = params;
  if (lessonIds.length === 0) {
    return new Set<string>();
  }

  const approvedLessonIds = new Set(
    submissions.filter((item) => item.status === "approved").map((item) => item.lessonId)
  );

  const unlockedLessonIds = new Set<string>();
  lessonIds.forEach((lessonId, index) => {
    if (index === 0) {
      unlockedLessonIds.add(lessonId);
      return;
    }

    const previousLessonId = lessonIds[index - 1];
    if (approvedLessonIds.has(previousLessonId)) {
      unlockedLessonIds.add(lessonId);
    }
  });

  return unlockedLessonIds;
}
