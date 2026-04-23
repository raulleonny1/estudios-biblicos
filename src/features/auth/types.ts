export type UserRole = "student" | "admin";

export type UserProfile = {
  uid: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  fullName: string;
  consentAccepted: boolean;
  role: UserRole;
  points: number;
  lastDailyRewardDate: string | null;
  createdAt: string;
  updatedAt: string;
};
