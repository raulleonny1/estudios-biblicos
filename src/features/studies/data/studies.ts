import type { Study } from "../types";

export const studies: Study[] = [
  {
    id: "curso-basico-biblia",
    slug: "estudio-basico-biblia",
    kind: "curso",
    title: "Estudio básico de la biblia",
    summary:
      "Ruta principal de 15 lecciones con revisión de administración, desbloqueo progresivo y avance espiritual por etapas.",
    objective:
      "Conocer los fundamentos de la Biblia y crecer en una vida de discipulado con bases sólidas.",
    level: "principiante",
    durationMinutes: 450,
    keyVerse: "2 Timoteo 3:16",
    illustration: "📖",
    cardGradient: "from-indigo-500 via-violet-500 to-fuchsia-500",
    tags: ["discipulado", "fundamentos", "escuela-biblica"],
  },
  {
    id: "curso-orar-efectivamente",
    slug: "curso-orar-efectivamente",
    kind: "curso",
    title: "Curso: Cómo orar efectivamente",
    summary:
      "Formación práctica para aprender a orar con intimidad, sinceridad y confianza bíblica.",
    objective:
      "Desarrollar una vida de oración constante, bíblica y transformadora en la presencia de Dios.",
    level: "intermedio",
    durationMinutes: 120,
    keyVerse: "Mateo 6:6",
    illustration: "🙏",
    cardGradient: "from-cyan-500 via-sky-500 to-indigo-500",
    tags: ["curso", "oracion", "discipulado"],
  },
  {
    id: "curso-fe-que-transforma",
    slug: "curso-fe-que-transforma",
    kind: "curso",
    title: "Curso: Fe que transforma",
    summary:
      "Itinerario de 16 lecciones para afirmar una fe bíblica, reformada y práctica en Cristo.",
    objective:
      "Fortalecer una fe madura en Cristo que impacte tus decisiones, carácter y testimonio diario.",
    level: "avanzado",
    durationMinutes: 320,
    keyVerse: "Hebreos 11:1",
    illustration: "✨",
    cardGradient: "from-amber-500 via-orange-500 to-rose-500",
    tags: ["curso", "fe", "discipulado"],
  },
];

export function getStudyBySlug(slug: string): Study | undefined {
  return studies.find((study) => study.slug === slug);
}
