import { useState } from 'react';
import { Check, Clock, Copy, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../../data';
import type { QuoteSummary } from '../../../types';
import { formatBRL, formatDuration } from '../../../utils';
import { CardTopPaintDrip } from '../../ui';

interface QuoteSummaryPanelProps {
  quoteSummary: QuoteSummary;
}

export function QuoteSummaryPanel({ quoteSummary }: QuoteSummaryPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyMessage = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(quoteSummary.message);
      } else {
        const temp = document.createElement('textarea');
        temp.value = quoteSummary.message;
        temp.setAttribute('readonly', '');
        temp.style.position = 'absolute';
        temp.style.left = '-9999px';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <aside
      id="resumo-pedido"
      className="lg:col-span-5 lg:sticky lg:top-22 surface-gunmetal rounded-2xl overflow-hidden scroll-mt-20"
    >
      <CardTopPaintDrip variant="cyan" />
      <div className="px-5 py-3.5 bg-[#0B0D12]/70 border-b border-white/10 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#38BDF8]">
          Resumo da Pintura / Estética
        </span>
        <span className="text-xs font-mono font-semibold text-[#FB923C]">
          {quoteSummary.sizeLabel}
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* Itens selecionados */}
        <div className="space-y-2.5 text-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="font-display italic text-base font-bold text-white block">
                {quoteSummary.packageName}
              </span>
              <span className="text-xs text-[#94A3B8]">Categoria: {quoteSummary.sizeLabel}</span>
            </div>
            <span className="font-semibold tabular-nums text-white whitespace-nowrap">
              {formatBRL(quoteSummary.packagePrice)}
            </span>
          </div>

          {quoteSummary.selectedAddons.map((addon) => (
            <div
              key={addon.id}
              className="flex items-center justify-between gap-3 text-xs text-[#CBD5E1] pt-2 border-t border-white/8"
            >
              <span>+ {addon.name}</span>
              <span className="font-medium tabular-nums text-white whitespace-nowrap">
                {formatBRL(addon.computedPrice)}
              </span>
            </div>
          ))}

          {quoteSummary.includePickup && (
            <div className="flex items-center justify-between gap-3 text-xs text-[#CBD5E1] pt-2 border-t border-white/8">
              <span>+ Leva e Traz local</span>
              <span className="font-medium tabular-nums text-white whitespace-nowrap">
                {formatBRL(BUSINESS_CONFIG.pickupFee)}
              </span>
            </div>
          )}
        </div>

        {/* Total e prazo */}
        <div className="pt-4 border-t border-white/10 flex items-end justify-between gap-4">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Total estimado
            </span>
            <span className="font-display italic text-4xl font-bold tabular-nums text-hydro-dip leading-none">
              {formatBRL(quoteSummary.totalPrice)}
            </span>
          </div>
          <div className="text-right">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
              Tempo médio
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold tabular-nums text-[#FB923C] mt-0.5">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {formatDuration(quoteSummary.totalMinutes)}
            </span>
          </div>
        </div>

        {/* Prévia da mensagem do WhatsApp */}
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
            Prévia exata da mensagem no WhatsApp
          </span>
          <pre className="p-3.5 rounded-xl bg-[#0B0D12] border border-white/10 text-xs text-[#CBD5E1] whitespace-pre-wrap font-sans leading-relaxed break-words">
            {quoteSummary.message}
          </pre>
        </div>

        {/* Ações */}
        <div className="space-y-2.5">
          <a
            href={quoteSummary.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-liquid-coat btn-chrome-shine w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-white text-sm font-bold min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            <span>Agendar no WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleCopyMessage}
            className="btn-chrome-dark w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-bold min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
            ) : (
              <Copy className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
            )}
            <span>{copied ? 'Mensagem copiada!' : 'Copiar mensagem'}</span>
          </button>
        </div>

        <p className="text-[11px] text-[#94A3B8] leading-relaxed">
          Sem pagamento antecipado no site. O orçamento final é confirmado no WhatsApp ou na
          avaliação técnica da peça/veículo na oficina.
        </p>
      </div>
    </aside>
  );
}
