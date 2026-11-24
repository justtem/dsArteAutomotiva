import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BUSINESS_CONFIG, CUSTOM_CATALOG_SERVICES } from '../data';
import type { CustomCatalogService } from '../types';
import { buildWhatsAppUrl } from '../utils';

export function useQuoteCart() {
  const [cartItems, setCartItems] = useState<CustomCatalogService[]>([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const toggleCartItem = useCallback(
    (serviceId: number) => {
      const service = CUSTOM_CATALOG_SERVICES.find((item) => item.id === serviceId);
      if (!service) return;

      setCartItems((prev) => {
        const exists = prev.some((item) => item.id === serviceId);
        if (exists) {
          showToast(`"${service.title}" removido da lista.`);
          return prev.filter((item) => item.id !== serviceId);
        }
        showToast(`"${service.title}" adicionado ao orçamento!`);
        return [...prev, service];
      });
    },
    [showToast]
  );

  const addAndOpenCatalogItem = useCallback(
    (serviceId: number) => {
      const service = CUSTOM_CATALOG_SERVICES.find((item) => item.id === serviceId);
      if (!service) return;

      setCartItems((prev) => {
        if (prev.some((item) => item.id === serviceId)) {
          return prev;
        }
        return [...prev, service];
      });
      showToast(`"${service.title}" adicionado à Lista de Orçamento!`);
      setIsCartModalOpen(true);
    },
    [showToast]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
    showToast('Lista de orçamento limpa.');
  }, [showToast]);

  const cartWhatsAppUrl = useMemo(() => {
    if (cartItems.length === 0) return '';
    const itemsList = cartItems
      .map((item, idx) => `${idx + 1}. *${item.title}* (Ex: ${item.examplePiece})`)
      .join('\n');

    const message = `Olá Diogo! Vim pelo site da *${BUSINESS_CONFIG.name}* e gostaria de solicitar um orçamento para os seguintes serviços:\n\n${itemsList}\n\nAguardo seu retorno!`;
    return buildWhatsAppUrl(BUSINESS_CONFIG.whatsappE164, message);
  }, [cartItems]);

  return {
    cartItems,
    isCartModalOpen,
    setIsCartModalOpen,
    toastMessage,
    toggleCartItem,
    addAndOpenCatalogItem,
    clearCart,
    cartWhatsAppUrl,
  };
}
