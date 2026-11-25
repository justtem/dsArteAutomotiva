import { useState } from 'react';
import { ClipboardList, Menu, MessageCircle, Navigation, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../data';
import type { BusinessStatus } from '../../types';
import { BrandLogo } from '../ui';

const NAV_LINKS = [
  { href: '#processo', label: 'Especialidades' },
  { href: '#antes-depois', label: 'Antes e Depois' },
  { href: '#simulador', label: 'Simulador' },
  { href: '#galeria', label: 'Galeria & Pinturas' },
  { href: '#localizacao', label: 'Localização' },
];

interface NavbarProps {
  status: BusinessStatus;
  quickWhatsAppUrl: string;
  cartCount: number;
  onOpenCartModal: () => void;
}

export function Navbar({
  status,
  quickWhatsAppUrl,
  cartCount,
  onOpenCartModal,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B0D12]/92 backdrop-blur-lg border-b border-white/10 shadow-[0_6px_28px_-10px_rgba(41,182,246,0.28)]">
      <div className="w-full px-3.5 sm:px-6 lg:px-10 xl:px-14 h-16 sm:h-18 flex items-center justify-between gap-2.5 sm:gap-4">
        <a
          href="#topo"
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#38BDF8] rounded-xl min-w-0"
          aria-label={`${BUSINESS_CONFIG.name}, voltar ao topo`}
        >
          <BrandLogo />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1.5 text-sm font-semibold tracking-wide text-[#CBD5E1] hover:text-[#38BDF8] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2.5px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#29B6F6] after:to-[#FB923C] after:transition-all after:duration-300 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#38BDF8] rounded-md"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141821] border border-white/10"
            title="Calculado automaticamente no fuso horário America/Sao_Paulo"
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                status.isOpen ? 'bg-[#38BDF8] animate-pulse' : 'bg-[#64748B]'
              }`}
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-[#E2E8F0] tabular-nums whitespace-nowrap">
              {status.badgeText}
            </span>
          </div>

          {/* Botão Lista de Orçamento (alvo de toque 44px no celular) */}
          <button
            type="button"
            onClick={onOpenCartModal}
            aria-label={`Abrir lista de orçamento (${cartCount} itens)`}
            className="btn-chrome-dark relative inline-flex items-center justify-center w-11 h-11 rounded-xl text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          >
            <ClipboardList className="w-4.5 h-4.5 text-[#38BDF8]" aria-hidden="true" />
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="animate-badge-pop absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-full bg-gradient-to-r from-[#FB923C] to-[#EF4444] text-white text-[11px] font-bold tabular-nums flex items-center justify-center shadow"
              >
                {cartCount}
              </span>
            )}
          </button>

          <a
            href={quickWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-liquid-coat btn-chrome-shine hidden sm:inline-flex items-center gap-2 px-4.5 py-2 rounded-xl text-white text-sm font-bold tracking-wide min-h-[42px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="btn-chrome-dark lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38BDF8]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile estilo Painel Custom com status e ações rápidas */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="animate-panel-switch lg:hidden bg-[#12161F]/98 backdrop-blur-xl border-t border-white/10 px-4 py-4 shadow-2xl"
        >
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  status.isOpen ? 'bg-[#FB923C] animate-pulse' : 'bg-[#64748B]'
                }`}
                aria-hidden="true"
              />
              <span className="text-xs font-semibold text-[#E2E8F0] tabular-nums">
                {status.badgeText}
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#38BDF8]">
              {BUSINESS_CONFIG.whatsappDisplay}
            </span>
          </div>

          <nav aria-label="Navegação mobile" className="grid grid-cols-1 gap-1 mb-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-3.5 text-sm font-bold text-[#E2E8F0] active:bg-[#29B6F6]/15 active:text-[#38BDF8] rounded-xl transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#64748B]">→</span>
              </a>
            ))}
          </nav>

          <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-white/10">
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-liquid-coat btn-chrome-shine inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-white text-xs font-bold min-h-[46px]"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Chamar Diogo</span>
            </a>
            <a
              href={BUSINESS_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-chrome-dark inline-flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-white text-xs font-bold min-h-[46px]"
            >
              <Navigation className="w-4 h-4 text-[#38BDF8] shrink-0" aria-hidden="true" />
              <span>Rota no GPS</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
