import { useCallback, useMemo, useState } from 'react';
import type {
  PeriodPreference,
  ServiceAddonId,
  ServicePackageId,
  VehicleSizeId,
} from '../types';
import { calculateQuoteSummary } from '../utils';

export function useQuoteSimulator() {
  const [vehicleSize, setVehicleSize] = useState<VehicleSizeId>('moto');
  const [selectedPackageId, setSelectedPackageId] = useState<ServicePackageId>('hidrografica-wtp');
  const [selectedAddonIds, setSelectedAddonIds] = useState<ServiceAddonId[]>([]);
  const [periodPreference, setPeriodPreference] = useState<PeriodPreference>('Manhã');
  const [includePickup, setIncludePickup] = useState<boolean>(false);
  const [vehicleModel, setVehicleModel] = useState<string>('');

  const toggleAddon = useCallback((addonId: ServiceAddonId) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  }, []);

  const applyCaseToSimulator = useCallback(
    (packageId?: ServicePackageId, addonId?: ServiceAddonId) => {
      if (packageId) setSelectedPackageId(packageId);
      if (addonId) {
        setSelectedAddonIds((prev) => (prev.includes(addonId) ? prev : [...prev, addonId]));
      }
      const target = document.getElementById('simulador');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  const quoteSummary = useMemo(
    () =>
      calculateQuoteSummary({
        vehicleSize,
        selectedPackageId,
        selectedAddonIds,
        periodPreference,
        includePickup,
        vehicleModel,
      }),
    [
      vehicleSize,
      selectedPackageId,
      selectedAddonIds,
      periodPreference,
      includePickup,
      vehicleModel,
    ]
  );

  return {
    vehicleSize,
    setVehicleSize,
    selectedPackageId,
    setSelectedPackageId,
    selectedAddonIds,
    toggleAddon,
    periodPreference,
    setPeriodPreference,
    includePickup,
    setIncludePickup,
    vehicleModel,
    setVehicleModel,
    applyCaseToSimulator,
    quoteSummary,
  };
}
