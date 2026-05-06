"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/features/auth/auth-context";
import { ProductAnalyticsProvider } from "@/components/providers/product-analytics-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProductAnalyticsProvider />
      {children}
    </AuthProvider>
  );
}
