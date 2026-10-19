import { getDb, mapRows, mapRow } from "@/lib/db";
import type {
  Announcement,
  FAQ,
  GalleryPost,
  Magazine,
  PublicContent,
  Test,
  Testimonial,
} from "@/lib/types";
import {
  type SectionItem,
  DEFAULT_HOMEPAGE_SECTIONS,
  VALID_SECTION_IDS,
  parseSectionConfig,
} from "@/lib/config/sections";

// Column whitelists to prevent SQL injection and unwanted mutations
const ALLOWED_COLUMNS: Record<string, Set<string>> = {
  announcements: new Set(["title", "image_url", "backlink", "published", "display_order"]),
  faqs: new Set(["question", "answer", "published", "display_order"]),
  gallery: new Set([
    "title",
    "name",
    "image_url",
    "start_date",
    "last_date",
    "link",
    "apply_link",
    "published",
    "is_new",
    "date_extended",
    "display_order",
  ]),
  magazines: new Set(["month", "image_url", "pdf_url", "published", "display_order"]),
  testimonials: new Set(["name", "initials", "exam", "quote", "published", "display_order"]),
  tests: new Set(["title", "description", "href", "image_url", "published", "display_order"]),
};

const BOOL_COLUMNS = new Set(["published", "is_new", "date_extended"]);

/**
 * Base CRUD Service for Content Entities
 */
export class EntityService<T> {
  constructor(protected readonly tableName: string) {}

  async list(): Promise<T[]> {
    const db = await getDb();
    const { results } = await db
      .prepare(`SELECT * FROM ${this.tableName} ORDER BY display_order`)
      .all();
    return mapRows<T>(results);
  }

  async listPublished(): Promise<T[]> {
    const db = await getDb();
    const { results } = await db
      .prepare(`SELECT * FROM ${this.tableName} WHERE published = 1 ORDER BY display_order`)
      .all();
    return mapRows<T>(results);
  }

  async update(id: string, updates: Record<string, unknown>): Promise<T | null> {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID provided");
    }

    const allowed = ALLOWED_COLUMNS[this.tableName];
    if (!allowed) throw new Error(`Unknown table: ${this.tableName}`);

    const sets: string[] = [];
    const vals: unknown[] = [];

    for (const [k, v] of Object.entries(updates)) {
      if (!allowed.has(k)) continue;
      sets.push(`${k} = ?`);
      vals.push(BOOL_COLUMNS.has(k) ? (v ? 1 : 0) : v);
    }

    if (sets.length === 0) {
      throw new Error("No valid fields provided to update");
    }

    sets.push("updated_at = ?");
    vals.push(new Date().toISOString());
    vals.push(id);

    const db = await getDb();
    const sql = `UPDATE ${this.tableName} SET ${sets.join(", ")} WHERE id = ? RETURNING *`;
    const row = await db.prepare(sql).bind(...vals).first();

