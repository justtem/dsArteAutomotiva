const MARQUEE_ITEMS = [
  'PINTURA HIDROGRÁFICA WTP',
  'CANDY',
  'CAMALEÃO',
  'CRISTAL 3D',
  'CROMO',
  'FLAKE',
  'TERMOCRÔMICA',
  'AEROGRAFIA',
  'REVITALIZAÇÃO DE FARÓIS',
];

function MarqueeSequence({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {MARQUEE_ITEMS.map((label) => (
        <span
          key={label}
          className="inline-flex items-center font-display text-xl sm:text-2xl font-extrabold uppercase tracking-[0.08em] text-[#111113] whitespace-nowrap"
        >
          <span className="px-4 sm:px-6">{label}</span>
          <span className="font-mono text-xs sm:text-sm font-bold text-[#111113]/65 select-none">
            //
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Faixa tipográfica contínua (Marquee) fazendo a transição de alto contraste
 * entre a Hero escura (#0B0B0D) e o Comparador claro em concreto (#EFECE6).
 */
export function CustomShopMarquee() {
  return (
    <div
      role="region"
      aria-label="Especialidades de pintura customizada DS Arte Automotiva"
      className="w-full overflow-hidden bg-[#F97316] border-y-2 border-[#111113] py-2.5 sm:py-3 select-none"
    >
      <div className="marquee-track">
        <MarqueeSequence />
        <MarqueeSequence ariaHidden />
      </div>
    </div>
  );
}
