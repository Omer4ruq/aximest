"use client";

import { useEffect, useRef } from "react";
import Media from "./Media";
import { testimonial } from "../lib/site";
import styles from "./Testimonial.module.css";

/**
 * Full-bleed quote over a darkened photo. Words brighten one by one as the
 * section scrolls through the viewport.
 */
export default function Testimonial() {
  const ref = useRef<HTMLElement>(null);
  const words = testimonial.quote.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }

    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = Math.max(
        0,
        Math.min(1, (vh * 0.9 - rect.top) / (rect.height * 0.75 + vh * 0.2)),
      );
      const reach = progress * (spans.length + 8);
      spans.forEach((span, i) => {
        const local = Math.max(0, Math.min(1, reach - i));
        span.style.opacity = String(0.32 + local * 0.68);
      });
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
      <div className={styles.bg} aria-hidden="true">
        <Media seed={4} dark />
      </div>

      <figure className={styles.figure}>
        <blockquote className={styles.quote}>
          <span className={styles.mark} aria-hidden="true">
            “
          </span>
          {words.map((word, i) => (
            <span key={i} data-word style={{ opacity: 0.32 }}>
              {word}{" "}
            </span>
          ))}
        </blockquote>

        <figcaption className={styles.caption}>
          <span className={styles.author}>{testimonial.author}</span>
          <span className={styles.role}>{testimonial.role}</span>
          <span className={styles.company}>{testimonial.company}</span>
        </figcaption>
      </figure>
    </section>
  );
}
