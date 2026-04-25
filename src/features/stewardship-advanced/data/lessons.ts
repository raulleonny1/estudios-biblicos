import type { Lesson } from "@/features/lessons/types";

type StewardshipAdvancedLessonSeed = {
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
  "¿Qué verdad de esta lección te desafía a mayor responsabilidad espiritual?",
  "¿Cómo integrarás esto con tu servicio y comunión en la iglesia local?",
  "¿Qué paso concreto tomarás para honrar a Cristo en público y en privado?",
];

const seeds: StewardshipAdvancedLessonSeed[] = [
  {
    lessonNumber: 1,
    title: "Soberanía de Dios y mayordomía humana",
    subtitle: "Todo es de Él y para Él",
    summary:
      "La mayordomía avanzada descansa en la soberanía de Dios: administramos lo que es suyo, para su gloria.",
    passageRef: "Romanos 11:36",
    passage:
      "De Él, por Él y para Él son todas las cosas. Ninguna área de la vida queda fuera del señorío de Cristo; la administración fiel responde con gratitud a su dominio absoluto.",
    essentialTakeaways: [
      "Dios es el dueño soberano de todo.",
      "La mayordomía es respuesta de gratitud.",
      "Cristo es Señor de lo público y lo privado.",
      "La gloria final es de Dios, no nuestra.",
    ],
    q1: {
      question: "¿Qué afirma Romanos 11:36 sobre todas las cosas?",
      correct: "Que son de Dios, por Él y para Él",
      wrongA: "Que solo lo religioso pertenece a Dios",
      wrongB: "Que el ser humano es dueño absoluto",
      explanation: "La Escritura centra la existencia y la historia en la gloria de Dios.",
    },
    q2: {
      question: "¿Qué implica esta verdad para la mayordomía?",
      correct: "Administrar con humildad lo que pertenece al Señor",
      wrongA: "Administrar sin rendir cuentas",
      wrongB: "Separar fe y responsabilidades diarias",
      explanation: "La fidelidad cristiana reconoce el señorío de Cristo sobre todo.",
    },
  },
  {
    lessonNumber: 2,
    title: "Mayordomía del estado en que fuiste llamado",
    subtitle: "Fidelidad en el lugar de Dios",
    summary:
      "Dios llama a permanecer con Dios en el estado en que cada uno fue llamado, sirviendo con excelencia.",
    passageRef: "1 Corintios 7:24",
    passage:
      "Cada uno permanezca con Dios en el estado en que fue llamado. La mayordomía avanzada no idealiza otro escenario: exige fidelidad donde el Señor nos colocó hoy.",
    essentialTakeaways: [
      "La vocación incluye el contexto actual.",
      "La fidelidad honra el llamado de Dios.",
      "No se confunde contentamiento con pasividad.",
      "Servir bien hoy prepara lo que Dios abrirá mañana.",
    ],
    q1: {
      question: "¿Qué exhorta 1 Corintios 7:24?",
      correct: "Permanecer con Dios en el estado en que fuimos llamados",
      wrongA: "Evitar todo compromiso estable",
      wrongB: "Cambiar constantemente sin discernimiento",
      explanation: "La fidelidad cristiana se vive en el lugar donde Dios nos puso.",
    },
    q2: {
      question: "¿Qué muestra una mayordomía madura aquí?",
      correct: "Servir con integridad donde Dios nos ha situado",
      wrongA: "Despreciar el contexto actual",
      wrongB: "Confundir vocación con ambición egoísta",
      explanation: "Dios honra la fidelidad perseverante en el llamado recibido.",
    },
  },
  {
    lessonNumber: 3,
    title: "Liderazgo al estilo del Salvador",
    subtitle: "Mayordomía del servicio",
    summary:
      "Jesús enseña que el primero debe ser siervo; la influencia cristiana se administra con humildad.",
    passageRef: "Marcos 10:45",
    passage:
      "El Hijo del hombre no vino para ser servido, sino para servir. La mayordomía avanzada rechaza el liderazgo orgulloso y abraza el servicio sacrificial por amor al prójimo.",
    essentialTakeaways: [
      "Cristo es el modelo del liderazgo cristiano.",
      "Servir es mayor que ser servido.",
      "La autoridad cristiana se ejerce con amor.",
      "El evangelio reforma el uso del poder.",
    ],
    q1: {
      question: "¿Para qué vino el Hijo del hombre según Marcos 10:45?",
      correct: "Para servir y dar su vida en rescate por muchos",
      wrongA: "Solo para recibir honores humanos",
      wrongB: "Para imponer dominio sin amor",
      explanation: "Jesús define el liderazgo cristiano como servicio redentor.",
    },
    q2: {
      question: "¿Qué distingue el liderazgo fiel en la iglesia?",
      correct: "Servicio humilde y cuidado del rebaño",
      wrongA: "Prestigio y control",
      wrongB: "Indiferencia hacia las necesidades del pueblo",
      explanation: "El pastor y el laico fiel sirven siguiendo el ejemplo de Cristo.",
    },
  },
  {
    lessonNumber: 4,
    title: "Palabra y sacramentos",
    subtitle: "Mayordomía de los medios de gracia",
    summary:
      "La iglesia reformada episcopal administra la gracia por la Palabra proclamada y los sacramentos celebrados con fidelidad.",
    passageRef: "1 Corintios 11:26",
    passage:
      "Cada vez que coméis este pan y bebéis esta copa, anunciáis la muerte del Señor hasta que venga. La mayordomía avanzada valora y participa reverentemente en lo que Cristo instituyó para fortalecer su pueblo.",
    essentialTakeaways: [
      "Los sacramentos señalan la obra de Cristo.",
      "La participación fiel edifica la iglesia.",
      "La reverencia honra al Señor.",
      "Palabra y mesa forman una vida íntegra.",
    ],
    q1: {
      question: "¿Qué anuncian al participar en la Cena del Señor?",
      correct: "La muerte de Cristo hasta que venga",
      wrongA: "Solo una tradición sin significado",
      wrongB: "Un acto meramente social",
      explanation: "La Santa Cena proclama el evangelio de manera visible y comunitaria.",
    },
    q2: {
      question: "¿Qué implica mayordomía respecto a los medios de gracia?",
      correct: "Recibirlos con fe y vivir en coherencia con el evangelio",
      wrongA: "Tratarlos como accesorios opcionales",
      wrongB: "Separar culto y vida diaria",
      explanation: "La gracia administrada en la iglesia fortalece la obediencia diaria.",
    },
  },
  {
    lessonNumber: 5,
    title: "Sabiduría para decisiones de mayordomía",
    subtitle: "Pedir discernimiento a Dios",
    summary:
      "Las decisiones importantes requieren oración, consejo bíblico y humildad ante la guía del Señor.",
    passageRef: "Santiago 1:5",
    passage:
      "Si a alguno de vosotros le falta sabiduría, pídasela a Dios. La mayordomía avanzada no confía en la astucia humana sola, sino que busca la sabiduría que viene de arriba para administrar con justicia.",
    essentialTakeaways: [
      "Dios da sabiduría generosamente.",
      "La oración precede decisiones mayores.",
      "El consejo pastoral honra el orden de la iglesia.",
      "La humildad abre el discernimiento.",
    ],
    q1: {
      question: "¿Qué promete Dios según Santiago 1:5?",
      correct: "Dar sabiduría a quien la pide con fe",
      wrongA: "Dejar siempre las decisiones al azar",
      wrongB: "Solo ayudar sin responsabilidad humana",
      explanation: "La sabiduría divina guía la vida y la administración fiel.",
    },
    q2: {
      question: "¿Qué actitud favorece el discernimiento?",
      correct: "Pedir con fe y someterse a la voluntad de Dios",
      wrongA: "Exigir respuestas sin paciencia",
      wrongB: "Ignorar la Palabra y el consejo",
      explanation: "El creyente maduro busca la guía del Señor con humildad.",
    },
  },
  {
    lessonNumber: 6,
    title: "Perdón y reconciliación en la comunidad",
    subtitle: "Mayordomía de las relaciones",
    summary:
      "La iglesia es comunidad reconciliada; administrar conflictos con perdón refleja el evangelio.",
    passageRef: "Efesios 4:32",
    passage:
      "Sed benignos unos con otros, misericordiosos, perdonándoos unos a otros. La mayordomía avanzada protege la unidad del Espíritu y restaura relaciones rotas por gracia.",
    essentialTakeaways: [
      "El perdón es mandato del evangelio.",
      "La reconciliación honra a Cristo.",
      "La comunidad sana edifica la misión.",
      "La misericordia es mayordomía del amor de Dios.",
    ],
    q1: {
      question: "¿Qué manda Efesios 4:32 a los creyentes?",
      correct: "Perdonarse unos a otros como Dios nos perdonó en Cristo",
      wrongA: "Guardar rencor por justicia propia",
      wrongB: "Evitar el diálogo difícil",
      explanation: "El perdón cristiano imita la misericordia de Dios.",
    },
    q2: {
      question: "¿Por qué el perdón es mayordomía?",
      correct: "Administra la gracia de Dios en las relaciones de la iglesia",
      wrongA: "Es solo un asunto privado sin impacto eclesial",
      wrongB: "Debilita la verdad",
      explanation: "Perdonar en verdad fortalece la comunión y el testimonio.",
    },
  },
  {
    lessonNumber: 7,
    title: "Trabajar para el Señor, no para hombres",
    subtitle: "Mayordomía y recompensa eterna",
    summary:
      "La fidelidad cotidiana tiene perspectiva eterna: lo que se hace para Cristo no es en vano.",
    passageRef: "Colosenses 3:23-24",
    passage:
      "Haced de corazón lo que hacéis, como para el Señor. Sabéis que del Señor recibiréis la recompensa de la herencia. La mayordomía avanzada vive con mirada al juicio gracioso del Padre y a la herencia incorruptible.",
    essentialTakeaways: [
      "El trabajo ordinario puede ser culto.",
      "La recompensa viene del Señor.",
      "La esperanza eterna sostiene la constancia.",
      "Nada hecho para Cristo se pierde.",
    ],
    q1: {
      question: "¿Para quién debemos trabajar según Colosenses 3:23?",
      correct: "Para el Señor",
      wrongA: "Solo para agradar a personas",
      wrongB: "Sin propósito espiritual",
      explanation: "Toda tarea fiel puede honrar a Cristo.",
    },
    q2: {
      question: "¿Qué promesa anima la mayordomía perseverante?",
      correct: "Recibir del Señor la recompensa de la herencia",
      wrongA: "Que no hay recompensa más allá de lo material",
      wrongB: "Que la fidelidad no importa",
      explanation: "La esperanza cristiana afirma recompensa del Padre.",
    },
  },
  {
    lessonNumber: 8,
    title: "Obediencia y apoyo al gobierno pastoral",
    subtitle: "Orden y cuidado del rebaño",
    summary:
      "La tradición episcopal reconoce el ministerio ordenado; el pueblo fiel apoya y obedece en el Señor.",
    passageRef: "Hebreos 13:17",
    passage:
      "Obedeced a vuestros pastores y sujeos a ellos, porque ellos velan por vuestras almas. La mayordomía avanzada incluye respeto, oración y colaboración con quienes Dios ha puesto para enseñar y pastorear.",
    essentialTakeaways: [
      "El pastoreo es un don de Cristo a la iglesia.",
      "La obediencia en el Señor edifica la comunidad.",
      "Orar por los pastores es mayordomía.",
      "El orden eclesiástico protege la verdad.",
    ],
    q1: {
      question: "¿Qué pide Hebreos 13:17 a los creyentes?",
      correct: "Obedecer y someterse a los pastores que velan por las almas",
      wrongA: "Rechazar toda autoridad espiritual",
      wrongB: "Obediencia ciega sin discernimiento bíblico",
      explanation: "La iglesia honra el ministerio que Cristo instituyó para su cuidado.",
    },
    q2: {
      question: "¿Cómo se relaciona esto con la mayordomía del laicado?",
      correct: "Colaborar, orar y servir para el bien común de la iglesia",
      wrongA: "Retirarse por completo del cuerpo",
      wrongB: "Competir con el ministerio ordenado",
      explanation: "Pastores y pueblo caminan juntos bajo el Señorío de Cristo.",
    },
  },
  {
    lessonNumber: 9,
    title: "Dar razón de la esperanza",
    subtitle: "Mayordomía del testimonio público",
    summary:
      "El creyente administra su voz y conducta para presentar el evangelio con mansedumbre y respeto.",
    passageRef: "1 Pedro 3:15",
    passage:
      "Estad siempre preparados para responder a todo el que os demande razón de la esperanza que hay en vosotros. La mayordomía avanzada forma testigos prudentes que honran al Señor en palabra y ejemplo.",
    essentialTakeaways: [
      "La esperanza cristiana es defendible con gentileza.",
      "El testimonio une verdad y carácter.",
      "La mansedumbre no es debilidad.",
      "La misión incluye diálogo respetuoso.",
    ],
    q1: {
      question: "¿Qué debemos estar preparados a dar según 1 Pedro 3:15?",
      correct: "Razón de la esperanza que hay en nosotros",
      wrongA: "Solo opiniones personales",
      wrongB: "Evitar toda conversación sobre fe",
      explanation: "El creyente maduro explica su esperanza en Cristo.",
    },
    q2: {
      question: "¿Con qué actitud debe presentarse el testimonio?",
      correct: "Con mansedumbre y reverencia",
      wrongA: "Con agresividad y desprecio",
      wrongB: "Sin importar la verdad",
      explanation: "El evangelio se proclama con verdad y amor.",
    },
  },
  {
    lessonNumber: 10,
    title: "Rendir cuentas ante Dios",
    subtitle: "Cierre de mayordomía avanzada",
    summary:
      "Cada uno dará cuenta de sí mismo a Dios; la mayordomía culmina en humildad, examen y compromiso renovado.",
    passageRef: "Romanos 14:12",
    passage:
      "Cada uno de nosotros dará a Dios cuenta de sí. La mayordomía avanzada cierra con arrepentimiento donde haga falta, gratitud por la gracia y resolución de seguir sirviendo hasta que Cristo venga.",
    essentialTakeaways: [
      "Dios es el juez final y justo.",
      "La rendición de cuentas produce santidad.",
      "La gracia no anula responsabilidad.",
      "La meta es fidelidad hasta el fin.",
    ],
    q1: {
      question: "¿Qué enseña Romanos 14:12?",
      correct: "Que cada uno dará cuenta a Dios",
      wrongA: "Que no hay responsabilidad personal",
      wrongB: "Que solo los pastores rinden cuentas",
      explanation: "Toda vida cristiana responde delante del Señor.",
    },
    q2: {
      question: "¿Qué respuesta madura da el mayordomo avanzado?",
      correct: "Examinarse, corregirse y perseverar en fidelidad a Cristo",
      wrongA: "Confiar solo en apariencias externas",
      wrongB: "Evitar toda evaluación espiritual",
      explanation: "La madurez cristiana abraza la santidad y la rendición de cuentas.",
    },
  },
];

function toLesson(seed: StewardshipAdvancedLessonSeed): Lesson {
  const id = `mayordomia-avanzada-leccion-${String(seed.lessonNumber).padStart(2, "0")}`;

  return {
    id,
    courseName: "Mayordomía avanzada",
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
            text: "La mayordomía avanzada prescinde de la iglesia y del ministerio.",
            isCorrect: false,
          },
          {
            id: `${id}-q3o3`,
            text: "Solo los líderes tienen mayordomía ante Dios.",
            isCorrect: false,
          },
        ],
        explanation:
          "La mayordomía avanzada integra soberanía de Dios, iglesia, testimonio y rendición de cuentas.",
      },
    ],
  };
}

export const stewardshipAdvancedLessons: Lesson[] = seeds.map(toLesson);

export function getStewardshipAdvancedLessonById(lessonId: string): Lesson | undefined {
  return stewardshipAdvancedLessons.find((lesson) => lesson.id === lessonId);
}
