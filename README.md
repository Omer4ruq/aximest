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
| `--clamp-*` | `max(Npx, N/1440*100vw)` — the 1440px design size, floored in px and **growing above 1440** |
| `--ease-power2-out`, `--ease-power3-out`, `--ease-expo-out` | motion curves |

Layout is a 12-column grid: the `/ LABEL` sits in columns 1–3, display copy starts at
column 4, and the right rail (counts, panels, asides) runs from column 10.

## Motion

| Effect | Where |
| --- | --- |
| Masked line/word reveals on scroll | `useRevealGroup` + `data-reveal="mask"` |
| Per-character roll on link hover | [RollText](app/components/RollText.tsx) |
| Character scramble on entry and on button hover | [Scramble](app/components/Scramble.tsx) |
| Scroll-driven blind wave (pointer nudges the phase) | [Hero](app/components/Hero.tsx) |
| Grid page transition between routes | [PageTransition](app/components/PageTransition.tsx) |
| Scroll-driven word highlight | [Intro](app/components/Intro.tsx), [Testimonial](app/components/Testimonial.tsx) |
| Stacked sticky service cards | [Services](app/components/Services.tsx) |
| In-view reveals and column parallax | [useInView](app/hooks/useInView.ts) |
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

**Entry scramble.** Mono labels shuffle into place the first time they reach the
viewport — the page's signature load animation. Measured off the reference frame by
frame: the text empties, then reveals left to right at ~95ms per character, with a
tail that widens from one glyph to three running ahead of the settled prefix and
re-rolling every 45ms. The glyph pool is the wordmark's own letters plus digits
(`AXIMEST0123456789`), which is why the noise reads as branded rather than random —
the reference does the same with `WEBISOFT`. Elements carry staggered delays
(0.1–0.6s). The real text is server-rendered and mirrored in `aria-label`, so it is
present without JavaScript and stable for screen readers while the glyphs churn;
`prefers-reduced-motion` skips the effect entirely. The same routine drives the
hover effect on every button.

**Type scale.** Every size token is `max(floorPx, vw)`, not `clamp(min, vw, max)`.
The distinction matters: the reference's scale has no upper bound, so on a 1920px
display its body text is 21.3px and its buttons 16px/43px tall rather than the
1440px values. Capping the clamp leaves the whole interface visibly smaller than
the reference on any screen wider than 1440. `--grid-gutter` and `--grid-margin`
are both `--clamp-16`, so the grid scales with the type.

**Navigation panel.** Four grid columns wide (459px at 1440), anchored under the
identity card and running to the bottom margin, with 56px rows, a 24px display
label per item, and a red call-to-action filling the last 120px. The rest of the
page is blurred behind it (`backdrop-filter: blur(15px)`) rather than covered.
Note: write `backdrop-filter` alone — adding a hand-written `-webkit-` line made
the build drop the standard property and keep only the prefixed one.

**Page transitions.** Moving between routes runs the reference's transition: a
full-screen canvas divided into a grid (11x11 on desktop, 6x10 under 700px) whose
cells fade to black in random order to cover the outgoing page, then clear away in
random order to reveal the incoming one. Each cell takes 0.3s, start times are
spread over a 0.35s stagger, so a pass lasts 0.65s; the per-cell curve is
`0.5 * (1 - cos(PI * t))`, and rects are drawn one pixel oversized to hide seams.

The reference is a multi-page app, so it stores a `sessionStorage` flag, does a real
navigation, and replays the reveal on arrival behind a CSS curtain. With the App
Router there is no document swap — the click handler covers, calls
`router.push`, and a pathname change triggers the reveal. The reveal is keyed off
the path actually changing rather than a "first render" flag, which keeps it from
firing on a direct load under React's double-invoked development effects.
`prefers-reduced-motion` navigates immediately with no canvas.

**Inner-page reveals.** The reference pairs `data-in-view` with an `is-inview`
class; the CSS holds the "before" state and JS only flips the switch.
[useInView](app/hooks/useInView.ts) does the same. Measured values, per block:

