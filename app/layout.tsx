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
    // Core brand
    "chalu ghadamodi", "चालू घडामोडी", "chalu ghadamodi 2026", "chalu ghadamodi 2025",
    "chalu ghadamodi marathi", "chalu ghadamodi today", "chalu ghadamodi pdf",
    "chalu ghadamodi book", "chalu ghadamodi 2026 marathi", "chalu ghadamodi 2024",
    "chalu ghadamodi simplified", "chalu ghadamodi 2025 question answer",
    "chalu ghadamodi 2025 in marathi", "chalu ghadamodi 2025 book",
    "चालू घडामोडी 2026", "चालू घडामोडी 2025", "चालू घडामोडी महाराष्ट्र 2026",
    "चालू घडामोडी प्रश्न उत्तरे", "चालू घडामोडी 2026 pdf",
    // Current affairs marathi
    "current affairs marathi", "current affairs marathi pdf", "today current affairs in marathi",
    "current affairs marathi 2026", "current affairs in marathi 2026",
    "monthly current affairs in marathi pdf", "mpsc current affairs in marathi pdf",
    "current affairs in marathi pdf 2026", "maharashtra current affairs in marathi",
    "current affairs marathi book", "current affairs marathi pdf free download",
    "current affairs marathi 2025", "current affairs marathi today",
    "current affairs marathi monthly pdf", "current affairs in marathi 2025",
    "current affairs in marathi pdf", "current affairs in marathi question answer",
    "current affairs in marathi pdf free download",
    // General current affairs
    "current affairs", "current affairs today", "current affairs 2026", "current affairs 2025",
    "current affairs quiz", "current affairs pdf", "current affairs monthly",
    "current affairs questions with answers", "100 current affairs questions and answers",
    "current affairs 2025 questions and answers", "current affairs 2025 pdf",
    "current affairs book", "current affairs in india",
    // MPSC
    "mpsc current affairs in marathi", "mpsc chalu ghadamodi", "mpsc current affairs pdf",
    "MPSC राज्यसेवा", "mpsc rajyaseva", "mpsc result", "mpsc previous years question papers",
    "PSI syllabus", "PSI cutoff", "combine pariksha", "MPSC Sathi pustak", "MPSC Sathi book",
    "mpsc main answer writing", "UPSC Marathi",
    // Talathi
    "talathi", "talathi chalu ghadamodi", "Talathi Chalu Ghadamodi 2025",
    "Talathi Bharti Chalu Ghadamodi", "Talathi Spardha Pariksha Chalu Ghadamodi",
    "talathi syllabus", "talathi cutoff", "talathi book list", "talathi result", "talathi merit",
    "tcs chalu ghadamodi", "tcs talathi", "tcs mock test", "tcs pattern", "tcs pyq",
    "tcs sarav paper", "tcs talathi paper", "tcs prashnasanch", "tcs gk gs", "tcs maths",
    // Police Bharti
    "police bharti chalu ghadamodi", "Maharashtra Police Bharti Chalu Ghadamodi",
    "police bharti syllabus", "police bharti cutoff", "police bharti merit",
    "police bharti prashnasanch", "police bharti GK prashna", "mumbai police bharti",
    "maharashtra police recruitment 2025", "maharashtra police exam 2026",
    "maharashtra police bharti latest news", "maharashtra police constable syllabus",
    "maharashtra police study material pdf", "maharashtra police mock tests free",
    "maharashtra police bharti previous year papers pdf",
    // Railway
    "RRB Group D Chalu Ghadamodi Marathi", "Railway Bharti Chalu Ghadamodi",
    "rrb group d", "railway group d", "railway recruitment board group d",
    "rrb group d syllabus", "rrb group d exam pattern", "rrb group d eligibility",
    "rrb group d previous papers", "rrb group d mock tests", "rrb group d result",
    "rrb group d salary", "railway bharti marathi", "railway notes marathi",
    "railway bharti prashnasanch", "railway bharti imp prashn",
    // SSC GD
    "SSC GD Chalu Ghadamodi Marathit", "ssc gd chalu ghadamodi",
    "sscgd syllabus", "ssc gd question papers", "ssc gd notes", "sscgd exam answer",
    "ssc gd admit card", "ssc gd result", "ssc bharti chalu ghadamodi",
    // Vanrakshak & Saralseva
    "Vanrakshak Bharti Chalu Ghadamodi", "vanrakshak pariksha", "vanrakshak prashnapatrika",
    "saralseva exam", "saralseva pariksha", "saralseva result", "zilha parishad bharti",
    // Agniveer
    "Agniveer Bharti Chalu Ghadamodi 2025", "agniveer spardha pariksha",
    // IBPS & banking
    "ibps chalu ghadamodi",
    // General exam keywords
    "sarkari naukri", "sarkari job", "government jobs maharashtra", "sarkari yojna",
    "government GR", "maharashtra government yojna",
    // Content formats
    "मोफत चालू घडामोडी", "मासिक PDF", "मराठी current affairs", "jagtik ghadamodi",
    "world current affair", "dinvishesh", "aajcha dinveshesh", "suvichaar",
    "Chalu Ghadamodi Prashnottare", "Chalu Ghadamodi Sarav Prashna",
    "Chalu Ghadamodi Test Series", "Chalu Ghadamodi Marathi Masik",
    "Darrojchya Chalu Ghadamodi", "Mahatvachya Chalu Ghadamodi",
    "Chalu Ghadamodi PDF Download",
    // Free / year variants
    "chalu ghadamodi free 2021", "chalu ghadamodi free 2022",
    "chalu ghadamodi 2019 marathi", "chalu ghadamodi 2020 in marathi",
    "chalu ghadamodi 2022", "chalu ghadamodi 2022 marathi pdf download",
    "chalu ghadamodi feb 2023", "चालू घडामोडी 2023 पुस्तक",
    "चालू घडामोडी 2022 प्रश्न उत्तर मराठी pdf",
    // Free / PDF / Download
    "chalu ghadamodi free", "chalu ghadamodi free pdf", "chalu ghadamodi free pdf download",
    "chalu ghadamodi free download", "chalu ghadamodi marathi pdf download",
    "chalu ghadamodi book pdf free download in marathi", "chalu ghadamodi 2026 pdf free download mpsc",
    "chalu ghadamodi 2026 pdf", "chalu ghadamodi 2026 pdf download",
    "chalu ghadamodi 2025 pdf", "current affairs in marathi pdf",
    // Brand / Marathi variants
    "chalu ghadamodi in marathi", "marathi chalu ghadamodi", "chalughadamodi", "ghadamodi",
    "chalu ghadamodi marathi mahiti", "चालू घडामोडी पुस्तक",
    // Year-specific
    "chalu ghadamodi 2026 marathi pdf", "chalu ghadamodi 2026 in marathi",
    "chalu ghadamodi 2024 marathi pdf",
    // Q&A / GK
    "चालू घडामोडी 2026 प्रश्न उत्तर मराठी pdf", "चालू घडामोडी 2025 pdf",
    "चालू घडामोडी 2025 प्रश्न उत्तर मराठी pdf",
    "चालू घडामोडी जनरल नॉलेज", "चालू घडामोडी जनरल नॉलेज 2025", "चालू घडामोडी जनरल नॉलेज 2026",
    // Exam-specific
    "chalu ghadamodi for combine", "mpsc chalu ghadamodi pdf",
    "तलाठी भरती चालू घडामोडी मागील 1 वर्ष", "लक्ष्यवेध चालू घडामोडी",
    // Regional / Daily
    "maharashtra chalu ghadamodi", "chalu ghadamodi 2026 in marathi",
    "महाराष्ट्रातील चालू घडामोडी", "आजचे चालू घडामोडी", "aajchya chalu ghadamodi",
    "gk today marathi pdf", "marathi current affairs", "current affairs today in marathi",
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

