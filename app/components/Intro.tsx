"use client";

import { useEffect, useRef } from "react";
import Button from "./Button";
import { ArrowRight } from "./Icons";
import styles from "./Intro.module.css";

const TEXT = "A North American team of specialists with profound technical expertise.";

/**
 * Scroll-driven word highlight: words move from muted to full contrast as the
 * block travels through the viewport.
 */
export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const words = TEXT.split(" ");

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
      // 0 when the block enters from the bottom, 1 once it clears the middle
      const progress = Math.max(
        0,
        Math.min(1, (vh * 0.85 - rect.top) / (rect.height + vh * 0.35)),
      );
      const reach = progress * (spans.length + 6);
      spans.forEach((span, i) => {
        const local = Math.max(0, Math.min(1, reach - i));
        span.style.opacity = String(0.22 + local * 0.78);
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
    <section className={styles.section} id="intro">
      <div className={styles.inner}>
        <p className={styles.text} ref={ref}>
          {words.map((word, i) => (
            <span key={i} data-word style={{ opacity: 0.22 }}>
              {word}{" "}
            </span>
          ))}
        </p>

        <Button
          href="/contact"
          icon={<ArrowRight />}
          className={styles.button}
        >
          Contact Us
        </Button>
      </div>
    </section>
  );
}
