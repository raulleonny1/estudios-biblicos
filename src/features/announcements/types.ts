export type AnnouncementKind = "event" | "award" | "promotion";
export type AnnouncementAudience = "all" | "student";

export type Announcement = {
  id: string;
  title: string;
  message: string;
  imageUrl: string;
  kind: AnnouncementKind;
  audience: AnnouncementAudience;
  targetUserId: string | null;
  targetUserIds: string[];
  ctaLabel: string;
  ctaUrl: string;
  startAt: string | null;
  endAt: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AnnouncementInput = {
  title: string;
  message: string;
  imageUrl?: string;
  kind: AnnouncementKind;
  audience?: AnnouncementAudience;
  targetUserId?: string | null;
  targetUserIds?: string[];
  ctaLabel?: string;
  ctaUrl?: string;
  startAt?: string | null;
  endAt?: string | null;
  isPublished?: boolean;
};
