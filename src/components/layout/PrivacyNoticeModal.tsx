import { useEffect, useRef } from 'react';
import { MessageCircle, ShieldCheck, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../data';
import { buildWhatsAppUrl } from '../../utils';

interface PrivacyNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyNoticeModal({ isOpen, onClose }: PrivacyNoticeModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousActiveElementRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const lgpdChannelWhatsappUrl = buildWhatsAppUrl(
    BUSINESS_CONFIG.whatsappE164,
    BUSINESS_CONFIG.privacyWhatsappMessage
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-notice-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="animate-modal-backdrop fixed inset-0 z-50 bg-[#0B0B0D]/90 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="animate-modal-card bg-[#F8F6F2] text-[#111113] border-t-2 sm:border-2 border-[#111113] sm:shadow-[8px_8px_0px_#0EA5E9] w-full sm:max-w-2xl rounded-none overflow-hidden max-h-[90dvh] flex flex-col">
        {/* Cabeçalho Técnico */}
        <div className="px-5 py-4 bg-[#111113] text-[#F8F6F2] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <ShieldCheck className="w-5 h-5 text-[#0EA5E9] shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#F97316] block">
                Transparência & Proteção de Dados // Lei nº 13.709/2018
              </span>
              <h2
                id="privacy-notice-modal-title"
                className="font-display text-2xl font-extrabold uppercase tracking-wide text-[#F8F6F2] leading-none truncate"
              >
                Aviso de Privacidade e Direitos LGPD
              </h2>
            </div>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar Aviso de Privacidade"
            className="btn-dark-secondary w-9 h-9 flex items-center justify-center shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Conteúdo Estruturado */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5 text-xs sm:text-sm text-[#27272A] leading-relaxed">
          <section className="p-4 bg-[#EFECE6] border-2 border-[#111113] space-y-1.5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]">
              1. Controlador e Canal de Atendimento ao Titular (Arts. 9º e 41 § 1º)
            </h3>
            <p>
              <strong>Responsável (Controlador):</strong> {BUSINESS_CONFIG.controllerDisplayName}
              {BUSINESS_CONFIG.legalName ? ` (${BUSINESS_CONFIG.legalName})` : ''}
              {BUSINESS_CONFIG.cnpj ? ` • CNPJ: ${BUSINESS_CONFIG.cnpj}` : ''}.
            </p>
            <p>
              <strong>Endereço:</strong> {BUSINESS_CONFIG.address} — CEP {BUSINESS_CONFIG.cep}.
            </p>
            <p>
              <strong>Canal gratuito para direitos LGPD:</strong> WhatsApp oficial{' '}
              <span className="font-mono font-semibold text-[#111113]">
                {BUSINESS_CONFIG.whatsappDisplay}
              </span>
              {BUSINESS_CONFIG.privacyEmail ? ` ou e-mail ${BUSINESS_CONFIG.privacyEmail}` : ''}.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0369A1]">
              2. Como Seus Dados São Tratados Nesta Página
            </h3>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Navegação sem rastreadores ocultos:</strong> este site não possui banco de
                dados próprio de cadastro, não grava dados em <code>localStorage</code>/cookies de
                perfilamento e utiliza fontes auto-hospedadas localmente.
              </li>
              <li>
                <strong>Hospedagem e entrega técnica:</strong> para entregar a página com segurança,
                a infraestrutura de borda (<strong>Vercel Inc.</strong>) processa automaticamente
                endereço IP, navegador (<code>User-Agent</code>) e registros técnicos de conexão.
              </li>
              <li>
                <strong>Comparador de fotos Antes e Depois:</strong> imagens selecionadas por você
                permanecem exclusivamente na memória temporária do seu próprio navegador, passam por
                remoção local de metadados EXIF/GPS e são descartadas ao limpar ou fechar a aba.
              </li>
              <li>
                <strong>Mapa sob demanda (Click-to-Load):</strong> o mapa interativo do{' '}
                <strong>Google Maps</strong> permanece bloqueado por padrão e só estabelece conexão
                com servidores da Google LLC se você clicar em <em>&ldquo;Ativar Mapa Interativo&rdquo;</em>{' '}
                ou abrir rotas externas no Google Maps / Waze.
              </li>
              <li>
                <strong>Orçamento e agendamento via WhatsApp:</strong> ao clicar nos botões de
                WhatsApp, seu aplicativo abrirá uma conversa com a {BUSINESS_CONFIG.name} enviando a
                prévia do orçamento. A partir do envio voluntário da mensagem, trataremos seu número
                de telefone, nome de perfil, informações da peça/veículo e eventual endereço de{' '}
                <em>Leva e Traz</em> combinado no atendimento.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0369A1]">
              3. Finalidades e Hipóteses Legais de Referência (Art. 7º)
            </h3>
            <p>
              Os dados são tratados estritamente para: (a) responder pedidos de orçamento, agendar
              avaliações e executar serviços solicitados pelo titular (procedimentos preliminares ou
              execução de contrato — Art. 7º, V); (b) segurança e disponibilidade técnica da página
              (legítimo interesse — Art. 7º, IX); e (c) cumprimento de obrigações legais, fiscais e
              de garantia quando houver prestação de serviço (Art. 7º, II).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0369A1]">
              4. Operadores, Terceiros e Transferência Internacional (Art. 33)
            </h3>
            <p>
              Não comercializamos dados pessoais. O processamento envolve provedores de tecnologia
              que podem operar servidores fora do Brasil (especialmente nos EUA):{' '}
              <strong>Vercel Inc.</strong> (hospedagem/CDN), <strong>WhatsApp LLC / Meta</strong>{' '}
              (quando você inicia atendimento via WhatsApp) e <strong>Google LLC / Waze</strong>{' '}
              (apenas quando você ativa o mapa ou solicita rota GPS), regidos por suas respectivas
              políticas de privacidade e cláusulas de proteção de dados.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0369A1]">
              5. Retenção, Descarte e Seus Direitos (Arts. 15, 16 e 18)
            </h3>
            <p>
              Conversas de orçamento e registros de serviço no WhatsApp são mantidos pelo período
              necessário ao atendimento, prazos de garantia legal e obrigações fiscais aplicáveis,
              sendo eliminados após o término da finalidade.
            </p>
            <p>
              Nos termos do <strong>Art. 18 da LGPD</strong>, você pode solicitar gratuitamente a
              qualquer momento: confirmação da existência de tratamento, acesso aos seus dados,
              correção de dados incompletos/inexatos, anonimização ou eliminação de dados
              desnecessários, portabilidade (quando aplicável), informações sobre compartilhamento,
              revogação de consentimento (quando aplicável) e peticionamento perante a Autoridade
              Nacional de Proteção de Dados — ANPD (Art. 18, § 1º).
            </p>
          </section>

          <p className="font-mono text-[11px] text-[#52525B] pt-2 border-t border-dashed border-[#111113]/30">
            Última atualização deste Aviso Técnico: {BUSINESS_CONFIG.privacyUpdatedAt}.
          </p>
        </div>

        {/* Rodapé de Ação do Titular */}
        <div className="px-5 py-3.5 pb-safe bg-[#EFECE6] border-t-2 border-[#111113] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <a
            href={lgpdChannelWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyan-stamp inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider min-h-[44px]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Solicitar Atendimento LGPD (Art. 18)</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="btn-ink-outline px-5 py-2.5 text-xs font-bold uppercase tracking-wider min-h-[44px]"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
