# Product Requirements Document (PRD)

## 1. Executive Summary & Vision
**Chalu Ghadamodi** (`chalughadamodi.in` & `mpsccurrentaffairs.in`) is Maharashtra's premier high-performance educational portal providing free, daily, bilingual (Marathi/English) current affairs, exam preparation materials, monthly magazine downloads, and recruitment alerts for candidates preparing for competitive exams including **MPSC (State Services, Combine Group B & C)**, **Talathi Bharti**, **Police Bharti**, **Zilla Parishad**, **Gram Sevak**, and **Central SSC/Railway** exams.

The platform is architected for zero-latency mobile delivery, edge computing on Cloudflare Workers, and multi-platform availability across the web and native mobile apps (Android APK & iOS App via Ionic Capacitor).

---

## 2. Target Audience & Personas
1. **MPSC Aspirants (Rajyaseva & Group B/C)**: Require comprehensive daily news analysis, syllabus-mapped static GS linkage, and in-depth monthly PDF compilations.
2. **Police & Talathi Bharti Candidates**: Need rapid, high-yield current affairs, daily mock tests, recruitment date tracking, and eligibility criteria.
3. **Rural & Mobile-First Learners**: Rely heavily on smartphones with varying connectivity; need instant page loads, offline-friendly PDFs, and low data consumption.
4. **Platform Administrators**: Content managers who publish daily updates, upload monthly magazine PDFs, update recruitment notices, and manage tests.

---

## 3. Core Features & Functional Requirements

### 3.1 Public Portal
- **Daily Editorial Updates**: Curated news stories with exam relevance, static GS syllabus mapping, and bullet-point summaries.
- **Job Recruitment Gallery**: Active and upcoming Maharashtra government job recruitment notices with start/end dates, vacancy counts, and official PDF links.
- **Monthly E-Magazine Hub**: Downloadable monthly current affairs PDF archives with high-resolution cover previews.
- **Mock Tests & Quiz Engine**: Time-bound 30-question, 30-minute test modules integrating with TCS/IBPS exam patterns.
- **Static GS Reference Modules**: Quick-revision summaries for Maharashtra Geography, History, Polity, and Economics.
- **Frequently Asked Questions (FAQ)**: Expandable accordion addressing exam queries, preparation strategies, and site usage.
- **Responsive Mobile Navigation**: Touch-optimized sticky header with user login modal, drawer menu, and quick-action buttons.

### 3.2 Dynamic Multi-Domain Engine
- **Primary Domain**: `https://chalughadamodi.in`
- **Secondary Domain**: `https://mpsccurrentaffairs.in`
- Both domains are served by a unified Cloudflare Worker instance with host-aware SEO sitemaps, robots.txt, and metadata isolation.

### 3.3 Administrative CMS Portal (`/admin`)
- **Restricted Access**: Hostname-isolated to `veronica.chalughadamodi.in` and protected with cryptographic SHA-256 session authentication and rate limiting.
- **CRUD Content Management**:
  - Announcements & Top Banners
  - Job Recruitment Notices (Gallery)
  - Monthly Magazine PDF uploads (R2 object storage)
  - Weekly Mock Tests
  - Student Testimonials
  - FAQs
  - Global Site Settings

### 3.4 Cross-Platform Mobile Application
- **Native Android App**: Compiled Gradle debug/release APK (`dist-mobile/chalughadamodi.apk`).
- **Native iOS App**: Swift Package Manager Xcode bundle (`dist-mobile/App.app` and `dist-mobile/chalughadamodi-ios.zip`).
- **Live Sync**: Capacitor connects directly to the live edge server for instant over-the-air content updates without requiring app store resubmissions.

---

## 4. Non-Functional Requirements
- **Performance**: Sub-1.5s Largest Contentful Paint (LCP) on 4G mobile connections; 90+ mobile Google PageSpeed score.
- **SEO & Discoverability**: 100% server-rendered HTML for search crawlers; structured `NewsArticle`, `FAQPage`, and `BreadcrumbList` schemas.
- **Security**: OWASP Top 10 compliance: zero SQL injection via parameterized queries and column whitelisting, strict XSS sanitization, CSRF origin verification, and magic-byte file upload validation.
- **Reliability**: 99.95% uptime powered by Cloudflare's global edge network and serverless D1 SQLite database.
