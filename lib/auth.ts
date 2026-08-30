import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const ADMIN_COOKIE = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function getAdminPassword(): Promise<string> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const value = (env as { ADMIN_PASSWORD?: string }).ADMIN_PASSWORD;
    if (value) return value;
  } catch {
    // getCloudflareContext unavailable (e.g. build-time) — fall through
  }
  return process.env.ADMIN_PASSWORD || "";
}

function hashToken(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return `session_${Math.abs(hash).toString(36)}`;
}

export async function getSessionToken(): Promise<string> {
  return hashToken(await getAdminPassword());
}

export async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE);
  if (!session?.value) return false;

  const password = await getAdminPassword();
  if (!password) return false; // fail closed when the secret is missing

  return session.value === hashToken(password);
}

export async function createSessionCookie(): Promise<string> {
  const token = await getSessionToken();
  return `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`;
}

export function clearSessionCookie(): string {
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
