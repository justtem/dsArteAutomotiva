import { useMemo } from 'react';
import {
  FloatingCartButton,
  Footer,
  MobileBottomBar,
  Navbar,
  QuoteCartModal,
} from './components/layout';
import {
  BeforeAfterSection,
  GallerySection,
  HeroSection,
  LocationSection,
  SimulatorSection,
} from './components/sections';
import { PaintDripDivider, ToastNotification } from './components/ui';
import { BUSINESS_CONFIG } from './data';
import { useBusinessStatus, useQuoteCart, useQuoteSimulator } from './hooks';
import { buildWhatsAppUrl } from './utils';

export default function App() {
  const status = useBusinessStatus();
  const simulator = useQuoteSimulator();
  const quoteCart = useQuoteCart();

  const quickWhatsAppUrl = useMemo(() => {
    const msg = `Olá Diogo! Vim pelo site da ${BUSINESS_CONFIG.name} e gostaria de fazer um orçamento.`;
    return buildWhatsAppUrl(BUSINESS_CONFIG.whatsappE164, msg);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0B0D12] text-white antialiased overflow-x-hidden font-sans">
      <Navbar
        status={status}
        quickWhatsAppUrl={quickWhatsAppUrl}
        cartCount={quoteCart.cartItems.length}
        onOpenCartModal={() => quoteCart.setIsCartModalOpen(true)}
      />

      <main>
        <HeroSection status={status} quickWhatsAppUrl={quickWhatsAppUrl} />

        {/* Transição de Tinta Automotiva Derretida (Hero -> Antes e Depois) */}
        <PaintDripDivider topColor="#0B0D12" bottomColor="#12161F" accentVariant="cyan" />

        <BeforeAfterSection
          onApplyCaseToSimulator={simulator.applyCaseToSimulator}
          onAddCatalogCaseToCart={quoteCart.addAndOpenCatalogItem}
        />

        {/* Transição de Tinta Derretida (Antes e Depois -> Simulador) */}
        <PaintDripDivider topColor="#12161F" bottomColor="#0B0D12" accentVariant="flame" />

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
        />

        {/* Transição de Tinta Derretida (Simulador -> Galeria & Custom) */}
        <PaintDripDivider topColor="#0B0D12" bottomColor="#12161F" accentVariant="chrome" />

        <GallerySection
          cartItems={quoteCart.cartItems}
          onToggleCartItem={quoteCart.toggleCartItem}
        />

        {/* Transição de Tinta Derretida (Galeria -> Localização) */}
        <PaintDripDivider topColor="#12161F" bottomColor="#0B0D12" accentVariant="cyan" />

        <LocationSection status={status} />
      </main>

      <PaintDripDivider topColor="#0B0D12" bottomColor="#07090C" accentVariant="chrome" />
      <Footer />

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
