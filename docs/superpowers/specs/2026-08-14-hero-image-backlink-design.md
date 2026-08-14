# Hero Image Backlink — Design

## Goal
Make the hero section's desktop and mobile images clickable, each linking to an admin-configured backlink URL. Add link entry fields to the admin hero page so these URLs can be managed.

## Scope
- Only the hero **image** becomes clickable (not the full hero section — headline, paragraph, and the Start Test / Read Magazine / Job Recruitment buttons are unaffected).
- Desktop and mobile images each get their own independent backlink URL (not shared).
- Links open in a new tab (`target="_blank" rel="noopener noreferrer"`).
- If a link is not set in admin, the corresponding image renders exactly as today — no `<a>` wrapper, not clickable.

## Data Layer
Reuse the existing `site_settings` key-value table (already storing `hero_image_url` / `hero_mobile_image_url`). Add two new keys:
- `hero_image_link` — desktop backlink URL
- `hero_mobile_image_link` — mobile backlink URL

No schema migration needed — `site_settings` is schemaless key-value, and `/api/admin/settings` (GET/PUT) already supports arbitrary keys.

## Component: `components/sections/Hero.tsx`
Add two optional props: `imageLink?: string` and `mobileImageLink?: string`.

- Desktop image: when `imageLink` is truthy, wrap the existing desktop `<Image>` block in `<a href={imageLink} target="_blank" rel="noopener noreferrer">`. When empty/undefined, render unwrapped (current behavior).
- Mobile image: same treatment using `mobileImageLink`, wrapping the mobile `<Image>` block.
- The placeholder (no-image) state is not wrapped in a link even if a link URL is set — there's nothing to click.

## Page: `app/page.tsx`
Extend `getHeroImageUrls()` to also select `hero_image_link` and `hero_mobile_image_link` from `site_settings`, and pass `imageLink` / `mobileImageLink` to `<Hero />`.

## Admin: `app/admin/hero/page.tsx`
Add two new pieces of state, `imageLink` and `mobileImageLink`:
- Loaded in the existing `loadCurrent()` effect from the `/api/admin/settings` GET response (matching keys `hero_image_link` / `hero_mobile_image_link`).
- A new "Backlink URL" `Input` under each image card (desktop card gets one, mobile card gets one), placeholder e.g. `https://example.com/sponsor`.
- Saved in `handleSave()` via the same PUT pattern used for the image URLs, added to the existing `Promise.all`.

## Out of Scope
- No analytics/click tracking on the backlink.
- No URL validation beyond what the browser does natively (plain text input).
- No change to the placeholder ("हिरो प्रतिमा") states.
