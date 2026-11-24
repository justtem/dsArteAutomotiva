import { BUSINESS_CONFIG, SERVICE_ADDONS, SERVICE_PACKAGES, VEHICLE_SIZES } from '../data';
import type {
  PeriodPreference,
  QuoteSummary,
  ServiceAddon,
  ServiceAddonId,
  ServicePackageId,
  VehicleSizeId,
} from '../types';
import { formatBRL, formatDuration, sanitizeText } from './formatters';
import { buildWhatsAppUrl } from './whatsapp';

export function getAddonPrice(addon: ServiceAddon, vehicleSize: VehicleSizeId): number {
  return addon.pricingType === 'bySize' ? addon.prices[vehicleSize] : addon.price;
}

export interface CalculateQuoteParams {
  vehicleSize: VehicleSizeId;
  selectedPackageId: ServicePackageId;
  selectedAddonIds: ServiceAddonId[];
  periodPreference: PeriodPreference;
  includePickup: boolean;
  vehicleModel: string;
}

export function calculateQuoteSummary({
  vehicleSize,
  selectedPackageId,
  selectedAddonIds,
  periodPreference,
  includePickup,
  vehicleModel,
}: CalculateQuoteParams): QuoteSummary {
  const sizeObj = VEHICLE_SIZES.find((s) => s.id === vehicleSize) || VEHICLE_SIZES[1];
  const pkgObj = SERVICE_PACKAGES.find((p) => p.id === selectedPackageId) || SERVICE_PACKAGES[0];
  const packagePrice = pkgObj.prices[sizeObj.id];
  const packageMinutes = pkgObj.durationMinutes[sizeObj.id];

  const selectedAddons = SERVICE_ADDONS.filter((addon) =>
    selectedAddonIds.includes(addon.id)
  ).map((addon) => ({
    ...addon,
    computedPrice: getAddonPrice(addon, sizeObj.id),
  }));

  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.computedPrice, 0);
  const addonsMinutes = selectedAddons.reduce((sum, item) => sum + item.extraMinutes, 0);
  const pickupCost = includePickup ? BUSINESS_CONFIG.pickupFee : 0;

  const totalPrice = packagePrice + addonsTotal + pickupCost;
  const totalMinutes = packageMinutes + addonsMinutes;

  const cleanModel = sanitizeText(vehicleModel).trim();
  const lines = [
    `Olá ${BUSINESS_CONFIG.ownerName.split(' ')[0]}! Vim pelo site da ${BUSINESS_CONFIG.name} e gostaria de agendar:`,
    `- Porte: ${sizeObj.label}${cleanModel ? ` (${cleanModel})` : ''}`,
    `- Pacote: ${pkgObj.name} (${formatBRL(packagePrice)})`,
  ];

  if (selectedAddons.length > 0) {
    lines.push(
      `- Adicionais: ${selectedAddons
        .map((a) => `${a.name} (${formatBRL(a.computedPrice)})`)
        .join(', ')}`
    );
  }

  if (includePickup) {
    lines.push(`- Leva e Traz local: Sim (+${formatBRL(BUSINESS_CONFIG.pickupFee)})`);
  }

  lines.push(`- Período preferido: ${periodPreference}`);
  lines.push(
    `- Estimativa no site: ${formatBRL(totalPrice)} (tempo médio: ${formatDuration(totalMinutes)})`
  );
  lines.push('Quais horários vocês têm disponíveis?');

  const message = lines.join('\n');

  return {
    sizeLabel: sizeObj.label,
    packageName: pkgObj.name,
    packagePrice,
    selectedAddons,
    includePickup,
    totalPrice,
    totalMinutes,
    message,
    whatsappUrl: buildWhatsAppUrl(BUSINESS_CONFIG.whatsappE164, message),
  };
}
