# Operational Memory & Project State (MEMORY.md)

## 1. Quick Project Profile

| Item | Details |
| :--- | :--- |
| **Project Name** | Chalu Ghadamodi (`chalughadamodi`) |
| **Primary Domain** | `chalughadamodi.in` |
| **Secondary Domain** | `mpsccurrentaffairs.in` |
| **Admin Hostname** | `veronica.chalughadamodi.in` |
| **Framework** | Next.js 16.2.5 (App Router) + React 19.2.4 |
| **Runtime & Host** | Cloudflare Workers via `@opennextjs/cloudflare` (^1.19.7) |
| **Database** | Cloudflare D1 (SQLite, remote binding: `chalughadamodi-db`) |
| **Object Storage**| Cloudflare R2 (Images & PDFs: `chalughadamodi-images`) |
| **Styling** | Tailwind CSS v4, `@tailwindcss/postcss`, shadcn/ui |
| **Mobile Target** | iOS & Android via Ionic Capacitor |

---

## 2. Active Focus & Next Steps
- **Push Notifications & Asset Pipeline**:
  - Configure native Push Notifications (`@capacitor/push-notifications`) for breaking exam alerts.
  - Generate app store icons and splash screens via `@capacitor/assets`.

---

## 3. Completed Milestones
1. **Technical SEO Overhaul & Dual-Domain Sitemaps**: Host-specific dynamic XML sitemaps and robots.txt; keyword cannibalization resolution; 301 redirects; daily editorial section with `NewsArticle` schema; SSR-first crawler visibility.
2. **Security Hardening (OWASP 20)**: Column-whitelisted SQL updates; HTML sanitization in FAQ; CSRF origin verification; magic-byte upload validation; SHA-256 HMAC session tokens; timing-safe checks; rate-limited admin login; removed plaintext secrets from `wrangler.jsonc`.
3. **Architecture Restructuring**: Decoupled business logic into `lib/services/content.service.ts`; standardized API responses in `lib/api/response.ts`; centralized configurations in `lib/config/index.ts`.
4. **Mobile Native Builds**: Android `.apk` built via Gradle; iOS `.app` and `.zip` built via Xcode.

---

## 4. Errors, Gotchas & Bug Prevention Log

| Issue / Gotcha | Cause | Solution / Prevention |
| :--- | :--- | :--- |
| **`public/sitemap.xml` intercepts route** | Static files in `public/` are served directly by Cloudflare edge cache, bypassing dynamic route handlers. | Delete static XML files from `public/` and use dynamic App Router routes (`app/sitemap.xml/route.ts`). |
| **`public/index.html` intercepts root URL** | Having `public/index.html` causes Cloudflare Assets to serve a blank fallback at `/`, bypassing Next.js SSR. | Never place `index.html` in `public/`. Keep `public/` purely for static media assets. |
| **Bot invisibility via client-only hydration** | Components guarded with `!mounted` or `opacity-0` hid content from search crawlers in server HTML. | Render SSR-first content directly; do not gate primary text behind client-side mounts. |
| **Unwhitelisted SQL update injection** | Iterating over `req.json()` keys in `UPDATE` queries allows attackers to inject arbitrary SQL column syntax. | Always validate column names against an explicit `ALLOWED_COLUMNS` whitelist. |
| **ESLint scanning mobile build artifacts** | ESLint scanned 13,000+ files in native iOS/Android build folders (`dist-mobile`, `build-mobile`). | Explicitly add mobile build directories to `globalIgnores` in `eslint.config.mjs`. |
| **React 19 set-state-in-effect warning** | Calling `setState` synchronously within a `useEffect` body triggers compiler warnings. | Defer initialization with `queueMicrotask()` or use an async callback. |

---

## 5. Development & Build Commands

```bash
# Local development
npm run dev

# TypeScript type check
npx tsc --noEmit

# Linting
npm run lint

# Cloudflare OpenNext worker build & preview
npm run build:worker
npm run preview

# Deploy to Cloudflare Workers
npm run deploy

# Mobile Capacitor commands
npm run cap:sync       # Sync web assets to iOS & Android
npm run build:apk      # Build Android debug APK
npm run build:ios      # Build iOS App bundle
```
