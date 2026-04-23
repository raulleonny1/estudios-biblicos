"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, User } from "lucide-react";

import { useAuth } from "@/features/auth/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { authUser, loading, signUp } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [pin, setPin] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && authUser) {
      router.replace("/dashboard");
    }
  }, [authUser, loading, router]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (!/^\d{4}$/.test(pin)) {
        throw new Error("El PIN debe tener exactamente 4 dígitos.");
      }

      await signUp({
        firstName,
        lastName,
        birthDate,
        pin,
        consentAccepted,
      });
      router.replace("/dashboard");
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Error inesperado";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-lg items-center justify-center md:min-h-[calc(100vh-4rem)]">
        <section className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wide text-slate-500">Escuela Bíblica</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">Registrarse</h1>
            <p className="mt-1 text-sm text-slate-600">Crea tu cuenta para empezar.</p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            <div>
              <label className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700" htmlFor="firstName">
                Nombre
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <User size={18} />
                </div>
                <input
                  id="firstName"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="Nombre"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700" htmlFor="lastName">
                Apellido
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <User size={18} />
                </div>
                <input
                  id="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="Apellido"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700" htmlFor="birthDate">
                Fecha de nacimiento
              </label>
              <input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700" htmlFor="pin">
                PIN de 4 dígitos
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  id="pin"
                  type="password"
                  value={pin}
                  onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  required
                  minLength={4}
                  maxLength={4}
                  inputMode="numeric"
                  pattern="\d{4}"
                />
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <p className="mb-2">
                Tus datos se usarán estrictamente para la gestión de esta plataforma de
                estudios bíblicos.
              </p>
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(event) => setConsentAccepted(event.target.checked)}
                  className="mt-1"
                />
                <span>Estoy de acuerdo y deseo continuar con el registro.</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 disabled:opacity-60"
            >
              {submitting ? "Procesando..." : "Crear mi cuenta"}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>

            {error ? <p className="text-sm text-red-700">{error}</p> : null}
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            ¿Ya tienes cuenta?{" "}
            <Link href="/iniciar-sesion" className="font-semibold text-indigo-700 hover:text-indigo-800">
              Inicia sesión
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
