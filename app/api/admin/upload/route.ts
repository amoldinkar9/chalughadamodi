import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let r2: R2Bucket;
  try {
    const { getR2 } = await import("@/lib/db");
    r2 = await getR2();
  } catch {
    return NextResponse.json(
      { error: "Image upload not available. Enable R2 in Cloudflare Dashboard and add the IMAGES_BUCKET binding. For now, paste the image URL directly." },
      { status: 503 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "announcements";

  if (!file)
    return NextResponse.json({ error: "No file provided" }, { status: 400 });

  if (!ALLOWED_TYPES.includes(file.type))
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
      { status: 400 }
    );

  if (file.size > MAX_SIZE)
    return NextResponse.json(
      { error: "File size must be under 5MB" },
      { status: 400 }
    );

  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  await r2.put(fileName, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });

  const publicUrl = `${process.env.R2_PUBLIC_URL}/${fileName}`;

  return NextResponse.json({ url: publicUrl });
}
