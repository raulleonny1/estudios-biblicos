"use client";

import { submitLessonForReview } from "@/features/lessons/firebase-progress";

export type OfflineLessonSubmission = {
  uid: string;
  lessonId: string;
  lessonNumber: number;
  courseName: string;
  lessonTitle: string;
  reflectionAnswers: [string, string, string];
  studentQuestion: string;
  score: number;
  total: number;
  pointsReward: number;
  queuedAt: string;
};

const STORAGE_KEY = "lesson_submissions_offline_queue_v1";

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage;
}

function readQueue(): OfflineLessonSubmission[] {
  const storage = getStorage();
  if (!storage) {
    return [];
  }
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as OfflineLessonSubmission[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeQueue(items: OfflineLessonSubmission[]) {
  const storage = getStorage();
  if (!storage) {
    return;
  }
  storage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function buildSubmissionId(item: Pick<OfflineLessonSubmission, "uid" | "lessonId">) {
  return `${item.uid}_${item.lessonId}`;
}

export function enqueueOfflineLessonSubmission(
  payload: Omit<OfflineLessonSubmission, "queuedAt">
) {
  const existing = readQueue();
  const nextItem: OfflineLessonSubmission = {
    ...payload,
    queuedAt: new Date().toISOString(),
  };
  const next = [
    ...existing.filter((item) => buildSubmissionId(item) !== buildSubmissionId(nextItem)),
    nextItem,
  ];
  writeQueue(next);
}

export function removeOfflineLessonSubmission(uid: string, lessonId: string) {
  const existing = readQueue();
  const next = existing.filter((item) => buildSubmissionId(item) !== `${uid}_${lessonId}`);
  writeQueue(next);
}

export function hasOfflineLessonSubmission(uid: string, lessonId: string): boolean {
  return readQueue().some((item) => buildSubmissionId(item) === `${uid}_${lessonId}`);
}

export async function flushOfflineLessonSubmissions(uid: string) {
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    return { synced: 0, remaining: readQueue().filter((item) => item.uid === uid).length };
  }

  const queue = readQueue();
  const mine = queue
    .filter((item) => item.uid === uid)
    .sort((a, b) => a.queuedAt.localeCompare(b.queuedAt));
  if (mine.length === 0) {
    return { synced: 0, remaining: 0 };
  }

  let synced = 0;
  const failedKeys = new Set<string>();

  for (const item of mine) {
    try {
      await submitLessonForReview({
        uid: item.uid,
        lessonId: item.lessonId,
        lessonNumber: item.lessonNumber,
        courseName: item.courseName,
        lessonTitle: item.lessonTitle,
        reflectionAnswers: item.reflectionAnswers,
        studentQuestion: item.studentQuestion,
        score: item.score,
        total: item.total,
        pointsReward: item.pointsReward,
      });
      synced += 1;
    } catch {
      failedKeys.add(buildSubmissionId(item));
    }
  }

  const next = queue.filter((item) => {
    if (item.uid !== uid) {
      return true;
    }
    return failedKeys.has(buildSubmissionId(item));
  });
  writeQueue(next);

  return {
    synced,
    remaining: next.filter((item) => item.uid === uid).length,
  };
}
