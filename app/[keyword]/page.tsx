import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SEO_KEYWORDS } from "@/lib/seo-keywords";
import Home from "../page";

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

  return {
    title: `${keywordObj.title} | मराठी Current Affairs मोफत`,
    description: `${keywordObj.title} — MPSC, तलाठी, पोलीस भरती, रेल्वे, SSC GD सर्व परीक्षांसाठी मोफत मराठी चालू घडामोडी, मासिक PDF, आणि रोजच्या टेस्ट.`,
    alternates: {
      canonical: `/${keywordObj.slug}`,
    },
    openGraph: {
      title: `${keywordObj.title} | मोफत मराठी चालू घडामोडी`,
      url: `https://chalughadamodi.in/${keywordObj.slug}`,
    },
  };
}

export default async function KeywordLandingPage({ params }: { params: Promise<{ keyword: string }> }) {
  const resolvedParams = await params;
  const keywordObj = SEO_KEYWORDS.find((k) => k.slug === resolvedParams.keyword);

  if (!keywordObj) {
    notFound();
  }

  // Render the exact same Home page, but pass the specific keyword title 
  // so the H1 changes dynamically for SEO
  return <Home heroTitle={keywordObj.title} />;
}
