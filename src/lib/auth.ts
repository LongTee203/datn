import type { UserRole } from "./users";

export const SESSION_COOKIE = "petcare_session";

export interface SessionPayload {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
}

/** Write session to cookie (client-side only) */
export function setSessionCookie(user: SessionPayload): void {
  const value = encodeURIComponent(JSON.stringify(user));
  // expires in 7 days
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${SESSION_COOKIE}=${value}; path=/; expires=${expires}; SameSite=Lax`;
}

/** Clear session cookie (client-side only) */
export function clearSessionCookie(): void {
  document.cookie = `${SESSION_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

/** Parse session cookie from a cookie string (server/middleware safe) */
export function parseSession(cookieString: string): SessionPayload | null {
  const match = cookieString.match(
    new RegExp(`(?:^|; )${SESSION_COOKIE}=([^;]*)`)
  );
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1])) as SessionPayload;
  } catch {
    return null;
  }
}

/** Redirect destination after login based on role */
export function homeForRole(role: UserRole): string {
  return role === "admin" ? "/admin/dashboard" : "/";
}
