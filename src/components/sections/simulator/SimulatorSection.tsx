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
    <section
      id="simulador"
      className="w-full bg-[#EFECE6] bg-concrete-grain text-[#111113] overflow-x-clip"
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-14 sm:py-20">
        <ScrollReveal direction="up">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="font-mono text-sm sm:text-base font-bold text-[#C2410C]">
                03 //
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#52525B]">
                Ficha de Orçamento • Ordem de Serviço + WhatsApp
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight leading-[0.92] text-[#111113] mb-3">
              Monte sua <span className="text-[#0369A1]">ordem de pintura</span> sob medida.
            </h2>
            <p className="text-sm sm:text-base text-[#27272A] leading-relaxed">
              Selecione a categoria, a modalidade principal e os detalhes desejados. Os valores e
              prazos estimados são calculados automaticamente conforme sua escolha.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Esquerda (7 cols): Ficha de Bancada com filetes estruturais pretos */}
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

          {/* Direita (5 cols): Talão / Comprovante de Ordem de Serviço */}
          <QuoteSummaryPanel quoteSummary={quoteSummary} />
        </div>
      </div>
    </section>
  );
}
