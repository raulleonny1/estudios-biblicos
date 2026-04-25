import type { Lesson } from "@/features/lessons/types";

type StewardshipLessonSeed = {
  lessonNumber: number;
  title: string;
  subtitle: string;
  summary: string;
  passageRef: string;
  passage: string;
  essentialTakeaways: [string, string, string, string];
  q1: {
    question: string;
    correct: string;
    wrongA: string;
    wrongB: string;
    explanation: string;
  };
  q2: {
    question: string;
    correct: string;
    wrongA: string;
    wrongB: string;
    explanation: string;
  };
};

const reflectionPrompts: [string, string, string] = [
  "¿Qué cambio concreto aplicarás esta semana en tu mayordomía?",
  "¿Qué recurso (tiempo, dones, finanzas) necesitas rendir mejor al Señor?",
  "¿Cómo vas a servir a otros con fidelidad y gratitud?",
];

const seeds: StewardshipLessonSeed[] = [
  {
    lessonNumber: 1,
    title: "¿Qué es la mayordomía cristiana?",
    subtitle: "Administradores y no dueños",
    summary: "Todo lo que somos y tenemos pertenece a Dios, y lo administramos para su gloria.",
    passageRef: "Salmo 24:1",
    passage:
      "La mayordomía comienza reconociendo que la tierra y su plenitud son del Señor. El creyente no vive como dueño absoluto, sino como administrador fiel de lo recibido por gracia.",
    essentialTakeaways: [
      "Dios es dueño de todo lo creado.",
      "El creyente administra, no posee de forma absoluta.",
      "La mayordomía es parte del discipulado diario.",
      "Administrar bien honra al Señor.",
    ],
    q1: {
      question: "¿Qué enseña Salmo 24:1?",
      correct: "Que todo pertenece al Señor",
      wrongA: "Que solo lo espiritual pertenece a Dios",
      wrongB: "Que cada persona es dueña absoluta de su vida",
      explanation: "La Escritura afirma que todo es del Señor y nosotros lo administramos.",
    },
    q2: {
      question: "¿Cuál es la base de la mayordomía cristiana?",
      correct: "Reconocer a Dios como dueño y vivir como administrador fiel",
      wrongA: "Buscar solo el beneficio personal",
      wrongB: "Separar fe y administración diaria",
      explanation: "La mayordomía bíblica nace de reconocer la soberanía de Dios sobre todo.",
    },
  },
  {
    lessonNumber: 2,
    title: "Mayordomía del tiempo",
    subtitle: "Vivir con propósito delante de Dios",
    summary: "El tiempo es un regalo de Dios que debemos usar con sabiduría y propósito eterno.",
    passageRef: "Efesios 5:15-16",
    passage:
      "La Biblia llama a aprovechar bien el tiempo. La mayordomía del tiempo implica ordenar prioridades, evitar la negligencia y vivir para lo que glorifica a Dios.",
    essentialTakeaways: [
      "El tiempo es un recurso espiritual.",
      "Dios llama a vivir con sabiduría.",
      "Las prioridades revelan el corazón.",
      "Aprovechar el tiempo honra al Señor.",
    ],
    q1: {
      question: "¿Qué significa redimir el tiempo?",
      correct: "Usarlo sabiamente para lo que agrada a Dios",
      wrongA: "Llenar la agenda sin descanso",
      wrongB: "Vivir sin planificación",
      explanation: "Efesios enseña administrar el tiempo con sabiduría espiritual.",
    },
    q2: {
      question: "¿Qué muestra una buena mayordomía del tiempo?",
      correct: "Prioridades alineadas con Dios",
      wrongA: "Impulsividad constante",
      wrongB: "Desorden sin propósito",
      explanation: "El tiempo bien administrado refleja una vida centrada en el Señor.",
    },
  },
  {
    lessonNumber: 3,
    title: "Mayordomía de los dones",
    subtitle: "Servir con lo que Dios nos dio",
    summary: "Cada creyente recibió dones para edificar la iglesia y servir al prójimo.",
    passageRef: "1 Pedro 4:10",
    passage:
      "Los dones no son para exaltación personal, sino para servicio. Dios nos confía capacidades para bendecir a otros como buenos administradores de su gracia.",
    essentialTakeaways: [
      "Cada creyente ha recibido dones.",
      "Los dones tienen propósito de servicio.",
      "Servir con humildad edifica a la iglesia.",
      "La mayordomía fiel evita el orgullo espiritual.",
    ],
    q1: {
      question: "¿Para qué se reciben los dones espirituales?",
      correct: "Para servir y edificar a otros",
      wrongA: "Para competir con otros creyentes",
      wrongB: "Para buscar reconocimiento personal",
      explanation: "1 Pedro 4:10 llama a servir con los dones como administradores de gracia.",
    },
    q2: {
      question: "¿Qué actitud acompaña una mayordomía sana de dones?",
      correct: "Humildad y disposición de servicio",
      wrongA: "Autosuficiencia",
      wrongB: "Indiferencia hacia la iglesia",
      explanation: "Los dones se ejercen para edificación, no para autoexaltación.",
    },
  },
  {
    lessonNumber: 4,
    title: "Mayordomía de las finanzas",
    subtitle: "Generosidad, integridad y confianza",
    summary: "Los recursos económicos se administran con honestidad, generosidad y temor de Dios.",
    passageRef: "2 Corintios 9:7",
    passage:
      "Dios ama al dador alegre. La mayordomía financiera no nace de presión, sino de gratitud por la gracia recibida en Cristo y de confianza en su provisión.",
    essentialTakeaways: [
      "La generosidad es fruto de gratitud.",
      "La integridad financiera honra a Dios.",
      "Dar con alegría refleja fe madura.",
      "Dios sigue siendo el proveedor final.",
    ],
    q1: {
      question: "¿Cómo debe darse según 2 Corintios 9:7?",
      correct: "Con alegría y convicción delante de Dios",
      wrongA: "Con obligación y queja",
      wrongB: "Solo cuando sobra",
      explanation: "La ofrenda cristiana nace de un corazón agradecido y voluntario.",
    },
    q2: {
      question: "¿Qué expresa una buena mayordomía financiera?",
      correct: "Generosidad con integridad y confianza en Dios",
      wrongA: "Control absoluto por miedo",
      wrongB: "Desorden en el uso de recursos",
      explanation: "La Biblia llama a una administración fiel y generosa.",
    },
  },
  {
    lessonNumber: 5,
    title: "Mayordomía del cuerpo",
    subtitle: "Templo del Espíritu Santo",
    summary: "El cuerpo del creyente pertenece a Dios y debe ser cuidado para su gloria.",
    passageRef: "1 Corintios 6:19-20",
    passage:
      "Fuimos comprados por precio. Cuidar el cuerpo, hábitos y decisiones cotidianas también forma parte de una mayordomía integral y santa.",
    essentialTakeaways: [
      "El cuerpo pertenece al Señor.",
      "La santidad incluye hábitos físicos.",
      "Cuidarnos es acto de obediencia.",
      "La mayordomía abarca toda la vida.",
    ],
    q1: {
      question: "¿Qué enseña 1 Corintios 6:19-20 sobre nuestro cuerpo?",
      correct: "Que es templo del Espíritu y pertenece a Dios",
      wrongA: "Que no importa cómo lo usemos",
      wrongB: "Que es solo una dimensión secundaria",
      explanation: "La Escritura llama a glorificar a Dios también con el cuerpo.",
    },
    q2: {
      question: "¿Qué refleja cuidar el cuerpo con sabiduría?",
      correct: "Obediencia y gratitud al Señor",
      wrongA: "Vanidad espiritual",
      wrongB: "Legalismo externo",
      explanation: "La mayordomía del cuerpo nace de la identidad en Cristo.",
    },
  },
  {
    lessonNumber: 6,
    title: "Mayordomía de la familia",
    subtitle: "Servir primero en casa",
    summary: "La fidelidad cristiana se vive en el hogar con amor, orden y testimonio.",
    passageRef: "Josué 24:15",
    passage:
      "La fe no se limita al templo. Dios llama a cada hogar a servir al Señor, formando relaciones marcadas por gracia, verdad y responsabilidad mutua.",
    essentialTakeaways: [
      "El hogar es primer campo de discipulado.",
      "Servir en familia honra a Dios.",
      "El amor práctico fortalece el testimonio.",
      "La mayordomía también es relacional.",
    ],
    q1: {
      question: "¿Qué decisión declara Josué para su casa?",
      correct: "Serviremos al Señor",
      wrongA: "Cada uno decidirá sin dirección espiritual",
      wrongB: "La fe solo es individual",
      explanation: "Josué presenta un compromiso familiar con Dios.",
    },
    q2: {
      question: "¿Qué muestra una mayordomía familiar saludable?",
      correct: "Amor, orden y testimonio cristiano en casa",
      wrongA: "Indiferencia espiritual en el hogar",
      wrongB: "Separar fe de la convivencia diaria",
      explanation: "La familia es parte central del llamado cristiano a la fidelidad.",
    },
  },
  {
    lessonNumber: 7,
    title: "Mayordomía en el trabajo",
    subtitle: "Trabajar como para el Señor",
    summary: "El trabajo diario es vocación de servicio y adoración cuando se hace para Dios.",
    passageRef: "Colosenses 3:23",
    passage:
      "El creyente trabaja con excelencia e integridad, no solo para agradar personas, sino como quien sirve al Señor en cada tarea.",
    essentialTakeaways: [
      "El trabajo tiene valor espiritual.",
      "La excelencia honra a Dios.",
      "La integridad es testimonio del evangelio.",
      "Servimos a Cristo también en lo cotidiano.",
    ],
    q1: {
      question: "¿Cómo debemos trabajar según Colosenses 3:23?",
      correct: "De corazón, como para el Señor",
      wrongA: "Solo cuando hay supervisión",
      wrongB: "Buscando solo reconocimiento humano",
      explanation: "La Biblia enseña que el trabajo se ofrece a Dios.",
    },
    q2: {
      question: "¿Qué expresa la mayordomía cristiana en el trabajo?",
      correct: "Integridad, responsabilidad y servicio",
      wrongA: "Mediocridad",
      wrongB: "Deshonestidad por conveniencia",
      explanation: "La vocación cristiana refleja el carácter de Cristo.",
    },
  },
  {
    lessonNumber: 8,
    title: "Mayordomía de la creación",
    subtitle: "Cuidar lo que Dios hizo",
    summary: "Dios llama al ser humano a cuidar responsablemente la creación bajo su señorío.",
    passageRef: "Génesis 2:15",
    passage:
      "El mandato de cultivar y guardar recuerda que la creación es don de Dios. La mayordomía incluye respeto, responsabilidad y gratitud por lo creado.",
    essentialTakeaways: [
      "La creación es buena y pertenece a Dios.",
      "El ser humano fue llamado a cuidarla.",
      "La responsabilidad ecológica puede honrar a Dios.",
      "La gratitud transforma el uso de recursos.",
    ],
    q1: {
      question: "¿Qué encargo recibió el ser humano en Génesis 2:15?",
      correct: "Cultivar y guardar la creación",
      wrongA: "Explotarla sin límites",
      wrongB: "Ignorar el cuidado de la tierra",
      explanation: "Dios nos llama a administrar su creación con responsabilidad.",
    },
    q2: {
      question: "¿Qué actitud acompaña la mayordomía de la creación?",
      correct: "Responsabilidad y gratitud",
      wrongA: "Consumo sin límite",
      wrongB: "Indiferencia total",
      explanation: "Cuidar lo creado expresa obediencia al Creador.",
    },
  },
  {
    lessonNumber: 9,
    title: "Mayordomía y generosidad",
    subtitle: "Dar como fruto del evangelio",
    summary: "La generosidad cristiana brota del amor de Dios y participa en su misión.",
    passageRef: "Hechos 20:35",
    passage:
      "Jesús enseñó que hay más dicha en dar que en recibir. La mayordomía madura comparte recursos, tiempo y capacidades para bendecir al prójimo.",
    essentialTakeaways: [
      "Dar es una expresión de amor cristiano.",
      "La generosidad fortalece la misión.",
      "Compartir rompe el egoísmo.",
      "Dios usa nuestra entrega para bendecir a otros.",
    ],
    q1: {
      question: "¿Qué enseñanza destaca Hechos 20:35?",
      correct: "Hay más bienaventuranza en dar que en recibir",
      wrongA: "Es mejor guardar todo para uno mismo",
      wrongB: "Dar solo sirve para aparentar espiritualidad",
      explanation: "La generosidad es parte de la vida cristiana fiel.",
    },
    q2: {
      question: "¿Qué refleja una mayordomía generosa?",
      correct: "Corazón transformado por el evangelio",
      wrongA: "Búsqueda de aprobación",
      wrongB: "Miedo a compartir",
      explanation: "El evangelio produce una vida abierta al servicio y la entrega.",
    },
  },
  {
    lessonNumber: 10,
    title: "Fidelidad final en la mayordomía",
    subtitle: "Perseverar hasta oír: bien, buen siervo",
    summary: "La meta del mayordomo cristiano es perseverar fielmente hasta el final.",
    passageRef: "Mateo 25:21",
    passage:
      "El Señor llama bienaventurado al siervo fiel. La mayordomía cristiana mira la eternidad y persevera administrando con obediencia, amor y esperanza.",
    essentialTakeaways: [
      "Dios valora la fidelidad perseverante.",
      "La mayordomía se evalúa delante del Señor.",
      "La esperanza eterna fortalece la constancia.",
      "Servir fielmente hoy prepara para la recompensa eterna.",
    ],
    q1: {
      question: "¿Qué palabra recibe el siervo fiel en Mateo 25:21?",
      correct: "Bien, buen siervo y fiel",
      wrongA: "Importa solo el resultado visible",
      wrongB: "La fidelidad no tiene recompensa",
      explanation: "Jesús enseña que Dios honra la fidelidad de sus siervos.",
    },
    q2: {
      question: "¿Cuál debe ser la meta del creyente en la mayordomía?",
      correct: "Perseverar fielmente para la gloria de Dios",
      wrongA: "Buscar éxito sin obediencia",
      wrongB: "Servir solo por temporadas",
      explanation: "La vida cristiana madura termina con fidelidad perseverante.",
    },
  },
];

