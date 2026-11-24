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
    activeModalIndex !== null && filteredItems[activeModalIndex]
      ? filteredItems[activeModalIndex]
      : null;

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
    <section id="galeria" className="w-full bg-[#12161F] text-white">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12 sm:py-16">
        <ScrollReveal direction="up">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-5 mb-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FB923C] block mb-2">
                Galeria Técnica & Customização
              </span>
              <h2 className="font-display italic text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Serviços filtráveis com{' '}
                <span className="font-drip not-italic text-hydro-dip">ARTE</span> no processo.
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Filtrar galeria por categoria"
              className="flex flex-nowrap md:flex-wrap overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 pb-2 md:mx-0 md:px-0 md:pb-0 gap-2.5"
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
                    className={`option-interactive snap-start shrink-0 whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold border min-h-[42px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                      isSelected
                        ? 'btn-liquid-coat text-white'
                        : 'bg-[#171C26] text-[#CBD5E1] border-white/10 hover:border-[#38BDF8] hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Grade com animação escalonada */}
        <div
          key={activeCategory}
          className="animate-panel-switch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredItems.map((item, index) => (
            <ScrollReveal key={item.id} direction="up" delayMs={index * 60}>
              <GalleryCard
                item={item}
                isInCart={Boolean(
                  item.catalogId && cartItems.some((c) => c.id === item.catalogId)
                )}
                onOpen={(triggerEl) => openModal(index, triggerEl)}
                onToggleCart={onToggleCartItem}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Dark Mode Acessível (ESC, backdrop, Anterior/Próximo) */}
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
