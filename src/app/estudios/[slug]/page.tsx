import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppHeader } from "@/components/layout/app-header";
import { EffectivePrayerCourseView } from "@/features/effective-prayer/components/effective-prayer-course-view";
import { FaithTransformCourseView } from "@/features/faith-transform/components/faith-transform-course-view";
import { StewardshipIntermediateCourseView } from "@/features/stewardship-intermediate/components/stewardship-intermediate-course-view";
import { StewardshipAdvancedCourseView } from "@/features/stewardship-advanced/components/stewardship-advanced-course-view";
import { StewardshipCourseView } from "@/features/stewardship/components/stewardship-course-view";
import { BasicBibleCourseView } from "@/features/studies/components/basic-bible-course-view";
import { getStudyBySlug } from "@/features/studies/data/studies";

type StudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: StudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudyBySlug(slug);
  if (!study) {
    return {
      title: "Estudio no encontrado | IERE",
      description: "Este estudio no está disponible.",
    };
  }

  return {
    title: `${study.title} | Escuela Bíblica IERE`,
    description: study.summary,
    openGraph: {
      title: `${study.title} | Escuela Bíblica IERE`,
      description: study.summary,
      type: "article",
    },
  };
}

export default async function StudyPage({ params }: StudyPageProps) {
  const { slug } = await params;
  const study = getStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  if (study.slug === "estudio-basico-biblia") {
    return <BasicBibleCourseView study={study} />;
  }
  if (study.slug === "curso-orar-efectivamente") {
    return <EffectivePrayerCourseView study={study} />;
  }
  if (study.slug === "curso-fe-que-transforma") {
    return <FaithTransformCourseView study={study} />;
  }
  if (study.slug === "curso-mayordomia-cristiana") {
    return <StewardshipCourseView study={study} />;
  }
  if (study.slug === "curso-mayordomia-intermedia") {
    return <StewardshipIntermediateCourseView study={study} />;
  }
  if (study.slug === "curso-mayordomia-avanzada") {
    return <StewardshipAdvancedCourseView study={study} />;
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      <AppHeader />
      <main className="mx-auto w-full max-w-3xl px-6 py-10">
        <Link href="/" className="text-sm text-zinc-600 transition hover:text-zinc-900">
          Volver al inicio
        </Link>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
          {study.title}
        </h1>
        <p className="mt-3 text-zinc-700">{study.summary}</p>

        <div className="mt-6 grid gap-4 rounded-xl border border-black/10 bg-white p-5 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">Nivel</p>
            <p className="mt-1 text-zinc-900">{study.level}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">Duracion</p>
            <p className="mt-1 text-zinc-900">{study.durationMinutes} minutos</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Versiculo clave</p>
            <p className="mt-1 font-medium text-zinc-900">{study.keyVerse}</p>
          </div>
        </div>

        <section className="mt-8 rounded-xl border border-black/10 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Siguiente paso</h2>
          <p className="mt-2 text-zinc-700">
            Esta vista ya esta lista para conectar contenido real desde API o
            base de datos.
          </p>
        </section>
      </main>
    </div>
  );
}
