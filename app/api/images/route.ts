import { NextRequest, NextResponse } from "next/server";
import { getR2 } from "@/lib/db";

const SAFE_KEY_REGEX = /^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/;

const SAFE_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (!key) return new NextResponse("Missing key", { status: 400 });

  // Prevent directory traversal and invalid bucket keys
  if (!SAFE_KEY_REGEX.test(key) || key.includes("..")) {
    return new NextResponse("Invalid key format", { status: 400 });
  }

  const r2 = await getR2();
  const object = await r2.get(key);
  if (!object) return new NextResponse("Not found", { status: 404 });

  const rawContentType = object.httpMetadata?.contentType || "";
  const isSafeImage = SAFE_IMAGE_TYPES.has(rawContentType);
  const contentType = isSafeImage ? rawContentType : "application/octet-stream";

  const headers = new Headers();
  headers.set("Content-Type", contentType);
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  headers.set("X-Content-Type-Options", "nosniff");
  // Prevent any embedded active content in images from executing
  headers.set("Content-Security-Policy", "default-src 'none'; sandbox");

  if (!isSafeImage) {
    headers.set("Content-Disposition", "attachment");
  }

  return new NextResponse(object.body as ReadableStream, { headers });
}
