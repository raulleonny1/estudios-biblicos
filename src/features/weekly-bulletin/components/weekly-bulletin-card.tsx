"use client";

import { useEffect, useState } from "react";
import { ExternalLink, FileText } from "lucide-react";

import { listenPublishedWeeklyBulletins } from "@/features/weekly-bulletin/firebase-weekly-bulletin";
import type { WeeklyBulletin } from "@/features/weekly-bulletin/types";

export function WeeklyBulletinCard() {
  const [latestBulletin, setLatestBulletin] = useState<WeeklyBulletin | null>(null);

  useEffect(() => {
    const unsubscribe = listenPublishedWeeklyBulletins((items) => {
      setLatestBulletin(items[0] ?? null);
    });
    return () => unsubscribe();
  }, []);

  if (!latestBulletin) {
    return null;
  }

  return (
    <section className="mb-8 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="rounded-xl bg-emerald-600 p-2.5 text-white">
          <FileText size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Hoja dominical</p>
          <h3 className="mt-1 text-lg font-bold text-emerald-950">{latestBulletin.title}</h3>
          <p className="mt-1 text-sm text-emerald-900/80">{latestBulletin.weekLabel}</p>
          <a
            href={latestBulletin.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Abrir PDF
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
