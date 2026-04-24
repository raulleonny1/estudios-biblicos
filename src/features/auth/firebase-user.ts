import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase-services";

import type { UserProfile, UserRole } from "./types";

const ADMIN_MASTER_UID = "admin-master";

function todayISODate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.replace(/\s+/g, " ").trim();
}

function hashString(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const payload = encoder.encode(value);
  return crypto.subtle.digest("SHA-256", payload).then((buffer) => {
    const bytes = Array.from(new Uint8Array(buffer));
    return bytes.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  });
}

async function getCredentialKey(params: {
  pin: string;
}) {
  const raw = params.pin;
  return hashString(raw);
}

async function ensureMasterAdminUser() {
  const userRef = doc(db, "users", ADMIN_MASTER_UID);
  const userSnap = await getDoc(userRef);
  const now = new Date().toISOString();

  if (!userSnap.exists()) {
    await runTransaction(db, async (tx) => {
      tx.set(userRef, {
        uid: ADMIN_MASTER_UID,
        firstName: "Admin",
        lastName: "",
        phone: "",
        birthDate: "",
        consentAccepted: true,
        role: "admin",
        points: 0,
        lastDailyRewardDate: null,
        createdAt: now,
        updatedAt: now,
        createdAtServer: serverTimestamp(),
        updatedAtServer: serverTimestamp(),
      });
    });
    return ADMIN_MASTER_UID;
  }

  await updateDoc(userRef, {
    firstName: "Admin",
    lastName: "",
    phone: "",
    role: "admin",
    updatedAt: now,
    updatedAtServer: serverTimestamp(),
  });

  return ADMIN_MASTER_UID;
}

async function demoteNonSystemAdmins() {
  const adminsQuery = query(collection(db, "users"), where("role", "==", "admin"));
  const adminsSnapshot = await getDocs(adminsQuery);
  const now = new Date().toISOString();

  const updates = adminsSnapshot.docs
    .filter((docItem) => docItem.id !== ADMIN_MASTER_UID)
    .map((docItem) =>
      updateDoc(doc(db, "users", docItem.id), {
        role: "student",
        updatedAt: now,
        updatedAtServer: serverTimestamp(),
      })
    );

  await Promise.all(updates);
}

function toUserProfile(uid: string, raw: Record<string, unknown>): UserProfile {
  const firstName = String(raw.firstName ?? "");
  const lastName = String(raw.lastName ?? "");

  return {
    uid,
    firstName,
    lastName,
    phone: String(raw.phone ?? ""),
    birthDate: String(raw.birthDate ?? ""),
    fullName: fullName(firstName, lastName),
    consentAccepted: Boolean(raw.consentAccepted ?? false),
    role: (raw.role as UserRole) ?? "student",
    points: Number(raw.points ?? 0),
    lastDailyRewardDate:
      raw.lastDailyRewardDate === null || raw.lastDailyRewardDate === undefined
        ? null
        : String(raw.lastDailyRewardDate),
    createdAt: String(raw.createdAt ?? ""),
    updatedAt: String(raw.updatedAt ?? ""),
  };
}

export async function registerUserWithPin(params: {
  firstName: string;
  lastName: string;
  phone?: string;
  birthDate: string;
  pin: string;
  consentAccepted: boolean;
}) {
  const { firstName, lastName, phone, birthDate, pin, consentAccepted } = params;
  const uid = crypto.randomUUID();
  const userRef = doc(db, "users", uid);
  const credentialKey = await getCredentialKey({ pin });
  const credentialRef = doc(db, "userCredentials", credentialKey);
  const now = new Date().toISOString();
  const cleanFirstName = firstName.trim();
  const cleanLastName = lastName.trim();
  const cleanPhone = String(phone ?? "").trim();
  const role: UserRole = "student";

  await runTransaction(db, async (tx) => {
    const credentialSnapshot = await tx.get(credentialRef);
    if (credentialSnapshot.exists()) {
      throw new Error("Ya existe un usuario con esos datos y PIN.");
    }

    tx.set(userRef, {
      uid,
      firstName: cleanFirstName,
      lastName: cleanLastName,
      phone: cleanPhone,
      birthDate,
      consentAccepted,
      role,
      points: 0,
      lastDailyRewardDate: null,
      createdAt: now,
      updatedAt: now,
      createdAtServer: serverTimestamp(),
      updatedAtServer: serverTimestamp(),
    });

    tx.set(credentialRef, {
      uid,
      createdAt: now,
      createdAtServer: serverTimestamp(),
    });
  });

  return uid;
}

