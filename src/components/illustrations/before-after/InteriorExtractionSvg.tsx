interface SideProps {
  side: 'before' | 'after';
}

export function InteriorExtractionSvg({ side }: SideProps) {
  const isBefore = side === 'before';

  return (
    <svg viewBox="0 0 640 400" className="w-full h-full block" aria-hidden="true">
      <rect width="640" height="400" fill={isBefore ? '#1A1C20' : '#0C1017'} />
      {/* Trama fina do estofado automotivo */}
      <defs>
        <pattern id={`fabric-${side}`} width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M12 0H0V12" fill="none" stroke={isBefore ? '#262930' : '#151C28'} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="640" height="400" fill={`url(#fabric-${side})`} />

      {/* Estrutura anatômica do encosto e assento */}
      <path
        d="M150 20 L150 380 M490 20 L490 380"
        stroke={isBefore ? '#3B3F46' : '#253145'}
        strokeWidth="3"
      />
      <line
        x1="150"
        y1="138"
        x2="490"
        y2="138"
        stroke={isBefore ? '#33363C' : '#1E293B'}
        strokeWidth="2.5"
      />
      <line
        x1="150"
        y1="262"
        x2="490"
        y2="262"
        stroke={isBefore ? '#33363C' : '#1E293B'}
        strokeWidth="2.5"
      />

      {/* Costura técnica lateral */}
      <path
        d="M170 28 L170 372 M470 28 L470 372"
        stroke={isBefore ? '#5C5B57' : '#0066FF'}
        strokeWidth="2"
        strokeDasharray="8 6"
      />

      {/* Linhas de respiração no centro do banco */}
      {[190, 215, 240, 265, 290, 315, 340, 365, 390, 415, 440].map((x) => (
        <line
          key={x}
          x1={x}
          y1="155"
          x2={x}
          y2="245"
          stroke={isBefore ? '#2E3138' : '#182233'}
          strokeWidth="1.5"
        />
      ))}

      {isBefore ? (
        <g>
          {/* Manchas e sujeira orgânica retida no tecido */}
          <ellipse cx="290" cy="196" rx="74" ry="42" fill="#5E584B" fillOpacity="0.42" />
          <ellipse cx="355" cy="222" rx="52" ry="30" fill="#4A453B" fillOpacity="0.48" />
          <ellipse cx="255" cy="312" rx="64" ry="28" fill="#5C5549" fillOpacity="0.38" />
          <ellipse cx="412" cy="94" rx="46" ry="26" fill="#524C42" fillOpacity="0.35" />
          {/* Poeira e resíduos nas costuras */}
          {[178, 224, 268, 312, 348, 398, 438, 462].map((px, i) => (
            <circle
              key={px}
              cx={px}
              cy={80 + (i % 4) * 78}
              r={2.5 + (i % 3)}
              fill="#8C8577"
              fillOpacity="0.5"
            />
          ))}
        </g>
      ) : (
        <g>
          {/* Acabamento limpo, costuras nítidas e marcação técnica de higienização */}
          <rect
            x="196"
            y="156"
            width="248"
            height="88"
            fill="none"
            stroke="#3B82F6"
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text x="206" y="176" fill="#60A5FA" fontSize="11" fontFamily="monospace">
            TECIDO EXTRAÍDO • TOQUE SECO
          </text>
        </g>
      )}
    </svg>
  );
}
