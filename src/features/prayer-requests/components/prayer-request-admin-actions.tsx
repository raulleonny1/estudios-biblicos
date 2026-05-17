"use client";

import { MessageCircle, Trash2 } from "lucide-react";

import { buildPrayerRequestWhatsAppUrl } from "@/features/prayer-requests/whatsapp";
import type { PrayerRequest } from "@/features/prayer-requests/types";

type PrayerRequestAdminActionsProps = {
  request: PrayerRequest;
  isBusy: boolean;
  onDelete: (id: string) => Promise<void>;
};

export function PrayerRequestAdminActions({
  request,
  isBusy,
  onDelete,
}: PrayerRequestAdminActionsProps) {
  const whatsappUrl = buildPrayerRequestWhatsAppUrl(request);

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {whatsappUrl ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <MessageCircle size={16} />
          Responder por WhatsApp
        </a>
      ) : (
        <p className="text-xs text-amber-800">Sin teléfono válido para abrir WhatsApp.</p>
      )}
      <button
        type="button"
        disabled={isBusy}
        onClick={async () => {
          const confirmed = window.confirm(
            "¿Eliminar este pedido de oración? Esta acción no se puede deshacer."
          );
          if (!confirmed) return;
          await onDelete(request.id);
        }}
        className="inline-flex items-center gap-2 rounded-md border border-rose-300 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-800 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Trash2 size={16} />
        {isBusy ? "Eliminando..." : "Eliminar mensaje"}
      </button>
    </div>
  );
}