- **List rows** (service capabilities, homepage pillars): slide in from
  `translateX(-4em)` over 0.6s, staggered 0.1s per row, with the dashed rule
  wiping in left-to-right via `clip-path: inset(0 100% 0 0)` → `inset(0)`.
- **Accordion rows** (projects, expertise): number and name rise out of a mask
  from `translateY(100%)`; the category follows at +0.3s and the plus at +0.4s,
  all staggered 0.1s per row.
- **Card grids** (articles, podcasts): fade from `translateY(3em)`, staggered
  0.1s per column.

Note the inner-page *headers* deliberately have no reveal. The reference's hero
and section titles do not animate at all: polling them through load shows no
opacity, transform or clip-path change; the stylesheet has no keyframes beyond
the blink/dropdown/swiper helpers; and the markup carries no split-text or
reveal markers. The only entry motion on a hero is the scramble on its mono
labels — on a service page that is the counter over the media (0.2s) and the two
footer items (0.3s / 0.4s), while the index and page title stay static.

**Scroll-driven theme.** A service page starts on black and turns white as the
sub-service grid scrolls in. [PageTheme](app/components/PageTheme.tsx) declares a
page's base theme and any `ThemeZone` below it takes over once its top crosses a
probe line 10% into the viewport (measured: the section top sits ~89px down a
900px view), then holds to the end of the page.

The colour change is not a CSS transition — it is painted. A second canvas
(`theme-transition-canvas`, `position: fixed`, `z-index: -1`, so it sits behind the
content but above the body's own background) divides the viewport into an 11x11
grid and recolours the cells from the old background to the new one. Cells are
ordered by distance from the **top-centre** of the grid, so the new colour ripples
out from there and downward; each cell takes 0.4s, start times spread over 0.4s,
total 0.8s. The `data-theme` attribute flips immediately, so text and cards
recolour at once while the background paints across behind them — which is why
card colours live in `--card-bg-color` / `--card-color` rather than being
hard-coded, and why the sections themselves must stay transparent or they would
cover the canvas. Scrolling back up plays the morph in reverse.

**Cards.** Geometry and type measured off the reference: four per row,
`min-height: max(440px, 30.5556vw)` (340 x 440 at 1440), title 32px/1.0, body
16px/1.1, mono label and CTA both 12px. A header with a stacked mono label and a
`--clamp-11` indicator dot, the title at the top with the copy pushed to the
bottom, and a dashed-top footer. On hover the whole card washes to `--red-500`
with black text — the indicator dot and the footer rule follow, and the arrow
blinks on a `step-end` animation.

**Service card parallax.** The sub-service grid is the reference's
"scrolling cards" block: each card is pushed down by a per-column offset
(`2vw / 6vw / 14vw / 9vw`, i.e. 28.8 / 86.4 / 201.6 / 129.6px at 1440) and eases
back to zero as the grid rises through the viewport. Easing toward the target
rather than snapping is what makes the deeper columns lag, which is where the
scattered look comes from. `--card-offset` is registered with `@property` so
`getComputedStyle` resolves its `clamp()` to real pixels — an unregistered custom
property comes back as the literal token and the maths silently yields zero.

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
| `/services/[slug]` | Black hero with the oversized abbreviation over an image, black body with a sticky index column and capability list, then a sub-service grid that turns the page white as it scrolls in (5 pages) |
| `/services/[slug]/[sub]` | Detail page behind every card's Explore link — 44 statically generated pages |
| `/projects` | Black. Title + statement, filter pills, numbered accordion |
| `/expertise` | Black. Sticky left column with pills, filterable accordion of the stack |
| `/contact` | "→ Connect" marquee title, grey form panel whose dashed divider bleeds past it, offices below |
| `/podcasts` | Two-up cards with tag pills and a status chip |
| `/articles` | Search + pagination over a four-column card grid |
| `/terms`, `/privacy` | Centred title over a grey panel of numbered sections |

Everything prerenders as static HTML — 60 pages.

**Dark pages** set `data-theme="dark"` on `<body>` via
[PageTheme](app/components/PageTheme.tsx), which flips `--body-bg-color`,
`--body-color` and `--border`. Anything built on those tokens follows
automatically; the header card keeps its own light surface and its CTA switches
to a white outline.
