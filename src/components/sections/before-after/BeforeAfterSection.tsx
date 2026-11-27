import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { ChevronRight, ClipboardPlus, Upload } from 'lucide-react';
import { BEFORE_AFTER_CASES } from '../../../data';
import type { BeforeAfterCaseId, ServiceAddonId, ServicePackageId } from '../../../types';
import { validateAndSanitizeLocalImage } from '../../../utils';
import { ScrollReveal } from '../../ui';
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
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const createdUrlsRef = useRef<string[]>([]);

  const activeCase =
    BEFORE_AFTER_CASES.find((item) => item.id === activeCaseId) ?? BEFORE_AFTER_CASES[0];

  const currentPair = photosByCase[activeCase.id] || { before: null, after: null };
  const recommendedCatalogId = activeCase.recommendedCatalogId;

  const revokeTrackedUrl = (urlToRevoke: string | null | undefined) => {
    if (!urlToRevoke) return;
    URL.revokeObjectURL(urlToRevoke);
    createdUrlsRef.current = createdUrlsRef.current.filter((u) => u !== urlToRevoke);
  };

  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      createdUrlsRef.current = [];
    };
  }, []);

  const handleFileChange = async (
    side: 'before' | 'after',
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    // Limpa o input imediatamente para permitir reenviar o mesmo arquivo após limpeza
    event.target.value = '';
    if (!file) return;

    const targetCaseId = activeCase.id;
    setUploadError(null);
    setIsProcessingPhoto(true);

    const validation = await validateAndSanitizeLocalImage(file);
    setIsProcessingPhoto(false);

    if (!validation.ok) {
      setUploadError(validation.error);
      return;
    }

    const previousUrl = photosByCase[targetCaseId]?.[side];
    revokeTrackedUrl(previousUrl);
    createdUrlsRef.current.push(validation.objectUrl);

    setPhotosByCase((prev) => {
      const existing = prev[targetCaseId] || { before: null, after: null };
      return {
        ...prev,
        [targetCaseId]: {
          ...existing,
          [side]: validation.objectUrl,
        },
      };
    });
  };

  const resetCurrentTabPhotos = () => {
    const existing = photosByCase[activeCase.id];
    revokeTrackedUrl(existing?.before);
    revokeTrackedUrl(existing?.after);
    setUploadError(null);

    setPhotosByCase((prev) => ({
      ...prev,
      [activeCase.id]: { before: null, after: null },
    }));
  };

  return (
    <section
      id="antes-depois"
      className="w-full bg-[#EFECE6] bg-concrete-grain text-[#111113] border-b-2 border-[#111113] overflow-x-clip"
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-14 sm:py-20">
        {/* Topo Editorial com Índice 01 // */}
        <ScrollReveal direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-7">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="font-mono text-sm sm:text-base font-bold text-[#C2410C]">
                  01 //
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#52525B]">
                  Comparador Interativo • Antes & Depois
                </span>
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight leading-[0.92] text-[#111113]">
                Transformação <span className="text-[#0369A1]">visível</span> na bancada.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowCustomUploader((prev) => !prev);
                setUploadError(null);
              }}
              aria-expanded={showCustomUploader}
              className={`self-start lg:self-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider min-h-[44px] ${
                showCustomUploader ? 'btn-cyan-stamp' : 'btn-ink-outline'
              }`}
            >
              <Upload className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Testar com suas fotos reais</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Painel expansível de Upload Local */}
        {showCustomUploader && (
          <div className="animate-panel-switch mb-7">
            <CustomPhotoUploader
              activeTabLabel={activeCase.tabLabel}
              customBeforeUrl={currentPair.before}
              customAfterUrl={currentPair.after}
              uploadError={uploadError}
              isProcessing={isProcessingPhoto}
              onFileChange={handleFileChange}
              onReset={resetCurrentTabPhotos}
            />
          </div>
        )}

        {/* Barra Estrutural de Abas Secas */}
        <ScrollReveal direction="up" delayMs={60}>
          <div
            role="tablist"
            aria-label="Selecionar serviço para comparar Antes e Depois"
            className="flex flex-nowrap overflow-x-auto no-scrollbar snap-x snap-mandatory border-y-2 border-[#111113] bg-[#F8F6F2] mb-8"
          >
            {BEFORE_AFTER_CASES.map((item, idx) => {
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
                    setUploadError(null);
                    e.currentTarget.scrollIntoView({
                      behavior: 'smooth',
                      inline: 'center',
                      block: 'nearest',
                    });
                  }}
                  className={`snap-start shrink-0 px-4 sm:px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider border-r border-[#111113]/20 min-h-[48px] whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0369A1] ${
                    isSelected
                      ? 'bg-[#111113] text-[#F8F6F2]'
                      : 'bg-transparent text-[#3F3F46] hover:bg-[#E4E0D8] hover:text-[#111113]'
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] mr-1.5 ${
                      isSelected ? 'text-[#F97316]' : 'text-[#52525B]'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  {item.tabLabel}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Palco Dominante (8 cols / ~67%) + Coluna de Especificação Aberta sem Caixa Flutuante (4 cols) */}
        <ScrollReveal direction="up" delayMs={120}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-8">
              <ComparisonSlider
                activeCase={activeCase}
                splitPercent={splitPercent}
                onSplitChange={setSplitPercent}
                customBeforeUrl={currentPair.before}
                customAfterUrl={currentPair.after}
              />
            </div>

            {/* Coluna Técnica Editorial */}
            <div
              key={activeCase.id}
              className="animate-panel-switch lg:col-span-4 border-t-2 border-[#111113] pt-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#0369A1]">
                    Especificação de Oficina
                  </span>
                  <span className="font-mono text-xs font-bold uppercase px-2 py-0.5 bg-[#111113] text-[#F8F6F2]">
                    {activeCase.tabLabel}
                  </span>
                </div>

                <h3 className="font-display text-3xl sm:text-[34px] font-extrabold uppercase tracking-tight leading-[0.96] text-[#111113] mb-5">
                  {activeCase.title}
                </h3>

                <dl className="divide-y divide-[#111113]/25 border-t border-b border-[#111113]">
                  <div className="py-4">
                    <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#52525B] mb-1">
                      Diagnóstico da Peça / Superfície
                    </dt>
                    <dd className="text-sm text-[#27272A] leading-relaxed">
                      {activeCase.diagnosis}
                    </dd>
                  </div>
                  <div className="py-4">
                    <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#52525B] mb-1">
                      Processo Executado
                    </dt>
                    <dd className="text-sm text-[#27272A] leading-relaxed">
                      {activeCase.process}
                    </dd>
                  </div>
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <dt className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#52525B]">
                      Prazo de Referência
                    </dt>
                    <dd className="font-mono text-sm font-bold tabular-nums text-[#C2410C]">
                      {activeCase.averageTime}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="pt-6 space-y-2.5">
                <button
                  type="button"
                  onClick={() =>
                    onApplyCaseToSimulator(
                      activeCase.recommendedPackageId,
                      activeCase.recommendedAddonId
                    )
                  }
                  className="btn-cyan-stamp w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider min-h-[48px]"
                >
                  <span>Simular esta pintura no orçamento</span>
                  <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>

                {recommendedCatalogId !== undefined && (
                  <button
                    type="button"
                    onClick={() => onAddCatalogCaseToCart(recommendedCatalogId)}
                    className="btn-ink-outline w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider min-h-[44px]"
                  >
                    <ClipboardPlus className="w-4 h-4 shrink-0" aria-hidden="true" />
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
