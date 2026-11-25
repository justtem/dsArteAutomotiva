interface SideProps {
  side: 'before' | 'after';
}

export function CustomAirbrushMatteSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <defs>
        <linearGradient id="matte-blue-tank" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="55%" stopColor="#0F294A" />
          <stop offset="100%" stopColor="#091526" />
        </linearGradient>
        <linearGradient id="airbrush-flame" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="55%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>

      <rect width="640" height="400" fill={isBefore ? '#181A1F' : '#080B11'} />

      {/* Silhueta de Tanque / Carenagem Esportiva Custom */}
      <path
        d="M92 254 C96 156, 198 96, 356 102 C466 106, 536 152, 552 222 C556 242, 538 264, 504 268 L138 274 C106 274, 90 268, 92 254 Z"
        fill={isBefore ? '#2B2F37' : 'url(#matte-blue-tank)'}
        stroke={isBefore ? '#52525B' : '#38BDF8'}
        strokeWidth="2.8"
      />

      {/* Bocal esportivo */}
      <ellipse
        cx="336"
        cy="112"
        rx="28"
        ry="9"
        fill="#0B0D12"
        stroke={isBefore ? '#52525B' : '#CBD5E1'}
        strokeWidth="2"
      />

      {isBefore ? (
        <g>
          {/* Pintura antiga desbotada e riscada */}
          <ellipse cx="276" cy="182" rx="92" ry="38" fill="#71717A" fillOpacity="0.2" />
          {[168, 222, 286, 352, 418].map((x, idx) => (
            <line
              key={x}
              x1={x}
              y1={134 + (idx % 2) * 18}
              x2={x + 44}
              y2={252 - (idx % 3) * 16}
              stroke="#A1A1AA"
              strokeOpacity="0.3"
              strokeWidth="1.8"
            />
          ))}
          <text x="168" y="336" fill="#94A3B8" fontSize="11" fontFamily="monospace">
            PEÇA SEM PERSONALIZAÇÃO • VERNIZ DESBOTADO
          </text>
        </g>
      ) : (
        <g>
          {/* Grafismos estilo competição + Aerografia sob verniz fosco acetinado */}
          <path
            d="M126 248 C184 188, 282 154, 488 164 L526 206 C348 198, 236 222, 162 264 Z"
            fill="url(#airbrush-flame)"
            fillOpacity="0.88"
          />
          <path
            d="M158 214 C236 158, 336 136, 472 144"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.78"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Luz difusa suave característica do Verniz Fosco Acetinado */}
          <ellipse cx="268" cy="142" rx="86" ry="16" fill="#93C5FD" fillOpacity="0.16" />
          <text x="164" y="336" fill="#38BDF8" fontSize="11" fontFamily="monospace">
            AEROGRAFIA CUSTOM • VERNIZ FOSCO ACETINADO UV
          </text>
        </g>
      )}
    </svg>
  );
}