    return row ? mapRow<T>(row as Record<string, unknown>) : null;
  }

  async delete(id: string): Promise<boolean> {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID provided");
    }
    const db = await getDb();
    await db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`).bind(id).run();
    return true;
  }
}

/**
 * Specific Content Service Implementations
 */
class AnnouncementServiceImpl extends EntityService<Announcement> {
  constructor() {
    super("announcements");
  }

  async create(data: Partial<Announcement>): Promise<Announcement> {
    const db = await getDb();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const row = await db
      .prepare(
        "INSERT INTO announcements (id, title, image_url, backlink, published, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *"
      )
      .bind(
        id,
        String(data.title ?? ""),
        String(data.image_url ?? ""),
        String(data.backlink ?? ""),
        data.published !== undefined ? (data.published ? 1 : 0) : 1,
        Number(data.display_order ?? 0),
        now,
        now
      )
      .first();

    if (!row) throw new Error("Insert failed");
    return mapRow<Announcement>(row as Record<string, unknown>);
  }
}

class FAQServiceImpl extends EntityService<FAQ> {
  constructor() {
    super("faqs");
  }

  async create(data: Partial<FAQ>): Promise<FAQ> {
    const db = await getDb();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const row = await db
      .prepare(
        "INSERT INTO faqs (id, question, answer, published, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *"
      )
      .bind(
        id,
        String(data.question ?? ""),
        String(data.answer ?? ""),
        data.published !== undefined ? (data.published ? 1 : 0) : 1,
        Number(data.display_order ?? 0),
        now,
        now
      )
      .first();

    if (!row) throw new Error("Insert failed");
    return mapRow<FAQ>(row as Record<string, unknown>);
  }
}

class GalleryServiceImpl extends EntityService<GalleryPost> {
  constructor() {
    super("gallery");
  }

  async create(data: Record<string, unknown>): Promise<GalleryPost> {
    const db = await getDb();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const row = await db
      .prepare(
        "INSERT INTO gallery (id, name, image_url, start_date, last_date, link, apply_link, published, is_new, date_extended, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *"
      )
      .bind(
        id,
        String(data.name ?? data.title ?? ""),
        String(data.image_url ?? ""),
        String(data.start_date ?? ""),
        String(data.last_date ?? ""),
        String(data.link ?? ""),
        String(data.apply_link ?? ""),
        data.published !== undefined ? (data.published ? 1 : 0) : 1,
        data.is_new ? 1 : 0,
        data.date_extended ? 1 : 0,
        Number(data.display_order ?? 0),
        now,
        now
      )
      .first();

    if (!row) throw new Error("Insert failed");
    return mapRow<GalleryPost>(row as Record<string, unknown>);
  }
}

class MagazineServiceImpl extends EntityService<Magazine> {
  constructor() {
    super("magazines");
  }

  async create(data: Partial<Magazine>): Promise<Magazine> {
    const db = await getDb();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const row = await db
      .prepare(
        "INSERT INTO magazines (id, month, image_url, pdf_url, published, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *"
      )
      .bind(
        id,
        String(data.month ?? ""),
        String(data.image_url ?? ""),
        String(data.pdf_url ?? ""),
        data.published !== undefined ? (data.published ? 1 : 0) : 1,
        Number(data.display_order ?? 0),
        now,
        now
      )
      .first();

    if (!row) throw new Error("Insert failed");
    return mapRow<Magazine>(row as Record<string, unknown>);
  }
}

class TestimonialServiceImpl extends EntityService<Testimonial> {
  constructor() {
    super("testimonials");
  }

  async create(data: Record<string, unknown>): Promise<Testimonial> {
    const db = await getDb();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const row = await db
      .prepare(
        "INSERT INTO testimonials (id, name, initials, exam, quote, published, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *"
      )
      .bind(
        id,
        String(data.name ?? ""),
        String(data.initials ?? ""),
        String(data.exam ?? ""),
        String(data.quote ?? data.message ?? ""),
        data.published !== undefined ? (data.published ? 1 : 0) : 1,
        Number(data.display_order ?? 0),
        now,
        now
      )
      .first();

    if (!row) throw new Error("Insert failed");
    return mapRow<Testimonial>(row as Record<string, unknown>);
  }
}

class TestServiceImpl extends EntityService<Test> {
  constructor() {
    super("tests");
  }

  async create(data: Partial<Test>): Promise<Test> {
    const db = await getDb();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const row = await db
      .prepare(
        "INSERT INTO tests (id, title, href, image_url, description, published, display_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *"
      )
      .bind(
        id,
        String(data.title ?? ""),
        String(data.href ?? ""),
        String(data.image_url ?? ""),
        String(data.description ?? ""),
        data.published !== undefined ? (data.published ? 1 : 0) : 1,
        Number(data.display_order ?? 0),
        now,
        now
      )
      .first();

    if (!row) throw new Error("Insert failed");
    return mapRow<Test>(row as Record<string, unknown>);
  }
}

export const AnnouncementService = new AnnouncementServiceImpl();
export const FAQService = new FAQServiceImpl();
export const GalleryService = new GalleryServiceImpl();
export const MagazineService = new MagazineServiceImpl();
export const TestimonialService = new TestimonialServiceImpl();
export const TestService = new TestServiceImpl();

export const SettingsService = {
  async getAll(): Promise<Record<string, unknown>[]> {
    const db = await getDb();
    const { results } = await db.prepare("SELECT * FROM site_settings").all();
    return results;
  },

  async set(key: string, value: string): Promise<Record<string, unknown>> {
    const db = await getDb();
    const now = new Date().toISOString();
    try {
      await db
        .prepare(
          "INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at"
        )
        .bind(key, value, now)
        .run();
    } catch {
      // Fallback for engines/drivers where ON CONFLICT is not supported
      const existing = await db
        .prepare("SELECT key FROM site_settings WHERE key = ?")
        .bind(key)
        .first();
      if (existing) {
        await db
          .prepare("UPDATE site_settings SET value = ?, updated_at = ? WHERE key = ?")
          .bind(value, now, key)
          .run();
      } else {
        await db
          .prepare("INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, ?)")
          .bind(key, value, now)
          .run();
      }
    }
    return { key, value, updated_at: now };
  },
};

/**
 * Section Manager Service for Homepage & Landing Page Sections
 */
export const SectionService = {
  async getSections(): Promise<SectionItem[]> {
    try {
      const db = await getDb();
      const { results } = await db
        .prepare("SELECT value FROM site_settings WHERE key = 'homepage_sections'")
        .all<{ value: string }>();
      const rawValue = results?.[0]?.value;
      return parseSectionConfig(rawValue);
    } catch (err) {
      console.error("[SectionService.getSections] Error reading sections from D1:", err);
      return parseSectionConfig(null);
    }
  },

  async saveSections(
    sections: Array<{ id: string; enabled: boolean }>
  ): Promise<SectionItem[]> {
    if (!Array.isArray(sections)) {
      throw new Error("Invalid sections payload: Expected array");
    }

    const cleanList: Array<{ id: string; enabled: boolean }> = [];
    const seen = new Set<string>();

    for (const item of sections) {
      if (
        item &&
        typeof item.id === "string" &&
        VALID_SECTION_IDS.has(item.id) &&
        !seen.has(item.id)
      ) {
        cleanList.push({
          id: item.id,
          enabled: item.enabled !== false,
        });
        seen.add(item.id);
      }
    }

    // Append any omitted sections from default list to ensure none are orphaned
    for (const def of DEFAULT_HOMEPAGE_SECTIONS) {
      if (!seen.has(def.id)) {
        cleanList.push({
          id: def.id,
          enabled: def.enabled,
        });
      }
    }

    const jsonString = JSON.stringify(cleanList);
    await SettingsService.set("homepage_sections", jsonString);
    return parseSectionConfig(jsonString);
  },
};

/**
 * High-level Public Aggregator Service
 */
export const PublicContentService = {
  async getCombinedContent(): Promise<PublicContent> {
    const [announcements, gallery, magazines, tests, testimonials, faqs] =
      await Promise.all([
        AnnouncementService.listPublished(),
        GalleryService.listPublished(),
        MagazineService.listPublished(),
        TestService.listPublished(),
        TestimonialService.listPublished(),
        FAQService.listPublished(),
      ]);

    return {
      announcements,
      gallery,
      magazines,
      tests,
      testimonials,
      faqs,
    };
  },
};
