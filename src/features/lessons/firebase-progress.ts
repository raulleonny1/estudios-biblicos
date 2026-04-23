import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase-services";

export type LessonSubmissionStatus = "pending" | "approved" | "rejected";

export type LessonSubmission = {
  id: string;
  uid: string;
  lessonId: string;
  lessonNumber: number;
  lessonTitle: string;
  score: number;
  total: number;
  pointsReward: number;
  reflectionAnswers: [string, string, string];
  studentQuestion: string;
  status: LessonSubmissionStatus;
  submittedAt: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
  updatedAt: string;
};

function normalizeNullable(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  const parsed = String(value).trim();
  return parsed.length > 0 ? parsed : null;
}

function toSubmission(id: string, raw: Record<string, unknown>): LessonSubmission {
  const status =
    raw.status === "approved" || raw.status === "rejected" || raw.status === "pending"
      ? raw.status
      : "pending";

  const rawReflectionAnswers = Array.isArray(raw.reflectionAnswers)
    ? raw.reflectionAnswers.map((item) => String(item ?? "").trim())
    : [];
  const reflectionAnswers: [string, string, string] = [
    rawReflectionAnswers[0] ?? "",
    rawReflectionAnswers[1] ?? "",
    rawReflectionAnswers[2] ?? "",
  ];

  return {
    id,
    uid: String(raw.uid ?? ""),
    lessonId: String(raw.lessonId ?? ""),
    lessonNumber: Number(raw.lessonNumber ?? 0),
    lessonTitle: String(raw.lessonTitle ?? ""),
    score: Number(raw.score ?? 0),
    total: Number(raw.total ?? 0),
    pointsReward: Number(raw.pointsReward ?? 0),
    reflectionAnswers,
    studentQuestion: String(raw.studentQuestion ?? ""),
    status,
    submittedAt: String(raw.submittedAt ?? ""),
    reviewedAt: normalizeNullable(raw.reviewedAt),
    reviewedBy: normalizeNullable(raw.reviewedBy),
    updatedAt: String(raw.updatedAt ?? ""),
  };
}

export function listenUserLessonSubmissions(
  uid: string,
  onData: (items: LessonSubmission[]) => void
) {
  const listRef = collection(db, "lessonSubmissions");
  const q = query(listRef, where("uid", "==", uid));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs
      .map((docItem) => toSubmission(docItem.id, docItem.data() as Record<string, unknown>))
      .sort((a, b) => a.lessonNumber - b.lessonNumber);
    onData(items);
  });
}

export function listenAllLessonSubmissions(onData: (items: LessonSubmission[]) => void) {
  const listRef = collection(db, "lessonSubmissions");
  const q = query(listRef, orderBy("submittedAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((docItem) =>
      toSubmission(docItem.id, docItem.data() as Record<string, unknown>)
    );
    onData(items);
  });
}

export async function submitLessonForReview(params: {
  uid: string;
  lessonId: string;
  lessonNumber: number;
  lessonTitle: string;
  reflectionAnswers: [string, string, string];
  studentQuestion: string;
  score: number;
  total: number;
  pointsReward: number;
}) {
  const {
    uid,
    lessonId,
    lessonNumber,
    lessonTitle,
    reflectionAnswers,
    studentQuestion,
    score,
    total,
    pointsReward,
  } = params;
  const submissionId = `${uid}_${lessonId}`;
  const submissionRef = doc(db, "lessonSubmissions", submissionId);
  const now = new Date().toISOString();
  let alreadyApproved = false;

  await runTransaction(db, async (tx) => {
    const submissionSnap = await tx.get(submissionRef);
    if (submissionSnap.exists()) {
      const current = submissionSnap.data() as Record<string, unknown>;
      if (current.status === "approved") {
        alreadyApproved = true;
        return;
      }
    }

    tx.set(
      submissionRef,
      {
        uid,
        lessonId,
        lessonNumber,
        lessonTitle,
        score,
        total,
        pointsReward,
        reflectionAnswers: reflectionAnswers.map((item) => item.trim()),
        studentQuestion: studentQuestion.trim(),
        status: "pending",
        submittedAt: submissionSnap.exists() ? currentIso(submissionSnap.data()) : now,
        reviewedAt: null,
        reviewedBy: null,
        updatedAt: now,
        submittedAtServer: submissionSnap.exists()
          ? (submissionSnap.data() as Record<string, unknown>).submittedAtServer
          : serverTimestamp(),
        updatedAtServer: serverTimestamp(),
      },
      { merge: true }
    );
  });

  return { alreadyApproved };
}

function currentIso(raw: Record<string, unknown>): string {
  const current = normalizeNullable(raw.submittedAt);
  return current ?? new Date().toISOString();
}

export async function reviewLessonSubmission(params: {
  submissionId: string;
  reviewerUid: string;
  approve: boolean;
}) {
  const { submissionId, reviewerUid, approve } = params;
  const submissionRef = doc(db, "lessonSubmissions", submissionId);
  const now = new Date().toISOString();
  let changed = false;

  await runTransaction(db, async (tx) => {
    const submissionSnap = await tx.get(submissionRef);
    if (!submissionSnap.exists()) {
      throw new Error("La entrega no existe.");
    }

    const submission = submissionSnap.data() as Record<string, unknown>;
    const currentStatus =
      submission.status === "approved" || submission.status === "rejected"
        ? submission.status
        : "pending";

    if (currentStatus === "approved") {
      return;
    }

    tx.update(submissionRef, {
      status: approve ? "approved" : "rejected",
      reviewedAt: now,
      reviewedBy: reviewerUid,
      updatedAt: now,
      updatedAtServer: serverTimestamp(),
    });

    if (!approve) {
      changed = true;
      return;
    }

    const uid = String(submission.uid ?? "");
    if (!uid) {
      throw new Error("No se encontro el usuario de la entrega.");
    }
    const userRef = doc(db, "users", uid);
    const userSnap = await tx.get(userRef);
    const currentPoints = Number((userSnap.data() as Record<string, unknown> | undefined)?.points ?? 0);
    const pointsReward = Number(submission.pointsReward ?? 0);
    tx.set(
      userRef,
      {
        uid,
        points: currentPoints + pointsReward,
        updatedAt: now,
        updatedAtServer: serverTimestamp(),
        createdAt: (userSnap.data() as Record<string, unknown> | undefined)?.createdAt ?? now,
        createdAtServer: (userSnap.data() as Record<string, unknown> | undefined)?.createdAtServer ?? serverTimestamp(),
      },
      { merge: true }
    );

    changed = true;
  });

  return { changed };
}
