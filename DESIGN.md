# Visual Design System (DESIGN.md)

## 1. Brand Identity & Visual Philosophy
**Chalu Ghadamodi** combines an authoritative academic editorial identity with modern, accessible web usability tailored for Marathi exam candidates. The visual system balances warm, grounding earth tones (representing dedication, study culture, and state heritage) with crisp gold and emerald accents that emphasize achievement and success.

---

## 2. Color Palette & Tokens

| Color Name | Token / Hex | Tailwind Class | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Deep Navy** | `#0A192F` | `text-navy`, `bg-navy` | Primary headings, high-contrast text, brand anchors |
| **Rich Brown** | `#3D2314` | `bg-brown` | Header banners, test section backgrounds |
| **Warm Cream** | `#F9F6F0` | `bg-cream`, `text-cream` | Page canvas, soft backgrounds, contrast text |
| **Gold Accent** | `#D4AF37` | `border-gold`, `text-gold` | Underlines, highlights, badges, active states |
| **Emerald Green**| `#1B7340` | `bg-emerald-700` | CTA buttons ("Start Test"), success badges, active dates |
| **Surface White**| `#FFFFFF` | `bg-surface` | Content cards, modal dialogs, input fields |
| **Muted Slate** | `#64748B` | `text-muted` | Secondary descriptions, timestamps, metadata |
| **Border Soft**  | `#E2E8F0` | `border-border` | Subtle dividers, card borders |

---

## 3. Typography & Font Hierarchy

- **Primary Devanagari Stack**:
  - `font-sans`: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Devanagari", sans-serif.
  - Used for all Marathi news articles, questions, recruitment titles, and syllabus points.
- **Secondary English Stack**:
  - `font-english`: Inter, system-ui, sans-serif.
  - Used for exam codes ("MPSC 2026"), test timers, buttons ("Start Test"), and URLs.

### Type Scale
- **H1 (Page Title)**: `text-3xl md:text-5xl font-bold leading-tight`
- **H2 (Section Header)**: `text-2xl md:text-[32px] font-bold text-navy` (paired with `.section-underline`)
- **H3 (Card Title)**: `text-lg md:text-xl font-bold text-navy`
- **Body Large**: `text-base md:text-lg leading-relaxed`
- **Body Regular**: `text-[15px] md:text-base leading-normal text-muted`
- **Caption / Meta**: `text-xs md:text-sm font-medium text-muted/80`

---

## 4. Elevation, Radii & Card Architecture

- **Border Radius**:
  - Cards & Panels: `rounded-xl` (12px)
  - Buttons & Inputs: `rounded-md` (6px) or `rounded-lg` (8px)
  - Badges & Pills: `rounded-full`
- **Shadows**:
  - Default Card: `shadow-sm border border-border`
  - Hover State: `shadow-md border-gold/50 -translate-y-0.5 transition-all duration-200`
  - Floating Sticky Elements: `shadow-md backdrop-blur-md bg-white/95`

---

## 5. Reusable Component Conventions

### 5.1 Primary Buttons
```html
<!-- Primary Green CTA (e.g. Start Test) -->
<button class="btn-primary inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold text-sm font-english transition-all hover:brightness-105">
  Start Test
</button>

<!-- Secondary Outline Button -->
<button class="btn-outline px-4 py-2 rounded-md font-semibold text-xs font-english border border-navy text-navy hover:bg-navy hover:text-white transition-colors">
  Profile
</button>
```

### 5.2 Status Badges
- **Active / New**: `bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold px-2.5 py-0.5 rounded-full text-xs`
- **Extended Date**: `bg-amber-100 text-amber-800 border border-amber-300 font-semibold px-2.5 py-0.5 rounded-full text-xs`
- **Category Tag**: `bg-gold/10 text-gold-900 border border-gold/30 font-medium px-2 py-0.5 rounded-md text-xs`

### 5.3 Mobile Drawer Navigation
- Slides in smoothly from the right with `transition-transform duration-300`.
- Dark backdrop overlay with touch dismiss.
- Safe-area padding at top and bottom to accommodate device notches and gesture bars.
