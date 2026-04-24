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

function parseDateMs(value: string | null): number | null {
  if (!value) return null;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function toAnnouncement(id: string, raw: Record<string, unknown>): Announcement {
  const audience = raw.audience === "student" ? "student" : "all";
  const targetUserId = normalizeISO(raw.targetUserId);
  const rawTargetUserIds = Array.isArray(raw.targetUserIds)
    ? raw.targetUserIds
        .map((value) => normalizeISO(value))
        .filter((value): value is string => Boolean(value))
    : [];
  const targetUserIds = rawTargetUserIds.length > 0
    ? rawTargetUserIds
    : targetUserId
      ? [targetUserId]
      : [];
  return {
    id,
    title: String(raw.title ?? ""),
    message: String(raw.message ?? ""),
    imageUrl: String(raw.imageUrl ?? "").trim(),
    kind:
      raw.kind === "event" || raw.kind === "award" || raw.kind === "promotion"
        ? raw.kind
        : "promotion",
    audience,
    targetUserId: audience === "student" ? (targetUserIds[0] ?? null) : null,
    targetUserIds: audience === "student" ? targetUserIds : [],
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
  const nowMs = Date.parse(nowISO);
  const startMs = parseDateMs(item.startAt);
  const endMs = parseDateMs(item.endAt);
  const afterStart = startMs === null || startMs <= nowMs;
  const beforeEnd = endMs === null || endMs >= nowMs;
  return item.isPublished && afterStart && beforeEnd;
}

function isAnnouncementVisibleForUser(item: Announcement, uid: string) {
  if (item.audience === "all") {
    return true;
  }

  if (item.targetUserIds.length > 0) {
    return item.targetUserIds.includes(uid);
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
  const targetUserIds =
    audience === "student"
      ? Array.from(
          new Set(
            (payload.targetUserIds ?? [])
              .map((value) => normalizeISO(value))
              .filter((value): value is string => Boolean(value))
          )
        )
      : [];
  const fallbackTargetUserId = normalizeISO(payload.targetUserId);
  if (audience === "student" && targetUserIds.length === 0 && !fallbackTargetUserId) {
    throw new Error("Debes seleccionar al menos un alumno para una nota especial.");
  }
  const normalizedTargetUserIds =
    targetUserIds.length > 0
      ? targetUserIds
      : fallbackTargetUserId
        ? [fallbackTargetUserId]
        : [];
  const targetUserId = audience === "student" ? (normalizedTargetUserIds[0] ?? null) : null;

  await addDoc(collection(db, "announcements"), {
    title: payload.title.trim(),
    message: payload.message.trim(),
    imageUrl: String(payload.imageUrl ?? "").trim(),
    kind: payload.kind,
    audience,
    targetUserId,
    targetUserIds: audience === "student" ? normalizedTargetUserIds : [],
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
