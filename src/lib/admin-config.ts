import builtinAdminEmails from "../../config/admin-emails.json";

export function normalizeAdminEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function getAdminEmailSet(): Set<string> {
  const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "";
  const fromEnv = raw
    .split(",")
    .map((item) => normalizeAdminEmail(item))
    .filter(Boolean);

  const fromFile = (builtinAdminEmails as string[]).map(normalizeAdminEmail).filter(Boolean);

  return new Set([...fromFile, ...fromEnv]);
}

export function getConfiguredAdminEmails(): string[] {
  return Array.from(getAdminEmailSet()).sort();
}

export function isConfiguredAdminEmail(email: string | null | undefined): boolean {
  const normalized = normalizeAdminEmail(email ?? "");
  return Boolean(normalized) && getAdminEmailSet().has(normalized);
}

export function resolveUserRole(
  email: string | null | undefined,
  storedRole: unknown
): "admin" | "student" {
  if (isConfiguredAdminEmail(email)) {
    return "admin";
  }
  return storedRole === "admin" ? "admin" : "student";
}
