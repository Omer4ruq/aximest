"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/* Grid and timing lifted from the reference's transition module. */
const COLS_DESKTOP = 11;
const ROWS_DESKTOP = 11;
const COLS_MOBILE = 6;
const ROWS_MOBILE = 10;
/** Spread of the per-cell start times, in seconds. */
const STAGGER = 0.35;
/** How long a single cell takes to fade. */
const CELL = 0.3;
const TOTAL = STAGGER + CELL;

type Cell = { x: number; y: number; delay: number };

const grid = () =>
  window.innerWidth >= 700
    ? { cols: COLS_DESKTOP, rows: ROWS_DESKTOP }
    : { cols: COLS_MOBILE, rows: ROWS_MOBILE };

function ensureCanvas() {
  let canvas = document.getElementById(
    "page-transition-canvas",
  ) as HTMLCanvasElement | null;

  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "page-transition-canvas";
    canvas.style.cssText =
      "position:fixed;top:0;left:0;width:100vw;height:100vh;" +
      "z-index:10000;pointer-events:none;opacity:0;visibility:hidden";
    document.body.appendChild(canvas);
  }

  const dpr = window.devicePixelRatio || 1;
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.getContext("2d")?.scale(dpr, dpr);
  }

  return canvas;
}

/**
 * Paints the grid of cells. `cover` fades them in until the screen is black;
 * `reveal` starts black and clears them away. Either way the order is random,
 * so the page breaks apart and reassembles a cell at a time.
 */
function play(mode: "cover" | "reveal") {
  return new Promise<void>((resolve) => {
    const canvas = ensureCanvas();
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      resolve();
      return;
    }

    const { cols, rows } = grid();
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cw = w / cols;
    const ch = h / rows;

    const cells: Cell[] = [];
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        cells.push({ x, y, delay: Math.random() * STAGGER });
      }
    }

    canvas.style.visibility = "visible";
    canvas.style.opacity = "1";
    if (mode === "reveal") {
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillRect(0, 0, w, h);
    }

    const span = CELL / TOTAL;
    const start = performance.now();

    const tick = (now: number) => {
      const v = Math.min(1, (now - start) / (TOTAL * 1000));
      ctx.clearRect(0, 0, w, h);

      for (const cell of cells) {
        const from = cell.delay / TOTAL;
        let filled = 0;
        if (v >= from + span) filled = 1;
        else if (v >= from) {
          const t = (v - from) / span;
          filled = 0.5 * (1 - Math.cos(Math.PI * t));
        }

        const alpha = mode === "cover" ? filled : 1 - filled;
        if (alpha > 0) {
          ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
          // the extra pixel hides seams between cells
          ctx.fillRect(cell.x * cw, cell.y * ch, cw + 1, ch + 1);
        }
      }

      if (v < 1) {
        requestAnimationFrame(tick);
        return;
      }

      if (mode === "reveal") {
        ctx.clearRect(0, 0, w, h);
        canvas.style.opacity = "0";
        canvas.style.visibility = "hidden";
      }
      resolve();
    };

    requestAnimationFrame(tick);
  });
}

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  // Holds the route the reveal last ran for. Comparing paths (rather than a
  // "first render" flag) keeps this correct under React's double-invoked
  // effects in development.
  const shown = useRef<string | null>(null);
  const leaving = useRef(false);

  const reduced = useCallback(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  // Reveal the incoming page — but never on the very first render, which
  // matches the reference skipping the curtain on a direct load.
  useEffect(() => {
    if (shown.current === null) {
      shown.current = pathname;
      return;
    }
    if (shown.current === pathname) return;
    shown.current = pathname;
    leaving.current = false;
    window.__lenis?.scrollTo(0, { immediate: true });
    if (reduced()) return;
    void play("reveal");
  }, [pathname, reduced]);

  // Cover the outgoing page, then navigate.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;
      if (leaving.current) {
        event.preventDefault();
        return;
      }

      event.preventDefault();

      if (reduced()) {
        router.push(url.pathname + url.search);
        return;
      }

      leaving.current = true;
      void play("cover").then(() => {
        router.push(url.pathname + url.search);
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, reduced]);

  useEffect(() => {
    const onResize = () => ensureCanvas();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return null;
}
