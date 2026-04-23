import Link from "next/link";

import type { Study } from "../types";

type StudyCardProps = {
  study: Study;
};

export function StudyCard({ study }: StudyCardProps) {
  return (
    <article className="rounded-xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs uppercase tracking-wide text-indigo-700">
            {study.kind}
          </span>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs uppercase tracking-wide text-zinc-700">
            {study.level}
          </span>
        </div>
        <span className="text-sm text-zinc-600">{study.durationMinutes} min</span>
      </div>

      <h3 className="text-lg font-semibold text-zinc-900">{study.title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-700">{study.summary}</p>
      <p className="mt-3 text-sm font-medium text-zinc-900">
        Versiculo clave: <span className="text-zinc-700">{study.keyVerse}</span>
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-zinc-200 px-2 py-1 text-xs text-zinc-700"
          >
            #{tag}
          </span>
        ))}
      </div>

      <Link
        href={`/estudios/${study.slug}`}
        className="mt-5 inline-flex rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
      >
        Abrir estudio
      </Link>
    </article>
  );
}
