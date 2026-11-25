import { ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../data';
import { BrandLogo } from '../ui';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0B0B0D] text-[#A1A1AA] border-t-2 border-[#111113] pb-28 md:pb-12">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-7 border-b border-[#27272F]">
          <BrandLogo />
          <div className="text-xs space-y-1.5 md:text-right">
            <p className="text-[#F5F5F4] font-semibold">
              {BUSINESS_CONFIG.ownerName} • {BUSINESS_CONFIG.address}
            </p>
            <p className="font-mono tabular-nums text-[#0EA5E9]">
              WhatsApp oficial: {BUSINESS_CONFIG.whatsappDisplay}
            </p>
          </div>
        </div>

        <div className="pt-6 space-y-4 text-xs">
          <div className="bg-[#141418] border border-[#27272F] rounded-[2px] flex items-start gap-3 p-4">
            <ShieldCheck className="w-4 h-4 text-[#0EA5E9] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-[#D4D4D8] leading-relaxed">
              <strong className="text-[#F5F5F4]">Privacidade e LGPD:</strong> esta página não
              armazena dados pessoais em formulários próprios — o orçamento e o agendamento
              acontecem diretamente no WhatsApp da {BUSINESS_CONFIG.name}.
            </p>
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
