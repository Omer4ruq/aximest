"use client";

import Link from "next/link";
import SectionHead from "./SectionHead";
import Button from "./Button";
import ServiceGlyph from "./ServiceGlyph";
import { ArrowRight } from "./Icons";
import { useRevealGroup } from "../hooks/useReveal";
import { services } from "../lib/site";
import styles from "./Services.module.css";

export default function Services() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section className={styles.section} id="services" ref={ref}>
      <SectionHead
        label="Services"
        title="Tech stacks for a rapidly evolving world:"
        count={`/00${services.length}`}
      />

      <ol className={styles.list}>
        {services.map((service) => (
          <li key={service.id} className={styles.row}>
            <span className={styles.index} data-reveal>
              {service.index}
            </span>

            <div className={styles.content}>
              <h3 className={styles.title}>
                <Link href={service.slug} className={styles.titleLink}>
                  <span className={styles.titleMask} data-reveal="mask">
                    <span>{service.title}</span>
                  </span>
                </Link>
              </h3>

              <p className={styles.body} data-reveal>
                {service.description}
              </p>

              <span data-reveal>
                <Button
                  href={service.slug}
                  hoverLabel={`${service.title} →`}
                  icon={<ArrowRight />}
                  className={styles.button}
                >
                  {`Explore ${service.count} Services`}
                </Button>
              </span>
            </div>

            <Link href={service.slug} className={styles.panel} tabIndex={-1} aria-hidden="true">
              <span className={styles.glyph}>
                <ServiceGlyph id={service.id} />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
