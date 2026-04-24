import Link from "next/link";

import type { Study } from "../types";

type StudyCardProps = {
  study: Study;
};

export function StudyCard({ study }: StudyCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-indigo-200/70 bg-white shadow-lg shadow-indigo-100/70 transition hover:-translate-y-1 hover:shadow-xl">
      <div className={`bg-gradient-to-r p-5 text-white ${study.cardGradient}`}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs uppercase tracking-wide text-white">
              {study.kind}
            </span>
            <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs uppercase tracking-wide text-white">
              {study.level}
            </span>
          </div>
          <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium text-white">
            {study.durationMinutes} min
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold leading-tight">{study.title}</h3>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-2xl">
            {study.illustration}
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm leading-6 text-zinc-700">{study.summary}</p>

        <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
            Objetivo principal
          </p>
          <p className="mt-1 text-sm font-medium leading-6 text-indigo-900">{study.objective}</p>
        </div>

        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">
          Pasaje principal: <span className="text-amber-800">{study.keyVerse}</span>
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          href={`/estudios/${study.slug}`}
          className={`mt-5 inline-flex rounded-xl bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-110 ${study.cardGradient}`}
        >
          Abrir estudio
        </Link>
      </div>
    </article>
  );
}
