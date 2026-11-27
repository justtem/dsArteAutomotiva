import { useMemo, useState } from 'react';
import {
  FloatingCartButton,
  Footer,
  MobileBottomBar,
  Navbar,
  PrivacyNoticeModal,
  QuoteCartModal,
} from './components/layout';
import {
  BeforeAfterSection,
  GallerySection,
  HeroSection,
  LocationSection,
  SimulatorSection,
} from './components/sections';
import { CustomShopMarquee, ToastNotification } from './components/ui';
import { BUSINESS_CONFIG } from './data';
import { useBusinessStatus, useQuoteCart, useQuoteSimulator } from './hooks';
import { buildWhatsAppUrl } from './utils';

export default function App() {
  const status = useBusinessStatus();
  const simulator = useQuoteSimulator();
  const quoteCart = useQuoteCart();
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const quickWhatsAppUrl = useMemo(() => {
    const msg = `Olá Diogo! Vim pelo site da ${BUSINESS_CONFIG.name} e gostaria de fazer um orçamento.`;
    return buildWhatsAppUrl(BUSINESS_CONFIG.whatsappE164, msg);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0B0B0D] text-[#F5F5F4] antialiased overflow-x-clip font-sans">
      <Navbar
        status={status}
        quickWhatsAppUrl={quickWhatsAppUrl}
        cartCount={quoteCart.cartItems.length}
        onOpenCartModal={() => quoteCart.setIsCartModalOpen(true)}
      />

      <main>
        {/* ESCURO (#0B0B0D): Pôster Editorial + Palco Widescreen do Inspetor */}
        <HeroSection status={status} quickWhatsAppUrl={quickWhatsAppUrl} />

        {/* FAIXA MARQUEE DE ALTO CONTRASTE (Transição Escuro -> Concreto) */}
        <CustomShopMarquee />

        {/* 01 // CLARO CONCRETO (#EFECE6): Comparador Antes e Depois */}
        <BeforeAfterSection
          onApplyCaseToSimulator={simulator.applyCaseToSimulator}
          onAddCatalogCaseToCart={quoteCart.addAndOpenCatalogItem}
        />

        {/* 02 // ESCURO ASFALTO (#0B0B0D): Portfólio / Galeria Assimétrica */}
        <GallerySection
          cartItems={quoteCart.cartItems}
          onToggleCartItem={quoteCart.toggleCartItem}
        />

        {/* 03 // CLARO CONCRETO (#EFECE6): Simulador estilo Ordem de Serviço */}
        <SimulatorSection
          vehicleSize={simulator.vehicleSize}
          setVehicleSize={simulator.setVehicleSize}
          selectedPackageId={simulator.selectedPackageId}
          setSelectedPackageId={simulator.setSelectedPackageId}
          selectedAddonIds={simulator.selectedAddonIds}
          toggleAddon={simulator.toggleAddon}
          periodPreference={simulator.periodPreference}
          setPeriodPreference={simulator.setPeriodPreference}
          includePickup={simulator.includePickup}
          setIncludePickup={simulator.setIncludePickup}
          vehicleModel={simulator.vehicleModel}
          setVehicleModel={simulator.setVehicleModel}
          quoteSummary={simulator.quoteSummary}
          onOpenPrivacyNotice={() => setIsPrivacyModalOpen(true)}
        />

        {/* 04 // CLARO PEDRA (#E4E0D8) com divisória estrutural preta 2px */}
        <LocationSection
          status={status}
          onOpenPrivacyNotice={() => setIsPrivacyModalOpen(true)}
        />
      </main>

      <Footer onOpenPrivacyNotice={() => setIsPrivacyModalOpen(true)} />

      <FloatingCartButton
        count={quoteCart.cartItems.length}
        onOpen={() => quoteCart.setIsCartModalOpen(true)}
      />

      <QuoteCartModal
        isOpen={quoteCart.isCartModalOpen}
        items={quoteCart.cartItems}
        whatsappUrl={quoteCart.cartWhatsAppUrl}
        onClose={() => quoteCart.setIsCartModalOpen(false)}
        onRemoveItem={quoteCart.toggleCartItem}
        onClear={quoteCart.clearCart}
        onOpenPrivacyNotice={() => setIsPrivacyModalOpen(true)}
      />

      <PrivacyNoticeModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <ToastNotification message={quoteCart.toastMessage} />

      <MobileBottomBar
        whatsappUrl={simulator.quoteSummary.whatsappUrl}
        totalPrice={simulator.quoteSummary.totalPrice}
        sizeLabel={simulator.quoteSummary.sizeLabel}
        cartCount={quoteCart.cartItems.length}
        onOpenCartModal={() => quoteCart.setIsCartModalOpen(true)}
      />
    </div>
  );
}
