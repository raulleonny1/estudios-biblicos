"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/auth-context";

function menuItemClass(isActive: boolean) {
  return isActive
    ? "rounded-md bg-zinc-900 px-3 py-2 text-sm text-white"
    : "rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100";
}

export function MainNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, logOut } = useAuth();

  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">IERE</p>
          <h1 className="text-lg font-semibold text-zinc-900">Escuela Biblica</h1>
        </div>

        <nav className="flex items-center gap-2">
          <Link href="/dashboard" className={menuItemClass(pathname === "/dashboard")}>
            Estudiante
          </Link>
          {profile?.role === "admin" ? (
            <Link href="/admin" className={menuItemClass(pathname === "/admin")}>
              Admin
            </Link>
          ) : null}
          <button
            type="button"
            onClick={async () => {
              await logOut();
              router.replace("/");
            }}
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-100"
          >
            Cerrar sesion
          </button>
        </nav>
      </div>
    </header>
  );
}
