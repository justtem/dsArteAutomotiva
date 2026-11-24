interface SideProps {
  side: 'before' | 'after';
}

export function CandyChameleonSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <rect width="640" height="400" fill={isBefore ? '#18181B' : '#07090E'} />

      {/* Silhueta de Capacete / Tanque Custom */}
      <path
        d="M148 278 C142 152, 224 78, 344 82 C448 86, 506 154, 502 256 L472 296 L184 296 Z"
        fill={isBefore ? '#2D3036' : '#131B3A'}
        stroke={isBefore ? '#52525B' : '#3B82F6'}
        strokeWidth="3"
      />

      {/* Viseira técnica */}
      <path
        d="M332 138 L494 166 L486 232 L322 214 Z"
        fill="#07090C"
        stroke={isBefore ? '#52525B' : '#60A5FA'}
        strokeWidth="2"
      />

      {isBefore ? (
        <g>
          {/* Pintura original sem brilho e com marcas */}
          <ellipse cx="272" cy="168" rx="68" ry="34" fill="#71717A" fillOpacity="0.22" />
          {[196, 238, 282, 318].map((x, idx) => (
            <line
              key={x}
              x1={x}
              y1={120 + idx * 14}
              x2={x + 42}
              y2={264 - idx * 12}
              stroke="#A1A1AA"
              strokeOpacity="0.28"
              strokeWidth="2"
            />
          ))}
          <text x="192" y="338" fill="#94A3B8" fontSize="11" fontFamily="monospace">
            PINTURA COMUM OXIDADA / SEM PROFUNDIDADE
          </text>
        </g>
      ) : (
        <g>
          {/* Camadas ópticas Candy / Camaleão / Flake */}
          <path
            d="M164 268 C166 174, 232 104, 340 102 C376 102, 412 112, 438 128 L308 278 Z"
            fill="#0066FF"
            fillOpacity="0.42"
          />
          <path
            d="M204 282 L352 126 L458 258 L446 284 Z"
            fill="#7C3AED"
            fillOpacity="0.34"
          />
          {/* Partículas Metal Flake / Cristal 3D */}
          {[
            [218, 168],
            [248, 142],
            [276, 188],
            [236, 224],
            [298, 152],
            [264, 246],
            [316, 238],
            [362, 256],
            [408, 258],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill="#93C5FD" />
          ))}
          {/* Faixa de alto brilho verniz Candy */}
          <path
            d="M196 164 Q268 112 364 114"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.85"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <text x="184" y="338" fill="#60A5FA" fontSize="11" fontFamily="monospace">
            CANDY • CAMALEÃO • FLAKE • VERNIZ ESPELHADO
          </text>
        </g>
      )}
    </svg>
  );
}
