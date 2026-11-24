interface SideProps {
  side: 'before' | 'after';
}

export function WheelsMotorSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <rect width="640" height="400" fill={isBefore ? '#171614' : '#07090C'} />
      {/* Grade técnica do box */}
      <line x1="0" y1="362" x2="640" y2="362" stroke="#1E293B" strokeWidth="1.5" />

      {/* Pneu */}
      <circle
        cx="320"
        cy="202"
        r="158"
        fill={isBefore ? '#2B2723' : '#10141B'}
        stroke={isBefore ? '#4B433A' : '#263245'}
        strokeWidth="4"
      />
      <circle
        cx="320"
        cy="202"
        r="136"
        fill="none"
        stroke={isBefore ? '#4A4238' : '#1E293B'}
        strokeWidth="3"
        strokeDasharray="14 8"
      />

      {/* Tambor e disco de freio */}
      <circle cx="320" cy="202" r="112" fill={isBefore ? '#231E1A' : '#0B0F17'} />
      <circle cx="320" cy="202" r="72" fill={isBefore ? '#4A3E34' : '#334155'} />
      <circle cx="320" cy="202" r="46" fill={isBefore ? '#2D2722' : '#0F172A'} />

      {/* Pinça de freio */}
      <rect
        x="360"
        y="162"
        width="34"
        height="74"
        rx="6"
        fill={isBefore ? '#4B443D' : '#0066FF'}
      />

      {/* 10 raios da roda liga leve */}
      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((deg) => (
        <polygon
          key={deg}
          points="315,172 325,172 328,92 312,92"
          fill={isBefore ? '#6E665C' : '#E2E8F0'}
          transform={`rotate(${deg} 320 202)`}
        />
      ))}

      {/* Borda da roda e cubo */}
      <circle
        cx="320"
        cy="202"
        r="112"
        fill="none"
        stroke={isBefore ? '#6B6258' : '#FFFFFF'}
        strokeWidth="6"
      />
      <circle
        cx="320"
        cy="202"
        r="30"
        fill={isBefore ? '#3B352F' : '#07090C'}
        stroke={isBefore ? '#6E665C' : '#0066FF'}
        strokeWidth="2.5"
      />

      {/* 5 parafusos */}
      {[0, 72, 144, 216, 288].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle
            key={deg}
            cx={320 + Math.cos(rad) * 18}
            cy={202 + Math.sin(rad) * 18}
            r="3.5"
            fill={isBefore ? '#5C5349' : '#CBD5E1'}
          />
        );
      })}

      {isBefore && (
        <g>
          {/* Fuligem de pastilha e respingos de barro */}
          {[
            [245, 140, 12],
            [280, 260, 14],
            [385, 152, 11],
            [362, 278, 13],
            [212, 214, 10],
            [422, 224, 12],
            [308, 118, 9],
            [332, 304, 11],
            [260, 194, 8],
            [392, 198, 10],
          ].map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#5C4430" fillOpacity="0.52" />
          ))}
        </g>
      )}
    </svg>
  );
}
