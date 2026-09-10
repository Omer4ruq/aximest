"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "./Icons";
import { site } from "../lib/site";
import styles from "./Hero.module.css";

const STRIPES = 15;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  // Pointer position drives the skew of the blind stack.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const target = { x: 0.5 };
    const current = { x: 0.5 };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      target.x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    };

    const render = () => {
      current.x += (target.x - current.x) * 0.07;
      el.style.setProperty("--blind-bias", current.x.toFixed(4));
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

      {/* Venetian-blind stack: each bar wipes in and keeps a skewed tail */}
      <div className={styles.blinds} aria-hidden="true">
        {Array.from({ length: STRIPES }).map((_, i) => (
          <span
            key={i}
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
