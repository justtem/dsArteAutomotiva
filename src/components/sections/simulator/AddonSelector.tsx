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
    <div>
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#29B6F6] to-[#0284C7] text-white text-xs font-bold tabular-nums flex items-center justify-center shadow">
          3
        </span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
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
              className={`option-interactive flex items-start gap-3 p-4 rounded-2xl border cursor-pointer ${
                checked
                  ? 'option-selected-glow'
                  : 'bg-[#141821] border-white/10 hover:border-[#38BDF8]'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleAddon(addon.id)}
                className="mt-1 w-4 h-4 accent-[#29B6F6] cursor-pointer shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-bold text-white leading-snug">{addon.name}</span>
                  <span className="text-xs font-bold tabular-nums text-[#FB923C] whitespace-nowrap">
                    +{formatBRL(price)}
                  </span>
                </div>
                <span className="block text-xs text-[#94A3B8] mt-0.5">{addon.detail}</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
