import type { Study } from "../types";

export const studies: Study[] = [
  {
    id: "curso-basico-biblia",
    slug: "estudio-basico-biblia",
    kind: "curso",
    title: "Inicio del conocimiento de las Escrituras",
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
  {
    id: "curso-mayordomia-cristiana",
    slug: "curso-mayordomia-cristiana",
    kind: "curso",
    title: "Curso: Mayordomía cristiana",
    summary:
      "Programa de 10 estudios básicos para administrar con fidelidad tiempo, dones, recursos y servicio delante de Dios.",
    objective:
      "Formar mayordomos fieles que vivan con integridad, generosidad y responsabilidad para la gloria de Dios.",
    level: "intermedio",
    durationMinutes: 200,
    keyVerse: "1 Pedro 4:10",
    illustration: "🧺",
    cardGradient: "from-emerald-500 via-teal-500 to-cyan-500",
    tags: ["curso", "mayordomia", "discipulado"],
  },
  {
    id: "curso-mayordomia-intermedia",
    slug: "curso-mayordomia-intermedia",
    kind: "curso",
    title: "Curso: Mayordomía intermedia",
    summary:
      "Itinerario de 10 lecciones para profundizar en una mayordomía integral, fiel y madura en Cristo.",
    objective:
      "Consolidar una administración espiritual, doctrinal y práctica alineada con la fe reformada y episcopal.",
    level: "intermedio",
    durationMinutes: 240,
    keyVerse: "1 Corintios 4:2",
    illustration: "🧭",
    cardGradient: "from-teal-500 via-emerald-500 to-cyan-500",
    tags: ["curso", "mayordomia", "formacion"],
  },
  {
    id: "curso-mayordomia-avanzada",
    slug: "curso-mayordomia-avanzada",
    kind: "curso",
    title: "Curso: Mayordomía avanzada",
    summary:
      "Itinerario de 10 lecciones para integrar soberanía de Dios, iglesia, testimonio y rendición de cuentas en mayordomía madura.",
    objective:
      "Formar mayordomos que sirvan con sabiduría, reverencia y fidelidad hasta el fin, según la fe reformada y episcopal.",
    level: "avanzado",
    durationMinutes: 260,
    keyVerse: "Romanos 14:12",
    illustration: "⛪",
    cardGradient: "from-teal-500 via-emerald-500 to-cyan-500",
    tags: ["curso", "mayordomia", "liderazgo"],
  },
  {
    id: "seminario-familia-cristiana",
    slug: "seminario-familia-cristiana",
    kind: "seminario",
    title: "Seminario: Familia cristiana en tiempos actuales",
    summary:
      "Encuentro de formacion biblica para fortalecer el hogar, la comunicacion y el discipulado familiar.",
    objective:
      "Equipar a las familias para vivir el evangelio en casa con amor, orden y testimonio.",
    level: "intermedio",
    durationMinutes: 90,
    keyVerse: "Josue 24:15",
    illustration: "🏠",
    cardGradient: "from-rose-500 via-fuchsia-500 to-violet-500",
    tags: ["seminario", "familia", "discipulado"],
  },
  {
    id: "seminario-liderazgo-servidor",
    slug: "seminario-liderazgo-servidor",
    kind: "seminario",
    title: "Seminario: Liderazgo servidor",
    summary:
      "Jornada intensiva para lideres y colaboradores sobre servicio, integridad y trabajo en equipo.",
    objective:
      "Desarrollar un liderazgo cristiano humilde, pastoral y centrado en Cristo.",
    level: "avanzado",
    durationMinutes: 120,
    keyVerse: "Marcos 10:45",
    illustration: "🤝",
    cardGradient: "from-cyan-500 via-sky-500 to-indigo-500",
    tags: ["seminario", "liderazgo", "servicio"],
  },
];

export function getStudyBySlug(slug: string): Study | undefined {
  return studies.find((study) => study.slug === slug);
}