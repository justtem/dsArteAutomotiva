import type { GalleryVisualKey } from '../../types';
import { BeforeAfterIllustration } from './BeforeAfterIllustration';

interface GalleryIllustrationProps {
  visualKey: GalleryVisualKey;
}

/**
 * Ilustrações técnicas SVG escuras em #0B0B0D para os cards do Portfólio
 */
export function GalleryIllustration({ visualKey }: GalleryIllustrationProps) {
  if (visualKey === 'cristal-cromo') {
    return (
      <svg viewBox="0 0 480 300" className="w-full h-full block" aria-hidden="true">
        <defs>
          <linearGradient id="thermo-candy-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="55%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
        <rect width="480" height="300" fill="#0B0B0D" />
        <path
          d="M62 220 C78 114, 168 58, 292 64 C378 68, 424 124, 418 202 L392 234 L96 234 Z"
          fill="url(#thermo-candy-grad)"
          fillOpacity="0.82"
          stroke="#F97316"
          strokeWidth="2"
        />
        <path
          d="M118 130 Q228 80 344 92"
          fill="none"
          stroke="#F5F5F4"
          strokeOpacity="0.85"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {[128, 164, 208, 246, 288, 326, 358].map((cx, i) => (
          <circle
            key={cx}
            cx={cx}
            cy={134 + (i % 3) * 26}
            r={2.2 + (i % 2)}
            fill="#F5F5F4"
            fillOpacity="0.85"
          />
        ))}
        <text
          x="460"
          y="280"
          textAnchor="end"
          fill="#F97316"
          fontSize="10"
          fontFamily="JetBrains Mono, monospace"
        >
          FLUORESCENTE • CRISTAL 3D • TERMOCRÔMICA
        </text>
      </svg>
    );
  }

  if (visualKey === 'hidrografica-carbono') {
    return <BeforeAfterIllustration caseId="pintura-hidrografica" side="after" />;
  }

  if (visualKey === 'candy-camaleao') {
    return <BeforeAfterIllustration caseId="candy-camaleao" side="after" />;
  }

  if (visualKey === 'rodas-candy') {
    return <BeforeAfterIllustration caseId="pintura-rodas" side="after" />;
  }

  if (visualKey === 'aerografia-fosco') {
    return <BeforeAfterIllustration caseId="aerografia-custom" side="after" />;
  }

  if (visualKey === 'pintura-verniz') {
    return <BeforeAfterIllustration caseId="revitalizacao-pintura" side="after" />;
  }

  return <BeforeAfterIllustration caseId="restauracao-farol" side="after" />;
}
