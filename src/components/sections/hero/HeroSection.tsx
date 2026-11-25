import { useState } from 'react';
import { CreditCard, Flame, MapPin, MessageCircle, SlidersHorizontal } from 'lucide-react';
import { BUSINESS_CONFIG, PROCESS_HOTSPOTS } from '../../../data';
import type { BusinessStatus, ProcessHotspotId } from '../../../types';
import { ScrollReveal } from '../../ui';
import { ProcessCarInspector } from './ProcessCarInspector';

interface HeroSectionProps {
  status: BusinessStatus;
  quickWhatsAppUrl: string;
}

export function HeroSection({ status, quickWhatsAppUrl }: HeroSectionProps) {
  const [activeHotspotId, setActiveHotspotId] = useState<ProcessHotspotId>(PROCESS_HOTSPOTS[0].id);

  return (
    <section
      id="topo"
      className="relative w-full bg-[#0B0D12] text-white lg:min-h-[calc(100vh-5rem)] flex items-center overflow-hidden"
    >
      {/* Luzes atmosféricas otimizadas para GPU mobile */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/4 w-72 sm:w-[540px] h-52 sm:h-[290px] rounded-full bg-[#29B6F6]/15 blur-[80px] sm:blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-4 w-56 sm:w-[340px] h-44 sm:h-[220px] rounded-full bg-[#FB923C]/12 blur-[75px] sm:blur-[110px]"
      />

      <div
        id="processo"
        className="relative w-full px-4 sm:px-6 lg:px-10 xl:px-14 pt-7 pb-6 sm:py-14 lg:py-14"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
          {/* Coluna Esquerda */}
          <ScrollReveal direction="up" className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Badges compactos no celular */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141821] border border-[#38BDF8]/30 text-[11px] sm:text-xs font-semibold text-[#38BDF8]">
                  <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{BUSINESS_CONFIG.city}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141821] border border-white/10 text-[11px] sm:text-xs font-medium text-[#CBD5E1] tabular-nums">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      status.isOpen ? 'bg-[#FB923C] animate-pulse' : 'bg-[#64748B]'
                    }`}
                    aria-hidden="true"
                  />
                  {status.badgeText}
                </span>
              </div>

              {/* Medalhão da Logo centralizado no mobile e alinhado à esquerda a partir do sm */}
              <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-4 sm:gap-5 mb-5">
                <div className="relative shrink-0">
                  <div
                    aria-hidden="true"
                    className="animate-liquid-blob absolute -inset-2 bg-gradient-to-tr from-[#29B6F6] via-[#0284C7] to-[#FB923C] opacity-80 blur-[6px]"
                  />
                  <img
                    src={BUSINESS_CONFIG.logoUrl}
                    alt={BUSINESS_CONFIG.name}
                    width={96}
                    height={96}
                    className="relative w-24 h-24 rounded-full object-cover border-2 border-[#E2E8F0] shadow-2xl shrink-0"
                  />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#FB923C] mb-1">
                    <Flame className="w-3.5 h-3.5" aria-hidden="true" />
                    {BUSINESS_CONFIG.ownerName}
                  </span>
                  <span className="font-display italic block text-2xl sm:text-3xl font-bold text-white leading-none">
                    {BUSINESS_CONFIG.tagline}
                  </span>
                </div>
              </div>

              <h1 className="font-display italic text-center sm:text-left text-[33px] sm:text-5xl lg:text-[52px] font-bold tracking-tight leading-[1.07] text-white mb-4 sm:mb-5">
                Estética automotiva, pintura e{' '}
                <span className="font-drip not-italic text-hydro-dip inline-block">ARTE</span> no
                detalhe.
              </h1>

              <p className="text-center sm:text-left text-sm sm:text-base text-[#CBD5E1] leading-relaxed mb-6 sm:mb-7">
                Oficina de estética automotiva e customização com hora marcada, especialista em{' '}
                <span className="text-[#38BDF8] font-semibold">
                  Pintura Hidrográfica (WTP), Candy, Camaleão, Cristal 3D, Cromo, Flake,
                  Termocrômica, Aerografia e Revitalização de Faróis
                </span>
                .
              </p>

              {/* CTAs táteis de largura cheia no celular (52px de altura para polegar) */}
              <div className="grid grid-cols-1 sm:flex sm:flex-row gap-3 mb-7">
                <a
                  href="#simulador"
                  className="btn-liquid-coat btn-chrome-shine inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-white text-sm font-bold tracking-wide min-h-[52px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                  <span>Simular pintura / estética</span>
                </a>

                <a
                  href={quickWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-chrome-dark inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-white text-sm font-bold tracking-wide min-h-[52px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
                >
                  <MessageCircle className="w-4 h-4 text-[#38BDF8]" aria-hidden="true" />
                  <span>Agendar no WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Faixa compacta em Gunmetal escovado */}
            <div className="surface-gunmetal grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10 rounded-2xl overflow-hidden">
              <div className="p-3.5 sm:p-4">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" aria-hidden="true" />
                  <span>Endereço e referência</span>
                </div>
                <p className="text-xs font-semibold text-white leading-snug">
                  {BUSINESS_CONFIG.streetAddress}
                </p>
                <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-snug">
                  {BUSINESS_CONFIG.neighborhood} • {BUSINESS_CONFIG.whatsappDisplay}
                </p>
              </div>
              <div className="p-3.5 sm:p-4">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1">
                  <CreditCard className="w-3.5 h-3.5 text-[#FB923C]" aria-hidden="true" />
                  <span>Pagamento & Conveniência</span>
                </div>
                <p className="text-xs font-semibold text-white leading-snug">
                  Pix, Débito e Crédito até 3x
                </p>
                <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-snug">
                  Leva e traz agendado • Hoje: {status.todayHours}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Coluna Direita: Inspetor Interativo */}
          <ScrollReveal direction="up" delayMs={100} className="lg:col-span-7 min-w-0">
            <ProcessCarInspector
              activeHotspotId={activeHotspotId}
              onSelectHotspot={setActiveHotspotId}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
