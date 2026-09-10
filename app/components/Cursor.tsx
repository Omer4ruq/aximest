"use client";

import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

/**
 * Lerped dot cursor that grows over interactive elements.
 * Disabled on touch / coarse pointers.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = dot.current;
    if (!el) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let frame = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        el.dataset.visible = "true";
      }
      const interactive = (e.target as HTMLElement)?.closest?.(
        "a, button, [role='tab'], input, textarea, select, [data-cursor='hover']",
      );
      el.dataset.hover = interactive ? "true" : "false";
    };

    const onLeave = () => {
      visible = false;
      el.dataset.visible = "false";
    };

    const render = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className={styles.cursor} ref={dot} data-visible="false" aria-hidden="true" />;
}
