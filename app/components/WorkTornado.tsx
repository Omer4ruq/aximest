"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "./Button";
import Media from "./Media";
import ScrambleText from "./Scramble";
import { ArrowRight } from "./Icons";
import { projects } from "../lib/site";
import styles from "./WorkTornado.module.css";

/* ------------------------------------------------------------------
   Helix geometry. Each card sits ROTATION_ANGLE further around a
   vertical axis than the one below it and CARD_Y_SPACING of a card
   height higher. Radius and card size are both in `em` off the stage's
   font-size, so the whole thing scales from one clamp().
   ------------------------------------------------------------------ */
const ROTATION_ANGLE = 40;
const CARD_Y_SPACING = 0.35;
const EDGE_OFFSET = 2;
const ORBIT_DEPTH = 45;
const EDGE_FADE = 0.5;
const BACK_DARKNESS = 0.75;
const BACK_BLUR = 0.5;

/** Viewport heights of scroll per step of the rotation. */
const SCROLL_PER_CARD = 0.33;
/**
 * Viewport heights the last card holds fully in front once the rotation has
 * finished. Without it the climb would begin on the very frame the rotation
 * ends — and because the helix eases toward its target rather than snapping to
 * it, the last card is still settling at that point. This is the beat where it
 * sits square to the viewer before anything rises over it.
 */
const HOLD = 0.5;
/**
 * Viewport heights of section left over after the hold. The next section is
 * pulled up by exactly this much (see `.climb` in page.module.css), so it rides
 * up over the pinned stage instead of the stage scrolling away to an empty
 * screen — and it costs the page no extra length.
 */
const CLIMB = 1;
/** How far the helix lags its scrubbed target each frame. */
const FOLLOW_EASE = 0.16;

/* Grab-and-spin, layered over the scrubbed position as an offset. */
const DRAG_SPEED = 0.00075;
const DRAG_DECAY = 0.1;
const MAX_DRAG_SPEED = 0.2;
const DRAG_MINIMUM = 6;

const MIN_BATCHES = 2;
const MAX_BATCHES = 4;

