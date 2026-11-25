interface SideProps {
  side: 'before' | 'after';
}

export function HydrographicCarbonSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <rect width="640" height="400" fill={isBefore ? '#141418' : '#0B0B0D'} />

      <defs>
        <pattern
          id={`carbon-weave-${side}`}
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect width="16" height="16" fill="#0B0B0D" />
          <path d="M0 8 L8 0 L16 0 L0 16 Z" fill="#1C1C22" />
          <path d="M8 16 L16 8 L16 16 Z" fill="#1C1C22" />
          <line
            x1="0"
            y1="8"
            x2="8"
            y2="0"
            stroke="#0EA5E9"
            strokeOpacity="0.26"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      {/* Moldura técnica de peça automotiva */}
      <path
        d="M84 92 Q320 48 556 92 L526 304 Q320 336 114 304 Z"
        fill={isBefore ? '#27272F' : `url(#carbon-weave-${side})`}
        stroke={isBefore ? '#3F3F46' : '#0EA5E9'}
        strokeWidth="2.2"
      />

      {/* Recorte interno da moldura (sem texto central para não colidir com a alça em 50%) */}
      <rect
        x="212"
        y="144"
        width="216"
        height="102"
        rx="2"
        fill="#0B0B0D"
        stroke={isBefore ? '#3F3F46' : '#27272F'}
        strokeWidth="2"
      />

      {isBefore ? (
        <g>
          {[138, 174, 240, 390, 442, 488].map((x, idx) => (
            <line
              key={x}
              x1={x}
              y1={104 + (idx % 2) * 18}
              x2={x + 34}
              y2={284 - (idx % 3) * 20}
              stroke="#A1A1AA"
              strokeOpacity="0.32"
              strokeWidth="1.6"
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
            PLÁSTICO ORIGINAL DESGASTADO
          </text>
        </g>
      ) : (
        <g>
          <polygon points="122,90 214,78 162,308 112,300" fill="#F5F5F4" fillOpacity="0.09" />
          <polygon points="442,78 486,84 436,310 402,312" fill="#0EA5E9" fillOpacity="0.16" />
          <text
            x="616"
            y="376"
            textAnchor="end"
            fill="#0EA5E9"
            fontSize="10.5"
            fontFamily="JetBrains Mono, monospace"
          >
            HIDROGRÁFICA WTP + VERNIZ PU
          </text>
        </g>
      )}
    </svg>
  );
}
