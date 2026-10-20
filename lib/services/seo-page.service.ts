import { getDb, mapRow, mapRows } from "@/lib/db";

export interface SeoPageFaq {
  q: string;
  a: string;
}

export interface SeoPage {
  slug: string;
  meta_title: string;
  meta_description: string;
  heading: string;
  body: string;
  faqs: SeoPageFaq[];
  published: boolean;
  updated_at: string;
}

interface SeoPageRow extends Omit<SeoPage, "faqs"> {
  faqs: string;
}

function parseFaqs(raw: string): SeoPageFaq[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (f): f is SeoPageFaq =>
        typeof f === "object" && f !== null &&
        typeof (f as SeoPageFaq).q === "string" &&
        typeof (f as SeoPageFaq).a === "string"
    );
  } catch {
    return [];
  }
}

function toSeoPage(row: SeoPageRow): SeoPage {
  return { ...row, faqs: parseFaqs(row.faqs) };
}

export const SeoPageService = {
  /** Published page content for a slug, or null (also null if D1 is unavailable). */
  async getPublished(slug: string): Promise<SeoPage | null> {
    try {
      const db = await getDb();
      const row = await db
        .prepare("SELECT * FROM seo_pages WHERE slug = ? AND published = 1")
        .bind(slug)
        .first<Record<string, unknown>>();
      return row ? toSeoPage(mapRow<SeoPageRow>(row)) : null;
    } catch {
      return null;
    }
  },

  /** Slug -> updated date (YYYY-MM-DD) for every published page; used by the sitemap. */
  async listPublishedSlugs(): Promise<Map<string, string>> {
    const out = new Map<string, string>();
    try {
      const db = await getDb();
      const { results } = await db
        .prepare("SELECT slug, updated_at FROM seo_pages WHERE published = 1")
        .all();
      for (const r of mapRows<{ slug: string; updated_at: string }>(results)) {
        out.set(r.slug, (r.updated_at || "").slice(0, 10));
      }
    } catch {
      // D1 unavailable: no keyword pages are advertised
    }
    return out;
  },
};
