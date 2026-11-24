/**
 * Mapa esquemático Dark Mode carregado sob demanda
 */
export function SchematicDarkMap() {
  return (
    <div className="border border-[#1E293B] rounded-md overflow-hidden bg-[#0D1117]">
      <svg
        viewBox="0 0 560 280"
        className="w-full h-auto block"
        role="img"
        aria-label="Mapa esquemático em modo escuro mostrando a localização fictícia do Box Azul na Av. Nilo Peçanha, Centro"
      >
        <rect width="560" height="280" fill="#07090C" />
        {/* Quadras */}
        <rect x="24" y="24" width="140" height="84" fill="#121720" stroke="#1E293B" />
        <rect x="196" y="24" width="160" height="84" fill="#121720" stroke="#1E293B" />
        <rect x="388" y="24" width="148" height="84" fill="#121720" stroke="#1E293B" />
        <rect x="24" y="146" width="140" height="108" fill="#121720" stroke="#1E293B" />
        <rect x="196" y="146" width="160" height="108" fill="#101B2E" stroke="#1E3A5F" />
        <rect x="388" y="146" width="148" height="108" fill="#121720" stroke="#1E293B" />

        {/* Avenida principal */}
        <rect x="0" y="114" width="560" height="26" fill="#161D29" />
        <line
          x1="0"
          y1="127"
          x2="560"
          y2="127"
          stroke="#334155"
          strokeWidth="1.5"
          strokeDasharray="10 8"
        />

        {/* Vias transversais */}
        <rect x="170" y="0" width="20" height="280" fill="#161D29" />
        <rect x="362" y="0" width="20" height="280" fill="#161D29" />

        {/* Referências urbanas */}
        <text x="198" y="131" fill="#FFFFFF" fontSize="10" fontWeight="600" fontFamily="sans-serif">
          AV. NILO PEÇANHA — CENTRO
        </text>
        <text x="224" y="203" fill="#60A5FA" fontSize="11" fontWeight="700" fontFamily="sans-serif">
          PRAÇA DA BANDEIRA
        </text>
        <text x="406" y="198" fill="#94A3B8" fontSize="10" fontWeight="600" fontFamily="sans-serif">
          RODOVIÁRIA (200 m)
        </text>

        {/* Marcador do Box Azul */}
        <g transform="translate(274, 86)">
          <circle cx="0" cy="0" r="18" fill="#0066FF" fillOpacity="0.22" />
          <circle cx="0" cy="0" r="8" fill="#0066FF" stroke="#FFFFFF" strokeWidth="2.5" />
          <rect x="-58" y="-42" width="116" height="26" rx="3" fill="#0066FF" />
          <text
            x="0"
            y="-25"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="10.5"
            fontWeight="700"
            fontFamily="sans-serif"
          >
            BOX AZUL • Nº 418
          </text>
        </g>
      </svg>
      <div className="px-4 py-2.5 bg-[#121720] border-t border-[#1E293B] flex flex-wrap items-center justify-between gap-2 text-xs text-[#94A3B8]">
        <span>Mapa esquemático leve carregado sob demanda (economia de 4G)</span>
        <span className="font-semibold text-white">Localização fictícia editável</span>
      </div>
    </div>
  );
}
