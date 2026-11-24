import type { GalleryVisualKey } from '../../types';
import { BeforeAfterIllustration } from './BeforeAfterIllustration';

interface GalleryIllustrationProps {
  visualKey: GalleryVisualKey;
}

/**
 * Ilustrações técnicas SVG escuras para a Galeria Técnica & Customização
 */
export function GalleryIllustration({ visualKey }: GalleryIllustrationProps) {
  if (visualKey === 'pintura-snowfoam') {
    return (
      <svg viewBox="0 0 480 300" className="w-full h-full block" aria-hidden="true">
        <rect width="480" height="300" fill="#0B0F17" />
        <path d="M0 0 H305 C278 96 322 184 218 300 H0 Z" fill="#E2E8F0" fillOpacity="0.92" />
        <path d="M0 0 H272 C248 92 292 180 190 300 H0 Z" fill="#FFFFFF" fillOpacity="0.96" />
        <path d="M292 78 Q384 102 444 196" fill="none" stroke="#0066FF" strokeWidth="2.5" />
        <path d="M254 176 Q364 188 468 232" fill="none" stroke="#334155" strokeWidth="1.5" />
        {[46, 88, 136, 184, 72, 124, 168, 212].map((cx, i) => (
          <circle
            key={`${cx}-${i}`}
            cx={cx}
            cy={42 + (i % 4) * 62}
            r={3 + (i % 3)}
            fill="#CBD5E1"
          />
        ))}
        <text x="294" y="42" fill="#38BDF8" fontSize="11" fontFamily="monospace">
          PH NEUTRO • SNOW FOAM
        </text>
      </svg>
    );
  }

  if (visualKey === 'pintura-selante') {
    return <BeforeAfterIllustration caseId="revitalizacao-pintura" side="after" />;
  }

  if (visualKey === 'interior-extracao') {
    return <BeforeAfterIllustration caseId="higienizacao-interna" side="after" />;
  }

  if (visualKey === 'interior-couro') {
    return (
      <svg viewBox="0 0 480 300" className="w-full h-full block" aria-hidden="true">
        <rect width="480" height="300" fill="#0D1117" />
        <rect x="0" y="0" width="240" height="300" fill="#161D29" />
        <line x1="240" y1="0" x2="240" y2="300" stroke="#0066FF" strokeWidth="2" />
        {[-120, -60, 0, 60, 120, 180, 240, 300, 360].map((x) => (
          <g key={x} stroke="#263245" strokeWidth="1">
            <line x1={x} y1="0" x2={x + 220} y2="300" />
            <line x1={x + 220} y1="0" x2={x} y2="300" />
          </g>
        ))}
        <rect x="262" y="24" width="194" height="28" rx="2" fill="#07090C" stroke="#1E293B" />
        <text x="274" y="42" fill="#38BDF8" fontSize="11" fontFamily="monospace">
          COURO FOSCO • PROTEÇÃO UV
        </text>
      </svg>
    );
  }

  if (visualKey === 'hidrografica-carbono') {
    return <BeforeAfterIllustration caseId="pintura-hidrografica" side="after" />;
  }

  if (visualKey === 'candy-camaleao' || visualKey === 'custom-capacete') {
    return <BeforeAfterIllustration caseId="candy-camaleao" side="after" />;
  }

  if (visualKey === 'rodas-motor') {
    return <BeforeAfterIllustration caseId="rodas-motor" side="after" />;
  }

  return <BeforeAfterIllustration caseId="restauracao-farol" side="after" />;
}
