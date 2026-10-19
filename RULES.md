# Engineering Standards & Coding Rules (RULES.md)

All contributors, engineers, and AI coding agents working on **Chalu Ghadamodi** must strictly follow these rules without exception.

---

## 1. Core Framework & React 19 Standards
- **Next.js 16 (React 19)**:
  - Do not use deprecated React lifecycle methods or outdated Next.js APIs.
  - In React 19 Server Components, dynamic route parameters (`params`) and search parameters (`searchParams`) are asynchronous promises (`await params`).
  - Do not call `setState` synchronously within a `useEffect` body to avoid cascading re-renders. Defer with `queueMicrotask()` or use an async callback.
  - Never import client-only packages in server-executed files or vice versa.

---

## 2. TypeScript & Code Quality
- **Strict Typing**:
  - `any` is strictly prohibited. Use typed interfaces, generics, or `unknown` with type guards.
  - All database queries must map rows using typed mappers (`mapRow<T>`, `mapRows<T>`).
- **Consistent Naming Conventions**:
  - Components: `PascalCase.tsx` (e.g., `DailyUpdates.tsx`, `AdminSidebar.tsx`).
  - Services: `PascalCaseService` (e.g., `AnnouncementService`, `FAQService`).
  - Route Handlers & Utilities: `camelCase.ts` or `kebab-case.ts` (e.g., `seo-keywords.ts`, `response.ts`).
  - Constants & Configs: `UPPER_SNAKE_CASE` or namespaced objects (`APP_CONFIG`).

---

## 3. Security Rules (OWASP Top 10 Defenses)
1. **Zero SQL Injection**:
   - Never concatenate raw user input or variable keys into SQL queries.
   - All `UPDATE` operations must validate column names against explicit `ALLOWED_COLUMNS` sets.
   - Always bind parameters using `.bind(...values)`.
2. **Cross-Site Scripting (XSS) Prevention**:
   - Never pass unsanitized HTML into `dangerouslySetInnerHTML`.
   - All rich text and HTML answers must pass through `sanitizeHtml()` in `components/sections/FAQ.tsx`.
   - File serving endpoints (`/api/images`) must send `X-Content-Type-Options: nosniff` and CSP sandboxing headers.
3. **CSRF Protection**:
   - Every mutating HTTP endpoint (`POST`, `PUT`, `DELETE` under `/api/admin/*`) must call `if (!verifyCsrf(req)) return apiForbidden()`.
4. **Secure File Uploads**:
   - Whitelist destination folders against path traversal.
   - Derive extensions strictly from verified MIME types (`image/jpeg` $\rightarrow$ `jpg`, etc.).
   - Verify binary magic headers (JPEG `FF D8 FF`, PNG `89 50 4E 47`, GIF `47 49 46 38`, WebP `52 49 46 46`).
5. **No Secrets in Source Control**:
   - Never commit passwords or API secrets in `wrangler.jsonc` or code files.
   - Use `wrangler secret put <KEY>` for production and `.dev.vars` (gitignored) for local development.

---

## 4. SEO & Search Crawler Rules
1. **SSR-First Hydration**:
   - Never render search-critical content inside client-only wrappers (`if (!mounted) return null` or `opacity-0` waiting for JavaScript IntersectionObservers).
   - Server-rendered HTML must contain the full textual content, headings, and structured data immediately upon initial HTTP response.
2. **Heading Hierarchy**:
   - Exactly one `<h1>` per page.
   - Section titles must use `<h2>`, and individual card titles must use `<h3>`.
3. **Structured Data**:
   - All editorial updates must include `NewsArticle` schema.
   - FAQ pages must include valid `FAQPage` schema.

---

## 5. Mobile & Hybrid Capacitor Rules
1. **Safe Area Insets**:
   - Always account for dynamic islands, notches, and home indicator bars using CSS `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.
2. **Touch Target Size**:
   - Interactive elements (buttons, links, drawer toggles) must have a minimum touch target of **44x44 pixels**.
3. **No Root Interception**:
   - Never place an `index.html` inside `public/`. Doing so causes Cloudflare Assets to bypass Next.js SSR entirely.

---

## 6. Error Handling & API Responses
- All API routes must use standardized response helpers from `lib/api/response.ts`:
  - `apiSuccess(data, status)`
  - `apiError(message, status)`
  - `apiUnauthorized()`
  - `apiForbidden()`
  - `apiNotFound()`
  - `apiBadRequest()`
  - `apiRateLimited()`
- Never expose raw database stack traces or internal server error details to clients.
