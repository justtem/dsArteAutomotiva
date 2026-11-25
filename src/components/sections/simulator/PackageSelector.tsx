import { useState } from 'react';
import { Check, ChevronDown, Clock } from 'lucide-react';
import { SERVICE_PACKAGES } from '../../../data';
import type { ServicePackageId, VehicleSizeId } from '../../../types';
import { formatBRL, formatDuration } from '../../../utils';

interface PackageSelectorProps {
  vehicleSize: VehicleSizeId;
  selectedPackageId: ServicePackageId;
  onSelectPackage: (id: ServicePackageId) => void;
}

export function PackageSelector({
  vehicleSize,
  selectedPackageId,
  onSelectPackage,
}: PackageSelectorProps) {
  const [expandedPackageId, setExpandedPackageId] = useState<ServicePackageId | null>(
    SERVICE_PACKAGES[1].id
  );

  return (
    <div className="border-t-2 border-[#111113] pt-5">
      <div className="flex items-baseline gap-2.5 mb-4">
        <span className="font-mono text-sm font-bold text-[#C2410C]">02 //</span>
        <h3 className="font-display text-2xl sm:text-[26px] font-extrabold uppercase tracking-tight leading-none text-[#111113]">
          Modalidade de pintura & estética
        </h3>
      </div>

      <div
        role="radiogroup"
        aria-label="Modalidades de pintura e estética"
        className="border-2 border-[#111113] bg-[#F8F6F2] divide-y-2 divide-[#111113]"
      >
        {SERVICE_PACKAGES.map((pkg) => {
          const isSelected = selectedPackageId === pkg.id;
          const isExpanded = expandedPackageId === pkg.id;
          const price = pkg.prices[vehicleSize];
          const duration = pkg.durationMinutes[vehicleSize];
          const isPopular = pkg.id === 'hidrografica-wtp';

          return (
            <div
              key={pkg.id}
              className={`transition-colors ${
                isSelected
                  ? 'bg-white border-l-[6px] border-l-[#0EA5E9]'
                  : 'bg-[#F8F6F2] hover:bg-[#EFECE6]/70'
              }`}
            >
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <label className="flex items-start gap-3 cursor-pointer flex-1 min-w-0">
                    <input
                      type="radio"
                      name="paint-package"
                      checked={isSelected}
                      onChange={() => onSelectPackage(pkg.id)}
                      className="mt-1.5 w-4 h-4 accent-[#111113] cursor-pointer shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight leading-tight text-[#111113]">
                          {pkg.name}
                        </span>
                        <span
                          className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${
                            isPopular
                              ? 'bg-[#F97316] text-[#111113] border-[#111113]'
                              : isSelected
                                ? 'bg-[#111113] text-[#F8F6F2] border-[#111113]'
                                : 'bg-[#EFECE6] text-[#27272A] border-[#111113]/40'
                          }`}
                        >
                          {pkg.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#27272A] mt-1.5 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>
                  </label>

                  <div className="text-right shrink-0">
                    <span className="block font-mono text-lg sm:text-xl font-bold tabular-nums text-[#111113] leading-none">
                      {formatBRL(price)}
                    </span>
                    <span className="font-mono inline-flex items-center gap-1 text-[11px] font-semibold tabular-nums text-[#C2410C] mt-1.5">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {formatDuration(duration)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pl-7">
                  <button
                    type="button"
                    onClick={() => setExpandedPackageId(isExpanded ? null : pkg.id)}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0369A1] hover:underline py-1 rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0369A1]"
                  >
                    <span>
                      {isExpanded
                        ? 'Ocultar itens inclusos'
                        : `Ver itens inclusos (${pkg.included.length})`}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isExpanded && (
                    <ul className="animate-panel-switch mt-2.5 pt-3 border-t border-dashed border-[#111113]/35 space-y-1.5">
                      {pkg.included.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-[#111113]">
                          <Check
                            className="w-3.5 h-3.5 text-[#0369A1] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
