import type { ProcessHotspot } from '../types';

export const PROCESS_HOTSPOTS: ProcessHotspot[] = [
  {
    id: 'snowfoam-pintura',
    number: '01',
    shortLabel: 'Snow Foam & Pintura',
    title: 'Pré-lavagem Snow Foam & Pintura',
    zoneLabel: 'Carroceria, capô e para-choques',
    estimatedTime: '20 a 30 min',
    summary:
      'Aplicação de espuma ativa pH neutro que envolve e solta terra, poeira de estrada e insetos antes de qualquer toque na lataria.',
    specs: [
      'Método de dois baldes com separador de partículas para reduzir riscos no verniz',
      'Luva de microfibra dedicada exclusivamente à pintura superior',
      'Secagem sem arrasto com toalha de alta gramatura e soprador nos vincos',
    ],
    hotspot: { x: 22, y: 50 },
  },
  {
    id: 'rodas-caixas',
    number: '02',
    shortLabel: 'Rodas, Caixas & Pneus',
    title: 'Rodas, Caixas & Pneus',
    zoneLabel: 'Aros, pinças, caixas de roda e pneus',
    estimatedTime: '15 a 25 min',
    summary:
      'Limpeza técnica separada com escovas e pincéis exclusivos para remover pó de pastilha de freio e barro sem agredir o acabamento do aro.',
    specs: [
      'Descontaminante seguro para rodas diamantadas, pintadas ou de liga leve',
      'Escovação interna do tambor da roda e caixas de roda',
      'Condicionador seco para pneus com aspecto acetinado que não espirra na lataria',
    ],
    hotspot: { x: 75, y: 69 },
  },
  {
    id: 'interior-higienizacao',
    number: '03',
    shortLabel: 'Interior & Higienização',
    title: 'Interior & Higienização Técnica',
    zoneLabel: 'Bancos, painel, console e carpetes',
    estimatedTime: '25 a 45 min',
    summary:
      'Aspiração detalhada de trilhos, carpetes e porta-malas combinada à limpeza de painel, volante e bancos com acabamento original fosco.',
    specs: [
      'Pincelamento técnico em saídas de ar, botões, costuras e console central',
      'Limpeza pH balanceada sem uso de silicone oleoso ou brilhante',
      'Opção de extração profunda de estofados e hidratação de couro',
    ],
    hotspot: { x: 50, y: 49 },
  },
  {
    id: 'vidros-protecao',
    number: '04',
    shortLabel: 'Vidros & Proteção UV',
    title: 'Vidros, Plásticos & Proteção UV',
    zoneLabel: 'Para-brisa, teto, frisos e plásticos externos',
    estimatedTime: '15 a 25 min',
    summary:
      'Desengorduramento completo dos vidros para visibilidade limpa à noite e aplicação de proteção UV em plásticos externos e pintura.',
    specs: [
      'Remoção de película de oleosidade interna e marcas d’água leves nos vidros',
      'Revitalizador UV para churrasqueira, para-barros e borrachas de porta',
      'Selagem sintética de pintura com hidrorrepelência sob escolha do pacote',
    ],
    hotspot: { x: 46, y: 31 },
  },
];
