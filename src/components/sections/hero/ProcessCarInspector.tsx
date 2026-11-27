import { useRef, type TouchEvent } from 'react';
import { Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { PROCESS_HOTSPOTS } from '../../../data';
import type { ProcessHotspotId } from '../../../types';

interface ProcessCarInspectorProps {
  activeHotspotId: ProcessHotspotId;
  onSelectHotspot: (id: ProcessHotspotId) => void;
}

/**
 * Palco Widescreen de Largura Total para o Inspetor de Pintura & Estética:
 * Diagrama panorâmico superior + faixa inferior dividida entre seletor 01..04 e especificações lado a lado.
 */
export function ProcessCarInspector({
  activeHotspotId,
  onSelectHotspot,
}: ProcessCarInspectorProps) {
  const activeIndex = Math.max(
    0,
    PROCESS_HOTSPOTS.findIndex((item) => item.id === activeHotspotId)
  );
  const active = PROCESS_HOTSPOTS[activeIndex] ?? PROCESS_HOTSPOTS[0];
  const touchStartX = useRef<number | null>(null);

  const selectByDelta = (delta: number) => {
    const nextIdx = (activeIndex + delta + PROCESS_HOTSPOTS.length) % PROCESS_HOTSPOTS.length;
    const nextHotspot = PROCESS_HOTSPOTS[nextIdx];
    if (nextHotspot) {
      onSelectHotspot(nextHotspot.id);
    }
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
      className="w-full bg-[#141418] border border-[#27272F] rounded-[2px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Barra superior de telemetria / bancada */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-[#27272F] bg-[#0B0B0D]">
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-block w-2.5 h-2.5 bg-[#0EA5E9] shrink-0" aria-hidden="true" />
          <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#F5F5F4] truncate">
            Mapeamento Técnico de Customização // Selecione os pontos no veículo
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden md:inline-block font-mono text-[11px] uppercase tracking-wider text-[#A1A1AA] mr-2">
            Zona ativa: <strong className="text-[#F5F5F4]">{active.zoneLabel}</strong>
          </span>
          <button
            type="button"
            onClick={() => selectByDelta(-1)}
            aria-label="Especialidade anterior"
            className="btn-dark-secondary w-8 h-8 text-[#0EA5E9] flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-xs font-bold tabular-nums text-[#F97316] px-1">
            {active.number}/04
          </span>
          <button
            type="button"
            onClick={() => selectByDelta(1)}
            aria-label="Próxima especialidade"
            className="btn-dark-secondary w-8 h-8 text-[#0EA5E9] flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sub-barra mobile com aplicação e técnica */}
      <div className="md:hidden flex items-center justify-between gap-2 px-4 py-2 bg-[#0B0B0D] border-b border-[#27272F] text-[11px]">
        <span className="text-[#A1A1AA] truncate">{active.zoneLabel}</span>
        <span className="font-mono text-[#F97316] font-bold tabular-nums shrink-0">
          {active.estimatedTime}
        </span>
      </div>

      {/* Palco Widescreen do Veículo */}
      <div className="relative w-full bg-[#0B0B0D] px-2 sm:px-8 lg:px-16 py-4 sm:py-7">
        <div className="relative max-w-5xl mx-auto">
          <svg
            viewBox="0 0 600 232"
            className="w-full h-auto block"
            role="img"
            aria-label={`Diagrama técnico destacando a especialidade ${active.number}: ${active.title}`}
          >
            <defs>
              <pattern id="wideStageGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#16161C" strokeWidth="1" />
              </pattern>
              <linearGradient id="candyBodySheen" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0.26" />
              </linearGradient>
            </defs>
            <rect width="600" height="232" fill="url(#wideStageGrid)" />

            {/* Linhas de cota e plataforma */}
            <line x1="16" y1="204" x2="584" y2="204" stroke="#27272F" strokeWidth="1.5" />
            <line
              x1="48"
              y1="213"
              x2="552"
              y2="213"
              stroke="#1C1C22"
              strokeWidth="1"
              strokeDasharray="8 6"
            />

            {/* Destaques por zona */}
            {activeHotspotId === 'pintura-especiais' && (
              <g>
                <path
                  d="M84 166 C94 120, 146 102, 232 98 L402 104 L402 168 L84 168 Z"
                  fill="url(#candyBodySheen)"
                  stroke="#0EA5E9"
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                />
                {[130, 168, 206, 254, 298, 342].map((cx, i) => (
                  <circle
                    key={cx}
                    cx={cx}
                    cy={124 + (i % 3) * 14}
                    r="2.2"
                    fill={i % 2 === 0 ? '#F97316' : '#0EA5E9'}
                  />
                ))}
              </g>
            )}

            {activeHotspotId === 'hidrografica-wtp' && (
              <g>
                <path
                  d="M204 106 C244 74, 340 72, 412 106 L412 134 L204 134 Z"
                  fill="#0EA5E9"
                  fillOpacity="0.22"
                  stroke="#0EA5E9"
                  strokeWidth="1.5"
                />
                <circle
                  cx="220"
                  cy="105"
                  r="14"
                  fill="#F97316"
                  fillOpacity="0.24"
                  stroke="#F97316"
                  strokeWidth="1.4"
                />
              </g>
            )}

            {activeHotspotId === 'rodas-candy' && (
              <g>
                <circle
                  cx="448"
                  cy="172"
                  r="40"
                  fill="#F97316"
                  fillOpacity="0.18"
                  stroke="#F97316"
                  strokeWidth="1.6"
                  strokeDasharray="4 3"
                />
                <circle
                  cx="152"
                  cy="172"
                  r="38"
                  fill="#0EA5E9"
                  fillOpacity="0.16"
                  stroke="#0EA5E9"
                  strokeWidth="1.4"
                  strokeDasharray="4 3"
                />
              </g>
            )}

            {activeHotspotId === 'farois-verniz' && (
              <g>
                <polygon
                  points="74,132 18,110 18,164 74,144"
                  fill="#0EA5E9"
                  fillOpacity="0.26"
                />
                <circle
                  cx="88"
                  cy="136"
                  r="24"
                  fill="#0EA5E9"
                  fillOpacity="0.2"
                  stroke="#0EA5E9"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
              </g>
            )}

            {/* Carroceria */}
            <g stroke="#E4E4E7" strokeWidth="1.8" fill="none" strokeLinejoin="round">
              <path
                d="M78 172 L66 164 C64 148, 70 130, 86 121 L168 106 L228 69 C264 60, 344 60, 394 74 L446 105 L516 116 C528 120, 534 134, 534 150 L530 168 L492 172"
                fill="#141418"
                fillOpacity="0.94"
              />
              <line x1="194" y1="172" x2="406" y2="172" stroke="#E4E4E7" strokeWidth="1.8" />
              <path d="M90 132 L512 128" stroke="#3F3F46" strokeWidth="1.2" />
              <path
                d="M196 108 L238 77 C272 70, 336 70, 382 81 L422 108 Z"
                fill={activeHotspotId === 'hidrografica-wtp' ? '#0EA5E9' : '#0B0B0D'}
                fillOpacity={activeHotspotId === 'hidrografica-wtp' ? '0.28' : '0.96'}
                stroke="#A1A1AA"
                strokeWidth="1.3"
              />
              <line x1="305" y1="73" x2="302" y2="170" stroke="#3F3F46" strokeWidth="1.2" />
              <line x1="210" y1="108" x2="206" y2="170" stroke="#27272F" strokeWidth="1" />
              <line x1="402" y1="108" x2="404" y2="155" stroke="#27272F" strokeWidth="1" />
              <path
                d="M214 102 L228 100 L228 110 L212 110 Z"
                fill={activeHotspotId === 'hidrografica-wtp' ? '#F97316' : '#141418'}
                stroke="#E4E4E7"
                strokeWidth="1.3"
              />
              <path
                d="M74 135 L108 128 L102 140 L72 143 Z"
                fill={activeHotspotId === 'farois-verniz' ? '#F5F5F4' : '#0EA5E9'}
                fillOpacity="0.92"
                stroke="#0EA5E9"
                strokeWidth="1.2"
              />
              <path
                d="M512 122 L531 126 L531 138 L508 136 Z"
                fill="#1C1C22"
                stroke="#A1A1AA"
                strokeWidth="1.1"
              />
              <line x1="274" y1="120" x2="290" y2="120" stroke="#A1A1AA" strokeWidth="2" />
              <line x1="366" y1="120" x2="382" y2="120" stroke="#A1A1AA" strokeWidth="2" />
            </g>

            {/* Roda Dianteira */}
            <g transform="translate(152, 172)">
              <circle
                r="31"
                fill="#0B0B0D"
                stroke={activeHotspotId === 'rodas-candy' ? '#0EA5E9' : '#E4E4E7'}
                strokeWidth="2"
              />
              <circle r="21" fill="#141418" stroke="#A1A1AA" strokeWidth="1.3" />
              <circle r="5.5" fill={activeHotspotId === 'rodas-candy' ? '#F97316' : '#0EA5E9'} />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <line
                  key={deg}
                  x1="0"
                  y1="-6"
                  x2="0"
                  y2="-20"
                  stroke={activeHotspotId === 'rodas-candy' ? '#0EA5E9' : '#A1A1AA'}
                  strokeWidth="1.5"
                  transform={`rotate(${deg})`}
                />
              ))}
            </g>

            {/* Roda Traseira */}
            <g transform="translate(448, 172)">
              <circle
                r="31"
                fill="#0B0B0D"
                stroke={activeHotspotId === 'rodas-candy' ? '#F97316' : '#E4E4E7'}
                strokeWidth="2"
              />
              <circle r="21" fill="#141418" stroke="#A1A1AA" strokeWidth="1.3" />
              <circle r="5.5" fill={activeHotspotId === 'rodas-candy' ? '#F97316' : '#0EA5E9'} />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <line
                  key={deg}
                  x1="0"
                  y1="-6"
                  x2="0"
                  y2="-20"
                  stroke={activeHotspotId === 'rodas-candy' ? '#F97316' : '#A1A1AA'}
                  strokeWidth="1.5"
                  transform={`rotate(${deg})`}
                />
              ))}
            </g>

            {/* Cotas técnicas */}
            <text
              x="20"
              y="22"
              fill="#A1A1AA"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              className="hidden sm:block"
            >
              ESTAÇÃO // DS ARTE AUTOMOTIVA
            </text>
            <text
              x="580"
              y="22"
              textAnchor="end"
              fill="#F97316"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
              className="hidden sm:block"
            >
              TÉCNICA: {active.estimatedTime.toUpperCase()}
            </text>
          </svg>

          {/* Pinos interativos 01 a 04 (44x44px para polegar + anel de pulso técnico no ativo) */}
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
                className="absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0EA5E9] rounded-[2px] active:scale-95 transition-transform"
              >
                {isSelected && (
                  <span
                    aria-hidden="true"
                    className="animate-pin-ping absolute w-8 h-8 rounded-[2px] border border-[#0EA5E9] pointer-events-none"
                  />
                )}
                <span
                  className={`relative font-mono w-8 h-8 rounded-[2px] flex items-center justify-center text-xs font-bold tabular-nums transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#0EA5E9] text-[#0B0B0D] border-2 border-[#F5F5F4] scale-110 shadow-lg'
                      : 'bg-[#141418]/95 text-[#F5F5F4] border border-[#0EA5E9] hover:bg-[#1C1C22]'
                  }`}
                >
                  {stage.number}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAIXA INFERIOR HORIZONTAL WIDESCREEN: Abas 01..04 (Esquerda) + Ficha Ativa (Direita) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-[#27272F]">
        {/* Seletor das 4 Estações */}
        <div
          role="tablist"
          aria-label="Especialidades de pintura e estética automotiva"
          className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 divide-x divide-y divide-[#27272F] bg-[#0B0B0D] lg:border-r border-[#27272F]"
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
                className={`p-4 text-left transition-colors duration-150 min-h-[68px] flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#0EA5E9] ${
                  isSelected
                    ? 'bg-[#1C1C22] text-[#F5F5F4] shadow-[inset_3px_0_0_#0EA5E9]'
                    : 'bg-[#0B0B0D] text-[#A1A1AA] hover:text-[#F5F5F4] hover:bg-[#141418]'
                }`}
              >
                <span
                  className={`font-mono text-xs font-bold tabular-nums ${
                    isSelected ? 'text-[#F97316]' : 'text-[#A1A1AA]'
                  }`}
                >
                  {stage.number} //
                </span>
                <span className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide leading-tight mt-1">
                  {stage.shortLabel}
                </span>
              </button>
            );
          })}
        </div>

        {/* Ficha Técnica Ativa em Layout Horizontal */}
        <div
          key={active.id}
          className="animate-panel-switch lg:col-span-7 p-5 sm:p-6 bg-[#141418] flex flex-col justify-between gap-4"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight leading-[0.98] text-[#F5F5F4]">
                <span className="font-mono text-lg text-[#0EA5E9] mr-2">{active.number}.</span>
                {active.title}
              </h3>
              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs font-bold tabular-nums text-[#F97316] bg-[#0B0B0D] border border-[#27272F] px-2.5 py-1 rounded-[2px]">
                <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" aria-hidden="true" />
                {active.estimatedTime}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">{active.summary}</p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3.5 border-t border-[#27272F]">
            {active.specs.map((spec) => (
              <li
                key={spec}
                className="flex items-start gap-2 text-xs text-[#F5F5F4] bg-[#0B0B0D]/70 border border-[#27272F] p-2.5 rounded-[2px]"
              >
                <Check className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-snug">{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
