interface SideProps {
  side: 'before' | 'after';
}

export function PaintRevitalizationSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <rect width="640" height="400" fill={isBefore ? '#16161B' : '#0B0B0D'} />

      {/* Vincos de capô / carenagem automotiva */}
      <path
        d="M0 245 Q320 218 640 238"
        fill="none"
        stroke={isBefore ? '#3F3F46' : '#0EA5E9'}
        strokeOpacity={isBefore ? '0.6' : '0.75'}
        strokeWidth="2"
      />
      <path
        d="M0 112 Q320 96 640 108"
        fill="none"
        stroke="#27272F"
        strokeWidth="1.5"
      />

      {isBefore ? (
        <g>
          <rect x="0" y="0" width="640" height="400" fill="#71717A" fillOpacity="0.12" />
          <g stroke="#A1A1AA" strokeOpacity="0.24" strokeWidth="1.2" fill="none">
            {[24, 40, 56, 72, 90, 110, 132, 154].map((r, idx) => (
              <circle
                key={r}
                cx="320"
                cy="180"
                r={r}
                strokeDasharray={`${r * 1.1} ${r * 0.7}`}
                transform={`rotate(${idx * 37} 320 180)`}
              />
            ))}
          </g>
          <text
            x="24"
            y="376"
            textAnchor="start"
            fill="#A1A1AA"
            fontSize="10.5"
            fontFamily="JetBrains Mono, monospace"
          >
            VERNIZ OPACO • MICRO-RISCOS
          </text>
        </g>
      ) : (
        <g>
          {/* Reflexos geométricos das calhas de LED da cabine no verniz PU espelhado */}
          <polygon points="85,68 555,28 562,42 92,82" fill="#F5F5F4" fillOpacity="0.92" />
          <polygon points="118,124 532,86 538,98 124,136" fill="#0EA5E9" fillOpacity="0.85" />
          <polygon points="142,174 510,142 514,150 146,182" fill="#F97316" fillOpacity="0.6" />

          {[
            [148, 282],
            [216, 268],
            [284, 294],
            [356, 272],
            [424, 290],
            [492, 268],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" fill="#F5F5F4" fillOpacity="0.55" />
          ))}

          <text
            x="616"
            y="376"
            textAnchor="end"
            fill="#0EA5E9"
            fontSize="10.5"
            fontFamily="JetBrains Mono, monospace"
          >
            VERNIZ PU ESPELHADO • PROTEÇÃO UV
          </text>
        </g>
      )}
    </svg>
  );
}
