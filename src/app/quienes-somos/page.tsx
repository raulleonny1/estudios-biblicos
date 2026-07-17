"use client";

import Link from "next/link";

import { PublicPageShell } from "@/components/layout/public-page-shell";

export default function QuienesSomosPage() {
  return (
    <PublicPageShell>
      <main className="p-4 md:p-8">
        <div className="mx-auto w-full max-w-4xl">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Quiénes somos</h1>

          <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
            <p>
              La <strong>Iglesia Española Reformada Episcopal (IERE)</strong> es una comunidad
              cristiana de tradición reformada y episcopal, firmemente arraigada en la autoridad de
              la Sagrada Escritura, la centralidad de Jesucristo y la vida guiada por el Espíritu
              Santo. Su misión es anunciar el Evangelio, formar discípulos y vivir una fe auténtica,
              expresada en amor, servicio y comunión.
            </p>

            <p>
              Dentro de esta misma línea pastoral, la Iglesia es guiada por el{" "}
              <strong>Reverendísimo Obispo Carlos López Lozano</strong>, quien ha impulsado una
              visión de cercanía, enseñanza bíblica sólida y compromiso con la sociedad.
            </p>

            <p>
              En este contexto, la <strong>Parroquia &quot;El Buen Pastor&quot;</strong>, ubicada en{" "}
              <strong>Plaza de la Fuensanta, 3, 28934 Móstoles, Madrid</strong>, se levanta como una
              comunidad viva de fe, donde la <strong>Reverenda Jéssica Coello Jiménez</strong>{" "}
              lidera con dedicación, acompañando a los creyentes en su crecimiento espiritual y
              fomentando la oración, el estudio de la Palabra y la vida en comunidad.
            </p>

            <p>
              <strong>Dirección:</strong> Plaza de la Fuensanta, 3, 28934 Móstoles, Madrid
            </p>
            <p>
              <strong>Google Maps:</strong>{" "}
              <a
                href="https://maps.google.com/?q=40.321442,-3.869301"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-700 underline-offset-2 hover:underline"
              >
                Ver ubicación en Google Maps
              </a>
            </p>

            <p>
              Somos una Iglesia que camina unida, creciendo en la gracia y el conocimiento de
              nuestro Señor Jesucristo, comprometida con la proclamación del Evangelio y el trabajo
              por la extensión del Reino de Dios.
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <h2 className="text-2xl font-bold text-indigo-900">Te invitamos a comenzar hoy</h2>
          <p className="mt-2 text-indigo-900/90">
            Inscríbete y accede al primer curso bíblico básico para iniciar tu proceso de formación
            espiritual en la Escuela Bíblica.
          </p>
          <Link
            href="/registrarse"
            className="mt-4 inline-flex rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800"
          >
            Inscribirme y ver el primer curso
          </Link>
        </section>
        </div>
      </main>
    </PublicPageShell>
  );
}
