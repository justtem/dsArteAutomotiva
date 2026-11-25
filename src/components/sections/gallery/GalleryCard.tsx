import { Check, Clock, Eye, Plus } from 'lucide-react';
import type { GalleryItem } from '../../../types';
import { GalleryIllustration } from '../../illustrations';

interface GalleryCardProps {
  item: GalleryItem;
  indexNumber: string;
  variant?: 'standard' | 'panorama';
  isInCart: boolean;
  onOpen: (triggerEl: HTMLButtonElement) => void;
  onToggleCart?: (catalogId: number) => void;
}

export function GalleryCard({
  item,
  indexNumber,
  variant = 'standard',
  isInCart,
  onOpen,
  onToggleCart,
}: GalleryCardProps) {
  const isFlameCategory =
    item.category === 'Candy & Especiais' || item.category === 'Aerografia & Custom';

  if (variant === 'panorama') {
    return (
      <article className="group bg-[#141418] border border-[#27272F] hover:border-[#0EA5E9] rounded-[2px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-colors">
        <button
          type="button"
          onClick={(e) => onOpen(e.currentTarget)}
          className="lg:col-span-7 relative w-full aspect-[16/10] lg:aspect-auto lg:min-h-[320px] bg-[#0B0B0D] overflow-hidden border-b lg:border-b-0 lg:border-r border-[#27272F] text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0EA5E9]"
        >
          <div className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-[1.03]">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <GalleryIllustration visualKey={item.visualKey} />
            )}
          </div>
          <span
            className={`font-mono absolute top-3 left-3 px-2.5 py-1 rounded-[2px] bg-[#0B0B0D]/92 border text-[10px] font-bold uppercase tracking-wider ${
              isFlameCategory
                ? 'border-[#F97316]/60 text-[#F97316]'
                : 'border-[#27272F] text-[#0EA5E9]'
            }`}
          >
            {indexNumber} // {item.category}
          </span>
          <span className="font-mono absolute top-3 right-3 px-2.5 py-1 rounded-[2px] bg-[#0B0B0D]/92 border border-[#27272F] group-hover:border-[#0EA5E9] group-hover:bg-[#0EA5E9] group-hover:text-[#0B0B0D] text-[10px] font-bold uppercase tracking-wider text-[#F5F5F4] inline-flex items-center gap-1.5 transition-colors">
            <Eye className="w-3.5 h-3.5 text-[#0EA5E9] group-hover:text-[#0B0B0D]" aria-hidden="true" />
            <span>Inspecionar</span>
          </span>
        </button>

        <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between gap-5">
          <div>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#F97316] block mb-2">
              Projeto em Destaque // {item.vehicle}
            </span>
            <button
              type="button"
              onClick={(e) => onOpen(e.currentTarget)}
              className="text-left focus-visible:outline-2 focus-visible:outline-[#0EA5E9]"
            >
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-[0.95] text-[#F5F5F4] group-hover:text-[#0EA5E9] transition-colors">
                {item.title}
              </h3>
            </button>
            <p className="text-xs sm:text-sm text-[#A1A1AA] mt-3 leading-relaxed">
              {item.processSummary}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#27272F]">
            <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
              <span>Prazo de referência</span>
              <span className="font-mono inline-flex items-center gap-1.5 font-bold tabular-nums text-[#F97316]">
                <Clock className="w-3.5 h-3.5 text-[#0EA5E9]" aria-hidden="true" />
                {item.duration}
              </span>
            </div>

            {item.catalogId && onToggleCart && (
              <button
                type="button"
                onClick={() => onToggleCart(item.catalogId!)}
                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[2px] font-mono text-xs font-bold uppercase tracking-wider border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5E9] ${
                  isInCart
                    ? 'bg-[#0EA5E9] text-[#0B0B0D] border-[#0EA5E9]'
                    : 'bg-[#0B0B0D] border-[#27272F] text-[#F5F5F4] hover:border-[#0EA5E9]'
                }`}
              >
                {isInCart ? (
                  <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                ) : (
                  <Plus className="w-4 h-4 text-[#0EA5E9] shrink-0" aria-hidden="true" />
                )}
                <span>{isInCart ? 'Adicionado à Lista' : 'Adicionar ao Orçamento'}</span>
              </button>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-[#141418] border border-[#27272F] hover:border-[#52525B] rounded-[2px] overflow-hidden flex flex-col h-full transition-all active:scale-[0.99]">
      <button
        type="button"
        onClick={(e) => onOpen(e.currentTarget)}
        className="text-left flex flex-col flex-1 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0EA5E9]"
      >
        {/* Altura padronizada por breakpoint para alinhar títulos e rodapés na mesma fileira (7+5 / 5+7 / 6+6) */}
        <div className="relative w-full h-[220px] sm:h-[250px] lg:h-[285px] xl:h-[310px] shrink-0 bg-[#0B0B0D] overflow-hidden border-b border-[#27272F]">
          <div className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-[1.03]">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            ) : (
              <GalleryIllustration visualKey={item.visualKey} />
            )}
          </div>
          <span
            className={`font-mono absolute top-3 left-3 px-2.5 py-1 rounded-[2px] bg-[#0B0B0D]/92 border text-[10px] font-bold uppercase tracking-wider ${
              isFlameCategory
                ? 'border-[#F97316]/60 text-[#F97316]'
                : 'border-[#27272F] text-[#0EA5E9]'
            }`}
          >
            {indexNumber} // {item.category}
          </span>
          <span className="font-mono absolute top-3 right-3 px-2.5 py-1 rounded-[2px] bg-[#0B0B0D]/92 border border-[#27272F] group-hover:border-[#0EA5E9] group-hover:bg-[#0EA5E9] group-hover:text-[#0B0B0D] text-[10px] font-bold uppercase tracking-wider text-[#F5F5F4] inline-flex items-center gap-1.5 transition-colors">
            <Eye className="w-3.5 h-3.5 text-[#0EA5E9] group-hover:text-[#0B0B0D]" aria-hidden="true" />
            <span>Inspecionar</span>
          </span>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div>
            <h3 className="font-display text-2xl sm:text-[26px] font-extrabold uppercase tracking-tight leading-[0.98] text-[#F5F5F4] group-hover:text-[#0EA5E9] transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-2 leading-relaxed">{item.processSummary}</p>
          </div>
          <div className="mt-auto pt-4">
            <div className="pt-3 border-t border-[#27272F] flex items-center justify-between text-xs text-[#A1A1AA]">
              <span className="truncate pr-2">{item.vehicle}</span>
              <span className="font-mono inline-flex items-center gap-1 font-bold tabular-nums text-[#F97316] shrink-0">
                <Clock className="w-3.5 h-3.5 text-[#0EA5E9]" aria-hidden="true" />
                {item.duration}
              </span>
            </div>
          </div>
        </div>
      </button>

      {item.catalogId && onToggleCart && (
        <div className="px-5 pb-5 pt-0 mt-auto">
          <button
            type="button"
            onClick={() => onToggleCart(item.catalogId!)}
            className={`w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-[2px] font-mono text-xs font-bold uppercase tracking-wider border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5E9] ${
              isInCart
                ? 'bg-[#0EA5E9] text-[#0B0B0D] border-[#0EA5E9]'
                : 'bg-[#0B0B0D] border-[#27272F] text-[#F5F5F4] hover:border-[#0EA5E9]'
            }`}
          >
            {isInCart ? (
              <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <Plus className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" aria-hidden="true" />
            )}
            <span>{isInCart ? 'Adicionado à Lista' : 'Adicionar ao Orçamento'}</span>
          </button>
        </div>
      )}
    </article>
  );
}
