import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { APP_CONFIG } from "@/lib/config";

const ADMIN_HOSTNAME = APP_CONFIG.domains.adminHostname;

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
  const isAllowedHost =
    isLocalhost ||
    hostname === ADMIN_HOSTNAME ||
    hostname === APP_CONFIG.domains.primary ||
    hostname === APP_CONFIG.domains.secondary;

  if (!isAllowedHost) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
