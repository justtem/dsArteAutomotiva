import { Truck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../../data';
import type { PeriodPreference } from '../../../types';
import { formatBRL, sanitizeText } from '../../../utils';

const PERIOD_OPTIONS: PeriodPreference[] = ['Manhã', 'Tarde', 'Próximo horário'];

interface SchedulePreferencesProps {
  periodPreference: PeriodPreference;
  onChangePeriod: (period: PeriodPreference) => void;
  includePickup: boolean;
  onChangePickup: (value: boolean) => void;
  vehicleModel: string;
  onChangeVehicleModel: (value: string) => void;
}

export function SchedulePreferences({
  periodPreference,
  onChangePeriod,
  includePickup,
  onChangePickup,
  vehicleModel,
  onChangeVehicleModel,
}: SchedulePreferencesProps) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#29B6F6] to-[#0284C7] text-white text-xs font-bold tabular-nums flex items-center justify-center shadow">
          4
        </span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
          Período, Leva e Traz e identificação (opcional)
        </h3>
      </div>

      <div className="surface-gunmetal rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="block text-xs font-semibold text-[#94A3B8] mb-2">
              Preferência de período
            </span>
            <div
              className="grid grid-cols-3 gap-2"
              role="radiogroup"
              aria-label="Preferência de período"
            >
              {PERIOD_OPTIONS.map((option) => {
                const active = periodPreference === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => onChangePeriod(option)}
                    className={`option-interactive py-2.5 px-2 rounded-xl text-xs font-bold border min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                      active
                        ? 'btn-liquid-coat text-white'
                        : 'bg-[#0B0D12] text-[#CBD5E1] border-white/10 hover:border-[#38BDF8] hover:text-white'
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="vehicle-model-input"
              className="block text-xs font-semibold text-[#94A3B8] mb-2"
            >
              Modelo / cor do veículo (opcional)
            </label>
            <input
              id="vehicle-model-input"
              type="text"
              maxLength={48}
              value={vehicleModel}
              onChange={(e) => onChangeVehicleModel(sanitizeText(e.target.value))}
              placeholder="Ex.: Onix Prata, Corolla Preto"
              className="w-full px-3.5 py-2.5 rounded-xl border border-white/12 bg-[#0B0D12] text-base sm:text-sm text-white placeholder:text-[#64748B] min-h-[46px] focus:outline-none focus:border-[#38BDF8]"
            />
          </div>
        </div>

        {/* Toggle Leva e Traz */}
        <label
          className={`option-interactive flex items-center justify-between gap-4 p-4 rounded-xl border cursor-pointer ${
            includePickup
              ? 'option-selected-glow'
              : 'bg-[#0B0D12] border-white/10 hover:border-[#38BDF8]'
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={includePickup}
              onChange={(e) => onChangePickup(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#29B6F6] cursor-pointer shrink-0"
            />
            <div>
              <span className="flex items-center gap-1.5 text-sm font-bold text-white">
                <Truck className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
                Incluir serviço de Leva e Traz local
              </span>
              <span className="block text-xs text-[#94A3B8] mt-0.5">
                Retirada e devolução agendada em Valença.
              </span>
            </div>
          </div>
          <span className="text-xs font-bold tabular-nums text-[#FB923C] whitespace-nowrap">
            +{formatBRL(BUSINESS_CONFIG.pickupFee)}
          </span>
        </label>
      </div>
    </div>
  );
}
