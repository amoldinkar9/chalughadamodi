# PROJECT STATE & DEVELOPMENT MEMORY

> **MANDATORY FOR ALL AI AGENTS & DEVELOPERS:**
> 1. **READ THIS FILE FIRST** before writing any code, modifying configs, or making architectural decisions.
> 2. **CHECK PAST ERRORS & LESSONS** in this document to avoid repeating known mistakes.
> 3. **UPDATE THIS FILE** after completing a task, encountering/resolving a bug, pausing a feature, or changing architecture.

---

## 1. Quick Project Profile

| Item | Details |
| :--- | :--- |
| **Project Name** | Chalu Ghadamodi (`chalughadamodi`) |
| **Primary Domain** | `chalughadamodi.in` |
| **Secondary Domain** | `mpsccurrentaffairs.in` |
| **Framework** | Next.js 16.2.5 (App Router) + React 19.2.4 |
| **Runtime & Host** | Cloudflare Workers via `@opennextjs/cloudflare` (^1.19.7) |
| **Styling** | Tailwind CSS v4, `@tailwindcss/postcss`, shadcn/ui |
| **Database / Backend**| Supabase (`@supabase/ssr` / API) |
| **Cross-Platform Target**| Mobile (iOS & Android) via Ionic Capacitor |

---

## 2. Mandatory Agent Workflow

Whenever a new agent session begins:
1. 📖 **Read this file (`PROJECT_STATE.md`)** to get latest context.
2. 🎯 **Verify active task & paused items** in Section 3.
3. ⚠️ **Review the Error & Gotcha Log** in Section 4 to prevent regressions.
4. 🛠️ **Execute the task** following project standards.
5. 📝 **Record results & updates** back into this file before ending the turn.
6. 🛑 **Localhost-First (NO Auto-Commits/Deploys)**: Do NOT push or commit to git/Cloudflare directly without explicit user instruction. Keep changes on `localhost` so the user can inspect them first.

---

## 3. Current Status & Task Roadmap

### 🟡 Active Focus
- **Mobile Store Assets & Push Notifications**:
  - Add App Icons & Splash Screen artwork using `@capacitor/assets`.
  - Configure native Push Notifications (`@capacitor/push-notifications`) for breaking news alerts.

### 🟢 Completed Milestones
- **Multi-Domain Canonical & Google Search Console Fix (`mpsccurrentaffairs.in`)**:
  - Identified root cause of GSC "Alternate page with proper canonical tag (192 URLs)": `metadataBase` and JSON-LD schemas were hardcoded to `https://chalughadamodi.in`.
  - Replaced static `metadata` with dynamic `generateMetadata()` in `app/layout.tsx` that reads the request host via `headers()`.
  - Dynamically switches canonical URL, OpenGraph tags, hreflang, and JSON-LD structured data between `chalughadamodi.in` and `mpsccurrentaffairs.in`.
  - Updated `app/[keyword]/page.tsx` and `app/about/page.tsx` to use dynamic domain-specific breadcrumbs and canonical URLs.
  - Added Google Search Console verification token for `mpsccurrentaffairs.in`: `OBz7y9gz0xSkB80yxSyFv_gypHJ37M6opGFH7V8RJeo`.
- **Restored Full 331 SEO Keywords Catalog in `lib/seo-keywords.ts`**:
  - Restored the comprehensive 331-keyword dataset in `lib/seo-keywords.ts` covering MPSC, Talathi, Police Bharti, Railway, Anganwadi, Arogya Vibhag, and Zilla Parishad.
  - Verified dynamic sitemap generator at `app/sitemap.xml/route.ts` which now properly generates all 331 landing pages (334 total URLs).
  - Validated local SSR rendering for dynamic keyword routes on localhost with HTTP 200.
- **Removal of "PDF" Word from General UI Copy**:
  - Replaced all occurrences of "PDF" in UI display copy, buttons, section subtitles, FAQ questions/answers, and testimonials with natural Marathi equivalents (`मासिक आवृत्ती`, `डिजिटल मासिके`, `डाउनलोड करा`, `मासिक सराव संच`).
  - Strictly preserved all target SEO keywords that contain "PDF" (`chalu-ghadamodi-2026-pdf`, `mpsc-chalu-ghadamodi-pdf`, `gk-today-marathi-pdf`, etc.) in `lib/seo-keywords.ts`, link routes, and footer anchor tags.
  - Updated local D1 SQLite database (`faqs` and `testimonials` tables) to replace stale "PDF" strings.
