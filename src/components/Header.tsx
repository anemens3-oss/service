import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, Calculator, Wrench } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface HeaderProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  calculatorCount: number;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  calculatorCount,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Главная' },
    { id: 'services', label: 'Услуги и цены' },
    { id: 'calculator', label: 'Калькулятор', badge: calculatorCount > 0 ? calculatorCount : undefined },
    { id: 'about', label: 'О сервисе' },
    { id: 'contacts', label: 'Контакты' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0e1015]/90 backdrop-blur-md border-b border-[#202430]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Primary Action) */}
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark (Single clean text element) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5500] rounded-md p-1"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ff5500] to-[#cc4400] flex items-center justify-center text-white shadow-lg shadow-[#ff5500]/20 group-hover:scale-105 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="font-['Outfit'] font-extrabold text-2xl tracking-wider text-white whitespace-nowrap">
                AUTO<span className="text-[#ff5500]">CARE</span>
              </span>
            </button>
          </div>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer text-sm font-medium ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    {item.badge !== undefined && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#ff5500] text-white tabular-nums">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff5500] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action (Phone Link + Booking Button) */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors group"
              title={`${COMPANY_INFO.phoneDisplay} ${COMPANY_INFO.phoneNotice}`}
            >
              <div className="w-8 h-8 rounded-full bg-[#1a1e27] border border-[#2a3040] flex items-center justify-center text-[#ff5500] group-hover:border-[#ff5500]/50 transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-right">
                <span className="tabular-nums text-zinc-200">{COMPANY_INFO.phoneDisplay}</span>
                <span className="text-[10px] text-zinc-500 font-normal">08:00 - 21:00 (Демо)</span>
              </div>
            </a>

            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#ff5500] hover:bg-[#ff6e26] active:bg-[#cc4400] rounded-lg shadow-md shadow-[#ff5500]/25 transition-all whitespace-nowrap cursor-pointer hover:shadow-lg hover:shadow-[#ff5500]/30 active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Записаться онлайн</span>
            </button>
          </div>

          {/* Mobile Menu & Quick Actions Toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => handleNavClick('calculator')}
              className="p-2 rounded-lg bg-[#181b22] border border-[#262c3b] text-zinc-300 relative"
              aria-label="Калькулятор"
            >
              <Calculator className="w-5 h-5" />
              {calculatorCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ff5500] text-white text-[10px] font-bold flex items-center justify-center">
                  {calculatorCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#181b22] border border-[#262c3b] text-zinc-200 hover:text-white focus:outline-none"
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#11131a] border-b border-[#252a38] px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-left transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#1e2330] text-white font-semibold border-l-2 border-[#ff5500]'
                    : 'text-zinc-300 hover:bg-[#161922] hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#ff5500] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-5 pt-4 border-t border-[#222736] flex flex-col gap-3">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#181c26] border border-[#282f42] text-sm font-semibold text-zinc-200"
            >
              <Phone className="w-4 h-4 text-[#ff5500]" />
              <span>{COMPANY_INFO.phoneDisplay}</span>
              <span className="text-xs text-zinc-500">{COMPANY_INFO.phoneNotice}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#ff5500] text-white font-semibold text-sm shadow-md shadow-[#ff5500]/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Записаться на сервис</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
