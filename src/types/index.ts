export interface ScheduleDay {
  day: number;
  label: string;
  short: string;
  open: string | null;
  close: string | null;
  closed: boolean;
}

export interface BusinessConfig {
  name: string;
  shortName: string;
  ownerName: string;
  controllerDisplayName: string;
  legalName?: string;
  cnpj?: string;
  privacyEmail?: string;
  privacyWhatsappMessage: string;
  privacyUpdatedAt: string;
  tagline: string;
  logoUrl: string;
  specialtiesHighlight: string[];
  city: string;
  streetAddress: string;
  neighborhood: string;
  address: string;
  cep: string;
  referencePoint: string;
  whatsappE164: string;
  whatsappDisplay: string;
  googleMapsUrl: string;
  wazeUrl: string;
  googleMapsEmbedUrl: string;
  paymentMethods: string[];
  pickupFee: number;
  pickupSummary: string;
  schedule: ScheduleDay[];
}

export interface BusinessStatus {
  isOpen: boolean;
  closingSoon: boolean;
  dayOfWeek: number;
  badgeText: string;
  todayHours: string;
}

export type ProcessHotspotId =
  | 'pintura-especiais'
  | 'hidrografica-wtp'
  | 'rodas-candy'
  | 'farois-verniz';

export interface ProcessHotspot {
  id: ProcessHotspotId;
  number: string;
  shortLabel: string;
  title: string;
  zoneLabel: string;
  estimatedTime: string;
  summary: string;
  specs: string[];
  hotspot: {
    x: number;
    y: number;
  };
}

export type BeforeAfterCaseId =
  | 'pintura-hidrografica'
  | 'candy-camaleao'
  | 'pintura-rodas'
  | 'aerografia-custom'
  | 'revitalizacao-pintura'
  | 'restauracao-farol';

export type VehicleSizeId = 'moto' | 'hatch' | 'sedan' | 'suv';

export interface VehicleSize {
  id: VehicleSizeId;
  label: string;
  note: string;
}

export type ServicePackageId =
  | 'pintura-verniz'
  | 'hidrografica-wtp'
  | 'candy-camaleao-custom';

export interface ServicePackage {
  id: ServicePackageId;
  name: string;
  tag: string;
  description: string;
  prices: Record<VehicleSizeId, number>;
  durationMinutes: Record<VehicleSizeId, number>;
  included: string[];
}

export type ServiceAddonId =
  | 'revitalizacao-farois'
  | 'pintura-rodas-calotas'
  | 'aerografia-grafismo'
  | 'efeito-flake-cristal'
  | 'verniz-fosco-uv'
  | 'polimento-verniz';

interface ServiceAddonBase {
  id: ServiceAddonId;
  name: string;
  detail: string;
  extraMinutes: number;
}

export interface ServiceAddonBySize extends ServiceAddonBase {
  pricingType: 'bySize';
  prices: Record<VehicleSizeId, number>;
}

export interface ServiceAddonFixed extends ServiceAddonBase {
  pricingType: 'fixed';
  price: number;
}

export type ServiceAddon = ServiceAddonBySize | ServiceAddonFixed;

export type ComputedServiceAddon = ServiceAddon & {
  computedPrice: number;
};

export interface BeforeAfterCase {
  id: BeforeAfterCaseId;
  tabLabel: string;
  title: string;
  diagnosis: string;
  process: string;
  averageTime: string;
  recommendedPackageId?: ServicePackageId;
  recommendedAddonId?: ServiceAddonId;
  recommendedCatalogId?: number;
  beforeImageUrl?: string;
  afterImageUrl?: string;
}

export type GalleryCategory =
  | 'Destaques'
  | 'Pintura Hidrográfica'
  | 'Candy & Especiais'
  | 'Aerografia & Custom'
  | 'Estética & Faróis';

export type GalleryVisualKey =
  | 'hidrografica-carbono'
  | 'candy-camaleao'
  | 'rodas-candy'
  | 'aerografia-fosco'
  | 'pintura-verniz'
  | 'farois-optica'
  | 'cristal-cromo';

export interface GalleryItem {
  id: string;
  catalogId?: number;
  featured?: boolean;
  category: Exclude<GalleryCategory, 'Destaques'>;
  title: string;
  vehicle: string;
  duration: string;
  visualKey: GalleryVisualKey;
  imageUrl?: string;
  processSummary: string;
  technicalSteps: string[];
}

export type CustomCatalogCategory = 'todos' | 'hidrografica' | 'especiais' | 'personalizacao';

export type CustomServiceIconKey =
  | 'helmet'
  | 'disc'
  | 'bike'
  | 'zap'
  | 'flame'
  | 'wheel'
  | 'palette'
  | 'car'
  | 'trophy'
  | 'layers'
  | 'shield'
  | 'fuel'
  | 'lightbulb'
  | 'gauge'
  | 'circle';

export interface SpecialtyHighlight {
  id: string;
  title: string;
  description: string;
  iconKey: 'droplets' | 'gem' | 'paintbrush' | 'sparkles';
}

export interface CustomCatalogService {
  id: number;
  title: string;
  examplePiece: string;
  category: Exclude<CustomCatalogCategory, 'todos'>;
  categoryLabel: string;
  description: string;
  iconKey: CustomServiceIconKey;
  imageUrl?: string;
}

export type PeriodPreference = 'Manhã' | 'Tarde' | 'Próximo horário';

export interface QuoteSummary {
  sizeLabel: string;
  packageName: string;
  packagePrice: number;
  selectedAddons: ComputedServiceAddon[];
  includePickup: boolean;
  totalPrice: number;
  totalMinutes: number;
  message: string;
  whatsappUrl: string;
}
