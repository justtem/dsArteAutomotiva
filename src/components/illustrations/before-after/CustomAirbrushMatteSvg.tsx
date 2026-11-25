interface SideProps {
  side: 'before' | 'after';
}

export function CustomAirbrushMatteSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <defs>
        <linearGradient id="matte-garage-tank" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1F2937" />
          <stop offset="55%" stopColor="#141418" />
          <stop offset="100%" stopColor="#0B0B0D" />
        </linearGradient>
        <linearGradient id="airbrush-flame" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="65%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>

      <rect width="640" height="400" fill={isBefore ? '#141418' : '#0B0B0D'} />

      {/* Silhueta de Tanque / Carenagem Esportiva Custom */}
      <path
        d="M92 250 C96 152, 198 92, 356 98 C466 102, 536 148, 552 218 C556 238, 538 260, 504 264 L138 270 C106 270, 90 264, 92 250 Z"
        fill={isBefore ? '#27272F' : 'url(#matte-garage-tank)'}
        stroke={isBefore ? '#3F3F46' : '#0EA5E9'}
        strokeWidth="2.4"
      />

      {/* Bocal esportivo */}
      <ellipse
        cx="336"
        cy="108"
        rx="28"
        ry="9"
        fill="#0B0B0D"
        stroke={isBefore ? '#3F3F46' : '#A1A1AA'}
        strokeWidth="2"
      />

      {isBefore ? (
        <g>
          <ellipse cx="276" cy="178" rx="92" ry="38" fill="#71717A" fillOpacity="0.18" />
          {[168, 222, 286, 352, 418].map((x, idx) => (
            <line
              key={x}
              x1={x}
              y1={130 + (idx % 2) * 18}
              x2={x + 44}
              y2={248 - (idx % 3) * 16}
              stroke="#A1A1AA"
              strokeOpacity="0.3"
              strokeWidth="1.8"
            />
          ))}
          <text
            x="24"
            y="376"
            textAnchor="start"
            fill="#A1A1AA"
            fontSize="10.5"
            fontFamily="JetBrains Mono, monospace"
          >
            PEÇA LISA • VERNIZ DESBOTADO
          </text>
        </g>
      ) : (
        <g>
          <path
            d="M126 244 C184 184, 282 150, 488 160 L526 202 C348 194, 236 218, 162 260 Z"
            fill="url(#airbrush-flame)"
            fillOpacity="0.88"
          />
          <path
            d="M158 210 C236 154, 336 132, 472 140"
            fill="none"
            stroke="#F5F5F4"
            strokeOpacity="0.82"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <ellipse cx="268" cy="138" rx="86" ry="16" fill="#F5F5F4" fillOpacity="0.08" />
          <text
            x="616"
            y="376"
            textAnchor="end"
            fill="#0EA5E9"
            fontSize="10.5"
            fontFamily="JetBrains Mono, monospace"
          >
            AEROGRAFIA + VERNIZ FOSCO UV
          </text>
        </g>
      )}
    </svg>
  );
}
