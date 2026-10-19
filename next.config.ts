import type { NextConfig } from "next";
import { resolve } from "path";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev({
  experimental: {
    remoteBindings: true,
  },
} as unknown as Parameters<typeof initOpenNextCloudflareForDev>[0]);

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https: http:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.supabase.co https://*.cloudfront.net https://www.clarity.ms",
      "frame-src 'self' https://www.googletagmanager.com https://docs.google.com https://*.tcs9.in https://tcs9.in",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  turbopack: {
    root: resolve(__dirname),
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "chalughadamodi.in",
      },
      {
        protocol: "https",
        hostname: "veronica.chalughadamodi.in",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    const staticCacheHeaders = isDev
      ? [{ key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate" }]
      : [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    const imageCacheHeaders = isDev
      ? [{ key: "Cache-Control", value: "no-store, no-cache, must-revalidate" }]
      : [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/",
        headers: [{ key: "Cache-Control", value: "no-store, no-cache, max-age=0, must-revalidate" }],
      },
      {
        source: "/(.*)\\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)",
        headers: staticCacheHeaders,
      },
      {
        source: "/_next/image(.*)",
        headers: imageCacheHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // 1. Brand / Homepage near-duplicates
      { source: "/chalughadamodi", destination: "/", permanent: true },
      { source: "/chalu-ghadamodi", destination: "/", permanent: true },
      { source: "/ghadamodi", destination: "/", permanent: true },

      // 2. "2026 PDF" query intent consolidation
      { source: "/chalu-ghadamodi-2026-marathi-pdf", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/chalu-ghadamodi-pdf", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/chalu-ghadamodi-2026-pdf-download", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/chalu-ghadamodi-2026-pdf-free-download-mpsc", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/chalu-ghadamodi-free-pdf", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/chalu-ghadamodi-free-pdf-download", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/chalu-ghadamodi-marathi-pdf-download", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/chalu-ghadamodi-book-pdf-free-download", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/current-affairs-marathi-pdf", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/current-affairs-in-marathi-pdf", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/current-affairs-in-marathi-pdf-free-download", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/monthly-current-affairs-in-marathi-pdf", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/chalu-ghadamodi-pustak", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/chalu-ghadamodi-2023-pustak", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },

      // 3. "2026 Marathi" & "Current Affairs Marathi" near-duplicates
      { source: "/chalu-ghadamodi-2026-in-marathi", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-2026-marathi", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-in-marathi", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-marathi", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-marathi-mahiti", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/marathi-chalu-ghadamodi", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/marathi-current-affairs", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/current-affairs-in-marathi", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/current-affairs-marathi", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-free", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-free-download", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/mofat-chalu-ghadamodi", destination: "/chalu-ghadamodi-2026", permanent: true },

      // 4. "Today / Daily" near-duplicates
      { source: "/aajche-chalu-ghadamodi", destination: "/today-current-affairs-in-marathi", permanent: true },
      { source: "/aajchya-chalu-ghadamodi", destination: "/today-current-affairs-in-marathi", permanent: true },
      { source: "/current-affairs-today-in-marathi", destination: "/today-current-affairs-in-marathi", permanent: true },

      // 5. MPSC near-duplicates
      { source: "/mpsc-current-affairs-marathi", destination: "/mpsc-chalu-ghadamodi", permanent: true },
      { source: "/mpsc-current-affairs-in-marathi-pdf", destination: "/mpsc-chalu-ghadamodi-pdf", permanent: true },
      { source: "/mpsc-current-affairs-pdf", destination: "/mpsc-chalu-ghadamodi-pdf", permanent: true },

      // 6. Talathi Bharti near-duplicates
      { source: "/talathi-bharti-chalu-ghadamodi-magil-varsh", destination: "/talathi-chalu-ghadamodi", permanent: true },
      { source: "/maharashtra-talathi-bharti-2026", destination: "/talathi-chalu-ghadamodi", permanent: true },
      { source: "/talathi-bharti", destination: "/talathi-chalu-ghadamodi", permanent: true },
      { source: "/talathi-bharti-2026", destination: "/talathi-chalu-ghadamodi", permanent: true },
      { source: "/talathi-bharti-2025", destination: "/talathi-chalu-ghadamodi", permanent: true },
      { source: "/talathi-bharti-2025-online-form-date", destination: "/talathi-chalu-ghadamodi", permanent: true },
      { source: "/talathi-bharti-2025-syllabus", destination: "/talathi-syllabus", permanent: true },
      { source: "/talathi-bharti-result-2025", destination: "/talathi-chalu-ghadamodi", permanent: true },
      { source: "/talathi-bharti-syllabus-2025-pdf", destination: "/talathi-syllabus", permanent: true },

      // 7. Police Bharti near-duplicates
      { source: "/maharashtra-police-bharti", destination: "/police-bharti-chalu-ghadamodi", permanent: true },
      { source: "/maharashtra-police-bharti-2026", destination: "/police-bharti-chalu-ghadamodi", permanent: true },
      { source: "/maharashtra-police-bharti-2025", destination: "/police-bharti-chalu-ghadamodi", permanent: true },
      { source: "/police-bharti", destination: "/police-bharti-chalu-ghadamodi", permanent: true },
      { source: "/police-bharti-2026-online-form-date", destination: "/police-bharti-chalu-ghadamodi", permanent: true },
      { source: "/police-bharti-2025", destination: "/police-bharti-chalu-ghadamodi", permanent: true },
      { source: "/police-bharti-2025-jaga-list", destination: "/police-bharti-chalu-ghadamodi", permanent: true },
      { source: "/police-bharti-2025-online-form-date", destination: "/police-bharti-chalu-ghadamodi", permanent: true },
      { source: "/police-bharti-cutoff-2025", destination: "/police-bharti-chalu-ghadamodi", permanent: true },
      { source: "/police-bharti-result-2025", destination: "/police-bharti-chalu-ghadamodi", permanent: true },
      { source: "/mumbai-police-bharti", destination: "/police-bharti-chalu-ghadamodi", permanent: true },

      // 8. Doorway pages: city classes and libraries
      { source: "/mpsc-classes-in-:city*", destination: "/mpsc-chalu-ghadamodi", permanent: true },
      { source: "/best-mpsc-classes-in-maharashtra", destination: "/mpsc-chalu-ghadamodi", permanent: true },
      { source: "/mpsc-library-in-:city*", destination: "/mpsc-chalu-ghadamodi", permanent: true },

      // 9. Past year pages
      { source: "/chalu-ghadamodi-2019-marathi", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-2020-in-marathi", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-free-2021", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-2022", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-2022-marathi-pdf-download", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/chalu-ghadamodi-2022-prashn-uttar", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-free-2022", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-feb-2023", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-2024", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-2024-marathi-pdf", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/chalu-ghadamodi-2025-pdf", destination: "/chalu-ghadamodi-2026-pdf", permanent: true },
      { source: "/chalu-ghadamodi-2025-prashn-uttar", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/chalu-ghadamodi-general-knowledge-2025", destination: "/chalu-ghadamodi-2026", permanent: true },
      { source: "/mpsc-answer-key-2025", destination: "/mpsc-chalu-ghadamodi", permanent: true },
      { source: "/mpsc-combine-cutoff-2025", destination: "/mpsc-chalu-ghadamodi", permanent: true },
      { source: "/mpsc-combine-result-2025", destination: "/mpsc-chalu-ghadamodi", permanent: true },
      { source: "/mpsc-exam-date-2025", destination: "/mpsc-chalu-ghadamodi", permanent: true },
      { source: "/mpsc-group-b-exam-date-2025", destination: "/mpsc-chalu-ghadamodi", permanent: true },
      { source: "/mpsc-rajyaseva-cutoff-2025", destination: "/mpsc-chalu-ghadamodi", permanent: true },
      { source: "/mpsc-rajyaseva-prelims-result-2025", destination: "/mpsc-chalu-ghadamodi", permanent: true },
      { source: "/mpsc-rajyaseva-result-2025", destination: "/mpsc-chalu-ghadamodi", permanent: true },
      { source: "/mpsc-syllabus-2025", destination: "/mpsc-syllabus", permanent: true },
      { source: "/mpsc-syllabus-2025-in-marathi-pdf", destination: "/mpsc-syllabus", permanent: true },
      { source: "/gram-sevak-bharti-2025-online-form-date", destination: "/gram-sevak-bharti-2026-online-form-date", permanent: true },
      { source: "/gram-sevak-syllabus-2025-pdf", destination: "/gram-sevak-syllabus-2026-pdf", permanent: true },

      // 10. Search Console Dead Sitemaps & Blogger Feed URLs
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/feeds/posts/default", destination: "/sitemap.xml", permanent: true },
      { source: "/feeds/posts/default/:path*", destination: "/sitemap.xml", permanent: true },
      { source: "/atom.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default nextConfig;
