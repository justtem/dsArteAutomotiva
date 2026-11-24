import { ClipboardCheck } from 'lucide-react';

interface FloatingCartButtonProps {
  count: number;
  onOpen: () => void;
}

export function FloatingCartButton({ count, onOpen }: FloatingCartButtonProps) {
  if (count === 0) return null;

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={onOpen}
        className="btn-liquid-coat btn-chrome-shine inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-white font-bold text-sm min-h-[48px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ClipboardCheck className="w-4 h-4" aria-hidden="true" />
        <span>Ver Orçamento ({count})</span>
      </button>
    </div>
  );
}
