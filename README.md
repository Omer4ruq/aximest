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
- **Swiper** for the clients carousel (the same library, effect and settings the reference uses)
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
| Scroll-driven blind wave (pointer nudges the phase) | [Hero](app/components/Hero.tsx) |
| Scroll-driven word highlight | [Intro](app/components/Intro.tsx), [Testimonial](app/components/Testimonial.tsx) |
| Stacked sticky service cards | [Services](app/components/Services.tsx) |
| Cross-fading tab panel with staggered rows | [Pillars](app/components/Pillars.tsx) |
| Hero sliding off a pinned section | [Hero](app/components/Hero.tsx) + [ChromeMark](app/components/ChromeMark.tsx) |
| Swiper creative-effect drag carousel | [Clients](app/components/Clients.tsx) |
| Lerped custom cursor | [Cursor](app/components/Cursor.tsx) |

Every scroll effect is disabled under `prefers-reduced-motion: reduce`.

The hero's blind stack is a triangle wave: scroll advances its phase, each bar
samples it at its own offset, and the diagonal sweeps down the stack. The
constants in [Hero.tsx](app/components/Hero.tsx) (`SCROLL_SPEED`, `SPREAD`) and the
bar geometry in `Hero.module.css` were measured off the reference frame by frame.

**Stacked service cards.** Each `<li>` is `position: sticky; top: 0` *and*
`transform: translateY(index * 4em)`. A transform moves only where the element
paints, not the box sticky pins, so the cards come to rest 4em apart and their
headers pile up. The negative `margin-bottom` cancels that shift in flow and the
list's bottom padding gives it back, so the section keeps its full scroll length.
Each card is opaque, which is what hides the one stacked above it.

**Expertise / Values / Methodology.** One panel, not three stacked sections. All
three cards share the grid cell `1 / 1 / 2 / 2`, so the panel is exactly one card
tall and never resizes when you switch; inactive cards are `visibility: hidden`.
Switching away resets that card's rows to `translateX(-4em)`, so returning replays
the 0.1s-per-row stagger — and each row's dashed rule wipes in left-to-right via
`clip-path`. The active tab is `grey-100` filled (not black); black is its hover
state, same as the reference.

**Clients carousel.** The reference runs Swiper with `effect: 'creative'`, so the
wrapper never translates — each slide is transformed instead. The outgoing card
recedes (`translateZ(-400px)`, `scale(0.75)`, `opacity: 0`) while the incoming one
slides in from `100%`. Config read straight off the reference instance: `speed: 300`,
`threshold: 5`, `resistanceRatio: 0.85`, `longSwipesRatio: 0.5`, `slidesPerView: 1`.
Swiper sets `touch-action: pan-y` itself, so vertical page scrolling still works over
the slider on touch devices.

**Hero over ChromeMark.** The chrome section is pulled up with `margin-top: -100svh`
so its sticky child pins from scroll 0, and the hero (`z-index: 2`) scrolls up off it
rather than pushing it down the page.

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

| Route | Design |
| --- | --- |
| `/` | Red blinds hero → pinned chrome mark → services → clients → tabs → testimonial → CTA |
| `/services/[slug]` | Black hero with the oversized abbreviation over an image, black body with a sticky index column and capability list, then a white staggered sub-service grid (5 pages, statically generated) |
| `/projects` | Black. Title + statement, filter pills, numbered accordion |
| `/expertise` | Black. Sticky left column with pills, filterable accordion of the stack |
| `/contact` | "→ Connect" marquee title, grey form panel whose dashed divider bleeds past it, offices below |
| `/podcasts` | Two-up cards with tag pills and a status chip |
| `/articles` | Search + pagination over a four-column card grid |
| `/terms`, `/privacy` | Centred title over a grey panel of numbered sections |

Everything prerenders as static HTML — 16 routes.

**Dark pages** set `data-theme="dark"` on `<body>` via
[PageTheme](app/components/PageTheme.tsx), which flips `--body-bg-color`,
`--body-color` and `--border`. Anything built on those tokens follows
automatically; the header card keeps its own light surface and its CTA switches
to a white outline.
