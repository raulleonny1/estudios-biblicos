import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { db, storage } from "@/lib/firebase-services";

import type { WeeklyBulletin, WeeklyBulletinInput } from "./types";

function toWeeklyBulletin(id: string, raw: Record<string, unknown>): WeeklyBulletin {
  return {
    id,
    title: String(raw.title ?? ""),
    weekLabel: String(raw.weekLabel ?? ""),
    fileUrl: String(raw.fileUrl ?? ""),
    fileName: String(raw.fileName ?? ""),
    storagePath: String(raw.storagePath ?? ""),
    uploadedBy: String(raw.uploadedBy ?? ""),
    isPublished: Boolean(raw.isPublished ?? false),
    createdAt: String(raw.createdAt ?? ""),
  };
}

export function listenWeeklyBulletins(onData: (items: WeeklyBulletin[]) => void) {
  const listRef = collection(db, "weeklyBulletins");
  const q = query(listRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((docItem) =>
      toWeeklyBulletin(docItem.id, docItem.data() as Record<string, unknown>)
    );
    onData(items);
  });
}

export function listenPublishedWeeklyBulletins(onData: (items: WeeklyBulletin[]) => void) {
  const listRef = collection(db, "weeklyBulletins");
  const q = query(
    listRef,
    where("isPublished", "==", true),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((docItem) =>
      toWeeklyBulletin(docItem.id, docItem.data() as Record<string, unknown>)
    );
    onData(items);
  });
}

function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function uploadWeeklyBulletin(params: {
  file: File;
  input: WeeklyBulletinInput;
  uploadedBy: string;
}) {
  const { file, input, uploadedBy } = params;

  if (file.type !== "application/pdf") {
    throw new Error("Solo se permiten archivos PDF.");
  }

  if (file.size > 15 * 1024 * 1024) {
    throw new Error("El PDF no puede superar los 15 MB.");
  }

  const now = new Date().toISOString();
  const safeName = sanitizeFileName(file.name || "hoja-dominical.pdf");
  const storagePath = `weekly-bulletins/${Date.now()}_${safeName}`;
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, file, {
    contentType: "application/pdf",
  });

  const fileUrl = await getDownloadURL(storageRef);

  await addDoc(collection(db, "weeklyBulletins"), {
    title: input.title.trim(),
    weekLabel: input.weekLabel.trim(),
    fileUrl,
    fileName: safeName,
    storagePath,
    uploadedBy,
    isPublished: input.isPublished,
    createdAt: now,
    createdAtServer: serverTimestamp(),
  });
}

export async function setWeeklyBulletinPublished(id: string, isPublished: boolean) {
  await updateDoc(doc(db, "weeklyBulletins", id), {
    isPublished,
    updatedAt: new Date().toISOString(),
    updatedAtServer: serverTimestamp(),
  });
}

export async function deleteWeeklyBulletin(item: WeeklyBulletin) {
  if (item.storagePath) {
    await deleteObject(ref(storage, item.storagePath)).catch(() => null);
  }
  await deleteDoc(doc(db, "weeklyBulletins", item.id));
}
