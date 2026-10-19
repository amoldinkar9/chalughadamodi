import { NextRequest, NextResponse } from "next/server";
import { getR2 } from "@/lib/db";
import { verifyAdmin, verifyCsrf } from "@/lib/auth";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const ALLOWED_FOLDERS = new Set([
  "announcements",
  "gallery",
  "magazines",
  "tests",
  "testimonials",
  "hero",
  "general",
]);

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function validateImageMagicBytes(buffer: ArrayBuffer, type: string): boolean {
  const bytes = new Uint8Array(buffer);
  if (bytes.length < 12) return false;

  if (type === "image/jpeg") {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (type === "image/png") {
    return bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  }
  if (type === "image/gif") {
    return bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38;
  }
  if (type === "image/webp") {
    return (
      bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
    );
  }
  return false;
}

export async function POST(req: NextRequest) {
  if (!verifyCsrf(req)) {
    return NextResponse.json({ error: "Forbidden: CSRF check failed" }, { status: 403 });
  }

  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const requestedFolder = String(formData.get("folder") || "announcements").toLowerCase().trim();

  // Validate folder against strict whitelist (prevents path traversal)
  const folder = ALLOWED_FOLDERS.has(requestedFolder) ? requestedFolder : "announcements";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = MIME_TO_EXT[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File size must be under 5MB" },
      { status: 400 }
    );
  }

  const buffer = await file.arrayBuffer();

  // Validate binary magic bytes to prevent polyglot and MIME-spoofing attacks
  if (!validateImageMagicBytes(buffer, file.type)) {
    return NextResponse.json(
      { error: "Invalid image content or corrupted file header" },
      { status: 400 }
    );
  }

  // Generate safe cryptographically random filename
  const randomBytes = new Uint8Array(8);
  crypto.getRandomValues(randomBytes);
  const randomSuffix = Array.from(randomBytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  const fileName = `${folder}/${Date.now()}-${randomSuffix}.${ext}`;

  const r2 = await getR2();
  await r2.put(fileName, buffer, {
    httpMetadata: { contentType: file.type },
  });

  const publicUrl = `/api/images?key=${encodeURIComponent(fileName)}`;

  return NextResponse.json({ url: publicUrl });
}
