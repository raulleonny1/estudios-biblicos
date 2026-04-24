import type { Lesson } from "@/features/lessons/types";

export const effectivePrayerLessons: Lesson[] = [
  {
    id: "oracion-leccion-01",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 1,
    title: "¿Qué es la oración?",
    subtitle: "Comunión viva y sincera con Dios",
    summary:
      "La oración es comunión viva con Dios. No es repetición religiosa, sino relación personal con el Padre por medio de Cristo.",
    essentialTakeaways: [
      "La oración es relación viva con Dios, no un ritual vacío.",
      "Oramos como hijos que se acercan al Padre con confianza y sinceridad.",
      "Jesús enseña a buscar intimidad con Dios, no apariencia religiosa (Mateo 6:6).",
      "Fuimos reconciliados por Cristo para vivir una comunión real con Dios.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "La oración es comunión viva con Dios. No es repetición religiosa, sino relación personal con el Padre por medio de Cristo. Es un acto de gracia: oramos porque hemos sido reconciliados con Dios. Jesús enfatiza la intimidad y sinceridad, no la apariencia.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿Qué parte de esta lección cambió tu forma de ver la oración?",
      "¿Cómo vas a practicar la oración en intimidad esta semana?",
      "¿Qué obstáculo personal necesitas rendir a Dios para orar con más sinceridad?",
    ],
    questions: [
      {
        id: "oracion-leccion-01-q1",
        question: "¿Qué es la oración?",
        options: [
          {
            id: "oracion-leccion-01-q1o1",
            text: "Una repetición religiosa para cumplir una tradición",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-01-q1o2",
            text: "Comunicarnos con Dios como hijos con su Padre, con sinceridad",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-01-q1o3",
            text: "Una práctica reservada solo para líderes espirituales",
            isCorrect: false,
          },
        ],
        explanation:
          "La oración bíblica es comunión personal con Dios, con confianza filial y corazón sincero (Jeremías 29:12; Salmos 62:8).",
      },
      {
        id: "oracion-leccion-01-q2",
        question: "¿Dónde debemos orar según Jesús?",
        options: [
          {
            id: "oracion-leccion-01-q2o1",
            text: "Solo en lugares públicos para ser vistos",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-01-q2o2",
            text: "En intimidad, buscando a Dios de corazón",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-01-q2o3",
            text: "Únicamente cuando tengamos una necesidad urgente",
            isCorrect: false,
          },
        ],
        explanation:
          "Jesús llama a la oración en lo secreto y con un corazón genuino, porque Dios está cercano a quienes le invocan de verdad (Mateo 6:6; Salmos 145:18).",
      },
      {
        id: "oracion-leccion-01-q3",
        question: "¿Qué resume mejor el enfoque correcto de la oración en esta lección?",
        options: [
          {
            id: "oracion-leccion-01-q3o1",
            text: "La oración es relación, no ritual",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-01-q3o2",
            text: "Lo importante es repetir frases sin involucrar el corazón",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-01-q3o3",
            text: "Orar bien depende más de la apariencia que de la sinceridad",
            isCorrect: false,
          },
        ],
        explanation:
          "La oración cristiana nace de una relación real con Dios y de un corazón auténtico delante de Él.",
      },
    ],
  },
  {
    id: "oracion-leccion-02",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 2,
    title: "Dios escucha la oración",
    subtitle: "Confianza en su fidelidad y su voluntad",
    summary:
      "Dios escucha a sus hijos. La confianza en la oración no está en nuestras palabras, sino en su fidelidad.",
    essentialTakeaways: [
      "Dios oye la oración de sus hijos cuando se acercan a Él con fe.",
      "La seguridad al orar no depende de nuestra capacidad, sino de la fidelidad de Dios.",
      "Orar conforme a su voluntad significa alinear el corazón con su Palabra.",
      "Nuestra confianza está en quién es Dios, no en nosotros mismos.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "Dios escucha a sus hijos. La confianza en la oración no está en nuestras palabras, sino en su fidelidad. Orar conforme a su voluntad implica alinearnos a su Palabra.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿Qué cambia en tu oración al recordar que Dios sí te escucha?",
      "¿Cómo puedes alinear mejor tus peticiones con la voluntad de Dios?",
      "¿En qué área necesitas confiar más en la fidelidad de Dios al orar?",
    ],
    questions: [
      {
        id: "oracion-leccion-02-q1",
        question: "¿Dios escucha nuestras oraciones?",
        options: [
          {
            id: "oracion-leccion-02-q1o1",
            text: "Sí, cuando oramos conforme a su voluntad",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-02-q1o2",
            text: "Solo cuando usamos palabras perfectas",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-02-q1o3",
            text: "Solo a personas con mayor conocimiento bíblico",
            isCorrect: false,
          },
        ],
        explanation:
          "La Escritura enseña que Dios oye cuando pedimos conforme a su voluntad (1 Juan 5:14; Salmos 34:15).",
      },
      {
        id: "oracion-leccion-02-q2",
        question: "¿Qué nos da confianza al orar?",
        options: [
          {
            id: "oracion-leccion-02-q2o1",
            text: "Saber que Dios es fiel y atento",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-02-q2o2",
            text: "Hablar por más tiempo que otras personas",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-02-q2o3",
            text: "Depender de nuestras emociones del momento",
            isCorrect: false,
          },
        ],
        explanation:
          "Nos acercamos con confianza al trono de la gracia porque Dios es fiel y misericordioso (Hebreos 4:16).",
      },
      {
        id: "oracion-leccion-02-q3",
        question: "¿Qué significa orar conforme a la voluntad de Dios?",
        options: [
          {
            id: "oracion-leccion-02-q3o1",
            text: "Pedir solo lo que yo deseo sin considerar la Biblia",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-02-q3o2",
            text: "Alinear nuestras peticiones con su Palabra y propósito",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-02-q3o3",
            text: "Evitar pedir porque todo ya está decidido",
            isCorrect: false,
          },
        ],
        explanation:
          "Orar conforme a su voluntad es buscar lo que honra a Dios y está de acuerdo con su Palabra.",
      },
    ],
  },
  {
    id: "oracion-leccion-03",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 3,
    title: "Jesús, modelo de oración",
    subtitle: "Una vida dependiente del Padre",
    summary:
      "Jesús no solo enseñó a orar, sino que vivió en oración constante. Él es nuestro modelo perfecto.",
    essentialTakeaways: [
      "Jesús enseñó a sus discípulos a orar y los formó con su ejemplo.",
      "Su vida de oración muestra dependencia total del Padre.",
      "En Cristo aprendemos cómo acercarnos a Dios con confianza y reverencia.",
      "Seguir a Jesús implica cultivar una vida constante de oración.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "Jesús no solo enseñó a orar, sino que vivió en oración constante. Él es nuestro modelo perfecto.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿Qué aspecto de la oración de Jesús necesitas imitar más en tu vida?",
      "¿Cómo puedes crecer en dependencia del Padre durante esta semana?",
      "¿Qué hábito concreto vas a iniciar hoy para orar con constancia?",
    ],
    questions: [
      {
        id: "oracion-leccion-03-q1",
        question: "¿Quién nos enseñó a orar?",
        options: [
          {
            id: "oracion-leccion-03-q1o1",
            text: "Jesús",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-03-q1o2",
            text: "Solo la tradición religiosa",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-03-q1o3",
            text: "Nuestra experiencia personal sin guía bíblica",
            isCorrect: false,
          },
        ],
        explanation:
          "Los discípulos pidieron a Jesús: 'Señor, enséñanos a orar', reconociéndolo como maestro de oración (Lucas 11:1).",
      },
      {
        id: "oracion-leccion-03-q2",
        question: "¿Por qué es importante el ejemplo de Jesús en la oración?",
        options: [
          {
            id: "oracion-leccion-03-q2o1",
            text: "Porque nos muestra cómo relacionarnos con el Padre",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-03-q2o2",
            text: "Porque la oración solo fue importante para Él, no para nosotros",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-03-q2o3",
            text: "Porque reemplaza completamente la necesidad de orar hoy",
            isCorrect: false,
          },
        ],
        explanation:
          "La oración de Jesús revela comunión filial y dependencia del Padre, modelo para sus discípulos (Juan 17:1).",
      },
      {
        id: "oracion-leccion-03-q3",
        question: "¿Qué resume mejor esta lección?",
        options: [
          {
            id: "oracion-leccion-03-q3o1",
            text: "Jesús es el modelo de una vida dependiente de Dios en oración",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-03-q3o2",
            text: "Orar es opcional si ya conocemos la doctrina",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-03-q3o3",
            text: "La oración importa solo en momentos de crisis",
            isCorrect: false,
          },
        ],
        explanation:
          "La vida de Jesús enseña que la oración constante expresa dependencia real de Dios.",
      },
    ],
  },
  {
    id: "oracion-leccion-04",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 4,
    title: "El Padre Nuestro",
    subtitle: "Un modelo completo de oración",
    summary:
      "El Padre Nuestro es un modelo que incluye adoración, sumisión, provisión, perdón y protección.",
    essentialTakeaways: [
      "El Padre Nuestro nos enseña a comenzar reconociendo a Dios como Padre santo.",
      "La oración bíblica incluye adoración y rendición a la voluntad de Dios.",
      "También presenta necesidades diarias: provisión, perdón y protección espiritual.",
      "Orar bien es depender de Dios en todo, no solo presentar peticiones aisladas.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "El Padre Nuestro es un modelo que incluye adoración, sumisión, provisión, perdón y protección.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿Qué parte del Padre Nuestro necesitas practicar con más constancia?",
      "¿Cómo puedes incluir más adoración y rendición en tu oración diaria?",
      "¿En qué área específica necesitas depender hoy de la provisión y cuidado de Dios?",
    ],
    questions: [
      {
        id: "oracion-leccion-04-q1",
        question: "¿Cómo inicia esta oración?",
        options: [
          {
            id: "oracion-leccion-04-q1o1",
            text: "Reconociendo a Dios como Padre",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-04-q1o2",
            text: "Presentando primero una lista de necesidades",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-04-q1o3",
            text: "Enfocándose en el esfuerzo humano",
            isCorrect: false,
          },
        ],
        explanation:
          "Jesús enseña a comenzar diciendo 'Padre nuestro', afirmando relación y reverencia (Mateo 6:9).",
      },
      {
        id: "oracion-leccion-04-q2",
        question: "¿Qué incluye esta oración?",
        options: [
          {
            id: "oracion-leccion-04-q2o1",
            text: "Solo peticiones materiales",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-04-q2o2",
            text: "Necesidades físicas y espirituales",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-04-q2o3",
            text: "Únicamente temas de adoración",
            isCorrect: false,
          },
        ],
        explanation:
          "El Padre Nuestro abarca pan diario, perdón y libranza del mal, integrando toda la vida (Mateo 6:11-13).",
      },
      {
        id: "oracion-leccion-04-q3",
        question: "¿Qué resume mejor el sentido del Padre Nuestro?",
        options: [
          {
            id: "oracion-leccion-04-q3o1",
            text: "Orar es reconocer quién es Dios y depender de Él en todo",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-04-q3o2",
            text: "Lo principal es repetir palabras sin reflexión",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-04-q3o3",
            text: "La oración debe centrarse solo en nuestros deseos",
            isCorrect: false,
          },
        ],
        explanation:
          "Este modelo une adoración, sumisión y dependencia diaria del cuidado de Dios.",
      },
    ],
  },
  {
    id: "oracion-leccion-05",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 5,
    title: "Orar con fe",
    subtitle: "Confianza plena en Dios al orar",
    summary:
      "La fe es esencial. Orar sin fe es solo palabras; con fe es confianza en la respuesta de Dios.",
    essentialTakeaways: [
      "Sin fe no podemos agradar a Dios ni acercarnos correctamente a Él.",
      "La oración con fe no es fórmula, es confianza viva en el carácter de Dios.",
      "Orar con fe implica creer que Dios oye, responde y obra según su voluntad.",
      "La eficacia de la oración brota de una fe activa, no de la rutina religiosa.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "La fe es esencial. Orar sin fe es solo palabras; con fe es confianza en la respuesta de Dios.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿Qué área de tu vida necesita hoy una oración más llena de fe?",
      "¿Cómo puedes fortalecer tu confianza en Dios mientras esperas respuesta?",
      "¿Qué hábito de rutina debes cambiar para orar con una fe más viva?",
    ],
    questions: [
      {
        id: "oracion-leccion-05-q1",
        question: "¿Qué se necesita para agradar a Dios?",
        options: [
          {
            id: "oracion-leccion-05-q1o1",
            text: "Fe",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-05-q1o2",
            text: "Solo esfuerzo humano",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-05-q1o3",
            text: "Repetir muchas palabras",
            isCorrect: false,
          },
        ],
        explanation:
          "La Escritura declara que sin fe es imposible agradar a Dios (Hebreos 11:6).",
      },
      {
        id: "oracion-leccion-05-q2",
        question: "¿Qué significa tener fe al orar?",
        options: [
          {
            id: "oracion-leccion-05-q2o1",
            text: "Confiar en Dios plenamente",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-05-q2o2",
            text: "Depender de emociones cambiantes",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-05-q2o3",
            text: "Orar sin esperar respuesta",
            isCorrect: false,
          },
        ],
        explanation:
          "Jesús llama a orar creyendo que Dios responde conforme a su voluntad (Marcos 11:24).",
      },
      {
        id: "oracion-leccion-05-q3",
        question: "¿Cuál resume mejor esta lección?",
        options: [
          {
            id: "oracion-leccion-05-q3o1",
            text: "La oración eficaz nace de una fe viva",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-05-q3o2",
            text: "Lo importante es orar por costumbre sin involucrar el corazón",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-05-q3o3",
            text: "La fe no es necesaria si usamos buenas palabras",
            isCorrect: false,
          },
        ],
        explanation:
          "La fe verdadera transforma la manera de orar y nos lleva a depender del Señor.",
      },
    ],
  },
  {
    id: "oracion-leccion-06",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 6,
    title: "El Espíritu Santo en la oración",
    subtitle: "Guía, fortaleza e intercesión divina",
    summary:
      "El Espíritu Santo nos guía, fortalece e intercede por nosotros cuando oramos.",
    essentialTakeaways: [
      "No oramos solos: el Espíritu Santo participa activamente en nuestra oración.",
      "Él nos ayuda en nuestra debilidad y orienta el corazón hacia Dios.",
      "Su intercesión sostiene al creyente cuando faltan fuerzas o palabras.",
      "Depender del Espíritu transforma la oración en comunión más profunda con Dios.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "El Espíritu Santo nos guía, fortalece e intercede por nosotros.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿En qué momento reciente sentiste debilidad al orar y necesitaste la ayuda de Dios?",
      "¿Cómo puedes abrir más tu corazón a la guía del Espíritu Santo en tu oración diaria?",
      "¿Qué decisión concreta tomarás para depender más del Espíritu al orar?",
    ],
    questions: [
      {
        id: "oracion-leccion-06-q1",
        question: "¿Quién nos ayuda a orar?",
        options: [
          {
            id: "oracion-leccion-06-q1o1",
            text: "El Espíritu Santo",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-06-q1o2",
            text: "Solo nuestra disciplina personal",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-06-q1o3",
            text: "Únicamente otras personas",
            isCorrect: false,
          },
        ],
        explanation:
          "La Escritura enseña que el Espíritu nos ayuda en nuestra debilidad al orar (Romanos 8:26).",
      },
      {
        id: "oracion-leccion-06-q2",
        question: "¿Qué hace el Espíritu Santo en nuestra debilidad?",
        options: [
          {
            id: "oracion-leccion-06-q2o1",
            text: "Intercede por nosotros",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-06-q2o2",
            text: "Nos deja solos hasta que seamos fuertes",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-06-q2o3",
            text: "Reemplaza totalmente nuestra responsabilidad de orar",
            isCorrect: false,
          },
        ],
        explanation:
          "El Espíritu intercede y nos fortalece para perseverar en oración (Romanos 8:26; Efesios 6:18).",
      },
      {
        id: "oracion-leccion-06-q3",
        question: "¿Cuál es la idea central de esta lección?",
        options: [
          {
            id: "oracion-leccion-06-q3o1",
            text: "No oramos solos; Dios mismo obra en nuestra oración",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-06-q3o2",
            text: "La oración depende solo de nuestra capacidad humana",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-06-q3o3",
            text: "El Espíritu solo actúa fuera de la oración",
            isCorrect: false,
          },
        ],
        explanation:
          "La presencia del Espíritu en la oración confirma que Dios obra en nosotros y por nosotros.",
      },
    ],
  },
  {
    id: "oracion-leccion-07",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 7,
    title: "Obstáculos en la oración",
    subtitle: "Confesión y limpieza del corazón",
    summary:
      "El pecado, la falta de fe y el egoísmo afectan la oración y debilitan la comunión con Dios.",
    essentialTakeaways: [
      "El pecado no confesado interrumpe la comunión y afecta la vida de oración.",
      "Dios llama al arrepentimiento sincero para restaurar nuestra relación con Él.",
      "La falta de fe y el egoísmo también entorpecen una oración saludable.",
      "Un corazón limpio delante de Dios fortalece la comunión y la confianza al orar.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "El pecado, la falta de fe y el egoísmo afectan la oración.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿Hay algo específico que debas confesar hoy delante de Dios?",
      "¿Qué actitud egoísta necesitas rendir para orar con un corazón más limpio?",
      "¿Cómo puedes cultivar una práctica diaria de arrepentimiento y fe?",
    ],
    questions: [
      {
        id: "oracion-leccion-07-q1",
        question: "¿Qué impide la oración?",
        options: [
          {
            id: "oracion-leccion-07-q1o1",
            text: "El pecado no confesado",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-07-q1o2",
            text: "Orar en silencio",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-07-q1o3",
            text: "Pedir ayuda espiritual",
            isCorrect: false,
          },
        ],
        explanation:
          "El pecado guardado en el corazón dificulta la comunión con Dios (Salmo 66:18).",
      },
      {
        id: "oracion-leccion-07-q2",
        question: "¿Qué debemos hacer cuando reconocemos pecado?",
        options: [
          {
            id: "oracion-leccion-07-q2o1",
            text: "Arrepentirnos y confesarlo",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-07-q2o2",
            text: "Ignorarlo y seguir igual",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-07-q2o3",
            text: "Esperar a sentirnos mejores antes de volver a Dios",
            isCorrect: false,
          },
        ],
        explanation:
          "Dios promete perdón y limpieza cuando confesamos sinceramente nuestros pecados (1 Juan 1:9).",
      },
      {
        id: "oracion-leccion-07-q3",
        question: "¿Qué enseña esta lección sobre la comunión con Dios?",
        options: [
          {
            id: "oracion-leccion-07-q3o1",
            text: "La pureza del corazón afecta nuestra comunión con Dios",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-07-q3o2",
            text: "La vida interior no influye en la oración",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-07-q3o3",
            text: "Solo importan las palabras que pronunciamos",
            isCorrect: false,
          },
        ],
        explanation:
          "La oración madura requiere sinceridad, arrepentimiento y limpieza delante del Señor.",
      },
    ],
  },
  {
    id: "oracion-leccion-08",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 8,
    title: "Perseverar en la oración",
    subtitle: "Constancia confiada en el tiempo de Dios",
    summary:
      "Dios llama a la constancia. La respuesta puede tardar, pero Él actúa en su tiempo perfecto.",
    essentialTakeaways: [
      "Jesús enseña a orar siempre y no desmayar.",
      "La demora en la respuesta no significa ausencia de Dios.",
      "Perseverar fortalece la fe y madura el carácter espiritual.",
      "La constancia en oración expresa confianza real en el Señor.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "Dios llama a la constancia. La respuesta puede tardar, pero Él actúa.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿En qué petición has estado tentado a rendirte antes de tiempo?",
      "¿Qué te puede ayudar a perseverar con esperanza mientras esperas respuesta?",
      "¿Cómo puedes convertir la perseverancia en una práctica diaria de fe?",
    ],
    questions: [
      {
        id: "oracion-leccion-08-q1",
        question: "¿Debemos rendirnos al orar?",
        options: [
          {
            id: "oracion-leccion-08-q1o1",
            text: "No",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-08-q1o2",
            text: "Sí, si la respuesta tarda",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-08-q1o3",
            text: "Solo cuando no sentimos emoción",
            isCorrect: false,
          },
        ],
        explanation:
          "Jesús llama a orar siempre y no desmayar, aun en tiempos de espera (Lucas 18:1).",
      },
      {
        id: "oracion-leccion-08-q2",
        question: "¿Qué produce la perseverancia en oración?",
        options: [
          {
            id: "oracion-leccion-08-q2o1",
            text: "Confianza y crecimiento espiritual",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-08-q2o2",
            text: "Frustración inevitable",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-08-q2o3",
            text: "Dependencia de resultados inmediatos",
            isCorrect: false,
          },
        ],
        explanation:
          "La perseverancia fortalece la esperanza y la madurez espiritual (Romanos 12:12).",
      },
      {
        id: "oracion-leccion-08-q3",
        question: "¿Qué resume esta lección?",
        options: [
          {
            id: "oracion-leccion-08-q3o1",
            text: "Orar es persistir confiando en Dios",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-08-q3o2",
            text: "Orar solo tiene sentido si todo se responde rápido",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-08-q3o3",
            text: "La constancia no importa en la vida espiritual",
            isCorrect: false,
          },
        ],
        explanation:
          "Persistir en oración revela confianza en el carácter y en los tiempos de Dios.",
      },
    ],
  },
  {
    id: "oracion-leccion-09",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 9,
    title: "Oración comunitaria",
    subtitle: "Unidad y edificación en la iglesia",
    summary:
      "La oración en comunidad fortalece la fe, une a los creyentes y edifica a la iglesia.",
    essentialTakeaways: [
      "La oración no es solo personal: también se vive en comunidad.",
      "Dios promete su presencia cuando su pueblo se reúne en su nombre.",
      "La oración conjunta fortalece la fe y la unidad de la iglesia.",
      "Orar con otros creyentes impulsa perseverancia y edificación mutua.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "La oración en comunidad fortalece la fe y une a la iglesia.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿Qué beneficios has visto cuando oras junto a otros creyentes?",
      "¿Cómo puedes participar más activamente en la oración comunitaria de tu iglesia?",
      "¿Qué paso concreto darás esta semana para crecer en unidad por medio de la oración?",
    ],
    questions: [
      {
        id: "oracion-leccion-09-q1",
        question: "¿Qué ocurre cuando oramos juntos?",
        options: [
          {
            id: "oracion-leccion-09-q1o1",
            text: "Dios está presente",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-09-q1o2",
            text: "La oración pierde valor personal",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-09-q1o3",
            text: "Solo importa la cantidad de personas",
            isCorrect: false,
          },
        ],
        explanation:
          "Jesús promete su presencia cuando dos o tres se reúnen en su nombre (Mateo 18:20).",
      },
      {
        id: "oracion-leccion-09-q2",
        question: "¿Por qué es importante la oración comunitaria?",
        options: [
          {
            id: "oracion-leccion-09-q2o1",
            text: "Edifica la iglesia",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-09-q2o2",
            text: "Sustituye por completo la oración personal",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-09-q2o3",
            text: "Solo sirve para actividades especiales",
            isCorrect: false,
          },
        ],
        explanation:
          "La iglesia primitiva perseveraba unida en oración, fortaleciendo su vida común (Hechos 1:14).",
      },
      {
        id: "oracion-leccion-09-q3",
        question: "¿Qué resume esta lección?",
        options: [
          {
            id: "oracion-leccion-09-q3o1",
            text: "La oración también es comunitaria y fortalece la unidad",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-09-q3o2",
            text: "Orar con otros debilita la vida espiritual",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-09-q3o3",
            text: "La comunión de la iglesia no se relaciona con la oración",
            isCorrect: false,
          },
        ],
        explanation:
          "La oración comunitaria expresa unidad, fe compartida y edificación del cuerpo de Cristo.",
      },
    ],
  },
  {
    id: "oracion-leccion-10",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 10,
    title: "Una vida de oración",
    subtitle: "Comunión continua con Dios",
    summary:
      "La oración debe ser constante, no un acto aislado, sino una forma de vida del creyente.",
    essentialTakeaways: [
      "La vida cristiana madura se caracteriza por una oración constante.",
      "Orar sin cesar significa mantener comunión continua con Dios en toda circunstancia.",
      "La vigilancia espiritual y la gratitud sostienen una vida de oración.",
      "La oración diaria revela dependencia y amistad perseverante con el Señor.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "La oración debe ser constante, una forma de vida.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿Qué momento del día puedes consagrar mejor para vivir en oración constante?",
      "¿Cómo puedes integrar la oración en tus actividades cotidianas?",
      "¿Qué cambio concreto harás para reflejar una comunión continua con Dios?",
    ],
    questions: [
      {
        id: "oracion-leccion-10-q1",
        question: "¿Cómo debemos orar?",
        options: [
          {
            id: "oracion-leccion-10-q1o1",
            text: "Sin cesar",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-10-q1o2",
            text: "Solo en emergencias",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-10-q1o3",
            text: "Una vez por semana",
            isCorrect: false,
          },
        ],
        explanation:
          "La exhortación apostólica es a orar sin cesar, como hábito permanente (1 Tesalonicenses 5:17).",
      },
      {
        id: "oracion-leccion-10-q2",
        question: "¿Qué significa vivir una vida de oración?",
        options: [
          {
            id: "oracion-leccion-10-q2o1",
            text: "Vivir en comunión continua con Dios",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-10-q2o2",
            text: "Repetir frases sin atención",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-10-q2o3",
            text: "Separar totalmente la oración de la vida diaria",
            isCorrect: false,
          },
        ],
        explanation:
          "La oración constante incluye vigilancia y perseverancia en comunión con Dios (Colosenses 4:2).",
      },
      {
        id: "oracion-leccion-10-q3",
        question: "¿Cuál es la idea central de esta lección?",
        options: [
          {
            id: "oracion-leccion-10-q3o1",
            text: "La oración es el estilo de vida del creyente",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-10-q3o2",
            text: "La oración es secundaria en la vida cristiana",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-10-q3o3",
            text: "Solo se ora en reuniones formales",
            isCorrect: false,
          },
        ],
        explanation:
          "La comunión constante con Dios transforma toda la vida del discípulo.",
      },
    ],
  },
  {
    id: "oracion-leccion-11",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 11,
    title: "Oración litúrgica y oración personal",
    subtitle: "Una sola vida de oración en dos expresiones",
    summary:
      "La oración litúrgica de la iglesia y la oración personal del creyente se complementan y se fortalecen mutuamente.",
    essentialTakeaways: [
      "La oración común de la iglesia forma nuestra fe y nos enseña a orar con el cuerpo de Cristo.",
      "La oración personal cultiva intimidad, examen del corazón y dependencia diaria de Dios.",
      "En la espiritualidad reformada episcopal, Palabra, liturgia y oración personal caminan unidas.",
      "No son dos caminos rivales: ambas expresiones construyen una vida íntegra de comunión con Dios.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "La oración litúrgica de la iglesia y la oración personal del creyente se complementan y se fortalecen mutuamente. En la reunión comunitaria aprendemos el lenguaje de la fe, confesamos juntos, damos gracias y presentamos intercesiones. En lo secreto, ese mismo evangelio desciende al corazón y se vuelve diálogo personal con el Padre. Así, la vida de oración se vuelve completa: eclesial y personal, bíblica y constante.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿Qué has aprendido en la oración congregacional que puedes llevar a tu oración diaria?",
      "¿Cómo puedes equilibrar mejor oración personal y participación litúrgica en esta semana?",
      "¿Qué práctica concreta comenzarás para unir más tu vida de iglesia y tu vida devocional?",
    ],
    questions: [
      {
        id: "oracion-leccion-11-q1",
        question: "¿Cómo se relacionan la oración litúrgica y la oración personal?",
        options: [
          {
            id: "oracion-leccion-11-q1o1",
            text: "Se complementan y se fortalecen mutuamente",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-11-q1o2",
            text: "Solo una de ellas es necesaria",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-11-q1o3",
            text: "Deben mantenerse siempre separadas",
            isCorrect: false,
          },
        ],
        explanation:
          "La iglesia primitiva perseveraba en la oración comunitaria, y Jesús también enseñó la oración en lo secreto (Hechos 2:42; Mateo 6:6).",
      },
      {
        id: "oracion-leccion-11-q2",
        question: "¿Qué aporta especialmente la oración litúrgica de la iglesia?",
        options: [
          {
            id: "oracion-leccion-11-q2o1",
            text: "Nos forma en una fe común con confesión, gratitud e intercesión",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-11-q2o2",
            text: "Reemplaza totalmente la oración personal",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-11-q2o3",
            text: "Solo cumple una tradición sin valor espiritual",
            isCorrect: false,
          },
        ],
        explanation:
          "La oración de la iglesia edifica unidad y madurez en la verdad del evangelio (Efesios 4:15-16).",
      },
      {
        id: "oracion-leccion-11-q3",
        question: "¿Qué resume mejor esta lección?",
        options: [
          {
            id: "oracion-leccion-11-q3o1",
            text: "La vida de oración madura integra comunidad e intimidad con Dios",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-11-q3o2",
            text: "La oración auténtica solo sucede en privado",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-11-q3o3",
            text: "La oración común limita la fe personal",
            isCorrect: false,
          },
        ],
        explanation:
          "El creyente ora como discípulo individual y también como miembro del pueblo de Dios.",
      },
    ],
  },
  {
    id: "oracion-leccion-12",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 12,
    title: "Los Salmos como escuela de oración",
    subtitle: "Aprender a orar con la Palabra",
    summary:
      "Los Salmos enseñan a orar con profundidad bíblica: adoración, lamento, gratitud, arrepentimiento y confianza.",
    essentialTakeaways: [
      "Los Salmos nos dan vocabulario espiritual para toda temporada del alma.",
      "Orar con la Escritura protege de superficialidad y centra la oración en Dios.",
      "La oración bíblica incluye gozo, dolor, confesión, esperanza y alabanza.",
      "La iglesia reformada valora los Salmos como escuela permanente de piedad.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "Los Salmos son una escuela de oración para el pueblo de Dios. En ellos encontramos clamor en la angustia, confesión en el pecado, gratitud por la misericordia y alabanza por la fidelidad del Señor. Orar los Salmos nos enseña a hablar con Dios desde su propia Palabra, formando un corazón reverente, sincero y esperanzado. Así, nuestra oración se vuelve más bíblica, más profunda y más perseverante.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿Qué tipo de Salmo necesitas orar hoy: alabanza, lamento, gratitud o confesión?",
      "¿Cómo cambiaría tu oración diaria si partes de un Salmo antes de pedir?",
      "¿Qué práctica concreta adoptarás para orar con la Palabra cada semana?",
    ],
    questions: [
      {
        id: "oracion-leccion-12-q1",
        question: "¿Qué nos enseñan los Salmos sobre la oración?",
        options: [
          {
            id: "oracion-leccion-12-q1o1",
            text: "A expresar delante de Dios todo el corazón con lenguaje bíblico",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-12-q1o2",
            text: "A evitar emociones reales cuando oramos",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-12-q1o3",
            text: "A limitar la oración solo a peticiones materiales",
            isCorrect: false,
          },
        ],
        explanation:
          "Los Salmos muestran una oración completa: adoración, clamor, arrepentimiento y confianza (Salmo 62:8).",
      },
      {
        id: "oracion-leccion-12-q2",
        question: "¿Por qué es valioso orar con la Palabra?",
        options: [
          {
            id: "oracion-leccion-12-q2o1",
            text: "Porque alinea nuestras oraciones con la verdad de Dios",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-12-q2o2",
            text: "Porque elimina la necesidad de entender el corazón",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-12-q2o3",
            text: "Porque reemplaza toda oración espontánea",
            isCorrect: false,
          },
        ],
        explanation:
          "La Palabra habita en nosotros y guía nuestra comunión con Dios (Colosenses 3:16).",
      },
      {
        id: "oracion-leccion-12-q3",
        question: "¿Qué resume mejor esta lección?",
        options: [
          {
            id: "oracion-leccion-12-q3o1",
            text: "Los Salmos forman una escuela bíblica para aprender a orar",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-12-q3o2",
            text: "La oración madura no necesita Escritura",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-12-q3o3",
            text: "Solo debe orarse cuando hay alegría",
            isCorrect: false,
          },
        ],
        explanation:
          "Orar con los Salmos fortalece reverencia, sinceridad y esperanza en el Señor.",
      },
    ],
  },
  {
    id: "oracion-leccion-13",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 13,
    title: "Oración y sacramentos",
    subtitle: "Gracia visible y comunión viva",
    summary:
      "La vida de oración se nutre de la gracia de Dios recibida en la Palabra y fortalecida en los sacramentos.",
    essentialTakeaways: [
      "Bautismo y Santa Cena confirman visiblemente las promesas del evangelio.",
      "La oración responde a esa gracia con fe, gratitud y obediencia.",
      "Palabra, sacramentos y oración sostienen una espiritualidad cristiana equilibrada.",
      "Participar reverentemente en la mesa del Señor fortalece la comunión y la intercesión.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "Dios fortalece a su iglesia por medios de gracia: Palabra proclamada y sacramentos celebrados conforme al evangelio. La oración no está aislada de esta vida sacramental; al contrario, nace de la fe que escucha la promesa y responde con adoración, confesión e intercesión. En la Santa Cena recordamos, por fe, la obra de Cristo y renovamos nuestra dependencia del Señor. Así, la oración se vuelve más humilde, más agradecida y más eclesial.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿Cómo influye la Santa Cena en tu manera de orar durante la semana?",
      "¿Qué significa para ti responder en oración a las promesas recibidas en la Palabra?",
      "¿Qué paso darás para vivir una espiritualidad más integrada entre culto, sacramentos y oración?",
    ],
    questions: [
      {
        id: "oracion-leccion-13-q1",
        question: "¿Cómo se relacionan oración y sacramentos?",
        options: [
          {
            id: "oracion-leccion-13-q1o1",
            text: "Los sacramentos fortalecen la fe y la oración responde a esa gracia",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-13-q1o2",
            text: "No tienen relación entre sí",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-13-q1o3",
            text: "Los sacramentos reemplazan la oración",
            isCorrect: false,
          },
        ],
        explanation:
          "La comunión con Cristo en la Cena anima fe, gratitud y dependencia en oración (1 Corintios 10:16).",
      },
      {
        id: "oracion-leccion-13-q2",
        question: "¿Qué produce una vida que integra Palabra, sacramentos y oración?",
        options: [
          {
            id: "oracion-leccion-13-q2o1",
            text: "Madurez espiritual equilibrada y comunión más profunda",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-13-q2o2",
            text: "Dependencia exclusiva de emociones",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-13-q2o3",
            text: "Desinterés por la vida comunitaria de la iglesia",
            isCorrect: false,
          },
        ],
        explanation:
          "Dios edifica a su pueblo por sus medios de gracia, formando perseverancia y unidad.",
      },
      {
        id: "oracion-leccion-13-q3",
        question: "¿Qué resume mejor esta lección?",
        options: [
          {
            id: "oracion-leccion-13-q3o1",
            text: "La oración madura se nutre de la gracia recibida en la vida sacramental",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-13-q3o2",
            text: "La vida sacramental vuelve innecesaria la oración",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-13-q3o3",
            text: "Basta la disciplina personal sin iglesia",
            isCorrect: false,
          },
        ],
        explanation:
          "La espiritualidad cristiana crece donde se unen evangelio, mesa del Señor y oración fiel.",
      },
    ],
  },
  {
    id: "oracion-leccion-14",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 14,
    title: "Intercesión por la Iglesia y el mundo",
    subtitle: "Orar más allá de nosotros mismos",
    summary:
      "La intercesión cristiana presenta delante de Dios las necesidades de la iglesia, la sociedad y las naciones.",
    essentialTakeaways: [
      "Interceder es amar al prójimo delante de Dios con perseverancia y fe.",
      "La iglesia está llamada a orar por autoridades, enfermos, necesitados y misión.",
      "La oración ensancha el corazón y nos mueve al servicio práctico.",
      "La intercesión comunitaria expresa la vocación pública de la iglesia.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "La oración madura no se encierra en necesidades individuales. El Señor llama a su iglesia a interceder por todos: gobernantes, enfermos, familias, pobres, perseguidos y quienes aún no conocen el evangelio. Al interceder, participamos en la misión de Dios, cargamos las necesidades del prójimo y pedimos que su reino se manifieste con verdad, justicia y misericordia. Orar por el mundo forma una fe compasiva y comprometida.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿Por qué personas o causas necesitas interceder de manera más constante?",
      "¿Cómo puedes vincular tu intercesión con acciones concretas de servicio?",
      "¿Qué área de la misión de la iglesia vas a sostener en oración esta semana?",
    ],
    questions: [
      {
        id: "oracion-leccion-14-q1",
        question: "¿Qué caracteriza la intercesión cristiana?",
        options: [
          {
            id: "oracion-leccion-14-q1o1",
            text: "Presentar a Dios las necesidades de otros con amor y fe",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-14-q1o2",
            text: "Concentrarse solo en necesidades personales",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-14-q1o3",
            text: "Evitar temas de la sociedad y del mundo",
            isCorrect: false,
          },
        ],
        explanation:
          "Pablo exhorta a interceder por todos, incluyendo autoridades y comunidad humana (1 Timoteo 2:1-2).",
      },
      {
        id: "oracion-leccion-14-q2",
        question: "¿Por qué es importante la intercesión para la iglesia?",
        options: [
          {
            id: "oracion-leccion-14-q2o1",
            text: "Porque fortalece la misión y la unidad del pueblo de Dios",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-14-q2o2",
            text: "Porque reemplaza totalmente la predicación",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-14-q2o3",
            text: "Porque es opcional para creyentes maduros",
            isCorrect: false,
          },
        ],
        explanation:
          "La iglesia ora y sirve para que el evangelio alcance a muchos con poder y compasión.",
      },
      {
        id: "oracion-leccion-14-q3",
        question: "¿Qué resume mejor esta lección?",
        options: [
          {
            id: "oracion-leccion-14-q3o1",
            text: "Interceder ensancha la fe y compromete a la iglesia con el mundo",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-14-q3o2",
            text: "La oración pública no tiene impacto real",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-14-q3o3",
            text: "Orar por otros distrae de la vida espiritual",
            isCorrect: false,
          },
        ],
        explanation:
          "La intercesión expresa amor al prójimo y participación en el propósito de Dios.",
      },
    ],
  },
  {
    id: "oracion-leccion-15",
    courseName: "Cómo orar efectivamente",
    lessonNumber: 15,
    title: "Discernimiento y perseverancia final",
    subtitle: "Fidelidad en prueba, silencio y esperanza",
    summary:
      "La madurez en oración se prueba en la espera, el silencio y las dificultades, permaneciendo fieles en esperanza.",
    essentialTakeaways: [
      "No toda demora es rechazo: Dios también obra mientras esperamos.",
      "El discernimiento espiritual nace de Palabra, oración y comunión eclesial.",
      "La perseverancia final sostiene la fe en tiempos de prueba y combate espiritual.",
      "La esperanza cristiana afirma que Dios permanece fiel hasta el fin.",
    ],
    source: "Iglesia del Buen Pastor (I.E.R.E.)",
    passage:
      "La oración madura atraviesa tiempos de gozo y también de silencio, prueba y combate espiritual. En esas etapas, el discípulo aprende discernimiento: distinguir la voluntad de Dios, rechazar la desesperanza y permanecer en obediencia. La perseverancia no es obstinación humana, sino fruto de la gracia que sostiene. Quien ora con esperanza descubre que el Señor permanece fiel y conduce a su iglesia hasta el final.",
    pointsReward: 20,
    reflectionPrompts: [
      "¿Qué prueba actual está desafiando tu perseverancia en oración?",
      "¿Cómo puedes ejercitar discernimiento bíblico cuando no entiendes una respuesta de Dios?",
      "¿Qué promesa del Señor te ayudará a mantener esperanza y fidelidad esta semana?",
    ],
    questions: [
      {
        id: "oracion-leccion-15-q1",
        question: "¿Qué significa perseverar en la etapa final del camino espiritual?",
        options: [
          {
            id: "oracion-leccion-15-q1o1",
            text: "Permanecer fiel en oración aun en prueba y espera",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-15-q1o2",
            text: "Dejar de orar cuando no hay respuestas rápidas",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-15-q1o3",
            text: "Confiar solo en la fuerza personal",
            isCorrect: false,
          },
        ],
        explanation:
          "La perseverancia cristiana se sostiene en la fidelidad de Dios y no en el ánimo momentáneo (Romanos 12:12).",
      },
      {
        id: "oracion-leccion-15-q2",
        question: "¿Cómo se cultiva el discernimiento en la oración?",
        options: [
          {
            id: "oracion-leccion-15-q2o1",
            text: "Con Palabra, oración constante y comunión de la iglesia",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-15-q2o2",
            text: "Con intuición aislada sin fundamento bíblico",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-15-q2o3",
            text: "Evitando todo consejo pastoral",
            isCorrect: false,
          },
        ],
        explanation:
          "Discernir la voluntad de Dios implica renovación de la mente en la verdad (Romanos 12:2).",
      },
      {
        id: "oracion-leccion-15-q3",
        question: "¿Qué verdad sostiene al creyente hasta el final?",
        options: [
          {
            id: "oracion-leccion-15-q3o1",
            text: "Dios permanece fiel y sostiene a su pueblo",
            isCorrect: true,
          },
          {
            id: "oracion-leccion-15-q3o2",
            text: "La esperanza depende de circunstancias favorables",
            isCorrect: false,
          },
          {
            id: "oracion-leccion-15-q3o3",
            text: "La madurez elimina toda necesidad de orar",
            isCorrect: false,
          },
        ],
        explanation:
          "La confianza final del creyente descansa en la fidelidad del Señor, quien completa su obra.",
      },
    ],
  },
];

export function getEffectivePrayerLessonById(lessonId: string): Lesson | undefined {
  return effectivePrayerLessons.find((lesson) => lesson.id === lessonId);
}
