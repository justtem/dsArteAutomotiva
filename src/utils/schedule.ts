import type { BusinessStatus, ScheduleDay } from '../types';

const WEEKDAY_MAP: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function getSaoPauloNow(): { dayOfWeek: number; minutesFromMidnight: number } {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const weekdayStr = parts.find((p) => p.type === 'weekday')?.value || 'Mon';
  const hourNum = parseInt(parts.find((p) => p.type === 'hour')?.value || '12', 10);
  const minuteNum = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);

  return {
    dayOfWeek: WEEKDAY_MAP[weekdayStr] ?? 1,
    minutesFromMidnight: (hourNum === 24 ? 0 : hourNum) * 60 + minuteNum,
  };
}

export function parseTimeToMinutes(hhmm: string | null): number {
  if (!hhmm) return 0;
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

export function getBusinessStatus(schedule: ScheduleDay[]): BusinessStatus {
  const { dayOfWeek, minutesFromMidnight } = getSaoPauloNow();
  const todayEntry = schedule.find((item) => item.day === dayOfWeek);

  if (todayEntry && !todayEntry.closed && todayEntry.open && todayEntry.close) {
    const openMin = parseTimeToMinutes(todayEntry.open);
    const closeMin = parseTimeToMinutes(todayEntry.close);

    if (minutesFromMidnight >= openMin && minutesFromMidnight < closeMin) {
      const remaining = closeMin - minutesFromMidnight;
      if (remaining <= 45) {
        return {
          isOpen: true,
          closingSoon: true,
          dayOfWeek,
          badgeText: `Fecha em breve (${todayEntry.close})`,
          todayHours: `${todayEntry.open} às ${todayEntry.close}`,
        };
      }
      return {
        isOpen: true,
        closingSoon: false,
        dayOfWeek,
        badgeText: `Aberto agora • até ${todayEntry.close}`,
        todayHours: `${todayEntry.open} às ${todayEntry.close}`,
      };
    }

    if (minutesFromMidnight < openMin) {
      return {
        isOpen: false,
        closingSoon: false,
        dayOfWeek,
        badgeText: `Fechado • Abre hoje às ${todayEntry.open}`,
        todayHours: `${todayEntry.open} às ${todayEntry.close}`,
      };
    }
  }

  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = (dayOfWeek + offset) % 7;
    const entry = schedule.find((item) => item.day === nextDay);
    if (entry && !entry.closed && entry.open) {
      const nextLabel = offset === 1 ? 'amanhã' : entry.short;
      return {
        isOpen: false,
        closingSoon: false,
        dayOfWeek,
        badgeText: `Fechado • Abre ${nextLabel} às ${entry.open}`,
        todayHours: todayEntry?.closed
          ? 'Fechado hoje'
          : `${todayEntry?.open} às ${todayEntry?.close}`,
      };
    }
  }

  return {
    isOpen: false,
    closingSoon: false,
    dayOfWeek,
    badgeText: 'Consultar horário no WhatsApp',
    todayHours: 'Sob consulta',
  };
}
