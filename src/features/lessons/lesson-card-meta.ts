import type { Lesson } from "./types";

const basicCourseGradients = [
  "from-indigo-500 via-violet-500 to-fuchsia-500",
  "from-violet-500 via-purple-500 to-indigo-500",
  "from-fuchsia-500 via-violet-500 to-indigo-500",
  "from-indigo-500 via-blue-500 to-violet-500",
];

const prayerCourseGradients = [
  "from-cyan-500 via-sky-500 to-blue-500",
  "from-sky-500 via-blue-500 to-indigo-500",
  "from-blue-500 via-cyan-500 to-teal-500",
  "from-cyan-500 via-teal-500 to-sky-500",
];

const faithCourseGradients = [
  "from-amber-500 via-orange-500 to-rose-500",
  "from-yellow-500 via-amber-500 to-orange-500",
  "from-orange-500 via-amber-500 to-red-500",
  "from-amber-500 via-rose-500 to-orange-500",
];

const manualBasicCourseMeta: Record<
  string,
  { objective: string; keyPassage: string; illustration: string }
> = {
  "leccion-01": {
    objective: "Comprender que ser cristiano implica arrepentimiento, fe y entrega real a Jesucristo.",
    keyPassage: "1 Corintios 3:11",
    illustration: "✝️",
  },
  "leccion-02": {
    objective:
      "Identificar los elementos esenciales del evangelio y responder con una conversión genuina.",
    keyPassage: "Efesios 2:8-9",
    illustration: "🛤️",
  },
  "leccion-03": {
    objective: "Afirmar la seguridad de salvación sobre la obra de Cristo, su Palabra y el Espíritu.",
    keyPassage: "1 Juan 5:13",
    illustration: "🛡️",
  },
  "leccion-04": {
    objective:
      "Distinguir justificación y santificación para crecer en madurez cristiana con perseverancia.",
    keyPassage: "2 Corintios 3:18",
    illustration: "🌱",
  },
  "leccion-05": {
    objective:
      "Conocer la fe cristiana en el Dios trino y sus fundamentos bíblicos para creer con convicción.",
    keyPassage: "Mateo 28:19",
    illustration: "✨",
  },
  "leccion-06": {
    objective:
      "Reconocer a Dios Padre como Creador y vivir en confianza, dependencia y obediencia filial.",
    keyPassage: "Juan 1:12",
    illustration: "👑",
  },
  "leccion-07": {
    objective:
      "Confesar a Jesucristo como verdadero Dios y verdadero hombre, centro de nuestra salvación.",
    keyPassage: "1 Pedro 3:18",
    illustration: "✝️",
  },
  "leccion-08": {
    objective:
      "Entender la obra del Espíritu Santo en la conversión, santificación y comunión de la Iglesia.",
    keyPassage: "Juan 16:8",
    illustration: "🕊️",
  },
  "leccion-09": {
    objective:
      "Vivir la santidad como respuesta de amor a Dios, guiados por sus mandamientos y por gracia.",
    keyPassage: "Mateo 22:37-40",
    illustration: "🌿",
  },
  "leccion-10": {
    objective:
      "Aplicar el amor al prójimo con verdad, pureza, contentamiento y obediencia práctica diaria.",
    keyPassage: "Hebreos 13:5",
    illustration: "🤝",
  },
  "leccion-11": {
    objective:
      "Desarrollar una disciplina bíblica de lectura para escuchar a Dios y obedecer su voluntad.",
    keyPassage: "2 Timoteo 3:16",
    illustration: "📖",
  },
  "leccion-12": {
    objective:
      "Fortalecer una vida de oración bíblica que incluya adoración, confesión, intercesión y gratitud.",
    keyPassage: "Filipenses 4:6",
    illustration: "🙏",
  },
  "leccion-13": {
    objective:
      "Valorar la comunión cristiana y la Santa Cena como medios de gracia, unidad y crecimiento.",
    keyPassage: "1 Corintios 10:17",
    illustration: "🍞",
  },
  "leccion-14": {
    objective:
      "Asumir un servicio cristiano integral con oración, testimonio, generosidad y acción comunitaria.",
    keyPassage: "Gálatas 6:10",
    illustration: "🤲",
  },
  "leccion-15": {
    objective:
      "Consolidar el compromiso de servir a Cristo cada día con perseverancia y misión en el mundo.",
    keyPassage: "Mateo 28:19-20",
    illustration: "🔥",
  },
  "oracion-leccion-01": {
    objective: "Entender la oración como comunión viva y sincera con Dios, no como un ritual.",
    keyPassage: "Mateo 6:6",
    illustration: "🙏",
  },
  "oracion-leccion-02": {
    objective: "Orar con confianza en que Dios escucha y responde conforme a su voluntad.",
    keyPassage: "1 Juan 5:14",
    illustration: "👂",
  },
  "oracion-leccion-03": {
    objective: "Imitar a Jesús como modelo perfecto de una vida dependiente del Padre.",
    keyPassage: "Lucas 11:1",
    illustration: "✝️",
  },
  "oracion-leccion-04": {
    objective: "Aprender a orar con el modelo del Padre Nuestro en equilibrio y reverencia.",
    keyPassage: "Mateo 6:9-13",
    illustration: "🕊️",
  },
  "oracion-leccion-05": {
    objective: "Fortalecer una oración de fe que confía en el carácter y la respuesta de Dios.",
    keyPassage: "Hebreos 11:6",
    illustration: "✨",
  },
  "oracion-leccion-06": {
    objective: "Depender del Espíritu Santo para orar con guía, fortaleza e intercesión.",
    keyPassage: "Romanos 8:26",
    illustration: "🕊️",
  },
  "oracion-leccion-07": {
    objective: "Reconocer y remover obstáculos como pecado, egoísmo y falta de fe en la oración.",
    keyPassage: "1 Juan 1:9",
    illustration: "🧼",
  },
  "oracion-leccion-08": {
    objective: "Perseverar en oración con constancia, aun cuando la respuesta se retrase.",
    keyPassage: "Lucas 18:1",
    illustration: "⏳",
  },
  "oracion-leccion-09": {
    objective: "Vivir la oración comunitaria como fuente de unidad y edificación de la iglesia.",
    keyPassage: "Mateo 18:20",
    illustration: "👥",
  },
  "oracion-leccion-10": {
    objective: "Convertir la oración en un estilo de vida diario y continuo delante de Dios.",
    keyPassage: "1 Tesalonicenses 5:17",
    illustration: "🌅",
  },
  "oracion-leccion-11": {
    objective:
      "Integrar oración litúrgica y personal para una vida espiritual completa y equilibrada.",
    keyPassage: "Hechos 2:42",
    illustration: "⛪",
  },
  "oracion-leccion-12": {
    objective: "Usar los Salmos como escuela bíblica para orar con profundidad y verdad.",
    keyPassage: "Salmo 62:8",
    illustration: "🎵",
  },
  "oracion-leccion-13": {
    objective:
      "Conectar oración y sacramentos como medios de gracia para crecer en comunión con Dios.",
    keyPassage: "1 Corintios 10:16",
    illustration: "🍞",
  },
  "oracion-leccion-14": {
    objective: "Practicar la intercesión por la iglesia, las autoridades y el mundo con compasión.",
    keyPassage: "1 Timoteo 2:1-2",
    illustration: "🌍",
  },
  "oracion-leccion-15": {
    objective:
      "Perseverar con discernimiento y esperanza en tiempos de prueba, silencio y espera.",
    keyPassage: "Romanos 12:12",
    illustration: "🛡️",
  },
  "fe-leccion-01": {
    objective: "Definir la fe cristiana como certeza y convicción fundada en Dios y su Palabra.",
    keyPassage: "Hebreos 11:1",
    illustration: "✨",
  },
  "fe-leccion-02": {
    objective: "Entender que la fe nace al escuchar el evangelio de Cristo con humildad.",
    keyPassage: "Romanos 10:17",
    illustration: "👂",
  },
  "fe-leccion-03": {
    objective: "Unir fe y arrepentimiento como respuesta integral al llamado del evangelio.",
    keyPassage: "Marcos 1:15",
    illustration: "↩️",
  },
  "fe-leccion-04": {
    objective: "Afirmar la justificación por fe y la paz con Dios por medio de Jesucristo.",
    keyPassage: "Romanos 5:1",
    illustration: "✝️",
  },
  "fe-leccion-05": {
    objective: "Vivir por fe cada día en dependencia continua de Cristo y su gracia.",
    keyPassage: "Gálatas 2:20",
    illustration: "🚶",
  },
  "fe-leccion-06": {
    objective: "Responder a la aflicción con esperanza, sabiendo que Dios refina la fe.",
    keyPassage: "1 Pedro 1:6-7",
    illustration: "🔥",
  },
  "fe-leccion-07": {
    objective: "Demostrar una fe viva mediante obediencia práctica y amor al prójimo.",
    keyPassage: "Santiago 2:17",
    illustration: "🤝",
  },
  "fe-leccion-08": {
    objective: "Perseverar en oración con fe, confiando en la voluntad y tiempos del Señor.",
    keyPassage: "Marcos 11:24",
    illustration: "🙏",
  },
  "fe-leccion-09": {
    objective: "Descansar en la providencia de Dios y ordenar la vida buscando su reino.",
    keyPassage: "Mateo 6:33",
    illustration: "👑",
  },
  "fe-leccion-10": {
    objective: "Crecer en la fe dentro de la comunidad de la iglesia y su vida compartida.",
    keyPassage: "Hechos 2:42",
    illustration: "⛪",
  },
  "fe-leccion-11": {
    objective: "Perseverar hasta el final confiando en la fidelidad de Dios que completa su obra.",
    keyPassage: "Filipenses 1:6",
    illustration: "🛡️",
  },
  "fe-leccion-12": {
    objective: "Asumir la misión de anunciar el evangelio con humildad, verdad y amor.",
    keyPassage: "Mateo 28:19-20",
    illustration: "📣",
  },
  "fe-leccion-13": {
    objective:
      "Administrar dones y recursos como mayordomos fieles para la gloria de Dios.",
    keyPassage: "1 Pedro 4:10",
    illustration: "🧺",
  },
  "fe-leccion-14": {
    objective: "Ejercitar discernimiento espiritual probando toda enseñanza a la luz bíblica.",
    keyPassage: "1 Juan 4:1",
    illustration: "🧭",
  },
  "fe-leccion-15": {
    objective:
      "Vivir con esperanza futura en Cristo, perseverando con perspectiva eterna.",
    keyPassage: "1 Pedro 1:3",
    illustration: "🌄",
  },
  "fe-leccion-16": {
    objective:
      "Consolidar una fe que transforma identidad, carácter y misión para la gloria de Dios.",
    keyPassage: "2 Corintios 5:17",
    illustration: "🌟",
  },
};

