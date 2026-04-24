import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase-services";

export type AnnouncementAttendanceChoice = "yes" | "no";

export type AnnouncementAttendanceRecord = {
  id: string;
  announcementId: string;
  uid: string;
  choice: AnnouncementAttendanceChoice;
  updatedAt: string;
};

function toAttendanceRecord(
  id: string,
  raw: Record<string, unknown>
): AnnouncementAttendanceRecord | null {
  const choice = raw.choice === "yes" || raw.choice === "no" ? raw.choice : null;
  const announcementId = String(raw.announcementId ?? "");
  const uid = String(raw.uid ?? "");

  if (!choice || !announcementId || !uid) return null;

  return {
    id,
    announcementId,
    uid,
    choice,
    updatedAt: String(raw.updatedAt ?? ""),
  };
}

export async function saveAnnouncementAttendance(
  announcementId: string,
  uid: string,
  choice: AnnouncementAttendanceChoice
) {
  const recordId = `${announcementId}__${uid}`;
  const now = new Date().toISOString();
  await setDoc(doc(db, "announcementAttendance", recordId), {
    announcementId,
    uid,
    choice,
    updatedAt: now,
    updatedAtServer: serverTimestamp(),
  });
}

export function listenAnnouncementAttendance(
  onData: (items: AnnouncementAttendanceRecord[]) => void
) {
  const listRef = collection(db, "announcementAttendance");
  const q = query(listRef, orderBy("updatedAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs
      .map((docItem) => toAttendanceRecord(docItem.id, docItem.data() as Record<string, unknown>))
      .filter((item): item is AnnouncementAttendanceRecord => Boolean(item));
    onData(items);
  });
}
