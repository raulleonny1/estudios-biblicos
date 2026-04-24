import type { Study } from "../types";

export const studies: Study[] = [
  {
    id: "curso-basico-biblia",
    slug: "estudio-basico-biblia",
    kind: "curso",
    title: "Estudio básico de la biblia",
    summary:
      "Ruta principal de 15 lecciones con revisión de administración, desbloqueo progresivo y avance espiritual por etapas.",
    level: "principiante",
    durationMinutes: 450,
    keyVerse: "2 Timoteo 3:16",
    tags: ["discipulado", "fundamentos", "escuela-biblica"],
  },
  {
    id: "curso-orar-efectivamente",
    slug: "curso-orar-efectivamente",
    kind: "curso",
    title: "Curso: Cómo orar efectivamente",
    summary:
      "Formación práctica para aprender a orar con intimidad, sinceridad y confianza bíblica.",
    level: "intermedio",
    durationMinutes: 120,
    keyVerse: "Mateo 6:6",
    tags: ["curso", "oracion", "discipulado"],
  },
  {
    id: "sem-2",
    slug: "seminario-liderazgo-servicio",
    kind: "seminario",
    title: "Seminario: Liderazgo y servicio",
    summary: "Principios prácticos de liderazgo cristiano centrado en el servicio.",
    level: "avanzado",
    durationMinutes: 40,
    keyVerse: "Marcos 10:45",
    tags: ["seminario", "liderazgo", "servicio"],
  },
];

export function getStudyBySlug(slug: string): Study | undefined {
  return studies.find((study) => study.slug === slug);
}
