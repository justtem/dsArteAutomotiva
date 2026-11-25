import type {
  PeriodPreference,
  QuoteSummary,
  ServiceAddonId,
  ServicePackageId,
  VehicleSizeId,
} from '../../../types';
import { ScrollReveal } from '../../ui';
import { AddonSelector } from './AddonSelector';
import { PackageSelector } from './PackageSelector';
import { QuoteSummaryPanel } from './QuoteSummaryPanel';
import { SchedulePreferences } from './SchedulePreferences';
import { VehicleSizeSelector } from './VehicleSizeSelector';

interface SimulatorSectionProps {
  vehicleSize: VehicleSizeId;
  setVehicleSize: (size: VehicleSizeId) => void;
  selectedPackageId: ServicePackageId;
  setSelectedPackageId: (id: ServicePackageId) => void;
  selectedAddonIds: ServiceAddonId[];
  toggleAddon: (id: ServiceAddonId) => void;
  periodPreference: PeriodPreference;
  setPeriodPreference: (period: PeriodPreference) => void;
  includePickup: boolean;
  setIncludePickup: (value: boolean) => void;
  vehicleModel: string;
  setVehicleModel: (value: string) => void;
  quoteSummary: QuoteSummary;
}

export function SimulatorSection({
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
  quoteSummary,
}: SimulatorSectionProps) {
  return (
    <section id="simulador" className="w-full bg-[#0B0D12] text-white">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12 sm:py-16">
        <ScrollReveal direction="up">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#38BDF8] block mb-2">
              Simulador de Pintura & Estética + WhatsApp
            </span>
            <h2 className="font-display italic text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              Escolha a categoria e simule seu projeto de{' '}
              <span className="text-hydro-dip pr-1">pintura</span>.
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Valores base de referência editáveis no código. Os valores e prazos estimados são
              atualizados automaticamente conforme a categoria ou porte do veículo.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Esquerda (7 cols): Passos do simulador */}
          <ScrollReveal direction="left" delayMs={80} className="lg:col-span-7 space-y-8 min-w-0">
            <VehicleSizeSelector vehicleSize={vehicleSize} onSelectSize={setVehicleSize} />

            <PackageSelector
              vehicleSize={vehicleSize}
              selectedPackageId={selectedPackageId}
              onSelectPackage={setSelectedPackageId}
            />

            <AddonSelector
              vehicleSize={vehicleSize}
              selectedAddonIds={selectedAddonIds}
              onToggleAddon={toggleAddon}
            />

            <SchedulePreferences
              periodPreference={periodPreference}
              onChangePeriod={setPeriodPreference}
              includePickup={includePickup}
              onChangePickup={setIncludePickup}
              vehicleModel={vehicleModel}
              onChangeVehicleModel={setVehicleModel}
            />
          </ScrollReveal>

          {/* Direita (5 cols): Painel Lateral Sticky Contrastado */}
          <QuoteSummaryPanel quoteSummary={quoteSummary} />
        </div>
      </div>
    </section>
  );
}
