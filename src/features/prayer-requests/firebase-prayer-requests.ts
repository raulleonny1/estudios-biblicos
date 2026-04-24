import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { db } from "@/lib/firebase-services";

import type { PrayerRequest } from "./types";

function toPrayerRequest(id: string, raw: Record<string, unknown>): PrayerRequest {
  return {
    id,
    firstName: String(raw.firstName ?? ""),
    lastName: String(raw.lastName ?? ""),
    phone: String(raw.phone ?? ""),
    reason: String(raw.reason ?? ""),
    createdAt: String(raw.createdAt ?? ""),
  };
}

export function listenPrayerRequests(onData: (items: PrayerRequest[]) => void) {
  const listRef = collection(db, "prayerRequests");
  const q = query(listRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((docItem) =>
      toPrayerRequest(docItem.id, docItem.data() as Record<string, unknown>)
    );
    onData(items);
  });
}
