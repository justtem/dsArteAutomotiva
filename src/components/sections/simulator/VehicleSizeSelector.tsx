import { VEHICLE_SIZES } from '../../../data';
import type { VehicleSizeId } from '../../../types';
import { VehicleSilhouette } from '../../ui';

interface VehicleSizeSelectorProps {
  vehicleSize: VehicleSizeId;
  onSelectSize: (size: VehicleSizeId) => void;
}

export function VehicleSizeSelector({ vehicleSize, onSelectSize }: VehicleSizeSelectorProps) {
  return (
    <div className="border-t-2 border-[#111113] pt-5">
      <div className="flex items-baseline gap-2.5 mb-4">
        <span className="font-mono text-sm font-bold text-[#C2410C]">01 //</span>
        <h3 className="font-display text-2xl sm:text-[26px] font-extrabold uppercase tracking-tight leading-none text-[#111113]">
          Categoria ou porte do veículo
        </h3>
      </div>

      <div
        role="radiogroup"
        aria-label="Categoria ou porte do veículo"
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
              className={`group p-4 rounded-[2px] text-left min-h-[100px] flex flex-col justify-between transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1] ${
                isSelected
                  ? 'bg-[#111113] text-[#F8F6F2] border-2 border-[#111113] shadow-[3px_3px_0px_#0EA5E9]'
                  : 'bg-[#F8F6F2] text-[#111113] border-2 border-[#111113]/25 hover:border-[#111113]'
              }`}
            >
              <VehicleSilhouette
                type={size.id}
                className={`w-11 h-6 transition-colors ${
                  isSelected ? 'text-[#0EA5E9]' : 'text-[#3F3F46] group-hover:text-[#111113]'
                }`}
              />
              <div className="mt-2.5">
                <span
                  className={`font-display block text-xl font-extrabold uppercase tracking-wide leading-none ${
                    isSelected ? 'text-[#F8F6F2]' : 'text-[#111113]'
                  }`}
                >
                  {size.label}
                </span>
                <span
                  className={`block text-[11px] mt-1 leading-snug ${
                    isSelected ? 'text-[#E4E4E7]' : 'text-[#3F3F46]'
                  }`}
                >
                  {size.note}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
