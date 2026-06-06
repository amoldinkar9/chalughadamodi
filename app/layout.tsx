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

export const metadata: Metadata = {
  title: "चालू घडामोडी | मराठी Current Affairs मोफत — MPSC, तलाठी, पोलीस भरती",
  description:
    "MPSC, तलाठी, पोलीस भरती, रेल्वे, SSC GD, सरळसेवा, वनरक्षक — सर्व परीक्षांसाठी मोफत मराठी चालू घडामोडी, मासिक PDF, आणि रोजच्या टेस्ट. Static GS शी जोडलेले.",
  metadataBase: new URL("https://chalughadamodi.in"),
  alternates: {
    canonical: "/",
    languages: {
      "mr": "/",
      "x-default": "/",
    },
  },
  keywords: [
    "चालू घडामोडी", "MPSC चालू घडामोडी", "मराठी current affairs", "मोफत चालू घडामोडी",
    "तलाठी भरती", "पोलीस भरती", "MPSC राज्यसेवा", "SSC GD मराठी",
    "रेल्वे परीक्षा मराठी", "वनरक्षक भरती", "सरळसेवा भरती", "मासिक PDF",
    "chalu ghadamodi", "mpsc current affairs marathi", "free marathi current affairs",
  ],
  authors: [{ name: "चालू घडामोडी", url: "https://chalughadamodi.in" }],
  creator: "चालू घडामोडी",
  publisher: "चालू घडामोडी",
  category: "education",
  openGraph: {
    title: "चालू घडामोडी | मराठी Current Affairs मोफत — MPSC, तलाठी, पोलीस भरती",
    description:
      "MPSC, तलाठी, पोलीस भरती, रेल्वे, SSC GD — सर्व परीक्षांसाठी मोफत मराठी चालू घडामोडी, मासिक PDF, रोजच्या टेस्ट.",
    locale: "mr_IN",
    type: "website",
    url: "https://chalughadamodi.in",
    siteName: "चालू घडामोडी",
    images: [
      {
        url: "https://chalughadamodi.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "चालू घडामोडी — मराठी Current Affairs MPSC तलाठी पोलीस भरती",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "चालू घडामोडी | मराठी Current Affairs मोफत",
    description: "MPSC, तलाठी, पोलीस भरती — सर्व परीक्षांसाठी मोफत मराठी चालू घडामोडी",
    images: ["https://chalughadamodi.in/og-image.png"],
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
    // GEO — Citation signals for AI models
    "citation_title": "चालू घडामोडी — मराठी Current Affairs",
    "citation_language": "mr",
    "citation_author": "चालू घडामोडी",
    "citation_publisher": "chalughadamodi.in",
    // Regional signals
    "geo.region": "IN-MH",
    "geo.country": "IN",
    "language": "Marathi",
    // AI discovery
    "llms-txt": "https://chalughadamodi.in/llms.txt",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A2540",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const educationalOrgSchema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "Organization"],
    "@id": "https://chalughadamodi.in/#organization",
    name: "चालू घडामोडी",
    alternateName: "Chalu Ghadamodi",
    url: "https://chalughadamodi.in",
    logo: "https://chalughadamodi.in/og-image.png",
    description:
      "महाराष्ट्रातील स्पर्धा परीक्षा विद्यार्थ्यांसाठी मोफत मराठी चालू घडामोडी, मासिक PDF, आणि सराव टेस्ट.",
    inLanguage: "mr",
    areaServed: {
      "@type": "State",
      name: "Maharashtra",
      containedInPlace: { "@type": "Country", name: "India" },
    },
    knowsAbout: [
      "MPSC Rajyaseva Pariksha",
      "Talathi Bharti",
      "Maharashtra Police Bharti",
      "SSC GD",
      "Railway RRB Group D",
      "Vanrakshak Bharti",
      "Current Affairs Marathi",
      "Competitive Exam Preparation Maharashtra",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://wa.me/919579616908",
      availableLanguage: ["Marathi", "Hindi"],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://chalughadamodi.in/#website",
    name: "चालू घडामोडी",
    url: "https://chalughadamodi.in",
    description: "मराठी विद्यार्थ्यांसाठी मोफत चालू घडामोडी, मासिक PDF, आणि टेस्ट.",
    inLanguage: "mr",
    publisher: { "@id": "https://chalughadamodi.in/#organization" },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://chalughadamodi.in/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "मुख्यपान",
        item: "https://chalughadamodi.in",
      },
    ],
  };

  const examItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "महाराष्ट्र स्पर्धा परीक्षा — मोफत चालू घडामोडी",
    description:
      "MPSC, तलाठी, पोलीस भरती, SSC GD, रेल्वे परीक्षांसाठी मोफत मराठी चालू घडामोडी",
    url: "https://chalughadamodi.in",
    numberOfItems: 7,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "MPSC राज्यसेवा चालू घडामोडी", url: "https://chalughadamodi.in" },
      { "@type": "ListItem", position: 2, name: "तलाठी भरती चालू घडामोडी", url: "https://chalughadamodi.in" },
      { "@type": "ListItem", position: 3, name: "पोलीस भरती चालू घडामोडी", url: "https://chalughadamodi.in" },
      { "@type": "ListItem", position: 4, name: "SSC GD मराठी चालू घडामोडी", url: "https://chalughadamodi.in" },
      { "@type": "ListItem", position: 5, name: "रेल्वे RRB Group D चालू घडामोडी", url: "https://chalughadamodi.in" },
      { "@type": "ListItem", position: 6, name: "वनरक्षक भरती चालू घडामोडी", url: "https://chalughadamodi.in" },
      { "@type": "ListItem", position: 7, name: "सरळसेवा भरती चालू घडामोडी", url: "https://chalughadamodi.in" },
    ],
  };

  return (
    <html lang="mr" className={cn("antialiased", anekDevanagari.variable, "font-sans")}>
      <head>
        <link rel="preconnect" href="https://dw44bia1z0v5t.cloudfront.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        {/* Hreflang for language/region targeting */}
        <link rel="alternate" hrefLang="mr" href="https://chalughadamodi.in" />
        <link rel="alternate" hrefLang="x-default" href="https://chalughadamodi.in" />
        {/* AI/LLM discovery */}
        <link rel="llms-txt" href="https://chalughadamodi.in/llms.txt" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(examItemListSchema) }}
        />
      </head>

      <body className="min-h-screen font-sans">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PFFP2NSZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DDQPJQ7VLG"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DDQPJQ7VLG');`}
        </Script>
        <Script id="gtm" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PFFP2NSZ');`}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
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
