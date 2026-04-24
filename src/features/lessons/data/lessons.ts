import type { Lesson } from "../types";

type LessonSeed = {
  title: string;
  subtitle: string;
  summary: string;
  essentialTakeaways: string[];
  passage: string;
  question?: string;
  options?: [string, string, string];
  correct?: number;
  explanation?: string;
  questions?: Array<{
    question: string;
    options: [string, string, string];
    correct: number;
    explanation: string;
  }>;
};

const defaultReflectionPrompts: [string, string, string] = [
  "¿Qué te enseñó esta lección para tu vida personal?",
  "¿Qué cambio práctico vas a aplicar esta semana?",
  "¿Cómo explicarías esta lección a otra persona?",
];

const seeds: LessonSeed[] = [
  {
    title: "Cómo llegar a ser cristiano",
    subtitle: "Arrepentimiento y fe en Jesucristo",
    summary: "Fundamento de la vida cristiana y la respuesta personal al evangelio.",
    essentialTakeaways: [
      "El cristianismo verdadero se apoya en Jesucristo, no solo en creer ideas sueltas.",
      "La respuesta bíblica incluye arrepentimiento, fe personal y entrega al Señor.",
      "La fe auténtica transforma el corazón; no basta una creencia solo intelectual.",
      "El fundamento único de la iglesia y de la vida cristiana es Cristo (1 Corintios 3:11).",
    ],
    passage:
      "El cristianismo verdadero no es solo creer ideas. Su fundamento es Jesucristo y la respuesta del corazón es arrepentimiento, fe y entrega al Señor.",
    questions: [
      {
        question: "Según Santiago 2:19, ¿qué demuestra que solo creer no es suficiente?",
        options: [
          "Que la fe verdadera no existe",
          "Que los demonios también creen y tiemblan",
          "Que no es necesario conocer la Biblia",
        ],
        correct: 1,
        explanation:
          "Santiago 2:19 enseña que una creencia solo intelectual no transforma el corazón.",
      },
      {
        question: "¿Cuál es el fundamento del cristianismo según 1 Corintios 3:11?",
        options: ["Las tradiciones culturales", "La moral humana", "Jesucristo"],
        correct: 2,
        explanation:
          "1 Corintios 3:11 afirma que nadie puede poner otro fundamento fuera de Jesucristo.",
      },
      {
        question: "¿Qué describe mejor a un cristiano verdadero en la lección?",
        options: [
          "Asistir a la iglesia solo en celebraciones",
          "Arrepentirse, creer y entregarse a Cristo",
          "Vivir moralmente sin relacion con Cristo",
        ],
        correct: 1,
        explanation:
          "Marcos 1:15 resume esta respuesta: arrepentimiento y fe, con entrega real a Cristo.",
      },
    ],
  },
  {
    title: "Cómo llegar a ser cristiano 2",
    subtitle: "El evangelio: cinco puntos esenciales",
    summary:
      "Profundiza en la respuesta al evangelio con los elementos esenciales de una conversión genuina.",
    essentialTakeaways: [
      "Ser cristiano implica reconocer el pecado, arrepentirse, creer en Cristo y vivir bajo su señorío.",
      "El evangelio es llamada a respuesta real del corazón y de la vida, no solo información.",
      "La salvación es por gracia de Dios, no por méritos propios (Efesios 2:8-9).",
      "Quien cree de verdad confiesa a Jesús como Salvador y Señor (Romanos 10:9).",
    ],
    passage:
      "Llegar a ser cristiano implica reconocer el pecado, arrepentirse, creer en Jesucristo, recibir su perdón y vivir bajo su señorío. El evangelio no es solo información, es una llamada a una respuesta real del corazón y de la vida.",
    questions: [
      {
        question:
          "¿Qué describe mejor una conversión cristiana verdadera según la lección?",
        options: [
          "Solo emocionarse en una reunión",
          "Arrepentirse y confiar en Jesucristo como Salvador y Señor",
          "Cambiar de religión sin cambiar el corazón",
        ],
        correct: 1,
        explanation:
          "Hechos 20:21 resume la conversión bíblica: arrepentimiento para con Dios y fe en Jesucristo.",
      },
      {
        question: "¿Cuál de estos puntos es esencial dentro del evangelio?",
        options: [
          "La autosuperación como base de salvación",
          "Que Dios salva por gracia mediante Cristo",
          "Que las obras personales compran el perdón",
        ],
        correct: 1,
        explanation:
          "Efesios 2:8-9 enseña que la salvación es por gracia, no por méritos humanos.",
      },
      {
        question: "Si alguien dice creer, pero rechaza obedecer a Jesús, ¿qué falta?",
        options: [
          "Comprensión de que Jesús también es Señor",
          "Capacidad intelectual",
          "Asistir a más actividades sociales",
        ],
        correct: 0,
        explanation:
          "Romanos 10:9 muestra que la fe auténtica confiesa a Jesús como Señor.",
      },
    ],
  },
  {
    title: "Cómo poder estar seguro de que eres cristiano",
    subtitle: "Seguridad de salvación en Cristo",
    summary:
      "Fundamentos bíblicos para vivir con certeza, humildad y paz en la salvación.",
    essentialTakeaways: [
      "La seguridad cristiana descansa en la obra consumada de Cristo en la cruz.",
      "La Palabra de Dios y el testimonio del Espíritu nos dan certeza más estable que los sentimientos.",
      "La certeza no es orgullo: es confiar en lo que Dios ha prometido.",
      "La Santa Cena reafirma el perdón y la promesa de Cristo de modo visible.",
    ],
    passage:
      "La Biblia enseña que sí podemos tener seguridad de salvación. Esta certeza no nace del orgullo ni de los sentimientos cambiantes, sino de tres fundamentos: la obra completa de Cristo en la cruz, la promesa firme de la Palabra de Dios y el testimonio del Espíritu Santo. La Santa Cena también reafirma visiblemente la promesa del perdón en Cristo.",
    questions: [
      {
        question:
          "Según la lección, ¿cuál es el primer fundamento de la seguridad cristiana?",
        options: [
          "La intensidad de nuestros sentimientos",
          "La obra completa de Jesucristo en la cruz",
          "Nuestros méritos personales",
        ],
        correct: 1,
        explanation:
          "Juan 19:30 y Hebreos 10:12 muestran que su obra fue perfecta, suficiente y consumada.",
      },
      {
        question: "¿Por qué no debemos basar nuestra seguridad en sentimientos?",
        options: [
          "Porque los sentimientos cambian y son inestables",
          "Porque sentir alegría es pecado",
          "Porque la Biblia prohíbe toda emoción",
        ],
        correct: 0,
        explanation:
          "1 Juan 5:13 enseña que la certeza descansa en la Palabra de Dios, no en emociones cambiantes.",
      },
      {
        question: "¿Qué recuerda y reafirma la Santa Cena al creyente?",
        options: [
          "Que la salvación depende de asistir a todos los cultos",
          "Que Cristo murió por nosotros y su perdón sigue vigente",
          "Que solo algunos pueden recibir gracia",
        ],
        correct: 1,
        explanation:
          "1 Corintios 11:24-25 enseña que el pan y el vino recuerdan y confirman su obra redentora.",
      },
    ],
  },
  {
    title: "Cómo crecer en la vida cristiana",
    subtitle: "Justificación y santificación",
    summary:
      "Comprende la diferencia entre ser aceptado por Dios y crecer en madurez cristiana.",
    essentialTakeaways: [
      "La justificación es el acto instantáneo en que Dios declara justo al que cree en Cristo.",
      "La santificación es el proceso gradual en que el Espíritu forma el carácter cristiano.",
      "Nacer de nuevo es un momento; madurar lleva tiempo y perseverancia.",
      "El crecimiento incluye fe, amor, conocimiento de la Palabra y obediencia al Señor.",
    ],
    passage:
      "La justificación es el acto por el cual Dios declara justo al pecador que confía en Cristo; es instantánea. La santificación, en cambio, es un proceso gradual por el cual el Espíritu Santo forma el carácter cristiano. El crecimiento real incluye avanzar en fe, amor, conocimiento y obediencia perseverante al Señor.",
    questions: [
      {
        question: "¿Cuál es la diferencia correcta entre justificación y santificación?",
        options: [
          "La justificación es gradual y la santificación instantánea",
          "La justificación declara justo; la santificación transforma progresivamente",
          "Ambas dependen principalmente de los méritos personales",
        ],
        correct: 1,
        explanation:
          "Romanos 8:1 y 2 Corintios 3:18 muestran justificación inmediata y santificación progresiva.",
      },
      {
        question: "La imagen del nacimiento y crecimiento enseña que:",
        options: [
          "Nacer de nuevo y madurar ocurren al mismo ritmo",
          "Nacer de nuevo es instantáneo, pero crecer toma tiempo",
          "No es necesario crecer después de convertirse",
        ],
        correct: 1,
        explanation:
          "Juan 3:3-8 muestra el nuevo nacimiento; luego el crecimiento espiritual es progresivo.",
      },
      {
        question: "¿Cuál de estas áreas forma parte del crecimiento cristiano maduro?",
        options: [
          "Fe, amor y conocimiento bíblico",
          "Solo emociones religiosas intensas",
          "Aislarse de la iglesia y evitar el servicio",
        ],
        correct: 0,
        explanation:
          "2 Pedro 3:18 llama a crecer en gracia y conocimiento, junto con vida obediente.",
      },
    ],
  },
  {
    title: "Creencia en Dios",
    subtitle: "Credos, Trinidad y razones para creer",
    summary:
      "Fundamentos de la fe cristiana en Dios: confesión histórica, revelación trinitaria y razones para creer.",
    essentialTakeaways: [
      "La iglesia confiesa a un solo Dios en tres personas: Padre, Hijo y Espíritu Santo.",
      "Los credos resumen y enseñan la fe apostólica sin sustituir la Biblia.",
      "La Trinidad expresa la experiencia bíblica de Dios en la historia de la salvación.",
      "Creer tiene fundamento en la revelación de Dios y en señales como la creación y Cristo.",
    ],
    passage:
      "La fe cristiana confiesa a Dios como Padre, Hijo y Espíritu Santo. Los credos resumen esta enseñanza apostólica y ayudan a instruir a la iglesia. La Trinidad no es un invento tardío, sino una formulación de la experiencia bíblica: Dios se revela en la historia de la salvación. También existen razones para creer: la realidad del universo, la profundidad moral y espiritual de la naturaleza humana, y sobre todo la revelación de Dios en Jesucristo.",
    questions: [
      {
        question: "¿Para qué sirven los credos cristianos en la iglesia?",
        options: [
          "Para reemplazar completamente la Biblia",
          "Para resumir y enseñar la fe apostólica",
          "Para imponer tradiciones sin fundamento",
        ],
        correct: 1,
        explanation:
          "La fe apostólica resumida en credos se apoya en la enseñanza bíblica (2 Timoteo 1:13).",
      },
      {
        question: "¿Qué afirma la doctrina de la Trinidad?",
        options: [
          "Que existen tres dioses separados",
          "Que Dios es uno, y se revela como Padre, Hijo y Espíritu Santo",
          "Que Jesús y el Espíritu son solo símbolos",
        ],
        correct: 1,
        explanation:
          "Mateo 28:19 expresa unidad y distinción personal: Padre, Hijo y Espíritu Santo.",
      },
      {
        question: "Según la lección, ¿qué combinación expresa mejor una base para creer en Dios?",
        options: [
          "Solo sentimientos cambiantes",
          "Revelación de Dios y razones como el universo y la naturaleza humana",
          "Miedo religioso y costumbres familiares",
        ],
        correct: 1,
        explanation:
          "Hechos 17:24-28 y Romanos 1:20 muestran señales de Dios en creación y humanidad.",
      },
    ],
  },
  {
    title: "Dios el Padre",
    subtitle: "Creador, Todopoderoso y Padre",
    summary:
      "Descubre el significado cristiano de llamar a Dios Creador, Todopoderoso y Padre.",
    essentialTakeaways: [
      "Dios el Padre es Creador: todo procede de Él y la creación es obra suya.",
      "Todopoderoso implica que sostiene y gobierna activamente el mundo.",
      "La paternidad redentora se recibe al creer en Cristo (Juan 1:12).",
      "Como criaturas e hijos, vivimos en dependencia, confianza y obediencia.",
    ],
    passage:
      "El Credo de los Apóstoles presenta a Dios como Padre Todopoderoso, Creador del cielo y de la tierra. La Biblia afirma que todo proviene de Él, que sostiene activamente su creación y que su paternidad personal se recibe por la fe en Jesucristo. Como criaturas e hijos, la respuesta correcta es dependencia, confianza y obediencia.",
    questions: [
      {
        question: "¿Qué verdad subraya la lección al decir que Dios es Creador?",
        options: [
          "Que Dios solo ordenó materia preexistente",
          "Que todo procede de Dios y la creación es obra suya",
          "Que la Biblia pretende ser un manual científico",
        ],
        correct: 1,
        explanation:
          "La lección afirma que Dios creó todo; Génesis 1:1 enseña el origen divino de la creación.",
      },
      {
        question: "¿Qué implica que Dios sea Todopoderoso según esta lección?",
        options: [
          "Que creó el mundo y luego lo abandonó",
          "Que sostiene, gobierna y cuida activamente su creación",
          "Que solo actúa en lo espiritual, no en lo cotidiano",
        ],
        correct: 1,
        explanation:
          "Todopoderoso aquí destaca su gobierno continuo sobre todo lo creado (Hebreos 1:3).",
      },
      {
        question: "Según Juan 1:12 citado en la lección, ¿quiénes llegan a ser hijos de Dios?",
        options: [
          "Todos automáticamente, sin respuesta personal",
          "Los que reciben a Cristo y creen en su nombre",
          "Solo quienes cumplen ritos externos",
        ],
        correct: 1,
        explanation:
          "Juan 1:12 enseña que la paternidad redentora se recibe al creer en Cristo.",
      },
    ],
  },
  {
    title: "Dios el Hijo: Jesucristo",
    subtitle: "Verdadero Dios y verdadero hombre",
    summary:
      "La persona y obra de Cristo: su encarnación, su cruz y su salvación para nosotros.",
    essentialTakeaways: [
      "Jesús es verdadero Dios y verdadero hombre en una sola persona.",
      "La cruz es el centro de la fe: Cristo murió por nuestros pecados y por nuestra salvación.",
      "Su muerte reconcilia de manera definitiva a los pecadores con Dios.",
      "El Credo resume su encarnación, pasión y señorío como Hijo único de Dios.",
    ],
    passage:
      "El Credo presenta a Jesucristo como Hijo único de Dios y Señor nuestro: verdadero hombre por su nacimiento de María y verdadero Dios por su naturaleza eterna. Su muerte en la cruz ocupa el centro de la fe cristiana, porque fue por nosotros y por nuestra salvación. Cristo llevó nuestros pecados para reconciliarnos con Dios de una vez y para siempre.",
    questions: [
      {
        question: "¿Qué afirma la fe cristiana sobre la persona de Jesús?",
        options: [
          "Que fue solo un maestro moral sin naturaleza divina",
          "Que es verdadero Dios y verdadero hombre en una sola persona",
          "Que fue un espíritu sin cuerpo humano real",
        ],
        correct: 1,
        explanation:
          "Juan 1:14 y Filipenses 2:6-8 sostienen la unión verdadera de su divinidad y humanidad.",
      },
      {
        question: "¿Por qué la cruz tiene un lugar central en el cristianismo?",
        options: [
          "Porque recuerda únicamente un ejemplo de valentía",
          "Porque Cristo murió por nuestros pecados y por nuestra salvación",
          "Porque fue un accidente histórico sin significado espiritual",
        ],
        correct: 1,
        explanation:
          "1 Pedro 3:18 enseña que Cristo sufrió por nuestros pecados, el justo por los injustos.",
      },
      {
        question: "¿Qué significa que Cristo “llevó nuestros pecados”?",
        options: [
          "Que ignoró el pecado humano",
          "Que soportó el juicio merecido para llevarnos a Dios",
          "Que solo compartió nuestro dolor emocional",
        ],
        correct: 1,
        explanation:
          "Llevar pecado implica cargar su consecuencia para reconciliarnos con Dios (1 Pedro 2:24).",
      },
    ],
  },
  {
    title: "Dios el Espíritu Santo",
    subtitle: "Persona divina y obra en el creyente",
    summary:
      "Conoce la personalidad del Espíritu Santo y su obra en conversión, santidad, entendimiento y comunión cristiana.",
    essentialTakeaways: [
      "El Espíritu Santo es persona divina, no una fuerza impersonal.",
      "Convence de pecado, da nueva vida, sella al creyente y da testimonio interior.",
      "Produce santidad, ilumina la Escritura y fortalece la comunión de la iglesia.",
      "Desde Pentecostés une y edifica al pueblo de Dios.",
    ],
    passage:
      "El Espíritu Santo no es una fuerza impersonal, sino una persona divina: piensa, se entristece y actúa según su voluntad. Él obra en la conversión, convence de pecado, da nueva vida, sella al creyente y da testimonio interior. También produce santidad, ilumina la Escritura y forma la comunión de la Iglesia.",
    questions: [
      {
        question: "¿Cómo muestra la lección que el Espíritu Santo es una persona?",
        options: [
          "Porque tiene mente, sentimientos y voluntad",
          "Porque tiene cuerpo humano visible",
          "Porque actúa solo como símbolo",
        ],
        correct: 0,
        explanation:
          "Romanos 8:27 y Efesios 4:30 muestran mente y afectos personales del Espíritu Santo.",
      },
      {
        question: "¿Qué papel cumple el Espíritu Santo en la conversión cristiana?",
        options: [
          "Solo acompaña, pero no interviene",
          "Convence de pecado, revela a Cristo y da nueva vida",
          "Obliga sin respuesta personal de fe",
        ],
        correct: 1,
        explanation:
          "Juan 16:8 y Juan 3:5-8 muestran que la conversión y el nuevo nacimiento son obra del Espíritu.",
      },
      {
        question: "¿Qué relación presenta la lección entre Espíritu Santo e Iglesia?",
        options: [
          "La Iglesia existe independientemente del Espíritu",
          "El Espíritu Santo crea, une y fortalece la comunión de la Iglesia",
          "El Espíritu solo actúa en individuos aislados",
        ],
        correct: 1,
        explanation:
          "Hechos 2 muestra que desde Pentecostés el Espíritu forma y une a la Iglesia.",
      },
    ],
  },
  {
    title: "Santidad de vida (1)",
    subtitle: "Los diez mandamientos y el amor",
    summary:
      "La santidad cristiana nace de la obra de Dios en nosotros y se expresa en una vida guiada por el amor a Dios y al prójimo.",
    essentialTakeaways: [
      "Padre, Hijo y Espíritu obran para llamarnos a una vida santa.",
      "Los diez mandamientos orientan al ya salvo; no son escalera para merecer gracia.",
      "Jesús resume la ley en amar a Dios con todo el ser y al prójimo como a uno mismo.",
      "Ese amor implica entrega, obediencia y buscar el bien de los demás.",
    ],
    passage:
      "La Biblia enseña que la vida cristiana es una vida santa: el Padre nos escogió para santidad, el Hijo nos redimió para vivir en obediencia y el Espíritu Santo nos santifica. Los diez mandamientos siguen siendo una guía para la conducta del creyente, no para ganar salvación, sino para vivir agradando a Dios. Jesús resumió toda la ley en el amor: amar a Dios con todo el ser y amar al prójimo como a uno mismo. Este amor no es sentimentalismo, sino entrega, obediencia y búsqueda del bien de los demás.",
    questions: [
      {
        question:
          "Según la lección, ¿para qué sirven los diez mandamientos en la vida cristiana?",
        options: [
          "Para ganar la salvación por méritos",
          "Para orientar una vida santa después de haber sido salvados",
          "Para reemplazar la gracia de Cristo",
        ],
        correct: 1,
        explanation:
          "Efesios 2:8-10: no somos salvos por obras, pero sí llamados a una vida de obediencia.",
      },
      {
        question: "¿Cómo resume Jesús la enseñanza de la ley?",
        options: [
          "Con ritos externos solamente",
          "Con normas culturales cambiantes",
          "Amar a Dios plenamente y al prójimo como a uno mismo",
        ],
        correct: 2,
        explanation:
          "Jesús lo resume en Mateo 22:37-40: amor a Dios y amor al prójimo.",
      },
      {
        question:
          "¿Qué enseña el primer mandamiento ('No tendrás dioses ajenos delante de mí')?",
        options: [
          "Que Dios debe ocupar el primer lugar en toda la vida",
          "Que todas las lealtades son iguales",
          "Que la adoración depende solo de emociones",
        ],
        correct: 0,
        explanation:
          "Éxodo 20:3 y Deuteronomio 6:5 llaman a adoración exclusiva y lealtad total al Señor.",
      },
    ],
  },
  {
    title: "Santidad de vida (2)",
    subtitle: "Nuestro deber para con los demás",
    summary:
      "La santidad también se demuestra en el trato al prójimo: amor práctico, verdad, pureza, contentamiento y obediencia sostenida por la gracia de Dios.",
    essentialTakeaways: [
      "La regla de oro: trata a los demás como quieres que te traten a ti.",
      "Los mandamientos del segundo bloque protegen la vida, el matrimonio, la propiedad y la verdad.",
      "Dios examina corazón e intenciones, no solo actos externos.",
      "Crecemos en santidad por fe, medios de gracia y disciplina espiritual.",
    ],
    passage:
      "La regla de oro resume nuestro deber con los demás: tratar al prójimo como queremos ser tratados. Los mandamientos del 6 al 10 muestran ofensas contra el amor: matar (también con ira y palabras crueles), adulterar, hurtar, mentir y codiciar. Dios mira no solo actos externos, sino pensamientos e intenciones del corazón. El camino de la santidad no se logra por fuerza humana, sino por fe en la gracia de Dios y disciplina espiritual: oración, Biblia, Santa Cena, culto, comunión, memoria y obediencia práctica.",
    questions: [
      {
        question: "¿Qué enseña la lección sobre el mandamiento 'No matarás'?",
        options: [
          "Solo prohíbe el acto físico de quitar la vida",
          "Incluye también ira, odio y palabras que dañan al prójimo",
          "Aplica únicamente a autoridades civiles",
        ],
        correct: 1,
        explanation:
          "Siguiendo Mateo 5:21-22, Dios examina también las intenciones del corazón.",
      },
      {
        question: "¿Cuál es la virtud cristiana contraria a la codicia?",
        options: ["El contentamiento en Dios", "La ambición sin límites", "La comparación constante"],
        correct: 0,
        explanation:
          "Hebreos 13:5 enseña contentamiento y confianza en la provisión fiel de Dios.",
      },
      {
        question: "Según la lección, ¿cómo crece el creyente en santidad?",
        options: [
          "Solo con esfuerzo personal",
          "Por fe y usando con disciplina los medios de gracia",
          "Evitando toda comunidad cristiana",
        ],
        correct: 1,
        explanation:
          "Gálatas 5:16 y Efesios 5:18 muestran que la santidad madura al depender del Espíritu.",
      },
    ],
  },
  {
    title: "Lectura de la Biblia",
    subtitle: "Disciplina diaria para crecer en Cristo",
    summary:
      "El crecimiento cristiano requiere tiempos devocionales constantes donde Dios nos habla por su Palabra y nosotros respondemos en oración.",
    essentialTakeaways: [
      "La Biblia es Palabra de Dios y principal medio por el que se revela a su pueblo.",
      "Leemos con reverencia buscando encuentro con el Señor, no solo datos.",
      "Un buen hábito incluye orar, atender el contexto y aplicar lo leído.",
      "El fin es obedecer y crecer en comunión con Dios.",
    ],
    passage:
      "La Biblia es Palabra de Dios y medio principal de revelación para su pueblo. Dios tomó la iniciativa de darse a conocer y lo hizo progresivamente, culminando en Cristo y en el testimonio apostólico. Por eso leemos la Escritura con reverencia, buscando encuentro con el Señor, no solo información. Para leer bien debemos hacerlo con método: orar, pensar, atender el contexto y aplicar personalmente lo aprendido. El objetivo no es solo comprender, sino obedecer y crecer en comunión con Dios.",
    questions: [
      {
        question: "¿Por qué la lección afirma que debemos leer la Biblia constantemente?",
        options: [
          "Porque reemplaza toda responsabilidad personal",
          "Porque es el medio por el cual Dios se revela y forma nuestra vida",
          "Porque solo sirve para debates religiosos",
        ],
        correct: 1,
        explanation:
          "2 Timoteo 3:16 enseña que la Escritura es inspirada por Dios y forma la vida del creyente.",
      },
      {
        question: "¿Qué actitud correcta propone la lección al leer la Biblia?",
        options: [
          "Lectura rápida sin reflexión",
          "Lectura en oración, con reverencia y humildad",
          "Elegir versículos aislados sin contexto",
        ],
        correct: 1,
        explanation:
          "Salmo 119:18 y Lucas 24:27 orientan a leer con oración para conocer a Cristo.",
      },
      {
        question: "¿Qué principio de interpretación resalta la lección?",
        options: [
          "Todo texto debe leerse en su contexto y según su género",
          "Cada verso se interpreta de forma independiente",
          "Solo importa la opinión personal del lector",
        ],
        correct: 0,
        explanation:
          "2 Pedro 1:20 y 2 Timoteo 3:16 orientan a interpretar la Escritura en su contexto.",
      },
    ],
  },
  {
    title: "La oración",
    subtitle: "Respuesta a la Palabra de Dios",
    summary:
      "La oración cristiana es una conversación viva con Dios que responde a su Palabra y abarca adoración, confesión, intercesión, gratitud y súplica.",
    essentialTakeaways: [
      "Dios habla primero en la Escritura; nosotros respondemos en oración.",
      "La oración equilibrada incluye adoración, confesión, intercesión, gracias y petición.",
      "Orar desde el pasaje leído convierte la devoción en diálogo real con el Padre.",
      "La constancia en oración profundiza comunión y obediencia.",
    ],
    passage:
      "Dios nos habla primero por la Escritura y nosotros respondemos en oración. Por eso, la oración se fortalece cuando nace del pasaje bíblico leído y se vuelve diálogo real con el Padre. La vida devocional equilibrada incluye cinco formas de oración: adoración (centrarnos en quién es Dios), confesión (arrepentirnos con sinceridad), intercesión (orar por otros), acción de gracias (recordar sus beneficios) y petición (presentar nuestras necesidades). Este camino nos forma en humildad, comunión y obediencia continua.",
    questions: [
      {
        question: "Según la lección, ¿qué relación hay entre Biblia y oración?",
        options: [
          "Son prácticas separadas sin conexión",
          "Dios habla por su Palabra y respondemos en oración",
          "La oración reemplaza la lectura bíblica",
        ],
        correct: 1,
        explanation:
          "La oración bíblica responde a lo que Dios habla primero por su Palabra (Juan 15:7).",
      },
      {
        question: "¿Cuál de estas opciones pertenece a los tipos de oración presentados?",
        options: ["Adoración, confesión e intercesión", "Solo peticiones materiales", "Repetición automática sin reflexión"],
        correct: 0,
        explanation:
          "Filipenses 4:6 y Mateo 6:9-13 reflejan adoración, gratitud, súplica e intercesión.",
      },
      {
        question: "¿Qué produce una práctica constante de oración según la lección?",
        options: [
          "Dependencia de emociones momentáneas",
          "Comunión más profunda con Dios y crecimiento espiritual",
          "Independencia total de la voluntad de Dios",
        ],
        correct: 1,
        explanation:
          "1 Tesalonicenses 5:17 y Lucas 22:42 muestran oración constante y voluntad rendida a Dios.",
      },
    ],
  },
  {
    title: "El compañerismo y la Santa Cena",
    subtitle: "Conmemoración, participación y comunión",
    summary:
      "La vida cristiana madura en comunión con otros creyentes, y la Santa Cena ocupa un lugar central como memoria de Cristo, participación por fe y señal de unidad.",
    essentialTakeaways: [
      "Crecer en Cristo va unido a participar con gozo en la vida de la iglesia.",
      "La Santa Cena conmemora la muerte de Cristo según su mandato.",
      "El pan y el vino nos dirigen por fe al sacrificio perfecto de la cruz.",
      "En la mesa del Señor expresamos unidad y amor entre hermanos.",
    ],
    passage:
      "El segundo gran secreto del progreso cristiano es la participación regular y gozosa en la comunión de la Iglesia. La Santa Cena, instituida por Jesús, conmemora su muerte y nos llama a participar por fe en sus beneficios. El pan y el vino son signos visibles que nos dirigen al sacrificio perfecto de Cristo en la cruz. En la mesa del Señor también se expresa la unidad del pueblo de Dios: todos se acercan como hermanos, sin distinciones, en amor mutuo y gratitud.",
    questions: [
      {
        question: "¿Cuál es el significado principal de la Santa Cena según la lección?",
        options: [
          "Conmemorar la muerte de Cristo en la cruz",
          "Recordar solo una tradición histórica",
          "Demostrar superioridad espiritual",
        ],
        correct: 0,
        explanation:
          "1 Corintios 11:24-25 recoge el mandato de Jesús: 'Haced esto en memoria de mí'.",
      },
      {
        question: "¿Cómo participa el creyente de los beneficios de Cristo en la Cena del Señor?",
        options: [
          "Solo por el acto externo de comer y beber",
          "Por fe, recibiendo espiritualmente lo que los signos representan",
          "Por méritos personales acumulados",
        ],
        correct: 1,
        explanation:
          "1 Corintios 10:16 enseña participación real por fe en los beneficios de Cristo.",
      },
      {
        question: "¿Qué expresa la comunión cristiana en la mesa del Señor?",
        options: [
          "Separación entre grupos dentro de la iglesia",
          "Unidad y amor mutuo entre creyentes",
          "Un acto privado sin relación con la iglesia",
        ],
        correct: 1,
        explanation:
          "1 Corintios 10:17 enseña que al participar del pan somos un solo cuerpo en Cristo.",
      },
    ],
  },
  {
    title: "El servir a Cristo (2)",
    subtitle: "Formas de compromiso cristiano",
    summary:
      "Todo creyente está llamado a participar activamente en la misión de Cristo con oración, testimonio, servicio en la iglesia, generosidad y compromiso social.",
    essentialTakeaways: [
      "Cada miembro del cuerpo de Cristo sirve con los dones que Dios le da.",
      "La misión no es solo del pastor: todos anuncian y apoyan la obra del evangelio.",
      "Palabra y vida deben coincidir para que el testimonio sea creíble.",
      "El amor cristiano se ve en oración, iglesia, ofrenda y servicio concreto a la comunidad.",
    ],
    passage:
      "La lección presenta seis formas prácticas de servir a Cristo: orar por las personas, dar ejemplo con una vida coherente, compartir testimonio personal con humildad, trabajar activamente en la iglesia, ofrendar con alegría y participar en el servicio comunitario. La evangelización no depende solo del pastor, sino de cada miembro del cuerpo de Cristo. El amor cristiano debe hacerse visible en acciones concretas que honren al Señor y acerquen a otros al evangelio.",
    questions: [
      {
        question: "¿Qué enseña la lección sobre quién debe participar en la obra de la Iglesia?",
        options: [
          "Solo los pastores y líderes principales",
          "Cada creyente, usando sus dones para servir",
          "Solo quienes tienen muchos estudios bíblicos",
        ],
        correct: 1,
        explanation:
          "1 Corintios 12 enseña que cada miembro del cuerpo de Cristo tiene una función de servicio.",
      },
      {
        question: "¿Qué relación establece la lección entre testimonio verbal y ejemplo de vida?",
        options: [
          "Lo importante es hablar, aunque la vida no acompañe",
          "Las obras no importan si hay buena doctrina",
          "El testimonio es más creíble cuando palabras y conducta concuerdan",
        ],
        correct: 2,
        explanation:
          "Mateo 5:16 enseña que las obras deben respaldar el testimonio de los labios.",
      },
      {
        question: "¿Cuál de estas opciones aparece como forma concreta de compromiso cristiano?",
        options: [
          "Aislarse de las necesidades de la comunidad",
          "Servir en la iglesia y también en la sociedad con amor cristiano",
          "Delegar toda misión al Estado y no participar",
        ],
        correct: 1,
        explanation:
          "Gálatas 6:10 llama a hacer bien a todos, empezando por la familia de la fe.",
      },
    ],
  },
  {
    title: "El servir a Cristo (3)",
    subtitle: "Compromiso final y misión diaria",
    summary:
      "El discípulo confirma su fe sirviendo con perseverancia: ora, vive con coherencia, comparte a Cristo y se compromete con la iglesia y la comunidad.",
    essentialTakeaways: [
      "Servir a Cristo es estilo de vida, no un acto aislado de vez en cuando.",
      "Incluye interceder, testimonio humilde, evangelio y servicio en la iglesia local.",
      "El amor práctico en la sociedad prolonga la misión de Jesús.",
      "Todo creyente es enviado para que otros conozcan su gracia y salvación.",
    ],
    passage:
      "Como cierre del curso, la lección llama a un compromiso cristiano integral. Servir a Cristo no es una actividad ocasional, sino una forma de vida: interceder por otros, mantener un testimonio coherente, anunciar el evangelio con humildad, colaborar activamente en la iglesia local y expresar amor práctico en la sociedad. Cada creyente es enviado como testigo de Jesucristo para que otros conozcan su gracia y su salvación.",
    questions: [
      {
        question: "¿Qué enfoque presenta la lección sobre el servicio cristiano?",
        options: [
          "Un esfuerzo ocasional solo en eventos especiales",
          "Un estilo de vida constante de misión y amor",
          "Una tarea exclusiva de quienes predican públicamente",
        ],
        correct: 1,
        explanation:
          "Romanos 12:1 llama a una entrega continua y total al servicio de Cristo.",
      },
      {
        question: "¿Cuál es una actitud clave para el evangelismo personal según la lección?",
        options: [
          "Paciencia, oración y testimonio humilde",
          "Presión y discusión agresiva",
          "Esperar sin involucrarse",
        ],
        correct: 0,
        explanation:
          "El testimonio efectivo combina oración, amor y palabra sabia al compartir el evangelio (Colosenses 4:5-6).",
      },
      {
        question: "¿Qué afirma la lección sobre la misión de la iglesia?",
        options: [
          "La misión se limita al templo",
          "La misión incluye iglesia local y servicio a la comunidad",
          "La misión depende únicamente de recursos económicos",
        ],
        correct: 1,
        explanation:
          "Mateo 28:19-20 y Hechos 1:8 muestran misión integral: iglesia local y alcance al mundo.",
      },
    ],
  },
];

