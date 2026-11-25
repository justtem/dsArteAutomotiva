import { useState } from 'react';
import { CreditCard, MapPin, MessageCircle, SlidersHorizontal } from 'lucide-react';
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
      className="relative w-full bg-[#0B0B0D] bg-asphalt-grid text-[#F5F5F4] overflow-hidden"
    >
      {/* Luz zenital suave de cabine de pintura */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hero-zenith-glow" />

      <div
        id="processo"
        className="relative w-full px-4 sm:px-6 lg:px-10 xl:px-14 pt-8 pb-12 sm:pt-12 sm:pb-16"
      >
        {/* ANDAR 1: Cabeçalho Pôster Editorial Assimétrico com entrada escalonada imediata */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 pb-8 sm:pb-10 border-b border-[#27272F] items-end">
          {/* Bloco Esquerdo Dominante: Eyebrow + Título Monumental de Pôster */}
          <div className="lg:col-span-8">
            <div
              className="animate-hero-in flex flex-wrap items-center gap-3 mb-4"
              style={{ animationDelay: '40ms' }}
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-[#141418] border border-[#27272F] font-mono text-[11px] font-semibold uppercase tracking-wider text-[#F5F5F4]">
                <MapPin className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" aria-hidden="true" />
                <span>{BUSINESS_CONFIG.city}</span>
              </span>
              <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] text-[#F97316]">
                // {BUSINESS_CONFIG.tagline}
              </span>
            </div>

            <h1
              className="animate-hero-in font-display text-[clamp(2.85rem,7vw,6.1rem)] font-extrabold uppercase tracking-tight leading-[0.9] text-[#F5F5F4]"
              style={{ animationDelay: '120ms' }}
            >
              Estética automotiva, pintura e{' '}
              <span className="text-[#0EA5E9]">ARTE</span> no detalhe.
            </h1>
          </div>

          {/* Coluna Direita Enxuta: Manifesto Técnico + 2 CTAs + Linha Rápida */}
          <div
            className="animate-hero-in lg:col-span-4 lg:border-l lg:border-[#27272F] lg:pl-8 flex flex-col justify-between gap-5"
            style={{ animationDelay: '210ms' }}
          >
            <p className="text-sm sm:text-[15px] text-[#A1A1AA] leading-relaxed">
              Estúdio de customização automotiva com hora marcada, especialista em{' '}
              <strong className="text-[#F5F5F4] font-semibold">
                Pintura Hidrográfica (WTP), Candy, Camaleão, Cristal 3D, Cromo, Flake,
                Termocrômica, Aerografia e Revitalização de Faróis
              </strong>
              .
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              <a
                href="#simulador"
                className="btn-dark-primary inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider min-h-[50px]"
              >
                <SlidersHorizontal className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Simular Pintura / OS</span>
              </a>

              <a
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dark-secondary inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider min-h-[50px]"
              >
                <MessageCircle className="w-4 h-4 text-[#0EA5E9] shrink-0" aria-hidden="true" />
                <span>Agendar no WhatsApp</span>
              </a>
            </div>

            <div className="pt-3.5 border-t border-[#27272F] flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 font-mono text-[11px] text-[#A1A1AA]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0" aria-hidden="true" />
                <span>{BUSINESS_CONFIG.streetAddress}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#F97316] shrink-0" aria-hidden="true" />
                <span>Pix • Cartão até 3x ({status.todayHours})</span>
              </span>
            </div>
          </div>
        </div>

        {/* ANDAR 2: Palco Widescreen do Inspetor de Pintura & Estética (Largura Total) */}
        <ScrollReveal direction="up" delayMs={90} className="mt-8 sm:mt-10">
          <ProcessCarInspector
            activeHotspotId={activeHotspotId}
            onSelectHotspot={setActiveHotspotId}
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
