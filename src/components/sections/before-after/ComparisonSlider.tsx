import { useCallback, useRef, type PointerEvent } from 'react';
import { MoveHorizontal } from 'lucide-react';
import type { BeforeAfterCase } from '../../../types';
import { BeforeAfterIllustration } from '../../illustrations';

interface ComparisonSliderProps {
  activeCase: BeforeAfterCase;
  splitPercent: number;
  onSplitChange: (value: number) => void;
  customBeforeUrl: string | null;
  customAfterUrl: string | null;
}

export function ComparisonSlider({
  activeCase,
  splitPercent,
  onSplitChange,
  customBeforeUrl,
  customAfterUrl,
}: ComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const resolvedBeforeUrl = customBeforeUrl || activeCase.beforeImageUrl || null;
  const resolvedAfterUrl = customAfterUrl || activeCase.afterImageUrl || null;
  const hasAnyUploadedPhoto = Boolean(customBeforeUrl || customAfterUrl);
  const hasAnyRealPhoto = Boolean(resolvedBeforeUrl || resolvedAfterUrl);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect || rect.width <= 0) return;
      const raw = ((clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(0, Math.min(100, Math.round(raw)));
      onSplitChange(clamped);
    },
    [onSplitChange]
  );

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  return (
    <div className="flex flex-col">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#0B0D12] border border-white/12 rounded-2xl overflow-hidden select-none shadow-2xl cursor-ew-resize"
      >
        {/* Camada de fundo: DEPOIS */}
        <div className="absolute inset-0 pointer-events-none">
          {resolvedAfterUrl ? (
            <img
              src={resolvedAfterUrl}
              alt={`Foto depois: ${activeCase.title}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <BeforeAfterIllustration caseId={activeCase.id} side="after" />
          )}
        </div>

        {/* Camada recortada: ANTES */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - splitPercent}% 0 0)` }}
        >
          {resolvedBeforeUrl ? (
            <img
              src={resolvedBeforeUrl}
              alt={`Foto antes: ${activeCase.title}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <BeforeAfterIllustration caseId={activeCase.id} side="before" />
          )}
        </div>

        {/* Selos ANTES / DEPOIS */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0B0D12]/90 border border-white/15 text-[11px] font-bold uppercase tracking-wider text-[#CBD5E1] pointer-events-none">
          Antes
        </span>
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#0284C7] to-[#29B6F6] text-[11px] font-bold uppercase tracking-wider text-white shadow-md pointer-events-none">
          Depois
        </span>

        {/* Indicação clara de demonstração vs fotos reais */}
        <span className="hidden sm:inline-block absolute bottom-3.5 left-3.5 px-3 py-1 rounded-full bg-[#0B0D12]/90 border border-white/10 text-[11px] font-medium text-[#94A3B8] pointer-events-none">
          {hasAnyUploadedPhoto
            ? 'Suas fotos locais (prévia)'
            : hasAnyRealPhoto
              ? 'Foto real DS Arte Automotiva'
              : 'Ilustração demonstrativa — teste com suas fotos'}
        </span>

        {/* Divisor vertical líquido (Ciano -> Chama Candy) e alça tátil 44px */}
        <div
          className="absolute top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#29B6F6] via-white to-[#FB923C] shadow-[0_0_16px_rgba(41,182,246,0.9)] pointer-events-none"
          style={{ left: `${splitPercent}%` }}
        >
          <div className="animate-hotspot-active absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-br from-[#29B6F6] to-[#0284C7] border-2 border-white text-white flex items-center justify-center shadow-lg">
            <MoveHorizontal className="w-4.5 h-4.5" aria-hidden="true" />
          </div>
        </div>

        {/* Input range acessível para leitores de tela e teclado */}
        <input
          type="range"
          min={0}
          max={100}
          value={splitPercent}
          onChange={(e) => onSplitChange(Number(e.target.value))}
          aria-label={`Comparar Antes e Depois de ${activeCase.tabLabel}. Use as setas esquerda e direita ou arraste.`}
          className="sr-only"
        />
      </div>

      {/* Barra inferior com atalhos rápidos de um toque no celular + percentual */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-[#94A3B8]">
        <div className="flex items-center gap-1.5 sm:hidden">
          {[
            { label: 'Ver Antes', val: 88 },
            { label: '50 / 50', val: 50 },
            { label: 'Ver Depois', val: 12 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onSplitChange(preset.val)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                Math.abs(splitPercent - preset.val) <= 8
                  ? 'bg-[#29B6F6]/20 border-[#38BDF8] text-[#38BDF8]'
                  : 'bg-[#171C26] border-white/10 text-[#CBD5E1]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <span className="hidden sm:inline">
          Toque e arraste sobre a imagem para comparar Antes e Depois
        </span>
        <span className="font-mono font-semibold tabular-nums text-white ml-auto">
          {splitPercent}% / {100 - splitPercent}%
        </span>
      </div>
    </div>
  );
}
