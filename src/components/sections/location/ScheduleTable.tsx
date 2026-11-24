import { BUSINESS_CONFIG } from '../../../data';
import type { BusinessStatus } from '../../../types';

interface ScheduleTableProps {
  status: BusinessStatus;
}

export function ScheduleTable({ status }: ScheduleTableProps) {
  return (
    <div className="surface-gunmetal rounded-2xl overflow-hidden">
      <div className="px-4 py-3 bg-[#0B0D12]/70 border-b border-white/10 flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-white">
          Horário de Funcionamento
        </span>
        <span className="text-xs font-bold tabular-nums text-[#FB923C]">{status.badgeText}</span>
      </div>
      <table className="w-full text-sm border-collapse">
        <tbody className="divide-y divide-white/8">
          {BUSINESS_CONFIG.schedule.map((row) => {
            const isToday = row.day === status.dayOfWeek;
            return (
              <tr key={row.day} className={isToday ? 'bg-[#1A2232]/75' : 'bg-transparent'}>
                <td className="px-4 py-2.5 text-white">
                  <span className={isToday ? 'font-bold' : 'text-[#CBD5E1]'}>{row.label}</span>
                  {isToday && (
                    <span className="ml-2 inline-block px-2 py-0.5 text-[10px] font-bold uppercase bg-gradient-to-r from-[#0284C7] to-[#29B6F6] text-white rounded-full">
                      Hoje
                    </span>
                  )}
                </td>
                <td
                  className={`px-4 py-2.5 text-right tabular-nums ${
                    row.closed
                      ? 'text-[#64748B]'
                      : isToday
                        ? 'font-bold text-white'
                        : 'text-[#CBD5E1]'
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
