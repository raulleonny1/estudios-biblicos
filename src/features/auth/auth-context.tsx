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

import { db } from "@/lib/firebase-services";

import { loginUserWithPin, registerUserWithPin, rewardDailyLogin } from "./firebase-user";
import type { UserProfile } from "./types";

type SessionUser = { uid: string };

type AuthContextValue = {
  authUser: SessionUser | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdminMasterSession: boolean;
  signIn: (params: {
    pin: string;
  }) => Promise<void>;
  signUp: (params: {
    firstName: string;
    lastName: string;
    birthDate: string;
    pin: string;
    consentAccepted: boolean;
  }) => Promise<void>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const SESSION_KEY = "app-eb-session-uid";
const ADMIN_SESSION_KEY = "app-eb-admin-master-session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const initialUid = typeof window !== "undefined" ? localStorage.getItem(SESSION_KEY) : null;
  const initialAdminMasterSession =
    typeof window !== "undefined" ? localStorage.getItem(ADMIN_SESSION_KEY) === "1" : false;
  const [authUser, setAuthUser] = useState<SessionUser | null>(
    initialUid ? { uid: initialUid } : null
  );
  const [isAdminMasterSession, setIsAdminMasterSession] = useState(initialAdminMasterSession);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(Boolean(initialUid));
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
        birthDate: String(data.birthDate ?? ""),
        fullName: `${firstName} ${lastName}`.replace(/\s+/g, " ").trim(),
        consentAccepted: Boolean(data.consentAccepted ?? false),
        role: data.role === "admin" ? "admin" : "student",
        points: Number(data.points ?? 0),
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
    if (!authUser) {
      return;
    }

    void rewardDailyLogin(authUser.uid).finally(() => {
      attachProfileListener(authUser.uid);
    });

    return () => {
      clearProfileListener();
    };
  }, [attachProfileListener, authUser, clearProfileListener]);

  const value = useMemo<AuthContextValue>(
    () => ({
      authUser,
      profile,
      loading,
      isAdminMasterSession,
      signIn: async ({ pin }) => {
        setLoading(true);
        try {
          const { uid, viaAdminMasterPin } = await loginUserWithPin({ pin });
          localStorage.setItem(SESSION_KEY, uid);
          localStorage.setItem(ADMIN_SESSION_KEY, viaAdminMasterPin ? "1" : "0");
          setIsAdminMasterSession(viaAdminMasterPin);
          setAuthUser({ uid });
          await rewardDailyLogin(uid);
          attachProfileListener(uid);
        } catch (error) {
          setLoading(false);
          throw error;
        }
      },
      signUp: async ({ firstName, lastName, birthDate, pin, consentAccepted }) => {
        setLoading(true);
        if (!consentAccepted) {
          setLoading(false);
          throw new Error("Debes aceptar el uso de datos para continuar.");
        }
        try {
          const uid = await registerUserWithPin({
            firstName,
            lastName,
            birthDate,
            pin,
            consentAccepted,
          });
          localStorage.setItem(SESSION_KEY, uid);
          setAuthUser({ uid });
          await rewardDailyLogin(uid);
          attachProfileListener(uid);
        } catch (error) {
          setLoading(false);
          throw error;
        }
      },
      logOut: async () => {
        localStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(ADMIN_SESSION_KEY);
        clearProfileListener();
        setAuthUser(null);
        setIsAdminMasterSession(false);
        setProfile(null);
        setLoading(false);
      }
    }),
    [
      attachProfileListener,
      authUser,
      clearProfileListener,
      isAdminMasterSession,
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
