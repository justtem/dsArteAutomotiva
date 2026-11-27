import { AlertTriangle, Truck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../../data';
import type { PeriodPreference } from '../../../types';
import { containsSensitiveIdentifier, formatBRL, sanitizeText } from '../../../utils';

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
  const hasSensitivePattern = containsSensitiveIdentifier(vehicleModel);

  return (
    <div className="border-t-2 border-[#111113] pt-5">
      <div className="flex items-baseline gap-2.5 mb-4">
        <span className="font-mono text-sm font-bold text-[#C2410C]">04 //</span>
        <h3 className="font-display text-2xl sm:text-[26px] font-extrabold uppercase tracking-tight leading-none text-[#111113]">
          Período, Leva e Traz e peça/modelo
        </h3>
      </div>

      <div className="bg-[#F8F6F2] border-2 border-[#111113] p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="font-mono block text-[11px] font-bold uppercase tracking-wider text-[#52525B] mb-2">
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
                    className={`py-2.5 px-2 rounded-[2px] text-xs font-bold border-2 min-h-[44px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1] ${
                      active
                        ? 'bg-[#111113] text-[#F8F6F2] border-[#111113]'
                        : 'bg-[#EFECE6] text-[#111113] border-[#111113]/30 hover:border-[#111113]'
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
              className="font-mono block text-[11px] font-bold uppercase tracking-wider text-[#52525B] mb-2"
            >
              Peça, capacete ou modelo (opcional)
            </label>
            <input
              id="vehicle-model-input"
              type="text"
              maxLength={48}
              value={vehicleModel}
              aria-describedby="vehicle-model-privacy-hint"
              onChange={(e) => onChangeVehicleModel(sanitizeText(e.target.value))}
              placeholder="Ex.: Capacete Cross, Rodas Aro 17, Tanque CG"
              className="w-full px-3.5 py-2.5 rounded-[2px] border-2 border-[#111113] bg-white text-base sm:text-sm text-[#111113] placeholder:text-[#52525B] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
            />
            <p id="vehicle-model-privacy-hint" className="text-[11px] text-[#52525B] mt-1.5">
              Informe apenas peça ou modelo. Não digite placa, CPF ou endereço residencial aqui.
            </p>

            {hasSensitivePattern && (
              <p
                role="status"
                aria-live="polite"
                className="mt-2 p-2 bg-[#FFF7ED] border border-[#C2410C] text-[11px] text-[#7C2D12] font-medium flex items-start gap-1.5"
              >
                <AlertTriangle
                  className="w-3.5 h-3.5 text-[#C2410C] shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>
                  Para sua privacidade, padrões de placa, CPF, telefone ou e-mail são omitidos
                  automaticamente do link de mensagem do WhatsApp.
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Toggle Leva e Traz */}
        <label
          className={`flex items-center justify-between gap-4 p-4 rounded-[2px] border-2 cursor-pointer transition-all ${
            includePickup
              ? 'bg-white border-[#111113] shadow-[0_3px_0px_#111113] sm:shadow-[3px_3px_0px_#111113]'
              : 'bg-[#EFECE6] border-[#111113]/30 hover:border-[#111113]'
          }`}
        >
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={includePickup}
              onChange={(e) => onChangePickup(e.target.checked)}
              className="mt-1 w-4 h-4 accent-[#111113] cursor-pointer shrink-0"
            />
            <div>
              <span className="flex items-center gap-1.5 text-sm font-bold text-[#111113]">
                <Truck className="w-4 h-4 text-[#0369A1]" aria-hidden="true" />
                Incluir serviço de Leva e Traz local
              </span>
              <span className="block text-xs text-[#3F3F46] mt-0.5">
                Retirada e devolução agendada de peças ou veículos em Valença.
              </span>
            </div>
          </div>
          <span className="font-mono text-xs font-bold tabular-nums text-[#C2410C] whitespace-nowrap">
            +{formatBRL(BUSINESS_CONFIG.pickupFee)}
          </span>
        </label>
      </div>
    </div>
  );
}
