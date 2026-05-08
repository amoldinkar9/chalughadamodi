import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie, clearSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { password, action } = await req.json() as Record<string, unknown>;

  if (action === "logout") {
    return NextResponse.json({ success: true }, {
      headers: { "Set-Cookie": clearSessionCookie() },
    });
  }

  if (password === process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ success: true }, {
      headers: { "Set-Cookie": createSessionCookie() },
    });
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}
