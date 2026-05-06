import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth, db } from "@/lib/firebase-services";
import { trackAnalyticsEvent } from "@/features/analytics/firebase-analytics";

import type { UserProfile, UserRole } from "./types";

function todayISODate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function previousISODate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map((item) => Number(item));
  const current = new Date(Date.UTC(year, month - 1, day));
  current.setUTCDate(current.getUTCDate() - 1);
  return current.toISOString().slice(0, 10);
}

function weekKeyForISODate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map((item) => Number(item));
  const date = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayOfWeek);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
}

function mergeAchievement(existing: unknown, nextAchievement: string): string[] {
  const list = Array.isArray(existing) ? existing.map((item) => String(item)) : [];
  if (list.includes(nextAchievement)) {
    return list;
  }
  return [...list, nextAchievement];
}

function fullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.replace(/\s+/g, " ").trim();
}

function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

function getAdminEmails(): Set<string> {
  const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "";
  const items = raw
    .split(",")
    .map((item) => normalizeEmail(item))
    .filter(Boolean);
  return new Set(items);
}

function mapFirebaseAuthError(error: unknown): Error {
  if (!(error instanceof Error)) {
    return new Error("Error inesperado de autenticación.");
  }

  const message = error.message;
  if (message.includes("auth/invalid-credential")) {
    return new Error("Credenciales inválidas. Revisa tu correo y contraseña.");
  }
  if (message.includes("auth/user-not-found")) {
    return new Error("No existe una cuenta con ese correo.");
  }
  if (message.includes("auth/wrong-password")) {
    return new Error("Contraseña incorrecta.");
  }
  if (message.includes("auth/email-already-in-use")) {
    return new Error("Ese correo ya está registrado.");
  }
  if (message.includes("auth/weak-password")) {
    return new Error("La contraseña debe tener al menos 6 caracteres.");
  }
  if (message.includes("auth/invalid-email")) {
    return new Error("El correo no tiene un formato válido.");
  }
  if (message.includes("auth/configuration-not-found")) {
    return new Error(
      "Firebase Auth no está configurado. Activa el método Correo/Contraseña en Firebase Console."
    );
  }

  return error;
}

function toUserProfile(uid: string, raw: Record<string, unknown>): UserProfile {
  const firstName = String(raw.firstName ?? "");
  const lastName = String(raw.lastName ?? "");

  return {
    uid,
    firstName,
    lastName,
    email: String(raw.email ?? ""),
    phone: String(raw.phone ?? ""),
    birthDate: String(raw.birthDate ?? ""),
    fullName: fullName(firstName, lastName),
    consentAccepted: Boolean(raw.consentAccepted ?? false),
    role: (raw.role as UserRole) ?? "student",
    points: Number(raw.points ?? 0),
    streakCount: Number(raw.streakCount ?? 0),
    longestStreak: Number(raw.longestStreak ?? 0),
    weeklyGoalCount: Number(raw.weeklyGoalCount ?? 0),
    weeklyGoalTarget: Number(raw.weeklyGoalTarget ?? 5),
    achievements: Array.isArray(raw.achievements) ? raw.achievements.map((item) => String(item)) : [],
    lastDailyRewardDate:
      raw.lastDailyRewardDate === null || raw.lastDailyRewardDate === undefined
        ? null
        : String(raw.lastDailyRewardDate),
    createdAt: String(raw.createdAt ?? ""),
    updatedAt: String(raw.updatedAt ?? ""),
  };
}

export async function registerUserWithEmail(params: {
  firstName: string;
  lastName: string;
  phone?: string;
  birthDate: string;
  email: string;
  password: string;
  consentAccepted: boolean;
}) {
  const { firstName, lastName, phone, birthDate, email, password, consentAccepted } = params;
  const normalizedEmail = normalizeEmail(email);
  const adminEmails = getAdminEmails();
  const credential = await createUserWithEmailAndPassword(auth, normalizedEmail, password).catch((error) => {
    throw mapFirebaseAuthError(error);
  });
  const uid = credential.user.uid;
  const userRef = doc(db, "users", uid);
  const now = new Date().toISOString();
  const cleanFirstName = firstName.trim();
  const cleanLastName = lastName.trim();
  const cleanPhone = String(phone ?? "").trim();
  const role: UserRole = adminEmails.has(normalizedEmail) ? "admin" : "student";

  await runTransaction(db, async (tx) => {
    const userSnapshot = await tx.get(userRef);
    if (userSnapshot.exists()) {
      // If a placeholder profile was created during initial auth bootstrap,
      // overwrite it with the real registration data.
      tx.update(userRef, {
        firstName: cleanFirstName,
        lastName: cleanLastName,
        phone: cleanPhone,
        birthDate,
        email: normalizedEmail,
        consentAccepted,
        role,
        updatedAt: now,
        updatedAtServer: serverTimestamp(),
      });
      return;
    }

    tx.set(userRef, {
      uid,
      firstName: cleanFirstName,
      lastName: cleanLastName,
      phone: cleanPhone,
      birthDate,
      email: normalizedEmail,
      consentAccepted,
      role,
      streakCount: 0,
      longestStreak: 0,
      weeklyGoalCount: 0,
      weeklyGoalTarget: 5,
      weeklyGoalWeek: weekKeyForISODate(todayISODate()),
      achievements: [],
      points: 0,
      lastDailyRewardDate: null,
      createdAt: now,
      updatedAt: now,
      createdAtServer: serverTimestamp(),
      updatedAtServer: serverTimestamp(),
    });
  });

  return uid;
}

