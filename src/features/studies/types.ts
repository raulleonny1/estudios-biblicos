export type StudyLevel = "principiante" | "intermedio" | "avanzado";
export type StudyKind = "curso" | "seminario";

export type Study = {
  id: string;
  slug: string;
  kind: StudyKind;
  title: string;
  summary: string;
  objective: string;
  level: StudyLevel;
  durationMinutes: number;
  keyVerse: string;
  illustration: string;
  cardGradient: string;
  tags: string[];
};
