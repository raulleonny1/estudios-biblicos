"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  variant?: "default" | "primary" | "violet" | "indigo";
};

const navLinks: NavLink[] = [
  { href: "/quienes-somos", label: "Quiénes somos", variant: "violet" },
  { href: "/pedidos-oracion", label: "Pedidos de oración", variant: "indigo" },
  { href: "/politica-privacidad", label: "Política de privacidad" },
  { href: "/iniciar-sesion", label: "Iniciar sesión" },
  { href: "/registrarse", label: "Registrarse", variant: "primary" },
];

function linkClassName(link: NavLink, isActive: boolean) {
  if (link.variant === "primary") {
    return "rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700";
  }
  if (link.variant === "violet") {
    return isActive
      ? "rounded-lg border border-violet-300 bg-violet-100 px-4 py-2.5 text-sm font-semibold text-violet-900"
      : "rounded-lg border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-700 hover:bg-violet-100";
  }
  if (link.variant === "indigo") {
    return isActive
      ? "rounded-lg border border-indigo-300 bg-indigo-100 px-4 py-2.5 text-sm font-semibold text-indigo-900"
      : "rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-100";
  }
  return isActive
    ? "rounded-lg border border-slate-400 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-900"
    : "rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50";
}

export function PublicSiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <Image
            src="/logo-iere.png"
            alt="IERE - Escuela Bíblica"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-lg"
          />
          <span className="truncate text-sm font-bold text-slate-900 sm:text-base">Escuela Bíblica</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClassName(link, pathname === link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white p-2 text-slate-800 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="public-site-mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
          />
          <nav
            id="public-site-mobile-menu"
            className="relative z-50 border-t border-slate-200 bg-white px-4 py-4 md:hidden"
            aria-label="Menú móvil"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block w-full text-center ${linkClassName(link, pathname === link.href)}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : null}
    </header>
  );
}
