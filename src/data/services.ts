import type { ServiceAddon, ServicePackage, VehicleSize } from '../types';

export const VEHICLE_SIZES: VehicleSize[] = [
  { id: 'moto', label: 'Moto', note: 'Street, trail ou scooter' },
  { id: 'hatch', label: 'Hatch', note: 'Ex.: Onix, Polo, Argo' },
  { id: 'sedan', label: 'Sedan', note: 'Ex.: Corolla, Civic, Cronos' },
  { id: 'suv', label: 'SUV / Picape', note: 'Ex.: Compass, Tracker, Hilux' },
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'tecnica',
    name: 'Lavagem Técnica',
    tag: 'Manutenção segura',
    description:
      'Limpeza externa e interna com pré-lavagem em espuma ativa para preservar o verniz e manter a cabine livre de poeira.',
    prices: { moto: 45, hatch: 75, sedan: 85, suv: 105 },
    durationMinutes: { moto: 45, hatch: 75, sedan: 85, suv: 100 },
    included: [
      'Pré-lavagem com snow foam pH neutro para soltura de sujeira pesada',
      'Lavagem manual pelo método de dois baldes com luva de microfibra',
      'Limpeza de rodas, caixas de roda e condicionamento seco de pneus',
      'Aspiração completa de bancos, carpetes e porta-malas',
      'Limpeza de painel, console, batentes e vidros internos/externos',
      'Secagem com toalha de microfibra e soprador técnico nos cantos',
    ],
  },
  {
    id: 'detalhada',
    name: 'Lavagem Detalhada',
    tag: 'Mais procurada',
    description:
      'Acabamento minucioso em emblemas, frestas, plásticos externos e proteção sintética da pintura contra sol e chuva.',
    prices: { moto: 75, hatch: 135, sedan: 155, suv: 185 },
    durationMinutes: { moto: 75, hatch: 135, sedan: 150, suv: 180 },
    included: [
      'Todas as etapas da Lavagem Técnica incluídas',
      'Pincelamento detalhado em grades, emblemas, frisos, maçanetas e bocal',
      'Descontaminação leve de pintura (remoção de piche e seiva superficial)',
      'Aplicação de selante sintético com hidrorrepelência (média de 60 dias)',
      'Proteção UV fosca em plásticos externos e condicionamento interno seco',
      'Limpeza minuciosa de saídas de ar-condicionado e trilhos de banco',
    ],
  },
  {
    id: 'combo-completa',
    name: 'Combo Estética Completa',
    tag: 'Renovação integral',
    description:
      'Indicado para veículos de uso diário intenso ou recém-adquiridos: combina lavagem detalhada, higienização interna e proteção.',
    prices: { moto: 130, hatch: 290, sedan: 330, suv: 390 },
    durationMinutes: { moto: 120, hatch: 240, sedan: 270, suv: 320 },
    included: [
      'Todas as etapas da Lavagem Detalhada incluídas',
      'Higienização profunda com extratora nos bancos de tecido (ou limpeza em couro)',
      'Limpeza controlada de forro de teto, cintos de segurança e forros de porta',
      'Descontaminação química de rodas para remoção de fuligem impregnada',
      'Selagem completa de pintura e proteção UV nos plásticos externos',
      'Neutralização de odores da cabine antes da entrega',
    ],
  },
];

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: 'cera-selante',
    name: 'Cera / Selante Sintético',
    detail: 'Proteção de verniz com brilho técnico e efeito hidrorrepelente',
    pricingType: 'bySize',
    prices: { moto: 25, hatch: 45, sedan: 55, suv: 65 },
    extraMinutes: 25,
  },
  {
    id: 'hidratacao-couro',
    name: 'Hidratação de Couro',
    detail: 'Limpeza pH neutro e condicionador de toque seco sem brilho oleoso',
    pricingType: 'bySize',
    prices: { moto: 25, hatch: 85, sedan: 95, suv: 115 },
    extraMinutes: 45,
  },
  {
    id: 'oxi-ozonio',
    name: 'Oxi-sanitização por Ozônio',
    detail: 'Redução de odores de mofo, cigarro e circulação do ar-condicionado',
    pricingType: 'fixed',
    price: 70,
    extraMinutes: 35,
  },
  {
    id: 'vitrificacao-farois',
    name: 'Vitrificação de Faróis',
    detail: 'Polimento óptico do par e proteção contra retorno do amarelamento',
    pricingType: 'fixed',
    price: 130,
    extraMinutes: 60,
  },
  {
    id: 'lavagem-motor',
    name: 'Lavagem Técnica de Motor',
    detail: 'Isolamento de sensores, limpeza controlada e verniz seco para plásticos',
    pricingType: 'bySize',
    prices: { moto: 35, hatch: 80, sedan: 90, suv: 110 },
    extraMinutes: 45,
  },
];
