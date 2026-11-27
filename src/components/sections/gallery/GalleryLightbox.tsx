import { useEffect, useRef, type TouchEvent } from 'react';
import { Check, ChevronLeft, ChevronRight, MessageCircle, Plus, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../../data';
import type { GalleryItem } from '../../../types';
import { buildWhatsAppUrl, isSafeImageSrc } from '../../../utils';
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

  const safeImageUrl = isSafeImageSrc(item.imageUrl);
  const catalogId = item.catalogId;

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
      className="animate-modal-backdrop fixed inset-0 z-50 bg-[#0B0B0D]/92 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div
        key={item.id}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="animate-modal-card bg-[#141418] border-t-2 sm:border-2 border-[#27272F] w-full sm:max-w-2xl rounded-none overflow-hidden max-h-[92dvh] flex flex-col shadow-2xl"
      >
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-[#0B0B0D]">
          <span className="w-10 h-1 rounded-[2px] bg-[#3F3F46]" aria-hidden="true" />
        </div>

        {/* Cabeçalho */}
        <div className="px-4 sm:px-5 py-3.5 bg-[#0B0B0D] border-b border-[#27272F] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-mono px-2 py-0.5 rounded-[2px] bg-[#0EA5E9] text-[#0B0B0D] text-[10px] font-bold uppercase tracking-wider shrink-0">
              {item.category}
            </span>
            <h3
              id="lightbox-title"
              className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#F5F5F4] truncate"
            >
              {item.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-xs font-bold tabular-nums text-[#F97316]">
              {currentIndex + 1}/{totalItems}
            </span>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Fechar visualização"
              className="btn-dark-secondary w-9 h-9 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Corpo */}
        <div className="overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-5">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#0B0B0D] border border-[#27272F] rounded-[2px] overflow-hidden">
            {safeImageUrl ? (
              <img src={safeImageUrl} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <GalleryIllustration visualKey={item.visualKey} />
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 bg-[#0B0B0D] border border-[#27272F] p-3.5 rounded-[2px] text-xs">
            <div>
              <span className="font-mono block text-[#A1A1AA] uppercase tracking-wider text-[10px]">
                Aplicação
              </span>
              <span className="font-semibold text-[#F5F5F4] mt-0.5 block">{item.vehicle}</span>
            </div>
            <div>
              <span className="font-mono block text-[#A1A1AA] uppercase tracking-wider text-[10px]">
                Prazo de referência
              </span>
              <span className="font-mono font-bold tabular-nums text-[#F97316] mt-0.5 block">
                {item.duration}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0EA5E9] mb-2.5">
              Etapas técnicas executadas
            </h4>
            <ul className="space-y-2">
              {item.technicalSteps.map((step) => (
                <li key={step} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E4E4E7]">
                  <Check className="w-4 h-4 text-[#0EA5E9] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Rodapé */}
        <div className="px-4 sm:px-5 pt-3.5 pb-safe bg-[#0B0B0D] border-t border-[#27272F] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="grid grid-cols-2 sm:flex items-center gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="btn-dark-secondary inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider min-h-[44px]"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              <span>Anterior</span>
            </button>
            <button
              type="button"
              onClick={onNext}
              className="btn-dark-secondary inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider min-h-[44px]"
            >
              <span>Próximo</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {catalogId !== undefined && onToggleCart && (
              <button
                type="button"
                onClick={() => onToggleCart(catalogId)}
                className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-[2px] font-mono text-xs font-bold uppercase tracking-wider border min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5E9] ${
                  isInCart
                    ? 'bg-[#0EA5E9] text-[#0B0B0D] border-[#0EA5E9]'
                    : 'btn-dark-secondary'
                }`}
              >
                {isInCart ? (
                  <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                ) : (
                  <Plus className="w-4 h-4 text-[#0EA5E9] shrink-0" aria-hidden="true" />
                )}
                <span>{isInCart ? 'Na Lista de Orçamento' : 'Adicionar à Lista'}</span>
              </button>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dark-primary inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider min-h-[46px]"
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
