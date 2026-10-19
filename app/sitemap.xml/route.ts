import { NextResponse, type NextRequest } from "next/server";
import { SEO_KEYWORDS } from "@/lib/seo-keywords";
import { APP_CONFIG } from "@/lib/config";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const rawHost =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";
  const host = rawHost.toLowerCase().split(":")[0];

  // Use the exact domain requested without mixing domains in one sitemap
  const domain = host.includes("mpsccurrentaffairs")
    ? APP_CONFIG.domains.secondaryUrl
    : APP_CONFIG.domains.primaryUrl;

  const today = new Date().toISOString().split("T")[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Homepage - updated daily
  xml += `  <url><loc>${domain}/</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>\n`;

  // Static informational pages with realistic edit dates
  xml += `  <url><loc>${domain}/about</loc><lastmod>2026-09-18</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;
  xml += `  <url><loc>${domain}/privacy-policy</loc><lastmod>2026-10-19</lastmod><changefreq>yearly</changefreq><priority>0.5</priority></url>\n`;

  // High-value canonical keyword pages
  for (const k of SEO_KEYWORDS) {
    const isCurrentTopic = k.slug.includes("2026") || k.slug.includes("today") || k.slug.includes("chalu-ghadamodi");
    const lastmodDate = k.lastmod || (isCurrentTopic ? today : "2026-10-15");
    const freq = isCurrentTopic ? "daily" : "weekly";
    const priority = isCurrentTopic ? "0.9" : "0.8";
    xml += `  <url><loc>${domain}/${k.slug}</loc><lastmod>${lastmodDate}</lastmod><changefreq>${freq}</changefreq><priority>${priority}</priority></url>\n`;
  }

  xml += '</urlset>';

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}

