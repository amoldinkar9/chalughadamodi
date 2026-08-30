import { NextResponse } from "next/server";
import { SEO_KEYWORDS } from "@/lib/seo-keywords";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function GET() {
  const domains = [
    "https://chalughadamodi.in",
    "https://mpsccurrentaffairs.in"
  ];

  const today = new Date().toISOString().split("T")[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const d of domains) {
    xml += `  <url><loc>${d}/</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>\n`;
    xml += `  <url><loc>${d}/about</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>\n`;
    xml += `  <url><loc>${d}/budgetform</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>\n`;

    for (const k of SEO_KEYWORDS) {
      xml += `  <url><loc>${d}/${k.slug}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`;
    }
  }

  xml += '</urlset>';

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200",
    },
  });
}
