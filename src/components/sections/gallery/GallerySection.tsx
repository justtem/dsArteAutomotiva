import { useCallback, useMemo, useRef, useState } from 'react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from '../../../data';
import type { CustomCatalogService, GalleryCategory } from '../../../types';
import { ScrollReveal } from '../../ui';
import { GalleryCard } from './GalleryCard';
import { GalleryLightbox } from './GalleryLightbox';

interface GallerySectionProps {
  cartItems: CustomCatalogService[];
  onToggleCartItem: (catalogId: number) => void;
}

/**
 * Calcula o span assimétrico garantindo que TODA linha feche exatamente 12 colunas no desktop
 * e 2 colunas no tablet, qualquer que seja a quantidade de itens filtrados (1, 2, 3, 4, 6+).
 */
function getEditorialLayout(
  index: number,
  total: number
): { spanClass: string; variant: 'standard' | 'panorama' } {
  const isOddTotal = total % 2 === 1;

  if (isOddTotal && index === 0) {
    return {
      spanClass: 'sm:col-span-2 lg:col-span-12',
      variant: 'panorama',
    };
  }

  const adjustedIndex = isOddTotal ? index - 1 : index;
  const pairRow = Math.floor(adjustedIndex / 2);
  const posInPair = adjustedIndex % 2;
  const pattern = pairRow % 3;

  if (pattern === 0) {
    return {
      spanClass: posInPair === 0 ? 'lg:col-span-7' : 'lg:col-span-5',
      variant: 'standard',
    };
  }

  if (pattern === 1) {
    return {
      spanClass: posInPair === 0 ? 'lg:col-span-5' : 'lg:col-span-7',
      variant: 'standard',
    };
  }

  return {
    spanClass: 'lg:col-span-6',
    variant: 'standard',
  };
}

export function GallerySection({ cartItems, onToggleCartItem }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('Destaques');
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'Destaques') {
      return GALLERY_ITEMS.filter((item) => item.featured);
    }
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const activeItem =
    (activeModalIndex !== null ? filteredItems[activeModalIndex] : undefined) ?? null;

  const openModal = (index: number, triggerEl: HTMLButtonElement) => {
    lastTriggerRef.current = triggerEl;
    setActiveModalIndex(index);
  };

  const closeModal = useCallback(() => {
    setActiveModalIndex(null);
    setTimeout(() => {
      lastTriggerRef.current?.focus();
    }, 0);
  }, []);

  const showPrev = useCallback(() => {
    setActiveModalIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return (prev - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setActiveModalIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return (prev + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  return (
    <section
      id="galeria"
      className="w-full bg-[#0B0B0D] bg-asphalt-grid text-[#F5F5F4] border-b-2 border-[#111113] overflow-x-clip"
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-14 sm:py-20">
        <ScrollReveal direction="up">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-8 mb-8 border-b border-[#27272F]">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="font-mono text-sm sm:text-base font-bold text-[#F97316]">
                  02 //
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#A1A1AA]">
                  Catálogo Autoral • Pinturas & Estética
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight leading-[0.92] text-[#F5F5F4]">
                Projetos personalizados com{' '}
                <span className="text-[#0EA5E9]">ARTE</span> em cada camada.
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Filtrar galeria por categoria"
              className="flex flex-nowrap md:flex-wrap overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 pb-2 md:mx-0 md:px-0 md:pb-0 gap-2"
            >
              {GALLERY_CATEGORIES.map((category) => {
                const isSelected = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={(e) => {
                      setActiveCategory(category);
                      setActiveModalIndex(null);
                      e.currentTarget.scrollIntoView({
                        behavior: 'smooth',
                        inline: 'center',
                        block: 'nearest',
                      });
                    }}
                    className={`snap-start shrink-0 whitespace-nowrap px-4 py-2.5 rounded-[2px] font-mono text-xs font-bold uppercase tracking-wider border min-h-[42px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5E9] ${
                      isSelected
                        ? 'bg-[#0EA5E9] text-[#0B0B0D] border-[#0EA5E9]'
                        : 'bg-[#141418] text-[#A1A1AA] border-[#27272F] hover:bg-[#1C1C22] hover:border-[#52525B] hover:text-[#F5F5F4]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Grid Editorial Assimétrico (12 colunas no desktop, alturas de fileira 100% alinhadas) */}
        <div
          key={activeCategory}
          className="animate-panel-switch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 items-stretch"
        >
          {filteredItems.map((item, index) => {
            const { spanClass, variant } = getEditorialLayout(index, filteredItems.length);
            return (
              <ScrollReveal
                key={item.id}
                direction="up"
                delayMs={index * 55}
                className={`${spanClass} h-full`}
              >
                <GalleryCard
                  item={item}
                  indexNumber={String(index + 1).padStart(2, '0')}
                  variant={variant}
                  isInCart={Boolean(
                    item.catalogId && cartItems.some((c) => c.id === item.catalogId)
                  )}
                  onOpen={(triggerEl) => openModal(index, triggerEl)}
                  onToggleCart={onToggleCartItem}
                />
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox Acessível */}
      {activeItem && activeModalIndex !== null && (
        <GalleryLightbox
          item={activeItem}
          currentIndex={activeModalIndex}
          totalItems={filteredItems.length}
          isInCart={Boolean(
            activeItem.catalogId && cartItems.some((c) => c.id === activeItem.catalogId)
          )}
          onClose={closeModal}
          onPrev={showPrev}
          onNext={showNext}
          onToggleCart={onToggleCartItem}
        />
      )}
    </section>
  );
}
