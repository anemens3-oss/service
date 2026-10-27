import React, { useMemo } from 'react';
import { Calculator, Check, Trash2, ArrowRight, Car, Shield, Crown, Plus, Sparkles, Clock } from 'lucide-react';
import { CarClass, ServiceItem } from '../types';
import { SERVICES_DATA, CAR_CLASSES, CALCULATOR_ADDONS } from '../data/servicesData';

interface CostCalculatorProps {
  selectedServiceIds: string[];
  onToggleService: (serviceId: string) => void;
  onClearCalculator: () => void;
  selectedCarClass: CarClass;
  onCarClassChange: (carClass: CarClass) => void;
  selectedAddonIds: string[];
  onToggleAddon: (addonId: string) => void;
  onProceedToBooking: () => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({
  selectedServiceIds,
  onToggleService,
  onClearCalculator,
  selectedCarClass,
  onCarClassChange,
  selectedAddonIds,
  onToggleAddon,
  onProceedToBooking
}) => {
  // Compute calculated services breakdown
  const servicesBreakdown = useMemo(() => {
    return SERVICES_DATA.filter((s) => selectedServiceIds.includes(s.id)).map((s) => {
      let price = s.priceByClass[selectedCarClass];
      return {
        id: s.id,
        title: s.title,
        category: s.categoryLabel,
        price,
        duration: s.duration
      };
    });
  }, [selectedServiceIds, selectedCarClass]);

  const addonsBreakdown = useMemo(() => {
    return CALCULATOR_ADDONS.filter((a) => selectedAddonIds.includes(a.id));
  }, [selectedAddonIds]);

  const totalSum = useMemo(() => {
    const servicesTotal = servicesBreakdown.reduce((sum, item) => sum + item.price, 0);
    const addonsTotal = addonsBreakdown.reduce((sum, item) => sum + item.price, 0);
    return servicesTotal + addonsTotal;
  }, [servicesBreakdown, addonsBreakdown]);

  const currentCarClassObj = CAR_CLASSES.find((c) => c.id === selectedCarClass) || CAR_CLASSES[0];

  return (
    <section id="cost-calculator" className="py-16 lg:py-24 bg-[#0a0c10] border-t border-b border-[#1c212d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#ff5500] uppercase tracking-wider mb-2">
            <span>ИНТЕРАКТИВНЫЙ РАСЧЁТ СМЕТЫ</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-400 font-normal">ПРОЗРАЧНОЕ ЦЕНООБРАЗОВАНИЕ</span>
          </div>
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Калькулятор стоимости обслуживания
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
            Выберите класс вашего автомобиля и требуемые работы. Стоимость рассчитывается в режиме реального времени на основе регламентных норм времени и базовых тарифов.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Selections (Class + Services Checklist + Addons) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Vehicle Class Selection */}
            <div className="p-6 rounded-2xl bg-[#131620] border border-[#232938]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  1. Выберите класс автомобиля
                </span>
                <span className="text-[11px] text-zinc-400">Влияет на нормо-часы и объем масел</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CAR_CLASSES.map((c) => {
                  const isSelected = selectedCarClass === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => onCarClassChange(c.id as CarClass)}
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#ff5500]/10 border-[#ff5500] text-white shadow-md shadow-[#ff5500]/15'
                          : 'bg-[#181c27] border-[#273042] text-zinc-300 hover:border-[#38455e]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        {c.id === 'sedan' && <Car className={`w-4 h-4 ${isSelected ? 'text-[#ff5500]' : 'text-zinc-400'}`} />}
                        {c.id === 'suv' && <Shield className={`w-4 h-4 ${isSelected ? 'text-[#ff5500]' : 'text-zinc-400'}`} />}
                        {c.id === 'premium' && <Crown className={`w-4 h-4 ${isSelected ? 'text-[#ff5500]' : 'text-zinc-400'}`} />}
                        
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#ff5500]" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{c.label}</div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">
                          {c.id === 'sedan' ? 'Базовый тариф' : c.id === 'suv' ? '+15% к норме' : '+35% к норме'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Main Services Selection */}
            <div className="p-6 rounded-2xl bg-[#131620] border border-[#232938]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  2. Выберите базовые услуги
                </span>
                <span className="text-[11px] text-zinc-400">
                  Выбрано: {selectedServiceIds.length} из {SERVICES_DATA.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {SERVICES_DATA.map((service) => {
                  const isChecked = selectedServiceIds.includes(service.id);
                  const classPrice = service.priceByClass[selectedCarClass];

                  return (
                    <label
                      key={service.id}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-[#181d2a] border-[#ff5500]/60 text-white'
                          : 'bg-[#161a25] border-[#252d3e] text-zinc-300 hover:border-[#354056]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleService(service.id)}
                          className="w-4 h-4 rounded text-[#ff5500] focus:ring-[#ff5500] focus:ring-offset-[#131620] border-zinc-600 bg-[#1c2230] accent-[#ff5500]"
                        />
                        <div>
                          <div className="text-xs font-semibold">{service.title}</div>
                          <div className="text-[10px] text-zinc-400 flex items-center gap-2 mt-0.5">
                            <span>{service.categoryLabel}</span>
                            <span aria-hidden="true" className="text-zinc-600">·</span>
                            <span>{service.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-['Outfit'] text-sm font-bold text-white tabular-nums">
                          {classPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Optional Add-ons */}
            <div className="p-6 rounded-2xl bg-[#131620] border border-[#232938]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  3. Рекомендуемые сопутствующие работы
                </span>
                <span className="text-[11px] text-zinc-400">Опционально</span>
              </div>

              <div className="space-y-2.5">
                {CALCULATOR_ADDONS.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                        isChecked
                          ? 'bg-[#191d2c] border-[#ff5500]/60 text-white'
                          : 'bg-[#151924] border-[#242c3d] text-zinc-300 hover:border-[#333e54]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => onToggleAddon(addon.id)}
                          className="w-4 h-4 rounded text-[#ff5500] focus:ring-[#ff5500] border-zinc-600 bg-[#1c2230] accent-[#ff5500]"
                        />
                        <div>
                          <div className="text-xs font-medium">{addon.title}</div>
                          <div className="text-[10px] text-zinc-500 mt-0.5">{addon.desc}</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-['Outfit'] text-xs font-bold text-white tabular-nums">
                          +{addon.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Summary & Transfer to Booking Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="p-6 rounded-2xl bg-[#141722] border border-[#272e3f] shadow-2xl space-y-6">
              
              {/* Summary Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#232b3b]">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#ff5500]" />
                  <span className="font-['Outfit'] font-bold text-base text-white">Предварительная смета</span>
                </div>
                {(selectedServiceIds.length > 0 || selectedAddonIds.length > 0) && (
                  <button
                    onClick={onClearCalculator}
                    className="text-xs text-zinc-400 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                    title="Сбросить все выбранные пункты"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Очистить</span>
                  </button>
                )}
              </div>

              {/* Vehicle Type Notice */}
              <div className="text-xs p-3 rounded-xl bg-[#171c28] border border-[#263044] flex items-center justify-between">
                <span className="text-zinc-400">Выбран класс ТС:</span>
                <span className="font-semibold text-white">{currentCarClassObj.label}</span>
              </div>

              {/* Items Breakdown List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {servicesBreakdown.length === 0 && addonsBreakdown.length === 0 ? (
                  <div className="py-8 text-center text-xs text-zinc-500">
                    <p>Пока не выбрано ни одной услуги.</p>
                    <p className="mt-1">Отметьте пункты слева для расчёта предварительной стоимости.</p>
                  </div>
                ) : (
                  <>
                    {servicesBreakdown.map((item) => (
                      <div key={item.id} className="flex items-start justify-between text-xs py-1 border-b border-[#1f2635]">
                        <div className="pr-2">
                          <div className="text-zinc-200 font-medium">{item.title}</div>
                          <div className="text-[10px] text-zinc-500 flex items-center gap-1.5 mt-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{item.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-semibold text-white tabular-nums">
                            {item.price.toLocaleString('ru-RU')} ₽
                          </span>
                          <button
                            onClick={() => onToggleService(item.id)}
                            className="text-zinc-500 hover:text-zinc-300 p-0.5"
                            aria-label={`Удалить ${item.title}`}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}

                    {addonsBreakdown.map((item) => (
                      <div key={item.id} className="flex items-start justify-between text-xs py-1 border-b border-[#1f2635]">
                        <div className="pr-2 text-zinc-300 font-normal">
                          {item.title}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-semibold text-zinc-300 tabular-nums">
                            +{item.price.toLocaleString('ru-RU')} ₽
                          </span>
                          <button
                            onClick={() => onToggleAddon(item.id)}
                            className="text-zinc-500 hover:text-zinc-300 p-0.5"
                            aria-label={`Удалить ${item.title}`}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Total Row */}
              <div className="pt-4 border-t border-[#232b3b]">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-zinc-400">Предварительный итог:</span>
                  <div className="text-right">
                    <span className="font-['Outfit'] text-3xl font-extrabold text-[#ff5500] tabular-nums">
                      {totalSum.toLocaleString('ru-RU')}
                    </span>
                    <span className="text-base font-normal text-zinc-400 ml-1">₽</span>
                  </div>
                </div>
                <div className="text-[11px] text-zinc-500 text-right">
                  Точная стоимость согласуется до начала работ после визуального осмотра.
                </div>
              </div>

              {/* Transfer to Booking Form CTA */}
              <button
                onClick={onProceedToBooking}
                disabled={totalSum === 0}
                className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  totalSum > 0
                    ? 'bg-[#ff5500] hover:bg-[#ff6e26] text-white shadow-lg shadow-[#ff5500]/25 hover:scale-[1.01]'
                    : 'bg-[#202533] text-zinc-500 cursor-not-allowed'
                }`}
              >
                <span>Перенести в форму записи</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[10px] text-zinc-500 text-center leading-relaxed">
                Выбранные позиции автоматически заполнят заявку на удобную дату и время.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
