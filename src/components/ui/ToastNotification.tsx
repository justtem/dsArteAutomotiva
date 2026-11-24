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
      className="animate-toast-in fixed bottom-24 md:bottom-8 left-1/2 z-50 px-4 py-3 rounded-sm bg-[#121720] border border-[#38BDF8] text-white text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2.5 max-w-[92vw]"
    >
      <CheckCircle2 className="w-4 h-4 text-[#60A5FA] shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
