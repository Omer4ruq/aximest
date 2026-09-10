"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import styles from "./Button.module.css";

type Color = "default" | "black" | "grey" | "red" | "red-outline";
type Variant = "default" | "icon" | "link" | "link-blink";

type BaseProps = {
  children: ReactNode;
  /** Second label revealed on hover — the label rolls up and this rolls in. */
  hoverLabel?: string;
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

function Label({ children, hoverLabel }: { children: ReactNode; hoverLabel?: string }) {
  if (!hoverLabel) {
    return <span className={styles.label}>{children}</span>;
  }
  return (
    <span className={styles.swap}>
      <span className={styles.swapInner}>
        <em className={styles.swapItem}>{children}</em>
        <em className={styles.swapItem} aria-hidden="true">
          {hoverLabel}
        </em>
      </span>
      {/* reserves the widest width so the button never resizes on hover */}
      <em className={styles.ghost} aria-hidden="true">
        {hoverLabel}
      </em>
    </span>
  );
}

export default function Button(props: ButtonProps) {
  const {
    children,
    hoverLabel,
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

  const inner = (
    <>
      <Label hoverLabel={hoverLabel}>{children}</Label>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
    </>
  );

  const shared = {
    className: cls,
    "data-color": color,
    "data-variant": variant,
    "data-icon-placement": iconPlacement,
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
