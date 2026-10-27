import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, Copy, Check, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface ContactSectionProps {
  onOpenBooking: () => void;
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking, onShowToast }) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(COMPANY_INFO.address);
    setCopiedAddress(true);
    onShowToast('Адрес скопирован в буфер обмена (Демо).');
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="contacts-section" className="py-16 lg:py-24 bg-[#0a0c10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ff5500] uppercase tracking-wider mb-2">
            <span>ЛОКАЦИЯ И СВЯЗЬ</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-amber-400">[ДЕМОНСТРАЦИОННЫЕ ДАННЫЕ]</span>
          </div>
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Контакты автосервиса AUTOCARE
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
            Удобный заезд с третьего транспортного кольца, собственная закрытая охраняемая парковка для клиентов и зона выдачи.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Phone Card with Clickable tel: link */}
            <div className="p-5 rounded-2xl bg-[#131620] border border-[#232938]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-[#1a1e2b] border border-[#2a3245] flex items-center justify-center text-[#ff5500]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 font-medium">Прямой телефон мастера-приёмщика:</div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="font-['Outfit'] text-xl font-bold text-white hover:text-[#ff5500] transition-colors tabular-nums inline-block mt-0.5"
                  >
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="text-[11px] text-amber-400/90 font-mono mt-1">
                {COMPANY_INFO.phoneNotice} — звонки обрабатываются тестовым автоответчиком
              </div>
            </div>

            {/* Address Card */}
            <div className="p-5 rounded-2xl bg-[#131620] border border-[#232938]">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1a1e2b] border border-[#2a3245] flex items-center justify-center text-[#ff5500] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 font-medium">Адрес технического центра:</div>
                    <div className="text-sm font-semibold text-white mt-1 leading-snug">
                      {COMPANY_INFO.address}
                    </div>
                    <div className="text-[11px] text-amber-400/90 font-mono mt-1">
                      {COMPANY_INFO.addressNotice}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyAddress}
                  className="p-2 rounded-lg bg-[#1a1e2a] hover:bg-[#252c3c] text-zinc-300 hover:text-white transition-colors shrink-0"
                  title="Скопировать адрес"
                >
                  {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Schedule Card */}
            <div className="p-5 rounded-2xl bg-[#131620] border border-[#232938]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1a1e2b] border border-[#2a3245] flex items-center justify-center text-[#ff5500] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 font-medium">График работы сервиса:</div>
                  <div className="text-sm font-semibold text-white mt-1">
                    {COMPANY_INFO.schedule}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    Приёмка в ремонт осуществляется до 20:30.
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-[#131620] border border-[#232938]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1a1e2b] border border-[#2a3245] flex items-center justify-center text-[#ff5500] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 font-medium">Электронная почта для смет и безнала:</div>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-sm font-semibold text-white hover:text-[#ff5500] transition-colors mt-0.5 inline-block"
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <div className="text-[11px] text-amber-400/90 font-mono mt-1">
                    {COMPANY_INFO.emailNotice}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Campus Map & Drive-in Navigation Vector */}
          <div className="lg:col-span-7 rounded-2xl bg-[#12151e] border border-[#242b3b] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1f2636] mb-4">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-[#ff5500]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Схема заезда и внутренняя навигация AUTOCARE
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">GPS: 55.7062° N, 37.6581° E (ДЕМО)</span>
              </div>

              {/* Styled Interactive SVG Campus Layout */}
              <div className="relative rounded-xl bg-[#0d0f15] border border-[#1e2330] p-4 overflow-hidden aspect-[16/10] flex items-center justify-center">
                <svg
                  viewBox="0 0 540 320"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-auto drop-shadow-md"
                >
                  {/* Surrounding Road */}
                  <rect x="10" y="270" width="520" height="40" rx="4" fill="#181c26" stroke="#252d3d" strokeWidth="1" />
                  <line x1="20" y1="290" x2="520" y2="290" stroke="#ff5500" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />
                  <text x="200" y="294" fill="#9ca3af" fontSize="11" fontFamily="sans-serif">АВТОЗАВОДСКАЯ УЛИЦА</text>

                  {/* Drive-in Entrance Arrow */}
                  <path d="M260 270 L260 220" stroke="#ff5500" strokeWidth="2.5" strokeDasharray="4 4" />
                  <polygon points="260,210 255,222 265,222" fill="#ff5500" />
                  <rect x="235" y="228" width="50" height="16" rx="3" fill="#ff5500" />
                  <text x="242" y="240" fill="#ffffff" fontSize="9" fontWeight="bold">ВЪЕЗД №1</text>

                  {/* Campus Grounds */}
                  <rect x="40" y="30" width="460" height="200" rx="8" fill="#121620" stroke="#283244" strokeWidth="1.5" />

                  {/* Main Service Bays Building (Bays 1-8) */}
                  <rect x="60" y="50" width="280" height="110" rx="6" fill="#1b212f" stroke="#3b465e" strokeWidth="1.5" />
                  <text x="75" y="75" fill="#ffffff" fontSize="12" fontWeight="bold">ГЛАВНЫЙ СЕРВИСНЫЙ ЦЕХ</text>
                  <text x="75" y="92" fill="#ff5500" fontSize="10" fontWeight="600">8 ПОСТОВ ОБСЛУЖИВАНИЯ + 3D СХОД-РАЗВАЛ</text>

                  {/* Bays Doors */}
                  <rect x="75" y="115" width="45" height="35" rx="3" fill="#252e42" stroke="#485673" />
                  <text x="85" y="136" fill="#9ca3af" fontSize="9">БОКС 1-2</text>
                  <rect x="135" y="115" width="45" height="35" rx="3" fill="#252e42" stroke="#485673" />
                  <text x="145" y="136" fill="#9ca3af" fontSize="9">БОКС 3-4</text>
                  <rect x="195" y="115" width="45" height="35" rx="3" fill="#252e42" stroke="#485673" />
                  <text x="205" y="136" fill="#9ca3af" fontSize="9">БОКС 5-6</text>
                  <rect x="255" y="115" width="45" height="35" rx="3" fill="#252e42" stroke="#ff5500" />
                  <text x="262" y="136" fill="#ff5500" fontSize="9">ДЕТЕЙЛИНГ</text>

                  {/* Customer Lounge & Reception */}
                  <rect x="360" y="50" width="120" height="70" rx="6" fill="#171e2b" stroke="#ff5500" strokeWidth="1.5" />
                  <text x="375" y="75" fill="#ffffff" fontSize="11" fontWeight="bold">РЕЦЕПЦИЯ</text>
                  <text x="375" y="90" fill="#9ca3af" fontSize="9">Клиентский лаундж</text>
                  <text x="375" y="103" fill="#ff7733" fontSize="8">Кофе / Wi-Fi / ТВ</text>

                  {/* Customer Parking */}
                  <rect x="360" y="135" width="120" height="75" rx="4" fill="#131822" stroke="#2c364a" strokeDasharray="3 3" />
                  <text x="372" y="155" fill="#9ca3af" fontSize="9" fontWeight="bold">ПАРКОВКА КЛИЕНТОВ</text>
                  <text x="372" y="170" fill="#6b7280" fontSize="8">Бесплатно для посетителей</text>
                  <circle cx="460" cy="180" r="10" fill="#ff5500" opacity="0.2" />
                  <text x="457" y="184" fill="#ff5500" fontSize="10" fontWeight="bold">P</text>
                </svg>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-[#1f2636] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-zinc-400">
                Бесплатный въезд по коду брони на шлагбауме.
              </div>

              <button
                onClick={onOpenBooking}
                className="px-5 py-2.5 rounded-lg bg-[#ff5500] hover:bg-[#ff6e26] text-white text-xs font-semibold shadow-md shadow-[#ff5500]/20 transition-all cursor-pointer"
              >
                Записаться на этот адрес
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
