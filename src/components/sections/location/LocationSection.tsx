import {
  Car,
  Check,
  CreditCard,
  ExternalLink,
  MapPin,
  MessageCircle,
  Navigation,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../../../data';
import type { BusinessStatus } from '../../../types';
import { buildWhatsAppUrl } from '../../../utils';
import { ScrollReveal } from '../../ui';
import { ScheduleTable } from './ScheduleTable';

interface LocationSectionProps {
  status: BusinessStatus;
}

export function LocationSection({ status }: LocationSectionProps) {
  const directWhatsAppUrl = buildWhatsAppUrl(
    BUSINESS_CONFIG.whatsappE164,
    `Olá Diogo! Vim pelo site da ${BUSINESS_CONFIG.name} e gostaria de agendar uma visita na oficina.`
  );

  return (
    <section
      id="localizacao"
      className="w-full bg-[#E4E0D8] text-[#111113] border-t-2 border-[#111113] overflow-x-clip"
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-14 sm:py-20">
        <ScrollReveal direction="up">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="font-mono text-sm sm:text-base font-bold text-[#C2410C]">
                04 //
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#52525B]">
                Onde Estamos • Localização e Horários
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight leading-[0.92] text-[#111113]">
              Visite nossa <span className="text-[#0369A1]">oficina</span> em Valença com rota em um
              toque.
            </h2>
            <p className="text-sm sm:text-base text-[#27272A] mt-2.5">
              Traga sua peça, capacete, roda ou veículo para avaliarmos o melhor projeto de
              personalização ou estética automotiva.
            </p>
          </div>
        </ScrollReveal>

        {/* Quadro Técnico Estrutural Único (dividido por linhas secas pretas 2px, sem cards soltos) */}
        <ScrollReveal direction="up" delayMs={80}>
          <div className="border-2 border-[#111113] bg-[#F8F6F2] grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#111113]">
            {/* Coluna Esquerda: Endereço + WhatsApp + Tabela de Horários + Pagamento/Leva e Traz */}
            <div className="lg:col-span-5 divide-y-2 divide-[#111113] flex flex-col justify-between">
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0369A1] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#52525B] block mb-1">
                      Endereço da Oficina
                    </span>
                    <p className="font-display text-2xl font-extrabold uppercase tracking-tight leading-tight text-[#111113]">
                      {BUSINESS_CONFIG.streetAddress}
                    </p>
                    <p className="text-sm text-[#27272A] mt-0.5">{BUSINESS_CONFIG.neighborhood}</p>
                    <p className="font-mono text-xs font-semibold text-[#52525B] mt-1 tabular-nums">
                      CEP {BUSINESS_CONFIG.cep}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-4 border-t border-dashed border-[#111113]/35">
                  <div className="flex items-start gap-3 min-w-0">
                    <MessageCircle
                      className="w-5 h-5 text-[#C2410C] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#52525B] block">
                        Atendimento Direto
                      </span>
                      <p className="font-mono text-sm font-bold text-[#111113] tabular-nums truncate">
                        {BUSINESS_CONFIG.whatsappDisplay} — {BUSINESS_CONFIG.ownerName}
                      </p>
                    </div>
                  </div>
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ink-primary px-3.5 py-2 text-xs font-bold uppercase tracking-wider shrink-0"
                  >
                    Chamar
                  </a>
                </div>
              </div>

              {/* Tabela Semanal Integrada */}
              <ScheduleTable status={status} />

              {/* Rodapé Duplo: Pagamento e Leva e Traz */}
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[#111113]">
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#111113] mb-2.5">
                    <CreditCard className="w-4 h-4 text-[#C2410C]" aria-hidden="true" />
                    <span>Pagamento</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-[#27272A]">
                    {BUSINESS_CONFIG.paymentMethods.map((method) => (
                      <li key={method} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#0369A1] shrink-0" aria-hidden="true" />
                        <span>{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#111113] mb-2.5">
                    <Car className="w-4 h-4 text-[#0369A1]" aria-hidden="true" />
                    <span>Leva e Traz</span>
                  </div>
                  <p className="text-xs text-[#27272A] leading-relaxed">
                    {BUSINESS_CONFIG.pickupSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* Coluna Direita: Barra de Rotas GPS acoplada à moldura preta do Mapa */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="p-5 sm:p-6 bg-[#EFECE6] border-b-2 border-[#111113]">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#C2410C] block mb-1">
                      Navegação Direta GPS
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight leading-none text-[#111113]">
                      Rua Geraldo Pereira da Costa, 290 — João Bonito
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={BUSINESS_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cyan-stamp inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider min-h-[48px]"
                  >
                    <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Traçar Rota no Google Maps</span>
                  </a>

                  <a
                    href={BUSINESS_CONFIG.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ink-outline inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider min-h-[48px]"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Abrir no Waze</span>
                  </a>
                </div>
              </div>

              {/* Google Maps integrado em moldura estrutural clara */}
              <div className="w-full bg-[#E4E0D8] h-[300px] sm:h-[460px] lg:flex-1 lg:min-h-[440px]">
                <iframe
                  title="Mapa de localização DS Arte Automotiva - Valença RJ"
                  src={BUSINESS_CONFIG.googleMapsEmbedUrl}
                  className="w-full h-full border-0 block"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
