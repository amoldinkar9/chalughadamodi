import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function getDb(): Promise<D1Database> {
  const { env } = await getCloudflareContext({ async: true });
  return (env as { DB: D1Database }).DB;
}

export async function getR2(): Promise<R2Bucket> {
  const { env } = await getCloudflareContext({ async: true });
  return (env as unknown as { IMAGES_BUCKET: R2Bucket }).IMAGES_BUCKET;
}

const BOOL_COLUMNS = new Set([
  "published",
  "is_new",
  "date_extended",
]);

export function mapRow<T>(row: Record<string, unknown>): T {
  const mapped: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    mapped[k] = BOOL_COLUMNS.has(k) ? Boolean(v) : v;
  }
  return mapped as T;
}

export function mapRows<T>(rows: Record<string, unknown>[]): T[] {
  return rows.map((r) => mapRow<T>(r));
}
