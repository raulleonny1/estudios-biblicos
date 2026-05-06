"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";

import { useAuth } from "@/features/auth/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { authUser, profile, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && authUser) {
      if (profile?.role === "admin") {
        router.replace("/admin");
        return;
      }
      router.replace("/dashboard");
    }
  }, [authUser, loading, profile?.role, router]);

  const submitCredentials = useCallback(
    async (emailValue: string, passwordValue: string) => {
      if (submitting) return;
      setSubmitting(true);
      setError("");

      try {
        const cleanEmail = emailValue.trim().toLowerCase();
        if (!cleanEmail) {
          throw new Error("Debes escribir tu correo.");
        }
        if (passwordValue.length < 6) {
          throw new Error("La contraseña debe tener al menos 6 caracteres.");
        }

        await signIn({ email: cleanEmail, password: passwordValue });
      } catch (submitError) {
        const message = submitError instanceof Error ? submitError.message : "Error inesperado";
        setError(message);
      } finally {
        setSubmitting(false);
      }
    },
    [signIn, submitting]
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitCredentials(email, password);
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-md items-center justify-center md:min-h-[calc(100vh-4rem)]">
        <section className="w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/50">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wide text-slate-500">Escuela Bíblica</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">Iniciar sesión</h1>
            <p className="mt-1 text-sm text-slate-600">Ingresa con tu correo y contraseña.</p>
            <p className="mt-1 text-xs text-slate-500">Solo se permite acceso con cuentas registradas.</p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            <div>
              <label className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700" htmlFor="email">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="tu-correo@iglesia.org"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 disabled:opacity-60"
            >
              {submitting ? "Procesando..." : "Acceder a la plataforma"}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>

            {error ? <p className="text-sm text-red-700">{error}</p> : null}
          </form>

          <p className="mt-5 text-center text-sm text-slate-600">
            ¿No tienes cuenta?{" "}
            <Link href="/registrarse" className="font-semibold text-indigo-700 hover:text-indigo-800">
              Regístrate
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
