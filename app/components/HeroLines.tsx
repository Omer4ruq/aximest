"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroLines.module.css";

/**
 * The blind stack, drawn on a canvas exactly as the reference does.
 *
 * Every line owns a slot of the box. Within its slot a line is full height at
 * the left edge and steps down to a thinner tail that runs to the right — and
 * where that step happens is driven by the pointer: the line under the cursor
 * has no offset (its wedge reaches all the way right) while lines further away
 * pull their wedge left, so the whole stack fans out around the cursor. Values
 * are lerped, which is what gives it the liquid feel.
 */
const LINES = 14;
const GUTTER_DIVIDER = 4.5 / 390;
const IDLE_FIRST = 12 / 22;
const IDLE_LAST = 6 / 22;
const INTER_FIRST = 10 / 22;
const INTER_LAST = 5 / 22;
const ANGLES_DIVIDER = 100 / 1408;
const MAX_OFFSET_RATIO = 0.8;
const SMOOTH_LERP = 0.15;

/** Seconds each line takes to wipe in, and the gap between them. */
const REVEAL_DURATION = 900;
const REVEAL_STAGGER = 45;
const REVEAL_DELAY = 200;

type Line = {
  lineY: number;
  lineHeight: number;
  idleLineY: number;
  idleHeight: number;
  interactiveLineY: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function HeroLines() {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = wrapper.current;
    if (!host) return;

    const canvas = document.createElement("canvas");
    canvas.className = styles.canvas;
    host.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lines: Line[] = [];
    let maxOffset = 0;
    const current = new Array(LINES).fill(0);
    let targets = new Array(LINES).fill(0);
    let hovered = 0;
    let width = 0;
    let height = 0;
    let colour = "#000";
    // kept in viewport coordinates so scrolling re-resolves the hovered line
    const pointer = { x: 0, clientY: 0 };
    let frame = 0;
    const start = performance.now();

    const layout = () => {
      const rect = host.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.ceil(width * dpr);
      canvas.height = Math.ceil(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      colour = getComputedStyle(host).color;

      const gutter = height * GUTTER_DIVIDER;
      const lineHeight = height / LINES - gutter;
      lines = [];
      for (let i = 0; i < LINES; i += 1) {
        const t = i / (LINES - 1);
        const idleRatio = lerp(IDLE_FIRST, IDLE_LAST, t);
        const interRatio = lerp(INTER_FIRST, INTER_LAST, t);
        const lineY = ((height + gutter) / LINES) * i;
        const idleLineY = lineY + lineHeight * (1 - idleRatio);
        lines.push({
          lineY,
          lineHeight,
          idleLineY,
          idleHeight: lineHeight * idleRatio,
          interactiveLineY: idleLineY - lineHeight * interRatio,
        });
      }
      maxOffset = width * ANGLES_DIVIDER * (LINES - 1) * MAX_OFFSET_RATIO;
      setTargets();
    };

    function setTargets() {
      targets = [];
      for (let i = 0; i < LINES; i += 1) {
        if (i === hovered) targets.push(0);
        else targets.push((Math.abs(hovered - i) / (LINES - 1)) * maxOffset);
      }
    }

    const lineAt = (y: number) => {
      for (let i = 0; i < lines.length; i += 1) {
        const l = lines[i];
        if (y >= l.lineY && y <= l.lineY + l.lineHeight) return i;
      }
      return undefined;
    };

    const onPointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
      pointer.clientY = event.clientY;
      const index = lineAt(
        Math.min(Math.max(event.clientY - rect.top, 0), rect.height),
      );
      if (index !== undefined && index !== hovered) {
        hovered = index;
        setTargets();
      }
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = colour;

      const elapsed = now - start - REVEAL_DELAY;

      for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];

        // each line wipes in from the left, one after the next
        const reveal = reduced
          ? 1
          : Math.max(
              0,
              Math.min(1, (elapsed - i * REVEAL_STAGGER) / REVEAL_DURATION),
            );
        if (reveal <= 0) continue;
        const eased = 1 - Math.pow(1 - reveal, 4);

        current[i] += (targets[i] - current[i]) * (reduced ? 1 : SMOOTH_LERP);
        const edge = width * (1 - ANGLES_DIVIDER) - current[i];

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, line.lineY, width * eased, line.lineHeight);
        ctx.clip();

        // the tail that runs to the right edge
        ctx.fillRect(0, line.idleLineY, width, line.idleHeight);

        // the wedge: full height at the left, sloping down to the tail
        ctx.beginPath();
        ctx.moveTo(0, line.interactiveLineY);
        ctx.lineTo(edge, line.idleLineY);
        ctx.lineTo(0, line.idleLineY);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      frame = requestAnimationFrame(render);
    };

    layout();
    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer);
    // scrolling changes which line sits under the cursor
    const onScroll = () => {
      const rect = host.getBoundingClientRect();
      const index = lineAt(
        Math.min(Math.max(pointer.clientY - rect.top, 0), rect.height),
      );
      if (index !== undefined && index !== hovered) {
        hovered = index;
        setTargets();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      canvas.remove();
    };
  }, []);

  return <div className={styles.lines} ref={wrapper} aria-hidden="true" />;
}
