# Task Roadmap & Milestones (TASKS.md)

## Phase 1: Technical SEO & Multi-Domain Architecture (Completed)
- [x] **Dynamic Host-Specific Sitemap**:
  - [x] Deleted static `public/sitemap.xml` overriding Cloudflare route handlers.
  - [x] Created `app/sitemap.xml/route.ts` with host-specific URL generation for `chalughadamodi.in` and `mpsccurrentaffairs.in`.
  - [x] Replaced fake static `lastmod` dates with live edit timestamps.
- [x] **Dynamic Host-Specific Robots.txt**:
  - [x] Created `app/robots.txt/route.ts` dynamically outputting matching sitemap declarations for each domain.
- [x] **Keyword Cannibalization & 301 Redirects**:
  - [x] Implemented permanent 301 redirects for near-duplicate PDF, MPSC, and language variant slugs in `next.config.ts`.
  - [x] Redirected thin doorway pages (`/mpsc-classes-in-*`, `/mpsc-library-in-*`) to canonical hubs.
  - [x] Pruned `lib/seo-keywords.ts` down to 48 high-value canonical keywords.
- [x] **Homepage SSR & Structured Data**:
  - [x] Built `components/sections/DailyUpdates.tsx` with dated editorial news stories and `NewsArticle` schema.
  - [x] Converted homepage dynamic imports to static imports for 100% crawlable server-rendered HTML.
  - [x] Added `FAQPage` schema and fixed recruitment expiration date parsing in `Gallery.tsx`.

---

## Phase 2: Comprehensive Security Hardening (Completed)
- [x] **SQL Injection Defense**:
  - [x] Whitelisted columns in all admin `PUT` routes (`announcements`, `faqs`, `gallery`, `magazines`, `testimonials`, `tests`).
  - [x] Fully parameterized all queries to Cloudflare D1.
- [x] **XSS & Content Security**:
  - [x] Implemented HTML sanitization (`sanitizeHtml`) in `components/sections/FAQ.tsx`.
  - [x] Added `X-Content-Type-Options: nosniff` and CSP sandboxing to `/api/images`.
- [x] **CSRF Protection**:
  - [x] Added `verifyCsrf()` checking Origin, Referer, and Sec-Fetch-Site on all mutating admin endpoints.
- [x] **File Upload Hardening**:
  - [x] Added folder whitelisting against directory traversal in `app/api/admin/upload/route.ts`.
  - [x] Derived file extensions strictly from verified MIME types.
  - [x] Added binary magic bytes validation (JPEG, PNG, GIF, WebP).
- [x] **Authentication & Credential Security**:
  - [x] Upgraded session token generator to 256-bit cryptographic SHA-256 HMAC in `lib/auth.ts`.
  - [x] Added `constantTimeEqual()` to prevent timing attacks.
  - [x] Added IP-based sliding window rate limiter to `/api/admin/auth`.
  - [x] Removed plaintext password from `wrangler.jsonc`.
- [x] **Information Exposure**:
  - [x] Set `productionBrowserSourceMaps: false` in `next.config.ts`.

---

## Phase 3: Architectural Restructuring & Service Decoupling (Completed)
- [x] **Configuration Centralization**:
  - [x] Created `lib/config/index.ts` consolidating domain constants, upload limits, and auth tokens.
- [x] **Standardized API Structure**:
  - [x] Created `lib/api/response.ts` (`apiSuccess`, `apiError`, `apiUnauthorized`, `apiRateLimited`).
- [x] **Service Layer Decoupling**:
  - [x] Created `lib/services/content.service.ts` separating D1 database logic from API controllers.
  - [x] Refactored all admin and public API route handlers to use the service layer.
- [x] **Linter & Code Cleanup**:
  - [x] Configured `eslint.config.mjs` to ignore native mobile build directories (`dist-mobile`, `build-mobile`, `ios`, `android`).
  - [x] Fixed all linting and compiler warnings (`prefer-const`, hook ordering, unused imports).

---

## Phase 4: Native Mobile Pipeline & App Store Release (Active)
- [ ] **App Store Artwork & Assets**:
  - [ ] Generate adaptive icons and splash screens using `@capacitor/assets`.
  - [ ] Test splash screen display across iOS and Android aspect ratios.
- [ ] **Push Notifications Integration**:
  - [ ] Configure `@capacitor/push-notifications` with Firebase Cloud Messaging (FCM) / Apple Push Notification service (APNs).
  - [ ] Add admin trigger to dispatch breaking news alerts to mobile users.
- [ ] **Release Signing & Store Submissions**:
  - [ ] Generate release keystore for Android (`.aab` bundle).
  - [ ] Configure iOS distribution certificate and provisioning profile in Xcode.

---

## Phase 5: PWA Offline Caching & Enhanced Analytics (Upcoming)
- [ ] **Offline PDF Reading**:
  - [ ] Add Service Worker caching for previously downloaded monthly magazines.
- [ ] **Advanced User Quizzing**:
  - [ ] In-app quiz scoring and percentile rankings saved to Supabase/D1.
