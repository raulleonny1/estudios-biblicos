"use client";

import type { ReactNode } from "react";

import { useAuth } from "@/features/auth/auth-context";

type SessionGateProps = {
  children: ReactNode;
  requireAdmin?: boolean;
};

export function SessionGate({ children, requireAdmin = false }: SessionGateProps) {
  const { authUser, profile, loading, profileError, retryProfileBootstrap, logOut } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-zinc-700">Cargando...</p>
      </main>
    );
  }

  if (!authUser) {
    return null;
  }

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
        <section className="w-full max-w-md rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
          <h1 className="text-lg font-bold text-zinc-900">No se pudo cargar tu perfil</h1>
          <p className="mt-2 text-sm text-zinc-700">
            Tu sesión está activa como <strong>{authUser.email || authUser.uid}</strong>, pero no
            encontramos tu ficha en la base de datos de la Escuela Bíblica.
          </p>
          {profileError ? (
            <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {profileError}
            </p>
          ) : null}
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-600">
            <li>Confirma que el documento existe en Firestore → base de datos <strong>app-eb</strong> → colección <strong>users</strong>.</li>
            <li>Despliega las reglas: <code className="text-xs">firebase deploy --only firestore:rules</code></li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void retryProfileBootstrap()}
              className="rounded-lg bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800"
            >
              Reintentar
            </button>
            <button
              type="button"
              onClick={() => void logOut()}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
            >
              Cerrar sesión
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (requireAdmin && profile.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
