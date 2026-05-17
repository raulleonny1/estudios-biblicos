const BUILTIN_ADMIN_EMAILS = ["admin@admin.com"] as const;

export function normalizeAdminEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function getAdminEmailSet(): Set<string> {
  const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "";
  const fromEnv = raw
    .split(",")
    .map((item) => normalizeAdminEmail(item))
    .filter(Boolean);

  return new Set([...BUILTIN_ADMIN_EMAILS, ...fromEnv]);
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