export async function loginUserWithEmail(params: {
  email: string;
  password: string;
}) {
  const normalizedEmail = normalizeEmail(params.email);
  const credential = await signInWithEmailAndPassword(auth, normalizedEmail, params.password).catch((error) => {
    throw mapFirebaseAuthError(error);
  });
  return { uid: credential.user.uid };
}

export async function syncAdminRoleByEmail(params: {
  uid: string;
  email: string | null | undefined;
}) {
  const normalizedEmail = normalizeEmail(params.email ?? "");
  if (!normalizedEmail) return;

  const adminEmails = getAdminEmails();
  const shouldBeAdmin = adminEmails.has(normalizedEmail);
  const userRef = doc(db, "users", params.uid);
  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) return;

  const currentRole = String(userSnapshot.data().role ?? "student");
  const targetRole: UserRole = shouldBeAdmin ? "admin" : "student";
  if (currentRole === targetRole) return;

  await updateDoc(userRef, {
    role: targetRole,
    updatedAt: new Date().toISOString(),
    updatedAtServer: serverTimestamp(),
  });
}

export async function signOutUser() {
  await signOut(auth);
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
        email: "",
        phone: "",
        birthDate: "",
        consentAccepted: true,
        role: "student",
        streakCount: 1,
        longestStreak: 1,
        weeklyGoalCount: 1,
        weeklyGoalTarget: 5,
        weeklyGoalWeek: weekKeyForISODate(today),
        achievements: [],
        points: 1,
        lastDailyRewardDate: today,
        lastLoginDate: today,
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
    const previousLoginDate = String(data.lastLoginDate ?? "");
    const yesterday = previousISODate(today);
    const previousStreak = Number(data.streakCount ?? 0);
    const streakCount =
      previousLoginDate === today
        ? previousStreak
        : previousLoginDate === yesterday
          ? previousStreak + 1
          : 1;
    const longestStreak = Math.max(Number(data.longestStreak ?? 0), streakCount);
    const currentWeekKey = weekKeyForISODate(today);
    const previousWeekKey = String(data.weeklyGoalWeek ?? "");
    const previousWeeklyCount = Number(data.weeklyGoalCount ?? 0);
    const weeklyGoalCount =
      previousLoginDate === today
        ? previousWeeklyCount
        : previousWeekKey === currentWeekKey
          ? previousWeeklyCount + 1
          : 1;
    const weeklyGoalTarget = Number(data.weeklyGoalTarget ?? 5);
    let achievements = Array.isArray(data.achievements)
      ? data.achievements.map((item) => String(item))
      : [];
    if (streakCount >= 3) {
      achievements = mergeAchievement(achievements, "racha-3");
    }
    if (weeklyGoalCount >= weeklyGoalTarget) {
      achievements = mergeAchievement(achievements, "meta-semanal");
    }

    if (alreadyRewarded) {
      tx.update(userRef, {
        streakCount,
        longestStreak,
        weeklyGoalCount,
        weeklyGoalTarget,
        weeklyGoalWeek: currentWeekKey,
        achievements,
        lastLoginDate: today,
        updatedAt: now,
        updatedAtServer: serverTimestamp(),
      });
      awarded = false;
      nextPoints = currentPoints;
      return;
    }

    nextPoints = currentPoints + 1;
    awarded = true;

    tx.update(userRef, {
      points: nextPoints,
      lastDailyRewardDate: today,
      lastLoginDate: today,
      streakCount,
      longestStreak,
      weeklyGoalCount,
      weeklyGoalTarget,
      weeklyGoalWeek: currentWeekKey,
      achievements,
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
        email: "",
        phone: "",
        birthDate: "",
        consentAccepted: true,
        role: "student",
        streakCount: 0,
        longestStreak: 0,
        weeklyGoalCount: 0,
        weeklyGoalTarget: 5,
        weeklyGoalWeek: weekKeyForISODate(todayISODate()),
        achievements: [],
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

export function listenStudentLeaderboard(onData: (items: UserProfile[]) => void) {
  const usersRef = collection(db, "users");
  return onSnapshot(usersRef, (snapshot) => {
    const users = snapshot.docs
      .map((docItem) => toUserProfile(docItem.id, docItem.data() as Record<string, unknown>))
      .filter((user) => user.role === "student")
      .sort((a, b) => b.points - a.points)
      .slice(0, 10);
    onData(users);
  });
}

export async function setUserRole(uid: string, role: UserRole) {
  await updateDoc(doc(db, "users", uid), {
    role,
    updatedAt: new Date().toISOString(),
    updatedAtServer: serverTimestamp(),
  });
}

export async function trackLessonApprovedAnalytics(params: {
  uid: string;
  lessonId: string;
  lessonNumber: number;
  courseName?: string;
  reviewerUid: string;
}) {
  await trackAnalyticsEvent({
    event: "lesson_approved",
    uid: params.uid,
    lessonId: params.lessonId,
    lessonNumber: params.lessonNumber,
    courseName: params.courseName,
    metadata: {
      reviewerUid: params.reviewerUid,
    },
  });
}
