"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "@/lib/firebase-services";

import { resolveUserRole } from "@/lib/admin-config";
import {
  ensureUserProfileOnLogin,
  loginUserWithEmail,
  registerUserWithEmail,
  runPostLoginTasks,
  signOutUser,
} from "./firebase-user";
import type { UserProfile } from "./types";

type SessionUser = { uid: string; email: string };

type AuthContextValue = {
  authUser: SessionUser | null;
  profile: UserProfile | null;
  loading: boolean;
  profileError: string | null;
  retryProfileBootstrap: () => Promise<void>;
  signIn: (params: {
    email: string;
    password: string;
  }) => Promise<void>;
  signUp: (params: {
    firstName: string;
    lastName: string;
    phone?: string;
    birthDate: string;
    email: string;
    password: string;
    consentAccepted: boolean;
  }) => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function mapProfileFromSnapshot(
  uid: string,
  data: Record<string, unknown>,
  sessionEmail: string | null
): UserProfile {
  const firstName = String(data.firstName ?? "");
  const lastName = String(data.lastName ?? "");
  const profileEmail = String(data.email ?? "") || sessionEmail || "";

  return {
    uid,
    firstName,
    lastName,
    phone: String(data.phone ?? ""),
    birthDate: String(data.birthDate ?? ""),
    email: profileEmail,
    fullName: `${firstName} ${lastName}`.replace(/\s+/g, " ").trim(),
    consentAccepted: Boolean(data.consentAccepted ?? false),
    role: resolveUserRole(sessionEmail || profileEmail, data.role),
    points: Number(data.points ?? 0),
    streakCount: Number(data.streakCount ?? 0),
    longestStreak: Number(data.longestStreak ?? 0),
    weeklyGoalCount: Number(data.weeklyGoalCount ?? 0),
    weeklyGoalTarget: Number(data.weeklyGoalTarget ?? 5),
    achievements: Array.isArray(data.achievements)
      ? data.achievements.map((item) => String(item))
      : [],
    lastDailyRewardDate:
      data.lastDailyRewardDate === null || data.lastDailyRewardDate === undefined
        ? null
        : String(data.lastDailyRewardDate),
    createdAt: String(data.createdAt ?? ""),
    updatedAt: String(data.updatedAt ?? ""),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState<SessionUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const bootstrapInFlightRef = useRef(false);
  const postLoginTasksUidRef = useRef<string | null>(null);
  const sessionEmailRef = useRef("");
  const sessionUidRef = useRef("");

  const clearProfileListener = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
  }, []);

  const schedulePostLoginTasks = useCallback((uid: string, email: string) => {
    if (postLoginTasksUidRef.current === uid) return;
    postLoginTasksUidRef.current = uid;
    void runPostLoginTasks(uid, email);
  }, []);

  const bootstrapProfile = useCallback(async (uid: string, email: string) => {
    if (bootstrapInFlightRef.current) return;
    bootstrapInFlightRef.current = true;
    setProfileError(null);

    try {
      await ensureUserProfileOnLogin(uid, email);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo crear o sincronizar tu perfil en Firestore.";
      setProfileError(message);
      setLoading(false);
    } finally {
      bootstrapInFlightRef.current = false;
    }
  }, []);

  const attachProfileListener = useCallback(
    (uid: string, sessionEmail: string | null) => {
      clearProfileListener();
      sessionEmailRef.current = sessionEmail ?? "";
      sessionUidRef.current = uid;

      const profileRef = doc(db, "users", uid);
      unsubscribeRef.current = onSnapshot(
        profileRef,
        (snapshot) => {
          if (!snapshot.exists()) {
            setProfile(null);
            void bootstrapProfile(uid, sessionEmail ?? "");
            return;
          }

          setProfile(mapProfileFromSnapshot(uid, snapshot.data() as Record<string, unknown>, sessionEmail));
          setProfileError(null);
          setLoading(false);
          schedulePostLoginTasks(uid, sessionEmail ?? "");
        },
        (error) => {
          console.error("No se pudo escuchar el perfil del usuario", error);
          setProfile(null);
          setProfileError(
            "Permiso denegado al leer tu perfil. Despliega las reglas de Firestore o revisa la base de datos app-eb."
          );
          setLoading(false);
        }
      );
    },
    [bootstrapProfile, clearProfileListener, schedulePostLoginTasks]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        clearProfileListener();
        postLoginTasksUidRef.current = null;
        setAuthUser(null);
        setProfile(null);
        setProfileError(null);
        setLoading(false);
        return;
      }

      const sessionEmail = firebaseUser.email ?? "";
      setAuthUser({ uid: firebaseUser.uid, email: sessionEmail });
      setLoading(true);
      attachProfileListener(firebaseUser.uid, sessionEmail);
    });

    return () => {
      unsubscribe();
      clearProfileListener();
    };
  }, [attachProfileListener, clearProfileListener]);

  const retryProfileBootstrap = useCallback(async () => {
    if (!sessionUidRef.current) return;
    postLoginTasksUidRef.current = null;
    await bootstrapProfile(sessionUidRef.current, sessionEmailRef.current);
  }, [bootstrapProfile]);

  const value = useMemo<AuthContextValue>(
    () => ({
      authUser,
      profile,
      loading,
      profileError,
      retryProfileBootstrap,
      signIn: async ({ email, password }) => {
        setProfileError(null);
        try {
          await loginUserWithEmail({ email, password });
          // No esperar Firestore aquí: la redirección la hace la página de login.
        } catch (error) {
          setLoading(false);
          throw error;
        }
      },
      signUp: async ({ firstName, lastName, phone, birthDate, email, password, consentAccepted }) => {
        setLoading(true);
        setProfileError(null);
        if (!consentAccepted) {
          setLoading(false);
          throw new Error("Debes aceptar el uso de datos para continuar.");
        }
        try {
          await registerUserWithEmail({
            firstName,
            lastName,
            phone,
            birthDate,
            email,
            password,
            consentAccepted,
          });
        } catch (error) {
          setLoading(false);
          throw error;
        }
      },
      logOut: async () => {
        await signOutUser();
        clearProfileListener();
        postLoginTasksUidRef.current = null;
        setAuthUser(null);
        setProfile(null);
        setProfileError(null);
        setLoading(false);
      },
    }),
    [authUser, clearProfileListener, loading, profile, profileError, retryProfileBootstrap]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}
