# Aximest

A Next.js recreation of the [webisoft.com](https://webisoft.com) design language —
layout, grid, motion and interaction — rebranded as **Aximest**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript
- **Lenis** for smooth scrolling
- **Geist / Geist Mono** as the typeface pair
- CSS Modules + a token layer in [globals.css](app/globals.css) (no component library)

## Design system

Tokens live at the top of [app/globals.css](app/globals.css) and mirror the reference site's:

| Token | Value |
| --- | --- |
| `--red-500` | `#de5849` — hero, footer, accents |
| `--grey-100 … --grey-900` | `#f0f1f4` … `#666` |
| `--border` | `1px dashed var(--grey-700)` — the signature rule between rows |
| `--grid-columns` / `--grid-gutter` / `--grid-margin` | `12` / `16px` / `18px` |
| `--clamp-*` | fluid sizes computed against a 1440px design width |
| `--ease-power2-out`, `--ease-power3-out`, `--ease-expo-out` | motion curves |

Layout is a 12-column grid: the `/ LABEL` sits in columns 1–3, display copy starts at
column 4, and the right rail (counts, panels, asides) runs from column 10.

## Motion

| Effect | Where |
| --- | --- |
| Masked line/word reveals on scroll | `useRevealGroup` + `data-reveal="mask"` |
| Per-character roll on link hover | [RollText](app/components/RollText.tsx) |
| Label swap on button hover | `hoverLabel` prop on [Button](app/components/Button.tsx) |
| Pointer-biased blind stack | [Hero](app/components/Hero.tsx) |
| Scroll-driven word highlight | [Intro](app/components/Intro.tsx), [Testimonial](app/components/Testimonial.tsx) |
| Drag carousel with follow-cursor | [Clients](app/components/Clients.tsx) |
| Lerped custom cursor | [Cursor](app/components/Cursor.tsx) |

Every scroll effect is disabled under `prefers-reduced-motion: reduce`.

> **`data-reveal` gotcha:** a reveal target inside an `overflow: hidden` mask is clipped
> out of the viewport, so IntersectionObserver never fires on it. Put
> `data-reveal="mask"` on the *mask wrapper* and animate the inner span from it.

## Swapping in real assets

Two things are deliberate stand-ins:

1. **Typography.** The reference uses Helvetica Now Display/Text and Suisse Intl Mono,
   which are commercial. Geist and Geist Mono are close free substitutes. To switch,
   replace the `--font-display` / `--font-text` / `--font-mono` values in
   `globals.css` and the font imports in [layout.tsx](app/layout.tsx).
2. **Imagery.** [Media.tsx](app/components/Media.tsx) generates monochrome SVG
   placeholders wherever photography belongs (client cards, testimonial background,
   the strip above the footer). Replace its body with `next/image` — the surrounding
   layout needs no changes. [ServiceGlyph.tsx](app/components/ServiceGlyph.tsx) holds
   the abstract service marks, and [Icons.tsx](app/components/Icons.tsx) the logo
   monogram.

## Content

All copy, navigation, services, offices and contact details are in one file:
[app/lib/site.ts](app/lib/site.ts).

## Routes

`/` · `/contact` · `/projects` · `/podcasts` · `/articles` · `/terms` · `/privacy` ·
`/services/[slug]` (5 statically generated). Everything prerenders as static HTML.
