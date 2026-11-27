import type { ChangeEvent } from 'react';
import { AlertTriangle, ImagePlus, RotateCcw, ShieldCheck } from 'lucide-react';

interface CustomPhotoUploaderProps {
  activeTabLabel: string;
  customBeforeUrl: string | null;
  customAfterUrl: string | null;
  uploadError?: string | null;
  isProcessing?: boolean;
  onFileChange: (side: 'before' | 'after', event: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

export function CustomPhotoUploader({
  activeTabLabel,
  customBeforeUrl,
  customAfterUrl,
  uploadError,
  isProcessing = false,
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
            Selecione imagens em JPEG, PNG ou WebP (até 10 MB) para testar diretamente no
            comparador.
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

      {uploadError && (
        <div
          role="alert"
          className="mb-3.5 p-3 bg-[#FFF7ED] border-2 border-[#C2410C] text-xs text-[#7C2D12] font-medium flex items-start gap-2"
        >
          <AlertTriangle className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" aria-hidden="true" />
          <span>{uploadError}</span>
        </div>
      )}

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
              {isProcessing
                ? 'Validando imagem...'
                : customBeforeUrl
                  ? 'Clique para trocar imagem'
                  : 'JPEG, PNG ou WebP (máx. 10 MB)'}
            </span>
          </div>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={isProcessing}
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
              {isProcessing
                ? 'Validando imagem...'
                : customAfterUrl
                  ? 'Clique para trocar imagem'
                  : 'JPEG, PNG ou WebP (máx. 10 MB)'}
            </span>
          </div>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={isProcessing}
            onChange={(e) => onFileChange('after', e)}
            className="sr-only"
          />
        </label>
      </div>

      <p className="mt-2.5 text-[11px] text-[#52525B] flex items-start gap-1.5 leading-relaxed">
        <ShieldCheck className="w-3.5 h-3.5 text-[#0369A1] shrink-0 mt-0.5" aria-hidden="true" />
        <span>
          Prévia 100% local: as fotos não são enviadas a servidores, têm metadados EXIF/GPS
          removidos na memória e são descartadas imediatamente ao limpar. Caso envie fotos reais no
          WhatsApp, evite expor placas legíveis, documentos ou terceiros.
        </span>
      </p>
    </div>
  );
}
