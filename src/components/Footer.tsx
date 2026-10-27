import React from 'react';
import { Phone, Mail, MapPin, Wrench, Shield, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090a0d] border-t border-[#1a1e28] text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#181c25]">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ff5500] to-[#cc4400] flex items-center justify-center text-white">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-['Outfit'] font-extrabold text-xl tracking-wider text-white">
                AUTO<span className="text-[#ff5500]">CARE</span>
              </span>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Премиальный технический центр обслуживания европейских, азиатских и отечественных автомобилей. Заводские регламенты, сертифицированные мастера и 12 месяцев официальной гарантии.
            </p>

            {/* Explicit Demo Disclaimer */}
            <div className="p-3 rounded-xl bg-[#11141c] border border-[#1f2533] text-[11px] text-amber-400/90 leading-relaxed max-w-sm">
              <span className="font-semibold block text-amber-300 mb-0.5">ДЕМОНСТРАЦИОННЫЙ ПРОЕКТ:</span>
              Все контактные номера, физический адрес, имена и отзывы на сайте являются демонстрационными данными. Онлайн-запись работает в локальном ознакомительном режиме.
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Навигация</div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Главная страница
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Услуги и прейскурант
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-white transition-colors cursor-pointer">
                  Калькулятор сметы
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  О сервисе и цехе
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contacts')} className="hover:text-white transition-colors cursor-pointer">
                  Контакты и схема заезда
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Популярные работы</div>
            <ul className="space-y-2 text-zinc-400">
              <li>Компьютерная диагностика 360°</li>
              <li>Замена моторного масла и фильтров</li>
              <li>3D сход-развал Hunter Hawkeye</li>
              <li>Керамическое покрытие кузова 9H</li>
              <li>Ремонт подвески и тормозной системы</li>
              <li>Заправка автокондиционера</li>
            </ul>
          </div>

          {/* Quick Contact & Working Hours */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">Контакты</div>
            <div className="space-y-2 text-zinc-300">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="hover:text-[#ff5500] transition-colors block font-semibold text-white tabular-nums"
              >
                {COMPANY_INFO.phoneDisplay}
              </a>
              <p className="text-[11px] text-zinc-400">{COMPANY_INFO.schedule}</p>
              <p className="text-[11px] text-zinc-400">{COMPANY_INFO.address}</p>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141720] border border-[#222838] text-xs text-zinc-300 hover:text-white hover:border-[#ff5500]/50 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Наверх</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            © 2026 AUTOCARE Service Center. Все права защищены. Демонстрационный прототип.
          </div>
          <div className="flex items-center gap-4">
            <span>Регламент ТО</span>
            <span aria-hidden="true" className="text-zinc-700">·</span>
            <span>Политика конфиденциальности (Демо)</span>
            <span aria-hidden="true" className="text-zinc-700">·</span>
            <span>Гарантийные обязательства</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
