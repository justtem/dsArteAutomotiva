import type { BeforeAfterCaseId } from '../../types';
import { CandyChameleonSvg } from './before-after/CandyChameleonSvg';
import { CustomAirbrushMatteSvg } from './before-after/CustomAirbrushMatteSvg';
import { HeadlightRestorationSvg } from './before-after/HeadlightRestorationSvg';
import { HydrographicCarbonSvg } from './before-after/HydrographicCarbonSvg';
import { PaintRevitalizationSvg } from './before-after/PaintRevitalizationSvg';
import { WheelCandyPaintSvg } from './before-after/WheelCandyPaintSvg';

interface BeforeAfterIllustrationProps {
  caseId: BeforeAfterCaseId;
  side: 'before' | 'after';
}

/**
 * Ilustrações técnicas SVG (Dark Mode) para Antes e Depois de Pintura & Estética Automotiva
 */
export function BeforeAfterIllustration({ caseId, side }: BeforeAfterIllustrationProps) {
  switch (caseId) {
    case 'pintura-hidrografica':
      return <HydrographicCarbonSvg side={side} />;
    case 'candy-camaleao':
      return <CandyChameleonSvg side={side} />;
    case 'pintura-rodas':
      return <WheelCandyPaintSvg side={side} />;
    case 'aerografia-custom':
      return <CustomAirbrushMatteSvg side={side} />;
    case 'revitalizacao-pintura':
      return <PaintRevitalizationSvg side={side} />;
    case 'restauracao-farol':
    default:
      return <HeadlightRestorationSvg side={side} />;
  }
}
