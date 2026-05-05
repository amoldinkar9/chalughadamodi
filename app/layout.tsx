import type { Metadata } from "next";
import { Anek_Devanagari, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

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
  },
  openGraph: {
    title: "चालू घडामोडी | मराठी Current Affairs मोफत — MPSC, तलाठी, पोलीस भरती",
    description:
      "MPSC, तलाठी, पोलीस भरती, रेल्वे, SSC GD — सर्व परीक्षांसाठी मोफत मराठी चालू घडामोडी, मासिक PDF, रोजच्या टेस्ट.",
    locale: "mr_IN",
    type: "website",
    url: "https://chalughadamodi.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className={cn("antialiased", anekDevanagari.variable, "font-sans", geist.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "चालू घडामोडी",
              url: "https://chalughadamodi.in",
              description:
                "मराठी विद्यार्थ्यांसाठी मोफत चालू घडामोडी, मासिक PDF, आणि टेस्ट.",
              inLanguage: "mr",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://chalughadamodi.in/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "चालू घडामोडी",
              url: "https://chalughadamodi.in",
              parentOrganization: {
                "@type": "Organization",
                name: "TCS9",
                url: "https://tcs9.in",
              },
            }),
          }}
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
      </body>
    </html>
  );
}
