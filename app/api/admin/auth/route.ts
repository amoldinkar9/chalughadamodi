import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie, clearSessionCookie, getAdminPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password, action } = await req.json() as Record<string, unknown>;

  if (action === "logout") {
    return NextResponse.json({ success: true }, {
      headers: { "Set-Cookie": clearSessionCookie() },
    });
  }

  const adminPassword = await getAdminPassword();
  if (adminPassword && password === adminPassword) {
    return NextResponse.json({ success: true }, {
      headers: { "Set-Cookie": await createSessionCookie() },
    });
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
