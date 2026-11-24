import type { BeforeAfterCase } from '../types';

/**
 * DICA PARA FOTOS REAIS DE ANTES E DEPOIS:
 * Quando quiser exibir fotos reais fixas por aba, basta preencher `beforeImageUrl` e `afterImageUrl`
 * (ex.: "/fotos/farol-antes.webp" e "/fotos/farol-depois.webp") em qualquer item abaixo.
 */
export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'higienizacao-interna',
    tabLabel: 'Higienização Interna',
    title: 'Extração profunda de estofados e cabine',
    diagnosis:
      'Manchas de líquidos no assento, escurecimento por suor nas abas laterais, poeira incrustada nas costuras e odor retido.',
    process:
      'Aspiração de partículas, aplicação de flotador pH balanceado, escovação de cerdas macias, extração a vácuo e secagem assistida.',
    averageTime: '3h a 5h no box',
    recommendedPackageId: 'combo-completa',
    recommendedAddonId: 'oxi-ozonio',
  },
  {
    id: 'revitalizacao-pintura',
    tabLabel: 'Revitalização de Pintura',
    title: 'Correção leve de brilho e proteção do verniz',
    diagnosis:
      'Pintura escura fosca, marcas circulares (swirls) de lavagens comuns, pontos de seiva e ausência de repelência à água.',
    process:
      'Pré-lavagem em snow foam, descontaminação superficial, etapa de lustro técnico controlado e aplicação de selante sintético.',
    averageTime: '3h a 4h no box',
    recommendedPackageId: 'detalhada',
    recommendedAddonId: 'cera-selante',
  },
  {
    id: 'restauracao-farol',
    tabLabel: 'Restauração de Farol',
    title: 'Clareamento óptico e proteção UV de lentes',
    diagnosis:
      'Camada externa de policarbonato queimada pelo sol, aspecto amarelado opaco e perda de alcance do facho em estradas à noite.',
    process:
      'Mascaramento completo do para-choque, lixamento técnico escalonado, polimento óptico e selagem contra raios UV.',
    averageTime: '1h (o par)',
    recommendedPackageId: 'tecnica',
    recommendedAddonId: 'vitrificacao-farois',
  },
  {
    id: 'rodas-motor',
    tabLabel: 'Rodas / Motor',
    title: 'Descontaminação de rodas e limpeza técnica de cofre',
    diagnosis:
      'Fuligem de pastilha de freio aderida nos cantos dos raios, barro nas caixas de roda e poeira oleosa acumulada nos plásticos do cofre.',
    process:
      'Descontaminante ferroso seguro para liga leve, proteção de componentes sensíveis, pincelamento técnico e verniz seco para plásticos.',
    averageTime: '1h30 a 2h',
    recommendedPackageId: 'detalhada',
    recommendedAddonId: 'lavagem-motor',
  },
  {
    id: 'pintura-hidrografica',
    tabLabel: 'Pintura Hidrográfica',
    title: 'Imersão WTP em Fibra de Carbono & Verniz Automotivo',
    diagnosis:
      'Plásticos internos, retrovisores, carenagens ou ponteiras originais desgastados pelo tempo, sem brilho ou com riscos superficiais.',
    process:
      'Preparação técnica e primer específico, transferência na água (WTP) com trama de fibra de carbono sem emendas e verniz PU alto sólidos.',
    averageTime: 'Sob avaliação da peça',
    recommendedCatalogId: 8,
  },
  {
    id: 'candy-camaleao',
    tabLabel: 'Candy & Camaleão',
    title: 'Pintura Especial Candy, Camaleão, Cromo & Cristal 3D',
    diagnosis:
      'Rodas, tanques, calotas ou capacetes com pintura comum oxidada, sem profundidade óptica ou precisando de projeto exclusivo.',
    process:
      'Base metalizada/flake controlada, camadas translúcidas de verniz Candy ou pigmento Camaleão furta-cor e acabamento espelhado de alta resistência.',
    averageTime: 'Sob avaliação do projeto',
    recommendedCatalogId: 15,
  },
];
