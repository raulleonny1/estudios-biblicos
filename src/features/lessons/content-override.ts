import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase-services";

import type { Lesson } from "./types";

export type LessonContentOverride = {
  lessonId: string;
  title?: string;
  subtitle?: string;
  summary?: string;
  passage?: string;
  essentialTakeaways?: string[];
  isPublished: boolean;
  updatedAt: string;
};

function toOverride(lessonId: string, raw: Record<string, unknown>): LessonContentOverride {
  return {
    lessonId,
    title: typeof raw.title === "string" ? raw.title : undefined,
    subtitle: typeof raw.subtitle === "string" ? raw.subtitle : undefined,
    summary: typeof raw.summary === "string" ? raw.summary : undefined,
    passage: typeof raw.passage === "string" ? raw.passage : undefined,
    essentialTakeaways: Array.isArray(raw.essentialTakeaways)
      ? raw.essentialTakeaways.map((item) => String(item))
      : undefined,
    isPublished: Boolean(raw.isPublished),
    updatedAt: String(raw.updatedAt ?? ""),
  };
}

export function applyLessonContentOverride(
  lesson: Lesson,
  override: LessonContentOverride | null
): Lesson {
  if (!override || !override.isPublished) {
    return lesson;
  }

  return {
    ...lesson,
    title: override.title?.trim() || lesson.title,
    subtitle: override.subtitle?.trim() || lesson.subtitle,
    summary: override.summary?.trim() || lesson.summary,
    passage: override.passage?.trim() || lesson.passage,
    essentialTakeaways:
      override.essentialTakeaways?.map((item) => item.trim()).filter(Boolean) ??
      lesson.essentialTakeaways,
  };
}

export async function getLessonContentOverride(
  lessonId: string
): Promise<LessonContentOverride | null> {
  const snap = await getDoc(doc(db, "lessonContent", lessonId));
  if (!snap.exists()) return null;
  return toOverride(lessonId, snap.data() as Record<string, unknown>);
}

export function listenLessonContentOverrides(
  onData: (items: LessonContentOverride[]) => void
) {
  return onSnapshot(collection(db, "lessonContent"), (snapshot) => {
    const items = snapshot.docs
      .map((docItem) => toOverride(docItem.id, docItem.data() as Record<string, unknown>))
      .sort((a, b) => a.lessonId.localeCompare(b.lessonId));
    onData(items);
  });
}

export async function saveLessonContentOverride(params: {
  lessonId: string;
  title: string;
  subtitle: string;
  summary: string;
  passage: string;
  essentialTakeaways: string[];
  isPublished: boolean;
}) {
  const now = new Date().toISOString();
  await setDoc(
    doc(db, "lessonContent", params.lessonId),
    {
      lessonId: params.lessonId,
      title: params.title.trim(),
      subtitle: params.subtitle.trim(),
      summary: params.summary.trim(),
      passage: params.passage.trim(),
      essentialTakeaways: params.essentialTakeaways.map((item) => item.trim()).filter(Boolean),
      isPublished: params.isPublished,
      updatedAt: now,
      updatedAtServer: serverTimestamp(),
    },
    { merge: true }
  );
}
