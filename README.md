# चालू घडामोडी — chalughadamodi.in

मराठी विद्यार्थ्यांसाठी मोफत चालू घडामोडी platform.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 with custom theme tokens
- **Font**: Anek Devanagari (loaded via `next/font/google`)
- **Icons**: Lucide React + custom SVG icons (for brand icons)

## Project Structure

```
app/
  layout.tsx          — Root layout, font, SEO metadata, JSON-LD
  page.tsx            — Main page (imports all sections)
  globals.css         — Design tokens, animations, component styles

components/sections/
  StickyHeader.tsx    — Sticky header with scroll effect + mobile menu
  Hero.tsx            — Hero with headline, CTAs, trust strip
  Gallery.tsx         — Recruitment ads grid (6 cards)
  Magazine.tsx        — Monthly magazine grid (6 cards)
  Tests.tsx           — Test series cards on navy bg
  StaticGS.tsx        — Static GS + Current Affairs connection flow
  Testimonials.tsx    — Student testimonials (3 cards)
  FAQ.tsx             — Accordion FAQ + WhatsApp CTA
  FinalCTA.tsx        — Final call-to-action banner
  Footer.tsx          — Footer with links, social icons, TCS9 attribution
```

## Content Checklist — What to Replace

Replace these placeholder items with real content before launch:

### Images
- [ ] Hero illustration — replace the "हिरो प्रतिमा" placeholder in `Hero.tsx`
- [ ] Gallery card images — replace "जाहिरात प्रतिमा" placeholders in `Gallery.tsx`
- [ ] Magazine covers — replace "मासिक मुखपृष्ठ" placeholders in `Magazine.tsx`

### Data
- [ ] Gallery posts — update recruitment data (names, dates, links) in `Gallery.tsx`
- [ ] Magazine months — update with actual magazine data and download links in `Magazine.tsx`
- [ ] Test URLs — each test card has `href` pointing to tcs9.in; customize per test in `Tests.tsx`
- [ ] Live counter — "आज ५४२ विद्यार्थ्यांनी टेस्ट दिली" is static; wire to API if available
- [ ] Testimonials — replace dummy testimonials with real ones in `Testimonials.tsx`

### Links
- [ ] Social media links — update Instagram, Facebook, Telegram, Youtube URLs in `Footer.tsx`
- [ ] Footer links (About, Privacy Policy) — point to real pages
- [ ] Gallery "अधिक माहिती" links — point to individual post pages
- [ ] Magazine "वाचा" buttons — point to PDF downloads or reader pages

### SEO
- [ ] Open Graph image — add `og:image` to metadata in `layout.tsx`
- [ ] Favicon — replace default Next.js favicon in `app/favicon.ico`
- [ ] Sitemap — generate a sitemap.xml

### Domain
- [ ] Update `url` in JSON-LD schemas in `layout.tsx` to match production domain

## Color Palette

| Token       | Value     | Usage                        |
|------------|-----------|------------------------------|
| `cream`    | `#FAF7F2` | Page background              |
| `navy`     | `#0A2540` | Primary text, primary brand  |
| `navy-soft`| `#163A5F` | Hover, secondary surface     |
| `gold`     | `#D4A24C` | Accent, CTAs, dividers       |
| `gold-soft`| `#EDD9A8` | Subtle highlights            |
| `surface`  | `#FFFFFF` | Cards                        |
| `border`   | `#E8E2D5` | Dividers, card borders       |
| `muted`    | `#5A6473` | Meta text                    |
| `success`  | `#2D7A4F` | "नवीन" badge                 |
| `urgent`   | `#C73E3E` | Countdown, deadline          |

## Phase 2 Roadmap

- [ ] Sanity CMS integration for dynamic content
- [ ] Real magazine PDFs + download tracking
- [ ] Test series integration with TCS9 API
- [ ] Deploy to Vercel
- [ ] Point chalughadamodi.in domain
