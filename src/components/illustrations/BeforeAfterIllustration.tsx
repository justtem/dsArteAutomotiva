import type { BeforeAfterCaseId } from '../../types';
import { CandyChameleonSvg } from './before-after/CandyChameleonSvg';
import { HeadlightRestorationSvg } from './before-after/HeadlightRestorationSvg';
import { HydrographicCarbonSvg } from './before-after/HydrographicCarbonSvg';
import { InteriorExtractionSvg } from './before-after/InteriorExtractionSvg';
import { PaintRevitalizationSvg } from './before-after/PaintRevitalizationSvg';
import { WheelsMotorSvg } from './before-after/WheelsMotorSvg';

interface BeforeAfterIllustrationProps {
  caseId: BeforeAfterCaseId;
  side: 'before' | 'after';
}

/**
 * Ilustrações técnicas SVG (Dark Mode) para Antes e Depois
 */
export function BeforeAfterIllustration({ caseId, side }: BeforeAfterIllustrationProps) {
  switch (caseId) {
    case 'higienizacao-interna':
      return <InteriorExtractionSvg side={side} />;
    case 'revitalizacao-pintura':
      return <PaintRevitalizationSvg side={side} />;
    case 'restauracao-farol':
      return <HeadlightRestorationSvg side={side} />;
    case 'pintura-hidrografica':
      return <HydrographicCarbonSvg side={side} />;
    case 'candy-camaleao':
      return <CandyChameleonSvg side={side} />;
    case 'rodas-motor':
    default:
      return <WheelsMotorSvg side={side} />;
  }
}
