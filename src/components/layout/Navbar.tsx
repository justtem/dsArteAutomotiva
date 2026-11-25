import { useState } from 'react';
import { ClipboardList, Menu, MessageCircle, Navigation, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../data';
import type { BusinessStatus } from '../../types';
import { BrandLogo } from '../ui';

const NAV_LINKS = [
  { href: '#processo', label: 'Especialidades' },
  { href: '#antes-depois', label: 'Antes e Depois' },
  { href: '#galeria', label: 'Galeria & Pinturas' },
  { href: '#simulador', label: 'Simulador OS' },
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
    <header className="sticky top-0 z-40 w-full bg-[#0B0B0D]/96 backdrop-blur-xs border-b border-[#27272F]">
      <div className="w-full px-3.5 sm:px-6 lg:px-10 xl:px-14 h-16 sm:h-18 flex items-center justify-between gap-2.5 sm:gap-4">
        <a
          href="#topo"
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0EA5E9] rounded-[2px] min-w-0"
          aria-label={`${BUSINESS_CONFIG.name}, voltar ao topo`}
        >
          <BrandLogo />
        </a>

        <nav aria-label="Navegação principal" className="hidden xl:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] hover:text-[#F5F5F4] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#0EA5E9] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0EA5E9] rounded-[2px]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Indicador de status EXCLUSIVO na Navbar com ponto verde discreto (#22C55E) */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#141418] border border-[#27272F]"
            title="Calculado automaticamente no fuso horário America/Sao_Paulo"
          >
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                status.isOpen ? 'bg-[#22C55E]' : 'bg-[#71717A]'
              }`}
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] font-medium text-[#F5F5F4] tabular-nums whitespace-nowrap">
              {status.badgeText}
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenCartModal}
            aria-label={`Abrir lista de orçamento (${cartCount} itens)`}
            className="btn-dark-secondary relative inline-flex items-center justify-center w-11 h-11"
          >
            <ClipboardList className="w-4.5 h-4.5 text-[#0EA5E9]" aria-hidden="true" />
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="animate-badge-pop font-mono absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 rounded-[2px] bg-[#F97316] text-[#0B0B0D] text-[11px] font-bold tabular-nums flex items-center justify-center"
              >
                {cartCount}
              </span>
            )}
          </button>

          <a
            href={quickWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark-primary hidden sm:inline-flex items-center gap-2 px-4.5 py-2 text-xs uppercase font-bold tracking-wider min-h-[42px]"
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
            className="btn-dark-secondary xl:hidden inline-flex items-center justify-center w-11 h-11"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="animate-panel-switch xl:hidden bg-[#0B0B0D] border-t border-[#27272F] px-4 py-4 shadow-2xl"
        >
          <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-[#27272F]">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  status.isOpen ? 'bg-[#22C55E]' : 'bg-[#71717A]'
                }`}
                aria-hidden="true"
              />
              <span className="font-mono text-xs font-medium text-[#F5F5F4] tabular-nums">
                {status.badgeText}
              </span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-[#0EA5E9]">
              {BUSINESS_CONFIG.whatsappDisplay}
            </span>
          </div>

          <nav aria-label="Navegação mobile" className="grid grid-cols-1 divide-y divide-[#27272F] mb-4 border-b border-[#27272F]">
            {NAV_LINKS.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-1 text-sm font-bold uppercase tracking-wider text-[#F5F5F4] active:text-[#0EA5E9] transition-colors flex items-center justify-between"
              >
                <span>
                  <span className="font-mono text-xs text-[#F97316] mr-2">0{idx + 1}</span>
                  {link.label}
                </span>
                <span className="font-mono text-xs text-[#A1A1AA]">→</span>
              </a>
            ))}
          </nav>

          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-dark-primary inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-bold uppercase tracking-wider min-h-[46px]"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Chamar Diogo</span>
            </a>
            <a
              href={BUSINESS_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-dark-secondary inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-bold uppercase tracking-wider min-h-[46px]"
            >
              <Navigation className="w-4 h-4 text-[#0EA5E9] shrink-0" aria-hidden="true" />
              <span>Rota no GPS</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