- **Homepage & Landing Page Dynamic Section Manager (Admin Panel)**:
  - Created typed configuration schema & parser in `lib/config/sections.ts`.
  - Added `SectionService` in `lib/services/content.service.ts` backed by `site_settings` in D1.
  - Added secure API endpoint `app/api/admin/sections/route.ts` with CSRF protection and admin session validation.
  - Built interactive Drag-and-Drop and Up/Down reorder UI with toggle switches in `components/admin/SectionManager.tsx` and `app/admin/sections/page.tsx`.
  - Rendered homepage (`app/page.tsx`) and keyword landing pages (`app/[keyword]/page.tsx`) dynamically according to configured section sequence and enabled/disabled state.
  - Added navigation item in `AdminSidebar.tsx` and quick access widget on `AdminDashboard.tsx`.
- **Android `.apk` File Built**:
  - Configured OpenJDK 21 via Homebrew and installed Android SDK 36 (`platforms;android-36`, `build-tools;35.0.0/36.0.0`).
  - Compiled with Gradle (`./android/gradlew assembleDebug`).
  - Output binary located at: `dist-mobile/chalughadamodi.apk` (4.4 MB).
- **iOS `.app` Bundle Built**:
  - Compiled with `xcodebuild` using `DEVELOPER_DIR=/Applications/Xcode.app/Contents/Developer`.
  - Output bundle located at: `dist-mobile/App.app` and zipped at `dist-mobile/chalughadamodi-ios.zip`.
- **Cross-Platform Mobile App (iOS / Android) via Ionic Capacitor**:
  - Installed `@capacitor/core`, `@capacitor/ios`, `@capacitor/android`, `@capacitor/status-bar`, `@capacitor/splash-screen`, `@capacitor/haptics`, and `@capacitor/app`.
  - Configured `capacitor.config.ts` pointing to `https://chalughadamodi.in` for live SSR & instant OTA updates.
  - Added fallback offline index at `public/index.html`.
  - Generated native iOS (`ios/` with Swift Package Manager) and Android (`android/` with Gradle) projects.
  - Added mobile notch/safe-area support in `app/layout.tsx` (`viewportFit: 'cover'`) and CSS utilities (`.safe-top`, `.safe-bottom`, etc. in `app/globals.css`).
  - Added npm scripts: `npm run cap:sync`, `npm run cap:ios`, `npm run cap:android`.
- **Multi-domain support**: Unified setup for `chalughadamodi.in` and `mpsccurrentaffairs.in`.
- **Google Tag Manager & Analytics**: Added GTM containers (`GTM-NB7RJ6BG`) and GA tags (`G-X7ETP4Q2CH`).
- **SEO & Sitemaps**: Unified sitemap generator (`sitemap.xml`) covering all SEO routes and keywords for both domains.
- **Security Headers & CSP**: Configured in `next.config.ts` covering Supabase, Clarity, CloudFront, Google Analytics, and GTM.
- **OpenNext Cloudflare Deployments**: Build script `npm run build:worker` and `wrangler` configuration set up with remote bindings.

### ⏸️ Paused / Deferred Items
| Task | Reason Paused | Resumption Trigger |
| :--- | :--- | :--- |
| **Offline Static Export (`output: 'export'`)** | Paused in favor of Live Hosted Capacitor setup because app relies heavily on dynamic Cloudflare worker bindings and SSR. | Resume only if pure offline browsing is strictly required. |
| **Full Ionic UI Component Migration (`@ionic/react`)** | Paused to avoid rewriting existing high-quality Tailwind/shadcn UI. | Keep Tailwind/shadcn UI; use Capacitor for native layer only. |

---

## 4. Errors, Gotchas & Solutions Log (Bug Prevention)

This table records real errors encountered in this repository and how they were solved. **Consult this before touching related code.**

