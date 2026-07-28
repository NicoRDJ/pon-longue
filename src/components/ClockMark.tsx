const HOUR_MARKS = Array.from({ length: 12 }, (_, i) => i * 30);

export default function ClockMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label="Reloj decorativo"
    >
      <circle
        cx="100"
        cy="100"
        r="96"
        fill="none"
        stroke="var(--color-brass)"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <circle
        cx="100"
        cy="100"
        r="84"
        fill="none"
        stroke="var(--color-brass)"
        strokeWidth="0.5"
        opacity="0.35"
      />

      {HOUR_MARKS.map((deg) => (
        <line
          key={deg}
          x1="100"
          y1="10"
          x2="100"
          y2={deg % 90 === 0 ? "24" : "18"}
          stroke="var(--color-brass-light)"
          strokeWidth={deg % 90 === 0 ? 2 : 1}
          opacity="0.85"
          transform={`rotate(${deg} 100 100)`}
        />
      ))}

      {/* Hour hand, fixed at 10 */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="55"
        stroke="var(--color-cream)"
        strokeWidth="4"
        strokeLinecap="round"
        transform="rotate(300 100 100)"
      />
      {/* Minute hand, fixed at 10 (10:10 display position) */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="34"
        stroke="var(--color-cream)"
        strokeWidth="3"
        strokeLinecap="round"
        transform="rotate(60 100 100)"
      />
      {/* Second hand: slow continuous rotation for subtle motion */}
      <g
        style={{
          transformOrigin: "100px 100px",
          animation: "tick 60s linear infinite",
        }}
      >
        <line
          x1="100"
          y1="112"
          x2="100"
          y2="28"
          stroke="var(--color-brass-light)"
          strokeWidth="1.25"
        />
      </g>

      <circle cx="100" cy="100" r="4" fill="var(--color-brass-light)" />
    </svg>
  );
}
