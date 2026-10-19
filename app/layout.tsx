import type { Metadata, Viewport } from "next";
import { Anek_Devanagari } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

const anekDevanagari = Anek_Devanagari({
  variable: "--font-anek-devanagari",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

import { headers } from "next/headers";
import { APP_CONFIG, getDomainFromHost } from "@/lib/config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A2540",
  viewportFit: "cover",
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const rawHost = headersList.get("x-forwarded-host") || headersList.get("host") || "";
  const { domain, siteName, brandTitle, isSecondary } = getDomainFromHost(rawHost);

  const googleVerificationTokens = isSecondary
    ? [
        process.env.GOOGLE_SITE_VERIFICATION_MPSC,
        "OBz7y9gz0xSkB80yxSyFv_gypHJ37M6opGFH7V8RJeo",
      ]
    : [
        process.env.GOOGLE_SITE_VERIFICATION,
        "W-T-sp-qvFNp_4EvsfZrVBdYU8ppOWF8qVDWBl6FQ1A",
      ];

  return {
    metadataBase: new URL(domain),
    title: brandTitle,
    description:
      "MPSC, तलाठी, पोलीस भरती व इतर परीक्षांसाठी मोफत मराठी चालू घडामोडी, डिजिटल मासिके, रोजच्या टेस्ट आणि Static GS विश्लेषण. दररोज मोफत अपडेट.",
    alternates: {
      canonical: "/",
      languages: {
        "mr": "/",
        "x-default": "/",
      },
    },
    authors: [{ name: siteName, url: domain }],
    creator: siteName,
    publisher: siteName,
    category: "education",
    verification: {
      google: Array.from(new Set(googleVerificationTokens.filter(Boolean))) as string[],
    },
    openGraph: {
      title: brandTitle,
      description:
        "MPSC, तलाठी, पोलीस भरती, रेल्वे, SSC GD — सर्व परीक्षांसाठी मोफत मराठी चालू घडामोडी, डिजिटल मासिके, रोजच्या टेस्ट.",
      locale: "mr_IN",
      type: "website",
      url: domain,
      siteName: siteName,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${siteName} — मराठी Current Affairs MPSC तलाठी पोलीस भरती`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brandTitle,
      description: "MPSC, तलाठी, पोलीस भरती — सर्व परीक्षांसाठी मोफत मराठी चालू घडामोडी",
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    other: {
      "citation_title": `${siteName} — मराठी Current Affairs`,
      "citation_language": "mr",
      "citation_author": siteName,
      "citation_publisher": domain.replace(/^https?:\/\//, ""),
      "geo.region": "IN-MH",
      "geo.country": "IN",
      "language": "Marathi",
      "llms-txt": `${domain}/llms.txt`,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const rawHost = headersList.get("x-forwarded-host") || headersList.get("host") || "";
  const { domain, siteName, isSecondary } = getDomainFromHost(rawHost);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${domain}/#website`,
    name: siteName,
    url: domain,
    description: "मराठी विद्यार्थ्यांसाठी मोफत चालू घडामोडी, डिजिटल मासिके, आणि टेस्ट.",
    inLanguage: "mr",
    potentialAction: {
      "@type": "SearchAction",
      target: `${domain}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const educationalOrgSchema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "Organization"],
    "@id": `${domain}/#organization`,
    name: siteName,
    alternateName: isSecondary ? "MPSC Current Affairs Marathi" : "Chalu Ghadamodi",
    url: domain,
    logo: `${domain}/og-image.png`,
    description:
      "महाराष्ट्रातील स्पर्धा परीक्षा विद्यार्थ्यांसाठी मोफत मराठी चालू घडामोडी, डिजिटल मासिके, आणि सराव टेस्ट.",
    inLanguage: "mr",
    areaServed: {
      "@type": "State",
      name: "Maharashtra",
      containedInPlace: { "@type": "Country", name: "India" },
    },
    knowsAbout: [
      "MPSC Rajyaseva Pariksha", "MPSC PSI STI ASO", "Talathi Bharti Maharashtra",
      "Maharashtra Police Bharti", "Mumbai Police Bharti", "SSC GD Bharti",
      "Railway RRB Group D", "RRB NTPC", "Vanrakshak Bharti", "Saralseva Bharti",
      "Zilha Parishad Bharti", "Agniveer Bharti", "IBPS Bank Bharti", "Combine Pariksha MPSC",
      "Current Affairs Marathi", "Chalu Ghadamodi Marathi", "Marathi Current Affairs PDF",
      "Monthly Current Affairs Marathi", "Current Affairs Quiz Marathi",
      "Competitive Exam Preparation Maharashtra", "Maharashtra Government Jobs",
      "Marathi Current Affairs 2025", "Marathi Current Affairs 2026",
      "Maharashtra Government GR", "Central Government Schemes", "International News Marathi",
      "Science Technology Current Affairs", "Sports Current Affairs Marathi",
      "Awards and Honours Current Affairs", "Static GK Marathi", "General Science Marathi",
      "Reasoning Marathi", "Mathematics Competitive Exam", "General Awareness Marathi",
      "Talathi Syllabus Maharashtra", "Police Bharti Syllabus Maharashtra",
      "MPSC Syllabus Marathi", "RRB Group D Syllabus", "SSC GD Syllabus",
      "TCS Mock Test Talathi", "PIB News Marathi", "Akashvani News",
      "Loksatta Sampadkiya", "Maharashtra News", "Rajyasabha Loksabha News",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://wa.me/919579616908",
      availableLanguage: ["Marathi", "Hindi"],
    },
  };

  return (
    <html lang="mr" className={cn("antialiased", anekDevanagari.variable, "font-sans")}>
      <head>
        {/* Preconnect & DNS Prefetch */}
        <link rel="preconnect" href="https://dw44bia1z0v5t.cloudfront.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        {/* Dynamic Hreflang for active domain */}
        <link rel="alternate" hrefLang="mr" href={domain} />
        <link rel="alternate" hrefLang="x-default" href={domain} />

        {/* AI/LLM discovery */}
        <link rel="llms-txt" href={`${domain}/llms.txt`} />

        {/* Structured Data — single injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
        />

        {/* Google Adsense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2842099037465132"
          crossOrigin="anonymous"
        />
      </head>

      <body className="min-h-screen font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PFFP2NSZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        {children}

        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PFFP2NSZ');`}
        </Script>

        {/* GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X7ETP4Q2CH"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X7ETP4Q2CH');`}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","x28b5xwqzl");`}
        </Script>
      </body>
    </html>
  );
}
