export type UserRole = "student" | "admin";

export type UserProfile = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  fullName: string;
  consentAccepted: boolean;
  role: UserRole;
  points: number;
  streakCount: number;
  longestStreak: number;
  weeklyGoalCount: number;
  weeklyGoalTarget: number;
  achievements: string[];
  lastDailyRewardDate: string | null;
  createdAt: string;
  updatedAt: string;
};
