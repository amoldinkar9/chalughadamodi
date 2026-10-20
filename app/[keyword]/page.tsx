import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { SEO_KEYWORDS } from "@/lib/seo-keywords";
import { getDomainFromHost } from "@/lib/config";
import Home from "../page";
import KeywordContent from "@/components/sections/KeywordContent";
import { SeoPageService } from "@/lib/services/seo-page.service";

// Tell Next.js to statically generate all these keyword routes at build time
// This is critical for SEO so the pages are fast and fully formed.
export function generateStaticParams() {
  return SEO_KEYWORDS.map((k) => ({
    keyword: k.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ keyword: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const keywordObj = SEO_KEYWORDS.find((k) => k.slug === resolvedParams.keyword);
  
  if (!keywordObj) {
    return {};
  }

  // Pages without original published content stay out of the index (avoids doorway/duplicate pages)
  const seoPage = await SeoPageService.getPublished(keywordObj.slug);

  return {
    robots: seoPage ? undefined : { index: false, follow: true },
    title: seoPage?.meta_title || `${keywordObj.title} | मराठी Current Affairs मोफत`,
    description: seoPage?.meta_description || `${keywordObj.title} — MPSC, तलाठी, पोलीस भरती, रेल्वे, SSC GD सर्व परीक्षांसाठी मोफत मराठी चालू घडामोडी, डिजिटल मासिके, आणि रोजच्या टेस्ट.`,
    alternates: {
      canonical: `/${keywordObj.slug}`,
    },
    openGraph: {
      title: `${keywordObj.title} | मोफत मराठी चालू घडामोडी`,
      url: `/${keywordObj.slug}`,
    },
  };
}

export default async function KeywordLandingPage({ params }: { params: Promise<{ keyword: string }> }) {
  const resolvedParams = await params;
  const keywordObj = SEO_KEYWORDS.find((k) => k.slug === resolvedParams.keyword);

  if (!keywordObj) {
    notFound();
  }

  const seoPage = await SeoPageService.getPublished(keywordObj.slug);
  const headersList = await headers();
  const rawHost = headersList.get("x-forwarded-host") || headersList.get("host") || "";
  const { domain } = getDomainFromHost(rawHost);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "मुख्यपान",
        "item": domain
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": keywordObj.title,
        "item": `${domain}/${keywordObj.slug}`
      }
    ]
  };

  // Render the Home page with keywordSlug for category sorting and footer SEO directory
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Home keywordSlug={keywordObj.slug} />
      {seoPage && <KeywordContent page={seoPage} />}
    </>
  );
}
