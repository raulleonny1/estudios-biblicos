"use client";

import { FormEvent, useState } from "react";
import { MessageSquarePlus } from "lucide-react";

import { getProfileDisplayName } from "@/features/auth/display-name";
import type { UserProfile } from "@/features/auth/types";
import { createStudentFeedback } from "@/features/feedback/firebase-feedback";
import type { FeedbackCategory } from "@/features/feedback/types";

type StudentFeedbackFormProps = {
  profile: UserProfile;
};

export function StudentFeedbackForm({ profile }: StudentFeedbackFormProps) {
  const [category, setCategory] = useState<FeedbackCategory>("suggestion");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      await createStudentFeedback({
        uid: profile.uid,
        displayName: getProfileDisplayName(profile),
        email: profile.email,
        category,
        message,
      });
      setMessage("");
      setCategory("suggestion");
      setSuccess(true);
    } catch (submitError) {
      const text = submitError instanceof Error ? submitError.message : "No se pudo enviar.";
      setError(text);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-lg bg-slate-900 p-2 text-white">
          <MessageSquarePlus size={16} />
        </span>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-900">
            Sugerencias y problemas
          </h3>
          <p className="text-sm text-zinc-600">
            Cuéntanos una idea, un error o algo que no te esté funcionando. El equipo de admin lo
            verá.
          </p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="feedback-category" className="mb-1.5 block text-sm font-semibold text-zinc-800">
            Tipo
          </label>
          <select
            id="feedback-category"
            value={category}
            onChange={(event) => setCategory(event.target.value as FeedbackCategory)}
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900"
          >
            <option value="suggestion">Sugerencia</option>
            <option value="error">Error en la plataforma</option>
            <option value="problem">Otro problema</option>
          </select>
        </div>

        <div>
          <label htmlFor="feedback-message" className="mb-1.5 block text-sm font-semibold text-zinc-800">
            Mensaje
          </label>
          <textarea
            id="feedback-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={4}
            required
            placeholder="Describe tu sugerencia o el problema que estás teniendo..."
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-60"
        >
          {submitting ? "Enviando..." : "Enviar al equipo"}
        </button>

        {success ? (
          <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            Gracias. Tu mensaje fue enviado correctamente.
          </p>
        ) : null}
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
      </form>
    </section>
  );
}
