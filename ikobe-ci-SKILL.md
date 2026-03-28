---
name: ikobe-ci
description: "IKOBE Corporate Identity Skill for web apps. Apply this skill whenever creating, styling, or modifying a web application (React, HTML, CSS) for IKOBE or one of its products (MOBBIT, CHECKIDY, Talentometer, BegabungsCheck, KompetenzCheck, BerufsCheck, T.I.M.O.S., CHOOSY). Use this skill when the user mentions IKOBE styling, CI, corporate design, app design, colors, theming, or when building any new IKOBE web tool from scratch. Also trigger when the user asks for consistency across IKOBE apps or wants to match the look of an existing IKOBE product."
---

# IKOBE Corporate Identity for Web Apps

You are building or styling a web application for **IKOBE – Institut für Kompetenz und Begabung**. This skill ensures every IKOBE web app looks professional, consistent, and immediately recognizable as part of the IKOBE brand family.

## Why consistency matters

IKOBE develops diagnostic tests and tools for parents, teachers, and counselors. The target audience ranges from worried parents to school psychologists. The design must feel trustworthy, warm, and professional — not cold or clinical. Every IKOBE app should feel like it belongs to the same family, so users who know one product instantly feel at home in another.

## Brand Colors

Use CSS custom properties for all colors. Define them in `:root` so they're available globally.

```css
:root {
  /* Primary brand color — used for headings, buttons, links, accents */
  --ikobe-pink: #d63384;
  --ikobe-pink-light: #f0c0d8;
  --ikobe-pink-bg: #fdf2f7;     /* very light pink for backgrounds/highlights */

  /* Neutral palette */
  --ikobe-gray: #555555;         /* body text */
  --ikobe-gray-light: #888888;   /* secondary text, captions */
  --ikobe-gray-bg: #f5f5f5;     /* page background, card backgrounds */
  --ikobe-white: #ffffff;
  --ikobe-black: #333333;        /* headings, bold text */

  /* Logo bar colors (7 bars in 2 groups, left to right) */
  --ikobe-bar-1: #f48fb1;  /* rosa/salmon */
  --ikobe-bar-2: #8bc34a;  /* lime-grün */
  --ikobe-bar-3: #9c27b0;  /* lila/magenta */
  /* gap between groups */
  --ikobe-bar-4: #ffb74d;  /* orange/gold */
  --ikobe-bar-5: #29b6f6;  /* hellblau/cyan */
  --ikobe-bar-6: #4db6ac;  /* türkis/mint */
}
```

### When to use which color

| Color | Use for |
|-------|---------|
| `--ikobe-pink` | Primary buttons, section headings, links, active states, progress bars |
| `--ikobe-pink-light` | Borders on focus/active inputs, subtle accents |
| `--ikobe-pink-bg` | Hero backgrounds, highlighted cards, selected states |
| `--ikobe-gray` | Body text |
| `--ikobe-gray-light` | Captions, footnotes, timestamps |
| `--ikobe-gray-bg` | Page background, alternating table rows |
| `--ikobe-black` | Headings, bold labels |
| Logo bar colors (7 bars) | Only for the logo itself and decorative accents where a multicolor palette is needed (e.g., result level badges) |

## Typography

```css
font-family: 'Open Sans', system-ui, -apple-system, sans-serif;
font-size: 16px;
line-height: 1.6;
```

- **Headings** (`h1`–`h4`): `font-weight: 600`, `line-height: 1.3`
- **Body text**: `color: var(--ikobe-gray)`, regular weight
- **Small/caption text**: `color: var(--ikobe-gray-light)`, `font-size: 14px` or smaller

## Logo

The IKOBE logo consists of **7 vertical colored bars** of varying heights arranged in two groups with a small gap, followed by the word **IKOBE** in a distinctive typeface where the "E" is a stylized epsilon (ε). Below the logo text sits the subtitle "Institut für Kompetenz und Begabung".

The bars transition visually into the dark vertical strokes of the "IKOBE" lettering — the rightmost bars blend into the letter shapes.

### Bar specification (left to right)

| Bar | Color | Approximate height | CSS variable |
|-----|-------|-------------------|--------------|
| 1 | Rosa/Salmon | 75% | `--ikobe-bar-1` |
| 2 | Lime-Grün | 60% | `--ikobe-bar-2` |
| 3 | Lila/Magenta | 40% | `--ikobe-bar-3` |
| *(gap)* | | | |
| 4 | Orange/Gold | 65% | `--ikobe-bar-4` |
| 5 | Hellblau/Cyan | 100% (tallest) | `--ikobe-bar-5` |
| 6 | Türkis/Mint | 70% | `--ikobe-bar-6` |
| 7+ | Dunkel (transition) | varies | Part of "IKOBE" lettering |

