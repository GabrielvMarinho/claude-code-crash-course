# Visual Identity — FutureProofing (futureproofing.dev)

> **Purpose of this file.** This is the canonical design reference for this project. It captures
> the visual language of https://www.futureproofing.dev/ so that Claude (and any future session)
> can build new pages and components that look like they belong to the same site. When you create
> UI, match the tokens and rules below. When in doubt, prefer **less**: fewer colors, fewer borders,
> more whitespace, sharper edges.

---

## 1. Brand essence

**Aesthetic:** Brutalist minimalism meets startup efficiency.
Stripped-down, high-contrast, editorial. Content does the work; decoration is nearly absent.
The page reads like a well-set document — numbered sections, thin rules, generous margins.

**Mood keywords:** confident, direct, technical, premium, no-nonsense, editorial.

**Design principles (apply these when making decisions):**
1. **High contrast.** Near-black on near-white. Avoid mid-grays for primary text.
2. **Flat, not glossy.** No drop shadows, no glows, no gradients on surfaces.
3. **Sharp edges.** Border radius is 0 (or near-0). Cards are containers, not pills.
4. **Whitespace is a feature.** Sections breathe. Padding is large and consistent.
5. **Type-led hierarchy.** Size, weight, and spacing create structure — not color or boxes.
6. **Editorial numbering.** Major sections are numbered (`§ I`, `§ II`, … or `01 / 02 / 03`).
7. **Restraint with accents.** Color is used sparingly, for a single link/CTA emphasis at most.

---

## 2. Color palette

A near-monochrome system. Treat black + white as the brand; everything else is a tint of those.

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FAFAF8` | Page background (warm off-white) |
| `--color-bg-alt` | `#FFFFFF` | Cards / alternating sections |
| `--color-ink` | `#0A0A0A` | Primary text, headings |
| `--color-ink-soft` | `#3A3A3A` | Secondary / body text |
| `--color-muted` | `#737373` | Captions, labels, meta, section numbers |
| `--color-line` | `#E5E5E0` | Hairline dividers, borders |
| `--color-line-strong` | `#0A0A0A` | Emphasis rules / underlines on hover |
| `--color-accent` | `#1A1AFF` | (Sparingly) link/CTA emphasis — optional |
| `--color-accent-ink` | `#FFFFFF` | Text on a solid dark CTA |

**Rules**
- Default surfaces are off-white (`--color-bg`); white (`--color-bg-alt`) is used to lift cards.
- Primary text is `--color-ink`, never pure mid-gray.
- Use exactly **one** accent at a time, and only if a moment truly needs it. The site largely works
  in pure black/white — a black-and-white-only build is on-brand.
- Inverted sections (black background, off-white text) are acceptable for a single feature block.

---

## 3. Typography

**Font family.** Clean modern sans-serif, system-stack first (the site reads as system/neo-grotesque):

```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
--font-mono: ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, monospace;
```

Use `--font-mono` for section numbers, labels, tags, and small metadata to reinforce the technical feel.

**Scale** (desktop; scale down ~20–30% on mobile):

| Role | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|
| Display / hero | `clamp(2.5rem, 6vw, 5rem)` | 700 | 1.02 | `-0.03em` |
| H1 | `2.75rem` | 700 | 1.05 | `-0.02em` |
| H2 / section title | `2rem` | 600 | 1.1 | `-0.02em` |
| H3 | `1.375rem` | 600 | 1.2 | `-0.01em` |
| Body | `1.0625rem` | 400 | 1.6 | `0` |
| Body large (lead) | `1.25rem` | 400 | 1.55 | `0` |
| Label / eyebrow | `0.8125rem` | 500 | 1.2 | `0.08em` (UPPERCASE, mono) |
| Caption / meta | `0.8125rem` | 400 | 1.4 | `0` |

**Rules**
- Headings are tight: negative tracking and line-height near 1.0–1.1.
- Body is roomy: line-height ~1.6, max line length ~65–75ch.
- Eyebrows/labels are UPPERCASE, mono, letter-spaced, in `--color-muted`.
- Big bold headlines may use quotation marks for emphasis (an on-brand device).

---

## 4. Spacing & layout

Spacing scale (8px base):

```css
--space-1: 0.5rem;  --space-2: 1rem;   --space-3: 1.5rem;  --space-4: 2rem;
--space-5: 3rem;    --space-6: 4rem;   --space-7: 6rem;    --space-8: 8rem;
```

