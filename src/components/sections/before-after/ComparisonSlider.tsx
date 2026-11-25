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

  const statusNote = hasAnyUploadedPhoto
    ? 'Suas fotos locais em exibição'
    : hasAnyRealPhoto
      ? 'Foto real DS Arte Automotiva'
      : 'Ilustração demonstrativa — envie sua foto para testar';

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
      {/* Palco Dominante emoldurado em 2px preto carvão */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#0B0B0D] border-2 border-[#111113] sm:shadow-[6px_6px_0px_#111113] overflow-hidden select-none cursor-ew-resize focus-within:outline-2 focus-within:outline-[#0369A1]"
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

        {/* Carimbos ANTES / DEPOIS */}
        <span className="font-mono absolute top-3 left-3 px-2.5 py-1 bg-[#F8F6F2] border-2 border-[#111113] text-[11px] font-bold uppercase tracking-wider text-[#111113] pointer-events-none">
          Antes
        </span>
        <span className="font-mono absolute top-3 right-3 px-2.5 py-1 bg-[#0EA5E9] border-2 border-[#111113] text-[11px] font-bold uppercase tracking-wider text-[#111113] pointer-events-none">
          Depois
        </span>

        {/* Divisor vertical reto e alça mecânica seca */}
        <div
          className="absolute top-0 bottom-0 w-[3px] bg-[#0EA5E9] pointer-events-none"
          style={{ left: `${splitPercent}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-[2px] bg-[#F8F6F2] border-2 border-[#111113] text-[#111113] flex items-center justify-center shadow-[3px_3px_0px_#111113]">
            <MoveHorizontal className="w-4.5 h-4.5 text-[#111113]" aria-hidden="true" />
          </div>
        </div>

        {/* Input range acessível */}
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

      {/* Rodapé técnico do quadro com botões rápidos mobile, nota voltada ao cliente e proporção */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#3F3F46]">
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
              className={`font-mono px-2.5 py-1.5 rounded-[2px] text-[11px] font-bold border-2 transition-colors ${
                Math.abs(splitPercent - preset.val) <= 8
                  ? 'bg-[#111113] border-[#111113] text-[#F8F6F2]'
                  : 'bg-[#F8F6F2] border-[#111113] text-[#111113]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider text-[#52525B]">
          {statusNote}
        </span>

        <span className="font-mono font-bold tabular-nums text-[#111113] ml-auto">
          {splitPercent}% // {100 - splitPercent}%
        </span>
      </div>
    </div>
  );
}
