interface SideProps {
  side: 'before' | 'after';
}

export function WheelCandyPaintSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <defs>
        <linearGradient id="candy-purple-wheel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#3B0764" />
        </linearGradient>
      </defs>

      <rect width="640" height="400" fill={isBefore ? '#17181C' : '#07090E'} />
      <line x1="0" y1="362" x2="640" y2="362" stroke="#1E293B" strokeWidth="1.5" />

      {/* Pneu */}
      <circle
        cx="320"
        cy="196"
        r="152"
        fill={isBefore ? '#26272B' : '#0F131A'}
        stroke={isBefore ? '#3F3F46' : '#263245'}
        strokeWidth="4"
      />
      <circle
        cx="320"
        cy="196"
        r="132"
        fill="none"
        stroke={isBefore ? '#3F3F46' : '#1E293B'}
        strokeWidth="3"
        strokeDasharray="14 8"
      />

      {/* Tambor e disco de freio */}
      <circle cx="320" cy="196" r="110" fill={isBefore ? '#1F2024' : '#0B0F17'} />
      <circle cx="320" cy="196" r="70" fill={isBefore ? '#3F3F46' : '#334155'} />
      <circle cx="320" cy="196" r="44" fill={isBefore ? '#27272A' : '#0F172A'} />

      {/* Pinça de freio personalizada */}
      <rect
        x="358"
        y="158"
        width="34"
        height="72"
        rx="6"
        fill={isBefore ? '#52525B' : '#FB923C'}
      />

      {/* 10 raios da roda liga leve */}
      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
        <polygon
          key={deg}
          points="314,166 326,166 329,88 311,88"
          fill={isBefore ? '#71717A' : 'url(#candy-purple-wheel)'}
          transform={`rotate(${deg} 320 196)`}
        />
      ))}

      {/* Borda da roda e cubo */}
      <circle
        cx="320"
        cy="196"
        r="110"
        fill="none"
        stroke={isBefore ? '#71717A' : '#A855F7'}
        strokeWidth="6"
      />
      <circle
        cx="320"
        cy="196"
        r="29"
        fill={isBefore ? '#27272A' : '#07090C'}
        stroke={isBefore ? '#71717A' : '#38BDF8'}
        strokeWidth="2.5"
      />

      {/* 5 parafusos cromados */}
      {[0, 72, 144, 216, 288].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle
            key={deg}
            cx={320 + Math.cos(rad) * 17}
            cy={196 + Math.sin(rad) * 17}
            r="3.5"
            fill={isBefore ? '#52525B' : '#E2E8F0'}
          />
        );
      })}

      {isBefore ? (
        <g>
          {/* Riscos de guia e oxidação na pintura original do aro */}
          {[
            [236, 114, 260, 128],
            [396, 120, 414, 144],
            [408, 252, 386, 274],
            [228, 254, 252, 276],
          ].map(([x1, y1, x2, y2]) => (
            <line
              key={`${x1}-${y1}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#D4D4D8"
              strokeOpacity="0.45"
              strokeWidth="2.2"
            />
          ))}
          <text x="176" y="384" fill="#94A3B8" fontSize="11" fontFamily="monospace">
            PINTURA ORIGINAL OXIDADA • MARCAS DE USO
          </text>
        </g>
      ) : (
        <g>
          {/* Brilho especular de verniz Candy sobre o aro */}
          <path
            d="M226 140 A110 110 0 0 1 398 118"
            fill="none"
            stroke="#FFFFFF"
            strokeOpacity="0.65"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text x="174" y="384" fill="#C084FC" fontSize="11" fontFamily="monospace">
            PINTURA ESPECIAL CANDY ROXO • VERNIZ PU
          </text>
        </g>
      )}
    </svg>
  );
}
