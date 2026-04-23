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
} from "firebase/firestore";

import { db } from "@/lib/firebase-services";

import type { Announcement, AnnouncementInput } from "./types";

function normalizeISO(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  const parsed = String(value).trim();
  return parsed.length > 0 ? parsed : null;
}

function toAnnouncement(id: string, raw: Record<string, unknown>): Announcement {
  const audience = raw.audience === "student" ? "student" : "all";
  const targetUserId = normalizeISO(raw.targetUserId);
  return {
    id,
    title: String(raw.title ?? ""),
    message: String(raw.message ?? ""),
    kind:
      raw.kind === "event" || raw.kind === "award" || raw.kind === "promotion"
        ? raw.kind
        : "promotion",
    audience,
    targetUserId: audience === "student" ? targetUserId : null,
    ctaLabel: String(raw.ctaLabel ?? ""),
    ctaUrl: String(raw.ctaUrl ?? ""),
    startAt: normalizeISO(raw.startAt),
    endAt: normalizeISO(raw.endAt),
    isPublished: Boolean(raw.isPublished ?? false),
    createdAt: String(raw.createdAt ?? ""),
    updatedAt: String(raw.updatedAt ?? ""),
  };
}

function isAnnouncementActive(item: Announcement, nowISO: string) {
  const afterStart = !item.startAt || item.startAt <= nowISO;
  const beforeEnd = !item.endAt || item.endAt >= nowISO;
  return item.isPublished && afterStart && beforeEnd;
}

function isAnnouncementVisibleForUser(item: Announcement, uid: string) {
  if (item.audience === "all") {
    return true;
  }

  return item.targetUserId === uid;
}

export function listenAnnouncements(onData: (items: Announcement[]) => void) {
  const listRef = collection(db, "announcements");
  const q = query(listRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((docItem) =>
      toAnnouncement(docItem.id, docItem.data() as Record<string, unknown>)
    );
    onData(items);
  });
}

export function listenActiveAnnouncements(
  uid: string,
  onData: (items: Announcement[]) => void
) {
  return listenAnnouncements((items) => {
    const nowISO = new Date().toISOString();
    const activeItems = items.filter(
      (item) => isAnnouncementActive(item, nowISO) && isAnnouncementVisibleForUser(item, uid)
    );
    onData(activeItems);
  });
}

export async function createAnnouncement(payload: AnnouncementInput) {
  const now = new Date().toISOString();
  const startAt = normalizeISO(payload.startAt);
  const endAt = normalizeISO(payload.endAt);
  const audience = payload.audience === "student" ? "student" : "all";
  const targetUserId =
    audience === "student" ? normalizeISO(payload.targetUserId) : null;
  if (audience === "student" && !targetUserId) {
    throw new Error("Debes seleccionar un alumno para una nota especial.");
  }

  await addDoc(collection(db, "announcements"), {
    title: payload.title.trim(),
    message: payload.message.trim(),
    kind: payload.kind,
    audience,
    targetUserId,
    ctaLabel: String(payload.ctaLabel ?? "").trim(),
    ctaUrl: String(payload.ctaUrl ?? "").trim(),
    startAt,
    endAt,
    isPublished: Boolean(payload.isPublished),
    createdAt: now,
    updatedAt: now,
    createdAtServer: serverTimestamp(),
    updatedAtServer: serverTimestamp(),
  });
}

export async function setAnnouncementPublished(id: string, isPublished: boolean) {
  await updateDoc(doc(db, "announcements", id), {
    isPublished,
    updatedAt: new Date().toISOString(),
    updatedAtServer: serverTimestamp(),
  });
}

export async function removeAnnouncement(id: string) {
  await deleteDoc(doc(db, "announcements", id));
}
