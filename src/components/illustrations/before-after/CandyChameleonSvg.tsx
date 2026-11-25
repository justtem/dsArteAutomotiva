interface SideProps {
  side: 'before' | 'after';
}

export function CandyChameleonSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <rect width="640" height="400" fill={isBefore ? '#141418' : '#0B0B0D'} />

      {/* Silhueta de Capacete / Tanque Custom */}
      <path
        d="M148 272 C142 148, 224 74, 344 78 C448 82, 506 150, 502 252 L472 290 L184 290 Z"
        fill={isBefore ? '#27272F' : '#141418'}
        stroke={isBefore ? '#3F3F46' : '#0EA5E9'}
        strokeWidth="2.5"
      />

      {/* Viseira técnica */}
      <path
        d="M332 134 L494 162 L486 228 L322 210 Z"
        fill="#0B0B0D"
        stroke={isBefore ? '#3F3F46' : '#0EA5E9'}
        strokeWidth="2"
      />

      {isBefore ? (
        <g>
          <ellipse cx="268" cy="164" rx="68" ry="34" fill="#71717A" fillOpacity="0.2" />
          {[196, 238, 282, 318].map((x, idx) => (
            <line
              key={x}
              x1={x}
              y1={116 + idx * 14}
              x2={x + 42}
              y2={258 - idx * 12}
              stroke="#A1A1AA"
              strokeOpacity="0.28"
              strokeWidth="2"
            />
          ))}
          {/* Legenda ancorada no canto inferior esquerdo (longe do centro 50%) */}
          <text
            x="24"
            y="376"
            textAnchor="start"
            fill="#A1A1AA"
            fontSize="10.5"
            fontFamily="JetBrains Mono, monospace"
          >
            PINTURA OXIDADA / SEM BRILHO
          </text>
        </g>
      ) : (
        <g>
          <path
            d="M164 262 C166 168, 232 98, 340 96 C376 96, 412 106, 438 122 L308 272 Z"
            fill="#0EA5E9"
            fillOpacity="0.36"
          />
          <path
            d="M204 276 L352 120 L458 252 L446 278 Z"
            fill="#F97316"
            fillOpacity="0.32"
          />
          {[
            [218, 162],
            [248, 136],
            [276, 182],
            [236, 218],
            [298, 146],
            [264, 240],
            [348, 234],
            [382, 250],
            [418, 252],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill="#F5F5F4" fillOpacity="0.8" />
          ))}
          <path
            d="M196 158 Q268 106 364 108"
            fill="none"
            stroke="#F5F5F4"
            strokeOpacity="0.85"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Legenda ancorada no canto inferior direito (longe do centro 50%) */}
          <text
            x="616"
            y="376"
            textAnchor="end"
            fill="#0EA5E9"
            fontSize="10.5"
            fontFamily="JetBrains Mono, monospace"
          >
            CANDY • CAMALEÃO • VERNIZ PU
          </text>
        </g>
      )}
    </svg>
  );
}
