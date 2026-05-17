"use client";

import { useEffect, useState } from "react";

type ConnectivityStatus = "hidden" | "offline" | "reconnected";

export function ConnectivityIndicator() {
  const [status, setStatus] = useState<ConnectivityStatus>("hidden");

  useEffect(() => {
    const handleOffline = () => {
      setStatus("offline");
    };

    const handleOnline = () => {
      setStatus((current) => (current === "offline" ? "reconnected" : "hidden"));
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    if (status !== "reconnected") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setStatus("hidden");
    }, 3000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [status]);

  if (status === "hidden") {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 rounded-md px-3 py-2 text-sm text-white shadow-lg backdrop-blur-sm bg-slate-900/90"
    >
      {status === "offline" ? "Sin conexión. Modo limitado." : "Conexión restablecida"}
    </div>
  );
}
