export type FeedbackCategory = "suggestion" | "error" | "problem";

export type StudentFeedback = {
  id: string;
  uid: string;
  displayName: string;
  email: string;
  category: FeedbackCategory;
  message: string;
  createdAt: string;
};
