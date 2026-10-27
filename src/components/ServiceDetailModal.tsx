import React, { useEffect } from 'react';
import { X, Check, Clock, Shield, Wrench, Calendar, Plus, ChevronRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onAddToCalculator: (service: ServiceItem) => void;
  onBookService: (service: ServiceItem) => void;
  isInCalculator: boolean;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onAddToCalculator,
  onBookService,
  isInCalculator
}) => {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!service) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#12151e] border border-[#262e3f] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#202738] bg-[#151924]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#ff5500] uppercase tracking-wider mb-1">
              <span>{service.categoryLabel}</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400 font-normal">ТЕХНИЧЕСКИЙ РЕГЛАМЕНТ</span>
            </div>
            <h2 id="service-modal-title" className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
              {service.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#1c2230] text-zinc-400 hover:text-white hover:bg-[#252d40] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff5500]"
            aria-label="Закрыть окно"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-8 divide-y divide-[#1e2535]">
          
          {/* Top Quick Attributes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[#171b26] border border-[#252d3f] flex flex-col">
              <span className="text-zinc-400 flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-[#ff5500]" /> Время работы:
              </span>
              <span className="text-sm font-bold text-white tabular-nums">{service.duration}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#171b26] border border-[#252d3f] flex flex-col">
              <span className="text-zinc-400 flex items-center gap-1.5 mb-1">
                <Shield className="w-3.5 h-3.5 text-[#ff5500]" /> Гарантия:
              </span>
              <span className="text-sm font-bold text-white">{service.warranty}</span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-[#171b26] border border-[#252d3f] flex flex-col">
              <span className="text-zinc-400 flex items-center gap-1.5 mb-1">
                <Wrench className="w-3.5 h-3.5 text-[#ff5500]" /> Стоимость от:
              </span>
              <span className="text-sm font-bold text-[#ff5500] tabular-nums">
                {service.priceFrom.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>

          {/* Full Technical Description */}
          <div className="pt-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Описание процедуры</h3>
            <p className="text-sm text-zinc-300 leading-relaxed font-normal">
              {service.fullDesc}
            </p>
          </div>

          {/* Pricing by Car Class */}
          <div className="pt-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Тарифная сетка по классам автомобилей
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#151923] border border-[#232b3b]">
                <div className="text-xs text-zinc-400">Седан / Хэтчбек</div>
                <div className="text-lg font-bold text-white tabular-nums mt-1">
                  {service.priceByClass.sedan.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#151923] border border-[#232b3b]">
                <div className="text-xs text-zinc-400">Кроссовер / Универсал</div>
                <div className="text-lg font-bold text-white tabular-nums mt-1">
                  {service.priceByClass.suv.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#151923] border border-[#232b3b]">
                <div className="text-xs text-zinc-400">Внедорожник / Премиум SUV</div>
                <div className="text-lg font-bold text-white tabular-nums mt-1">
                  {service.priceByClass.premium.toLocaleString('ru-RU')} ₽
                </div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="pt-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Что входит в комплекс работ:
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {service.whatIncluded.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <div className="w-4 h-4 rounded-full bg-[#ff5500]/10 border border-[#ff5500]/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 text-[#ff5500]" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stages of Work with Natural Human Editorial Numbering */}
          <div className="pt-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Этапы выполнения в ремзоне
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.stages.map((stage) => (
                <div key={stage.step} className="p-3.5 rounded-xl bg-[#151924] border border-[#242c3d]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-['Outfit'] font-extrabold text-sm text-[#ff5500]">
                      {stage.step}.
                    </span>
                    <span className="text-xs font-semibold text-white">{stage.title}</span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-snug">{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Used */}
          <div className="pt-6">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
              Используемое сертифицированное оборудование
            </h3>
            <p className="text-xs text-zinc-300 bg-[#161a25] border border-[#242c3d] p-3 rounded-xl">
              {service.equipmentUsed}
            </p>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 border-t border-[#202738] bg-[#141823] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-zinc-400">Стоимость услуги:</span>
            <span className="font-['Outfit'] text-2xl font-bold text-white tabular-nums">
              от {service.priceFrom.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onAddToCalculator(service)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                isInCalculator
                  ? 'bg-[#ff5500]/10 border-[#ff5500] text-[#ff5500]'
                  : 'bg-[#181d28] border-[#2b3548] text-zinc-200 hover:text-white hover:bg-[#222a3a]'
              }`}
            >
              {isInCalculator ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{isInCalculator ? 'В калькуляторе' : 'В калькулятор'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBookService(service);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ff5500] hover:bg-[#ff6e26] text-white text-xs font-semibold shadow-md shadow-[#ff5500]/20 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Записаться онлайн</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
