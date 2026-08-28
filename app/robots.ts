import type { MetadataRoute } from "next";
import { getActiveDomain, getDomainConfig } from "@/lib/domain";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const domain = await getActiveDomain();
  const config = getDomainConfig(domain);
  return {
    rules: [
      // Default: allow all crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      // Explicitly allow major AI crawlers for GEO (Generative Engine Optimization)
      {
        userAgent: "GPTBot", // ChatGPT / OpenAI
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: "ClaudeBot", // Anthropic Claude
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: "PerplexityBot", // Perplexity AI
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: "Google-Extended", // Gemini / Google AI training
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: "Googlebot", // Google Search
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: "Applebot", // Apple Intelligence / Siri
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: "cohere-ai", // Cohere
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: "Diffbot", // Diffbot AI
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
      {
        userAgent: "YouBot", // You.com AI
        allow: "/",
        disallow: ["/admin/", "/api/admin/"],
      },
    ],
    sitemap: `${config.baseUrl}/sitemap.xml`,
    host: config.baseUrl,
  };
}
