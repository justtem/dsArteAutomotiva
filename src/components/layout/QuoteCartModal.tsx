import { useEffect, useRef } from 'react';
import { ClipboardList, MessageCircle, Trash2, X } from 'lucide-react';
import type { CustomCatalogService } from '../../types';

interface QuoteCartModalProps {
  isOpen: boolean;
  items: CustomCatalogService[];
  whatsappUrl: string;
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onClear: () => void;
}

export function QuoteCartModal({
  isOpen,
  items,
  whatsappUrl,
  onClose,
  onRemoveItem,
  onClear,
}: QuoteCartModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-cart-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="animate-modal-backdrop fixed inset-0 z-50 bg-[#07090C]/90 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="animate-modal-card surface-gunmetal w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[88dvh] flex flex-col shadow-2xl">
        {/* Indicador bottom-sheet no celular */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-[#0B0D12]">
          <span className="w-11 h-1.5 rounded-full bg-white/20" aria-hidden="true" />
        </div>

        {/* Cabeçalho */}
        <div className="px-5 py-3.5 bg-[#0B0D12] border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ClipboardList className="w-5 h-5 text-[#38BDF8]" aria-hidden="true" />
            <h3
              id="quote-cart-modal-title"
              className="font-display italic text-xl font-bold text-white tracking-wide"
            >
              Sua Lista de Orçamento
            </h3>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar lista de orçamento"
            className="btn-chrome-dark w-9 h-9 rounded-xl text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corpo */}
        <div className="p-5 overflow-y-auto flex-1">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ClipboardList className="w-9 h-9 text-[#64748B] mx-auto mb-3" aria-hidden="true" />
              <p className="text-sm font-bold text-white">Sua lista de orçamento está vazia.</p>
              <p className="text-xs text-[#94A3B8] mt-1">
                Toque em &ldquo;+ Adicionar ao Orçamento&rdquo; nos cards da Galeria & Custom para
                montar seu pedido.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#0B0D12] border border-white/10"
                >
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{item.title}</h4>
                    <span className="text-xs text-[#FB923C] block mt-0.5">
                      Exemplo: {item.examplePiece}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remover ${item.title} da lista`}
                    title="Remover item"
                    className="p-2.5 rounded-xl text-[#94A3B8] hover:text-red-400 active:bg-white/5 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé com safe-area iOS */}
        <div className="px-5 pt-3.5 pb-safe bg-[#0B0D12] border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
          {items.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="btn-chrome-dark px-4 py-3 rounded-xl text-[#CBD5E1] hover:text-white text-xs sm:text-sm font-bold min-h-[46px]"
            >
              Limpar Lista
            </button>
          )}

          {items.length > 0 ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-liquid-coat btn-chrome-shine flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white text-xs sm:text-sm font-bold min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Enviar Lista no WhatsApp</span>
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0284C7]/35 text-white/55 text-xs sm:text-sm font-bold cursor-not-allowed min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Enviar Lista no WhatsApp</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
