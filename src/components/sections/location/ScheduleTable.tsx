import { BUSINESS_CONFIG } from '../../../data';
import type { BusinessStatus } from '../../../types';

interface ScheduleTableProps {
  status: BusinessStatus;
}

export function ScheduleTable({ status }: ScheduleTableProps) {
  return (
    <div className="w-full">
      <div className="px-5 py-3 bg-[#EFECE6] border-b border-[#111113] flex items-center justify-between gap-2">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]">
          Horário de Funcionamento
        </span>
        <span className="font-mono text-[11px] font-bold tabular-nums text-[#C2410C]">
          {status.todayHours}
        </span>
      </div>
      <table className="w-full text-sm border-collapse">
        <tbody className="divide-y divide-[#111113]/20">
          {BUSINESS_CONFIG.schedule.map((row) => {
            const isToday = row.day === status.dayOfWeek;
            return (
              <tr
                key={row.day}
                className={isToday ? 'bg-[#111113] text-[#F8F6F2]' : 'bg-[#F8F6F2] text-[#111113]'}
              >
                <td className="px-5 py-2.5">
                  <span className={isToday ? 'font-bold text-[#F8F6F2]' : 'text-[#27272A]'}>
                    {row.label}
                  </span>
                  {isToday && (
                    <span className="font-mono ml-2 inline-block px-2 py-0.5 text-[10px] font-bold uppercase bg-[#F97316] text-[#111113]">
                      Hoje
                    </span>
                  )}
                </td>
                <td
                  className={`font-mono px-5 py-2.5 text-right text-xs tabular-nums ${
                    row.closed
                      ? isToday
                        ? 'text-[#A1A1AA]'
                        : 'text-[#52525B]'
                      : isToday
                        ? 'font-bold text-[#0EA5E9]'
                        : 'font-semibold text-[#111113]'
                  }`}
                >
                  {row.closed ? 'Fechado' : `${row.open} às ${row.close}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
