import type { CustomCatalogCategory, CustomCatalogService, SpecialtyHighlight } from '../types';

export const SPECIALTY_HIGHLIGHTS: SpecialtyHighlight[] = [
  {
    id: 'spec-hidrografica',
    title: 'Pintura Hidrográfica',
    description: 'Imersão na água (WTP) com textura de fibra de carbono e estampas exclusivas',
    iconKey: 'droplets',
  },
  {
    id: 'spec-candy-camaleao',
    title: 'Candy & Camaleão',
    description: 'Vernizes translúcidos de profundidade, Cristal 3D, Cromo, Flake e Termocrômica',
    iconKey: 'gem',
  },
  {
    id: 'spec-aerografia',
    title: 'Aerografia & Custom',
    description: 'Artes exclusivas sob medida em capacetes, tanques, rodas e carenagens',
    iconKey: 'paintbrush',
  },
  {
    id: 'spec-estetica-farois',
    title: 'Estética & Faróis',
    description: 'Polimento técnico, revitalização óptica de faróis e acabamento com verniz fosco',
    iconKey: 'sparkles',
  },
];

export const CUSTOM_CATALOG_FILTERS: { id: CustomCatalogCategory; label: string }[] = [
  { id: 'todos', label: 'Todos (15)' },
  { id: 'hidrografica', label: 'Pintura Hidrográfica' },
  { id: 'especiais', label: 'Candy & Especiais' },
  { id: 'personalizacao', label: 'Custom & Estética' },
];

/**
 * CATÁLOGO DE 15 SERVIÇOS DA DS ARTE AUTOMOTIVA (Diogo Soares)
 * DICA: Para adicionar foto real em qualquer card, basta definir `imageUrl: '/fotos/nome-da-foto.webp'`.
 */
export const CUSTOM_CATALOG_SERVICES: CustomCatalogService[] = [
  {
    id: 1,
    title: 'Pintura Hidrográfica',
    examplePiece: 'Capacete',
    category: 'hidrografica',
    categoryLabel: 'Pintura Hidrográfica',
    description:
      'Personalização via transferência na água (WTP) com estampas exclusivas e verniz automotivo de alta proteção.',
    iconKey: 'helmet',
  },
  {
    id: 2,
    title: 'Pintura Candy (Verniz Colorido)',
    examplePiece: 'Calota do Fiat Bravo',
    category: 'especiais',
    categoryLabel: 'Candy & Especiais',
    description:
      'Acabamento translúcido de alto brilho e profundidade que realça os contornos da peça sob a luz.',
    iconKey: 'disc',
  },
  {
    id: 3,
    title: 'Pintura Camaleão + Pintura Hidrográfica',
    examplePiece: 'Paralamas de Motocross',
    category: 'especiais',
    categoryLabel: 'Candy & Especiais',
    description:
      'Efeito de mudança de cor conforme o ângulo da luz aliado à arte hidrográfica de alta resistência.',
    iconKey: 'bike',
  },
  {
    id: 4,
    title: 'Pintura Personalizada Fluorescente e Candy',
    examplePiece: 'Capacete Cross',
    category: 'especiais',
    categoryLabel: 'Candy & Especiais',
    description:
      'Cores vibrantes de alta visibilidade combinadas com proteção e profundidade do verniz candy.',
    iconKey: 'zap',
  },
  {
    id: 5,
    title: 'Pintura Hidrográfica (Fibra de Carbono)',
    examplePiece: 'Ponteira de Motocross',
    category: 'hidrografica',
    categoryLabel: 'Pintura Hidrográfica',
    description:
      'Visual esportivo agressivo com textura realista de fibra de carbono e acabamento envernizado.',
    iconKey: 'flame',
  },
  {
    id: 6,
    title: 'Pintura Candy (Verniz Colorido)',
    examplePiece: 'Roda de Moto',
    category: 'especiais',
    categoryLabel: 'Candy & Especiais',
    description:
      'Pintura metálica com verniz candy dourado ou colorido de alta resistência térmica e mecânica.',
    iconKey: 'wheel',
  },
  {
    id: 7,
    title: 'Pintura Personalizada Custom / Artística',
    examplePiece: 'Capacete Custom Preto e Cinza',
    category: 'personalizacao',
    categoryLabel: 'Custom & Estética',
    description:
      'Arte exclusiva sob medida desenvolvida para capacetes e peças com acabamento profissional.',
    iconKey: 'palette',
  },
  {
    id: 8,
    title: 'Pintura Hidrográfica (Fibra de Carbono)',
    examplePiece: 'Painel Interno de Carro',
    category: 'hidrografica',
    categoryLabel: 'Pintura Hidrográfica',
    description:
      'Acabamento premium estilo fibra de carbono para molduras, consoles e interiores automotivos.',
    iconKey: 'car',
  },
  {
    id: 9,
    title: 'Pintura Personalizada Detalhada',
    examplePiece: 'Capacete Estilo Competição / Red Bull',
    category: 'personalizacao',
    categoryLabel: 'Custom & Estética',
    description:
      'Pintura artística complexa com múltiplos detalhes, aerografia precisa e verniz automotivo espelhado.',
    iconKey: 'trophy',
  },
  {
    id: 10,
    title: 'Pintura Hidrográfica Estampada',
    examplePiece: 'Peças e Acessórios Diversos',
    category: 'hidrografica',
    categoryLabel: 'Pintura Hidrográfica',
    description:
      'Estampas variadas (caveiras, geométricos, camuflados e mais) aplicadas por imersão sem emendas.',
    iconKey: 'layers',
  },
  {
    id: 11,
    title: 'Pintura com Verniz Fosco',
    examplePiece: 'Capacete Azul Fosco',
    category: 'personalizacao',
    categoryLabel: 'Custom & Estética',
    description:
      'Acabamento acetinado/fosco moderno e elegante com toque suave e proteção contra raios UV.',
    iconKey: 'shield',
  },
  {
    id: 12,
    title: 'Pintura Hidrográfica em Carenagem',
    examplePiece: 'Tanque de Moto',
    category: 'hidrografica',
    categoryLabel: 'Pintura Hidrográfica',
    description:
      'Personalização de alta durabilidade para tanques e carenagens de motos com resistência a combustível.',
    iconKey: 'fuel',
  },
  {
    id: 13,
    title: 'Revitalização de Farol',
    examplePiece: 'Faróis Automotivos',
    category: 'personalizacao',
    categoryLabel: 'Custom & Estética',
    description:
      'Remoção completa do amarelado e opacidade, polimento técnico e aplicação de proteção UV.',
    iconKey: 'lightbulb',
  },
  {
    id: 14,
    title: 'Pintura Hidrográfica (Fibra de Carbono)',
    examplePiece: 'Peças Cinza e Preto (Retrovisor / Aerofólio)',
    category: 'hidrografica',
    categoryLabel: 'Pintura Hidrográfica',
    description:
      'Acabamento esportivo bicolor em fibra de carbono cinza e preto para detalhes externos e internos.',
    iconKey: 'gauge',
  },
  {
    id: 15,
    title: 'Pintura Especial Candy Roxo',
    examplePiece: 'Roda Automotiva',
    category: 'especiais',
    categoryLabel: 'Candy & Especiais',
    description:
      'Efeito profundo metalizado na tonalidade roxo candy para destacar rodas automotivas e de motos.',
    iconKey: 'circle',
  },
];
