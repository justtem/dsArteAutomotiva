interface PaintDripDividerProps {
  topColor?: string;
  bottomColor?: string;
  accentVariant?: 'cyan' | 'chrome' | 'flame';
  flip?: boolean;
}

/**
 * Divisor orgânico de "Tinta Automotiva Derretida / Escorrendo" inspirado nas gotas
 * cromadas e na onda hidrográfica da logo da DS Arte Automotiva.
 */
export function PaintDripDivider({
  topColor = '#0B0D12',
  bottomColor = '#12161F',
  accentVariant = 'cyan',
  flip = false,
}: PaintDripDividerProps) {
  const strokeColor =
    accentVariant === 'flame'
      ? '#FB923C'
      : accentVariant === 'chrome'
        ? '#CBD5E1'
        : '#38BDF8';

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none ${
        flip ? 'rotate-180' : ''
      }`}
      style={{ backgroundColor: bottomColor }}
    >
      <svg
        viewBox="0 0 1440 74"
        preserveAspectRatio="none"
        className="w-full h-9 sm:h-12 lg:h-14 block animate-drip-ooze"
      >
        {/* Camada de brilho/verniz escorrendo na borda */}
        <path
          d="M0,0 L1440,0 L1440,22 C1390,22 1378,56 1354,56 C1330,56 1322,20 1270,20 C1218,20 1205,68 1178,68 C1151,68 1142,24 1084,24 C1026,24 1012,46 986,46 C960,46 950,18 886,18 C822,18 808,64 780,64 C752,64 742,22 676,22 C610,22 598,52 570,52 C542,52 532,18 462,18 C392,18 378,70 348,70 C318,70 308,24 242,24 C176,24 162,48 136,48 C110,48 98,20 48,20 C18,20 8,28 0,28 Z"
          fill={strokeColor}
          fillOpacity="0.32"
          transform="translate(0, 3)"
        />
        {/* Massa principal de tinta escorrendo da seção superior */}
        <path
          d="M0,0 L1440,0 L1440,18 C1390,18 1378,52 1354,52 C1330,52 1322,16 1270,16 C1218,16 1205,64 1178,64 C1151,64 1142,20 1084,20 C1026,20 1012,42 986,42 C960,42 950,14 886,14 C822,14 808,60 780,60 C752,60 742,18 676,18 C610,18 598,48 570,48 C542,48 532,14 462,14 C392,14 378,66 348,66 C318,66 308,20 242,20 C176,20 162,44 136,44 C110,44 98,16 48,16 C18,16 8,24 0,24 Z"
          fill={topColor}
        />
      </svg>
    </div>
  );
}

/**
 * Detalhe decorativo sutil de gotas de verniz/tinta no topo de cards e painéis de destaque
 */
export function CardTopPaintDrip({ variant = 'cyan' }: { variant?: 'cyan' | 'flame' }) {
  const fill = variant === 'flame' ? '#FB923C' : '#29B6F6';
  return (
    <svg
      viewBox="0 0 320 18"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="w-full h-3.5 block pointer-events-none opacity-85"
    >
      <path
        d="M0,0 L320,0 L320,4 C290,4 286,15 277,15 C268,15 265,4 232,4 C198,4 194,11 186,11 C178,11 175,4 132,4 C92,4 88,17 78,17 C68,17 64,4 28,4 C12,4 6,7 0,7 Z"
        fill={fill}
      />
    </svg>
  );
}
