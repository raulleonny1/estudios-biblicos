"use client";

import { useEffect, useState } from "react";
import { Download, Share, X } from "lucide-react";

import { getOfflinePrecacheUrls } from "@/features/pwa/offline-routes";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isIosDevice() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent.toLowerCase();
  const isAppleMobile = /iphone|ipad|ipod/.test(ua);
  const isIpadOs = window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1;
  return isAppleMobile || isIpadOs;
}

function isStandaloneDisplay() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari
    ("standalone" in window.navigator && Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

export function PwaProvider() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    let cancelled = false;

    const registerAndWarmCache = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
          updateViaCache: "none",
        });

        await navigator.serviceWorker.ready;
        if (cancelled) return;

        // No competir con login/redirección: precache en segundo plano.
        window.setTimeout(() => {
          if (cancelled) return;
          const urls = getOfflinePrecacheUrls();
          const worker = registration.active || navigator.serviceWorker.controller;
          worker?.postMessage({ type: "CACHE_URLS", urls });
        }, 4000);
      } catch (error) {
        console.error("No se pudo registrar el service worker", error);
      }
    };

    void registerAndWarmCache();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyDismissed = window.localStorage.getItem("pwa_install_dismissed") === "1";
    if (alreadyDismissed || isStandaloneDisplay()) {
      setDismissed(true);
      return;
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    if (isIosDevice()) {
      setShowIosHint(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    };
  }, []);

  function dismissBanner() {
    setDismissed(true);
    setInstallEvent(null);
    setShowIosHint(false);
    window.localStorage.setItem("pwa_install_dismissed", "1");
  }

  async function handleInstallClick() {
    if (!installEvent) return;
    await installEvent.prompt();
    await installEvent.userChoice;
    setInstallEvent(null);
    dismissBanner();
  }

  if (dismissed) {
    return null;
  }

  if (installEvent) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:left-auto">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-indigo-100 p-2 text-indigo-700">
            <Download size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900">Instalar Escuela Bíblica</p>
            <p className="mt-1 text-xs text-slate-600">
              Añádela a tu dispositivo para abrirla como app y usar lecciones sin conexión.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => void handleInstallClick()}
                className="rounded-lg bg-indigo-700 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-800"
              >
                Instalar
              </button>
              <button
                type="button"
                onClick={dismissBanner}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Ahora no
              </button>
            </div>
          </div>
          <button type="button" aria-label="Cerrar" onClick={dismissBanner} className="text-slate-400">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (showIosHint) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:left-auto">
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-sky-100 p-2 text-sky-700">
            <Share size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900">Instalar en iPhone / iPad</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">
              En Safari: toca <strong>Compartir</strong> y luego <strong>Añadir a pantalla de inicio</strong>.
              Así queda como app y guarda contenido para usarlo sin internet.
            </p>
            <button
              type="button"
              onClick={dismissBanner}
              className="mt-3 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
            >
              Entendido
            </button>
          </div>
          <button type="button" aria-label="Cerrar" onClick={dismissBanner} className="text-slate-400">
            <X size={16} />
          </button>
        </div>
      </div>
    );
  }

  return null;
}
