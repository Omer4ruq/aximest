"use client";

import { useEffect, useRef } from "react";
import { services, site } from "../lib/site";
import styles from "./ChromeMark.module.css";

/**
 * Pinned chrome monogram. The mark counter-rotates slightly with scroll,
 * standing in for the reference's rendered 3D sequence.
 */
export default function ChromeMark() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.max(-1, Math.min(1, 1 - (rect.top + rect.height / 2) / vh));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.sticky}>
        <div className={styles.labels}>
          <span>{site.mark}</span>
          <ul className={styles.stack}>
            {services.map((s) => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
          <span>{site.code}</span>
          <span>{site.codeLabel}</span>
        </div>

        <div className={styles.markWrap} aria-hidden="true">
          <span className={styles.mark}>
            {site.name.charAt(0)}
            <i className={styles.gloss} />
          </span>
        </div>
      </div>
    </section>
  );
}
