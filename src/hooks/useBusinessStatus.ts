import { useEffect, useState } from 'react';
import { BUSINESS_CONFIG } from '../data';
import type { BusinessStatus } from '../types';
import { getBusinessStatus } from '../utils';

/**
 * Calcula e atualiza o status aberto/fechado a cada minuto no fuso America/Sao_Paulo.
 */
export function useBusinessStatus(): BusinessStatus {
  const [status, setStatus] = useState<BusinessStatus>(() =>
    getBusinessStatus(BUSINESS_CONFIG.schedule)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(getBusinessStatus(BUSINESS_CONFIG.schedule));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return status;
}
