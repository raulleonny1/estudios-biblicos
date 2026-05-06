import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/lib/firebase-services";

export type AnalyticsEventName =
  | "page_view"
  | "dashboard_view"
  | "register_success"
  | "lesson_start"
  | "lesson_submit"
  | "lesson_approved"
  | "lesson_abandon"
  | "app_error";

export async function trackAnalyticsEvent(params: {
  event: AnalyticsEventName;
  uid?: string | null;
  lessonId?: string;
  lessonNumber?: number;
  courseName?: string;
  path?: string;
  metadata?: Record<string, unknown>;
}) {
  const { event, uid, lessonId, lessonNumber, courseName, path, metadata } = params;
  await addDoc(collection(db, "analyticsEvents"), {
    event,
    uid: uid ?? null,
    lessonId: lessonId ?? null,
    lessonNumber: lessonNumber ?? null,
    courseName: courseName ?? null,
    path: path ?? null,
    metadata: metadata ?? {},
    createdAt: new Date().toISOString(),
    createdAtServer: serverTimestamp(),
  });
}
