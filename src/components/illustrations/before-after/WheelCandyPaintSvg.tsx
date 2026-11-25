interface SideProps {
  side: 'before' | 'after';
}

export function WheelCandyPaintSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <defs>
        <linearGradient id="candy-purple-wheel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="55%" stopColor="#6B21A8" />
          <stop offset="100%" stopColor="#2E1065" />
        </linearGradient>
      </defs>

      <rect width="640" height="400" fill={isBefore ? '#141418' : '#0B0B0D'} />
      <line x1="0" y1="352" x2="640" y2="352" stroke="#27272F" strokeWidth="1.5" />

      {/* Pneu */}
      <circle
        cx="320"
        cy="190"
        r="146"
        fill={isBefore ? '#1E1E24' : '#111113'}
        stroke={isBefore ? '#3F3F46' : '#27272F'}
        strokeWidth="4"
      />
      <circle
        cx="320"
        cy="190"
        r="126"
        fill="none"
        stroke={isBefore ? '#3F3F46' : '#27272F'}
        strokeWidth="3"
        strokeDasharray="14 8"
      />

      {/* Tambor e disco de freio */}
      <circle cx="320" cy="190" r="106" fill={isBefore ? '#1C1C22' : '#0B0B0D'} />
      <circle cx="320" cy="190" r="68" fill="#27272F" />
      <circle cx="320" cy="190" r="42" fill="#141418" />

      {/* Pinça de freio personalizada */}
      <rect
        x="356"
        y="154"
        width="32"
        height="70"
        rx="2"
        fill={isBefore ? '#3F3F46' : '#F97316'}
      />

      {/* 10 raios da roda */}
      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
        <polygon
          key={deg}
          points="314,162 326,162 329,86 311,86"
          fill={isBefore ? '#71717A' : 'url(#candy-purple-wheel)'}
          transform={`rotate(${deg} 320 190)`}
        />
      ))}

      {/* Borda da roda e cubo */}
      <circle
        cx="320"
        cy="190"
        r="106"
        fill="none"
        stroke={isBefore ? '#71717A' : '#A855F7'}
        strokeWidth="6"
      />
      <circle
        cx="320"
        cy="190"
        r="28"
        fill={isBefore ? '#27272F' : '#0B0B0D'}
        stroke={isBefore ? '#71717A' : '#0EA5E9'}
        strokeWidth="2.5"
      />

      {/* 5 parafusos */}
      {[0, 72, 144, 216, 288].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle
            key={deg}
            cx={320 + Math.cos(rad) * 16}
            cy={190 + Math.sin(rad) * 16}
            r="3.2"
            fill={isBefore ? '#52525B' : '#F5F5F4'}
          />
        );
      })}

      {isBefore ? (
        <g>
          {[
            [236, 110, 260, 124],
            [396, 116, 414, 140],
            [406, 246, 384, 268],
            [228, 248, 252, 270],
          ].map(([x1, y1, x2, y2]) => (
            <line
              key={`${x1}-${y1}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#D4D4D8"
              strokeOpacity="0.45"
              strokeWidth="2.2"
            />
          ))}
          <text
            x="24"
            y="378"
            textAnchor="start"
            fill="#A1A1AA"
            fontSize="10.5"
            fontFamily="JetBrains Mono, monospace"
          >
            ARO OXIDADO • RISCOS DE USO
          </text>
        </g>
      ) : (
        <g>
          <path
            d="M228 136 A106 106 0 0 1 396 114"
            fill="none"
            stroke="#F5F5F4"
            strokeOpacity="0.65"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text
            x="616"
            y="378"
            textAnchor="end"
            fill="#F97316"
            fontSize="10.5"
            fontFamily="JetBrains Mono, monospace"
          >
            CANDY ROXO • VERNIZ ESPELHADO
          </text>
        </g>
      )}
    </svg>
  );
}
