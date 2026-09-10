/** Abstract black glyphs — one per service — used in the right-hand panels. */
export default function ServiceGlyph({ id }: { id: string }) {
  const common = { fill: "currentColor" } as const;

  switch (id) {
    case "advisory":
      return (
        <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
          <circle cx="42" cy="60" r="38" {...common} />
          <circle cx="78" cy="60" r="38" {...common} />
          <circle cx="60" cy="60" r="14" fill="var(--card-bg, #f0f1f4)" />
        </svg>
      );
    case "blockchain":
      return (
        <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
          <path d="M14 12h30l32 48-32 48H14l32-48-32-48Z" {...common} />
          <path d="M58 12h30l32 48-32 48H58l32-48-32-48Z" {...common} />
        </svg>
      );
    case "product-development":
      return (
        <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${8 + i * 22} 110 L${20 + i * 22} 10 h8 L${16 + i * 22} 110 Z`}
              {...common}
            />
          ))}
        </svg>
      );
    case "enterprise-software":
      return (
        <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
          <rect x="8" y="8" width="46" height="46" {...common} />
          <rect x="66" y="8" width="46" height="46" {...common} />
          <rect x="8" y="66" width="46" height="46" {...common} />
          <circle cx="89" cy="89" r="23" {...common} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 120" width="100%" height="100%" aria-hidden="true">
          <circle cx="60" cy="60" r="52" {...common} />
          <circle cx="60" cy="60" r="30" fill="var(--card-bg, #f0f1f4)" />
          <circle cx="60" cy="60" r="12" {...common} />
          <rect x="56" y="0" width="8" height="28" {...common} />
          <rect x="56" y="92" width="8" height="28" {...common} />
        </svg>
      );
  }
}
