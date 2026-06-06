import type { MetadataRoute } from "next";
import { SEO_KEYWORDS } from "@/lib/seo-keywords";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://chalughadamodi.in";

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamically generate sitemap entries for all SEO keyword landing pages
  const keywordRoutes = SEO_KEYWORDS.map((k) => ({
    url: `${baseUrl}/${k.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8, // High priority since these are landing pages
  }));

  return [...routes, ...keywordRoutes];
}
