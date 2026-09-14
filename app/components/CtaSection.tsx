"use client";

import { useEffect, useRef } from "react";
import Button from "./Button";
import Media from "./Media";
import { ArrowRight } from "./Icons";
import styles from "./CtaSection.module.css";

/**
 * Closing statement. Four masked lines rise in sequence when the block
 * reaches the viewport; the arrow line then slides in from the left, and the
 * last line tracks scroll horizontally.
 */
export default function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const drift = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-inview");
      return;
    }

    // Lines rise once the block is three-quarters of the way up the viewport.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-inview");
        io.disconnect();
      },
      { rootMargin: "0px 0px -25% 0px" },
    );
    io.observe(el);

    let frame = 0;
    const update = () => {
      const node = drift.current;
      if (!node) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // 0 as the block enters from the bottom, 1 once it has cleared the top
      const progress = Math.max(
        0,
        Math.min(1, (vh - rect.top) / (vh + rect.height)),
      );
      node.style.transform = `translate3d(${-100 * (1 - progress)}%, 0, 0)`;
      frame = 0;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className={styles.section} ref={ref} id="contact-cta">
      <div className={styles.grid}>
        <h2 className={styles.title}>
          <span className="sr-only">We Drive Your Systems Fwrd</span>

          <span className={`${styles.line} ${styles.line1}`} aria-hidden="true">
            <span className={styles.inner} style={{ ["--i" as string]: "0" }}>
              <span className={styles.shift}>
                <span>We</span>
                <span>Drive</span>
              </span>
            </span>
          </span>

          <span className={`${styles.line} ${styles.line2}`} aria-hidden="true">
            <span className={styles.inner} style={{ ["--i" as string]: "1" }}>
              <span className={`${styles.shift} ${styles.shiftArrow}`}>
                <i className={styles.icon}>
                  <ArrowRight />
                </i>
                <span>Your</span>
              </span>
            </span>
          </span>

          <span className={`${styles.line} ${styles.line3}`} aria-hidden="true">
            <span className={styles.inner} style={{ ["--i" as string]: "2" }}>
              <span className={styles.shift}>
                <span>Systems</span>
              </span>
            </span>
          </span>

          <span className={`${styles.line} ${styles.line4}`} aria-hidden="true">
            <span className={styles.inner} style={{ ["--i" as string]: "3" }}>
              <span className={styles.shift}>
                <span ref={drift} className={styles.drift}>
                  Fwrd
                </span>
              </span>
            </span>
          </span>
        </h2>

        <div className={styles.content}>
          <p className={styles.description}>
            Digital architectures for an ever-shifting world.
          </p>
          <Button href="/contact" icon={<ArrowRight />} className={styles.cta}>
            Let&apos;s talk
          </Button>
        </div>
      </div>

      <div className={styles.strip} aria-hidden="true">
        <Media seed={2} />
      </div>
    </section>
  );
}
