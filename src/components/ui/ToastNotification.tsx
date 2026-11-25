import { CheckCircle2 } from 'lucide-react';

interface ToastNotificationProps {
  message: string | null;
}

export function ToastNotification({ message }: ToastNotificationProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-toast-in fixed bottom-24 md:bottom-8 left-1/2 z-50 px-4 py-3 rounded-[2px] bg-[#111113] border-2 border-[#0EA5E9] text-[#F5F5F4] text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2.5 max-w-[92vw]"
    >
      <CheckCircle2 className="w-4 h-4 text-[#0EA5E9] shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
