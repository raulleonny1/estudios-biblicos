"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/features/auth/auth-context";
import { ProductAnalyticsProvider } from "@/components/providers/product-analytics-provider";
import { ObservabilityProvider } from "@/components/providers/observability-provider";
import { PwaProvider } from "@/components/providers/pwa-provider";
import { ConnectivityIndicator } from "@/components/providers/connectivity-indicator";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PwaProvider />
      <ProductAnalyticsProvider />
      <ObservabilityProvider />
      <ConnectivityIndicator />
      {children}
    </AuthProvider>
  );
}
