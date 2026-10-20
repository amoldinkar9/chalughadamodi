-- Per-keyword original content. A keyword page is indexable/sitemapped only when a published row exists.
CREATE TABLE IF NOT EXISTS seo_pages (
  slug TEXT PRIMARY KEY,
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  heading TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  faqs TEXT NOT NULL DEFAULT '[]',
  published INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
