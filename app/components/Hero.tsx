"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "./Icons";
import { site } from "../lib/site";
import styles from "./Hero.module.css";

const STRIPES = 15;

/** Phase advance per viewport-height of scroll, in half-cycles. */
const SCROLL_SPEED = 11.25;
/** Phase offset between adjacent bars — sets the diagonal's steepness. */
const SPREAD = 0.057;
/** How far the pointer can push the wave. */
const POINTER_INFLUENCE = 0.55;

/** Triangle wave over `x`, reflecting between 1 and 0 every unit. */
function triangle(x: number) {
  const wrapped = ((x % 2) + 2) % 2;
  return Math.abs(wrapped - 1);
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const blindRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  // The blind stack is a traveling wave: scroll advances its phase, the
  // pointer nudges it, and each bar samples the wave at its own offset.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let pointerTarget = 0.5;
    let pointer = 0.5;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointerTarget = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    };

    const render = () => {
      pointer += (pointerTarget - pointer) * 0.07;

      const vh = window.innerHeight || 1;
      const phase =
        (window.scrollY / vh) * SCROLL_SPEED + (pointer - 0.5) * POINTER_INFLUENCE;

      for (let i = 0; i < blindRefs.current.length; i += 1) {
        const bar = blindRefs.current[i];
        if (!bar) continue;
        const tail = triangle(phase + i * SPREAD) * 97;
        bar.style.setProperty("--tail", `${tail.toFixed(2)}%`);
      }

      frame = requestAnimationFrame(render);
    };

    el.addEventListener("pointermove", onMove);
    frame = requestAnimationFrame(render);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.hero} ref={ref} data-ready={ready}>
      <div className={styles.meta}>
        <span>{site.mark}</span>
        <span>{site.city}</span>
        <span>{site.code}</span>
        <span>{site.codeLabel}</span>
      </div>

      <h1 className="sr-only">
        {site.name} — An Elite Team of Software Engineers
      </h1>

      {/* Venetian-blind stack: each bar wipes in, then rides the scroll wave */}
      <div className={styles.blinds} aria-hidden="true">
        {Array.from({ length: STRIPES }).map((_, i) => (
          <span
            key={i}
            ref={(node) => {
              blindRefs.current[i] = node;
            }}
            className={styles.blind}
            style={{
              ["--i" as string]: String(i),
              ["--t" as string]: (i / (STRIPES - 1)).toFixed(4),
            }}
          />
        ))}
      </div>

      <div className={styles.wordmarkWrap} aria-hidden="true">
        <span className={styles.wordmark}>
          {site.name.toUpperCase()}
          <em>®</em>
        </span>
      </div>

      <a href="#intro" className={styles.explore}>
        <span className={styles.exploreSlash}>/</span>
        <span className={styles.exploreLabel}>Explore</span>
        <span className={styles.exploreIcon}>
          <ArrowDown />
        </span>
      </a>
    </section>
  );
}
