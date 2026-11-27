import type { ServiceAddon, ServicePackage, VehicleSize } from '../types';

export const VEHICLE_SIZES: [VehicleSize, ...VehicleSize[]] = [
  { id: 'moto', label: 'Moto / Peças', note: 'Capacete, tanque, carenagem ou rodas' },
  { id: 'hatch', label: 'Hatch', note: 'Ex.: Onix, Polo, Bravo' },
  { id: 'sedan', label: 'Sedan', note: 'Ex.: Corolla, Civic, Cronos' },
  { id: 'suv', label: 'SUV / Picape', note: 'Ex.: Compass, Tracker, Hilux' },
];

export const SERVICE_PACKAGES: [ServicePackage, ...ServicePackage[]] = [
  {
    id: 'pintura-verniz',
    name: 'Pintura Automotiva & Verniz (Brilho ou Fosco)',
    tag: 'Acabamento técnico',
    description:
      'Pintura e renovação de peças, carenagens, capacetes, retrovisores ou detalhes automotivos com verniz PU espelhado ou fosco acetinado.',
    prices: { moto: 180, hatch: 320, sedan: 360, suv: 420 },
    durationMinutes: { moto: 180, hatch: 240, sedan: 270, suv: 300 },
    included: [
      'Preparação técnica com lixamento escalonado e nivelamento da superfície',
      'Aplicação de primer PU promotor de aderência para plásticos ou metais',
      'Pintura automotiva em tonalidade sólida, metálica ou preto/azul acetinado',
      'Acabamento em verniz PU alto sólidos espelhado ou verniz fosco com proteção UV',
      'Cura controlada na oficina e inspeção final de textura e brilho',
    ],
  },
  {
    id: 'hidrografica-wtp',
    name: 'Pintura Hidrográfica (WTP & Carbono)',
    tag: 'Mais procurada',
    description:
      'Personalização por imersão na água (WTP) em fibra de carbono ou estampas exclusivas para painéis, retrovisores, tanques, ponteiras e capacetes.',
    prices: { moto: 240, hatch: 390, sedan: 430, suv: 490 },
    durationMinutes: { moto: 240, hatch: 300, sedan: 330, suv: 360 },
    included: [
      'Isolamento milimétrico de bordas, encaixes e guarnições da peça',
      'Tratamento químico da superfície e pintura de base específica para a película',
      'Transferência hidrográfica (WTP) sem emendas em curvas 3D complexas',
      'Opções em Fibra de Carbono (preta ou bicolor), camuflados, caveiras e geométricos',
      'Selagem com verniz automotivo PU resistente a sol, calor e combustível',
    ],
  },
  {
    id: 'candy-camaleao-custom',
    name: 'Pintura Especial Candy, Camaleão & Custom',
    tag: 'Arte exclusiva',
    description:
      'Projetos especiais de alto impacto visual com verniz colorido Candy, Camaleão furta-cor, Cristal 3D, Cromo, Flake ou Fluorescente.',
    prices: { moto: 350, hatch: 580, sedan: 640, suv: 740 },
    durationMinutes: { moto: 360, hatch: 480, sedan: 540, suv: 600 },
    included: [
      'Preparação completa da peça e aplicação de base metalizada ou refletiva pura',
      'Camadas translúcidas de verniz Candy (roxo, dourado, vermelho, azul) ou Camaleão',
      'Opções de efeitos especiais: Cristal 3D, Cromo, Metal Flake ou Termocrômica',
      'Acabamento espelhado de profundidade óptica e alta resistência térmica/mecânica',
      'Proteção UV reforçada preservando a saturação da cor sob luz solar intensa',
    ],
  },
];

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: 'revitalizacao-farois',
    name: 'Revitalização Óptica de Faróis',
    detail: 'Remoção do amarelado, polimento técnico do par e selagem UV',
    pricingType: 'fixed',
    price: 130,
    extraMinutes: 60,
  },
  {
    id: 'pintura-rodas-calotas',
    name: 'Pintura de Rodas / Calotas',
    detail: 'Personalização em Candy Roxo, Dourado, metálico ou acetinado',
    pricingType: 'bySize',
    prices: { moto: 220, hatch: 380, sedan: 420, suv: 480 },
    extraMinutes: 180,
  },
  {
    id: 'aerografia-grafismo',
    name: 'Aerografia & Grafismos Custom',
    detail: 'Artes exclusivas, faixas estilo competição e sombreamento sob medida',
    pricingType: 'fixed',
    price: 160,
    extraMinutes: 120,
  },
  {
    id: 'efeito-flake-cristal',
    name: 'Efeito Cristal 3D / Flake / Termocrômico',
    detail: 'Adição de partículas cintilantes, textura 3D ou pigmento térmico',
    pricingType: 'bySize',
    prices: { moto: 90, hatch: 140, sedan: 160, suv: 190 },
    extraMinutes: 90,
  },
  {
    id: 'verniz-fosco-uv',
    name: 'Acabamento em Verniz Fosco UV',
    detail: 'Toque acetinado moderno com proteção contra raios solares',
    pricingType: 'bySize',
    prices: { moto: 60, hatch: 95, sedan: 110, suv: 130 },
    extraMinutes: 45,
  },
  {
    id: 'polimento-verniz',
    name: 'Polimento Técnico & Espelhamento',
    detail: 'Correção de micro-riscos e realce de brilho profundo na pintura',
    pricingType: 'bySize',
    prices: { moto: 80, hatch: 150, sedan: 180, suv: 220 },
    extraMinutes: 120,
  },
];
