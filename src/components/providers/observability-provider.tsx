"use client";

import { useEffect } from "react";

import { trackAnalyticsEvent } from "@/features/analytics/firebase-analytics";
import { useAuth } from "@/features/auth/auth-context";

export function ObservabilityProvider() {
  const { authUser } = useAuth();

  useEffect(() => {
    function onError(event: ErrorEvent) {
      void trackAnalyticsEvent({
        event: "app_error",
        uid: authUser?.uid ?? null,
        metadata: {
          message: event.message,
          fileName: event.filename,
          line: event.lineno,
          column: event.colno,
        },
      }).catch(() => null);
    }

    function onUnhandledRejection(event: PromiseRejectionEvent) {
      const reason =
        typeof event.reason === "string"
          ? event.reason
          : event.reason instanceof Error
            ? event.reason.message
            : "Unhandled rejection";
      void trackAnalyticsEvent({
        event: "app_error",
        uid: authUser?.uid ?? null,
        metadata: {
          message: reason,
          source: "unhandledrejection",
        },
      }).catch(() => null);
    }

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, [authUser?.uid]);

  return null;
}