function pickIllustration(title: string): string {
  const normalized = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (normalized.includes("oracion") || normalized.includes("padre nuestro")) return "🙏";
  if (normalized.includes("jesus") || normalized.includes("cristo")) return "✝️";
  if (normalized.includes("espiritu")) return "🕊️";
  if (normalized.includes("santidad")) return "🌿";
  if (normalized.includes("servir") || normalized.includes("mision")) return "🤝";
  if (normalized.includes("fe")) return "✨";
  if (
    normalized.includes("biblia") ||
    normalized.includes("palabra") ||
    normalized.includes("lectura")
  ) {
    return "📖";
  }
  return "📘";
}

function getKeyPassage(passage: string): string {
  const firstNonEmptyLine = passage
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0);

  if (!firstNonEmptyLine) return "Pasaje bíblico de la lección";

  return firstNonEmptyLine.length > 140
    ? `${firstNonEmptyLine.slice(0, 137).trimEnd()}...`
    : firstNonEmptyLine;
}

function getCourseGradient(lesson: Lesson): string {
  const normalizedCourseName = lesson.courseName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (lesson.id.startsWith("oracion-") || normalizedCourseName.includes("orar")) {
    return prayerCourseGradients[(lesson.lessonNumber - 1) % prayerCourseGradients.length];
  }

  if (lesson.id.startsWith("fe-") || normalizedCourseName.includes("fe")) {
    return faithCourseGradients[(lesson.lessonNumber - 1) % faithCourseGradients.length];
  }

  return basicCourseGradients[(lesson.lessonNumber - 1) % basicCourseGradients.length];
}

export function getLessonCardMeta(lesson: Lesson) {
  const manualMeta = manualBasicCourseMeta[lesson.id];
  const gradient = getCourseGradient(lesson);

  if (manualMeta) {
    return {
      objective: manualMeta.objective,
      keyPassage: manualMeta.keyPassage,
      illustration: manualMeta.illustration,
      gradient,
    };
  }

  return {
    objective: lesson.summary,
    keyPassage: getKeyPassage(lesson.passage),
    illustration: pickIllustration(lesson.title),
    gradient,
  };
}
