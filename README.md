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
| Pointer-driven blind stack on canvas | [HeroLines](app/components/HeroLines.tsx) |
| Grid page transition between routes | [PageTransition](app/components/PageTransition.tsx) |
| Scroll-driven word highlight | [Intro](app/components/Intro.tsx), [Testimonial](app/components/Testimonial.tsx) |
| Stacked sticky service cards | [Services](app/components/Services.tsx) |
| In-view reveals and column parallax | [useInView](app/hooks/useInView.ts) |
| Cross-fading tab panel with staggered rows | [Pillars](app/components/Pillars.tsx) |
| Hero sliding off a pinned section | [Hero](app/components/Hero.tsx) + [ChromeMark](app/components/ChromeMark.tsx) |
| Swiper creative-effect drag carousel | [Clients](app/components/Clients.tsx) |
| Lerped custom cursor | [Cursor](app/components/Cursor.tsx) |

Every scroll effect is disabled under `prefers-reduced-motion: reduce`.

The hero's blind stack is drawn on a canvas, as the reference does, and is
**pointer-driven** rather than scroll-driven. Each of the 14 lines owns a slot of
the box (`height / 14` minus a gutter of `height * 4.5/390`); within its slot a
line is full height at the left and steps down to a tail that runs to the right
edge. The tail is `idleRatio` of the slot, tapering `12/22 -> 6/22` down the
stack, and the wedge above it adds `interactiveRatio`, tapering `10/22 -> 5/22` —
so the left edge tapers 1.0 -> 0.5 of the slot, which is the 26px -> 12px
measured at 1440.

Where each wedge ends is the interaction: the line under the cursor gets offset
0 (its wedge reaches fully right) and the rest pull left by
`|hovered - i| / 13 * maxOffset`, with `maxOffset = width * 100/1408 * 13 * 0.8`.
Offsets lerp at 0.15 per frame, which is what makes it feel liquid. Scrolling
re-resolves which line is under the cursor, so the stack reacts to scroll too.
Because the lines are sized from the box rather than in fixed pixels, they stay
proportional at any viewport — a fixed-px version reads noticeably thinner.

**Hero and reveal.** The hero is exactly `100svh`: a flex column where the grid
labels take `margin-top: auto`, the 14-bar blind stack takes `flex: 3`, and the
footer places the wordmark on columns 1-9 (`max(0px, 12.2vw)`, ~127px tall) with
the explore cue on 10-12. The header bar runs on the same 12-column grid — card
1-4, statement 7-9 (indented one column), CTA 10-12 at two columns wide.

Below it, the reveal is pulled up `-100svh` and is two folds tall with two folds
of top padding. The chrome mark is pinned behind it at `z-index: -1` for the
section's whole length, so the grid labels and then the opening statement scroll
*across* it rather than sitting in a section of their own — the statement's words
warm from `#A7A7A7` to full contrast between "top bottom" and "center center".

**Testimonial parallax.** The background wrapper travels from `-speed * 100%` to
`+speed * 100%` (speed 0.15) as the section crosses the viewport, and the artwork
carries `scale(var(--parallax-scale))` where the scale is
`1 + |viewportHeight * speed * 2| / elementHeight` — just enough that it still
covers at either end of the travel. Skipped on coarse pointers under 1024px, as
the reference does. Lives in `useParallax` in [useInView](app/hooks/useInView.ts).

**Service glyphs.** The reference plays a looping Lottie in each service panel,
`aspect-ratio: 2`, full panel width, `mix-blend-mode: multiply`.
[ServiceGlyph](app/components/ServiceGlyph.tsx) fills the same frame with marks
that carry their own CSS loops — drifting discs, marching chevrons, a bar wave,
breathing blocks, counter-rotating rings — all stopped under reduced motion.

**Stacked service cards.** Each `<li>` is `position: sticky; top: 0` *and*
`transform: translateY(index * 4em)`. A transform moves only where the element
paints, not the box sticky pins, so the cards come to rest 4em apart and their
headers pile up. The negative `margin-bottom` cancels that shift in flow and the
list's bottom padding gives it back, so the section keeps its full scroll length.
Each card is opaque, which is what hides the one stacked above it. The card pads
`var(--grid-gutter) 0` and the title is 32px/1.0, so the collapsed band is exactly
16 + 32 + 16 = 4em and the stacked titles keep their breathing room.

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

**Closing statement.** Rendered from the root layout, so it closes every route —
the reference carries the identical block on all of them, `/contact` and the legal
pages included. It declares no theme of its own, so whatever a page has latched by the
time you reach the bottom is what it renders on: white on `/`, `/contact` and the
service pages, white-on-black on `/expertise` and `/projects`. (The reference keeps it
white everywhere; here it follows the page.) "We Drive Your Systems Fwrd" is the
reference's
`c-footer-section-title`: a 12-column subgrid of four masked lines at
`max(0px, 13.8889vw)` (200px at 1440), `line-height: 80%`,
`letter-spacing: -0.02em`. Line 1 spreads `We`/`Drive` across the full width,
line 2 is capped at nine columns, line 4 is right-aligned. Each line starts at
`translateY(100%)` inside a clip that is open at the sides, then rises on a 0.1s
stagger; the arrow line additionally slides from `-1em` to `0` a further 0.3s
later, and the last line's inner span tracks scroll from `-100%` to `0`.

