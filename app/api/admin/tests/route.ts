import { NextRequest, NextResponse } from "next/server";
import { getDb, mapRows, mapRow } from "@/lib/db";
import { verifyAdmin } from "@/lib/auth";

export async function GET() {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const db = await getDb();
  const { results } = await db.prepare("SELECT * FROM tests ORDER BY display_order").all();
  return NextResponse.json(mapRows(results));
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json() as Record<string, unknown>;
  const db = await getDb();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const row = await db
    .prepare("INSERT INTO tests (id, title, href, image_url, description, published, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *")
    .bind(id, body.title, body.href ?? "https://www.tcs9.in/mr/test-series", body.image_url ?? "", body.description ?? "", body.published ?? 1, body.display_order ?? 0, now, now)
    .first();
  if (!row) return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  return NextResponse.json(mapRow(row as Record<string, unknown>));
}

export async function PUT(req: NextRequest) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json() as Record<string, unknown>;
  const { id, ...updates } = body;
  const db = await getDb();
  const sets: string[] = [];
  const vals: unknown[] = [];
  for (const [k, v] of Object.entries(updates)) {
    if (k === "created_at") continue;
    sets.push(`${k} = ?`);
    vals.push(k === "published" ? (v ? 1 : 0) : v);
  }
  sets.push("updated_at = ?");
  vals.push(new Date().toISOString());
  vals.push(id);
  const row = await db.prepare(`UPDATE tests SET ${sets.join(", ")} WHERE id = ? RETURNING *`).bind(...vals).first();
  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(mapRow(row as Record<string, unknown>));
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json() as Record<string, unknown>;
  const db = await getDb();
  await db.prepare("DELETE FROM tests WHERE id = ?").bind(id).run();
  return NextResponse.json({ success: true });
}
