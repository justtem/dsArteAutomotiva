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
    <section id="localizacao" className="w-full bg-[#0B0D12] text-white">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12 sm:py-16">
        <ScrollReveal direction="up">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#38BDF8] block mb-2">
              Onde Estamos • Localização e Horários
            </span>
            <h2 className="font-display italic text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Visite nossa <span className="text-hydro-dip pr-1">oficina</span> em Valença com rota
              em um toque.
            </h2>
            <p className="text-sm text-[#94A3B8] mt-2">
              Traga sua peça, capacete, roda ou veículo para avaliarmos o melhor projeto de
              personalização ou estética automotiva.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Esquerda: Endereço real, contato Diogo Soares, tabela de horários, pagamento e Leva e Traz */}
          <ScrollReveal direction="left" delayMs={80} className="lg:col-span-5 space-y-5">
            <div className="surface-gunmetal p-5 rounded-2xl space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] block mb-1">
                    Endereço Completo
                  </span>
                  <p className="text-base font-bold text-white">{BUSINESS_CONFIG.streetAddress}</p>
                  <p className="text-sm text-[#CBD5E1] mt-0.5">{BUSINESS_CONFIG.neighborhood}</p>
                  <p className="text-xs text-[#94A3B8] mt-1 tabular-nums">
                    CEP {BUSINESS_CONFIG.cep}
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-3 pt-3.5 border-t border-[#1E293B]">
                <div className="flex items-start gap-3">
                  <MessageCircle
                    className="w-5 h-5 text-[#60A5FA] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] block mb-0.5">
                      Atendimento & Orçamentos
                    </span>
                    <p className="text-sm font-bold text-white tabular-nums">
                      {BUSINESS_CONFIG.whatsappDisplay} — {BUSINESS_CONFIG.ownerName}
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      Atendimento com hora marcada e via WhatsApp
                    </p>
                  </div>
                </div>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-sm bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-semibold transition-colors shrink-0"
                >
                  Chamar
                </a>
              </div>
            </div>

            {/* Tabela semanal de horários destacando o dia atual */}
            <ScheduleTable status={status} />

            {/* Pagamentos e Leva e Traz */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="surface-gunmetal p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-2">
                  <CreditCard className="w-4 h-4 text-[#FB923C]" aria-hidden="true" />
                  <span>Formas de pagamento</span>
                </div>
                <ul className="space-y-1 text-xs text-[#CBD5E1]">
                  {BUSINESS_CONFIG.paymentMethods.map((method) => (
                    <li key={method} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" aria-hidden="true" />
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-gunmetal p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-2">
                  <Car className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
                  <span>Leva e Traz</span>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {BUSINESS_CONFIG.pickupSummary}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Direita: Botões de Rota + Mapa Google Maps Interativo Incorporado */}
          <ScrollReveal direction="right" delayMs={140} className="lg:col-span-7 space-y-4">
            <div className="surface-gunmetal p-5 sm:p-6 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#FB923C] block mb-1">
                    Navegação Direta GPS
                  </span>
                  <h3 className="font-display italic text-2xl font-bold text-white">
                    Rua Geraldo Pereira da Costa, 290 — João Bonito
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <a
                  href={BUSINESS_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-liquid-coat btn-chrome-shine inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-bold min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  <span>Traçar Rota no Google Maps</span>
                </a>

                <a
                  href={BUSINESS_CONFIG.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-chrome-dark inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-bold min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  <ExternalLink className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
                  <span>Abrir no Waze</span>
                </a>
              </div>

              {/* Google Maps Interativo Incorporado (altura calibrada no celular para não travar a rolagem) */}
              <div className="rounded-xl overflow-hidden border border-white/12 bg-[#0B0D12] h-[270px] sm:h-[430px]">
                <iframe
                  title="Mapa de localização DS Arte Automotiva - Valença RJ"
                  src={BUSINESS_CONFIG.googleMapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
