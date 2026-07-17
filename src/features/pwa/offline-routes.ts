import { allLessonsRegistry } from "@/features/lessons/lesson-registry";
import { studies } from "@/features/studies/data/studies";

function lessonPath(lessonId: string) {
  if (lessonId.startsWith("oracion-")) {
    return `/oracion/lecciones/${lessonId}`;
  }
  if (lessonId.startsWith("fe-")) {
    return `/fe/lecciones/${lessonId}`;
  }
  if (lessonId.startsWith("mayordomia-intermedia-")) {
    return `/mayordomia-intermedia/lecciones/${lessonId}`;
  }
  if (lessonId.startsWith("mayordomia-avanzada-")) {
    return `/mayordomia-avanzada/lecciones/${lessonId}`;
  }
  if (lessonId.startsWith("mayordomia-")) {
    return `/mayordomia/lecciones/${lessonId}`;
  }
  return `/lecciones/${lessonId}`;
}

/** Rutas propias de la app para precache offline (sin romper si alguna falla). */
export function getOfflinePrecacheUrls(): string[] {
  const publicPages = [
    "/",
    "/dashboard",
    "/iniciar-sesion",
    "/registrarse",
    "/pedidos-oracion",
    "/quienes-somos",
    "/politica-privacidad",
    "/offline.html",
    "/icon-192.png",
    "/icon-512.png",
    "/icon-maskable-512.png",
    "/apple-touch-icon.png",
    "/logo-iere.png",
  ];

  const studyPages = studies
    .filter((study) => study.kind === "curso")
    .map((study) => `/estudios/${study.slug}`);

  const lessonPages = allLessonsRegistry.flatMap((lesson) => {
    const base = lessonPath(lesson.id);
    return [base, `${base}/reforzar`];
  });

  return Array.from(new Set([...publicPages, ...studyPages, ...lessonPages]));
}
