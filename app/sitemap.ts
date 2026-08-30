import type { MetadataRoute } from "next";
import { SEO_KEYWORDS } from "@/lib/seo-keywords";

export default function sitemap(): MetadataRoute.Sitemap {
  const domains = [
    "https://chalughadamodi.in",
    "https://mpsccurrentaffairs.in"
  ];

  const allEntries: MetadataRoute.Sitemap = [];

  for (const baseUrl of domains) {
    // Base routes
    allEntries.push(
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
        priority: 0.8,
      },
      {
        url: `${baseUrl}/budgetform`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      }
    );

    // Dynamic SEO keyword landing pages
    const keywordRoutes: MetadataRoute.Sitemap = SEO_KEYWORDS.map((k) => ({
      url: `${baseUrl}/${k.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    allEntries.push(...keywordRoutes);
  }

  return allEntries;
}
