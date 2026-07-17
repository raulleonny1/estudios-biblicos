import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase-services";

import type { FeedbackCategory, StudentFeedback } from "./types";

function toFeedback(id: string, raw: Record<string, unknown>): StudentFeedback {
  const category =
    raw.category === "suggestion" || raw.category === "error" || raw.category === "problem"
      ? raw.category
      : "suggestion";

  return {
    id,
    uid: String(raw.uid ?? ""),
    displayName: String(raw.displayName ?? ""),
    email: String(raw.email ?? ""),
    category,
    message: String(raw.message ?? ""),
    createdAt: String(raw.createdAt ?? ""),
  };
}

export async function createStudentFeedback(params: {
  uid: string;
  displayName: string;
  email: string;
  category: FeedbackCategory;
  message: string;
}) {
  const message = params.message.trim();
  if (message.length < 5) {
    throw new Error("Escribe un mensaje un poco más detallado.");
  }

  const now = new Date().toISOString();
  await addDoc(collection(db, "studentFeedback"), {
    uid: params.uid,
    displayName: params.displayName.trim(),
    email: params.email.trim().toLowerCase(),
    category: params.category,
    message,
    createdAt: now,
    createdAtServer: serverTimestamp(),
  });
}

export function listenStudentFeedback(onData: (items: StudentFeedback[]) => void) {
  const listRef = collection(db, "studentFeedback");
  const q = query(listRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((docItem) =>
      toFeedback(docItem.id, docItem.data() as Record<string, unknown>)
    );
    onData(items);
  });
}

export async function deleteStudentFeedback(id: string) {
  await deleteDoc(doc(db, "studentFeedback", id));
}

export function feedbackCategoryLabel(category: FeedbackCategory) {
  if (category === "error") return "Error";
  if (category === "problem") return "Problema";
  return "Sugerencia";
}
