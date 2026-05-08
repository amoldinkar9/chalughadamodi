#!/usr/bin/env node
/**
 * Export all data from Supabase and generate a D1-compatible SQL import file.
 *
 * Usage:
 *   SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=ey... node scripts/export-supabase.mjs
 *
 * Output: migrations/0002_import_data.sql
 */

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars");
  process.exit(1);
}

const TABLES = [
  {
    name: "announcements",
    cols: ["id", "title", "image_url", "backlink", "published", "display_order", "created_at", "updated_at"],
    bools: ["published"],
  },
  {
    name: "gallery",
    cols: ["id", "name", "image_url", "start_date", "last_date", "link", "is_new", "date_extended", "published", "display_order", "created_at", "updated_at"],
    bools: ["is_new", "date_extended", "published"],
  },
  {
    name: "magazines",
    cols: ["id", "month", "image_url", "pdf_url", "published", "display_order", "created_at", "updated_at"],
    bools: ["published"],
  },
  {
    name: "tests",
    cols: ["id", "title", "questions", "duration", "href", "image_url", "published", "display_order", "created_at", "updated_at"],
    bools: ["published"],
  },
  {
    name: "testimonials",
    cols: ["id", "name", "initials", "exam", "quote", "published", "display_order", "created_at", "updated_at"],
    bools: ["published"],
  },
  {
    name: "faqs",
    cols: ["id", "question", "answer", "published", "display_order", "created_at", "updated_at"],
    bools: ["published"],
  },
  {
    name: "site_settings",
    cols: ["key", "value", "updated_at"],
    bools: [],
  },
];

function escapeSQL(val) {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "number") return String(val);
  return "'" + String(val).replace(/'/g, "''") + "'";
}

async function fetchTable(name, hasOrder = true) {
  const order = hasOrder ? "&order=display_order.asc.nullslast" : "";
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${name}?select=*${order}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  if (!res.ok) {
    console.error(`Failed to fetch ${name}: ${res.status} ${await res.text()}`);
    return [];
  }
  return res.json();
}

async function main() {
  const lines = [
    "-- Auto-generated: Supabase data export for D1 import",
    `-- Exported at: ${new Date().toISOString()}`,
    "",
    "-- Clear seed data before importing real data",
  ];

  for (const table of TABLES) {
    lines.push(`DELETE FROM ${table.name};`);
  }
  lines.push("");

  let totalRows = 0;

  for (const table of TABLES) {
    const rows = await fetchTable(table.name, table.name !== "site_settings");
    console.log(`${table.name}: ${rows.length} rows`);
    totalRows += rows.length;

    if (rows.length === 0) continue;

    lines.push(`-- ${table.name} (${rows.length} rows)`);

    for (const row of rows) {
      const values = table.cols.map((col) => {
        let val = row[col];
        if (table.bools.includes(col)) {
          val = val ? 1 : 0;
        }
        return escapeSQL(val);
      });
      lines.push(
        `INSERT INTO ${table.name} (${table.cols.join(", ")}) VALUES (${values.join(", ")});`
      );
    }
    lines.push("");
  }

  const fs = await import("fs");
  const outPath = "migrations/0002_import_data.sql";
  fs.writeFileSync(outPath, lines.join("\n") + "\n");
  console.log(`\nExported ${totalRows} total rows to ${outPath}`);
  console.log(`\nNext step: npx wrangler d1 execute chalughadamodi-db --file=${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
