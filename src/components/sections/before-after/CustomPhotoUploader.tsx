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
    <div className="mt-4 p-4 bg-[#121720] border border-[#1E293B] rounded-md">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA] block">
            Colocar fotos reais do carro / peça — {activeTabLabel}
          </span>
          <p className="text-[11px] text-[#94A3B8] mt-0.5">
            Selecione as fotos de Antes e Depois abaixo para comparar no controle deslizante acima.
          </p>
        </div>

        {(customBeforeUrl || customAfterUrl) && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-[#07090C] border border-[#1E293B] hover:border-[#0066FF] text-xs font-semibold text-[#60A5FA] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Remover fotos desta aba</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Slot Foto ANTES */}
        <label className="group flex items-center gap-3 p-3 bg-[#07090C] border border-dashed border-[#334155] hover:border-[#0066FF] rounded-sm cursor-pointer transition-colors">
          {customBeforeUrl ? (
            <img
              src={customBeforeUrl}
              alt="Miniatura Antes"
              className="w-14 h-11 rounded-sm object-cover border border-[#1E293B] shrink-0"
            />
          ) : (
            <div className="w-14 h-11 rounded-sm bg-[#121720] border border-[#1E293B] flex items-center justify-center shrink-0 group-hover:border-[#0066FF]">
              <ImagePlus className="w-5 h-5 text-[#60A5FA]" aria-hidden="true" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <span className="block text-xs font-bold text-white truncate">
              {customBeforeUrl ? 'Foto ANTES carregada' : '1. Foto ANTES do carro'}
            </span>
            <span className="block text-[11px] text-[#60A5FA] font-medium mt-0.5">
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
        <label className="group flex items-center gap-3 p-3 bg-[#07090C] border border-dashed border-[#334155] hover:border-[#0066FF] rounded-sm cursor-pointer transition-colors">
          {customAfterUrl ? (
            <img
              src={customAfterUrl}
              alt="Miniatura Depois"
              className="w-14 h-11 rounded-sm object-cover border border-[#1E293B] shrink-0"
            />
          ) : (
            <div className="w-14 h-11 rounded-sm bg-[#121720] border border-[#1E293B] flex items-center justify-center shrink-0 group-hover:border-[#0066FF]">
              <ImagePlus className="w-5 h-5 text-[#60A5FA]" aria-hidden="true" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <span className="block text-xs font-bold text-white truncate">
              {customAfterUrl ? 'Foto DEPOIS carregada' : '2. Foto DEPOIS do carro'}
            </span>
            <span className="block text-[11px] text-[#60A5FA] font-medium mt-0.5">
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

      <p className="mt-2.5 text-[11px] text-[#94A3B8] flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" aria-hidden="true" />
        <span>
          Dica LGPD: cubra as placas dos veículos ao publicar fotos definitivas em{' '}
          <code className="text-[#CBD5E1]">src/data/beforeAfter.ts</code>.
        </span>
      </p>
    </div>
  );
}
