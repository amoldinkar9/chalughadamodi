import { NextResponse, type NextRequest } from "next/server";
import { APP_CONFIG } from "@/lib/config";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const rawHost =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";
  const host = rawHost.toLowerCase().split(":")[0];

  const domain = host.includes("mpsccurrentaffairs")
    ? APP_CONFIG.domains.secondaryUrl
    : APP_CONFIG.domains.primaryUrl;

  const content = `# Robots.txt dynamically generated for ${domain}
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/admin/

# Search Engine & AI Crawlers
User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: Google-Extended
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: GPTBot
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: ChatGPT-User
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: OAI-SearchBot
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: ClaudeBot
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: anthropic-ai
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: Claude-Web
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: PerplexityBot
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: Applebot
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: Applebot-Extended
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: cohere-ai
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: Diffbot
Allow: /
Disallow: /admin/
Disallow: /api/admin/

User-agent: YouBot
Allow: /
Disallow: /admin/
Disallow: /api/admin/

Sitemap: ${domain}/sitemap.xml
Host: ${domain}
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