const clamp = (min: number, max: number, v: number) =>
  Math.max(min, Math.min(max, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** power2.inOut, for the edge fade. */
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

export default function WorkTornado() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [batches, setBatches] = useState(MIN_BATCHES);

  useEffect(() => {
    const sectionEl = section.current;
    const stageEl = stage.current;
    if (!sectionEl || !stageEl) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || still.matches) return;

    const cards = Array.from(
      stageEl.querySelectorAll<HTMLElement>("[data-card]"),
    );
    if (!cards.length) return;

    const state = {
      amount: cards.length,
      progress: 0,
      /** Where scroll position alone says the helix should be. */
      scrollTarget: 0,
      /** What dragging has added to that. Persists on release. */
      dragOffset: 0,
      dragVelocity: 0,
      cardHeight: 0,
      cardGap: 0,
      em: 16,
      stageHeight: 0,
    };

    function measure() {
      state.em = parseFloat(getComputedStyle(stageEl!).fontSize) || 16;
      state.cardHeight = cards[0].offsetHeight || state.em * 37.5;
      state.cardGap = state.cardHeight * CARD_Y_SPACING;
      state.stageHeight = stageEl!.offsetHeight;
      state.amount = cards.length;
    }

    /** How many repeats of the deck it takes to cover the stage plus run-off. */
    function neededBatches() {
      if (!state.cardGap) return MIN_BATCHES;
      const half = state.stageHeight * 0.5;
      const needed = half + state.cardHeight * (EDGE_OFFSET + EDGE_FADE);
      const perSide = Math.ceil(needed / state.cardGap) + 1;
      return clamp(
        MIN_BATCHES,
        MAX_BATCHES,
        Math.ceil((perSide * 2 + 1) / projects.length),
      );
    }

    /** Cards past the edge shrink away rather than being clipped mid-frame. */
    function edgeScale(y: number) {
      const half = state.stageHeight * 0.5;
      const fadeStart = half + state.cardHeight * EDGE_OFFSET;
      const distance = state.cardHeight * EDGE_FADE;
      return easeInOut(clamp(0, 1, (fadeStart - Math.abs(y)) / distance));
    }

    function render() {
      const radius = ORBIT_DEPTH * state.em;

      cards.forEach((card, slot) => {
        // Wrap each slot into [-amount/2, amount/2] so the helix is endless:
        // a card walking off the top re-enters at the bottom.
        const loop =
          (((slot + state.progress) % state.amount) + state.amount) %
          state.amount;
        const index = loop > state.amount * 0.5 ? loop - state.amount : loop;

        const deg = index * ROTATION_ANGLE;
        const rad = (deg * Math.PI) / 180;
        const centre = 1 - Math.min(Math.abs(index) / (state.amount * 0.5), 1);
        const y = index * state.cardGap;
        const scale = edgeScale(y);
        const back = clamp(0, 1, (1 - Math.cos(rad)) * 0.5);

        card.style.transform =
          `translate(-50%, -50%) translate3d(${Math.sin(rad) * radius}px, ${y}px, ` +
          `${(Math.cos(rad) - 1) * radius}px) rotateY(${deg}deg) scale(${scale})`;
        card.style.filter =
          `brightness(${1 - back * BACK_DARKNESS}) blur(${back * BACK_BLUR}em)`;
        card.style.zIndex = String(Math.round(centre * 1000));
        card.style.visibility = "visible";
        // Only the card squarely at the front takes the pointer; the ones
        // turned away sit under it and would otherwise swallow the press.
        card.style.pointerEvents = Math.abs(index) < 0.5 ? "auto" : "none";
      });
    }

    measure();
    render();

    const wanted = neededBatches();
    if (wanted !== batches) {
      setBatches(wanted);
      return;
    }

    const travel = projects.length - 1;

    const readScroll = () => {
      const rect = sectionEl.getBoundingClientRect();
      // The rotation owns only the first stretch of the section; HOLD and
      // CLIMB follow it. Measuring against the rotation's own distance rather
      // than the section's keeps those two out of the scrub.
      const distance = state.stageHeight * travel * SCROLL_PER_CARD;
      if (distance <= 0) return;
      state.scrollTarget = -clamp(0, 1, -rect.top / distance) * travel;
    };

    let frame = 0;
    const tick = () => {
      if (state.dragVelocity) {
        state.dragVelocity = lerp(state.dragVelocity, 0, DRAG_DECAY);
        if (Math.abs(state.dragVelocity) < 0.00001) state.dragVelocity = 0;
        state.dragOffset += state.dragVelocity;
      }
      const target = state.scrollTarget + state.dragOffset;
      const next = lerp(state.progress, target, FOLLOW_EASE);
      if (Math.abs(next - state.progress) > 0.0001) {
        state.progress = next;
        render();
      }
      frame = requestAnimationFrame(tick);
    };

    // ---- grab and spin -------------------------------------------------
    let pointerId: number | null = null;
    let lastY = 0;
    let travelled = 0;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      pointerId = e.pointerId;
      lastY = e.clientY;
      travelled = 0;
      stageEl.style.cursor = "grabbing";
    };

    const onMove = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      const delta = e.clientY - lastY;
      lastY = e.clientY;
      travelled += Math.abs(delta);
      // A press that never travels DRAG_MINIMUM is a click, not a drag, so
      // the Explore links still work.
      if (travelled < DRAG_MINIMUM) return;
      state.dragVelocity = clamp(
        -MAX_DRAG_SPEED,
        MAX_DRAG_SPEED,
        state.dragVelocity + delta * DRAG_SPEED,
      );
    };

    const onUp = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return;
      pointerId = null;
      stageEl.style.cursor = "grab";
    };

    const onScroll = () => readScroll();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        measure();
        const next = neededBatches();
        if (next !== batches) setBatches(next);
        else {
          readScroll();
          render();
        }
      }, 150);
    };

    readScroll();
    state.progress = state.scrollTarget;
    render();

    stageEl.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    frame = requestAnimationFrame(tick);

    return () => {
      clearTimeout(resizeTimer);
      cancelAnimationFrame(frame);
      stageEl.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [batches]);

  const deck = Array.from({ length: batches }, () => projects).flat();

  return (
    <>
      <section
        ref={section}
        id="work"
        className={styles.section}
        style={{
          height: `${
            (1 + (projects.length - 1) * SCROLL_PER_CARD + HOLD + CLIMB) * 100
          }svh`,
        }}
      >
        <div className={styles.sticky}>
          <div className={styles.head}>
            <span className={styles.slash}>/</span>
            <ScrambleText className={styles.label} delay={0.1}>
              Selected Work
            </ScrambleText>
            <ScrambleText className={styles.count} delay={0.3}>
              {`/00${projects.length}`}
            </ScrambleText>
          </div>

          <h2 className={styles.title}>
            Six problems.
            <br />
            Six systems that hold.
          </h2>

          <p className={styles.note}>
            Drag the stack, or keep scrolling — every project comes round.
          </p>

          {/* 3D stage. Card size, orbit radius and perspective all key off this
              one font-size, so the helix scales with the viewport. It takes no
              pointer events itself: inside a preserve-3d context the browser
              will hit-test to this container rather than to the transformed
              card under the cursor. Transparent here, the press reaches the
              card, and render() decides which card may take it. */}
          <div className={styles.stage} ref={stage}>
            {deck.map((project, i) => {
              // The deck repeats to fill the stage; only the first pass is in
              // the accessibility tree, so each project is announced once.
              const repeat = i >= projects.length;
              return (
                <div
                  key={i}
                  data-card
                  aria-hidden={repeat}
                  className={styles.card}
                >
                  <article className={styles.cardInner}>
                    <figure className={styles.media}>
                      <Media seed={i % projects.length} dark />
                    </figure>

                    <div className={styles.body}>
                      <p className={styles.cardMeta}>
                        <span className={styles.cardIndex}>W/{project.n}</span>
                        <span>{project.kind}</span>
                      </p>

                      <h3 className={styles.cardTitle}>{project.name}</h3>
                      <p className={styles.cardText}>{project.body}</p>

                      <Button
                        href="/projects"
                        color="red"
                        icon={<ArrowRight />}
                        className={styles.cardCta}
                        tabIndex={repeat ? -1 : undefined}
                        draggable={false}
                      >
                        Explore
                      </Button>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Below 1024px, and wherever motion is turned down, the same projects as
          a plain list — the helix needs both the room and the movement. */}
      <section className={styles.fallback}>
        <div className={styles.head}>
          <span className={styles.slash}>/</span>
          <span className={styles.label}>Selected Work</span>
          <span className={styles.count}>{`/00${projects.length}`}</span>
        </div>

        <h2 className={styles.title}>Six problems. Six systems that hold.</h2>

        <ul className={styles.grid}>
          {projects.map((project, i) => (
            <li key={project.n}>
              <Link href="/projects" className={styles.cardInner}>
                <figure className={styles.media}>
                  <Media seed={i} dark />
                </figure>
                <div className={styles.body}>
                  <p className={styles.cardMeta}>
                    <span className={styles.cardIndex}>W/{project.n}</span>
                    <span>{project.kind}</span>
                  </p>
                  <h3 className={styles.cardTitle}>{project.name}</h3>
                  <p className={styles.cardText}>{project.body}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
