interface SideProps {
  side: 'before' | 'after';
}

export function HeadlightRestorationSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <rect width="640" height="400" fill="#0A0D12" />
      {/* Linhas de capô e grade frontal */}
      <line x1="0" y1="86" x2="640" y2="62" stroke="#1E293B" strokeWidth="2" />
      <line x1="0" y1="336" x2="640" y2="356" stroke="#1E293B" strokeWidth="2" />

      {/* Carcaça do conjunto óptico */}
      <path
        d="M72 132 Q285 74 574 106 L538 308 Q285 332 86 270 Z"
        fill={isBefore ? '#2B281E' : '#101622'}
        stroke={isBefore ? '#6B6349' : '#3B82F6'}
        strokeWidth="2.5"
      />

      {/* Projetor principal */}
      <circle
        cx="364"
        cy="204"
        r="66"
        fill={isBefore ? '#3B3626' : '#0B1220'}
        stroke={isBefore ? '#7D7458' : '#CBD5E1'}
        strokeWidth="4"
      />
      <circle
        cx="364"
        cy="204"
        r="46"
        fill={isBefore ? '#6B6244' : '#0066FF'}
        fillOpacity={isBefore ? '0.65' : '0.35'}
        stroke={isBefore ? '#8E8361' : '#60A5FA'}
        strokeWidth="2"
      />
      <circle
        cx="364"
        cy="204"
        r="20"
        fill={isBefore ? '#948966' : '#FFFFFF'}
        fillOpacity={isBefore ? '0.55' : '0.92'}
      />

      {/* Refletor auxiliar */}
      <circle
        cx="188"
        cy="206"
        r="42"
        fill={isBefore ? '#383324' : '#0D131F'}
        stroke={isBefore ? '#736B52' : '#94A3B8'}
        strokeWidth="3"
      />
      <circle
        cx="188"
        cy="206"
        r="16"
        fill={isBefore ? '#7A7154' : '#60A5FA'}
        fillOpacity={isBefore ? '0.5' : '0.4'}
      />

      {/* Assinatura DRL LED */}
      <path
        d="M104 252 Q294 304 516 276"
        fill="none"
        stroke={isBefore ? '#9C9066' : '#FFFFFF'}
        strokeOpacity={isBefore ? '0.45' : '1'}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {isBefore ? (
        <g>
          {/* Oxidação solar amarelada/opaca */}
          <path
            d="M72 132 Q285 74 574 106 L538 308 Q285 332 86 270 Z"
            fill="#9E8B4F"
            fillOpacity="0.46"
          />
          {[120, 175, 240, 310, 380, 455, 505].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1={115 + (i % 3) * 20}
              x2={x + 28}
              y2={275 - (i % 2) * 35}
              stroke="#C2B17A"
              strokeOpacity="0.24"
              strokeWidth="3"
            />
          ))}
        </g>
      ) : (
        <g>
          {/* Reflexo limpo de lente restaurada */}
          <polygon points="180,98 242,92 182,304 134,292" fill="#FFFFFF" fillOpacity="0.12" />
          <polygon points="262,92 284,91 226,308 208,306" fill="#60A5FA" fillOpacity="0.14" />
        </g>
      )}
    </svg>
  );
}
