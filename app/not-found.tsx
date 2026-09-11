import Link from "next/link";
import Button from "./components/Button";
import { ArrowRight } from "./components/Icons";

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "var(--clamp-32)",
        padding: "var(--clamp-140) var(--grid-margin)",
      }}
    >
      <span className="u-mono" style={{ color: "var(--grey-700)" }}>
        / Error 404
      </span>
      <h1 className="t-display-l">This page went fwrd without us.</h1>
      <Button href="/" color="black" icon={<ArrowRight />}>
        Back to home
      </Button>
      <Link href="/contact" className="u-mono" style={{ color: "var(--grey-800)" }}>
        Or get in touch →
      </Link>
    </section>
  );
}
