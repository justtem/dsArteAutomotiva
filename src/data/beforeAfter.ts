import type { BeforeAfterCase } from '../types';

/**
 * DICA PARA FOTOS REAIS DE ANTES E DEPOIS:
 * Quando quiser exibir fotos reais fixas por aba, basta preencher `beforeImageUrl` e `afterImageUrl`
 * (ex.: "/fotos/farol-antes.webp" e "/fotos/farol-depois.webp") em qualquer item abaixo.
 * PRIVACIDADE / LGPD: antes de publicar fotos reais em `public/fotos/`, remova metadados EXIF/GPS
 * do arquivo, oculte/tarje placas de veículos, rostos ou fachadas residenciais e garanta autorização do cliente.
 */
export const BEFORE_AFTER_CASES: [BeforeAfterCase, ...BeforeAfterCase[]] = [
  {
    id: 'pintura-hidrografica',
    tabLabel: 'Pintura Hidrográfica',
    title: 'Imersão WTP em Fibra de Carbono & Verniz Automotivo',
    diagnosis:
      'Painéis internos, retrovisores, carenagens, tanques ou ponteiras originais desgastados pelo tempo, sem brilho ou com riscos superficiais.',
    process:
      'Preparação técnica e primer específico, transferência na água (WTP) com trama de fibra de carbono ou estampa sem emendas e verniz PU alto sólidos.',
    averageTime: 'Sob avaliação da peça',
    recommendedPackageId: 'hidrografica-wtp',
    recommendedCatalogId: 8,
  },
  {
    id: 'candy-camaleao',
    tabLabel: 'Candy & Camaleão',
    title: 'Pintura Especial Candy, Camaleão, Cromo & Cristal 3D',
    diagnosis:
      'Tanques, carenagens, calotas ou capacetes com pintura original desbotada, sem profundidade óptica ou precisando de projeto exclusivo.',
    process:
      'Base metalizada/flake controlada, camadas translúcidas de verniz Candy ou pigmento Camaleão furta-cor e acabamento espelhado de alta resistência.',
    averageTime: 'Sob avaliação do projeto',
    recommendedPackageId: 'candy-camaleao-custom',
    recommendedAddonId: 'efeito-flake-cristal',
    recommendedCatalogId: 3,
  },
  {
    id: 'pintura-rodas',
    tabLabel: 'Pintura de Rodas',
    title: 'Pintura Especial Candy & Metálica em Rodas e Calotas',
    diagnosis:
      'Rodas de carro, aros de moto ou calotas com pintura oxidada, sem destaque visual ou com riscos superficiais de uso urbano.',
    process:
      'Lixamento técnico, fundo anticorrosivo, base metálica e aplicação de verniz colorido Candy (roxo, dourado ou sob medida) com verniz PU.',
    averageTime: '1 a 2 dias úteis',
    recommendedPackageId: 'candy-camaleao-custom',
    recommendedAddonId: 'pintura-rodas-calotas',
    recommendedCatalogId: 15,
  },
  {
    id: 'aerografia-custom',
    tabLabel: 'Aerografia & Fosco',
    title: 'Pintura Artística Custom, Competição & Verniz Fosco',
    diagnosis:
      'Capacetes, tanques e peças lisas sem identidade visual ou com pintura antiga riscada precisando de renovação sob medida.',
    process:
      'Desenho e mascaramento milimétrico, sombreamento em aerógrafo e selagem final em verniz fosco acetinado UV ou alto brilho espelhado.',
    averageTime: 'Sob avaliação da arte',
    recommendedPackageId: 'pintura-verniz',
    recommendedAddonId: 'aerografia-grafismo',
    recommendedCatalogId: 9,
  },
  {
    id: 'revitalizacao-pintura',
    tabLabel: 'Pintura & Verniz',
    title: 'Renovação de Pintura, Polimento Técnico & Espelhamento',
    diagnosis:
      'Verniz automotivo opaco, queimado de sol, com micro-riscos circulares e perda de reflexo e profundidade de cor.',
    process:
      'Correção técnica escalonada da superfície, refino óptico sob iluminação de inspeção e proteção UV de alto brilho para o verniz.',
    averageTime: '3h a 6h na oficina',
    recommendedPackageId: 'pintura-verniz',
    recommendedAddonId: 'polimento-verniz',
    recommendedCatalogId: 11,
  },
  {
    id: 'restauracao-farol',
    tabLabel: 'Revitalização de Farol',
    title: 'Clareamento Óptico e Proteção UV de Faróis',
    diagnosis:
      'Camada externa de policarbonato queimada pelo sol, aspecto amarelado opaco e perda de alcance do facho luminoso à noite.',
    process:
      'Mascaramento completo ao redor da lente, lixamento técnico progressivo, polimento óptico cristalino e selagem contra raios UV.',
    averageTime: '1h a 1h30 (o par)',
    recommendedPackageId: 'pintura-verniz',
    recommendedAddonId: 'revitalizacao-farois',
    recommendedCatalogId: 13,
  },
];
