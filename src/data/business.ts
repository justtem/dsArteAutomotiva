import type { BusinessConfig } from '../types';

export const BUSINESS_CONFIG: BusinessConfig = {
  name: 'DS Arte Automotiva',
  shortName: 'DS ARTE AUTOMOTIVA',
  ownerName: 'Diogo Soares',
  controllerDisplayName: 'Diogo Soares — DS Arte Automotiva',
  // Opcional: preencha Razão Social e CNPJ caso deseje exibi-los formalmente no rodapé e Aviso LGPD
  legalName: undefined,
  cnpj: undefined,
  // Opcional: preencha um e-mail dedicado caso deseje somá-lo ao canal oficial de WhatsApp LGPD
  privacyEmail: undefined,
  privacyWhatsappMessage:
    'Olá Diogo! Gostaria de realizar uma solicitação referente aos meus dados pessoais (LGPD — Art. 18) na DS Arte Automotiva.',
  privacyUpdatedAt: '27/11/2026',
  tagline: 'DIOGO SOARES • PINTURA CUSTOM & ESTÉTICA',
  logoUrl: '/logo.jpeg',
  specialtiesHighlight: [
    'Cristal 3D',
    'Cromo',
    'Flake',
    'Candy',
    'Camaleão',
    'Termocrômica',
    'Aerografia',
    'Pintura Hidrográfica',
  ],
  city: 'Valença - RJ • Bairro João Bonito',
  streetAddress: 'Rua Geraldo Pereira da Costa, 290',
  neighborhood: 'Bairro João Bonito — Valença - RJ',
  address: 'Rua Geraldo Pereira da Costa, 290 — João Bonito, Valença - RJ',
  cep: '27600-000',
  referencePoint: 'Oficina DS Arte Automotiva (Diogo Soares) — Atendimento com hora marcada e via WhatsApp',
  whatsappE164: '5524992345623',
  whatsappDisplay: '(24) 99234-5623',
  googleMapsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Rua+Geraldo+Pereira+da+Costa,+290,+Joao+Bonito,+Valenca,+RJ',
  wazeUrl: 'https://waze.com/ul?q=Rua+Geraldo+Pereira+da+Costa+290+Valenca+RJ',
  googleMapsEmbedUrl:
    'https://maps.google.com/maps?q=Rua%20Geraldo%20Pereira%20da%20Costa,%20290,%20Joao%20Bonito,%20Valenca,%20RJ&t=&z=16&ie=UTF8&iwloc=&output=embed',
  paymentMethods: ['Pix (aprovação imediata)', 'Cartão de Débito', 'Cartão de Crédito (até 3x)'],
  pickupFee: 20,
  pickupSummary:
    'Leva e traz agendado em Valença (taxa fixa de referência R$ 20,00 — confirme disponibilidade no WhatsApp com Diogo Soares).',
  // Horários semanais para cálculo automático no fuso America/Sao_Paulo (0 = Dom ... 6 = Sáb)
  schedule: [
    { day: 1, label: 'Segunda-feira', short: 'Seg', open: '08:00', close: '18:00', closed: false },
    { day: 2, label: 'Terça-feira', short: 'Ter', open: '08:00', close: '18:00', closed: false },
    { day: 3, label: 'Quarta-feira', short: 'Qua', open: '08:00', close: '18:00', closed: false },
    { day: 4, label: 'Quinta-feira', short: 'Qui', open: '08:00', close: '18:00', closed: false },
    { day: 5, label: 'Sexta-feira', short: 'Sex', open: '08:00', close: '18:00', closed: false },
    { day: 6, label: 'Sábado', short: 'Sáb', open: '08:00', close: '15:00', closed: false },
    { day: 0, label: 'Domingo', short: 'Dom', open: null, close: null, closed: true },
  ],
};
