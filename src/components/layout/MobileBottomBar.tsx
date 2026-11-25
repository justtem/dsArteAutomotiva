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
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B0D12]/95 backdrop-blur-xl border-t border-white/15 shadow-[0_-8px_30px_-8px_rgba(0,0,0,0.85)] px-3 pt-2.5 pb-safe">
      <div className="flex items-center gap-2 w-full">
        {/* Resumo ao vivo da simulação (tocar rola até o Resumo do Pedido) */}
        <a
          href="#resumo-pedido"
          className="btn-chrome-dark flex flex-col justify-center px-3 py-1.5 rounded-xl min-h-[48px] max-w-[126px] shrink-0"
          aria-label={`Ver resumo da pintura: ${formatBRL(totalPrice)} para ${sizeLabel}`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] leading-none truncate">
            {sizeLabel} • Ver
          </span>
          <span className="font-display italic text-base font-bold tabular-nums text-[#38BDF8] leading-tight mt-0.5">
            {formatBRL(totalPrice)}
          </span>
        </a>

        {/* CTA Principal WhatsApp com brilho especular */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-liquid-coat btn-chrome-shine flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-white text-xs font-bold min-h-[48px] min-w-0"
        >
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="truncate">Orçar Pintura</span>
        </a>

        {/* Atalho de Lista de Orçamento (quando houver itens) ou Rota GPS */}
        {cartCount > 0 ? (
          <button
            type="button"
            onClick={onOpenCartModal}
            aria-label={`Ver lista de orçamento com ${cartCount} itens`}
            className="btn-chrome-dark relative inline-flex items-center justify-center w-12 h-[48px] rounded-xl text-white shrink-0"
          >
            <ClipboardCheck className="w-5 h-5 text-[#FB923C]" aria-hidden="true" />
            <span
              key={cartCount}
              className="animate-badge-pop absolute -top-1.5 -right-1 min-w-5 h-5 px-1 rounded-full bg-gradient-to-r from-[#FB923C] to-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center"
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
            className="btn-chrome-dark inline-flex items-center justify-center w-12 h-[48px] rounded-xl text-white shrink-0"
          >
            <Navigation className="w-4.5 h-4.5 text-[#38BDF8]" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
