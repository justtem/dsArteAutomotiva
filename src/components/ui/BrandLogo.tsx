import { BUSINESS_CONFIG } from '../../data';

export function BrandLogo() {
  return (
    <div className="flex items-center gap-3 select-none group">
      <img
        src={BUSINESS_CONFIG.logoUrl}
        alt={`Logo ${BUSINESS_CONFIG.name}`}
        width={42}
        height={42}
        className="w-10.5 h-10.5 rounded-full object-cover border border-[#3F3F46] bg-[#141418] shrink-0 transition-colors duration-200 group-hover:border-[#0EA5E9]"
      />
      <div className="leading-none">
        <span className="font-display block text-2xl sm:text-[28px] font-extrabold uppercase tracking-wide text-[#F5F5F4] leading-[0.9]">
          DS <span className="text-[#0EA5E9]">ARTE</span>
        </span>
        <span className="font-mono block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A1A1AA] mt-1">
          Automotiva • <span className="text-[#F97316]">{BUSINESS_CONFIG.ownerName}</span>
        </span>
      </div>
    </div>
  );
}
