import { FileText, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../data';
import { BrandLogo } from '../ui';

interface FooterProps {
  onOpenPrivacyNotice: () => void;
}

export function Footer({ onOpenPrivacyNotice }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0B0B0D] text-[#A1A1AA] border-t-2 border-[#111113] pb-28 md:pb-12">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-7 border-b border-[#27272F]">
          <BrandLogo />
          <div className="text-xs space-y-1.5 md:text-right">
            <p className="text-[#F5F5F4] font-semibold">
              {BUSINESS_CONFIG.controllerDisplayName}
              {BUSINESS_CONFIG.cnpj ? ` • CNPJ ${BUSINESS_CONFIG.cnpj}` : ''}
            </p>
            <p className="text-[#A1A1AA]">
              {BUSINESS_CONFIG.address} — CEP {BUSINESS_CONFIG.cep}
            </p>
            <p className="font-mono tabular-nums text-[#0EA5E9]">
              WhatsApp oficial & Canal LGPD: {BUSINESS_CONFIG.whatsappDisplay}
            </p>
          </div>
        </div>

        <div className="pt-6 space-y-4 text-xs">
          <div className="bg-[#141418] border border-[#27272F] rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#0EA5E9] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-[#D4D4D8] leading-relaxed">
                <strong className="text-[#F5F5F4]">Privacidade e LGPD:</strong> este site não possui
                banco de cadastro próprio nem cookies publicitários. As fontes são locais, o mapa do
                Google só carrega sob sua ativação e o atendimento de orçamento ocorre mediante
                redirecionamento voluntário ao WhatsApp da {BUSINESS_CONFIG.name}.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenPrivacyNotice}
              className="btn-dark-secondary shrink-0 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-wider min-h-[40px]"
            >
              <FileText className="w-3.5 h-3.5 text-[#0EA5E9]" aria-hidden="true" />
              <span>Aviso de Privacidade e Direitos</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[#A1A1AA]">
            <p>
              &copy; {currentYear} {BUSINESS_CONFIG.name}. Todos os direitos reservados.
            </p>
            <span className="font-mono text-[11px] whitespace-nowrap">
              Fuso: America/Sao_Paulo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