export async function loginUserWithPin(params: {
  pin: string;
}) {
  const masterPin = (process.env.NEXT_PUBLIC_ADMIN_MASTER_PIN ?? "").trim();
  if (masterPin && params.pin === masterPin) {
    if (!/^\d{4}$/.test(masterPin)) {
      throw new Error("Configura NEXT_PUBLIC_ADMIN_MASTER_PIN con exactamente 4 dígitos.");
    }

    await ensureMasterAdminUser();
    await demoteNonSystemAdmins();
    return { uid: ADMIN_MASTER_UID, viaAdminMasterPin: true };
  }

  const credentialKey = await getCredentialKey(params);
  const credentialSnapshot = await getDoc(doc(db, "userCredentials", credentialKey));

  if (!credentialSnapshot.exists()) {
    throw new Error("Datos o PIN incorrectos.");
  }

  const uid = String(credentialSnapshot.data().uid ?? "");
  if (!uid) {
    throw new Error("No se encontro el usuario.");
  }

  return { uid, viaAdminMasterPin: false };
}

export async function rewardDailyLogin(uid: string) {
  const userRef = doc(db, "users", uid);
  const today = todayISODate();
  let awarded = false;
  let nextPoints = 0;

  await runTransaction(db, async (tx) => {
    const userSnap = await tx.get(userRef);
    const now = new Date().toISOString();

    if (!userSnap.exists()) {
      tx.set(userRef, {
        uid,
        firstName: "estudiante",
        lastName: "",
        phone: "",
        birthDate: "",
        consentAccepted: true,
        role: "student",
        points: 1,
        lastDailyRewardDate: today,
        createdAt: now,
        updatedAt: now,
        createdAtServer: serverTimestamp(),
        updatedAtServer: serverTimestamp(),
      });
      awarded = true;
      nextPoints = 1;
      return;
    }

    const data = userSnap.data() as Record<string, unknown>;
    const role = String(data.role ?? "student");
    if (role === "admin") {
      awarded = false;
      nextPoints = Number(data.points ?? 0);
      return;
    }

    const currentPoints = Number(data.points ?? 0);
    const alreadyRewarded = data.lastDailyRewardDate === today;

    if (alreadyRewarded) {
      awarded = false;
      nextPoints = currentPoints;
      return;
    }

    nextPoints = currentPoints + 1;
    awarded = true;

    tx.update(userRef, {
      points: nextPoints,
      lastDailyRewardDate: today,
      updatedAt: now,
      updatedAtServer: serverTimestamp(),
    });
  });

  return { awarded, points: nextPoints };
}

export async function rewardLessonCompletion(params: {
  uid: string;
  lessonId: string;
  pointsReward: number;
  score: number;
  total: number;
}) {
  const { uid, lessonId, pointsReward, score, total } = params;
  const userRef = doc(db, "users", uid);
  const progressRef = doc(db, "lessonProgress", `${uid}_${lessonId}`);
  let awarded = false;
  let nextPoints = 0;

  await runTransaction(db, async (tx) => {
    const [userSnap, progressSnap] = await Promise.all([
      tx.get(userRef),
      tx.get(progressRef),
    ]);
    const now = new Date().toISOString();

    if (progressSnap.exists()) {
      const current = Number((userSnap.data() as Record<string, unknown>)?.points ?? 0);
      awarded = false;
      nextPoints = current;
      return;
    }

    const currentPoints = Number((userSnap.data() as Record<string, unknown>)?.points ?? 0);
    nextPoints = currentPoints + pointsReward;
    awarded = true;

    if (userSnap.exists()) {
      tx.update(userRef, {
        points: nextPoints,
        updatedAt: now,
        updatedAtServer: serverTimestamp(),
      });
    } else {
      tx.set(userRef, {
        uid,
        firstName: "estudiante",
        lastName: "",
        phone: "",
        birthDate: "",
        consentAccepted: true,
        role: "student",
        points: nextPoints,
        lastDailyRewardDate: null,
        createdAt: now,
        updatedAt: now,
        createdAtServer: serverTimestamp(),
        updatedAtServer: serverTimestamp(),
      });
    }

    tx.set(progressRef, {
      uid,
      lessonId,
      score,
      total,
      completedAt: now,
      completedAtServer: serverTimestamp(),
    });
  });

  return { awarded, points: nextPoints };
}

export async function listUsers(): Promise<UserProfile[]> {
  const snapshot = await getDocs(collection(db, "users"));
  const users = snapshot.docs.map((docItem) =>
    toUserProfile(docItem.id, docItem.data() as Record<string, unknown>)
  );

  return users.sort((a, b) => b.points - a.points);
}

export async function setUserRole(uid: string, role: UserRole) {
  await updateDoc(doc(db, "users", uid), {
    role,
    updatedAt: new Date().toISOString(),
    updatedAtServer: serverTimestamp(),
  });
}
