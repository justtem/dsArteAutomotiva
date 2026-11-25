interface SideProps {
  side: 'before' | 'after';
}

export function PaintRevitalizationSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <rect width="640" height="400" fill={isBefore ? '#1C1F24' : '#070A0F'} />

      {/* Vincos de capô / carenagem automotiva */}
      <path
        d="M0 245 Q320 218 640 238"
        fill="none"
        stroke={isBefore ? '#3B3F46' : '#38BDF8'}
        strokeOpacity={isBefore ? '0.6' : '0.75'}
        strokeWidth="2"
      />
      <path
        d="M0 112 Q320 96 640 108"
        fill="none"
        stroke={isBefore ? '#2B2F36' : '#1E293B'}
        strokeWidth="1.5"
      />

      {isBefore ? (
        <g>
          {/* Névoa opaca no verniz queimado de sol */}
          <rect x="0" y="0" width="640" height="400" fill="#6B675E" fillOpacity="0.15" />
          {/* Micro-riscos circulares (swirls) sob inspeção óptica */}
          <g stroke="#CBD5E1" strokeOpacity="0.24" strokeWidth="1.2" fill="none">
            {[24, 40, 56, 72, 90, 110, 132, 154].map((r, idx) => (
              <circle
                key={r}
                cx="320"
                cy="184"
                r={r}
                strokeDasharray={`${r * 1.1} ${r * 0.7}`}
                transform={`rotate(${idx * 37} 320 184)`}
              />
            ))}
          </g>
          <text x="184" y="346" fill="#94A3B8" fontSize="11" fontFamily="monospace">
            VERNIZ QUEIMADO DE SOL • MICRO-RISCOS
          </text>
        </g>
      ) : (
        <g>
          {/* Reflexos geométricos nítidos das luminárias da cabine no verniz PU espelhado */}
          <polygon points="85,68 555,28 562,42 92,82" fill="#FFFFFF" fillOpacity="0.92" />
          <polygon points="118,124 532,86 538,98 124,136" fill="#29B6F6" fillOpacity="0.86" />
          <polygon points="142,174 510,142 514,150 146,182" fill="#FB923C" fillOpacity="0.55" />

          {/* Profundidade metálica no verniz renovado */}
          {[
            [148, 282],
            [216, 268],
            [284, 294],
            [356, 272],
            [424, 290],
            [492, 268],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.2" fill="#93C5FD" fillOpacity="0.7" />
          ))}

          <text x="168" y="346" fill="#38BDF8" fontSize="11" fontFamily="monospace">
            PINTURA & VERNIZ PU ESPELHADO • PROTEÇÃO UV
          </text>
        </g>
      )}
    </svg>
  );
}