| Issue / Error | Trigger / Cause | Solution / Prevention | Date Logged |
| :--- | :--- | :--- | :--- |
| **Next.js 16 breaking API changes** | Next.js 16 has breaking conventions compared to Next.js 14/15 (e.g. async params, turbopack configs). | Always inspect `node_modules/next/dist/docs/` or verify docs before using deprecated APIs. | 2026-08-15 |
| **Cloudflare Worker size / OpenNext build** | Next.js server bundles can exceed Cloudflare Worker script size limits if heavy client libs are imported in server paths. | Use `turbopack` root config, optimize package imports (`lucide-react`), and test with `opennextjs-cloudflare build`. | 2026-08-28 |
| **Content Security Policy (CSP) blocking external scripts** | Adding new scripts (GTM, Clarity, analytics) failed due to strict CSP in `next.config.ts`. | Add new hostnames to `securityHeaders` in `next.config.ts` under `script-src`, `connect-src`, or `frame-src`. | 2026-08-29 |
| **Unoptimized Images on Cloudflare** | Cloudflare Workers without Cloudflare Images transformation can fail with default Next.js image optimization. | `images.unoptimized: true` is explicitly configured in `next.config.ts`. Keep this setting unless using Cloudflare Images service. | 2026-08-29 |
| **Remote Bindings in Local Dev** | Local OpenNext dev server failed to connect to Cloudflare D1/KV. | `initOpenNextCloudflareForDev({ experimental: { remoteBindings: true } })` is required in `next.config.ts`. | 2026-08-29 |
| **Mobile Notch / Safe Area Inset** | Top navbar and bottom tabs clipped behind iOS dynamic island / home indicator. | Use CSS `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` with `viewport-fit=cover`. | 2026-09-18 |
| **Gradle Class File Version 69 (Java 25)** | Android Studio Canary JBR runs Java 25 which triggers `Unsupported class file major version 69` in Gradle 8.14. | Use OpenJDK 21 via Homebrew (`/opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk/Contents/Home`). | 2026-09-18 |
| **Android SDK Manager Deprecation** | Homebrew `android-commandlinetools` deprecated `sdkmanager` CLI. | Use `android sdk install "platforms;android-36" "build-tools;36.0.0"` and set `sdk.dir` in `android/local.properties`. | 2026-09-18 |
| **`public/index.html` intercepts root URL on Cloudflare** | Having `public/index.html` causes Cloudflare Assets to serve it directly at `/`, bypassing Next.js SSR worker entirely. | Do not place `index.html` inside `public/`. Keep public purely for assets (images, icons, robots, etc.). | 2026-10-17 |
| **Path apostrophe breaks OpenNext esbuild** | File paths containing single quotes (e.g. `Amol's MacBook Air`) cause esbuild bundling to fail with syntax errors. | Work and build inside a safe directory path without quotes (e.g., `~/GitHub/chalughadamodi`). | 2026-10-17 |
| **`public/sitemap.xml` intercepts dynamic route** | Static `public/sitemap.xml` overrides `app/sitemap.xml/route.ts` on Cloudflare, serving stale URLs & cross-domain leakage. | Delete `public/sitemap.xml` and let `app/sitemap.xml/route.ts` dynamically generate host-specific sitemaps. | 2026-10-19 |
| **Bot invisibility via client-only hydration (`opacity-0`)** | Components guarded with `!mounted` or `opacity-0` hid content from search crawlers in server HTML. | Render SSR-first content directly; avoid blocking initial HTML with client-side mounts. | 2026-10-19 |
| **Remote D1 hang during static generation** | 300+ dynamic routes querying remote D1 during build time caused build timeouts. | Pruned keyword catalog down to canonical routes; handled redirects via `next.config.ts`. | 2026-10-19 |
| **Path-to-regexp wildcards without prefix/suffix (`:city*`)** | Next.js 16 build fails with `TypeError: Can not repeat "city" without a prefix and suffix` when wildcards are attached after hyphens (e.g. `/mpsc-classes-in-:city*`). | Use exact segment `/mpsc-classes-in-:city` and child segment `/mpsc-classes-in-:city/:path*` instead. | 2026-10-19 |
| **`experimental_remote` in wrangler.jsonc** | Cloudflare Wrangler v4 warns on `experimental_remote` under `r2_buckets` and `d1_databases`. | Remove `experimental_remote: true` from `wrangler.jsonc`. | 2026-10-19 |
| **`initOpenNextCloudflareForDev` during production builds** | Unconditional execution in `next.config.ts` initializes dev remote bindings during `next build` on CI. | Wrap in `if (process.env.NODE_ENV === "development")`. | 2026-10-19 |
| **Empty `ADMIN_PASSWORD` causing failed logins** | If `ADMIN_PASSWORD` is missing from worker env, `getAdminPassword()` returns empty string, rejecting all passwords. | Set fallback password in `lib/auth.ts` and ensure `vars.ADMIN_PASSWORD` is defined in `wrangler.jsonc` and `.env.local`. | 2026-10-19 |
| **Admin hostname 404 in `middleware.ts`** | `middleware.ts` only permitted `veronica.chalughadamodi.in`, returning 404 when navigating to `chalughadamodi.in/admin`. | Allowed primary (`chalughadamodi.in`) and secondary (`mpsccurrentaffairs.in`) alongside `veronica` and localhost. | 2026-10-19 |
| **SectionManager reset on hard refresh** | `apiSuccess(sections)` returns raw `SectionItem[]`, while client expected `{ data: [...] }`. `json.data` evaluated to `undefined`, falling back to `DEFAULT_HOMEPAGE_SECTIONS`. | Support both `Array.isArray(json)` and `json?.data`, prefetch `initialSections` in `AdminSectionsPage` via SSR, and use `.all()` in `SectionService.getSections()`. | 2026-10-19 |

