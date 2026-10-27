import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  Droplets, 
  Disc, 
  Sparkles, 
  ShieldAlert, 
  Wrench, 
  Wind, 
  Zap, 
  Search, 
  ArrowRight, 
  Plus, 
  Check, 
  Info,
  Clock,
  Shield
} from 'lucide-react';
import { ServiceItem, ServiceCategory } from '../types';
import { SERVICES_DATA, CATEGORIES } from '../data/servicesData';

interface ServicesCatalogProps {
  onSelectService: (service: ServiceItem) => void;
  onAddToCalculator: (service: ServiceItem) => void;
  onBookService: (service: ServiceItem) => void;
  selectedCalculatorIds: string[];
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({
  onSelectService,
  onAddToCalculator,
  onBookService,
  selectedCalculatorIds
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Icon mapping
  const renderServiceIcon = (name: string) => {
    const props = { className: 'w-5 h-5 text-[#ff5500]' };
    switch (name) {
      case 'Cpu': return <Cpu {...props} />;
      case 'Droplets': return <Droplets {...props} />;
      case 'Disc': return <Disc {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'ShieldAlert': return <ShieldAlert {...props} />;
      case 'Wrench': return <Wrench {...props} />;
      case 'Wind': return <Wind {...props} />;
      case 'Zap': return <Zap {...props} />;
      default: return <Wrench {...props} />;
    }
  };

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
      const matchesQuery = 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.whatIncluded.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="services-catalog" className="py-16 lg:py-24 bg-[#0e1015]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ff5500] uppercase tracking-wider mb-2">
              <span>КАТАЛОГ И СТОИМОСТЬ</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400 font-normal">ПРОЗРАЧНЫЕ ТАРИФЫ 2026</span>
            </div>
            <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Услуги автосервиса AUTOCARE
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-xl">
              Точная диагностика, слесарный ремонт, обслуживание агрегатов и детейлинг. Все работы выполняются по заводским техническим бюллетеням.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по услугам или узлам..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#151821] border border-[#272e3d] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-zinc-300"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Filter Controls as allowed by constitution) */}
        <div className="flex items-center gap-1.5 p-1 bg-[#13161f] border border-[#232938] rounded-xl overflow-x-auto scrollbar-none mb-10 max-w-full">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as ServiceCategory)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#ff5500] text-white shadow-md shadow-[#ff5500]/20'
                    : 'text-zinc-400 hover:text-white hover:bg-[#1a1e2b]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-[#13161f] border border-[#232838] p-8">
            <p className="text-base text-zinc-300 font-medium">По запросу «{searchQuery}» услуг не найдено</p>
            <p className="text-xs text-zinc-500 mt-2">Попробуйте изменить поисковый запрос или выбрать другую категорию.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#ff5500] hover:text-[#ff751a] cursor-pointer"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const isInCalc = selectedCalculatorIds.includes(service.id);
              return (
                <div
                  key={service.id}
                  className="group rounded-2xl bg-[#141720] border border-[#242b3b] hover:border-[#38425a] p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
                >
                  <div>
                    {/* Top Row: Icon + Unboxed Category + Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#1a1e29] border border-[#2b3345] flex items-center justify-center group-hover:border-[#ff5500]/40 transition-colors">
                        {renderServiceIcon(service.iconName)}
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span>{service.categoryLabel}</span>
                        {service.badge && (
                          <>
                            <span aria-hidden="true" className="text-zinc-600">·</span>
                            <span className="text-[#ff5500] font-medium">{service.badge}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="font-['Outfit'] text-xl font-bold text-white group-hover:text-[#ff6e26] transition-colors mb-2">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3 mb-5">
                      {service.shortDesc}
                    </p>

                    {/* Unboxed Metadata Strip (Duration & Warranty) */}
                    <div className="flex items-center gap-4 text-xs text-zinc-400 pb-4 mb-4 border-b border-[#1f2533]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{service.duration}</span>
                      </div>
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="truncate max-w-[150px]">{service.warranty}</span>
                      </div>
                    </div>

                    {/* Included Preview List */}
                    <div className="space-y-2 mb-6">
                      <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Что входит в работу:</div>
                      {service.whatIncluded.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-[#ff5500] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: Price & Functional Action Controls */}
                  <div className="pt-4 border-t border-[#1f2533] flex flex-col gap-3">
                    
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-zinc-400">Стоимость от:</span>
                      <span className="font-['Outfit'] text-2xl font-bold text-white tabular-nums">
                        {service.priceFrom.toLocaleString('ru-RU')}{' '}
                        <span className="text-sm font-normal text-zinc-400">₽</span>
                      </span>
                    </div>

                    {/* Actions: View Details, Add to Calc, Book */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onSelectService(service)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#1a1f2b] hover:bg-[#232a3b] border border-[#2d374d] text-xs font-semibold text-zinc-200 hover:text-white transition-colors cursor-pointer"
                        title="Посмотреть подробное описание и этапы работ"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Подробнее</span>
                      </button>

                      <button
                        onClick={() => onAddToCalculator(service)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                          isInCalc
                            ? 'bg-[#ff5500]/10 border-[#ff5500] text-[#ff5500]'
                            : 'bg-[#181c26] border-[#293245] text-zinc-300 hover:text-white hover:bg-[#202737]'
                        }`}
                        title={isInCalc ? 'Услуга уже в калькуляторе' : 'Добавить в калькулятор'}
                      >
                        {isInCalc ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{isInCalc ? 'В смете' : '+ Расчёт'}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => onBookService(service)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#ff5500] hover:bg-[#ff6e26] active:bg-[#cc4400] text-white text-xs font-semibold shadow-md shadow-[#ff5500]/20 transition-all cursor-pointer"
                    >
                      <span>Записаться на эту услугу</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
