import { VEHICLE_SIZES } from '../../../data';
import type { VehicleSizeId } from '../../../types';
import { VehicleSilhouette } from '../../ui';

interface VehicleSizeSelectorProps {
  vehicleSize: VehicleSizeId;
  onSelectSize: (size: VehicleSizeId) => void;
}

export function VehicleSizeSelector({ vehicleSize, onSelectSize }: VehicleSizeSelectorProps) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#29B6F6] to-[#0284C7] text-white text-xs font-bold tabular-nums flex items-center justify-center shadow">
          1
        </span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">Porte do veículo</h3>
      </div>

      <div
        role="radiogroup"
        aria-label="Porte do veículo"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {VEHICLE_SIZES.map((size) => {
          const isSelected = vehicleSize === size.id;
          return (
            <button
              key={size.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectSize(size.id)}
              className={`option-interactive group p-4 rounded-2xl border text-left min-h-[94px] flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                isSelected
                  ? 'option-selected-glow text-white'
                  : 'bg-[#141821] text-[#CBD5E1] border-white/10 hover:border-[#38BDF8] hover:text-white'
              }`}
            >
              <VehicleSilhouette
                type={size.id}
                className={`w-11 h-6 transition-transform duration-300 ${
                  isSelected
                    ? 'text-[#38BDF8] scale-112 -translate-y-0.5'
                    : 'text-[#94A3B8] group-hover:text-[#CBD5E1] group-hover:translate-x-0.5'
                }`}
              />
              <div className="mt-2">
                <span className="font-display italic block text-base font-bold leading-tight text-white">
                  {size.label}
                </span>
                <span className="block text-[11px] text-[#94A3B8] mt-0.5">{size.note}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
