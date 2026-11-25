import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { ChevronRight, ClipboardPlus, Upload } from 'lucide-react';
import { BEFORE_AFTER_CASES } from '../../../data';
import type { BeforeAfterCaseId, ServiceAddonId, ServicePackageId } from '../../../types';
import { CardTopPaintDrip, ScrollReveal } from '../../ui';
import { ComparisonSlider } from './ComparisonSlider';
import { CustomPhotoUploader } from './CustomPhotoUploader';

interface PhotoPair {
  before: string | null;
  after: string | null;
}

interface BeforeAfterSectionProps {
  onApplyCaseToSimulator: (packageId?: ServicePackageId, addonId?: ServiceAddonId) => void;
  onAddCatalogCaseToCart: (catalogServiceId: number) => void;
}

export function BeforeAfterSection({
  onApplyCaseToSimulator,
  onAddCatalogCaseToCart,
}: BeforeAfterSectionProps) {
  const [activeCaseId, setActiveCaseId] = useState<BeforeAfterCaseId>(BEFORE_AFTER_CASES[0].id);
  const [splitPercent, setSplitPercent] = useState(50);
  const [showCustomUploader, setShowCustomUploader] = useState(false);
  const [photosByCase, setPhotosByCase] = useState<Partial<Record<BeforeAfterCaseId, PhotoPair>>>(
    {}
  );
  const createdUrlsRef = useRef<string[]>([]);

  const activeCase =
    BEFORE_AFTER_CASES.find((item) => item.id === activeCaseId) || BEFORE_AFTER_CASES[0];

  const currentPair = photosByCase[activeCase.id] || { before: null, after: null };

  useEffect(() => {
    const urls = createdUrlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleFileChange = (side: 'before' | 'after', event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    createdUrlsRef.current.push(url);

    setPhotosByCase((prev) => {
      const existing = prev[activeCase.id] || { before: null, after: null };
      return {
        ...prev,
        [activeCase.id]: {
          ...existing,
          [side]: url,
        },
      };
    });
  };

  const resetCurrentTabPhotos = () => {
    setPhotosByCase((prev) => ({
      ...prev,
      [activeCase.id]: { before: null, after: null },
    }));
  };

  const isFlameAccent =
    activeCase.id === 'candy-camaleao' ||
    activeCase.id === 'pintura-rodas' ||
    activeCase.id === 'aerografia-custom';

  return (
    <section id="antes-depois" className="w-full bg-[#12161F] text-white">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12 sm:py-16">
        {/* Cabeçalho */}
        <ScrollReveal direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#FB923C] block mb-2">
                Comparador Antes e Depois • Pintura & Estética
              </span>
              <h2 className="font-display italic text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Transformação <span className="text-hydro-dip pr-1">visível</span> em cada projeto.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setShowCustomUploader((prev) => !prev)}
              aria-expanded={showCustomUploader}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold min-h-[46px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                showCustomUploader ? 'btn-liquid-coat text-white' : 'btn-chrome-dark text-white'
              }`}
            >
              <Upload className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
              <span>Testar com suas fotos reais</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Painel expansível acima das abas */}
        {showCustomUploader && (
          <div className="animate-panel-switch mb-6">
            <CustomPhotoUploader
              activeTabLabel={activeCase.tabLabel}
              customBeforeUrl={currentPair.before}
              customAfterUrl={currentPair.after}
              onFileChange={handleFileChange}
              onReset={resetCurrentTabPhotos}
            />
          </div>
        )}

        {/* Abas de casos: carrossel horizontal deslizável no celular, grade flex no desktop */}
        <ScrollReveal direction="up" delayMs={80}>
          <div
            role="tablist"
            aria-label="Selecionar serviço para comparar Antes e Depois"
            className="flex flex-nowrap md:flex-wrap overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 pb-2 md:mx-0 md:px-0 md:pb-0 gap-2.5 mb-6"
          >
            {BEFORE_AFTER_CASES.map((item) => {
              const isSelected = item.id === activeCaseId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={(e) => {
                    setActiveCaseId(item.id);
                    setSplitPercent(50);
                    e.currentTarget.scrollIntoView({
                      behavior: 'smooth',
                      inline: 'center',
                      block: 'nearest',
                    });
                  }}
                  className={`option-interactive snap-start shrink-0 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold border min-h-[44px] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] ${
                    isSelected
                      ? 'btn-liquid-coat text-white'
                      : 'bg-[#171C26] text-[#CBD5E1] border-white/10 hover:border-[#38BDF8] hover:text-white'
                  }`}
                >
                  {item.tabLabel}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Grade assimétrica: Comparador (7 cols) + Ficha Técnica (5 cols) */}
        <ScrollReveal direction="up" delayMs={140}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 flex flex-col">
              <ComparisonSlider
                activeCase={activeCase}
                splitPercent={splitPercent}
                onSplitChange={setSplitPercent}
                customBeforeUrl={currentPair.before}
                customAfterUrl={currentPair.after}
              />
            </div>

            {/* Ficha Técnica Lateral com detalhe de tinta escorrendo no topo */}
            <div
              key={activeCase.id}
              className="animate-panel-switch lg:col-span-5 surface-gunmetal rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <CardTopPaintDrip variant={isFlameAccent ? 'flame' : 'cyan'} />
                <div className="p-5 sm:p-6 pb-0">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-[0.16em] text-[#38BDF8] mb-2">
                    Ficha Técnica da Pintura / Serviço
                  </span>
                  <h3 className="font-display italic text-2xl font-bold text-white mb-5">
                    {activeCase.title}
                  </h3>

                  <dl className="divide-y divide-white/10 border-t border-b border-white/10">
                    <div className="py-3.5">
                      <dt className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1">
                        Diagnóstico inicial
                      </dt>
                      <dd className="text-sm text-[#CBD5E1] leading-relaxed">
                        {activeCase.diagnosis}
                      </dd>
                    </div>
                    <div className="py-3.5">
                      <dt className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-1">
                        Procedimento na oficina
                      </dt>
                      <dd className="text-sm text-[#CBD5E1] leading-relaxed">
                        {activeCase.process}
                      </dd>
                    </div>
                    <div className="py-3.5 flex items-center justify-between gap-4">
                      <dt className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
                        Tempo estimado
                      </dt>
                      <dd className="text-sm font-bold tabular-nums text-[#FB923C]">
                        {activeCase.averageTime}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-5 space-y-2.5">
                <button
                  type="button"
                  onClick={() =>
                    onApplyCaseToSimulator(
                      activeCase.recommendedPackageId,
                      activeCase.recommendedAddonId
                    )
                  }
                  className="btn-liquid-coat btn-chrome-shine w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-white text-sm font-bold min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>Simular esta pintura no orçamento</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>

                {activeCase.recommendedCatalogId && (
                  <button
                    type="button"
                    onClick={() => onAddCatalogCaseToCart(activeCase.recommendedCatalogId!)}
                    className="btn-chrome-dark w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white text-xs sm:text-sm font-bold min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                  >
                    <ClipboardPlus className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
                    <span>Adicionar à Lista de Orçamento</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
