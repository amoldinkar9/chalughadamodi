import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { APP_CONFIG } from "@/lib/config";

const ADMIN_COOKIE = APP_CONFIG.auth.cookieName;
const COOKIE_MAX_AGE = APP_CONFIG.auth.maxAgeSeconds;
const TOKEN_SALT = APP_CONFIG.auth.tokenSalt;
const FALLBACK_ADMIN_PASSWORD = "3103@moL..**";

export async function getAdminPassword(): Promise<string> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const value = (env as { ADMIN_PASSWORD?: string }).ADMIN_PASSWORD;
    if (value && typeof value === "string" && value.trim()) {
      return value.trim();
    }
  } catch {
    // getCloudflareContext unavailable (e.g. build-time or local) — fall through
  }
  const envVal = process.env.ADMIN_PASSWORD;
  if (envVal && typeof envVal === "string" && envVal.trim()) {
    return envVal.trim();
  }
  return FALLBACK_ADMIN_PASSWORD;
}

/**
 * Constant-time string comparison to prevent timing attacks
 */
export function constantTimeEqual(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Cryptographic SHA-256 Hex Digest
 */
async function sha256Hex(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = await crypto.subtle.digest("SHA-256", encoder.encode(data));
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function getSessionToken(): Promise<string> {
  const password = await getAdminPassword();
  if (!password) return "";
  return sha256Hex(`${TOKEN_SALT}:${password}:${TOKEN_SALT}`);
}

export async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE);
  if (!session?.value) return false;

  const expectedToken = await getSessionToken();
  if (!expectedToken) return false; // fail closed when the secret is missing

  return constantTimeEqual(session.value, expectedToken);
}

export async function createSessionCookie(): Promise<string> {
  const token = await getSessionToken();
  const isDev = process.env.NODE_ENV === "development";
  const secure = isDev ? "" : " Secure;";
  return `${ADMIN_COOKIE}=${token}; Path=/; HttpOnly;${secure} SameSite=Lax; Max-Age=${COOKIE_MAX_AGE}`;
}

export function clearSessionCookie(): string {
  const isDev = process.env.NODE_ENV === "development";
  const secure = isDev ? "" : " Secure;";
  return `${ADMIN_COOKIE}=; Path=/; HttpOnly;${secure} SameSite=Lax; Max-Age=0`;
}

/**
 * CSRF Validation for mutating HTTP requests
 */
export function verifyCsrf(req: Request): boolean {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return true;

  const secFetchSite = req.headers.get("sec-fetch-site");
  if (secFetchSite === "cross-site") return false;

  const origin = req.headers.get("origin");
  const host = (req.headers.get("x-forwarded-host") || req.headers.get("host") || "").toLowerCase().split(":")[0];

  if (origin) {
    try {
      const originHost = new URL(origin).host.toLowerCase();
      const allowedHosts = new Set([
        host,
        APP_CONFIG.domains.primary,
        APP_CONFIG.domains.adminHostname,
        APP_CONFIG.domains.secondary,
        "localhost",
        "127.0.0.1",
      ]);
      return allowedHosts.has(originHost) || originHost.endsWith(`.${APP_CONFIG.domains.primary}`);
    } catch {
      return false;
    }
  }

  const referer = req.headers.get("referer");
  if (referer) {
    try {
      const refererHost = new URL(referer).host.toLowerCase();
      return (
        refererHost === host ||
        refererHost.endsWith(`.${APP_CONFIG.domains.primary}`) ||
        refererHost.includes(APP_CONFIG.domains.secondary) ||
        refererHost.startsWith("localhost") ||
        refererHost.startsWith("127.0.0.1")
      );
    } catch {
      return false;
    }
  }

  return true;
}

// In-memory sliding window rate limiter for login attempts
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const loginAttempts = new Map<string, RateLimitRecord>();

export function checkLoginRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record || now > record.resetAt) {
    return { allowed: true };
  }
  if (record.count >= APP_CONFIG.auth.rateLimitMaxAttempts) {
    return { allowed: false, retryAfter: Math.ceil((record.resetAt - now) / 1000) };
  }
  return { allowed: true };
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const windowMs = APP_CONFIG.auth.rateLimitWindowMs;
  const record = loginAttempts.get(ip);
  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + windowMs });
  } else {
    record.count += 1;
  }
}

export function clearLoginRateLimit(ip: string): void {
  loginAttempts.delete(ip);
}
