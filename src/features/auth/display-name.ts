import type { UserProfile } from "./types";

function titleCaseWord(value: string) {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/** Nombre visible para saludo/nav. Evita el placeholder "estudiante" del bootstrap. */
export function getProfileDisplayName(
  profile: Pick<UserProfile, "firstName" | "lastName" | "fullName" | "email">
): string {
  const full = profile.fullName.trim();
  const parts = `${profile.firstName} ${profile.lastName}`.replace(/\s+/g, " ").trim();
  const candidate = full || parts;

  if (candidate && !/^estudiante$/i.test(candidate)) {
    return candidate;
  }

  const emailLocal = (profile.email.split("@")[0] ?? "").replace(/[._-]+/g, " ").trim();
  if (emailLocal) {
    return emailLocal.split(/\s+/).map(titleCaseWord).join(" ");
  }

  return "Estudiante";
}
