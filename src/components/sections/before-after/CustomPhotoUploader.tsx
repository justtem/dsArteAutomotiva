import type { ChangeEvent } from 'react';
import { ImagePlus, RotateCcw, ShieldCheck } from 'lucide-react';

interface CustomPhotoUploaderProps {
  activeTabLabel: string;
  customBeforeUrl: string | null;
  customAfterUrl: string | null;
  onFileChange: (side: 'before' | 'after', event: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export function CustomPhotoUploader({
  activeTabLabel,
  customBeforeUrl,
  customAfterUrl,
  onFileChange,
  onReset,
}: CustomPhotoUploaderProps) {
  return (
    <div className="p-4 sm:p-5 bg-[#F8F6F2] border-2 border-[#111113]">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0369A1] block">
            Carregar fotos reais da peça / veículo — {activeTabLabel}
          </span>
          <p className="text-xs text-[#27272A] mt-0.5">
            Selecione as imagens de Antes e Depois abaixo para testar diretamente no comparador.
          </p>
        </div>

        {(customBeforeUrl || customAfterUrl) && (
          <button
            type="button"
            onClick={onReset}
            className="btn-ink-outline inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Remover fotos desta aba</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Slot Foto ANTES */}
        <label className="group flex items-center gap-3 p-3 bg-[#EFECE6] border-2 border-dashed border-[#111113]/45 hover:border-[#111113] rounded-[2px] cursor-pointer transition-colors">
          {customBeforeUrl ? (
            <img
              src={customBeforeUrl}
              alt="Miniatura Antes"
              className="w-14 h-11 rounded-[2px] object-cover border border-[#111113] shrink-0"
            />
          ) : (
            <div className="w-14 h-11 rounded-[2px] bg-[#F8F6F2] border border-[#111113] flex items-center justify-center shrink-0">
              <ImagePlus className="w-5 h-5 text-[#0369A1]" aria-hidden="true" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <span className="block text-xs font-bold text-[#111113] truncate">
              {customBeforeUrl ? 'Foto ANTES carregada' : '1. Foto ANTES (peça ou veículo)'}
            </span>
            <span className="block text-[11px] text-[#0369A1] font-semibold mt-0.5">
              {customBeforeUrl ? 'Clique para trocar imagem' : 'Clique para escolher foto'}
            </span>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange('before', e)}
            className="sr-only"
          />
        </label>

        {/* Slot Foto DEPOIS */}
        <label className="group flex items-center gap-3 p-3 bg-[#EFECE6] border-2 border-dashed border-[#111113]/45 hover:border-[#111113] rounded-[2px] cursor-pointer transition-colors">
          {customAfterUrl ? (
            <img
              src={customAfterUrl}
              alt="Miniatura Depois"
              className="w-14 h-11 rounded-[2px] object-cover border border-[#111113] shrink-0"
            />
          ) : (
            <div className="w-14 h-11 rounded-[2px] bg-[#F8F6F2] border border-[#111113] flex items-center justify-center shrink-0">
              <ImagePlus className="w-5 h-5 text-[#0369A1]" aria-hidden="true" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <span className="block text-xs font-bold text-[#111113] truncate">
              {customAfterUrl ? 'Foto DEPOIS carregada' : '2. Foto DEPOIS (pintura pronta)'}
            </span>
            <span className="block text-[11px] text-[#0369A1] font-semibold mt-0.5">
              {customAfterUrl ? 'Clique para trocar imagem' : 'Clique para escolher foto'}
            </span>
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => onFileChange('after', e)}
            className="sr-only"
          />
        </label>
      </div>

      <p className="mt-2.5 text-[11px] text-[#52525B] flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#0369A1] shrink-0" aria-hidden="true" />
        <span>
          Prévia 100% local: as imagens escolhidas permanecem apenas no seu navegador.
        </span>
      </p>
    </div>
  );
}