function toLesson(seed: StewardshipLessonSeed): Lesson {
  const id = `mayordomia-leccion-${String(seed.lessonNumber).padStart(2, "0")}`;

  return {
    id,
    courseName: "Mayordomía cristiana",
    lessonNumber: seed.lessonNumber,
    title: seed.title,
    subtitle: seed.subtitle,
    summary: seed.summary,
    essentialTakeaways: [...seed.essentialTakeaways],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage: `${seed.passageRef}\n\n${seed.passage}`,
    pointsReward: 20,
    reflectionPrompts,
    questions: [
      {
        id: `${id}-q1`,
        question: seed.q1.question,
        options: [
          { id: `${id}-q1o1`, text: seed.q1.correct, isCorrect: true },
          { id: `${id}-q1o2`, text: seed.q1.wrongA, isCorrect: false },
          { id: `${id}-q1o3`, text: seed.q1.wrongB, isCorrect: false },
        ],
        explanation: seed.q1.explanation,
      },
      {
        id: `${id}-q2`,
        question: seed.q2.question,
        options: [
          { id: `${id}-q2o1`, text: seed.q2.correct, isCorrect: true },
          { id: `${id}-q2o2`, text: seed.q2.wrongA, isCorrect: false },
          { id: `${id}-q2o3`, text: seed.q2.wrongB, isCorrect: false },
        ],
        explanation: seed.q2.explanation,
      },
      {
        id: `${id}-q3`,
        question: "¿Qué resume mejor la lección?",
        options: [
          { id: `${id}-q3o1`, text: seed.summary, isCorrect: true },
          {
            id: `${id}-q3o2`,
            text: "La mayordomía solo importa en asuntos financieros.",
            isCorrect: false,
          },
          {
            id: `${id}-q3o3`,
            text: "La vida cristiana no requiere administración fiel.",
            isCorrect: false,
          },
        ],
        explanation: "La mayordomía bíblica integra vida, recursos y servicio para la gloria de Dios.",
      },
    ],
  };
}

export const stewardshipLessons: Lesson[] = seeds.map(toLesson);

export function getStewardshipLessonById(lessonId: string): Lesson | undefined {
  return stewardshipLessons.find((lesson) => lesson.id === lessonId);
}
