# Hero Image Backlink Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the hero section's desktop and mobile images clickable links to admin-configurable backlink URLs, with entry fields in the admin hero page.

**Architecture:** Reuse the existing `site_settings` key-value table and its `/api/admin/settings` GET/PUT API (already used for `hero_image_url` / `hero_mobile_image_url`). Add two new keys, `hero_image_link` and `hero_mobile_image_link`. `Hero.tsx` conditionally wraps each image in an anchor tag when its link prop is set. The admin hero page gains two text inputs that load/save these keys the same way the existing image-URL inputs do.

**Tech Stack:** Next.js (App Router), React, TypeScript, Cloudflare D1 (via `getDb()`), shadcn/ui `Input`/`Label`/`Button`.

## Global Constraints
- No schema migration — `site_settings` is schemaless key-value; new keys just work with the existing GET/PUT route.
- Desktop and mobile links are independent (not shared).
- Links open in a new tab: `target="_blank" rel="noopener noreferrer"`.
- When a link is unset, the image renders exactly as today (no `<a>` wrapper).
- Only the image is clickable — headline, paragraph, and CTA buttons are untouched.
- This project has no test framework configured (no `*.test.*` files, no test script in `package.json`). Verification steps use `npm run build` (type-check) and manual browser checks via the dev server instead of automated tests.

---

### Task 1: Make `Hero.tsx` accept and render backlinks

**Files:**
- Modify: `components/sections/Hero.tsx`

**Interfaces:**
- Produces: `HeroProps` gains `imageLink?: string` and `mobileImageLink?: string`. `Hero` component signature becomes `Hero({ imageUrl, mobileImageUrl, customTitle, imageLink, mobileImageLink }: HeroProps)`.

- [ ] **Step 1: Add the two new props to `HeroProps` and the function signature**

In `components/sections/Hero.tsx`, replace:

```tsx
interface HeroProps {
  imageUrl?: string;
  mobileImageUrl?: string;
  customTitle?: string;
}

export default function Hero({ imageUrl, mobileImageUrl, customTitle }: HeroProps) {
```

with:

```tsx
interface HeroProps {
  imageUrl?: string;
  mobileImageUrl?: string;
  customTitle?: string;
  imageLink?: string;
  mobileImageLink?: string;
}

export default function Hero({ imageUrl, mobileImageUrl, customTitle, imageLink, mobileImageLink }: HeroProps) {
```

- [ ] **Step 2: Wrap the mobile image in a conditional link**

Replace the mobile image block:

```tsx
              {mobileImg ? (
                <div className="relative w-full max-w-[500px]" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={mobileImg}
                    alt="चालू घडामोडी — MPSC, तलाठी, पोलीस भरती, RRB Group D मराठी current affairs"
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 90vw, 500px"
                    priority
                    fetchPriority="high"
                  />
                </div>
              ) : (
```

with:

```tsx
              {mobileImg ? (
                <div className="relative w-full max-w-[500px]" style={{ aspectRatio: "16/9" }}>
                  {mobileImageLink ? (
                    <a href={mobileImageLink} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={mobileImg}
                        alt="चालू घडामोडी — MPSC, तलाठी, पोलीस भरती, RRB Group D मराठी current affairs"
                        fill
                        className="rounded-lg object-cover"
                        sizes="(max-width: 768px) 90vw, 500px"
                        priority
                        fetchPriority="high"
                      />
                    </a>
                  ) : (
                    <Image
                      src={mobileImg}
                      alt="चालू घडामोडी — MPSC, तलाठी, पोलीस भरती, RRB Group D मराठी current affairs"
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 768px) 90vw, 500px"
                      priority
                      fetchPriority="high"
                    />
                  )}
                </div>
              ) : (
```

- [ ] **Step 3: Wrap the desktop image in a conditional link**

Replace the desktop image block:

```tsx
              {desktopImg ? (
                <div className="relative w-full max-w-[400px]" style={{ aspectRatio: "5/6" }}>
                  <Image
                    src={desktopImg}
                    alt="चालू घडामोडी — MPSC, तलाठी, पोलीस भरती, RRB Group D मराठी current affairs"
                    fill
                    className="rounded-lg object-cover"
                    sizes="400px"
                    priority
                    fetchPriority="high"
                  />
                </div>
              ) : (
```

with:

```tsx
              {desktopImg ? (
                <div className="relative w-full max-w-[400px]" style={{ aspectRatio: "5/6" }}>
                  {imageLink ? (
                    <a href={imageLink} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={desktopImg}
                        alt="चालू घडामोडी — MPSC, तलाठी, पोलीस भरती, RRB Group D मराठी current affairs"
                        fill
                        className="rounded-lg object-cover"
                        sizes="400px"
                        priority
                        fetchPriority="high"
                      />
                    </a>
                  ) : (
                    <Image
                      src={desktopImg}
                      alt="चालू घडामोडी — MPSC, तलाठी, पोलीस भरती, RRB Group D मराठी current affairs"
                      fill
                      className="rounded-lg object-cover"
                      sizes="400px"
                      priority
                      fetchPriority="high"
                    />
                  )}
                </div>
              ) : (
```

