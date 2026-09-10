"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";
import RollText from "./RollText";
import { ArrowRight, ArrowUpRight, Mark } from "./Icons";
import { nav, site } from "../lib/site";
import styles from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>("Services");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 300 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-menu-open", open);
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={styles.header} data-hidden={hidden && !open} data-open={open}>
      {/* Notched card holding the identity and the menu trigger */}
      <div className={styles.card}>
        <div className={styles.cardMain}>
          <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
            <span className={styles.brandMark}>
              <Mark />
            </span>
            <span className={styles.brandText}>{site.mark}</span>
          </Link>
          <span className={styles.brandTag}>
            Development
            <br />
            Labs
          </span>
        </div>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <span className={styles.notch} aria-hidden="true" />

      <p className={styles.statement}>
        An Elite Team of
        <br />
        Software Engineers
      </p>

      <Button
        href="/contact"
        color="black"
        hoverLabel="Contact us"
        icon={<ArrowRight />}
        className={styles.cta}
      >
        Let&apos;s Talk
      </Button>

      {/* Full-screen navigation */}
      <div className={styles.panel} data-open={open} aria-hidden={!open}>
        <div className={styles.panelInner}>
          <ul className={styles.menuList}>
            {nav.map((item, i) => (
              <li
                key={item.label}
                className={styles.menuItem}
                style={{ ["--i" as string]: String(i) }}
              >
                <div className={styles.menuRow}>
                  <span className={styles.menuNum}>{item.n}</span>
                  <Link
                    href={item.href}
                    className={styles.menuLink}
                    onClick={() => setOpen(false)}
                  >
                    <RollText stagger={0.014}>{item.label}</RollText>
                  </Link>
                  {item.children ? (
                    <button
                      type="button"
                      className={styles.menuToggle}
                      data-open={openGroup === item.label}
                      onClick={() =>
                        setOpenGroup((g) => (g === item.label ? null : item.label))
                      }
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <span />
                      <span />
                    </button>
                  ) : null}
                </div>

                {item.children ? (
                  <div className={styles.subWrap} data-open={openGroup === item.label}>
                    <ul className={styles.subList}>
                      {item.children.map((child, ci) => (
                        <li key={child.id}>
                          <Link
                            href={child.slug}
                            className={styles.subLink}
                            onClick={() => setOpen(false)}
                          >
                            <span className={styles.subNum}>
                              S{String(ci + 1).padStart(2, "0")}
                            </span>
                            <RollText stagger={0.012}>{child.title}</RollText>
                            <span className={styles.subArrow}>
                              <ArrowUpRight />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>

          <div className={styles.panelFoot}>
            <span>{site.city}</span>
            <span>
              {site.code} {site.codeLabel}
            </span>
            <a href={`tel:${site.phone.replace(/\D/g, "")}`}>
              <RollText>{site.phone}</RollText>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
