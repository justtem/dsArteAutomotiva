import { SERVICE_ADDONS } from '../../../data';
import type { ServiceAddonId, VehicleSizeId } from '../../../types';
import { formatBRL, getAddonPrice } from '../../../utils';

interface AddonSelectorProps {
  vehicleSize: VehicleSizeId;
  selectedAddonIds: ServiceAddonId[];
  onToggleAddon: (id: ServiceAddonId) => void;
}

export function AddonSelector({
  vehicleSize,
  selectedAddonIds,
  onToggleAddon,
}: AddonSelectorProps) {
  return (
    <div className="border-t-2 border-[#111113] pt-5">
      <div className="flex items-baseline gap-2.5 mb-4">
        <span className="font-mono text-sm font-bold text-[#C2410C]">03 //</span>
        <h3 className="font-display text-2xl sm:text-[26px] font-extrabold uppercase tracking-tight leading-none text-[#111113]">
          Serviços adicionais (opcional)
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SERVICE_ADDONS.map((addon) => {
          const checked = selectedAddonIds.includes(addon.id);
          const price = getAddonPrice(addon, vehicleSize);

          return (
            <label
              key={addon.id}
              className={`flex items-start gap-3 p-4 rounded-[2px] cursor-pointer transition-all active:scale-[0.98] ${
                checked
                  ? 'bg-white border-2 border-[#111113] shadow-[0_3px_0px_#111113] sm:shadow-[3px_3px_0px_#111113]'
                  : 'bg-[#F8F6F2] border-2 border-[#111113]/25 hover:border-[#111113]'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleAddon(addon.id)}
                className="mt-1 w-4 h-4 accent-[#111113] cursor-pointer shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-bold text-[#111113] leading-snug">
                    {addon.name}
                  </span>
                  <span className="font-mono text-xs font-bold tabular-nums text-[#C2410C] whitespace-nowrap">
                    +{formatBRL(price)}
                  </span>
                </div>
                <span className="block text-xs text-[#3F3F46] mt-1 leading-snug">
                  {addon.detail}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