- [ ] **Step 4: Verify with a type-check build**

Run: `npm run build`
Expected: Build succeeds with no TypeScript errors in `components/sections/Hero.tsx`.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat(hero): support optional backlink on desktop and mobile hero images"
```

---

### Task 2: Fetch and pass backlinks from the homepage

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Hero` component's new `imageLink?: string` / `mobileImageLink?: string` props (Task 1).
- Produces: `getHeroImageUrls()` return type extended to `{ imageUrl: string; mobileImageUrl: string; imageLink: string; mobileImageLink: string }`.

- [ ] **Step 1: Extend `getHeroImageUrls` to fetch the link keys**

In `app/page.tsx`, replace:

```tsx
async function getHeroImageUrls(): Promise<{ imageUrl: string; mobileImageUrl: string }> {
  try {
    const db = await getDb();
    const rows = await db.prepare("SELECT key, value FROM site_settings WHERE key IN (?, ?)")
      .bind("hero_image_url", "hero_mobile_image_url")
      .all<{ key: string; value: string }>();
    
    const desktop = rows.results.find(r => r.key === "hero_image_url")?.value || "";
    const mobile = rows.results.find(r => r.key === "hero_mobile_image_url")?.value || "";
    return { imageUrl: desktop, mobileImageUrl: mobile };
  } catch {
    return { imageUrl: "", mobileImageUrl: "" };
  }
}
```

with:

```tsx
async function getHeroImageUrls(): Promise<{ imageUrl: string; mobileImageUrl: string; imageLink: string; mobileImageLink: string }> {
  try {
    const db = await getDb();
    const rows = await db.prepare("SELECT key, value FROM site_settings WHERE key IN (?, ?, ?, ?)")
      .bind("hero_image_url", "hero_mobile_image_url", "hero_image_link", "hero_mobile_image_link")
      .all<{ key: string; value: string }>();
    
    const desktop = rows.results.find(r => r.key === "hero_image_url")?.value || "";
    const mobile = rows.results.find(r => r.key === "hero_mobile_image_url")?.value || "";
    const desktopLink = rows.results.find(r => r.key === "hero_image_link")?.value || "";
    const mobileLink = rows.results.find(r => r.key === "hero_mobile_image_link")?.value || "";
    return { imageUrl: desktop, mobileImageUrl: mobile, imageLink: desktopLink, mobileImageLink: mobileLink };
  } catch {
    return { imageUrl: "", mobileImageUrl: "", imageLink: "", mobileImageLink: "" };
  }
}
```

- [ ] **Step 2: Pass the links to `<Hero />`**

Find this line (around line 195):

```tsx
        <Hero imageUrl={heroImages.imageUrl} mobileImageUrl={heroImages.mobileImageUrl} customTitle={heroTitle} />
```

Replace with:

```tsx
        <Hero imageUrl={heroImages.imageUrl} mobileImageUrl={heroImages.mobileImageUrl} customTitle={heroTitle} imageLink={heroImages.imageLink} mobileImageLink={heroImages.mobileImageLink} />
```

- [ ] **Step 3: Verify with a type-check build**

Run: `npm run build`
Expected: Build succeeds with no TypeScript errors in `app/page.tsx`.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat(hero): wire hero backlink settings into homepage"
```

---

### Task 3: Add backlink entry fields to the admin hero page

**Files:**
- Modify: `app/admin/hero/page.tsx`

**Interfaces:**
- Consumes: `/api/admin/settings` GET (returns `{ key: string; value: string }[]`) and PUT (`{ key, value }` body) — both already exist and are unchanged.

- [ ] **Step 1: Add state for the two link fields**

Replace:

```tsx
  const [imageUrl, setImageUrl] = useState("");
  const [mobileImageUrl, setMobileImageUrl] = useState("");
```

with:

```tsx
  const [imageUrl, setImageUrl] = useState("");
  const [mobileImageUrl, setMobileImageUrl] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [mobileImageLink, setMobileImageLink] = useState("");
```

- [ ] **Step 2: Load the link values in `loadCurrent()`**

Replace:

```tsx
        const desktopSetting = data.find((s) => s.key === "hero_image_url");
        if (desktopSetting) setImageUrl(desktopSetting.value);
        
        const mobileSetting = data.find((s) => s.key === "hero_mobile_image_url");
        if (mobileSetting) setMobileImageUrl(mobileSetting.value);
