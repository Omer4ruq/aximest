"use client";

import { useEffect, type ReactNode } from "react";

type Theme = "light" | "dark";

const ZONE_ATTR = "data-theme-zone";

/* Theme-morph grid, matching the reference's module. */
const GRID = 11;
/** Total length of the morph, in seconds. */
const DURATION = 0.8;
/** How long one cell takes to change colour. */
const CELL = 0.4;
/** Spread of the per-cell start times. */
const SPREAD = 0.4;

let themeCanvas: HTMLCanvasElement | null = null;

function ensureCanvas() {
  if (themeCanvas) return themeCanvas;

  const canvas = document.createElement("canvas");
  canvas.className = "theme-transition-canvas";
  canvas.style.cssText =
    "position:fixed;top:0;left:0;width:100vw;height:100vh;" +
    "z-index:-1;pointer-events:none;opacity:0;visibility:hidden";
  document.body.appendChild(canvas);

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener("resize", resize, { passive: true });

  themeCanvas = canvas;
  return canvas;
}

/**
 * Repaints the page background one cell at a time. Cells are ordered by their
 * distance from the top-centre of the grid, so the new colour ripples out from
 * there and down — the canvas sits at z-index -1, behind the content but above
 * the body's own background.
 */
function morph(from: Theme, to: Theme) {
  const canvas = ensureCanvas();
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const cw = w / GRID;
  const ch = h / GRID;

  const fromValue = from === "dark" ? 0 : 255;
  const toValue = to === "dark" ? 0 : 255;

  canvas.style.visibility = "visible";
  canvas.style.opacity = "1";
  ctx.fillStyle = `rgb(${fromValue},${fromValue},${fromValue})`;
  ctx.fillRect(0, 0, w, h);

  const mid = Math.floor(GRID / 2);
  const cells: { x: number; y: number; d: number }[] = [];
  for (let y = 0; y < GRID; y += 1) {
    for (let x = 0; x < GRID; x += 1) {
      cells.push({ x, y, d: Math.sqrt((x - mid) ** 2 + y ** 2) });
    }
  }
  cells.sort((a, b) => a.d - b.d);
  const max = cells[cells.length - 1].d || 1;
  cells.forEach((cell) => {
    cell.d /= max;
  });

  const span = CELL / DURATION;
  const start = performance.now();

  const tick = (now: number) => {
    const v = Math.min(1, (now - start) / (DURATION * 1000));
    ctx.clearRect(0, 0, w, h);

    for (const cell of cells) {
      const from0 = cell.d * (SPREAD / DURATION);
      const to0 = from0 + span;
      let a = 0;
      if (v >= from0) a = v >= to0 ? 1 : (v - from0) / (to0 - from0);
      if (a < 1) {
        const g = Math.round(fromValue + (toValue - fromValue) * a);
        ctx.fillStyle = `rgb(${g},${g},${g})`;
        ctx.fillRect(cell.x * cw, cell.y * ch, cw + 1, ch + 1);
      }
    }

    if (v < 1) {
      requestAnimationFrame(tick);
      return;
    }
    ctx.clearRect(0, 0, w, h);
    canvas.style.opacity = "0";
    canvas.style.visibility = "hidden";
  };

  requestAnimationFrame(tick);
}

/** Where the switch happens, as a fraction of viewport height. Measured off
 *  the reference: it turns when the section top sits ~89px down a 900px view. */
const PROBE = 0.1;

/**
 * Drives the global theme tokens from scroll position. The page declares a
 * base theme; any `ThemeZone` further down takes over once its top crosses a
 * probe line near the top of the viewport — the point where the reference
 * flips between its black and white sections — and holds from there.
 */
export default function PageTheme({ base = "light" }: { base?: Theme }) {
  useEffect(() => {
    const previous = document.body.dataset.theme;
    let raf = 0;
    let applied = "";

    const apply = () => {
      const probe = window.innerHeight * PROBE;
      const zones = Array.from(
        document.querySelectorAll<HTMLElement>(`[${ZONE_ATTR}]`),
      );

      // Zones are in document order, so the last one whose top has passed the
      // probe wins — and it keeps winning to the end of the page, which is how
      // the reference stays light once it has turned.
      let theme: Theme = base;
      for (const zone of zones) {
        if (zone.getBoundingClientRect().top <= probe) {
          theme = (zone.getAttribute(ZONE_ATTR) as Theme) ?? base;
        }
      }

      if (theme !== applied) {
        const previous = (applied || base) as Theme;
        applied = theme;
        // Flip the tokens straight away — text and cards recolour instantly —
        // while the canvas paints the background across behind them.
        document.body.dataset.theme = theme;
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          morph(previous, theme);
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      if (previous) document.body.dataset.theme = previous;
      else delete document.body.dataset.theme;
    };
  }, [base]);

  return null;
}

/** Marks a stretch of the page as running on its own theme. */
export function ThemeZone({
  theme,
  children,
  className,
}: {
  theme: Theme;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className} {...{ [ZONE_ATTR]: theme }}>
      {children}
    </div>
  );
}