That last travel is measured against the four-line `<h2>`, not the section.
`0` progress is the block's top at the viewport bottom, `1` is its bottom past the
viewport top, so the range is `viewport + block height` — and the block has to be the
same one the reference measures. Ours also carries its vertical padding and the chrome
strip below it (1200px against the title's 640px), and measuring that stretched the
travel over so much scroll that the word was still 4px short of the right margin when
the page ran out of room to scroll. Measured against the title alone, the range matches
the reference's `c-footer-section-title` to within a few px per sample.

**Button labels.** A button keeps a hidden twin of its label in the same grid
cell (`opacity: 0; color: transparent`). Without it, the hover scramble empties
the text for a frame and the button collapses and snaps back — the reference
carries the same duplicate for exactly this reason. Verified: the header CTA
holds 190x32 through the whole scramble.

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
The item list carries `data-lenis-prevent` and `overscroll-behavior: contain`:
smooth scroll otherwise swallows wheel and touch events over the panel, so a
list taller than the viewport — an expanded submenu on a short screen — cannot
be scrolled and the items below it stay unreachable.
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
900px view), then holds to the end of the page. The tab nav and its panel sit
flush — the nav's own `padding-bottom` is the only separation the reference uses.

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
`clip-path`. `visibility` is transitioned with a 0.5s delay so the outgoing card
actually crossfades rather than popping out on the first frame. The panel also
carries the reference's oversized index number (`max(0px, 13.8889vw)` — 200px at
1440, `line-height: 0.77`) sitting bottom-left in columns 1-3. The active tab is `grey-100` filled (not black); black is its hover
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

**Selected work helix.** [WorkTornado.tsx](app/components/WorkTornado.tsx) is the one
section with no counterpart on the reference — the homepage had no work section, so
this fills that gap. Six project cards orbit a vertical axis, each `40deg` further
round and `0.35` of a card height above the one below, which traces a helix. The
section is `300svh` tall with a `100svh` sticky stage inside it, and scroll position
inside that range scrubs the rotation; the last sixth of the scroll holds on the final
card so it is readable before the section lets go. Dragging adds an offset on top of
the scrubbed position and decays out, so you can spin the stack by hand without losing
your place in the scroll.

Geometry is driven entirely by the stage's `font-size` (`max(9px, 0.88vw)`) — card
width, orbit radius (`45em`) and vertical gap are all in `em`, so one declaration
scales the whole helix. Cards wrap into `[-n/2, n/2]` so the loop is endless, and the
deck is repeated 2-4 times (measured from stage height, repeats are `aria-hidden`) so
there is always a card entering. Depth is read off `cos`: cards turned away are
darkened and blurred, and only the card within half a step of front takes pointer
events, so the Explore link is never stolen by a card behind it. A press that travels
under 6px still counts as a click.

Once the rotation is done the last card holds still for half a viewport (`HOLD`) — the
helix eases toward its target rather than snapping to it, so on the frame the rotation
ends the last card is still settling, and this is the beat where it comes square to the
viewer. After that, one more viewport of the section is left over. Rather than let an
empty black stage scroll past before the next section arrives, the block that
follows is pulled up by exactly that leftover viewport (`.climb` in
[page.module.css](app/page.module.css)) and lifted above the sticky stage in paint
order, so Pillars climbs over the held helix — the same trick the hero uses over
ChromeMark, and it costs the page no extra length. Pillars carries a header-clearance
top padding because it now lands flush with the top of the viewport. The climb is
scoped to the exact conditions under which the helix renders (≥1024px, motion not
reduced); below those the fallback list is in normal flow with no negative margin.

The section sits in a `<ThemeZone theme="dark">`, so entry and exit are handled by the
existing canvas theme morph rather than anything bespoke. The negative margin moves the
following zone's top with it, so the morph back to light still fires exactly as Pillars
reaches the top of the screen. A two-axis scrim on the
sticky wrapper sinks cards into the black behind the heading — the stage is a
perspective context, so its cards' `z-index` values stay inside it and one layer covers
them all. Below 1024px, and under `prefers-reduced-motion`, the same six projects
render as a plain grid instead.

> **`data-reveal` gotcha:** a reveal target inside an `overflow: hidden` mask is clipped
> out of the viewport, so IntersectionObserver never fires on it. Put
> `data-reveal="mask"` on the *mask wrapper* and animate the inner span from it.

## Icons

The app icons are built from the `Mark` monogram in
[Icons.tsx](app/components/Icons.tsx) — the two chevrons and dot, black on the same
`--red-500` the header menu's footer uses, so the tab matches the identity card.
[app/icon.svg](app/icon.svg) is the source; `favicon.ico` (16 + 32px frames) and
`apple-icon.png` (180px) are rasterised from it. Next picks all three up by file
convention and emits the `<link>` tags itself — see
`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/app-icons.md`.
To restyle, edit `icon.svg` and re-render the two rasters from it.

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
| `/` | Red blinds hero → hero reveal (pinned chrome mark with the opening statement scrolling over it) → services → clients → tabs → testimonial → CTA |
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
