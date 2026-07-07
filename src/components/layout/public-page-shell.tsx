import type { ReactNode } from "react";

import { PublicSiteHeader } from "@/components/layout/public-site-header";

type PublicPageShellProps = {
  children: ReactNode;
};

export function PublicPageShell({ children }: PublicPageShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <PublicSiteHeader />
      {children}
    </div>
  );
}
