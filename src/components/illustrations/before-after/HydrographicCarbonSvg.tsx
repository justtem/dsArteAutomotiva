interface SideProps {
  side: 'before' | 'after';
}

export function HydrographicCarbonSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <rect width="640" height="400" fill={isBefore ? '#1A1C20' : '#080B10'} />

      <defs>
        {/* Trama diagonal realista de Fibra de Carbono WTP */}
        <pattern
          id={`carbon-weave-${side}`}
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect width="16" height="16" fill="#0E131C" />
          <path d="M0 8 L8 0 L16 0 L0 16 Z" fill="#1C2638" />
          <path d="M8 16 L16 8 L16 16 Z" fill="#1C2638" />
          <line x1="0" y1="8" x2="8" y2="0" stroke="#3B82F6" strokeOpacity="0.22" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Moldura técnica de peça automotiva (console / retrovisor / carenagem) */}
      <path
        d="M84 96 Q320 52 556 96 L526 312 Q320 344 114 312 Z"
        fill={isBefore ? '#2B2F36' : `url(#carbon-weave-${side})`}
        stroke={isBefore ? '#4B5563' : '#0066FF'}
        strokeWidth="2.5"
      />

      {/* Recorte interno da moldura */}
      <rect
        x="212"
        y="148"
        width="216"
        height="104"
        rx="10"
        fill="#07090C"
        stroke={isBefore ? '#3F444E' : '#3B82F6'}
        strokeWidth="2"
      />

      {isBefore ? (
        <g>
          {/* Plástico original ressecado e riscado */}
          <path
            d="M84 96 Q320 52 556 96 L526 312 Q320 344 114 312 Z"
            fill="#6B7280"
            fillOpacity="0.22"
          />
          {[138, 174, 240, 390, 442, 488].map((x, idx) => (
            <line
              key={x}
              x1={x}
              y1={108 + (idx % 2) * 18}
              x2={x + 34}
              y2={292 - (idx % 3) * 20}
              stroke="#9CA3AF"
              strokeOpacity="0.32"
              strokeWidth="1.6"
            />
          ))}
          <text x="234" y="204" fill="#94A3B8" fontSize="11" fontFamily="monospace">
            PLÁSTICO DESGASTADO
          </text>
        </g>
      ) : (
        <g>
          {/* Reflexo de verniz PU espelhado sobre a hidrográfica */}
          <polygon points="122,94 214,82 162,316 112,308" fill="#FFFFFF" fillOpacity="0.11" />
          <polygon points="442,82 486,88 436,318 402,320" fill="#60A5FA" fillOpacity="0.16" />
          <text x="226" y="196" fill="#60A5FA" fontSize="11" fontFamily="monospace">
            HIDROGRÁFICA WTP
          </text>
          <text x="226" y="214" fill="#FFFFFF" fontSize="11" fontFamily="monospace">
            CARBONO + VERNIZ PU
          </text>
        </g>
      )}
    </svg>
  );
}
