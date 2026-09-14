import styles from "./ServiceGlyph.module.css";

/**
 * Abstract service marks. The reference plays a looping Lottie in this slot,
 * so each mark here carries its own continuous loop rather than sitting still.
 */
export default function ServiceGlyph({ id }: { id: string }) {
  switch (id) {
    case "advisory":
      // two discs drifting through each other
      return (
        <svg viewBox="0 0 240 120" width="100%" height="100%" aria-hidden="true">
          <g className={styles.driftA}>
            <circle cx="92" cy="60" r="58" fill="currentColor" />
          </g>
          <g className={styles.driftB}>
            <circle cx="148" cy="60" r="58" fill="currentColor" />
          </g>
          <circle cx="120" cy="60" r="19" className={styles.pulseHole} />
        </svg>
      );

    case "blockchain":
      // chevrons marching right, the leader wrapping to the back
      return (
        <svg viewBox="0 0 240 120" width="100%" height="100%" aria-hidden="true">
          <g className={styles.march}>
            {[0, 1, 2, 3].map((i) => (
              <path
                key={i}
                d={`M${26 + i * 56} 6h32l36 54-36 54H${26 + i * 56}l36-54-36-54Z`}
                fill="currentColor"
              />
            ))}
          </g>
        </svg>
      );

    case "product-development":
      // bars shearing in a travelling wave
      return (
        <svg viewBox="0 0 240 120" width="100%" height="100%" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect
              key={i}
              className={styles.wave}
              style={{ ["--i" as string]: String(i) }}
              x={22 + i * 36}
              y="6"
              width="16"
              height="108"
              fill="currentColor"
            />
          ))}
        </svg>
      );

    case "enterprise-software":
      // a grid of blocks breathing out of phase
      return (
        <svg viewBox="0 0 240 120" width="100%" height="100%" aria-hidden="true">
          {[
            [34, 6],
            [102, 6],
            [34, 66],
          ].map(([x, y], i) => (
            <rect
              key={i}
              className={styles.breathe}
              style={{ ["--i" as string]: String(i) }}
              x={x}
              y={y}
              width="58"
              height="48"
              fill="currentColor"
            />
          ))}
          <circle className={styles.orbit} cx="131" cy="90" r="26" fill="currentColor" />
        </svg>
      );

    default:
      // concentric rings turning at different rates
      return (
        <svg viewBox="0 0 240 120" width="100%" height="100%" aria-hidden="true">
          <g className={styles.spinSlow}>
            <path
              d="M120 2a58 58 0 1 1 0 116 58 58 0 0 1 0-116Zm0 16a42 42 0 1 0 0 84 42 42 0 0 0 0-84Z"
              fill="currentColor"
            />
          </g>
          <g className={styles.spinFast}>
            <rect x="112" y="0" width="16" height="30" fill="currentColor" />
            <rect x="112" y="90" width="16" height="30" fill="currentColor" />
          </g>
          <circle className={styles.corePulse} cx="120" cy="60" r="17" fill="currentColor" />
        </svg>
      );
  }
}
