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
    <div>
      <div className="flex items-center gap-2.5 mb-3.5">
        <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#29B6F6] to-[#0284C7] text-white text-xs font-bold tabular-nums flex items-center justify-center shadow">
          2
        </span>
        <h3 className="text-sm font-bold uppercase tracking-wider text-white">
          Modalidade de pintura & estética
        </h3>
      </div>

      <div
        role="radiogroup"
        aria-label="Modalidades de pintura e estética"
        className="surface-gunmetal rounded-2xl divide-y divide-white/10 overflow-hidden"
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
              className={`transition-all duration-200 border-l-4 ${
                isSelected
                  ? 'bg-[#1A2232]/85 border-l-[#29B6F6]'
                  : 'bg-transparent border-l-transparent hover:bg-white/[0.03]'
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
                      className="mt-1 w-4 h-4 accent-[#29B6F6] cursor-pointer shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display italic text-lg font-bold text-white">
                          {pkg.name}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                            isPopular
                              ? 'bg-[#FB923C]/15 text-[#FB923C] border-[#FB923C]/45'
                              : isSelected
                                ? 'bg-[#29B6F6]/20 text-[#38BDF8] border-[#38BDF8]/50'
                                : 'bg-[#0B0D12] text-[#94A3B8] border-white/10'
                          }`}
                        >
                          {pkg.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#CBD5E1] mt-1 leading-relaxed">
                        {pkg.description}
                      </p>
                    </div>
                  </label>

                  <div className="text-right shrink-0">
                    <span className="block font-display italic text-2xl font-bold tabular-nums text-white leading-none">
                      {formatBRL(price)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs tabular-nums text-[#94A3B8] mt-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#38BDF8]" aria-hidden="true" />
                      {formatDuration(duration)}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pl-7">
                  <button
                    type="button"
                    onClick={() => setExpandedPackageId(isExpanded ? null : pkg.id)}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] hover:underline py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
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
                    <ul className="animate-panel-switch mt-2.5 pt-2.5 border-t border-white/10 space-y-1.5">
                      {pkg.included.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
                          <Check
                            className="w-3.5 h-3.5 text-[#38BDF8] shrink-0 mt-0.5"
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
