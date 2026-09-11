"use client";

import { useEffect, useRef } from "react";

/**
 * Adds `is-inview` to the element the first time it reaches the viewport,
 * mirroring the reference's `data-in-view` / `is-inview` pairing. The CSS
 * holds the "before" state; this only flips the switch.
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  { threshold = 0.15, rootMargin = "0px 0px -10% 0px" } = {},
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-inview");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-inview");
        io.disconnect();
      },
      { threshold, rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

/**
 * Scroll-linked vertical drift. Each child is pushed down by its own
 * `--card-offset` and eases back to zero as the grid rises through the
 * viewport, so columns settle at different rates.
 */
export function useColumnParallax<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(root.children) as HTMLElement[];
    if (!items.length) return;

    const current = new Array(items.length).fill(0);
    let frame = 0;

    const render = () => {
      const vh = window.innerHeight || 1;
      items.forEach((item, i) => {
        const offset =
          parseFloat(getComputedStyle(item).getPropertyValue("--card-offset")) || 0;
        const top = item.getBoundingClientRect().top - current[i];
        const progress = Math.max(0, Math.min(1, top / vh));
        const target = offset * progress;
        // easing toward the target is what makes the deeper columns lag
        current[i] += (target - current[i]) * 0.1;
        item.style.transform = `translate3d(0, ${current[i].toFixed(2)}px, 0)`;
      });
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      items.forEach((item) => {
        item.style.transform = "";
      });
    };
  }, []);

  return ref;
}