- **Container:** max-width `1200px`, centered, horizontal padding `--space-3` (mobile) → `--space-5` (desktop).
- **Section vertical rhythm:** `--space-7` to `--space-8` between major sections — be generous.
- **Grid:** structured 12-col grid; engineer/feature cards in 2–3 column grids with `--space-4` gutters.
- Sections separated by a **thin top rule** (`1px solid --color-line`) plus a numbered eyebrow.

---

## 5. Components

### Section header pattern
```
§ I  ── (mono, muted, uppercase eyebrow)
Big bold title                       (H2, ink, tight tracking)
Optional one-line lead paragraph.    (body-large, ink-soft)
```
Lead each major section with a number + thin divider above it.

### Buttons / CTAs
- **Style:** flat, sharp corners (`border-radius: 0`), no shadow.
- **Primary:** solid `--color-ink` background, `--color-accent-ink` text. Trailing arrow `→` on actions ("Have a call →").
- **Secondary / link:** text-only with an arrow, or a 1px `--color-ink` outline button.
- **Padding:** `0.75rem 1.25rem`. **Weight:** 500. Optional slight letter-spacing.
- **Hover:** invert (dark↔light) or reveal an underline; keep transitions fast (`120–160ms ease`).

### Cards (e.g., engineer profiles)
- Container with `1px solid --color-line` OR no border on `--color-bg-alt`; **no rounded corners, no shadow**.
- Padding `--space-4`. Name (H3) + role (mono label, muted) + short bio + skill tags.

### Tags / chips
- Mono, small, uppercase-ish, `1px solid --color-line`, square corners, tight padding. Not pills.

### Dividers
- Hairline `1px solid --color-line` horizontal rules between sections and list rows.

### Navigation
- Minimal top bar: wordmark left, a few text links right, one CTA. No heavy header bar — often
  transparent over the page background, separated by a thin rule.

---

## 6. Iconography & imagery

- **Icons:** minimal line icons, thin/consistent stroke, monochrome (`--color-ink`). No filled, colorful, or 3D icons.
- **Imagery:** sparse. If photos appear (e.g., engineer headshots), keep them grayscale or muted, square/sharp framing — no soft rounded avatars.
- **Decoration:** arrows (`→`), section numbers, and thin rules are the primary "graphics."

---

## 7. Motion

- Subtle and fast. Fades and small translate-ups on scroll (`150–250ms`, `ease-out`).
- Hover states: instant-feeling inversions / underlines. Avoid bounce, scale-up, or playful easing.

---

## 8. Quick CSS token block (drop-in)

```css
:root {
  /* color */
  --color-bg: #FAFAF8;
  --color-bg-alt: #FFFFFF;
  --color-ink: #0A0A0A;
  --color-ink-soft: #3A3A3A;
  --color-muted: #737373;
  --color-line: #E5E5E0;
  --color-line-strong: #0A0A0A;
  --color-accent: #1A1AFF;        /* use sparingly; B/W-only is fine */
  --color-accent-ink: #FFFFFF;

  /* type */
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-mono: ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, monospace;

  /* spacing (8px base) */
  --space-1: 0.5rem; --space-2: 1rem; --space-3: 1.5rem; --space-4: 2rem;
  --space-5: 3rem;   --space-6: 4rem; --space-7: 6rem;   --space-8: 8rem;

  /* shape */
  --radius: 0px;
  --border: 1px solid var(--color-line);
  --container: 1200px;
}
```

---

## 9. Checklist before shipping a component

- [ ] Off-white background, near-black text, high contrast.
- [ ] Border radius is 0 (sharp edges). No drop shadows. No gradients.
- [ ] Generous whitespace; sections separated by hairline rules + numbered eyebrow.
- [ ] Headings tight (negative tracking); body roomy (~1.6 line-height, ≤75ch).
- [ ] Mono used for labels/numbers/tags; eyebrows are UPPERCASE + letter-spaced.
- [ ] At most one accent color; default to pure black/white.
- [ ] CTAs are flat with a trailing `→`; hover inverts or underlines.

---

> **Note on accuracy.** Tokens above are derived from the live site's brutalist-minimal, near-monochrome
> aesthetic. Exact hex/font values from production CSS were not extracted; the values here are tuned to
> reproduce the look faithfully. If you later read the site's real stylesheet, update this file with the
> exact values and bump the note. Data for the app lives in `src/data/data.json` (query it via `src/data/queries.js`).