function toLesson(seed: LessonSeed, index: number): Lesson {
  const lessonNumber = index + 1;
  const lessonId = `leccion-${String(lessonNumber).padStart(2, "0")}`;
  return {
    id: lessonId,
    courseName: "Básico",
    lessonNumber,
    title: seed.title,
    subtitle: seed.subtitle,
    summary: seed.summary,
    essentialTakeaways: seed.essentialTakeaways,
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    pointsReward: 20,
    passage: seed.passage,
    reflectionPrompts: defaultReflectionPrompts,
    questions: (seed.questions && seed.questions.length > 0
      ? seed.questions
      : [
          {
            question: seed.question ?? "Pregunta de revisión",
            options: seed.options ?? ["Opción A", "Opción B", "Opción C"],
            correct: seed.correct ?? 0,
            explanation: seed.explanation ?? "Revisa el contenido de la lección.",
          },
        ]
    ).map((questionItem, questionIndex) => ({
      id: `${lessonId}-q${questionIndex + 1}`,
      question: questionItem.question,
      options: questionItem.options.map((text, optionIndex) => ({
        id: `${lessonId}-q${questionIndex + 1}o${optionIndex + 1}`,
        text,
        isCorrect: optionIndex === questionItem.correct,
      })),
      explanation: questionItem.explanation,
    })),
  };
}

export const lessons: Lesson[] = seeds.map(toLesson);

export function getLessonById(lessonId: string): Lesson | undefined {
  return lessons.find((lesson) => lesson.id === lessonId);
}
