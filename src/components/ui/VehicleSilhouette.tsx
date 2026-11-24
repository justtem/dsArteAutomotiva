import type { SVGProps } from 'react';
import type { VehicleSizeId } from '../../types';

interface VehicleSilhouetteProps {
  type: VehicleSizeId;
  className?: string;
}

export function VehicleSilhouette({ type, className = 'w-11 h-6' }: VehicleSilhouetteProps) {
  const props: SVGProps<SVGSVGElement> = {
    viewBox: '0 0 48 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.75',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': true,
  };

  if (type === 'moto') {
    return (
      <svg {...props}>
        <circle cx="11" cy="17" r="4.5" />
        <circle cx="37" cy="17" r="4.5" />
        <path d="M11 17h9l5-7h6l6 7" />
        <path d="M19 10h6l3-3h4" />
        <path d="M15 11l3 6" />
      </svg>
    );
  }

  if (type === 'hatch') {
    return (
      <svg {...props}>
        <path d="M7 17H5a1 1 0 0 1-1-1v-3.5c0-1 .7-1.8 1.6-2l4.4-1L15 5.5h15.5l5.5 5 5.5 1.2c.9.2 1.5 1 1.5 1.9V16a1 1 0 0 1-1 1h-2" />
        <circle cx="12.5" cy="17.5" r="3" />
        <circle cx="35.5" cy="17.5" r="3" />
        <line x1="15.5" y1="17" x2="32.5" y2="17" />
        <path d="M15.5 9.5h18" />
      </svg>
    );
  }

  if (type === 'sedan') {
    return (
      <svg {...props}>
        <path d="M6 17H4a1 1 0 0 1-1-1v-3c0-.9.6-1.7 1.5-1.9L9.5 10l5-4.5h14l6 4.5 7.5 1.2c.9.2 1.5 1 1.5 1.9V16a1 1 0 0 1-1 1h-2" />
        <circle cx="11.5" cy="17.5" r="3" />
        <circle cx="36.5" cy="17.5" r="3" />
        <line x1="14.5" y1="17" x2="33.5" y2="17" />
        <path d="M14.5 10h19" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M6 17H4a1 1 0 0 1-1-1v-4.5c0-.9.6-1.6 1.5-1.8L8 9l3.5-4.5h21l4.5 5 5.5 1c.9.2 1.5 1 1.5 1.9V16a1 1 0 0 1-1 1h-2" />
      <circle cx="11.5" cy="17.5" r="3.2" />
      <circle cx="36.5" cy="17.5" r="3.2" />
      <line x1="14.7" y1="17" x2="33.3" y2="17" />
      <line x1="12" y1="9.5" x2="35" y2="9.5" />
      <line x1="23" y1="4.5" x2="23" y2="9.5" />
    </svg>
  );
}
