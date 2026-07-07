export type WeeklyBulletin = {
  id: string;
  title: string;
  weekLabel: string;
  fileUrl: string;
  fileName: string;
  storagePath: string;
  uploadedBy: string;
  isPublished: boolean;
  createdAt: string;
};

export type WeeklyBulletinInput = {
  title: string;
  weekLabel: string;
  isPublished: boolean;
};
