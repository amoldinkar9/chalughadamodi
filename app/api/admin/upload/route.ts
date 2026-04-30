import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyAdmin } from "@/lib/auth";

const BUCKET = "images";
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError)
    return NextResponse.json(
      { error: uploadError.message },
      { status: 500 }
    );

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(fileName);

  return NextResponse.json({ url: publicUrl });
}
