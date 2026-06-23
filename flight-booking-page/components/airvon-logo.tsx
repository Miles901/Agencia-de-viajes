interface AirvonLogoProps {
  /** Size of the icon mark in px */
  size?: number;
  /** Show text beside the icon */
  showText?: boolean;
  /** Use white text + icon (for dark backgrounds) */
  inverted?: boolean;
}

export function AirvonLogo({ size = 36, showText = true, inverted = false }: AirvonLogoProps) {
  const textColor = inverted ? "#ffffff" : "currentColor";

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Icon mark: globe + flight arc */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer circle – globe */}
        <circle cx="20" cy="20" r="18" fill="url(#globe-grad)" />

        {/* Latitude lines */}
        <ellipse cx="20" cy="20" rx="18" ry="7" stroke="white" strokeOpacity="0.25" strokeWidth="1" fill="none" />
        <line x1="2" y1="20" x2="38" y2="20" stroke="white" strokeOpacity="0.25" strokeWidth="1" />

        {/* Longitude arcs */}
        <path d="M20 2 C27 8 27 32 20 38" stroke="white" strokeOpacity="0.25" strokeWidth="1" fill="none" />
        <path d="M20 2 C13 8 13 32 20 38" stroke="white" strokeOpacity="0.25" strokeWidth="1" fill="none" />

        {/* Flight arc – white dashed curve */}
        <path
          d="M7 28 Q20 6 33 14"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="2.5 2.5"
          fill="none"
        />

        {/* Airplane – positioned at end of arc */}
        <g transform="translate(30, 11) rotate(35)">
          <path
            d="M0 0 L-2.5 1.5 L0 1 L2.5 1.5 Z"
            fill="white"
          />
          <path
            d="M-1 1 L-3 3.5 L-1 3 L1 3.5 Z"
            fill="white"
            opacity="0.85"
          />
        </g>

        {/* Departure dot */}
        <circle cx="7" cy="28" r="1.8" fill="white" />

        {/* Gradient def */}
        <defs>
          <radialGradient id="globe-grad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="var(--logo-grad-start, #3b9eff)" />
            <stop offset="100%" stopColor="var(--logo-grad-end, #0044cc)" />
          </radialGradient>
        </defs>
      </svg>

      {showText && (
        <span
          style={{ color: textColor }}
          className="text-[1.35rem] font-extrabold tracking-tight leading-none"
        >
          Air
          <span style={{ color: inverted ? "#fbbf24" : "var(--logo-accent, #f59e0b)" }}>
            von
          </span>
        </span>
      )}
    </div>
  );
}
