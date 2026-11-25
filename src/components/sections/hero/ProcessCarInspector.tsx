import { useRef, type TouchEvent } from 'react';
import { Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { PROCESS_HOTSPOTS } from '../../../data';
import type { ProcessHotspotId } from '../../../types';
import { CardTopPaintDrip } from '../../ui';

interface ProcessCarInspectorProps {
  activeHotspotId: ProcessHotspotId;
  onSelectHotspot: (id: ProcessHotspotId) => void;
}

/**
 * Inspetor interativo de Pintura & Estética Automotiva em SVG Dark Mode com suporte a toque 44px e swipe mobile
 */
export function ProcessCarInspector({
  activeHotspotId,
  onSelectHotspot,
}: ProcessCarInspectorProps) {
  const activeIndex = Math.max(
    0,
    PROCESS_HOTSPOTS.findIndex((item) => item.id === activeHotspotId)
  );
  const active = PROCESS_HOTSPOTS[activeIndex] || PROCESS_HOTSPOTS[0];
  const touchStartX = useRef<number | null>(null);

  const selectByDelta = (delta: number) => {
    const nextIdx = (activeIndex + delta + PROCESS_HOTSPOTS.length) % PROCESS_HOTSPOTS.length;
    onSelectHotspot(PROCESS_HOTSPOTS[nextIdx].id);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const diff = touchStartX.current - endX;
    touchStartX.current = null;
    if (Math.abs(diff) > 45) {
      selectByDelta(diff > 0 ? 1 : -1);
    }
  };

  return (
    <div
      className="surface-gunmetal rounded-2xl overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <CardTopPaintDrip variant="cyan" />

      {/* Cabeçalho do inspetor com setas rápidas para polegar no mobile */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/10 bg-[#0B0D12]/80">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#29B6F6] to-[#FB923C] shrink-0"
            aria-hidden="true"
          />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] text-[#E2E8F0] truncate">
            Inspetor de Pintura & Estética
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => selectByDelta(-1)}
            aria-label="Especialidade anterior"
            className="sm:hidden w-8 h-8 rounded-lg bg-[#141821] border border-white/10 text-[#38BDF8] flex items-center justify-center active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-mono font-bold tabular-nums text-[#38BDF8] px-1">
            {active.number}/04
          </span>
          <button
            type="button"
            onClick={() => selectByDelta(1)}
            aria-label="Próxima especialidade"
            className="sm:hidden w-8 h-8 rounded-lg bg-[#141821] border border-white/10 text-[#38BDF8] flex items-center justify-center active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Barra legível de Zona no mobile */}
      <div className="sm:hidden flex items-center justify-between gap-2 px-4 py-2 bg-[#0B0D12] border-b border-white/6 text-[11px]">
        <span className="text-[#94A3B8] truncate">Aplicação: {active.zoneLabel}</span>
        <span className="text-[#FB923C] font-bold tabular-nums shrink-0">
          {active.estimatedTime}
        </span>
      </div>

      {/* Diagrama técnico dark mode */}
      <div className="relative px-2 sm:px-4 pt-4 sm:pt-6 pb-3 sm:pb-4 bg-[#0B0F16]">
        <svg
          viewBox="0 0 600 250"
          className="w-full h-auto block"
          role="img"
          aria-label={`Diagrama técnico destacando a especialidade ${active.number}: ${active.title}`}
        >
          <defs>
            <pattern id="darkTechGrid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#161D29" strokeWidth="1" />
            </pattern>
            <linearGradient id="candyBodySheen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#29B6F6" stopOpacity="0.34" />
              <stop offset="55%" stopColor="#A855F7" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#FB923C" stopOpacity="0.34" />
            </linearGradient>
          </defs>
          <rect width="600" height="250" fill="url(#darkTechGrid)" />

          {/* Linha de piso */}
          <line x1="28" y1="204" x2="572" y2="204" stroke="#1E293B" strokeWidth="1.5" />
          <line
            x1="60"
            y1="212"
            x2="540"
            y2="212"
            stroke="#161D29"
            strokeWidth="1"
            strokeDasharray="6 6"
          />

          {/* Destaques visuais por especialidade de pintura */}
          {activeHotspotId === 'pintura-especiais' && (
            <g>
              <path
                d="M84 166 C94 120, 146 102, 232 98 L402 104 L402 168 L84 168 Z"
                fill="url(#candyBodySheen)"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeDasharray="5 3"
              />
              {[130, 168, 206, 254, 298, 342].map((cx, i) => (
                <circle
                  key={cx}
                  cx={cx}
                  cy={124 + (i % 3) * 14}
                  r="2.2"
                  fill={i % 2 === 0 ? '#FDE047' : '#38BDF8'}
                />
              ))}
            </g>
          )}

          {activeHotspotId === 'hidrografica-wtp' && (
            <g>
              <path
                d="M204 106 C244 74, 340 72, 412 106 L412 134 L204 134 Z"
                fill="#29B6F6"
                fillOpacity="0.24"
                stroke="#38BDF8"
                strokeWidth="1.5"
              />
              <circle
                cx="220"
                cy="105"
                r="14"
                fill="#FB923C"
                fillOpacity="0.25"
                stroke="#FB923C"
                strokeWidth="1.3"
              />
            </g>
          )}

          {activeHotspotId === 'rodas-candy' && (
            <g>
              <circle
                cx="448"
                cy="172"
                r="40"
                fill="#A855F7"
                fillOpacity="0.26"
                stroke="#FB923C"
                strokeWidth="1.8"
                strokeDasharray="4 3"
              />
              <circle
                cx="152"
                cy="172"
                r="38"
                fill="#A855F7"
                fillOpacity="0.18"
                stroke="#C084FC"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />
            </g>
          )}

          {activeHotspotId === 'farois-verniz' && (
            <g>
              <polygon
                points="74,132 22,112 22,162 74,144"
                fill="#38BDF8"
                fillOpacity="0.28"
              />
              <circle
                cx="88"
                cy="136"
                r="24"
                fill="#29B6F6"
                fillOpacity="0.24"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
            </g>
          )}

          {/* Silhueta técnica do veículo */}
          <g stroke="#E2E8F0" strokeWidth="2" fill="none" strokeLinejoin="round">
            <path
              d="M78 172 L66 164 C64 148, 70 130, 86 121 L168 106 L228 69 C264 60, 344 60, 394 74 L446 105 L516 116 C528 120, 534 134, 534 150 L530 168 L492 172"
              fill="#121720"
              fillOpacity="0.88"
            />
            <line x1="194" y1="172" x2="406" y2="172" stroke="#E2E8F0" strokeWidth="2" />
            <path d="M90 132 L512 128" stroke="#475569" strokeWidth="1.2" />
            <path
              d="M196 108 L238 77 C272 70, 336 70, 382 81 L422 108 Z"
              fill={activeHotspotId === 'hidrografica-wtp' ? '#29B6F6' : '#07090C'}
              fillOpacity={activeHotspotId === 'hidrografica-wtp' ? '0.32' : '0.92'}
              stroke="#94A3B8"
              strokeWidth="1.4"
            />
            <line x1="305" y1="73" x2="302" y2="170" stroke="#64748B" strokeWidth="1.2" />
            <line x1="210" y1="108" x2="206" y2="170" stroke="#334155" strokeWidth="1" />
            <line x1="402" y1="108" x2="404" y2="155" stroke="#334155" strokeWidth="1" />
            <path
              d="M214 102 L228 100 L228 110 L212 110 Z"
              fill={activeHotspotId === 'hidrografica-wtp' ? '#FB923C' : '#121720'}
              stroke="#CBD5E1"
              strokeWidth="1.4"
            />
            <path
              d="M74 135 L108 128 L102 140 L72 143 Z"
              fill={activeHotspotId === 'farois-verniz' ? '#FFFFFF' : '#29B6F6'}
              fillOpacity="0.9"
              stroke="#38BDF8"
              strokeWidth="1.3"
            />
            <path
              d="M512 122 L531 126 L531 138 L508 136 Z"
              fill="#1E293B"
              stroke="#94A3B8"
              strokeWidth="1.1"
            />
            <line x1="274" y1="120" x2="290" y2="120" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="366" y1="120" x2="382" y2="120" stroke="#CBD5E1" strokeWidth="2" />
          </g>

          {/* Roda Dianteira */}
          <g transform="translate(152, 172)">
            <circle
              r="31"
              fill="#07090C"
              stroke={activeHotspotId === 'rodas-candy' ? '#C084FC' : '#E2E8F0'}
              strokeWidth="2"
            />
            <circle r="21" fill="#121720" stroke="#94A3B8" strokeWidth="1.4" />
            <circle r="5.5" fill={activeHotspotId === 'rodas-candy' ? '#C084FC' : '#29B6F6'} />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <line
                key={deg}
                x1="0"
                y1="-6"
                x2="0"
                y2="-20"
                stroke={activeHotspotId === 'rodas-candy' ? '#C084FC' : '#94A3B8'}
                strokeWidth="1.5"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>

          {/* Roda Traseira */}
          <g transform="translate(448, 172)">
            <circle
              r="31"
              fill="#07090C"
              stroke={activeHotspotId === 'rodas-candy' ? '#FB923C' : '#E2E8F0'}
              strokeWidth="2"
            />
            <circle r="21" fill="#121720" stroke="#94A3B8" strokeWidth="1.4" />
            <circle r="5.5" fill={activeHotspotId === 'rodas-candy' ? '#FB923C' : '#29B6F6'} />
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <line
                key={deg}
                x1="0"
                y1="-6"
                x2="0"
                y2="-20"
                stroke={activeHotspotId === 'rodas-candy' ? '#C084FC' : '#94A3B8'}
                strokeWidth="1.5"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>

          {/* Cotas técnicas no SVG apenas em telas sm+ */}
          <text
            x="28"
            y="25"
            fill="#94A3B8"
            fontSize="10"
            fontFamily="monospace"
            className="hidden sm:block"
          >
            APLICAÇÃO: {active.zoneLabel.toUpperCase()}
          </text>
          <text
            x="432"
            y="25"
            fill="#FB923C"
            fontSize="10"
            fontFamily="monospace"
            className="hidden sm:block"
          >
            TÉCNICA: {active.estimatedTime.toUpperCase()}
          </text>
        </svg>

        {/* Pontos numerados com área de toque de 44x44px para polegar no celular */}
        {PROCESS_HOTSPOTS.map((stage) => {
          const isSelected = stage.id === activeHotspotId;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onSelectHotspot(stage.id)}
              style={{ left: `${stage.hotspot.x}%`, top: `${stage.hotspot.y}%` }}
              aria-label={`Inspecionar especialidade ${stage.number}: ${stage.title}`}
              aria-pressed={isSelected}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8] rounded-full"
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold tabular-nums transition-all duration-200 ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#29B6F6] to-[#0284C7] text-white border-2 border-white scale-110 animate-hotspot-active'
                    : 'bg-[#07090C]/95 text-white border border-[#38BDF8] active:scale-95'
                }`}
              >
                {stage.number}
              </span>
            </button>
          );
        })}
      </div>

      {/* Abas 1 a 4 */}
      <div
        role="tablist"
        aria-label="Especialidades de pintura e estética automotiva"
        className="grid grid-cols-2 sm:grid-cols-4 border-t border-b border-white/10 bg-[#0B0D12]"
      >
        {PROCESS_HOTSPOTS.map((stage) => {
          const isSelected = stage.id === activeHotspotId;
          return (
            <button
              key={stage.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectHotspot(stage.id)}
              className={`px-3.5 py-3 text-left border-b-2 transition-all duration-200 active:scale-[0.98] min-h-[52px] focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#38BDF8] ${
                isSelected
                  ? 'border-[#38BDF8] bg-[#161C28] text-white'
                  : 'border-transparent text-[#94A3B8] hover:text-white hover:bg-[#10141D]'
              }`}
            >
              <span
                className={`block text-[11px] font-mono font-bold tabular-nums ${
                  isSelected ? 'text-[#FB923C]' : 'text-[#64748B]'
                }`}
              >
                {stage.number}
              </span>
              <span className="block text-xs font-semibold truncate mt-0.5">
                {stage.shortLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detalhes técnicos da especialidade selecionada */}
      <div key={active.id} className="animate-panel-switch p-4 sm:p-5 bg-[#121722]">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <h3 className="font-display italic text-lg sm:text-xl font-bold tracking-wide text-white">
            {active.number}. {active.title}
          </h3>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold tabular-nums text-[#FB923C] bg-[#0B0D12] border border-white/10 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" aria-hidden="true" />
            {active.estimatedTime}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed mb-3.5">{active.summary}</p>
        <ul className="space-y-2">
          {active.specs.map((spec) => (
            <li key={spec} className="flex items-start gap-2 text-xs text-[#CBD5E1]">
              <Check className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" aria-hidden="true" />
              <span>{spec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
