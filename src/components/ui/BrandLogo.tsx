import { BUSINESS_CONFIG } from '../../data';

export function BrandLogo() {
  return (
    <div className="flex items-center gap-3 select-none group">
      <div className="relative shrink-0">
        <div
          aria-hidden="true"
          className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#29B6F6] via-[#0284C7] to-[#FB923C] opacity-70 blur-[4px] group-hover:opacity-100 transition-opacity"
        />
        <img
          src={BUSINESS_CONFIG.logoUrl}
          alt={`Logo ${BUSINESS_CONFIG.name}`}
          width={44}
          height={44}
          className="relative w-11 h-11 rounded-full object-cover border-2 border-[#E2E8F0]/80 shrink-0 transition-transform duration-300 group-hover:scale-108 group-hover:rotate-[-4deg]"
        />
      </div>
      <div className="leading-none">
        <span className="font-display italic block text-xl sm:text-2xl font-bold tracking-wider text-white">
          DS <span className="text-hydro-dip pr-0.5">ARTE</span>
        </span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#CBD5E1] mt-0.5">
          Automotiva • <span className="text-[#FB923C]">{BUSINESS_CONFIG.ownerName}</span>
        </span>
      </div>
    </div>
  );
}
