export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDuration(totalMinutes: number): string {
  if (totalMinutes < 60) return `${totalMinutes} min`;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

/**
 * Normaliza entrada livre e remove controles Unicode invisíveis/bidirecionais,
 * delimitadores HTML e metacaracteres de formatação do WhatsApp (*, _, ~).
 */
export function sanitizeText(raw: string): string {
  return String(raw || '')
    .normalize('NFKC')
    .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g, '')
    .replace(/[<>`{}*~_]/g, '')
    .replace(/\s+/g, ' ')
    .slice(0, 48);
}

const MERCOSUL_PLATE_REGEX = /\b[A-Z]{3}-?\d[A-Z]\d{2}\b/gi;
const LEGACY_PLATE_REGEX =
  /\b(?!(?:CBR|GSX|CBX|XTZ|YBR|FZR|VTR|CRF|WRF|DRZ|KLR|ZRX)\b)[A-Z]{3}-\d{4}\b|\b(?!(?:CBR|GSX|CBX|XTZ|YBR|FZR|VTR|CRF|WRF|DRZ|KLR|ZRX))[A-Z]{3}\d{4}\b/gi;
const CPF_REGEX = /\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b/g;
const PHONE_REGEX = /(?:\+?55\s*)?(?:\(?\d{2}\)?\s*)?9?\d{4}[-\s]?\d{4}\b/g;
const EMAIL_REGEX = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

export function containsSensitiveIdentifier(raw: string): boolean {
  const text = String(raw || '');
  if (!text) return false;

  MERCOSUL_PLATE_REGEX.lastIndex = 0;
  LEGACY_PLATE_REGEX.lastIndex = 0;
  CPF_REGEX.lastIndex = 0;
  PHONE_REGEX.lastIndex = 0;
  EMAIL_REGEX.lastIndex = 0;

  return (
    MERCOSUL_PLATE_REGEX.test(text) ||
    LEGACY_PLATE_REGEX.test(text) ||
    CPF_REGEX.test(text) ||
    PHONE_REGEX.test(text) ||
    EMAIL_REGEX.test(text)
  );
}

/**
 * Omite placas automotivas, CPF, telefone ou e-mail antes de compor parâmetros GET
 * na URL externa wa.me/?text=, preservando o restante da descrição da peça/modelo.
 */
export function redactSensitiveIdentifiers(raw: string): string {
  return String(raw || '')
    .replace(EMAIL_REGEX, '')
    .replace(CPF_REGEX, '')
    .replace(PHONE_REGEX, '')
    .replace(MERCOSUL_PLATE_REGEX, '')
    .replace(LEGACY_PLATE_REGEX, '')
    .replace(/\s+/g, ' ')
    .replace(/^[-\s,/]+|[-\s,/]+$/g, '')
    .trim();
}

/**
 * Permite apenas caminhos estáticos locais seguros (iniciados por '/' sem '//' nem '..')
 * ou Object URLs internas ('blob:') geradas após validação binária.
 */
export function isSafeImageSrc(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('blob:')) return url;
  if (
    url.startsWith('/') &&
    !url.startsWith('//') &&
    !url.includes('..') &&
    !/[\u0000-\u001F\\]/.test(url)
  ) {
    return url;
  }
  return null;
}