// Module-level constants — defined outside the component to guarantee
// a single instance and prevent any risk of duplicate injection.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://chalughadamodi.in/#website",
  name: "चालू घडामोडी",
  url: "https://chalughadamodi.in",
  description: "मराठी विद्यार्थ्यांसाठी मोफत चालू घडामोडी, मासिक PDF, आणि टेस्ट.",
  inLanguage: "mr",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://chalughadamodi.in/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

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
    // Exam categories
    "MPSC Rajyaseva Pariksha", "MPSC PSI STI ASO", "Talathi Bharti Maharashtra",
    "Maharashtra Police Bharti", "Mumbai Police Bharti", "SSC GD Bharti",
    "Railway RRB Group D", "RRB NTPC", "Vanrakshak Bharti", "Saralseva Bharti",
    "Zilha Parishad Bharti", "Agniveer Bharti", "IBPS Bank Bharti", "Combine Pariksha MPSC",
    // Content types
    "Current Affairs Marathi", "Chalu Ghadamodi Marathi", "Marathi Current Affairs PDF",
    "Monthly Current Affairs Marathi", "Current Affairs Quiz Marathi",
    "Competitive Exam Preparation Maharashtra", "Maharashtra Government Jobs",
    "Marathi Current Affairs 2025", "Marathi Current Affairs 2026",
    // Topics covered
    "Maharashtra Government GR", "Central Government Schemes", "International News Marathi",
    "Science Technology Current Affairs", "Sports Current Affairs Marathi",
    "Awards and Honours Current Affairs", "Static GK Marathi", "General Science Marathi",
    "Reasoning Marathi", "Mathematics Competitive Exam", "General Awareness Marathi",
    // Syllabus topics
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

