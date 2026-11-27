import { useEffect, useRef } from 'react';
import { ClipboardList, MessageCircle, ShieldCheck, Trash2, X } from 'lucide-react';
import type { CustomCatalogService } from '../../types';

interface QuoteCartModalProps {
  isOpen: boolean;
  items: CustomCatalogService[];
  whatsappUrl: string;
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onClear: () => void;
  onOpenPrivacyNotice?: () => void;
}

export function QuoteCartModal({
  isOpen,
  items,
  whatsappUrl,
  onClose,
  onRemoveItem,
  onClear,
  onOpenPrivacyNotice,
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
      className="animate-modal-backdrop fixed inset-0 z-50 bg-[#0B0B0D]/90 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="animate-modal-card bg-[#F8F6F2] text-[#111113] border-t-2 sm:border-2 border-[#111113] sm:shadow-[8px_8px_0px_#0EA5E9] w-full sm:max-w-lg rounded-none overflow-hidden max-h-[88dvh] flex flex-col">
        {/* Cabeçalho invertido estilo talão de oficina */}
        <div className="px-5 py-4 bg-[#111113] text-[#F8F6F2] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ClipboardList className="w-5 h-5 text-[#0EA5E9]" aria-hidden="true" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F97316] block">
                Pedido Rápido // DS Arte
              </span>
              <h3
                id="quote-cart-modal-title"
                className="font-display text-2xl font-extrabold uppercase tracking-wide text-[#F8F6F2] leading-none"
              >
                Sua Lista de Orçamento
              </h3>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar lista de orçamento"
            className="btn-dark-secondary w-9 h-9 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Corpo */}
        <div className="p-5 overflow-y-auto flex-1">
          {items.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-[#111113]/25 p-6 bg-[#EFECE6]">
              <ClipboardList className="w-9 h-9 text-[#52525B] mx-auto mb-3" aria-hidden="true" />
              <p className="text-sm font-bold text-[#111113]">Sua lista de orçamento está vazia.</p>
              <p className="text-xs text-[#3F3F46] mt-1">
                Toque em &ldquo;Adicionar ao Orçamento&rdquo; nos projetos da Galeria & Pinturas
                para montar seu pedido.
              </p>
            </div>
          ) : (
            <div className="divide-y-2 divide-[#111113]/15 border-y-2 border-[#111113]">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 py-3.5 px-2 bg-[#F8F6F2]"
                >
                  <div className="min-w-0">
                    <span className="font-mono text-[11px] font-bold text-[#C2410C] mr-1.5">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <h4 className="inline text-sm font-bold text-[#111113]">{item.title}</h4>
                    <span className="font-mono text-[11px] text-[#52525B] block mt-0.5">
                      Peça ref.: {item.examplePiece}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remover ${item.title} da lista`}
                    title="Remover item"
                    className="p-2 rounded-[2px] text-[#52525B] hover:text-red-700 hover:bg-[#E4E0D8] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#111113]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé com aviso contextual e safe-area iOS */}
        <div className="px-5 pt-3.5 pb-safe bg-[#EFECE6] border-t-2 border-[#111113] space-y-2.5">
          <div className="flex flex-col sm:flex-row gap-2.5">
            {items.length > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="btn-ink-outline px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider min-h-[46px]"
              >
                Limpar Lista
              </button>
            )}

            {items.length > 0 ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyan-stamp flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Enviar Lista no WhatsApp</span>
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[2px] bg-[#E4E0D8] border-2 border-[#111113]/25 text-[#52525B] text-xs sm:text-sm font-bold uppercase tracking-wider cursor-not-allowed min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Enviar Lista no WhatsApp</span>
              </button>
            )}
          </div>

          <p className="text-[11px] text-[#52525B] leading-snug flex items-start gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0369A1] shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Redirecionamento externo ao WhatsApp (Meta) para atendimento de orçamento.{' '}
              {onOpenPrivacyNotice && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenPrivacyNotice();
                  }}
                  className="underline font-semibold text-[#0369A1] hover:text-[#111113] focus-visible:outline-2 focus-visible:outline-[#0369A1]"
                >
                  Aviso de Privacidade
                </button>
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