### Important logo details
- The "E" in IKOBE is **not a standard E** — it's a backwards-3 / epsilon (ε) shape. This is a defining brand element.
- There is a **visible gap** between bar 3 (lila) and bar 4 (orange) — the bars form two visual groups.
- The bars are **not all the same width** — some are slightly wider than others.
- On dark backgrounds, "IKOBE" text is white; on light backgrounds, it's near-black.

### Using the logo in web apps

**Always use the original logo image files** — do NOT try to recreate the logo with CSS bars and text, because the "IKOBε" typeface and bar proportions cannot be accurately reproduced with code.

Logo image files are stored in `src/assets/`:
- `ikobe-logo-light-bg.png` — dark text, for use on white/light backgrounds (standard)
- `ikobe-logo-dark-bg.png` — white text, for use on dark backgrounds
- `ikobe-logo-outline.png` — outline version

```jsx
import logoLight from '../assets/ikobe-logo-light-bg.png';

<header className="app-header">
  <div className="ikobe-logo">
    <img src={logoLight} alt="IKOBE – Institut für Kompetenz und Begabung" className="logo-img" />
  </div>
  <span className="header-url">www.ikobe.de</span>
</header>
```

The header is **sticky** (`position: sticky; top: 0`), white background, with a subtle bottom border (`1px solid #eee`).

### Logo CSS

```css
.ikobe-logo { display: flex; align-items: center; }
.logo-img { height: 36px; width: auto; }  /* adjust height to fit header */
```

> **Important:** Never attempt to rebuild the logo with CSS shapes and text. The IKOBε typeface uses a custom epsilon character and precise bar proportions that cannot be matched with standard fonts. Always embed the image.

## Layout Principles

- **Max width**: `900px`, centered with `margin: 0 auto`
- **Container**: white background with soft shadow (`box-shadow: 0 0 40px rgba(0,0,0,0.08)`)
- **Page background**: `var(--ikobe-gray-bg)` (light gray)
- **Content padding**: `30px 40px` for main content sections
- **Mobile**: reduce padding to `20px` on screens < 600px
- **Cards/sections**: white background, rounded corners (`border-radius: 12px`), subtle border or shadow

## Buttons

### Primary button (CTA)
```css
.btn-primary {
  background: var(--ikobe-pink);
  color: white;
  border: none;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit;
}
.btn-primary:hover {
  background: #b82870;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(214, 51, 132, 0.3);
}
```

### Secondary button (outline)
```css
.btn-secondary {
  background: white;
  color: var(--ikobe-pink);
  border: 2px solid var(--ikobe-pink);
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit;
}
.btn-secondary:hover {
  background: var(--ikobe-pink-bg);
}
```

### External link button (e.g., booking)
Use a distinct color (blue `#2196f3`) to differentiate from primary actions:
```css
.btn-external {
  background: #2196f3;
  color: white;
  /* same padding, font, radius as primary */
}
.btn-external:hover {
  background: #1976d2;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(33, 150, 243, 0.3);
}
```

## Footer

Simple, understated footer with product name on the left and copyright on the right.

```css
.app-footer {
  display: flex;
  justify-content: space-between;
  padding: 16px 32px;
  font-size: 12px;
  color: var(--ikobe-gray-light);
  border-top: 1px solid #eee;
}
```

Footer text pattern: `[Product name] – [Tagline]` | `© Copyright – Alle Rechte bei IKOBE`

## Section Headings

Section headings use the pink accent color:
```css
h2 {
  color: var(--ikobe-pink);
  font-size: 20px;
  margin-bottom: 12px;
}
```

## Links

```css
a {
  color: var(--ikobe-pink);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
```

## Page Transitions

Smooth fade-in/fade-out between views:
```css
.page-enter { opacity: 1; transform: translateY(0); }
.page-exit { opacity: 0; transform: translateY(-10px); }
.page-wrapper { transition: opacity 0.3s ease, transform 0.3s ease; }
```

## Content Layout Patterns

IKOBE apps often present informational content alongside interactive tools. These layout patterns keep things readable and visually organized.

### Two-column layout (for info pages)
Use a two-column grid for content-heavy pages (e.g., introductions, explanations, feature overviews). On mobile (<600px), collapse to single column.

