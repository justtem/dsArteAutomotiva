interface SideProps {
  side: 'before' | 'after';
}

export function HeadlightRestorationSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <rect width="640" height="400" fill={isBefore ? '#141418' : '#0B0B0D'} />
      <line x1="0" y1="82" x2="640" y2="58" stroke="#27272F" strokeWidth="2" />
      <line x1="0" y1="328" x2="640" y2="346" stroke="#27272F" strokeWidth="2" />

      {/* Carcaça do conjunto óptico */}
      <path
        d="M72 128 Q285 70 574 102 L538 300 Q285 324 86 264 Z"
        fill={isBefore ? '#2B281E' : '#141418'}
        stroke={isBefore ? '#6B6349' : '#0EA5E9'}
        strokeWidth="2.2"
      />

      {/* Projetor principal */}
      <circle
        cx="372"
        cy="198"
        r="64"
        fill={isBefore ? '#3B3626' : '#0B0B0D'}
        stroke={isBefore ? '#7D7458' : '#E4E4E7'}
        strokeWidth="4"
      />
      <circle
        cx="372"
        cy="198"
        r="44"
        fill={isBefore ? '#6B6244' : '#0EA5E9'}
        fillOpacity={isBefore ? '0.65' : '0.32'}
        stroke={isBefore ? '#8E8361' : '#0EA5E9'}
        strokeWidth="2"
      />
      <circle
        cx="372"
        cy="198"
        r="19"
        fill={isBefore ? '#948966' : '#F5F5F4'}
        fillOpacity={isBefore ? '0.55' : '0.94'}
      />

      {/* Refletor auxiliar */}
      <circle
        cx="188"
        cy="200"
        r="40"
        fill={isBefore ? '#383324' : '#111113'}
        stroke={isBefore ? '#736B52' : '#A1A1AA'}
        strokeWidth="3"
      />
      <circle
        cx="188"
        cy="200"
        r="15"
        fill={isBefore ? '#7A7154' : '#0EA5E9'}
        fillOpacity={isBefore ? '0.5' : '0.38'}
      />

      {/* Assinatura DRL LED */}
      <path
        d="M104 246 Q294 296 516 268"
        fill="none"
        stroke={isBefore ? '#9C9066' : '#F5F5F4'}
        strokeOpacity={isBefore ? '0.45' : '1'}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {isBefore ? (
        <g>
          <path
            d="M72 128 Q285 70 574 102 L538 300 Q285 324 86 264 Z"
            fill="#9E8B4F"
            fillOpacity="0.46"
          />
          {[120, 175, 240, 310, 380, 455, 505].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1={112 + (i % 3) * 20}
              x2={x + 28}
              y2={268 - (i % 2) * 35}
              stroke="#C2B17A"
              strokeOpacity="0.24"
              strokeWidth="3"
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
            LENTE AMARELADA / OXIDAÇÃO UV
          </text>
        </g>
      ) : (
        <g>
          <polygon points="180,94 242,88 182,296 134,284" fill="#F5F5F4" fillOpacity="0.1" />
          <polygon points="262,88 284,87 226,300 208,298" fill="#0EA5E9" fillOpacity="0.14" />
          <text
            x="616"
            y="376"
            textAnchor="end"
            fill="#0EA5E9"
            fontSize="10.5"
            fontFamily="JetBrains Mono, monospace"
          >
            POLIMENTO ÓPTICO + PROTEÇÃO UV
          </text>
        </g>
      )}
    </svg>
  );
}
