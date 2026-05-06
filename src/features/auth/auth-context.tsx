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

import {
  loginUserWithEmail,
  registerUserWithEmail,
  rewardDailyLogin,
  signOutUser,
  syncAdminRoleByEmail,
} from "./firebase-user";
import type { UserProfile } from "./types";

type SessionUser = { uid: string };

type AuthContextValue = {
  authUser: SessionUser | null;
  profile: UserProfile | null;
  loading: boolean;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState<SessionUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const clearProfileListener = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
  }, []);

  const attachProfileListener = useCallback(
    (uid: string) => {
    clearProfileListener();
    const profileRef = doc(db, "users", uid);
    unsubscribeRef.current = onSnapshot(profileRef, (snapshot) => {
      if (!snapshot.exists()) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const data = snapshot.data();
      const firstName = String(data.firstName ?? "");
      const lastName = String(data.lastName ?? "");

      setProfile({
        uid,
        firstName,
        lastName,
        phone: String(data.phone ?? ""),
        birthDate: String(data.birthDate ?? ""),
        email: String(data.email ?? ""),
        fullName: `${firstName} ${lastName}`.replace(/\s+/g, " ").trim(),
        consentAccepted: Boolean(data.consentAccepted ?? false),
        role: data.role === "admin" ? "admin" : "student",
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
      });
      setLoading(false);
    });
    },
    [clearProfileListener]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        clearProfileListener();
        setAuthUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setAuthUser({ uid: firebaseUser.uid });
      void syncAdminRoleByEmail({ uid: firebaseUser.uid, email: firebaseUser.email })
        .catch(() => null)
        .finally(() => {
          void rewardDailyLogin(firebaseUser.uid).finally(() => {
            attachProfileListener(firebaseUser.uid);
          });
        });
    });

    return () => {
      unsubscribe();
      clearProfileListener();
    };
  }, [attachProfileListener, clearProfileListener]);

  const value = useMemo<AuthContextValue>(
    () => ({
      authUser,
      profile,
      loading,
      signIn: async ({ email, password }) => {
        setLoading(true);
        try {
          await loginUserWithEmail({ email, password });
        } catch (error) {
          setLoading(false);
          throw error;
        }
      },
      signUp: async ({ firstName, lastName, phone, birthDate, email, password, consentAccepted }) => {
        setLoading(true);
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
        setAuthUser(null);
        setProfile(null);
        setLoading(false);
      }
    }),
    [
      authUser,
      clearProfileListener,
      loading,
      profile,
    ]
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
