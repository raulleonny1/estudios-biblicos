"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { trackAnalyticsEvent } from "@/features/analytics/firebase-analytics";
import { useAuth } from "@/features/auth/auth-context";

export function ProductAnalyticsProvider() {
  const pathname = usePathname();
  const { authUser } = useAuth();
  const lastEventKeyRef = useRef("");

  useEffect(() => {
    const eventKey = `${authUser?.uid ?? "anon"}:${pathname}`;
    if (lastEventKeyRef.current === eventKey) return;
    lastEventKeyRef.current = eventKey;

    void trackAnalyticsEvent({
      event: "page_view",
      uid: authUser?.uid ?? null,
      path: pathname,
    }).catch(() => null);
  }, [authUser?.uid, pathname]);

  return null;
}
