import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

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

export async function createPrayerRequest(params: {
  firstName: string;
  lastName: string;
  phone: string;
  reason: string;
}) {
  const now = new Date().toISOString();
  const docRef = await addDoc(collection(db, "prayerRequests"), {
    firstName: params.firstName.trim(),
    lastName: params.lastName.trim(),
    phone: params.phone.trim(),
    reason: params.reason.trim(),
    status: "active",
    createdAt: now,
    updatedAt: now,
    createdAtServer: serverTimestamp(),
    updatedAtServer: serverTimestamp(),
  });

  return docRef.id;
}

export function listenPrayerRequests(
  onData: (items: PrayerRequest[]) => void,
  onError?: (error: Error) => void
) {
  const listRef = collection(db, "prayerRequests");
  const q = query(listRef, orderBy("createdAt", "desc"));

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((docItem) =>
        toPrayerRequest(docItem.id, docItem.data() as Record<string, unknown>)
      );
      onData(items);
    },
    (error) => {
      onError?.(error instanceof Error ? error : new Error("No se pudieron cargar los pedidos."));
    }
  );
}

export async function deletePrayerRequest(params: { id: string; deletedByUid?: string }) {
  const { id, deletedByUid } = params;
  const sourceRef = doc(db, "prayerRequests", id);
  const archiveRef = doc(collection(db, "prayerRequestsArchive"));
  const now = new Date().toISOString();

  await runTransaction(db, async (tx) => {
    const current = await tx.get(sourceRef);
    if (!current.exists()) {
      throw new Error("El pedido ya no existe en Firestore.");
    }

    const data = current.data();
    tx.set(archiveRef, {
      ...data,
      originalId: id,
      deletedAt: now,
      deletedAtServer: serverTimestamp(),
      deletedByUid: deletedByUid ?? "",
    });
    tx.delete(sourceRef);
  });
}
