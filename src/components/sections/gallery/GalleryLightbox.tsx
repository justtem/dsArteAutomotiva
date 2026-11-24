import { useEffect, useRef, type TouchEvent } from 'react';
import { Check, ChevronLeft, ChevronRight, MessageCircle, Plus, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../../data';
import type { GalleryItem } from '../../../types';
import { buildWhatsAppUrl } from '../../../utils';
import { GalleryIllustration } from '../../illustrations';

interface GalleryLightboxProps {
  item: GalleryItem;
  currentIndex: number;
  totalItems: number;
  isInCart: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleCart?: (catalogId: number) => void;
}

export function GalleryLightbox({
  item,
  currentIndex,
  totalItems,
  isInCart,
  onClose,
  onPrev,
  onNext,
  onToggleCart,
}: GalleryLightboxProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const diff = touchStartX.current - endX;
    touchStartX.current = null;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onNext();
      else onPrev();
    }
  };

  const whatsappUrl = buildWhatsAppUrl(
    BUSINESS_CONFIG.whatsappE164,
    [
      `Olá Diogo! Vi o trabalho "${item.title}" (${item.category}) na galeria da ${BUSINESS_CONFIG.name}.`,
      'Gostaria de saber valores e horários disponíveis.',
    ].join('\n')
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="animate-modal-backdrop fixed inset-0 z-50 bg-[#07090C]/90 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div
        key={item.id}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="animate-modal-card surface-gunmetal w-full sm:max-w-2xl rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[92dvh] flex flex-col shadow-2xl"
      >
        {/* Indicador de folha deslizante no celular */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-[#0B0D12]">
          <span className="w-11 h-1.5 rounded-full bg-white/20" aria-hidden="true" />
        </div>

        {/* Cabeçalho do modal */}
        <div className="px-4 sm:px-5 py-3 bg-[#0B0D12] border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#0284C7] to-[#29B6F6] text-white text-[10px] sm:text-[11px] font-bold uppercase shrink-0">
              {item.category}
            </span>
            <h3
              id="lightbox-title"
              className="font-display italic text-lg sm:text-xl font-bold text-white truncate"
            >
              {item.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono tabular-nums text-[#FB923C]">
              {currentIndex + 1}/{totalItems}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Fechar visualização"
              className="btn-chrome-dark w-9 h-9 rounded-xl text-white flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Corpo do modal */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#0B0D12] border border-white/10 rounded-xl overflow-hidden">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <>
                <GalleryIllustration visualKey={item.visualKey} />
                <span className="absolute bottom-2.5 left-2.5 right-2.5 sm:right-auto px-2.5 py-1 rounded-full bg-[#0B0D12]/90 border border-white/10 text-[10px] sm:text-[11px] text-[#94A3B8] truncate text-center sm:text-left">
                  Deslize para o lado para navegar • Espaço pronto para foto real
                </span>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 bg-[#0B0D12] border border-white/10 p-3.5 rounded-xl text-xs">
            <div>
              <span className="block text-[#94A3B8] uppercase tracking-wider text-[10px]">
                Aplicação
              </span>
              <span className="font-semibold text-white mt-0.5 block">{item.vehicle}</span>
            </div>
            <div>
              <span className="block text-[#94A3B8] uppercase tracking-wider text-[10px]">
                Tempo médio
              </span>
              <span className="font-bold tabular-nums text-[#FB923C] mt-0.5 block">
                {item.duration}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#38BDF8] mb-2.5">
              Etapas técnicas executadas
            </h4>
            <ul className="space-y-2">
              {item.technicalSteps.map((step) => (
                <li key={step} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1]">
                  <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rodapé do modal com safe-area no iPhone */}
        <div className="px-4 sm:px-5 pt-3.5 pb-safe bg-[#0B0D12] border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="grid grid-cols-2 sm:flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="btn-chrome-dark inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white min-h-[44px]"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              <span>Anterior</span>
            </button>
            <button
              type="button"
              onClick={onNext}
              className="btn-chrome-dark inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-white min-h-[44px]"
            >
              <span>Próximo</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {item.catalogId && onToggleCart && (
              <button
                type="button"
                onClick={() => onToggleCart(item.catalogId!)}
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border min-h-[44px] ${
                  isInCart ? 'option-selected-glow text-[#38BDF8]' : 'btn-chrome-dark text-white'
                }`}
              >
                {isInCart ? (
                  <Check className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
                ) : (
                  <Plus className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
                )}
                <span>{isInCart ? 'Na Lista de Orçamento' : '+ Adicionar à Lista'}</span>
              </button>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-liquid-coat btn-chrome-shine inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold min-h-[46px]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Consultar no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
