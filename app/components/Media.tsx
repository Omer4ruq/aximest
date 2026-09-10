/**
 * Monochrome abstract stand-in for photography. Swap these for real <Image>
 * assets by replacing the component body — the surrounding layout is unchanged.
 */
export default function Media({
  seed = 0,
  className = "",
  dark = false,
}: {
  seed?: number;
  className?: string;
  dark?: boolean;
}) {
  const id = `m${seed}`;
  const rot = -18 + seed * 14;

  return (
    <svg
      className={className}
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={dark ? "#242426" : "#3b3c40"} />
          <stop offset="45%" stopColor={dark ? "#0e0e0f" : "#17181a"} />
          <stop offset="100%" stopColor={dark ? "#37383c" : "#4c4d52"} />
        </linearGradient>
        <radialGradient id={`${id}-r`} cx="0.32" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-n`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed={seed + 3} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width="400" height="500" fill={`url(#${id}-g)`} />
      <g transform={`rotate(${rot} 200 250)`} opacity="0.5">
        <rect x="40" y="120" width="320" height="60" fill="#ffffff" opacity="0.06" />
        <rect x="40" y="220" width="320" height="60" fill="#ffffff" opacity="0.1" />
        <rect x="40" y="320" width="320" height="60" fill="#ffffff" opacity="0.05" />
      </g>
      <circle cx={120 + seed * 30} cy={200 + seed * 20} r="150" fill={`url(#${id}-r)`} />
      <rect width="400" height="500" filter={`url(#${id}-n)`} opacity="0.16" />
    </svg>
  );
}
