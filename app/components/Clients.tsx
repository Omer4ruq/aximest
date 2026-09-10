"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHead from "./SectionHead";
import Button from "./Button";
import Media from "./Media";
import { ArrowRight } from "./Icons";
import { useRevealGroup } from "../hooks/useReveal";
import { clients } from "../lib/site";
import styles from "./Clients.module.css";

export default function Clients() {
  const reveal = useRevealGroup<HTMLElement>();
  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      startScroll: track.scrollLeft,
      moved: 0,
    };
    setDragging(true);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    track.scrollLeft = drag.current.startScroll - dx;
  }, []);

  const endDrag = useCallback(() => {
    drag.current.down = false;
    setDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener("pointerup", endDrag);
    return () => window.removeEventListener("pointerup", endDrag);
  }, [endDrag]);

  // Keep the pagination dots in sync with the scroll position.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const slide = track.firstElementChild as HTMLElement | null;
      if (!slide) return;
      setIndex(Math.round(track.scrollLeft / slide.offsetWidth));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const slide = track?.children[i] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

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
        onPointerLeave={() => setCursor((c) => ({ ...c, visible: false }))}
      >
        <ul
          ref={trackRef}
          className={styles.track}
          data-dragging={dragging}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onClickCapture={(e) => {
            if (drag.current.moved > 6) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          {clients.map((client, i) => (
            <li key={client.index} className={styles.slide}>
              <article className={styles.card}>
                <span className={styles.index}>{client.index}</span>

                <figure className={styles.media}>
                  <Media seed={i} />
                </figure>

                <div className={styles.text}>
                  <h3 className={styles.title}>{client.title}</h3>
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
            </li>
          ))}
        </ul>

        <div className={styles.dots} role="tablist" aria-label="Client segments">
          {clients.map((client, i) => (
            <button
              key={client.index}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={client.title}
              className={styles.dot}
              data-active={i === index}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <span
          className={styles.dragCursor}
          data-visible={cursor.visible}
          data-active={dragging}
          style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
          aria-hidden="true"
        >
          Drag
        </span>
      </div>
    </section>
  );
}
