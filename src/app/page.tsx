"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle, GraduationCap, Star } from "lucide-react";

import { useAuth } from "@/features/auth/auth-context";

export default function Home() {
  const router = useRouter();
  const { authUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && authUser) {
      router.replace("/dashboard");
    }
  }, [authUser, loading, router]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 md:px-6 md:py-8">
        <header className="mb-8 flex items-center justify-end gap-2">
          <Link
            href="/iniciar-sesion"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registrarse"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Registrarse
          </Link>
        </header>

        <main className="relative overflow-hidden rounded-3xl border border-indigo-800/40 bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 p-6 text-white shadow-2xl shadow-slate-300/60 md:p-10">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

          <section className="relative z-10 mx-auto max-w-3xl text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-2xl bg-white/95 p-3 shadow-lg shadow-slate-900/20">
                <Image
                  src="/logo-iere.jpg"
                  alt="Logo de la iglesia"
                  width={96}
                  height={96}
                  className="h-auto w-20 md:w-[5.5rem]"
                  priority
                />
              </div>
            </div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-indigo-100">
              Parroquia &quot;El Buen Pastor&quot; Móstoles
            </p>
            <p className="mb-4 inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-100">
              Iglesia Española Reformada Episcopal
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Escuela Bíblica
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-indigo-100 md:text-lg">
              Una plataforma para el crecimiento espiritual mediante lecciones guiadas,
              preguntas de comprensión y seguimiento del avance.
            </p>
          </section>

          <section className="relative z-10 mx-auto mt-8 max-w-2xl space-y-4">
            <article className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <div className="mb-3 w-fit rounded-lg bg-white/15 p-2 text-indigo-100">
                <Star size={20} className="text-indigo-100" />
              </div>
              <h3 className="text-base font-bold text-white">+1 punto diario</h3>
              <p className="mt-1 text-sm text-indigo-100">
                Premio a tu constancia al iniciar sesión.
              </p>
            </article>
            <article className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <div className="mb-3 w-fit rounded-lg bg-white/15 p-2 text-indigo-100">
                <CheckCircle size={20} className="text-indigo-100" />
              </div>
              <h3 className="text-base font-bold text-white">+20 puntos por lección</h3>
              <p className="mt-1 text-sm text-indigo-100">
                Completa desafíos, gana premios y avanza en tu formación espirirtual.
              </p>
            </article>
            <article className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <div className="mb-3 w-fit rounded-lg bg-white/15 p-2 text-indigo-100">
                <GraduationCap size={20} className="text-indigo-100" />
              </div>
              <h3 className="text-base font-bold text-white">Roles diferenciados</h3>
              <p className="mt-1 text-sm text-indigo-100">
                Entorno optimizado para estudiantes y administradores.
              </p>
            </article>
          </section>

        </main>
      </div>
    </div>
  );
}
