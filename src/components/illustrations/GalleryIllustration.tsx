import type { GalleryVisualKey } from '../../types';
import { BeforeAfterIllustration } from './BeforeAfterIllustration';

interface GalleryIllustrationProps {
  visualKey: GalleryVisualKey;
}

/**
 * Ilustrações técnicas SVG escuras para a Galeria de Pinturas & Estética Automotiva
 */
export function GalleryIllustration({ visualKey }: GalleryIllustrationProps) {
  if (visualKey === 'cristal-cromo') {
    return (
      <svg viewBox="0 0 480 300" className="w-full h-full block" aria-hidden="true">
        <defs>
          <linearGradient id="thermo-candy-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="45%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
        <rect width="480" height="300" fill="#080B12" />
        <path
          d="M62 224 C78 118, 168 62, 292 68 C378 72, 424 128, 418 206 L392 238 L96 238 Z"
          fill="url(#thermo-candy-grad)"
          fillOpacity="0.82"
          stroke="#FDE047"
          strokeWidth="2"
        />
        <path
          d="M118 134 Q228 84 344 96"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.85"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {[128, 164, 208, 246, 288, 326, 358].map((cx, i) => (
          <circle
            key={cx}
            cx={cx}
            cy={138 + (i % 3) * 26}
            r={2.4 + (i % 2)}
            fill="#FFFFFF"
            fillOpacity="0.85"
          />
        ))}
        <rect x="116" y="252" width="248" height="26" rx="4" fill="#07090C" stroke="#1E293B" />
        <text x="130" y="269" fill="#FDE047" fontSize="10.5" fontFamily="monospace">
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
