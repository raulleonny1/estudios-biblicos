import type { Lesson } from "@/features/lessons/types";

type StewardshipIntermediateLessonSeed = {
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
  "¿Qué ajuste concreto harás esta semana en tu administración integral?",
  "¿Qué área de mayordomía necesita más oración, consejo y obediencia?",
  "¿Cómo puedes servir mejor a la iglesia local con fidelidad y humildad?",
];

const seeds: StewardshipIntermediateLessonSeed[] = [
  {
    lessonNumber: 1,
    title: "Mayordomía del corazón",
    subtitle: "Motivaciones delante de Dios",
    summary: "La mayordomía fiel comienza en el corazón rendido al señorío de Cristo.",
    passageRef: "Proverbios 4:23",
    passage:
      "La Escritura enseña que del corazón mana la vida. Una mayordomía madura no se limita a acciones externas: examina intenciones, deseos y prioridades para vivir en santidad.",
    essentialTakeaways: [
      "La raíz de la mayordomía está en el corazón.",
      "Dios evalúa motivaciones y no solo resultados.",
      "La obediencia nace de amor al Señor.",
      "La vigilancia interior protege una vida fiel.",
    ],
    q1: {
      question: "¿Qué enfatiza Proverbios 4:23 para la mayordomía?",
      correct: "Guardar el corazón porque de él brota la vida",
      wrongA: "Centrarse solo en la imagen externa",
      wrongB: "Administrar sin revisar motivaciones",
      explanation: "El corazón orienta toda la vida, incluida nuestra administración espiritual.",
    },
    q2: {
      question: "¿Qué distingue una mayordomía intermedia madura?",
      correct: "Motivaciones purificadas por la Palabra y el Espíritu",
      wrongA: "Activismo sin examen espiritual",
      wrongB: "Cumplimiento superficial",
      explanation: "Dios llama a una obediencia sincera que nace del interior.",
    },
  },
  {
    lessonNumber: 2,
    title: "Mayordomía y culto reverente",
    subtitle: "Adoración centrada en Dios",
    summary: "Administrar bien la vida incluye honrar a Dios en el culto con reverencia y verdad.",
    passageRef: "Hebreos 12:28",
    passage:
      "La iglesia responde al reino inconmovible con gratitud y reverencia. La mayordomía intermedia integra liturgia, obediencia y vida diaria para la gloria de Dios.",
    essentialTakeaways: [
      "La adoración es parte central de la mayordomía.",
      "El culto reverente forma el carácter cristiano.",
      "La liturgia y la vida diaria deben estar unidas.",
      "La gratitud sostiene la fidelidad al Señor.",
    ],
    q1: {
      question: "¿Qué actitud pide Hebreos 12:28 en la adoración?",
      correct: "Gratitud y reverencia",
      wrongA: "Formalismo vacío",
      wrongB: "Indiferencia espiritual",
      explanation: "La adoración bíblica responde a la gracia de Dios con reverencia.",
    },
    q2: {
      question: "¿Cómo se conecta culto y mayordomía?",
      correct: "El culto moldea una vida obediente y responsable",
      wrongA: "Son áreas separadas",
      wrongB: "Solo importa el domingo",
      explanation: "La adoración verdadera transforma toda la vida del discípulo.",
    },
  },
  {
    lessonNumber: 3,
    title: "Mayordomía de la enseñanza",
    subtitle: "Transmitir sana doctrina",
    summary: "Quien recibe verdad bíblica también es llamado a guardarla y compartirla fielmente.",
    passageRef: "2 Timoteo 2:2",
    passage:
      "La mayordomía de la verdad implica custodiar el evangelio y transmitirlo con fidelidad a otros, fortaleciendo una iglesia firme en doctrina reformada y vida santa.",
    essentialTakeaways: [
      "La doctrina sana es un tesoro a preservar.",
      "Formar discípulos incluye transmitir la verdad.",
      "La fidelidad doctrinal protege a la iglesia.",
      "La enseñanza debe unir verdad y carácter.",
    ],
    q1: {
      question: "¿Qué encargo da Pablo en 2 Timoteo 2:2?",
      correct: "Transmitir fielmente la enseñanza a otros",
      wrongA: "Guardar la doctrina para pocos",
      wrongB: "Reducir la formación bíblica",
      explanation: "La fe se multiplica cuando la verdad se transmite con fidelidad.",
    },
    q2: {
      question: "¿Qué exige la mayordomía de la enseñanza?",
      correct: "Verdad bíblica y testimonio coherente",
      wrongA: "Conocimiento sin práctica",
      wrongB: "Opiniones sin fundamento",
      explanation: "El discipulado fiel une doctrina, piedad y misión.",
    },
  },
  {
    lessonNumber: 4,
    title: "Mayordomía y justicia",
    subtitle: "Fe que actúa con misericordia",
    summary: "La mayordomía cristiana madura busca justicia, misericordia y humildad delante de Dios.",
    passageRef: "Miqueas 6:8",
    passage:
      "Dios pide caminar humildemente, amar misericordia y hacer justicia. La administración fiel de recursos y decisiones incluye compromiso real con el bien del prójimo.",
    essentialTakeaways: [
      "La mayordomía también es ética y social.",
      "Dios llama a justicia con misericordia.",
      "La humildad orienta el servicio cristiano.",
      "El evangelio se refleja en obras de amor.",
    ],
    q1: {
      question: "¿Qué resume Miqueas 6:8?",
      correct: "Hacer justicia, amar misericordia y caminar humildemente",
      wrongA: "Cumplir ritos sin compromiso práctico",
      wrongB: "Separar fe y vida pública",
      explanation: "Dios llama a una vida íntegra en amor y justicia.",
    },
    q2: {
      question: "¿Cómo se aplica esta lección a la mayordomía?",
      correct: "Administrando decisiones con ética, compasión y verdad",
      wrongA: "Ignorando al necesitado",
      wrongB: "Buscando prestigio",
      explanation: "La mayordomía madura busca el bien del prójimo para la gloria de Dios.",
    },
  },
  {
    lessonNumber: 5,
    title: "Mayordomía de influencia",
    subtitle: "Testimonio en palabra y conducta",
    summary: "Toda influencia debe ejercerse como servicio, reflejando el carácter de Cristo.",
    passageRef: "Mateo 5:16",
    passage:
      "Jesús llama a alumbrar con buenas obras para que Dios sea glorificado. La influencia en familia, iglesia y sociedad se administra con humildad y responsabilidad.",
    essentialTakeaways: [
      "La influencia es un recurso espiritual.",
      "El testimonio visible debe glorificar a Dios.",
      "Servir es mayor que ser reconocido.",
      "La coherencia fortalece el evangelio.",
    ],
    q1: {
      question: "¿Para qué deben brillar las buenas obras según Mateo 5:16?",
      correct: "Para glorificar al Padre",
      wrongA: "Para la autoexaltación",
      wrongB: "Para competir con otros",
      explanation: "El fin del testimonio cristiano es la gloria de Dios.",
    },
    q2: {
      question: "¿Qué caracteriza una influencia bien administrada?",
      correct: "Humildad, coherencia y servicio",
      wrongA: "Control y protagonismo",
      wrongB: "Neutralidad espiritual",
      explanation: "La influencia cristiana es mayordomía de servicio, no de dominio.",
    },
  },
  {
    lessonNumber: 6,
    title: "Mayordomía y disciplina espiritual",
    subtitle: "Constancia en los medios de gracia",
    summary: "La madurez crece cuando administramos fielmente oración, Palabra y comunión.",
    passageRef: "1 Timoteo 4:7-8",
    passage:
      "La piedad se ejercita con constancia. La mayordomía intermedia fortalece hábitos espirituales que sostienen una vida de obediencia, discernimiento y perseverancia.",
    essentialTakeaways: [
      "La disciplina espiritual forma el carácter cristiano.",
      "Los medios de gracia nutren la fidelidad.",
      "La constancia vence la superficialidad.",
      "La piedad práctica sostiene la misión.",
    ],
    q1: {
      question: "¿Qué enseña 1 Timoteo 4:7-8 sobre la vida espiritual?",
      correct: "Ejercitarse en piedad",
      wrongA: "Depender solo de inspiración momentánea",
      wrongB: "Descuidar hábitos espirituales",
      explanation: "La piedad madura requiere práctica constante y disciplina.",
    },
    q2: {
      question: "¿Qué aporta esta mayordomía al creyente?",
      correct: "Estabilidad y crecimiento en obediencia",
      wrongA: "Rutina sin fruto",
      wrongB: "Autosuficiencia",
      explanation: "Los medios de gracia fortalecen una fe perseverante.",
    },
  },
  {
    lessonNumber: 7,
    title: "Mayordomía en tiempos de prueba",
    subtitle: "Fidelidad bajo presión",
    summary: "La mayordomía madura permanece fiel cuando llegan prueba, pérdida o incertidumbre.",
    passageRef: "1 Pedro 4:12-13",
    passage:
      "El creyente no se sorprende por la prueba: aprende a administrar dolor, esperanza y decisiones con fe, confiando en la soberanía de Dios y su gracia suficiente.",
    essentialTakeaways: [
      "La prueba también revela nuestra administración espiritual.",
      "Dios sostiene al creyente en aflicción.",
      "La esperanza cristiana preserva la fidelidad.",
      "La perseverancia glorifica a Cristo.",
    ],
    q1: {
      question: "¿Qué actitud enseña 1 Pedro 4:12-13 frente a la prueba?",
      correct: "Perseverar con gozo y fe en Cristo",
      wrongA: "Desesperar sin esperanza",
      wrongB: "Abandonar el compromiso espiritual",
      explanation: "La prueba forma al creyente y lo afirma en Cristo.",
    },
    q2: {
      question: "¿Qué significa mayordomía en aflicción?",
      correct: "Administrar dolor y decisiones con confianza en Dios",
      wrongA: "Negar el sufrimiento",
      wrongB: "Vivir sin dirección espiritual",
      explanation: "La fidelidad en la prueba expresa madurez cristiana.",
    },
  },
  {
    lessonNumber: 8,
    title: "Mayordomía y unidad eclesial",
    subtitle: "Servir para edificar el cuerpo",
    summary: "La administración fiel busca unidad, reconciliación y crecimiento en la iglesia.",
    passageRef: "Efesios 4:3",
    passage:
      "La iglesia cuida la unidad del Espíritu en el vínculo de la paz. La mayordomía intermedia evita divisiones y promueve comunión, servicio y madurez compartida.",
    essentialTakeaways: [
      "La unidad es responsabilidad de todos.",
      "La paz se cultiva con humildad y verdad.",
      "El servicio fortalece la comunión eclesial.",
      "La reconciliación honra al evangelio.",
    ],
    q1: {
      question: "¿Qué manda Efesios 4:3 a la iglesia?",
      correct: "Guardar la unidad del Espíritu en paz",
      wrongA: "Priorizar preferencias personales",
      wrongB: "Normalizar divisiones",
      explanation: "La unidad cristiana se cuida activamente con humildad y amor.",
    },
    q2: {
      question: "¿Qué expresa la mayordomía de unidad?",
      correct: "Compromiso con reconciliación y edificación mutua",
      wrongA: "Individualismo espiritual",
      wrongB: "Competencia ministerial",
      explanation: "La comunión de la iglesia es parte central de nuestra fidelidad.",
    },
  },
  {
    lessonNumber: 9,
    title: "Mayordomía y misión local",
    subtitle: "Responder al llamado de Dios",
    summary: "La iglesia administra sus recursos para servir, evangelizar y discipular en su contexto.",
    passageRef: "Hechos 1:8",
    passage:
      "El Espíritu capacita para testificar. La mayordomía intermedia discierne cómo usar tiempo, equipos y recursos para anunciar a Cristo con amor y verdad.",
    essentialTakeaways: [
      "La misión requiere administración intencional.",
      "El Espíritu Santo fortalece el testimonio.",
      "La iglesia local es base de envío y servicio.",
      "La fidelidad misionera honra el señorío de Cristo.",
    ],
    q1: {
      question: "¿Qué promete Hechos 1:8 para la misión?",
      correct: "Poder del Espíritu para ser testigos",
      wrongA: "Misión sin dependencia de Dios",
      wrongB: "Testimonio solo interno",
      explanation: "La misión cristiana se realiza en el poder del Espíritu Santo.",
    },
    q2: {
      question: "¿Cómo se aplica la mayordomía a la misión local?",
      correct: "Organizando recursos para evangelizar y discipular",
      wrongA: "Improvisar sin propósito",
      wrongB: "Reducir la misión a eventos aislados",
      explanation: "La misión sostenida requiere fidelidad y administración sabia.",
    },
  },
  {
    lessonNumber: 10,
    title: "Evaluación y pacto de fidelidad",
    subtitle: "Perseverar en mayordomía madura",
    summary: "La mayordomía intermedia culmina con evaluación espiritual y compromiso renovado.",
    passageRef: "1 Corintios 4:2",
    passage:
      "Lo que se requiere de los administradores es que sean hallados fieles. El creyente revisa su caminar, se arrepiente donde sea necesario y renueva su pacto de obediencia al Señor.",
    essentialTakeaways: [
      "La fidelidad es criterio central de la mayordomía.",
      "La evaluación espiritual favorece crecimiento real.",
      "El arrepentimiento restaura la obediencia.",
      "La perseverancia confirma madurez en Cristo.",
    ],
    q1: {
      question: "¿Qué pide 1 Corintios 4:2 a los administradores?",
      correct: "Ser hallados fieles",
      wrongA: "Solo resultados visibles",
      wrongB: "Éxito sin santidad",
      explanation: "Dios valora la fidelidad constante de sus siervos.",
    },
    q2: {
      question: "¿Qué implica cerrar un curso intermedio de mayordomía?",
      correct: "Evaluar, corregir y renovar compromiso con Dios",
      wrongA: "Dar por terminada la formación",
      wrongB: "Confiar solo en experiencia pasada",
      explanation: "La madurez cristiana siempre llama a perseverar y crecer.",
    },
  },
];

function toLesson(seed: StewardshipIntermediateLessonSeed): Lesson {
  const id = `mayordomia-intermedia-leccion-${String(seed.lessonNumber).padStart(2, "0")}`;

  return {
    id,
    courseName: "Mayordomía intermedia",
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
            text: "La mayordomía madura no necesita disciplina espiritual.",
            isCorrect: false,
          },
          {
            id: `${id}-q3o3`,
            text: "La fidelidad cristiana solo aplica a algunas áreas de la vida.",
            isCorrect: false,
          },
        ],
        explanation: "La mayordomía intermedia integra doctrina, carácter y misión en fidelidad.",
      },
    ],
  };
}

export const stewardshipIntermediateLessons: Lesson[] = seeds.map(toLesson);

export function getStewardshipIntermediateLessonById(lessonId: string): Lesson | undefined {
  return stewardshipIntermediateLessons.find((lesson) => lesson.id === lessonId);
}
