interface SideProps {
  side: 'before' | 'after';
}

export function PaintRevitalizationSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <rect width="640" height="400" fill={isBefore ? '#1C1F24' : '#070A0F'} />

      {/* Grade sutil de painel de capô/porta */}
      <path
        d="M0 245 Q320 218 640 238"
        fill="none"
        stroke={isBefore ? '#3B3F46' : '#3B82F6'}
        strokeOpacity={isBefore ? '0.6' : '0.65'}
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
          {/* Névoa opaca no verniz */}
          <rect x="0" y="0" width="640" height="400" fill="#6B675E" fillOpacity="0.14" />
          {/* Swirl marks (riscos circulares sob luz) */}
          <g stroke="#CBD5E1" strokeOpacity="0.22" strokeWidth="1.2" fill="none">
            {[24, 40, 56, 72, 90, 110, 132, 154].map((r, idx) => (
              <circle
                key={r}
                cx="330"
                cy="176"
                r={r}
                strokeDasharray={`${r * 1.1} ${r * 0.7}`}
                transform={`rotate(${idx * 37} 330 176)`}
              />
            ))}
          </g>
          {/* Marcas d'água calcificadas e poeira */}
          {[
            [110, 290, 8],
            [164, 318, 6],
            [230, 280, 9],
            [295, 330, 7],
            [370, 296, 8],
            [438, 326, 6],
            [505, 286, 9],
            [560, 314, 7],
          ].map(([cx, cy, r]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="#787163"
              fillOpacity="0.26"
              stroke="#A8A296"
              strokeOpacity="0.32"
              strokeWidth="1"
            />
          ))}
        </g>
      ) : (
        <g>
          {/* Reflexos geométricos nítidos das luminárias do box no verniz preto */}
          <polygon points="85,68 555,24 562,38 92,82" fill="#FFFFFF" fillOpacity="0.92" />
          <polygon points="118,124 532,84 538,94 124,134" fill="#0066FF" fillOpacity="0.88" />
          <polygon points="72,178 518,136 522,142 76,184" fill="#FFFFFF" fillOpacity="0.32" />

          {/* Gotículas hidrorrepelentes (efeito selante sintético) */}
          {[
            [118, 288, 7],
            [176, 266, 5],
            [228, 308, 8],
            [294, 282, 6],
            [362, 312, 7.5],
            [430, 274, 5.5],
            [492, 306, 7],
            [552, 276, 5],
            [260, 346, 5],
            [402, 344, 6],
          ].map(([cx, cy, r]) => (
            <g key={`${cx}-${cy}`}>
              <circle cx={cx} cy={cy} r={r} fill="#0D1729" stroke="#60A5FA" strokeWidth="1.4" />
              <circle cx={cx - r * 0.3} cy={cy - r * 0.3} r={r * 0.28} fill="#FFFFFF" />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
