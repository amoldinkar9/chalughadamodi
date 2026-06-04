import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_HOSTNAME = "veronica.chalughadamodi.in";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0] ?? "";
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

  if (!isLocalhost && hostname !== ADMIN_HOSTNAME) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
