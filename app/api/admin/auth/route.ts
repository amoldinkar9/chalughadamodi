import { NextRequest, NextResponse } from "next/server";
import {
  createSessionCookie,
  clearSessionCookie,
  getAdminPassword,
  constantTimeEqual,
  verifyCsrf,
  checkLoginRateLimit,
  recordFailedLogin,
  clearLoginRateLimit,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  // CSRF validation
  if (!verifyCsrf(req)) {
    return NextResponse.json({ error: "Forbidden: CSRF check failed" }, { status: 403 });
  }

  const ip =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "127.0.0.1";

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const { password, action } = body;

  if (action === "logout") {
    return NextResponse.json(
      { success: true },
      {
        headers: { "Set-Cookie": clearSessionCookie() },
      }
    );
  }

  // Rate limit check
  const rateLimit = checkLoginRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter ?? 900) },
      }
    );
  }

  const adminPassword = await getAdminPassword();
  if (
    adminPassword &&
    typeof password === "string" &&
    constantTimeEqual(password, adminPassword)
  ) {
    clearLoginRateLimit(ip);
    return NextResponse.json(
      { success: true },
      {
        headers: { "Set-Cookie": await createSessionCookie() },
      }
    );
  }

  recordFailedLogin(ip);
  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
