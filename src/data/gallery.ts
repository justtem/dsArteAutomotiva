import type { GalleryCategory, GalleryItem } from '../types';

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Destaques',
  'Estética & Lavagem',
  'Pintura Hidrográfica',
  'Candy & Especiais',
  'Custom & Faróis',
];

/**
 * GALERIA TÉCNICA & PORTFÓLIO UNIFICADO (Estética + Pinturas Especiais DS Arte Automotiva)
 * Para substituir qualquer ilustração por foto real, adicione `imageUrl: '/fotos/sua-foto.webp'`.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-pintura-snowfoam',
    featured: true,
    category: 'Estética & Lavagem',
    title: 'Pré-lavagem Snow Foam & Descontaminação',
    vehicle: 'SUV / Picape / Sedan',
    duration: '1h 40min',
    visualKey: 'pintura-snowfoam',
    processSummary: 'Espuma pH neutro, método de dois baldes e secagem com soprador técnico.',
    technicalSteps: [
      'Banho integral de espuma ativa para dissolução de barro e poeira de estrada',
      'Pincelamento de grades, emblemas e frisos sem contato abrasivo',
      'Secagem sem arrasto com toalha de microfibra e ar comprimido nos retrovisores',
    ],
  },
  {
    id: 'gal-hidrografica-painel',
    catalogId: 8,
    featured: true,
    category: 'Pintura Hidrográfica',
    title: 'Pintura Hidrográfica (Fibra de Carbono)',
    vehicle: 'Painel Interno / Retrovisores / Ponteiras',
    duration: 'Sob avaliação',
    visualKey: 'hidrografica-carbono',
    processSummary:
      'Imersão WTP com textura realista de fibra de carbono e verniz automotivo de alta proteção.',
    technicalSteps: [
      'Preparação técnica da superfície e aplicação de primer específico de aderência',
      'Transferência hidrográfica controlada na água sem emendas nos contornos',
      'Selagem com verniz PU automotivo de alto brilho ou acabamento acetinado',
    ],
  },
  {
    id: 'gal-candy-camaleao-rodas',
    catalogId: 15,
    featured: true,
    category: 'Candy & Especiais',
    title: 'Pintura Candy, Camaleão & Cristal 3D',
    vehicle: 'Rodas / Calotas / Paralamas',
    duration: 'Sob avaliação',
    visualKey: 'candy-camaleao',
    processSummary:
      'Vernizes translúcidos de profundidade, efeito furta-cor Camaleão, Cromo e Metal Flake.',
    technicalSteps: [
      'Nivelamento fino e aplicação de base metalizada ou partículas Flake / Cristal 3D',
      'Camadas homogêneas de verniz colorido Candy ou pigmento Camaleão',
      'Acabamento espelhado de alta resistência térmica e mecânica',
    ],
  },
  {
    id: 'gal-interior-extracao',
    featured: true,
    category: 'Estética & Lavagem',
    title: 'Extração Profunda de Bancos e Carpetes',
    vehicle: 'Hatch / Sedan / SUV',
    duration: '3h 30min',
    visualKey: 'interior-extracao',
    processSummary: 'Flotação controlada de manchas, escovação macia e extração a vácuo.',
    technicalSteps: [
      'Aspiração de sólidos acumulados nas costuras, trilhos e dobras do tecido',
      'Flotação de sujeira orgânica sem encharcar a espuma estrutural do banco',
      'Secagem assistida no box garantindo acabamento uniforme e toque seco',
    ],
  },
  {
    id: 'gal-rodas-motor',
    featured: true,
    category: 'Estética & Lavagem',
    title: 'Detalhamento de Rodas e Cofre do Motor',
    vehicle: 'Todos os portes',
    duration: '1h 50min',
    visualKey: 'rodas-motor',
    processSummary: 'Descontaminação ferrosa de aros e limpeza controlada de plásticos do cofre.',
    technicalSteps: [
      'Remoção de pó de pastilha de freio nos cantos internos dos raios e pinças',
      'Isolamento de módulos eletrônicos e limpeza a seco/controlada do motor',
      'Aplicação de verniz seco protetor em mangueiras, reservatórios e tampas',
    ],
  },
  {
    id: 'gal-farois-vitrificacao',
    catalogId: 13,
    featured: true,
    category: 'Custom & Faróis',
    title: 'Restauração Óptica e Vitrificação de Faróis',
    vehicle: 'Todos os portes',
    duration: '1h 00min',
    visualKey: 'farois-optica',
    processSummary: 'Lixamento técnico escalonado, polimento cristalino e proteção UV.',
    technicalSteps: [
      'Mascaramento de toda a borda de pintura ao redor do conjunto óptico',
      'Remoção total da camada queimada de sol com lixas técnicas progressivas',
      'Polimento de transparência seguido de vitrificação contra raios UV',
    ],
  },
  // Demais itens por categoria (visíveis ao filtrar cada especialidade)
  {
    id: 'gal-pintura-selante',
    category: 'Estética & Lavagem',
    title: 'Lustro Técnico e Selagem Hidrorrepelente',
    vehicle: 'Sedan / Hatch / SUV',
    duration: '3h 30min',
    visualKey: 'pintura-selante',
    processSummary: 'Nivelamento leve do verniz sob luz de inspeção e proteção sintética.',
    technicalSteps: [
      'Mapeamento de micro-riscos circulares com iluminação técnica dedicada',
      'Refino de brilho controlado removendo névoa de oxidação superficial',
      'Aplicação de selante sintético para repelir água e facilitar manutenções',
    ],
  },
  {
    id: 'gal-interior-couro',
    category: 'Estética & Lavagem',
    title: 'Limpeza e Hidratação de Couro Fosco',
    vehicle: 'SUV / Sedan',
    duration: '2h 00min',
    visualKey: 'interior-couro',
    processSummary: 'Remoção de oleosidade no volante e bancos devolvendo o aspecto original.',
    technicalSteps: [
      'Limpeza com espuma neutra e escova de crina macia nas áreas de atrito',
      'Remoção de brilho gorduroso acumulado por suor e produtos inadequados',
      'Condicionamento com protetor UV à base d’água e acabamento fosco',
    ],
  },
  {
    id: 'gal-hidro-capacete',
    catalogId: 1,
    category: 'Pintura Hidrográfica',
    title: 'Pintura Hidrográfica Estampada em Capacete',
    vehicle: 'Capacetes & Peças Diversas',
    duration: 'Sob avaliação',
    visualKey: 'custom-capacete',
    processSummary:
      'Transferência na água com estampas exclusivas (geométricos, camuflados, caveiras) e verniz PU.',
    technicalSteps: [
      'Desmontagem cuidadosa de viseira, entradas de ar e guarnições',
      'Imersão hidrográfica de precisão cobrindo toda a curvatura do casco',
      'Envernizamento automotivo com proteção UV de longa durabilidade',
    ],
  },
  {
    id: 'gal-hidro-tanque',
    catalogId: 12,
    category: 'Pintura Hidrográfica',
    title: 'Hidrográfica em Tanque, Carenagem e Ponteira',
    vehicle: 'Motos Street & Motocross',
    duration: 'Sob avaliação',
    visualKey: 'hidrografica-carbono',
    processSummary:
      'Personalização de alta durabilidade para carenagens e tanques com resistência a combustível.',
    technicalSteps: [
      'Tratamento para plásticos flexíveis e superfícies metálicas de motos',
      'Aplicação em textura Fibra de Carbono bicolor ou artes especiais',
      'Verniz alto sólidos resistente a respingos de combustível e abrasão',
    ],
  },
  {
    id: 'gal-candy-fluorescente',
    catalogId: 4,
    category: 'Candy & Especiais',
    title: 'Pintura Fluorescente, Candy & Termocrômica',
    vehicle: 'Capacetes Cross / Rodas de Moto',
    duration: 'Sob avaliação',
    visualKey: 'candy-camaleao',
    processSummary:
      'Cores vibrantes de alta visibilidade, pigmentos termocrômicos e verniz candy profundo.',
    technicalSteps: [
      'Base branca ou refletiva pura para máxima saturação fluorescente',
      'Efeitos especiais sob medida: Candy dourado/roxo, Camaleão ou Termocrômico',
      'Proteção UV reforçada preservando a intensidade da cor no sol',
    ],
  },
  {
    id: 'gal-custom-aerografia',
    catalogId: 9,
    category: 'Custom & Faróis',
    title: 'Aerografia, Estilo Competição & Verniz Fosco',
    vehicle: 'Capacetes Custom / Peças Exclusivas',
    duration: 'Sob avaliação',
    visualKey: 'custom-capacete',
    processSummary:
      'Pintura artística detalhada, grafismos estilo competição e opção de verniz azul/preto fosco.',
    technicalSteps: [
      'Mascaramento milimétrico de faixas, logotipos e sombreamentos em aerógrafo',
      'Opção de acabamento espelhado alto brilho ou verniz fosco acetinado',
      'Entrega com superfície selada e toque macio resistente a raios UV',
    ],
  },
];
