import React from 'react';
import { ShieldCheck, Award, Eye, Wrench, CheckCircle2, Star, Coffee, Monitor } from 'lucide-react';
import { COMPANY_INFO, DEMO_REVIEWS } from '../data/mockData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-16 lg:py-24 bg-[#0c0e14] border-b border-[#1d222e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ff5500] uppercase tracking-wider mb-2">
            <span>ИНФРАСТРУКТУРА И СТАНДАРТЫ</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-400 font-normal">ПРОФЕССИОНАЛЬНАЯ КОМАНДА</span>
          </div>
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            О техническом центре AUTOCARE
          </h2>
          <p className="mt-3 text-base text-zinc-300 leading-relaxed font-normal">
            Мы объединили инженерную дисциплину заводских станций обслуживания и внимательное отношение к владельцу автомобиля. Никаких навязанных процедур: каждый шаг фиксируется в заказ-наряде и фотоотчёте.
          </p>
        </div>

        {/* 4 Pillars of Quality */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="p-6 rounded-2xl bg-[#131622] border border-[#23293a] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1b2030] border border-[#2b334a] flex items-center justify-center text-[#ff5500] mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-['Outfit'] text-lg font-bold text-white mb-2">Честная гарантия 12 мес.</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Письменная фиксация гарантийных обязательств на работы и оригинальные компоненты со склада.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#131622] border border-[#23293a] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1b2030] border border-[#2b334a] flex items-center justify-center text-[#ff5500] mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-['Outfit'] text-lg font-bold text-white mb-2">100% Открытая ремзона</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Вы можете находиться рядом с авто или наблюдать за манипуляциями через панорамные окна лаунджа.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#131622] border border-[#23293a] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1b2030] border border-[#2b334a] flex items-center justify-center text-[#ff5500] mb-4">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="font-['Outfit'] text-lg font-bold text-white mb-2">Дилерское оборудование</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Стенды Hunter 3D, диагностические комплексы Bosch и профессиональный специнструмент Hazet.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#131622] border border-[#23293a] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1b2030] border border-[#2b334a] flex items-center justify-center text-[#ff5500] mb-4">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-['Outfit'] text-lg font-bold text-white mb-2">Премиум комфорт</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Зерновой свежий кофе, рабочие зоны с быстрым Wi-Fi, трансляция камер и сервисное такси.
              </p>
            </div>
          </div>

        </div>

        {/* Technical Architecture of the Facility (Styled Vector Blueprint) */}
        <div className="mb-20 rounded-2xl bg-[#12151f] border border-[#242b3b] p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#202737] mb-6">
            <div>
              <span className="text-xs font-semibold text-[#ff5500] uppercase tracking-wider block mb-1">
                ПЛАНИРОВКА ТЕХНИЧЕСКОГО ЦЕНТРА
              </span>
              <h3 className="font-['Outfit'] text-2xl font-bold text-white">
                8 специализированных постов и изолированный детейлинг-бокс
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono">
              <span>ПЛОЩАДЬ: 1 200 М²</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>ВЫСОТА ПОТОЛКОВ: 5.8 М</span>
            </div>
          </div>

          {/* Architectural Layout Graphic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-xl bg-[#161a25] border border-[#252d3f]">
              <div className="text-[11px] font-mono text-[#ff5500] mb-1">БОКСЫ 01 - 04</div>
              <div className="text-sm font-bold text-white mb-1">Слесарный цех и ТО</div>
              <p className="text-xs text-zinc-400">
                4 двухстоечных подъёмника Nussbaum 4т для быстрой замены масел, тормозов и фильтров.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#161a25] border border-[#252d3f]">
              <div className="text-[11px] font-mono text-[#ff5500] mb-1">БОКС 05</div>
              <div className="text-sm font-bold text-white mb-1">3D Сход-развал Hunter</div>
              <p className="text-xs text-zinc-400">
                Четырехстоечный ножничный стенд с интегрированными люфт-детекторами и оптическими мишенями.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#161a25] border border-[#252d3f]">
              <div className="text-[11px] font-mono text-[#ff5500] mb-1">БОКСЫ 06 - 07</div>
              <div className="text-sm font-bold text-white mb-1">Агрегатный ремонт и диагностика</div>
              <p className="text-xs text-zinc-400">
                Посты углубленной дефектовки моторов, коробок передач и электронных сетей автоэлектриками.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#161a25] border border-[#252d3f]">
              <div className="text-[11px] font-mono text-[#ff5500] mb-1">БОКС 08 (ЧИСТАЯ ЗОНА)</div>
              <div className="text-sm font-bold text-white mb-1">Детейлинг и керамика 9H</div>
              <p className="text-xs text-zinc-400">
                Обеспыленная студия с регулируемым бестеневым освещением CRI &gt; 95 и ИК-сушильными установками.
              </p>
            </div>

          </div>
        </div>

        {/* Customer Reviews Section (Clearly Marked Demo Data) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#ff5500] uppercase tracking-wider mb-1">
                <span>ОТЗЫВЫ АВТОМОБИЛИСТОВ</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-amber-400">[ДЕМОНСТРАЦИОННЫЕ ДАННЫЕ]</span>
              </div>
              <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
                Что говорят клиенты AUTOCARE
              </h3>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="text-amber-400">★ 5.0</span>
              <span>на основе тестовых оценок сервиса</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-[#131620] border border-[#232938] flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars & Demo Tag */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">ДЕМО-ОТЗЫВ</span>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-6 font-normal">
                    «{rev.text}»
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1f2535]">
                  <div className="text-xs font-bold text-white">{rev.author}</div>
                  <div className="text-[11px] text-[#ff7733] font-medium mt-0.5">{rev.car}</div>
                  <div className="text-[10px] text-zinc-500 mt-1 flex items-center justify-between">
                    <span>{rev.service}</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
