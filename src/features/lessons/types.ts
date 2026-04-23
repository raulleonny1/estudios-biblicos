export type LessonQuestionOption = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type LessonQuestion = {
  id: string;
  question: string;
  options: LessonQuestionOption[];
  explanation: string;
};

export type Lesson = {
  id: string;
  courseName: string;
  lessonNumber: number;
  title: string;
  subtitle: string;
  summary: string;
  source: string;
  passage: string;
  pointsReward: number;
  reflectionPrompts: [string, string, string];
  questions: LessonQuestion[];
};
