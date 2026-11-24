export function buildWhatsAppUrl(phoneE164: string, message: string): string {
  const cleanPhone = String(phoneE164 || '').replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
