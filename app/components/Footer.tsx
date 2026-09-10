"use client";

import Link from "next/link";
import RollText from "./RollText";
import { ArrowUpRight, Mark } from "./Icons";
import { offices, services, site } from "../lib/site";
import styles from "./Footer.module.css";

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "Facebook", href: "https://www.facebook.com" },
  { label: "X (Twitter)", href: "https://x.com" },
  { label: "Instagram", href: "https://www.instagram.com" },
];

function Badge({ top, main, sub }: { top?: string; main: string; sub?: string }) {
  return (
    <span className={styles.badge}>
      {top ? <em>{top}</em> : null}
      <strong>{main}</strong>
      {sub ? <em>{sub}</em> : null}
    </span>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        {/* --- identity --- */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandMark}>
              <Mark />
            </span>
            <span className={styles.brandText}>{site.name.toUpperCase()}®</span>
          </Link>

          <Link href="/fr" className={styles.lang}>
            <RollText>Français</RollText>
          </Link>

          <div className={styles.badges}>
            <Badge top="Est" main="2016" />
            <Badge main="SOC2" sub="Type II" />
            <Badge main="HIPAA" sub="Compliant" />
            <Badge top="aws" main="Partner" />
          </div>

          <div className={styles.clutch}>
            <strong>Clutch</strong>
            <span>4.9/5</span>
            <span className={styles.stars}>★★★★★</span>
          </div>
        </div>

        {/* --- link groups --- */}
        <div className={styles.groupA}>
          <h3 className={styles.groupTitle}>Services</h3>
          <ul>
            {services.map((service) => (
              <li key={service.id}>
                <Link href={service.slug} className={styles.link}>
                  <RollText>{service.title}</RollText>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.groupB}>
          <ul className={styles.plainList}>
            <li>
              <Link href="/projects" className={styles.groupTitleLink}>
                <RollText>Projects</RollText>
              </Link>
            </li>
            <li>
              <Link href="/#expertise" className={styles.groupTitleLink}>
                <RollText>Expertise</RollText>
              </Link>
            </li>
            <li>
              <a
                href="https://example.com"
                className={styles.groupTitleLink}
                target="_blank"
                rel="noreferrer"
              >
                <RollText>Axkit</RollText>
                <span className={styles.linkArrow}>
                  <ArrowUpRight />
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.groupC}>
          <h3 className={styles.groupTitle}>Content</h3>
          <ul>
            <li>
              <Link href="/articles" className={styles.link}>
                <RollText>Articles</RollText>
              </Link>
            </li>
            <li>
              <Link href="/podcasts" className={styles.link}>
                <RollText>Podcasts</RollText>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.groupD}>
          <h3 className={styles.groupTitle}>Social Media</h3>
          <ul>
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className={styles.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <RollText>{social.label}</RollText>
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* --- offices --- */}
      <div className={styles.offices}>
        <h3 className={`${styles.groupTitle} ${styles.officesTitle}`}>Offices</h3>
        {offices.map((office) => (
          <h3 key={office.country} className={styles.groupTitle}>
            {office.country}
          </h3>
        ))}

        <span className={styles.officeRule} aria-hidden="true" />

        <span />
        {offices.map((office) => (
          <address key={office.country} className={styles.officeAddress}>
            {office.lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
            <a href={`tel:${site.phone.replace(/\D/g, "")}`} className={styles.link}>
              <RollText>{site.phone}</RollText>
            </a>
          </address>
        ))}
      </div>

      <div className={styles.bottom}>
        <span>
          © {year} {site.name}
        </span>
        <div className={styles.legal}>
          <Link href="/terms" className={styles.link}>
            <RollText>Terms &amp; Conditions</RollText>
          </Link>
          <Link href="/privacy" className={styles.link}>
            <RollText>Privacy Policy</RollText>
          </Link>
        </div>
        <span className={styles.credit}>
          {site.code} {site.codeLabel}
        </span>
      </div>
    </footer>
  );
}
