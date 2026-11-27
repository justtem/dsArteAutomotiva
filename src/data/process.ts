import type { ProcessHotspot } from '../types';

export const PROCESS_HOTSPOTS: [ProcessHotspot, ...ProcessHotspot[]] = [
  {
    id: 'pintura-especiais',
    number: '01',
    shortLabel: 'Candy, Camaleão & 3D',
    title: 'Pinturas Especiais: Candy, Camaleão, Flake & Cromo',
    zoneLabel: 'Carroceria, tanques, carenagens e capacetes',
    estimatedTime: 'Cabine & Cura UV',
    summary:
      'Preparação técnica de superfície, base metalizada ou partículas Flake / Cristal 3D e aplicação de vernizes translúcidos Candy, Camaleão, Cromo ou Termocrômica.',
    specs: [
      'Nivelamento fino, lixamento escalonado e primer PU de alta aderência',
      'Efeitos exclusivos: Candy colorido, Camaleão furta-cor, Cristal 3D, Cromo e Flake',
      'Aerografia artística sob medida e verniz PU alto sólidos espelhado ou fosco',
    ],
    hotspot: { x: 31, y: 52 },
  },
  {
    id: 'hidrografica-wtp',
    number: '02',
    shortLabel: 'Pintura Hidrográfica',
    title: 'Pintura Hidrográfica (WTP) & Fibra de Carbono',
    zoneLabel: 'Painéis internos, consoles, retrovisores e ponteiras',
    estimatedTime: 'Imersão WTP',
    summary:
      'Transferência na água (WTP) cobrindo curvas e geometrias 3D complexas sem emendas, com tramas realistas de fibra de carbono e estampas exclusivas.',
    specs: [
      'Tratamento técnico e promotor de aderência específico para plásticos e metais',
      'Tramas em Fibra de Carbono (preta ou bicolor), camuflados, caveiras e geométricos',
      'Selagem com verniz automotivo resistente a sol, calor e respingos de combustível',
    ],
    hotspot: { x: 52, y: 39 },
  },
  {
    id: 'rodas-candy',
    number: '03',
    shortLabel: 'Rodas & Calotas',
    title: 'Pintura Personalizada em Rodas & Calotas',
    zoneLabel: 'Rodas automotivas, aros de moto e calotas',
    estimatedTime: 'Alta Resistência',
    summary:
      'Customização completa de rodas de liga leve, aros de moto e calotas com pintura Candy Roxo, Candy Dourado, metálica ou acabamento acetinado.',
    specs: [
      'Preparação anticorrosiva e correção de marcas superficiais na borda do aro',
      'Pintura especial Candy (verniz colorido) de alta profundidade óptica sob a luz',
      'Verniz PU de alta dureza resistente à temperatura de frenagem e abrasão',
    ],
    hotspot: { x: 75, y: 69 },
  },
  {
    id: 'farois-verniz',
    number: '04',
    shortLabel: 'Faróis & Estética',
    title: 'Revitalização de Faróis & Estética de Pintura',
    zoneLabel: 'Conjunto óptico, lentes e acabamento de verniz',
    estimatedTime: '1h a 4h na oficina',
    summary:
      'Recuperação cristalina de faróis amarelados ou queimados de sol, combinada ao polimento técnico e proteção UV do verniz automotivo.',
    specs: [
      'Mascaramento técnico de proteção e lixamento óptico escalonado nas lentes',
      'Polimento de transparência e proteção UV duradoura contra amarelamento',
      'Refino de brilho no verniz removendo micro-riscos e oxidação superficial',
    ],
    hotspot: { x: 14, y: 55 },
  },
];
