import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await getDb();
  const { results } = await db.prepare("SELECT * FROM site_settings").all();
  return NextResponse.json(results);
}

export async function PUT(req: NextRequest) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { key, value } = await req.json() as Record<string, unknown>;
  const db = await getDb();
  const row = await db
    .prepare("INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at RETURNING *")
    .bind(key, value, new Date().toISOString())
    .first();
  if (!row) return NextResponse.json({ error: "Upsert failed" }, { status: 500 });
  return NextResponse.json(row);
}
