"use client";

import { useEffect } from "react";

/** Flips the global theme tokens for pages that run on black. */
export default function PageTheme({ theme }: { theme: "light" | "dark" }) {
  useEffect(() => {
    const previous = document.body.dataset.theme;
    document.body.dataset.theme = theme;
    return () => {
      if (previous) document.body.dataset.theme = previous;
      else delete document.body.dataset.theme;
    };
  }, [theme]);

  return null;
}
