import { NextResponse } from "next/server";
import { getDb, mapRows } from "@/lib/db";
import type { PublicContent } from "@/lib/types";

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = await getDb();
  const [announcements, gallery, magazines, tests, testimonials, faqs] = await Promise.all([
    db.prepare("SELECT * FROM announcements WHERE published = 1 ORDER BY display_order").all(),
    db.prepare("SELECT * FROM gallery WHERE published = 1 ORDER BY display_order").all(),
    db.prepare("SELECT * FROM magazines WHERE published = 1 ORDER BY display_order").all(),
    db.prepare("SELECT * FROM tests WHERE published = 1 ORDER BY display_order").all(),
    db.prepare("SELECT * FROM testimonials WHERE published = 1 ORDER BY display_order").all(),
    db.prepare("SELECT * FROM faqs WHERE published = 1 ORDER BY display_order").all(),
  ]);

  const content: PublicContent = {
    announcements: mapRows(announcements.results),
    gallery: mapRows(gallery.results),
    magazines: mapRows(magazines.results),
    tests: mapRows(tests.results),
    testimonials: mapRows(testimonials.results),
    faqs: mapRows(faqs.results),
  };

  return NextResponse.json(content);
}
