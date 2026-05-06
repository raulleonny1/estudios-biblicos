"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, User } from "lucide-react";

import { useAuth } from "@/features/auth/auth-context";
import { trackAnalyticsEvent } from "@/features/analytics/firebase-analytics";

export default function RegisterPage() {
  const router = useRouter();
  const { authUser, profile, loading, signUp } = useAuth();
  const [firstName, setFirstName] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("firstName") ?? "";
  });
  const [lastName, setLastName] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("lastName") ?? "";
  });
  const [phone, setPhone] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("phone") ?? "";
  });
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    password: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const cleanFirstName = firstName.trim();
  const cleanLastName = lastName.trim();
  const cleanPhone = phone.trim();
  const cleanEmail = email.trim();
  const isFirstNameValid = cleanFirstName.length > 0;
  const isLastNameValid = cleanLastName.length > 0;
  const isPhoneValid = cleanPhone.length >= 7;
  const isEmailValid = /\S+@\S+\.\S+/.test(cleanEmail);
  const isPasswordValid = password.length >= 6;

  useEffect(() => {
    if (!loading && authUser) {
      if (profile?.role === "admin") {
        router.replace("/admin");
        return;
      }
      router.replace("/dashboard");
    }
  }, [authUser, loading, profile?.role, router]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres.");
      }

      await signUp({
        firstName: cleanFirstName,
        lastName: cleanLastName,
        phone: cleanPhone,
        birthDate,
        email: cleanEmail,
        password,
        consentAccepted: true,
      });
      await trackAnalyticsEvent({
        event: "register_success",
        lessonId: undefined,
        metadata: {
          email: cleanEmail.toLowerCase(),
        },
      });
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
            <p className="mt-1 text-xs text-slate-500">
              Campos obligatorios: Nombre, Apellido, Correo y Celular.
            </p>
          </div>

          <form className="space-y-5" onSubmit={onSubmit}>
            <div>
              <label className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700" htmlFor="firstName">
                Nombre <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <User size={18} />
                </div>
                <input
                  id="firstName"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, firstName: true }))}
                  placeholder="Nombre"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>
              {touched.firstName && !isFirstNameValid ? (
                <p className="mt-1 text-xs text-red-700">Escribe tu nombre.</p>
              ) : null}
            </div>

            <div>
              <label className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700" htmlFor="lastName">
                Apellido <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <User size={18} />
                </div>
                <input
                  id="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  onBlur={() => setTouched((prev) => ({ ...prev, lastName: true }))}
                  placeholder="Apellido"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>
              {touched.lastName && !isLastNameValid ? (
                <p className="mt-1 text-xs text-red-700">Escribe tu apellido.</p>
              ) : null}
            </div>

            <div>
              <label className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700" htmlFor="phone">
                Celular <span className="text-red-600">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                placeholder="Ej: +34 600 000 000"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                required
              />
              {touched.phone && !isPhoneValid ? (
                <p className="mt-1 text-xs text-red-700">Ingresa un celular válido.</p>
              ) : null}
            </div>

            <div>
              <label
                className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700"
                htmlFor="birthDate"
              >
                Fecha de nacimiento (opcional)
              </label>
              <input
                id="birthDate"
                type="date"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700" htmlFor="email">
                Correo electrónico <span className="text-red-600">*</span>
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
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  placeholder="tu-correo@iglesia.org"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  required
                />
              </div>
              {touched.email && !isEmailValid ? (
                <p className="mt-1 text-xs text-red-700">Ingresa un correo válido.</p>
              ) : null}
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
                  onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  required
                  minLength={6}
                />
              </div>
              {touched.password && !isPasswordValid ? (
                <p className="mt-1 text-xs text-red-700">
                  La contraseña debe tener al menos 6 caracteres.
                </p>
              ) : null}
              <p className="mt-1 text-xs text-slate-500">Necesaria para iniciar sesión en la plataforma.</p>
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
