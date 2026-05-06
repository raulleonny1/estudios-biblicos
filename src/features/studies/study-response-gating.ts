import type { LessonSubmission } from "@/features/lessons/firebase-progress";
import { lessons } from "@/features/lessons/data/lessons";
import { effectivePrayerLessons } from "@/features/effective-prayer/data/lessons";
import { faithTransformLessons } from "@/features/faith-transform/data/lessons";
import { stewardshipLessons } from "@/features/stewardship/data/lessons";
import { stewardshipIntermediateLessons } from "@/features/stewardship-intermediate/data/lessons";
import { stewardshipAdvancedLessons } from "@/features/stewardship-advanced/data/lessons";

type CourseKey =
  | "basico"
  | "oracion"
  | "fe"
  | "mayordomia"
  | "mayordomiaIntermedia"
  | "mayordomiaAvanzada";

const courseOrder: Array<{ key: CourseKey; lessonIds: string[] }> = [
  { key: "basico", lessonIds: lessons.map((item) => item.id) },
  { key: "oracion", lessonIds: effectivePrayerLessons.map((item) => item.id) },
  { key: "fe", lessonIds: faithTransformLessons.map((item) => item.id) },
  { key: "mayordomia", lessonIds: stewardshipLessons.map((item) => item.id) },
  {
    key: "mayordomiaIntermedia",
    lessonIds: stewardshipIntermediateLessons.map((item) => item.id),
  },
  {
    key: "mayordomiaAvanzada",
    lessonIds: stewardshipAdvancedLessons.map((item) => item.id),
  },
];

const courseNameToKey: Record<string, CourseKey> = {
  "Básico": "basico",
  "Cómo orar efectivamente": "oracion",
  "Fe que transforma": "fe",
  "Mayordomía cristiana": "mayordomia",
  "Mayordomía intermedia": "mayordomiaIntermedia",
  "Mayordomía avanzada": "mayordomiaAvanzada",
};

function getApprovedLessonIds(submissions: LessonSubmission[]) {
  return new Set(
    submissions.filter((item) => item.status === "approved").map((item) => item.lessonId)
  );
}

export function isCourseUnlockedForResponses(
  courseName: string,
  submissions: LessonSubmission[]
): boolean {
  const key = courseNameToKey[courseName];
  if (!key) {
    return true;
  }

  const approvedLessonIds = getApprovedLessonIds(submissions);
  const currentIndex = courseOrder.findIndex((item) => item.key === key);
  if (currentIndex <= 0) {
    return true;
  }

  for (let idx = 0; idx < currentIndex; idx += 1) {
    const previousCourse = courseOrder[idx];
    const isPreviousCourseCompleted = previousCourse.lessonIds.every((lessonId) =>
      approvedLessonIds.has(lessonId)
    );
    if (!isPreviousCourseCompleted) {
      return false;
    }
  }

  return true;
}