```css
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin: 20px 0;
}
@media (max-width: 600px) {
  .two-col { grid-template-columns: 1fr; }
}
```

### Icon cards (for category/feature selection)
When presenting a set of options or categories (e.g., CHOOSY's "Entscheidungsfelder"), use a card grid with icons. Each card has a colored icon/emoji at the top, a bold title, and a short description.

```css
.icon-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
.icon-card {
  background: white;
  border-radius: 12px;
  padding: 24px 20px;
  text-align: center;
  border: 1px solid #eee;
  transition: transform 0.2s, box-shadow 0.2s;
}
.icon-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}
.icon-card .card-icon { font-size: 32px; margin-bottom: 12px; }
.icon-card .card-title { font-weight: 600; color: var(--ikobe-black); margin-bottom: 8px; }
.icon-card .card-desc { font-size: 14px; color: var(--ikobe-gray-light); }
```

### Result/score displays
For diagnostic results, use a prominent score display with a colored badge showing the result level. The badge color matches the product's secondary accent (see product table below). MOBBIT uses 4 severity levels: green → orange → red → purple.

## Product-Specific Adaptations

Each IKOBE product can have its own accent alongside the pink. Use this pattern:

| Product | Use case | Secondary accent | Notes |
|---------|----------|-----------------|-------|
| **MOBBIT** | Mobbing-Erkennung | Orange `#ff9800` for warning levels | 4 result levels with traffic-light colors (green/orange/red/purple) |
| **CHOOSY** | Berufs- und Studienwahltest | Light blue `#03a9f4` for section headings and accents | Uses two-column layouts and icon-card grids for "Entscheidungsfelder" |
| **Talentometer** | Talent-Diagnostik | Green `#8bc34a` for positive results | |
| **BegabungsCheck** | Begabungstests | Blue `#2196f3` for informational | |
| **KompetenzCheck** | Kompetenzanalyse | Blue `#2196f3` | |
| **T.I.M.O.S.** | Internet-/Mediensucht | Purple `#9c27b0` for caution | |
| **BerufsCheck** | Berufsorientierung | Blue `#2196f3` | |
| **CHECKIDY** | Online-Plattform | Use full brand palette | Portal that aggregates all products |

The primary pink (`--ikobe-pink`) always stays as the main brand color. Product accents are used for product-specific headings, result badges, charts, status indicators, and category highlights. When a product has its own accent, use it for `h2`/`h3` section headings within that product's pages to give it a distinct but still on-brand feel.

## PDF Output Styling

Many IKOBE tools generate a downloadable PDF result report. Use **jsPDF** with **jspdf-autotable** (v5+). Important: jspdf-autotable v5 requires explicit plugin registration:

```js
import jsPDF from 'jspdf';
import { applyPlugin } from 'jspdf-autotable';
applyPlugin(jsPDF);
```

PDF styling should mirror the web app's CI:
- Header: IKOBE logo (colored bars drawn as rectangles) top-left, `www.ikobe.de` top-right
- Footer: product name left, `© Copyright – Alle Rechte bei IKOBE` center, page number right
- Use the same pink (`#d63384`) for headings and accents
- Use the product's secondary accent for result badges/charts
- Font: Helvetica (built into jsPDF) as a stand-in for Open Sans
- Body text: `#555555`, headings: `#333333`

## Checklist

Before delivering any IKOBE web app, verify:

- [ ] CSS custom properties defined in `:root` using the exact color values above
- [ ] Font is Open Sans (with system-ui fallback)
- [ ] Logo with 7 colored bars (2 groups with gap) + "IKOBε" text in sticky header
- [ ] `www.ikobe.de` shown in header (top right)
- [ ] Pink primary buttons, outline secondary buttons
- [ ] Section headings in pink (or product accent color if applicable)
- [ ] Max width 900px, centered, white container on gray background
- [ ] Footer with product name + copyright
- [ ] Mobile-responsive (padding reduces below 600px)
- [ ] Page transitions (fade in/out)
- [ ] If PDF export exists: jspdf-autotable v5 uses `applyPlugin(jsPDF)`
- [ ] Product accent color applied correctly (not overriding pink entirely)

## Contact Information (for footers, contact sections)

```
IKOBE Institut für Kompetenz und Begabung
Hauptstraße 25, 86498 Kettershausen
Mobil/WhatsApp/SMS: 0049-173 / 35 90 314
E-Mail: tvk@ikobe.de
Web: www.ikobe.de
```
