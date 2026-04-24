"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { collection, serverTimestamp, addDoc } from "firebase/firestore";

import { db } from "@/lib/firebase-services";

export default function PrayerRequestsPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const registerHref = `/registrarse?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&phone=${encodeURIComponent(phone)}`;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      await addDoc(collection(db, "prayerRequests"), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        reason: reason.trim(),
        createdAt: new Date().toISOString(),
        createdAtServer: serverTimestamp(),
      });
      setFirstName("");
      setLastName("");
      setPhone("");
      setReason("");
      setSuccess(true);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "No se pudo enviar tu pedido. Inténtalo de nuevo.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            ← Volver al inicio
          </Link>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Pedidos de oración</h1>
          <p className="mt-2 text-slate-700">
            Queremos orar por tu necesidad en particular. Comparte tus datos y el motivo de oración,
            y nuestro equipo pastoral intercederá por ti.
          </p>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label htmlFor="firstName" className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700">
                Nombre
              </label>
              <input
                id="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700">
                Apellido
              </label>
              <input
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Tu apellido"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700">
                Celular
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Ej: +34 600 000 000"
                required
              />
            </div>

            <div>
              <label htmlFor="reason" className="mb-1.5 ml-1 block text-sm font-semibold text-slate-700">
                Motivo de oración
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="min-h-28 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Cuéntanos por qué quieres que oremos..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-indigo-600 py-3.5 font-bold text-white transition-all hover:bg-indigo-700 disabled:opacity-60"
            >
              {submitting ? "Enviando..." : "Enviar pedido de oración"}
            </button>
            {success ? (
              <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                Tu pedido fue enviado correctamente. Nuestro equipo pastoral orará por ti.
              </p>
            ) : null}
            {error ? <p className="text-sm text-red-700">{error}</p> : null}
          </form>
        </section>

        <section className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <h2 className="text-xl font-bold text-indigo-900">Da tu primer paso en la Escuela Bíblica</h2>
          <p className="mt-2 text-indigo-900/90">
            Te invitamos a comenzar el primer curso bíblico básico. Ya dejamos tus datos listos para
            el registro.
          </p>
          <Link
            href={registerHref}
            className="mt-4 inline-flex rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800"
          >
            {success ? "Continuar al registro del curso básico" : "Ir al registro del curso básico"}
          </Link>
          <p className="mt-2 text-xs text-indigo-800/80">
            En el registro solo tendrás que confirmar y crear tu PIN de 4 dígitos.
          </p>
        </section>
      </div>
    </main>
  );
}
