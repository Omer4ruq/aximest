"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { EffectCreative, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";

import SectionHead from "./SectionHead";
import Button from "./Button";
import Media from "./Media";
import { ArrowRight } from "./Icons";
import { useRevealGroup } from "../hooks/useReveal";
import { clients } from "../lib/site";
import styles from "./Clients.module.css";

export default function Clients() {
  const reveal = useRevealGroup<HTMLElement>();
  const swiperEl = useRef<HTMLDivElement>(null);
  const paginationEl = useRef<HTMLDivElement>(null);
  const cursorEl = useRef<HTMLDivElement>(null);
  const swiper = useRef<Swiper | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = swiperEl.current;
    if (!el) return;

    // Matches the reference exactly: the outgoing card recedes in Z and
    // fades while the incoming one slides in from the right.
    const instance = new Swiper(el, {
      modules: [EffectCreative, Pagination],
      effect: "creative",
      creativeEffect: {
        limitProgress: 2,
        progressMultiplier: 1,
        perspective: true,
        shadowPerProgress: false,
        prev: { translate: [0, 0, -400], rotate: [0, 0, 0], opacity: 0, scale: 0.75, shadow: true },
        next: { translate: ["100%", 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 },
      },
      speed: 300,
      slidesPerView: 1,
      spaceBetween: 0,
      grabCursor: false,
      threshold: 5,
      resistanceRatio: 0.85,
      longSwipesRatio: 0.5,
      shortSwipes: true,
      followFinger: true,
      watchSlidesProgress: true,
      a11y: { enabled: true },
      pagination: {
        el: paginationEl.current,
        clickable: true,
        bulletClass: styles.bullet,
        bulletActiveClass: styles.bulletActive,
      },
      on: {
        touchStart: () => setDragging(true),
        touchEnd: () => setDragging(false),
      },
    });

    swiper.current = instance;
    return () => {
      instance.destroy(true, true);
      swiper.current = null;
    };
  }, []);

  // The "Drag" pill follows the pointer while it is over the slider.
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const cursor = cursorEl.current;
    if (!cursor) return;
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  }, []);

  const setCursorVisible = useCallback((visible: boolean) => {
    const cursor = cursorEl.current;
    if (cursor) cursor.dataset.visible = String(visible);
  }, []);

  return (
    <section className={styles.section} id="clients" ref={reveal}>
      <SectionHead
        label="Our Clients"
        title="We engage with:"
        count={`/00${clients.length}`}
        aside={
          <Button href="/projects" variant="link" icon={<ArrowRight />}>
            View all
          </Button>
        }
      />

      <div
        className={styles.carousel}
        onPointerMove={onPointerMove}
        onPointerEnter={() => setCursorVisible(true)}
        onPointerLeave={() => setCursorVisible(false)}
      >
        <div className={`swiper ${styles.swiper}`} ref={swiperEl}>
          <div className="swiper-wrapper">
            {clients.map((client, i) => (
              <div className={`swiper-slide ${styles.slide}`} key={client.index}>
                <article className={styles.card}>
                  <span className={styles.index}>{client.index}</span>

                  <figure className={styles.media}>
                    <Media seed={i} />
                  </figure>

                  <h3 className={styles.title}>{client.title}</h3>

                  <div className={styles.text}>
                    <p className={styles.body}>{client.description}</p>
                    <Button
                      href="/contact"
                      hoverLabel="Get in touch"
                      icon={<ArrowRight />}
                      className={styles.button}
                    >
                      {client.cta}
                    </Button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pagination} ref={paginationEl} />

        <div
          className={styles.dragCursor}
          ref={cursorEl}
          data-visible="false"
          data-active={dragging}
          aria-hidden="true"
        >
          <span className={styles.dragCursorInner}>Drag</span>
        </div>
      </div>
    </section>
  );
}
