interface TechDividerProps {
  accentVariant?: 'cyan' | 'chrome' | 'flame';
}

/**
 * Divisória estrutural seca entre blocos contrastantes.
 */
export function TechSectionDivider({ accentVariant = 'cyan' }: TechDividerProps) {
  const accentColor =
    accentVariant === 'flame'
      ? '#F97316'
      : accentVariant === 'chrome'
        ? '#3F3F46'
        : '#0EA5E9';

  return (
    <div
      aria-hidden="true"
      className="relative w-full h-[2px] bg-[#111113] select-none pointer-events-none overflow-hidden"
    >
      <div
        className="absolute left-4 sm:left-6 lg:left-10 xl:left-14 top-0 h-full w-20"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  );
}

export function CardTopSpecBar({ variant = 'cyan' }: { variant?: 'cyan' | 'flame' }) {
  const accent = variant === 'flame' ? '#F97316' : '#0EA5E9';
  return (
    <div aria-hidden="true" className="w-full h-[2px] bg-[#27272F] flex">
      <span className="h-full w-16 block" style={{ backgroundColor: accent }} />
    </div>
  );
}

export { TechSectionDivider as PaintDripDivider, CardTopSpecBar as CardTopPaintDrip };
