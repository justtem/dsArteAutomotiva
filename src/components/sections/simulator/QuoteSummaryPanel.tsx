import { useState } from 'react';
import { Check, Clock, Copy, MessageCircle, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../../data';
import type { QuoteSummary } from '../../../types';
import { formatBRL, formatDuration } from '../../../utils';

interface QuoteSummaryPanelProps {
  quoteSummary: QuoteSummary;
  onOpenPrivacyNotice?: () => void;
}

/**
 * Painel lateral desenhado como um Talão / Comprovante de Ordem de Serviço (OS).
 * No mobile usa sombra apenas inferior para zero overflow horizontal; em sm+ usa sombra deslocada 6px.
 */
export function QuoteSummaryPanel({ quoteSummary, onOpenPrivacyNotice }: QuoteSummaryPanelProps) {
  const [copied, setCopied] = useState(false);
  const [copyUnsupported, setCopyUnsupported] = useState(false);

  const handleCopyMessage = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        setCopyUnsupported(true);
        setTimeout(() => setCopyUnsupported(false), 3200);
        return;
      }
      await navigator.clipboard.writeText(quoteSummary.message);
      setCopied(true);
      setCopyUnsupported(false);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
      setCopyUnsupported(true);
      setTimeout(() => setCopyUnsupported(false), 3200);
    }
  };

  return (
    <aside
      id="resumo-pedido"
      className="lg:col-span-5 lg:sticky lg:top-22 bg-[#F8F6F2] text-[#111113] border-2 border-[#111113] shadow-[0_5px_0px_#111113] sm:shadow-[6px_6px_0px_#111113] scroll-mt-20"
    >
      {/* Cabeçalho invertido estilo talão impresso */}
      <div className="px-5 py-4 bg-[#111113] text-[#F8F6F2] flex items-center justify-between gap-2">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#0EA5E9] block">
            Comprovante de Prévia
          </span>
          <span className="font-display text-2xl font-extrabold uppercase tracking-wide leading-none text-[#F8F6F2]">
            Resumo da OS // DS Arte
          </span>
        </div>
        <span className="font-mono text-xs font-bold uppercase px-2.5 py-1 bg-[#F97316] text-[#111113]">
          {quoteSummary.sizeLabel}
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* Itens do Talão */}
        <div className="space-y-2.5 text-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="font-display text-xl font-extrabold uppercase tracking-tight leading-tight text-[#111113] block">
                {quoteSummary.packageName}
              </span>
              <span className="font-mono text-[11px] text-[#52525B] block mt-0.5">
                Categoria: {quoteSummary.sizeLabel}
              </span>
            </div>
            <span className="font-mono font-bold tabular-nums text-[#111113] whitespace-nowrap">
              {formatBRL(quoteSummary.packagePrice)}
            </span>
          </div>

          {quoteSummary.selectedAddons.map((addon) => (
            <div
              key={addon.id}
              className="flex items-center justify-between gap-3 text-xs text-[#27272A] pt-2.5 border-t border-dashed border-[#111113]/35"
            >
              <span>+ {addon.name}</span>
              <span className="font-mono font-bold tabular-nums text-[#111113] whitespace-nowrap">
                {formatBRL(addon.computedPrice)}
              </span>
            </div>
          ))}

          {quoteSummary.includePickup && (
            <div className="flex items-center justify-between gap-3 text-xs text-[#27272A] pt-2.5 border-t border-dashed border-[#111113]/35">
              <span>+ Leva e Traz local</span>
              <span className="font-mono font-bold tabular-nums text-[#111113] whitespace-nowrap">
                {formatBRL(BUSINESS_CONFIG.pickupFee)}
              </span>
            </div>
          )}
        </div>

        {/* Total e prazo em destaque técnico */}
        <div className="py-4 border-y-2 border-[#111113] flex items-end justify-between gap-4 bg-[#EFECE6] px-3.5">
          <div>
            <span className="font-mono block text-[10px] font-bold uppercase tracking-wider text-[#52525B] mb-1">
              Total Estimado (Base)
            </span>
            <span className="font-mono text-3xl sm:text-4xl font-bold tabular-nums text-[#111113] leading-none">
              {formatBRL(quoteSummary.totalPrice)}
            </span>
          </div>
          <div className="text-right">
            <span className="font-mono block text-[10px] font-bold uppercase tracking-wider text-[#52525B]">
              Tempo Médio
            </span>
            <span className="font-mono inline-flex items-center gap-1 text-sm font-bold tabular-nums text-[#C2410C] mt-1">
              <Clock className="w-4 h-4" aria-hidden="true" />
              {formatDuration(quoteSummary.totalMinutes)}
            </span>
          </div>
        </div>

        {/* Prévia exata da mensagem do WhatsApp */}
        <div>
          <span className="font-mono block text-[11px] font-bold uppercase tracking-wider text-[#52525B] mb-2">
            Prévia exata da mensagem no WhatsApp
          </span>
          <pre className="font-mono p-3.5 rounded-[2px] bg-[#EFECE6] border border-[#111113]/40 text-[11px] sm:text-xs text-[#111113] whitespace-pre-wrap leading-relaxed break-words">
            {quoteSummary.message}
          </pre>
        </div>

        {/* Ações */}
        <div className="space-y-2.5">
          <a
            href={quoteSummary.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyan-stamp w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm font-bold uppercase tracking-wider min-h-[50px]"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Agendar no WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleCopyMessage}
            className="btn-ink-outline w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider min-h-[44px]"
          >
            {copied ? (
              <Check className="w-4 h-4 text-[#0369A1]" aria-hidden="true" />
            ) : (
              <Copy className="w-4 h-4" aria-hidden="true" />
            )}
            <span>
              {copied
                ? 'Mensagem copiada!'
                : copyUnsupported
                  ? 'Selecione o texto acima para copiar'
                  : 'Copiar mensagem'}
            </span>
          </button>
        </div>

        <div className="space-y-2 text-[11px] text-[#3F3F46] leading-relaxed pt-1 border-t border-dashed border-[#111113]/30">
          <p>
            Sem pagamento antecipado no site. O orçamento final é confirmado no WhatsApp ou na
            avaliação técnica da peça/veículo na oficina.
          </p>
          <p className="flex items-start gap-1.5 text-[#52525B]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0369A1] shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Ao clicar em <strong>Agendar no WhatsApp</strong>, você será redirecionado à
              plataforma externa WhatsApp (Meta) exclusivamente para atendimento de orçamento.{' '}
              {onOpenPrivacyNotice && (
                <button
                  type="button"
                  onClick={onOpenPrivacyNotice}
                  className="underline font-semibold text-[#0369A1] hover:text-[#111113] focus-visible:outline-2 focus-visible:outline-[#0369A1]"
                >
                  Aviso de Privacidade
                </button>
              )}
            </span>
          </p>
        </div>
      </div>
    </aside>
  );
}
