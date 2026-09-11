"use client";

import type { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

/** <ul> that gains `is-inview` once it reaches the viewport. */
export default function RevealGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useInView<HTMLUListElement>();
  return (
    <ul className={className} ref={ref}>
      {children}
    </ul>
  );
}
