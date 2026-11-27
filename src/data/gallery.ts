import type { GalleryCategory, GalleryItem } from '../types';

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Destaques',
  'Pintura Hidrográfica',
  'Candy & Especiais',
  'Aerografia & Custom',
  'Estética & Faróis',
];

/**
 * GALERIA TÉCNICA & PORTFÓLIO UNIFICADO (Pinturas Personalizadas & Estética DS Arte Automotiva)
 * Para substituir qualquer ilustração por foto real, adicione `imageUrl: '/fotos/sua-foto.webp'`.
 * PRIVACIDADE / LGPD: antes de versionar fotos reais em `public/fotos/`, remova todos os metadados EXIF/GPS
 * e borre/tarje placas legíveis, documentos ou rostos de terceiros.
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-hidrografica-painel',
    catalogId: 8,
    featured: true,
    category: 'Pintura Hidrográfica',
    title: 'Pintura Hidrográfica (Fibra de Carbono)',
    vehicle: 'Painel Interno / Molduras / Consoles',
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
    title: 'Pintura Especial Candy Roxo & Dourado em Rodas',
    vehicle: 'Rodas Automotivas / Rodas de Moto / Calotas',
    duration: 'Sob avaliação',
    visualKey: 'rodas-candy',
    processSummary:
      'Pintura metálica com verniz colorido Candy de alta profundidade óptica e resistência térmica.',
    technicalSteps: [
      'Preparação completa do aro e aplicação de base metalizada uniforme',
      'Camadas translúcidas de verniz Candy Roxo, Dourado ou cor sob medida',
      'Acabamento espelhado PU resistente a calor de freio e impactos leves',
    ],
  },
  {
    id: 'gal-camaleao-hidrografica',
    catalogId: 3,
    featured: true,
    category: 'Candy & Especiais',
    title: 'Pintura Camaleão + Hidrográfica & Cristal 3D',
    vehicle: 'Paralamas / Carenagens / Peças Exclusivas',
    duration: 'Sob avaliação',
    visualKey: 'candy-camaleao',
    processSummary:
      'Mudança de tonalidade conforme o ângulo da luz combinada a efeitos Cristal 3D, Cromo e Flake.',
    technicalSteps: [
      'Nivelamento fino e aplicação de fundo escuro/metalizado para refração óptica',
      'Pigmento Camaleão furta-cor, partículas Metal Flake ou efeito Cristal 3D',
      'Envernizamento alto sólidos destacando os contornos sob a luz solar',
    ],
  },
  {
    id: 'gal-custom-aerografia',
    catalogId: 9,
    featured: true,
    category: 'Aerografia & Custom',
    title: 'Aerografia Artística & Estilo Competição',
    vehicle: 'Capacetes Custom / Tanques / Peças',
    duration: 'Sob avaliação',
    visualKey: 'aerografia-fosco',
    processSummary:
      'Pintura artística detalhada, grafismos estilo competição e acabamento espelhado ou fosco.',
    technicalSteps: [
      'Mascaramento milimétrico de faixas, logotipos e sombreamentos em aerógrafo',
      'Desenvolvimento de artes exclusivas preto/cinza ou cores vibrantes sob medida',
      'Selagem com verniz PU automotivo de longa durabilidade e proteção UV',
    ],
  },
  {
    id: 'gal-verniz-fosco',
    catalogId: 11,
    featured: true,
    category: 'Estética & Faróis',
    title: 'Pintura com Verniz Fosco & Espelhamento PU',
    vehicle: 'Capacetes / Peças / Carroceria',
    duration: 'Sob avaliação',
    visualKey: 'pintura-verniz',
    processSummary:
      'Acabamento acetinado fosco de toque suave ou polimento técnico espelhado com proteção UV.',
    technicalSteps: [
      'Preparação uniforme da base eliminando micro-riscos e marcas de oxidação',
      'Aplicação homogênea de verniz fosco acetinado (azul, preto, cinza) ou alto brilho',
      'Barreira contra raios solares evitando desbotamento precoce da tonalidade',
    ],
  },
  {
    id: 'gal-farois-vitrificacao',
    catalogId: 13,
    featured: true,
    category: 'Estética & Faróis',
    title: 'Revitalização Óptica e Proteção UV de Faróis',
    vehicle: 'Faróis Automotivos (Todos os portes)',
    duration: '1h a 1h30',
    visualKey: 'farois-optica',
    processSummary: 'Remoção total do amarelado, lixamento técnico escalonado, polimento e proteção UV.',
    technicalSteps: [
      'Mascaramento de toda a borda de pintura ao redor do conjunto óptico',
      'Remoção completa da camada queimada de sol com lixas técnicas progressivas',
      'Polimento cristalino seguido de proteção UV contra retorno da opacidade',
    ],
  },
  // Demais itens por especialidade (visíveis ao filtrar categorias)
  {
    id: 'gal-hidro-capacete',
    catalogId: 1,
    category: 'Pintura Hidrográfica',
    title: 'Pintura Hidrográfica Estampada em Capacete',
    vehicle: 'Capacetes & Acessórios Diversos',
    duration: 'Sob avaliação',
    visualKey: 'hidrografica-carbono',
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
      'Personalização de alta durabilidade para carenagens, ponteiras e tanques resistente a combustível.',
    technicalSteps: [
      'Tratamento específico para plásticos flexíveis e superfícies metálicas de motos',
      'Aplicação em textura Fibra de Carbono esportiva ou artes personalizadas',
      'Verniz alto sólidos resistente a respingos de combustível e abrasão',
    ],
  },
  {
    id: 'gal-hidro-bicolor',
    catalogId: 14,
    category: 'Pintura Hidrográfica',
    title: 'Fibra de Carbono Bicolor (Retrovisor & Aerofólio)',
    vehicle: 'Retrovisores / Aerofólios / Frisos',
    duration: 'Sob avaliação',
    visualKey: 'hidrografica-carbono',
    processSummary:
      'Acabamento esportivo bicolor em fibra de carbono cinza e preto para detalhes externos e internos.',
    technicalSteps: [
      'Preparação fina de capas de retrovisor, aerofólios e acabamentos plásticos',
      'Imersão WTP alinhada preservando o sentido diagonal da trama de carbono',
      'Acabamento envernizado brilhante ou acetinado integrando ao visual do carro',
    ],
  },
  {
    id: 'gal-candy-fluorescente',
    catalogId: 4,
    category: 'Candy & Especiais',
    title: 'Pintura Fluorescente, Candy & Termocrômica',
    vehicle: 'Capacetes Cross / Calotas / Peças',
    duration: 'Sob avaliação',
    visualKey: 'cristal-cromo',
    processSummary:
      'Cores vibrantes de alta visibilidade, pigmentos termocrômicos, Cromo e verniz Candy profundo.',
    technicalSteps: [
      'Base refletiva pura para máxima luminosidade em tons fluorescentes e Candy',
      'Opções de pigmento Termocrômico (muda com temperatura), Cromo e Cristal 3D',
      'Proteção UV reforçada mantendo o impacto visual em pistas e ruas',
    ],
  },
  {
    id: 'gal-custom-preto-cinza',
    catalogId: 7,
    category: 'Aerografia & Custom',
    title: 'Pintura Custom Artística Preto & Cinza',
    vehicle: 'Capacetes Custom / Tanques',
    duration: 'Sob avaliação',
    visualKey: 'aerografia-fosco',
    processSummary:
      'Arte exclusiva sob medida em tons sóbrios metálicos e grafite com acabamento profissional.',
    technicalSteps: [
      'Criação do layout personalizado respeitando as linhas do capacete ou tanque',
      'Sombreamento suave em aerografia de precisão sem degraus de tinta no toque',
      'Verniz final nivelado de alto brilho ou toque acetinado',
    ],
  },
  {
    id: 'gal-candy-calota-roda',
    catalogId: 2,
    category: 'Estética & Faróis',
    title: 'Revitalização & Pintura Candy em Calotas e Detalhes',
    vehicle: 'Calotas / Emblemas / Acabamentos',
    duration: 'Sob avaliação',
    visualKey: 'rodas-candy',
    processSummary:
      'Renovação estética de calotas (ex.: Fiat Bravo) e detalhes externos com verniz colorido translúcido.',
    technicalSteps: [
      'Recuperação de plásticos desgastados e aplicação de promotor de aderência',
      'Pintura metálica seguida de verniz colorido Candy realçando os vincos da peça',
      'Cura completa garantindo resistência na rotina urbana e rodoviária',
    ],
  },
];