```

with:

```tsx
        const desktopSetting = data.find((s) => s.key === "hero_image_url");
        if (desktopSetting) setImageUrl(desktopSetting.value);
        
        const mobileSetting = data.find((s) => s.key === "hero_mobile_image_url");
        if (mobileSetting) setMobileImageUrl(mobileSetting.value);

        const desktopLinkSetting = data.find((s) => s.key === "hero_image_link");
        if (desktopLinkSetting) setImageLink(desktopLinkSetting.value);

        const mobileLinkSetting = data.find((s) => s.key === "hero_mobile_image_link");
        if (mobileLinkSetting) setMobileImageLink(mobileLinkSetting.value);
```

- [ ] **Step 3: Save the link values in `handleSave()`**

Replace:

```tsx
      await Promise.all([
        fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "hero_image_url", value: imageUrl }),
        }).then((res) => {
          if (!res.ok) throw new Error("Save desktop failed");
        }),
        fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "hero_mobile_image_url", value: mobileImageUrl }),
        }).then((res) => {
          if (!res.ok) throw new Error("Save mobile failed");
        })
      ]);
```

with:

```tsx
      await Promise.all([
        fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "hero_image_url", value: imageUrl }),
        }).then((res) => {
          if (!res.ok) throw new Error("Save desktop failed");
        }),
        fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "hero_mobile_image_url", value: mobileImageUrl }),
        }).then((res) => {
          if (!res.ok) throw new Error("Save mobile failed");
        }),
        fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "hero_image_link", value: imageLink }),
        }).then((res) => {
          if (!res.ok) throw new Error("Save desktop link failed");
        }),
        fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "hero_mobile_image_link", value: mobileImageLink }),
        }).then((res) => {
          if (!res.ok) throw new Error("Save mobile link failed");
        })
      ]);
```

- [ ] **Step 4: Add a "Backlink URL" input under the desktop image card**

Find, inside the desktop image card (after the "Or paste a URL:" `Input` for `imageUrl`):

```tsx
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/hero-desktop.jpg"
            />
          </div>

          {/* Mobile Image Card */}
```

Replace with:

```tsx
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/hero-desktop.jpg"
            />

            <Label className="font-semibold text-sm">Backlink URL (desktop image click target)</Label>
            <Input
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              placeholder="https://example.com/sponsor"
            />
          </div>

          {/* Mobile Image Card */}
```

- [ ] **Step 5: Add a "Backlink URL" input under the mobile image card**

Find, inside the mobile image card (after the "Or paste a URL:" `Input` for `mobileImageUrl`):

```tsx
            <Input
              value={mobileImageUrl}
              onChange={(e) => setMobileImageUrl(e.target.value)}
              placeholder="https://example.com/hero-mobile.jpg"
            />
          </div>
        </div>
```

Replace with:

```tsx
            <Input
              value={mobileImageUrl}
              onChange={(e) => setMobileImageUrl(e.target.value)}
              placeholder="https://example.com/hero-mobile.jpg"
            />

            <Label className="font-semibold text-sm">Backlink URL (mobile image click target)</Label>
            <Input
              value={mobileImageLink}
              onChange={(e) => setMobileImageLink(e.target.value)}
              placeholder="https://example.com/sponsor"
            />
          </div>
        </div>
```

- [ ] **Step 6: Verify with a type-check build**

Run: `npm run build`
Expected: Build succeeds with no TypeScript errors in `app/admin/hero/page.tsx`.

- [ ] **Step 7: Commit**

```bash
git add app/admin/hero/page.tsx
git commit -m "feat(admin): add hero image backlink URL fields"
```

---

### Task 4: Manual end-to-end verification

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Expected: Server starts without errors.

- [ ] **Step 2: Set backlinks in admin**

Navigate to `/admin/hero` in the browser. Enter a test URL (e.g. `https://example.com/test-desktop`) in the desktop "Backlink URL" field and another (e.g. `https://example.com/test-mobile`) in the mobile "Backlink URL" field. Click "Save Settings".
Expected: Toast shows "Hero settings saved!". Reloading `/admin/hero` shows both URLs persisted in the inputs.

- [ ] **Step 3: Verify the homepage image is clickable**

Navigate to `/`. Resize the browser to desktop width and click the hero image.
Expected: Opens `https://example.com/test-desktop` in a new tab.

Resize the browser to mobile width and click the hero image.
Expected: Opens `https://example.com/test-mobile` in a new tab.

Confirm clicking the headline text, paragraph, and the "Start Test" / "Read Magazine" / "Job Recruitment" buttons still behaves as before (buttons unaffected, no accidental nested-link warnings in the browser console).

- [ ] **Step 4: Verify empty-link fallback**

In `/admin/hero`, clear both Backlink URL fields and click "Save Settings". Reload `/`.
Expected: Hero images render as before, not wrapped in a link (hovering shows no pointer/link behavior, clicking does nothing).
