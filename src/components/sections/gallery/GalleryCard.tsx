import { Check, Clock, Eye, Plus } from 'lucide-react';
import type { GalleryItem } from '../../../types';
import { GalleryIllustration } from '../../illustrations';
import { CardTopPaintDrip } from '../../ui';

interface GalleryCardProps {
  item: GalleryItem;
  isInCart: boolean;
  onOpen: (triggerEl: HTMLButtonElement) => void;
  onToggleCart?: (catalogId: number) => void;
}

export function GalleryCard({ item, isInCart, onOpen, onToggleCart }: GalleryCardProps) {
  const isFlameCategory = item.category === 'Candy & Especiais';

  return (
    <article className="card-automotive group rounded-2xl overflow-hidden flex flex-col">
      {/* Detalhe de tinta derretida aparecendo suavemente no topo ao passar o mouse */}
      <div className="opacity-55 group-hover:opacity-100 transition-opacity duration-300">
        <CardTopPaintDrip variant={isFlameCategory ? 'flame' : 'cyan'} />
      </div>

      <button
        type="button"
        onClick={(e) => onOpen(e.currentTarget)}
        className="text-left flex flex-col flex-1 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#38BDF8]"
      >
        <div className="relative w-full aspect-[16/10] bg-[#0B0D12] overflow-hidden border-b border-white/10">
          <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.05]">
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
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0B0D12]/90 border text-[11px] font-bold ${
              isFlameCategory
                ? 'border-[#FB923C]/40 text-[#FB923C]'
                : 'border-white/15 text-[#38BDF8]'
            }`}
          >
            {item.category}
          </span>
          <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#0B0D12]/90 border border-white/15 group-hover:border-[#38BDF8] group-hover:bg-[#0284C7] text-[11px] font-bold text-white inline-flex items-center gap-1.5 transition-all">
            <Eye className="w-3.5 h-3.5 text-[#38BDF8] group-hover:text-white" aria-hidden="true" />
            <span>Inspecionar</span>
          </span>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-display italic text-xl font-bold text-white group-hover:text-[#38BDF8] transition-colors">
              {item.title}
            </h3>
            <p className="text-xs text-[#CBD5E1] mt-1.5 leading-relaxed">{item.processSummary}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="truncate pr-2">{item.vehicle}</span>
            <span className="inline-flex items-center gap-1 font-bold tabular-nums text-[#FB923C] shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#38BDF8]" aria-hidden="true" />
              {item.duration}
            </span>
          </div>
        </div>
      </button>

      {item.catalogId && onToggleCart && (
        <div className="px-5 pb-5 pt-0">
          <button
            type="button"
            onClick={() => onToggleCart(item.catalogId!)}
            className={`w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              isInCart
                ? 'option-selected-glow text-[#38BDF8]'
                : 'btn-chrome-dark text-[#CBD5E1] hover:text-white'
            }`}
          >
            {isInCart ? (
              <Check className="w-3.5 h-3.5 text-[#38BDF8]" aria-hidden="true" />
            ) : (
              <Plus className="w-3.5 h-3.5 text-[#38BDF8]" aria-hidden="true" />
            )}
            <span>{isInCart ? 'Adicionado à Lista de Orçamento' : '+ Adicionar ao Orçamento'}</span>
          </button>
        </div>
      )}
    </article>
  );
}