// NOTE: ItemList (Carousel) removed — Google requires each ListItem to have
// a UNIQUE url. Since all exams currently land on the same homepage, the
// schema caused validation errors ("Identical property values given, but
// unique values are required"). It will be re-added once dedicated pages
// exist per exam category (e.g. /mpsc, /talathi, etc.).

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className={cn("antialiased", anekDevanagari.variable, "font-sans")}>
      <head>
        {/* Google Tag Manager - mpsccurrentaffairs */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NB7RJ6BG');`,
          }}
        />
        {/* Google tag (gtag.js) - mpsccurrentaffairs */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GT-PHX4M78W" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'GT-PHX4M78W');`,
          }}
        />
        {/* Google Adsense <head> */}

        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2842099037465132"
          crossOrigin="anonymous"></script>
        {/* Google Tag Manager - chalughadamodi */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PFFP2NSZ');`,
          }}
        />
        {/* End Google Tag Manager */}
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1350033857276554');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1350033857276554&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
        <link rel="preconnect" href="https://dw44bia1z0v5t.cloudfront.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        {/* Hreflang for language/region targeting */}
        <link rel="alternate" hrefLang="mr" href="https://chalughadamodi.in" />
        <link rel="alternate" hrefLang="x-default" href="https://chalughadamodi.in" />
        {/* AI/LLM discovery */}
        <link rel="llms-txt" href="https://chalughadamodi.in/llms.txt" />
        {/* Structured Data — single injection, no duplicates */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }}
        />
      </head>

      <body className="min-h-screen font-sans">
        {/* Google Tag Manager (noscript) - chalughadamodi */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PFFP2NSZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* Google Tag Manager (noscript) - mpsccurrentaffairs */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NB7RJ6BG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        {/* GA4 & Google Tags — loads after page is interactive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DDQPJQ7VLG"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-X7ETP4Q2CH"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DDQPJQ7VLG');
            gtag('config', 'G-X7ETP4Q2CH');`}
        </Script>
        {/* Microsoft Clarity — lazy-loaded, lowest priority analytics */}
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
