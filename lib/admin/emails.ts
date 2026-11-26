/** Splits the ADMIN_EMAILS env value into normalised addresses. */
export function parseAdminEmails(raw: string | undefined): string[] {
  return (raw ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined, allow: readonly string[]): boolean {
  if (!email) return false;
  return allow.includes(email.trim().toLowerCase());
}
