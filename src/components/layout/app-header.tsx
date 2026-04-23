import Link from "next/link";

export function AppHeader() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-zinc-900">
          App Estudios Biblicos
        </Link>
        <nav className="flex items-center gap-5 text-sm text-zinc-700">
          <Link href="/" className="transition hover:text-zinc-900">
            Inicio
          </Link>
          <Link
            href="/estudios/evangelio-marcos-semana-1"
            className="transition hover:text-zinc-900"
          >
            Estudio sugerido
          </Link>
        </nav>
      </div>
    </header>
  );
}
