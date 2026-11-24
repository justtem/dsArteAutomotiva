import { ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../data';
import { BrandLogo } from '../ui';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#07090C] text-[#94A3B8] pb-28 md:pb-10">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <BrandLogo />
          <div className="text-xs space-y-1 md:text-right">
            <p className="text-white font-medium">
              {BUSINESS_CONFIG.ownerName} • {BUSINESS_CONFIG.address}
            </p>
            <p className="tabular-nums text-[#38BDF8]">
              WhatsApp oficial: {BUSINESS_CONFIG.whatsappDisplay}
            </p>
          </div>
        </div>

        <div className="pt-5 space-y-3 text-xs">
          <div className="surface-gunmetal flex items-start gap-2.5 p-4 rounded-2xl">
            <ShieldCheck className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-[#CBD5E1] leading-relaxed">
              <strong className="text-white">Privacidade e LGPD:</strong> esta página não armazena
              dados pessoais em formulários próprios — o orçamento e o agendamento acontecem
              diretamente no WhatsApp da {BUSINESS_CONFIG.name}. Ao publicar fotos reais dos
              veículos, mantenha as placas cobertas ou borradas.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[#94A3B8]">
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
