import { ClipboardCheck, MessageCircle, Navigation } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../data';
import { formatBRL } from '../../utils';

interface MobileBottomBarProps {
  whatsappUrl: string;
  totalPrice: number;
  sizeLabel: string;
  cartCount: number;
  onOpenCartModal: () => void;
}

export function MobileBottomBar({
  whatsappUrl,
  totalPrice,
  sizeLabel,
  cartCount,
  onOpenCartModal,
}: MobileBottomBarProps) {
  return (
    <div className="animate-bar-slide-up md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B0B0D]/98 backdrop-blur-xs border-t-2 border-[#27272F] shadow-[0_-8px_28px_-8px_rgba(0,0,0,0.92)] px-3 pt-2.5 pb-safe">
      <div className="flex items-center gap-2 w-full">
        <a
          href="#resumo-pedido"
          className="btn-dark-secondary flex flex-col justify-center px-3 py-1.5 min-h-[48px] max-w-[130px] shrink-0"
          aria-label={`Ver resumo da pintura: ${formatBRL(totalPrice)} para ${sizeLabel}`}
        >
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA] leading-none truncate">
            {sizeLabel} • OS
          </span>
          <span
            key={totalPrice}
            className="animate-price-flash font-mono text-sm font-bold tabular-nums text-[#0EA5E9] leading-tight mt-1 inline-block origin-left"
          >
            {formatBRL(totalPrice)}
          </span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-dark-primary flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-bold uppercase tracking-wider min-h-[48px] min-w-0"
        >
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="truncate">Orçar Pintura</span>
        </a>

        {cartCount > 0 ? (
          <button
            type="button"
            onClick={onOpenCartModal}
            aria-label={`Ver lista de orçamento com ${cartCount} itens`}
            className="btn-dark-secondary relative inline-flex items-center justify-center w-12 h-[48px] shrink-0"
          >
            <ClipboardCheck className="w-5 h-5 text-[#F97316]" aria-hidden="true" />
            <span
              key={cartCount}
              className="animate-badge-pop font-mono absolute -top-1.5 -right-1 min-w-5 h-5 px-1 rounded-[2px] bg-[#F97316] text-[#0B0B0D] text-[10px] font-bold flex items-center justify-center"
            >
              {cartCount}
            </span>
          </button>
        ) : (
          <a
            href={BUSINESS_CONFIG.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir rota no Google Maps"
            className="btn-dark-secondary inline-flex items-center justify-center w-12 h-[48px] shrink-0"
          >
            <Navigation className="w-4.5 h-4.5 text-[#0EA5E9]" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
