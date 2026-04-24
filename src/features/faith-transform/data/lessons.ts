import type { Lesson } from "@/features/lessons/types";

type FaithLessonSeed = {
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
  "¿Qué verdad de esta lección fortaleció más tu fe en Cristo?",
  "¿Qué paso concreto aplicarás esta semana para vivir por fe?",
  "¿Qué área de tu vida necesitas rendir a Dios con mayor confianza?",
];

const seeds: FaithLessonSeed[] = [
  {
    lessonNumber: 1,
    title: "¿Qué es la fe cristiana?",
    subtitle: "Certeza y confianza en Dios",
    summary: "La fe bíblica confía en las promesas de Dios y descansa en su fidelidad.",
    passageRef: "Hebreos 11:1",
    passage:
      "La fe no es optimismo vacío ni emoción pasajera. Es certeza de lo que se espera y convicción de lo que no se ve, porque Dios ha hablado y cumple su Palabra.",
    essentialTakeaways: [
      "La fe se apoya en Dios, no en sentimientos cambiantes.",
      "La fe bíblica mira a las promesas del Señor con confianza.",
      "Creer es responder a la Palabra revelada por Dios.",
      "La fe verdadera produce obediencia y perseverancia.",
    ],
    q1: {
      question: "¿Qué describe mejor la fe según Hebreos 11:1?",
      correct: "Certeza de lo que se espera y convicción de lo que no se ve",
      wrongA: "Una emoción religiosa momentánea",
      wrongB: "Un pensamiento positivo sin fundamento",
      explanation: "La fe cristiana tiene base en la promesa y el carácter de Dios (Hebreos 11:1).",
    },
    q2: {
      question: "¿Dónde descansa la fe del creyente?",
      correct: "En la fidelidad de Dios y su Palabra",
      wrongA: "En su propio esfuerzo personal",
      wrongB: "En opiniones de la cultura",
      explanation: "La fe madura se fundamenta en quien es Dios y en lo que Él ha dicho.",
    },
  },
  {
    lessonNumber: 2,
    title: "La fe viene por el oír",
    subtitle: "Palabra y nacimiento de la fe",
    summary: "Dios despierta y alimenta la fe por medio de su Palabra anunciada.",
    passageRef: "Romanos 10:17",
    passage:
      "La fe no nace de la autosugestión, sino del evangelio. Cuando la Palabra de Cristo es anunciada, el Espíritu Santo obra en el corazón para creer, arrepentirse y seguir al Señor.",
    essentialTakeaways: [
      "La fe nace del mensaje de Cristo, no de invención humana.",
      "Predicación y Escritura son medios de gracia para creer.",
      "Escuchar la Palabra con humildad fortalece la fe.",
      "Una iglesia fiel proclama el evangelio con claridad.",
    ],
    q1: {
      question: "¿De dónde viene la fe, según Romanos 10:17?",
      correct: "Del oír la Palabra de Cristo",
      wrongA: "De repetir frases motivacionales",
      wrongB: "De la tradición sin Biblia",
      explanation: "La Escritura enseña que la fe viene por el oír la Palabra de Cristo.",
    },
    q2: {
      question: "¿Qué actitud fortalece la fe?",
      correct: "Escuchar y obedecer la Palabra de Dios",
      wrongA: "Evitar la enseñanza bíblica",
      wrongB: "Depender solo de emociones",
      explanation: "El discipulado cristiano crece donde hay escucha obediente de la Escritura.",
    },
  },
  {
    lessonNumber: 3,
    title: "Fe y arrepentimiento",
    subtitle: "Conversión integral a Cristo",
    summary: "La fe salvadora camina junto al arrepentimiento verdadero.",
    passageRef: "Marcos 1:15",
    passage:
      "Jesús llama a arrepentirse y creer el evangelio. No existe fe viva sin giro del corazón: dejamos el pecado y abrazamos a Cristo como Salvador y Señor.",
    essentialTakeaways: [
      "Arrepentimiento y fe son inseparables en la conversión.",
      "La gracia no justifica el pecado; transforma la vida.",
      "Creer en Cristo implica rendirle el corazón y la voluntad.",
      "La fe auténtica siempre produce fruto de cambio.",
    ],
    q1: {
      question: "¿Qué llamado hace Jesús en Marcos 1:15?",
      correct: "Arrepentirse y creer el evangelio",
      wrongA: "Solo mejorar moralmente",
      wrongB: "Solo asistir a reuniones",
      explanation: "El evangelio exige una respuesta completa: arrepentimiento y fe.",
    },
    q2: {
      question: "¿Qué muestra una fe genuina?",
      correct: "Cambio de vida y obediencia al Señor",
      wrongA: "Conocimiento sin transformación",
      wrongB: "Práctica externa sin corazón",
      explanation: "La fe viva produce fruto visible de conversión.",
    },
  },
  {
    lessonNumber: 4,
    title: "Justificados por la fe",
    subtitle: "Paz con Dios por Cristo",
    summary: "Somos declarados justos por gracia mediante la fe en Jesucristo.",
    passageRef: "Romanos 5:1",
    passage:
      "La justificación no se compra con obras. Dios declara justo al pecador que cree en Cristo. Por eso tenemos paz con Dios y seguridad en su gracia.",
    essentialTakeaways: [
      "La justificación es por gracia, no por méritos humanos.",
      "La fe recibe lo que Cristo ya logró en la cruz.",
      "El creyente vive con paz y no con condenación.",
      "La seguridad descansa en la obra de Jesús.",
    ],
    q1: {
      question: "¿Cómo somos justificados delante de Dios?",
      correct: "Por fe en Jesucristo",
      wrongA: "Por obras religiosas",
      wrongB: "Por comparación con otros",
      explanation: "Romanos 5:1 afirma que somos justificados por la fe y tenemos paz con Dios.",
    },
    q2: {
      question: "¿Qué resultado trae la justificación?",
      correct: "Paz con Dios por medio de Cristo",
      wrongA: "Orgullo espiritual",
      wrongB: "Independencia de Dios",
      explanation: "La obra de Cristo reconcilia al creyente con Dios de forma real y estable.",
    },
  },
  {
    lessonNumber: 5,
    title: "Vivir por fe cada día",
    subtitle: "Dependencia continua del Señor",
    summary: "La fe no es solo inicio: es estilo de vida del discípulo.",
    passageRef: "Gálatas 2:20",
    passage:
      "El creyente vive unido a Cristo. Ya no se guía por autosuficiencia, sino por fe en el Hijo de Dios que le amó y se entregó por él.",
    essentialTakeaways: [
      "La fe diaria reemplaza la autosuficiencia.",
      "Cristo es centro y fuerza de la vida cristiana.",
      "Vivir por fe implica obediencia constante.",
      "La comunión con Jesús sostiene cada decisión.",
    ],
    q1: {
      question: "¿Qué significa vivir por fe?",
      correct: "Depender de Cristo en toda la vida",
      wrongA: "Confiar solo cuando hay crisis",
      wrongB: "Separar fe de lo cotidiano",
      explanation: "Gálatas 2:20 enseña una vida diaria sostenida por fe en Cristo.",
    },
    q2: {
      question: "¿Cuál es el centro del vivir cristiano?",
      correct: "Jesús, quien nos amó y se entregó por nosotros",
      wrongA: "El éxito personal",
      wrongB: "La aprobación humana",
      explanation: "La fe madura gira alrededor de la persona y obra de Cristo.",
    },
  },
  {
    lessonNumber: 6,
    title: "Fe probada en la aflicción",
    subtitle: "Esperanza en medio de la prueba",
    summary: "Las pruebas purifican la fe y forman perseverancia cristiana.",
    passageRef: "1 Pedro 1:6-7",
    passage:
      "La prueba no niega el amor de Dios; lo confirma en nuestro crecimiento. El Señor usa el dolor para purificar la fe como oro refinado y formar carácter santo.",
    essentialTakeaways: [
      "La prueba puede fortalecer, no destruir, la fe.",
      "Dios obra aun en tiempos de sufrimiento.",
      "La perseverancia es fruto de confianza real.",
      "La esperanza cristiana mira la gloria futura.",
    ],
    q1: {
      question: "¿Qué produce la prueba en la fe?",
      correct: "Purificación y perseverancia",
      wrongA: "Abandono inevitable de Dios",
      wrongB: "Inutilidad espiritual",
      explanation: "1 Pedro enseña que la prueba refina la fe como oro precioso.",
    },
    q2: {
      question: "¿Cómo responde el creyente en aflicción?",
      correct: "Con esperanza y confianza en Dios",
      wrongA: "Con desesperación definitiva",
      wrongB: "Con indiferencia espiritual",
      explanation: "La fe madura aprende a esperar en el Señor aun en la angustia.",
    },
  },
  {
    lessonNumber: 7,
    title: "Fe y obediencia",
    subtitle: "Creer que se traduce en acción",
    summary: "La fe verdadera se expresa en obediencia concreta al Señor.",
    passageRef: "Santiago 2:17",
    passage:
      "La fe no es teoría. Si creemos en Cristo, esa fe se ve en decisiones, servicio, santidad y amor práctico al prójimo.",
    essentialTakeaways: [
      "Fe sin obras está muerta.",
      "Las obras no salvan, pero muestran fe auténtica.",
      "Obedecer al Señor honra el evangelio.",
      "La fe activa sirve al prójimo con amor.",
    ],
    q1: {
      question: "¿Qué enseña Santiago sobre la fe sin obras?",
      correct: "Que está muerta",
      wrongA: "Que es suficiente por sí sola",
      wrongB: "Que no importa para Dios",
      explanation: "Santiago 2:17 muestra que la fe viva siempre produce fruto visible.",
    },
    q2: {
      question: "¿Cuál es la relación correcta entre fe y obras?",
      correct: "Las obras evidencian una fe genuina",
      wrongA: "Las obras reemplazan la fe",
      wrongB: "No existe relación entre ambas",
      explanation: "Obediencia y servicio son señales de una fe transformada por la gracia.",
    },
  },
  {
    lessonNumber: 8,
    title: "Fe y oración perseverante",
    subtitle: "Pedir confiando en Dios",
    summary: "La fe persevera en oración confiando en la voluntad y tiempos de Dios.",
    passageRef: "Marcos 11:24",
    passage:
      "Jesús llama a orar creyendo. La fe no manipula a Dios; descansa en su bondad y sigue orando con humildad, incluso cuando la respuesta tarda.",
    essentialTakeaways: [
      "Orar con fe es confiar en Dios, no controlarlo.",
      "La perseverancia en oración fortalece el corazón.",
      "La voluntad de Dios orienta nuestras peticiones.",
      "La espera también es parte de la formación espiritual.",
    ],
    q1: {
      question: "¿Qué actitud enseña Jesús al orar?",
      correct: "Orar creyendo y confiando en Dios",
      wrongA: "Orar sin expectativa",
      wrongB: "Orar para imponer nuestra voluntad",
      explanation: "Marcos 11:24 llama a confiar en Dios al presentar nuestras peticiones.",
    },
    q2: {
      question: "¿Qué muestra la perseverancia en oración?",
      correct: "Fe madura y dependencia del Señor",
      wrongA: "Falta de esperanza",
      wrongB: "Autosuficiencia espiritual",
      explanation: "Persistir en oración revela confianza en el carácter de Dios.",
    },
  },
  {
    lessonNumber: 9,
    title: "Fe en la providencia de Dios",
    subtitle: "Confiar en su cuidado soberano",
    summary: "Dios gobierna con sabiduría y cuida a sus hijos en toda circunstancia.",
    passageRef: "Mateo 6:33",
    passage:
      "La fe descansa en la providencia del Padre. Él conoce nuestras necesidades y nos llama a buscar primero su reino, confiando en su cuidado fiel.",
    essentialTakeaways: [
      "Dios reina y cuida cada detalle de nuestra vida.",
      "La ansiedad cede cuando confiamos en su providencia.",
      "Buscar primero el reino ordena nuestras prioridades.",
      "La fe aprende contentamiento en toda etapa.",
    ],
    q1: {
      question: "¿Qué prioridad enseña Jesús en Mateo 6:33?",
      correct: "Buscar primero el reino de Dios",
      wrongA: "Buscar primero la seguridad material",
      wrongB: "Buscar primero la aprobación social",
      explanation: "Jesús orienta la fe hacia el reino y la justicia de Dios.",
    },
    q2: {
      question: "¿Qué produce confiar en la providencia de Dios?",
      correct: "Paz y dependencia en su cuidado",
      wrongA: "Indiferencia moral",
      wrongB: "Pasividad sin obediencia",
      explanation: "La confianza bíblica trae paz y compromiso responsable.",
    },
  },
  {
    lessonNumber: 10,
    title: "Fe y comunidad de la iglesia",
    subtitle: "Creer juntos como cuerpo de Cristo",
    summary: "La fe crece en la comunión, enseñanza y cuidado mutuo de la iglesia.",
    passageRef: "Hechos 2:42",
    passage:
      "Dios no nos llamó a creer aislados. La fe se fortalece en la comunidad: Palabra, oración, sacramentos y compañerismo santo.",
    essentialTakeaways: [
      "La fe cristiana es personal, pero no individualista.",
      "La iglesia local es espacio de crecimiento y cuidado.",
      "La comunión protege de enfriamiento espiritual.",
      "Servir y ser pastoreados fortalece la fe.",
    ],
    q1: {
      question: "¿Dónde crece normalmente la fe del creyente?",
      correct: "En la comunión fiel de la iglesia",
      wrongA: "En aislamiento permanente",
      wrongB: "Solo en recursos digitales",
      explanation: "Hechos 2:42 muestra una fe alimentada por vida comunitaria.",
    },
    q2: {
      question: "¿Qué práctica fortalece la fe comunitaria?",
      correct: "Perseverar en enseñanza, oración y comunión",
      wrongA: "Evitar compromiso con la iglesia local",
      wrongB: "Reducir la fe a lo privado",
      explanation: "La vida eclesial sostiene al creyente en madurez y misión.",
    },
  },
  {
    lessonNumber: 11,
    title: "Fe y santa perseverancia",
    subtitle: "Sostenerse hasta el final",
    summary: "Dios preserva a su pueblo y llama a perseverar con fidelidad.",
    passageRef: "Filipenses 1:6",
    passage:
      "Nuestra esperanza no está en fuerza humana. El Dios que comenzó la buena obra en nosotros la perfeccionará hasta el día de Jesucristo.",
    essentialTakeaways: [
      "La perseverancia final depende de la gracia de Dios.",
      "El creyente está llamado a velar y permanecer fiel.",
      "La seguridad cristiana produce santidad, no descuido.",
      "La esperanza mira la obra completa de Cristo.",
    ],
    q1: {
      question: "¿Quién completa la obra de salvación en el creyente?",
      correct: "Dios, que inició la buena obra",
      wrongA: "Solo la disciplina personal",
      wrongB: "El ambiente religioso",
      explanation: "Filipenses 1:6 afirma la fidelidad de Dios hasta el fin.",
    },
    q2: {
      question: "¿Qué produce la seguridad en Dios?",
      correct: "Perseverancia y vida santa",
      wrongA: "Descuido espiritual",
      wrongB: "Orgullo carnal",
      explanation: "La gracia que guarda también impulsa obediencia fiel.",
    },
  },
  {
    lessonNumber: 12,
    title: "Fe y misión",
    subtitle: "Creer para testificar",
    summary: "La fe en Cristo impulsa a anunciar el evangelio con humildad y valor.",
    passageRef: "Mateo 28:19-20",
    passage:
      "Quien cree en Cristo no guarda el evangelio para sí. La fe misionera comparte la buena noticia, hace discípulos y sirve al mundo con amor.",
    essentialTakeaways: [
      "La fe verdadera tiene vocación misionera.",
      "Evangelizar es obediencia al mandato de Cristo.",
      "Testificamos con palabra y con vida coherente.",
      "La misión se vive en dependencia del Espíritu.",
    ],
    q1: {
      question: "¿Qué impulsa la fe cristiana hacia la misión?",
      correct: "El mandato y amor de Cristo",
      wrongA: "El deseo de reconocimiento",
      wrongB: "La presión social",
      explanation: "Jesús envía a su iglesia a hacer discípulos en todas las naciones.",
    },
    q2: {
      question: "¿Cómo debe testificar el creyente?",
      correct: "Con verdad, humildad y coherencia de vida",
      wrongA: "Con imposición agresiva",
      wrongB: "Sin compromiso práctico",
      explanation: "El testimonio cristiano une evangelio proclamado y vida transformada.",
    },
  },
  {
    lessonNumber: 13,
    title: "Fe y mayordomía cristiana",
    subtitle: "Administrar dones para la gloria de Dios",
    summary: "La fe administra tiempo, recursos y dones como respuesta agradecida al Señor.",
    passageRef: "1 Pedro 4:10",
    passage:
      "Todo lo recibido viene de Dios. La fe madura entiende la mayordomía como servicio: administrar con fidelidad para bendecir a otros y glorificar al Señor.",
    essentialTakeaways: [
      "Somos administradores, no dueños absolutos.",
      "Los dones se usan para edificar a la iglesia.",
      "La generosidad expresa confianza en Dios.",
      "La mayordomía fiel honra al evangelio.",
    ],
    q1: {
      question: "¿Qué enseña la mayordomía cristiana?",
      correct: "Administrar fielmente lo que Dios nos dio",
      wrongA: "Guardar todo para interés propio",
      wrongB: "Servir solo cuando conviene",
      explanation: "1 Pedro 4:10 llama a servir con los dones recibidos.",
    },
    q2: {
      question: "¿Qué revela una mayordomía fiel?",
      correct: "Gratitud y confianza en Dios",
      wrongA: "Avaricia espiritual",
      wrongB: "Indiferencia ante los demás",
      explanation: "La fe práctica usa recursos para amar a Dios y al prójimo.",
    },
  },
  {
    lessonNumber: 14,
    title: "Fe y discernimiento espiritual",
    subtitle: "Probar todo a la luz de la Palabra",
    summary: "La fe madura discierne doctrina y prácticas según la verdad bíblica.",
    passageRef: "1 Juan 4:1",
    passage:
      "No todo mensaje espiritual viene de Dios. El creyente debe examinar enseñanzas y motivaciones conforme a la Escritura, permaneciendo firme en el evangelio.",
    essentialTakeaways: [
      "Discernir protege la iglesia de error doctrinal.",
      "La Biblia es criterio final de verdad.",
      "La fe madura examina con humildad y firmeza.",
      "Permanecer en Cristo guarda del engaño.",
    ],
    q1: {
      question: "¿Qué manda 1 Juan 4:1 al creyente?",
      correct: "Probar los espíritus y discernir la verdad",
      wrongA: "Aceptar todo sin evaluar",
      wrongB: "Rechazar toda enseñanza",
      explanation: "La fe bíblica examina doctrinas según la revelación de Dios.",
    },
    q2: {
      question: "¿Cuál es el criterio principal para discernir?",
      correct: "La Palabra de Dios",
      wrongA: "La opinión popular",
      wrongB: "La intuición personal solamente",
      explanation: "La Escritura es norma suficiente para doctrina y vida cristiana.",
    },
  },
  {
    lessonNumber: 15,
    title: "Fe y esperanza futura",
    subtitle: "Esperar la venida del Señor",
    summary: "La fe mira al futuro glorioso en Cristo y vive con esperanza activa.",
    passageRef: "1 Pedro 1:3",
    passage:
      "Por la resurrección de Jesús tenemos viva esperanza. Esta certeza futura transforma el presente: perseveramos, servimos y sufrimos con mirada eterna.",
    essentialTakeaways: [
      "La esperanza cristiana está viva por la resurrección.",
      "Mirar la gloria futura fortalece la fidelidad presente.",
      "La fe soporta pruebas con perspectiva eterna.",
      "Esperar a Cristo produce santidad y misión.",
    ],
    q1: {
      question: "¿En qué se basa la esperanza cristiana?",
      correct: "En la resurrección de Jesucristo",
      wrongA: "En circunstancias favorables",
      wrongB: "En mérito humano",
      explanation: "1 Pedro 1:3 vincula nuestra esperanza viva con Cristo resucitado.",
    },
    q2: {
      question: "¿Qué produce una esperanza viva?",
      correct: "Perseverancia y santidad en el presente",
      wrongA: "Desinterés por la vida diaria",
      wrongB: "Pasividad espiritual",
      explanation: "La esperanza bíblica nos impulsa a vivir fielmente hoy.",
    },
  },
  {
    lessonNumber: 16,
    title: "Fe que transforma la vida",
    subtitle: "Integración final del discipulado",
    summary: "La fe madura integra doctrina, carácter y misión para la gloria de Dios.",
    passageRef: "2 Corintios 5:17",
    passage:
      "En Cristo somos nueva creación. La fe que comenzó en gracia continúa transformando mente, afectos, decisiones y servicio. El evangelio no solo informa, también reforma toda la vida.",
    essentialTakeaways: [
      "La fe auténtica transforma identidad y conducta.",
      "En Cristo comienza una vida nueva y perseverante.",
      "Doctrina sana y práctica diaria deben caminar juntas.",
      "Toda transformación apunta a la gloria de Dios.",
    ],
    q1: {
      question: "¿Qué afirma 2 Corintios 5:17 sobre el creyente?",
      correct: "Que en Cristo es nueva creación",
      wrongA: "Que no necesita cambiar",
      wrongB: "Que solo cambia por fuera",
      explanation: "La unión con Cristo produce una vida realmente nueva.",
    },
    q2: {
      question: "¿Cómo se evidencia una fe transformadora?",
      correct: "En carácter, obediencia y servicio continuo",
      wrongA: "Solo en conocimiento teórico",
      wrongB: "Solo en actividades públicas",
      explanation: "La fe madura integra corazón, mente y acción para Dios.",
    },
  },
];

function toLesson(seed: FaithLessonSeed): Lesson {
  const id = `fe-leccion-${String(seed.lessonNumber).padStart(2, "0")}`;

  return {
    id,
    courseName: "Fe que transforma",
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
          { id: `${id}-q3o2`, text: "La fe depende solo de emociones momentáneas.", isCorrect: false },
          { id: `${id}-q3o3`, text: "La fe no impacta la vida cotidiana del creyente.", isCorrect: false },
        ],
        explanation:
          "El corazón de esta lección afirma una fe bíblica, viva y transformadora en Cristo.",
      },
    ],
  };
}

export const faithTransformLessons: Lesson[] = seeds.map(toLesson);

export function getFaithTransformLessonById(lessonId: string): Lesson | undefined {
  return faithTransformLessons.find((lesson) => lesson.id === lessonId);
}
