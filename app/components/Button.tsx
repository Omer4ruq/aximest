"use client";

import Link from "next/link";
import { useCallback, useRef, type ComponentProps, type ReactNode } from "react";
import { scramble } from "./Scramble";
import styles from "./Button.module.css";

type Color = "default" | "black" | "grey" | "red" | "red-outline";
type Variant = "default" | "icon" | "link" | "link-blink";

type BaseProps = {
  children: ReactNode;
  color?: Color;
  variant?: Variant;
  inverted?: boolean;
  icon?: ReactNode;
  iconPlacement?: "left" | "right";
  className?: string;
  full?: boolean;
};

type ButtonAsLink = BaseProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "children" | "className"
  >;
type ButtonAsButton = BaseProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "children" | "className" | "color"
  >;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/** The label shuffles through glyphs on hover, as the reference does. */
function useHoverScramble(text: string) {
  const ref = useRef<HTMLSpanElement>(null);
  const cancel = useRef<(() => void) | null>(null);

  const onEnter = useCallback(() => {
    const el = ref.current;
    if (!el || !text) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancel.current?.();
    cancel.current = scramble(el, text);
  }, [text]);

  const onLeave = useCallback(() => {
    cancel.current?.();
    cancel.current = null;
  }, []);

  return { ref, onEnter, onLeave };
}

export default function Button(props: ButtonProps) {
  const {
    children,
    color = "default",
    variant = "default",
    inverted = false,
    icon,
    iconPlacement = "right",
    className = "",
    full = false,
    ...rest
  } = props as BaseProps & Record<string, unknown>;

  const cls = [
    styles.button,
    inverted ? styles.inverted : "",
    full ? styles.full : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const label = typeof children === "string" ? children : "";
  const { ref: labelRef, onEnter, onLeave } = useHoverScramble(label);

  const inner = (
    <>
      {label ? (
        <span className={styles.label} ref={labelRef}>
          {label}
        </span>
      ) : (
        <span className={styles.label}>{children}</span>
      )}
      {icon ? <span className={styles.icon}>{icon}</span> : null}
    </>
  );

  const shared = {
    className: cls,
    "data-color": color,
    "data-variant": variant,
    "data-icon-placement": iconPlacement,
    onPointerEnter: onEnter,
    onPointerLeave: onLeave,
    ...(label ? { "aria-label": label } : {}),
  };

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as { href: string };
    return (
      <Link href={href} {...shared} {...(anchorRest as object)}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" {...shared} {...(rest as ComponentProps<"button">)}>
      {inner}
    </button>
  );
}
