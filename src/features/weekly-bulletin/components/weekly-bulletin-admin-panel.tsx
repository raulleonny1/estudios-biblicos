"use client";

import { FormEvent, useEffect, useState } from "react";
import { FileText, Trash2 } from "lucide-react";

import {
  deleteWeeklyBulletin,
  listenWeeklyBulletins,
  setWeeklyBulletinPublished,
  uploadWeeklyBulletin,
} from "@/features/weekly-bulletin/firebase-weekly-bulletin";
import type { WeeklyBulletin } from "@/features/weekly-bulletin/types";

type WeeklyBulletinAdminPanelProps = {
  uploadedBy: string;
};

export function WeeklyBulletinAdminPanel({ uploadedBy }: WeeklyBulletinAdminPanelProps) {
  const [items, setItems] = useState<WeeklyBulletin[]>([]);
  const [title, setTitle] = useState("");
  const [weekLabel, setWeekLabel] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isPublished, setIsPublished] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [actionId, setActionId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = listenWeeklyBulletins(setItems);
    return () => unsubscribe();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);
    setError("");
    setMessage("");

    try {
      if (!file) {
        throw new Error("Selecciona un archivo PDF.");
      }
      if (!title.trim()) {
        throw new Error("Escribe un título para la hoja dominical.");
      }
      if (!weekLabel.trim()) {
        throw new Error("Indica la semana o fecha de la hoja.");
      }

      await uploadWeeklyBulletin({
        file,
        uploadedBy,
        input: {
          title: title.trim(),
          weekLabel: weekLabel.trim(),
          isPublished,
        },
      });

      setTitle("");
      setWeekLabel("");
      setFile(null);
      setIsPublished(true);
      setMessage("Hoja dominical subida correctamente.");
    } catch (submitError) {
      const text = submitError instanceof Error ? submitError.message : "Error inesperado";
      setError(text);
    } finally {
      setUploading(false);
    }
  }

  async function togglePublished(item: WeeklyBulletin) {
    setActionId(item.id);
    setError("");
    try {
      await setWeeklyBulletinPublished(item.id, !item.isPublished);
    } catch (toggleError) {
      const text = toggleError instanceof Error ? toggleError.message : "Error inesperado";
      setError(text);
    } finally {
      setActionId("");
    }
  }

  async function removeItem(item: WeeklyBulletin) {
    if (!window.confirm(`¿Eliminar "${item.title}"?`)) return;

    setActionId(item.id);
    setError("");
    try {
      await deleteWeeklyBulletin(item);
      setMessage("Hoja dominical eliminada.");
    } catch (removeError) {
      const text = removeError instanceof Error ? removeError.message : "Error inesperado";
      setError(text);
    } finally {
      setActionId("");
    }
  }

  return (
    <>
      <h2 className="text-xl font-bold tracking-tight text-zinc-900">Hoja dominical</h2>
      <p className="mt-1 text-sm text-zinc-700">
        Sube el PDF de la hoja dominical. Los estudiantes verán la última hoja publicada en su panel.
      </p>

      <form className="mt-5 space-y-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4" onSubmit={onSubmit}>
        <div>
          <label className="mb-1 block text-sm font-semibold text-zinc-800" htmlFor="bulletin-title">
            Título
          </label>
          <input
            id="bulletin-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Hoja dominical — 6 de julio de 2026"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-zinc-800" htmlFor="bulletin-week">
            Semana / fecha
          </label>
          <input
            id="bulletin-week"
            value={weekLabel}
            onChange={(event) => setWeekLabel(event.target.value)}
            placeholder="Semana del 6 al 12 de julio"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-zinc-800" htmlFor="bulletin-file">
            Archivo PDF
          </label>
          <input
            id="bulletin-file"
            type="file"
            accept="application/pdf"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm"
            required
          />
          <p className="mt-1 text-xs text-zinc-500">Máximo 15 MB. Solo formato PDF.</p>
        </div>

        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(event) => setIsPublished(event.target.checked)}
          />
          Publicar de inmediato para estudiantes
        </label>

        <button
          type="submit"
          disabled={uploading}
          className="rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800 disabled:opacity-60"
        >
          {uploading ? "Subiendo..." : "Subir hoja dominical"}
        </button>

        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
      </form>

      <div className="mt-6 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-zinc-600">Aún no hay hojas dominicales subidas.</p>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-start gap-3">
                <span className="rounded-lg bg-indigo-100 p-2 text-indigo-700">
                  <FileText size={18} />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-zinc-900">{item.title}</p>
                  <p className="text-sm text-zinc-600">{item.weekLabel}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {item.isPublished ? "Publicada" : "Borrador"} · {item.fileName}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
                >
                  Ver PDF
                </a>
                <button
                  type="button"
                  disabled={actionId === item.id}
                  onClick={() => void togglePublished(item)}
                  className="rounded-md border border-indigo-300 px-3 py-1.5 text-sm font-medium text-indigo-800 hover:bg-indigo-50 disabled:opacity-60"
                >
                  {item.isPublished ? "Ocultar" : "Publicar"}
                </button>
                <button
                  type="button"
                  disabled={actionId === item.id}
                  onClick={() => void removeItem(item)}
                  className="inline-flex items-center gap-1 rounded-md border border-rose-300 px-3 py-1.5 text-sm font-medium text-rose-800 hover:bg-rose-50 disabled:opacity-60"
                >
                  <Trash2 size={14} />
                  Eliminar
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
}