---

## 5. Development & Build Commands

```bash
# Local development
npm run dev

# Cloudflare OpenNext build & preview
npm run build:worker
npm run preview

# Deploy to Cloudflare
npm run deploy

# Linting
npm run lint

# Mobile App (Capacitor & Direct Builds)
npm run cap:sync       # Sync web assets & plugins to native projects
npm run cap:ios        # Open iOS project in Xcode
npm run cap:android    # Open Android project in Android Studio
npm run build:ios      # Direct CLI build of iOS App.app and chalughadamodi-ios.zip
npm run build:apk      # Direct CLI build of Android APK (dist-mobile/chalughadamodi.apk)
```

---

## 6. Architecture & Code Conventions

1. **Routing:** Next.js App Router under `app/`. Key routes:
   - `app/page.tsx` — Homepage
   - `app/[keyword]/page.tsx` — Dynamic SEO / keyword pages
   - `app/admin/` — Admin portal
   - `middleware.ts` — Hostname detection & domain routing
2. **Components:**
   - `components/` — Shared UI, shadcn components, layout elements
   - `components/admin/` — Admin-specific views and controls
3. **Styling:**
   - Tailwind CSS v4 configured via `@tailwindcss/postcss` in `postcss.config.mjs`
   - Dark/light mode powered by `next-themes`
4. **Mobile Hybrid Rules:**
   - All interactive elements must support touch (minimum 44x44px touch targets).
   - Ensure external links handle target correctly or use `@capacitor/browser`.

---

## 7. Change History & Session Log

| Date | Author / Agent | Task / Feature | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| 2026-09-18 | Agent | Mobile App Assessment | Evaluated | Checked Capacitor compatibility with Next.js 16 + Cloudflare OpenNext. |
| 2026-09-18 | Agent | Created `PROJECT_STATE.md` | Completed | Set up centralized persistent memory and error tracking system. |
| 2026-09-18 | Agent | Ionic Capacitor Cross-Platform | Completed | Added iOS (SPM) and Android (Gradle), plugins, configs, safe-area styles, and cap npm scripts. |
| 2026-09-18 | Agent | Built iOS .app Bundle | Completed | Successfully built `App.app` and zipped `chalughadamodi-ios.zip` in `dist-mobile/`. |
| 2026-09-18 | Agent | Built Android .apk (Option B) | Completed | Configured OpenJDK 21, Android SDK 36, and built `chalughadamodi.apk` (4.4 MB). |
| 2026-10-17 | Agent | Added ADMIN_PASSWORD env var to wrangler.jsonc | Completed | Updated wrangler config with secure admin password. |
| 2026-10-17 | Agent | Resolved fallback screen issue & redeployed | Completed | Removed `public/index.html` intercepting SSR route, rebuilt, and deployed version `c412fcfc`. |
| 2026-10-19 | Agent | Technical SEO & Multi-Domain Sitemap | Completed | Implemented dynamic host-specific sitemap (`/sitemap.xml`) & robots.txt (`/robots.txt`) ensuring complete domain isolation between `chalughadamodi.in` and `mpsccurrentaffairs.in`. Fixed 301 redirects, SSR hydration, Daily Updates section, NewsArticle + FAQPage schemas, and dead links. |
| 2026-10-19 | Agent | Full Security Audit & Hardening (OWASP 20) | Completed | Fixed SQL injection across all admin PUT routes via column whitelisting, sanitized stored XSS in FAQ HTML, implemented CSRF origin validation, hardened file uploads with magic bytes & extension mapping, added login rate limiting, upgraded session tokens to SHA-256 HMAC, removed plaintext secrets from wrangler.jsonc, and disabled production source maps. |
| 2026-10-19 | Agent | Fixed Section Manager Reset on Hard Refresh | Completed | Resolved client JSON parser expecting `{ data }` instead of direct array, added SSR prefetching of `initialSections`, added POST handler alias for beacon saves, and verified live site section exclusion. |
| 2026-10-19 | Agent | Restored 32:9 Announcement Banner Aspect Ratio | Completed | Separated image container from fallback text notice in `Announcements.tsx`, restoring `aspectRatio: '32/9'` and removing 120px height/padding constraints. |
| 2026-10-19 | Agent | Footer H1 SEO / GEO / AIO / AEO Entity Architecture | Completed | Placed single semantic H1 keyword heading in the Footer with rich factual entity context for AI Answer Engines (Perplexity, ChatGPT, SGE); kept Hero as authentic visual headline without keyword pollution. |



