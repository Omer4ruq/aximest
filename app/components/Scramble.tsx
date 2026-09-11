"use client";

import { useEffect, useRef } from "react";

/**
 * Glyph pool for the shuffle. The reference draws from its own wordmark's
 * letters plus digits, which keeps the noise on-brand rather than random.
 */
const POOL = "AXIMEST0123456789";

/** Longest a single label should take to settle. */
const MAX_DURATION = 1100;
/** Target time per character before the cap kicks in. */
const STEP = 95;
/** How often the unsettled characters re-roll. */
const ROLL = 45;
/** How many scrambling characters trail the settled prefix. */
const TAIL = 3;

type Options = { delay?: number; onDone?: () => void };

/**
 * Reveals `text` left to right, with a short tail of shuffling glyphs running
 * ahead of the settled prefix. Returns a cancel function.
 */
export function scramble(el: HTMLElement, text: string, options: Options = {}) {
  const { delay = 0, onDone } = options;
  const chars = Array.from(text);
  const step = Math.min(STEP, MAX_DURATION / Math.max(1, chars.length));

  let raf = 0;
  let timer = 0;
  let start = 0;
  let lastRoll = -Infinity;
  let cache = "";

  const frame = (now: number) => {
    if (!start) start = now;
    const revealed = Math.floor((now - start) / step);

    if (revealed >= chars.length) {
      el.textContent = text;
      onDone?.();
      return;
    }

    if (now - lastRoll >= ROLL) {
      lastRoll = now;
      const remaining = chars.length - revealed;
      // the tail widens from one glyph to three as the reveal gets going
      const tail = Math.min(TAIL, revealed + 1, remaining);
      let out = chars.slice(0, revealed).join("");
      for (let i = 0; i < tail; i += 1) {
        const source = chars[revealed + i];
        // spaces and punctuation stay put; only glyphs shuffle
        out += /[\s]/.test(source)
          ? source
          : POOL[Math.floor(Math.random() * POOL.length)];
      }
      cache = out;
    }

    el.textContent = cache;
    raf = requestAnimationFrame(frame);
  };

  el.textContent = "";
  timer = window.setTimeout(() => {
    raf = requestAnimationFrame(frame);
  }, delay * 1000);

  return () => {
    window.clearTimeout(timer);
    cancelAnimationFrame(raf);
    el.textContent = text;
  };
}

/** Re-runs the shuffle on every scramble label inside `root`. */
export function scrambleWithin(root: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.querySelectorAll<HTMLElement>("[data-scramble-text]").forEach((el) => {
    const text = el.dataset.scrambleText;
    if (text) scramble(el, text);
  });
}

/**
 * Mono label that shuffles into place the first time it reaches the viewport.
 * The real text is server-rendered, so it is present without JavaScript and
 * stays in the accessibility tree while the visible glyphs churn.
 */
export default function ScrambleText({
  children,
  delay = 0,
  className,
  as: Tag = "span",
}: {
  children: string;
  delay?: number;
  className?: string;
  as?: "span" | "p" | "h2" | "h3";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const text = children;
    let cancel: (() => void) | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        cancel = scramble(el, text, { delay });
      },
      { threshold: 0.2 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancel?.();
    };
  }, [children, delay]);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={className}
      aria-label={children}
      data-scramble-text={children}
    >
      {children}
    </Tag>
  );
}
