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
        className="inline-flex items-center gap-2.5 px-5 py-3 rounded-[2px] bg-[#111113] hover:bg-[#1C1C22] border-2 border-[#0EA5E9] text-[#F5F5F4] font-bold uppercase tracking-wider text-xs min-h-[48px] shadow-[4px_4px_0px_#0EA5E9] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F5F4]"
      >
        <ClipboardCheck className="w-4 h-4 text-[#0EA5E9]" aria-hidden="true" />
        <span>Lista de Orçamento</span>
        <span className="font-mono px-1.5 py-0.5 rounded-[2px] bg-[#F97316] text-[#0B0B0D] text-xs font-bold tabular-nums">
          {count}
        </span>
      </button>
    </div>
  );
}
