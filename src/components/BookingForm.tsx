import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Car, 
  User, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { BookingFormData, CarClass, ServiceItem } from '../types';
import { SERVICES_DATA, CAR_CLASSES } from '../data/servicesData';
import { COMPANY_INFO } from '../data/mockData';

interface BookingFormProps {
  initialServiceIds?: string[];
  initialCarClass?: CarClass;
  onSuccessToast?: (msg: string) => void;
}

const AVAILABLE_TIME_SLOTS = [
  '09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30', '20:00'
];

export const BookingForm: React.FC<BookingFormProps> = ({
  initialServiceIds = [],
  initialCarClass = 'sedan',
  onSuccessToast
}) => {
  // Today's ISO date string YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  
  // Tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // In 2 days
  const in2Days = new Date();
  in2Days.setDate(in2Days.getDate() + 2);
  const in2DaysStr = in2Days.toISOString().split('T')[0];

  // Form State
  const [formData, setFormData] = useState<BookingFormData>({
    serviceIds: initialServiceIds.length > 0 ? initialServiceIds : [SERVICES_DATA[0].id],
    carMake: '',
    carModel: '',
    carYear: '',
    carClass: initialCarClass,
    clientName: '',
    phone: '',
    date: tomorrowStr,
    timeSlot: '12:00',
    comment: '',
    agreeToPolicy: true
  });

  // Keep synced if initialServiceIds changes externally
  useEffect(() => {
    if (initialServiceIds.length > 0) {
      setFormData(prev => ({
        ...prev,
        serviceIds: Array.from(new Set([...prev.serviceIds, ...initialServiceIds]))
      }));
    }
  }, [initialServiceIds]);

  useEffect(() => {
    if (initialCarClass) {
      setFormData(prev => ({ ...prev, carClass: initialCarClass }));
    }
  }, [initialCarClass]);

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  // Phone number formatter
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d+]/g, '');
    setFormData(prev => ({ ...prev, phone: raw }));
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (formData.serviceIds.length === 0) {
      newErrors.serviceIds = 'Выберите хотя бы одну услугу для записи.';
    }

    if (!formData.carMake.trim()) {
      newErrors.carMake = 'Укажите марку автомобиля (например, BMW, Audi, Kia).';
    }

    if (!formData.carModel.trim()) {
      newErrors.carModel = 'Укажите модель (например, 5 Series, Q5, Rio).';
    }

    if (!formData.clientName.trim() || formData.clientName.trim().length < 2) {
      newErrors.clientName = 'Пожалуйста, введите ваше имя (не менее 2 символов).';
    }

    // Phone validation (at least 10 digits)
    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      newErrors.phone = 'Укажите корректный номер телефона (минимум 10 цифр).';
    }

    if (!formData.date) {
      newErrors.date = 'Выберите желаемую дату визита.';
    }

    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Выберите удобный временной интервал.';
    }

    if (!formData.agreeToPolicy) {
      newErrors.agreeToPolicy = 'Необходимо подтвердить согласие с регламентом.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Generate clean demo booking reference code
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const refCode = `AC-2026-${randomCode}`;
    setBookingReference(refCode);
    setIsSubmitted(true);

    if (onSuccessToast) {
      onSuccessToast(`Заявка ${refCode} успешно зарегистрирована в демо-режиме.`);
    }
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(bookingReference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setBookingReference('');
    setFormData({
      serviceIds: [SERVICES_DATA[0].id],
      carMake: '',
      carModel: '',
      carYear: '',
      carClass: 'sedan',
      clientName: '',
      phone: '',
      date: tomorrowStr,
      timeSlot: '12:00',
      comment: '',
      agreeToPolicy: true
    });
    setErrors({});
  };

  // Selected services details
  const selectedServicesList = SERVICES_DATA.filter(s => formData.serviceIds.includes(s.id));
  const estimatedTotal = selectedServicesList.reduce(
    (acc, curr) => acc + curr.priceByClass[formData.carClass],
    0
  );

  return (
    <section id="booking-section" className="py-16 lg:py-24 bg-[#0e1015] border-b border-[#1d222e]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#ff5500] uppercase tracking-wider mb-2">
            <span>ОНЛАЙН-РЕГИСТРАЦИЯ</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-400 font-normal">БЕЗ ОЖИДАНИЯ В ОЧЕРЕДИ</span>
          </div>
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Запись на сервис и обслуживание
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Забронируйте свободный подъёмник и мастера на удобное время.
          </p>

          {/* Prominent Demo Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a1f2b] border border-[#2b3547] text-xs text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Демонстрационный режим: отправка на реальный сервер отключена</span>
          </div>
        </div>

        {/* State: Submitted Confirmation Voucher */}
        {isSubmitted ? (
          <div className="rounded-2xl bg-[#141722] border border-[#2d364a] p-6 sm:p-10 shadow-2xl animate-in fade-in duration-300">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#ff5500]/15 border border-[#ff5500]/40 flex items-center justify-center text-[#ff5500] mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white">
                Заявка успешно оформлена!
              </h3>
              
              {/* Mandatory Demo Mode Confirmation Banner */}
              <div className="mt-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs max-w-lg mx-auto">
                <strong className="block mb-0.5">РЕЖИМ ТЕСТИРОВАНИЯ И ДЕМОНСТРАЦИИ:</strong>
                Заявка сохранена локально. Данные не передаются в CRM и на внешний сервер. В реальной версии мастер связывается в течение 10 минут.
              </div>
            </div>

            {/* Voucher Details */}
            <div className="rounded-xl bg-[#0f121a] border border-[#222837] p-6 max-w-xl mx-auto space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#202737]">
                <span className="text-zinc-400">Номер электронной брони:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-white tabular-nums">{bookingReference}</span>
                  <button
                    onClick={handleCopyRef}
                    className="p-1 text-zinc-400 hover:text-white transition-colors"
                    title="Скопировать номер брони"
                  >
                    {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#202737]">
                <div>
                  <span className="text-zinc-400 block mb-1">Дата и время визита:</span>
                  <span className="font-semibold text-white">
                    {formData.date} в {formData.timeSlot}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block mb-1">Автомобиль:</span>
                  <span className="font-semibold text-white">
                    {formData.carMake} {formData.carModel} {formData.carYear ? `(${formData.carYear})` : ''}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#202737]">
                <div>
                  <span className="text-zinc-400 block mb-1">Клиент:</span>
                  <span className="font-semibold text-white">{formData.clientName}</span>
                </div>
                <div>
                  <span className="text-zinc-400 block mb-1">Телефон:</span>
                  <span className="font-semibold text-white tabular-nums">{formData.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-zinc-400 block mb-2">Выбранные направления:</span>
                <ul className="space-y-1 text-zinc-300">
                  {selectedServicesList.map(s => (
                    <li key={s.id} className="flex items-center justify-between">
                      <span>• {s.title}</span>
                      <span className="tabular-nums font-semibold">{s.priceByClass[formData.carClass].toLocaleString('ru-RU')} ₽</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-baseline justify-between pt-3 border-t border-[#202737]">
                <span className="text-zinc-400">Предварительная смета:</span>
                <span className="font-['Outfit'] text-xl font-bold text-[#ff5500] tabular-nums">
                  {estimatedTotal.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleResetForm}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1c2230] hover:bg-[#252e42] border border-[#2e374c] text-xs font-semibold text-zinc-200 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Заполнить новую запись</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ff5500] hover:bg-[#ff6e26] text-xs font-semibold text-white shadow-md shadow-[#ff5500]/20 transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Позвонить в сервис (Демо)</span>
              </a>
            </div>

          </div>
        ) : (
          /* Main Interactive Booking Form */
          <form 
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl bg-[#141722] border border-[#252c3c] p-6 sm:p-10 shadow-2xl space-y-8"
          >
            
            {/* Step 1: Select Services */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-white uppercase tracking-wider">
                  1. Требуемые услуги <span className="text-[#ff5500]">*</span>
                </label>
                <span className="text-[11px] text-zinc-400">
                  Выбрано: {formData.serviceIds.length}
                </span>
              </div>

              {errors.serviceIds && (
                <div className="flex items-center gap-1.5 text-xs text-red-400 mb-2">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.serviceIds}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-52 overflow-y-auto pr-1">
                {SERVICES_DATA.map((srv) => {
                  const isChecked = formData.serviceIds.includes(srv.id);
                  return (
                    <button
                      type="button"
                      key={srv.id}
                      onClick={() => {
                        setFormData(prev => {
                          const exists = prev.serviceIds.includes(srv.id);
                          const next = exists 
                            ? prev.serviceIds.filter(id => id !== srv.id)
                            : [...prev.serviceIds, srv.id];
                          return { ...prev, serviceIds: next };
                        });
                        if (errors.serviceIds) setErrors(prev => ({ ...prev, serviceIds: '' }));
                      }}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#1a2130] border-[#ff5500]/70 text-white'
                          : 'bg-[#161a25] border-[#252d3d] text-zinc-300 hover:border-[#384359]'
                      }`}
                    >
                      <div className="pr-2">
                        <div className="text-xs font-medium">{srv.title}</div>
                        <div className="text-[10px] text-zinc-400 mt-0.5">{srv.categoryLabel}</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-bold tabular-nums">
                          {srv.priceByClass[formData.carClass].toLocaleString('ru-RU')} ₽
                        </span>
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-[#ff5500] border-[#ff5500] text-white' : 'border-zinc-600 bg-[#12151e]'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Vehicle Class & Details */}
            <div className="pt-6 border-t border-[#202737]">
              <label className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
                2. Данные автомобиля <span className="text-[#ff5500]">*</span>
              </label>

              {/* Class switch */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                {CAR_CLASSES.map(cls => (
                  <button
                    type="button"
                    key={cls.id}
                    onClick={() => setFormData(prev => ({ ...prev, carClass: cls.id as CarClass }))}
                    className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all text-center cursor-pointer ${
                      formData.carClass === cls.id
                        ? 'bg-[#ff5500]/15 border-[#ff5500] text-white font-semibold'
                        : 'bg-[#161a25] border-[#242c3d] text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {cls.label}
                  </button>
                ))}
              </div>

              {/* Make & Model inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-zinc-300 block mb-1.5">
                    Марка авто <span className="text-[#ff5500]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.carMake}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, carMake: e.target.value }));
                      if (errors.carMake) setErrors(prev => ({ ...prev, carMake: '' }));
                    }}
                    placeholder="Например, BMW"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#161a25] border border-[#272e3f] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500]"
                  />
                  {errors.carMake && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.carMake}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-zinc-300 block mb-1.5">
                    Модель <span className="text-[#ff5500]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.carModel}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, carModel: e.target.value }));
                      if (errors.carModel) setErrors(prev => ({ ...prev, carModel: '' }));
                    }}
                    placeholder="Например, 530d G30"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#161a25] border border-[#272e3f] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500]"
                  />
                  {errors.carModel && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.carModel}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-zinc-300 block mb-1.5">
                    Год выпуска
                  </label>
                  <input
                    type="text"
                    value={formData.carYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, carYear: e.target.value }))}
                    placeholder="2021"
                    maxLength={4}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#161a25] border border-[#272e3f] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Date and Time Slot */}
            <div className="pt-6 border-t border-[#202737]">
              <label className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
                3. Дата и время записи <span className="text-[#ff5500]">*</span>
              </label>

              {/* Quick Date Shortcuts */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, date: todayStr }))}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                    formData.date === todayStr 
                      ? 'bg-[#ff5500] text-white' 
                      : 'bg-[#181c27] text-zinc-400 hover:text-white border border-[#252d3f]'
                  }`}
                >
                  Сегодня
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, date: tomorrowStr }))}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                    formData.date === tomorrowStr 
                      ? 'bg-[#ff5500] text-white' 
                      : 'bg-[#181c27] text-zinc-400 hover:text-white border border-[#252d3f]'
                  }`}
                >
                  Завтра
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, date: in2DaysStr }))}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-colors ${
                    formData.date === in2DaysStr 
                      ? 'bg-[#ff5500] text-white' 
                      : 'bg-[#181c27] text-zinc-400 hover:text-white border border-[#252d3f]'
                  }`}
                >
                  Послезавтра
                </button>
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-zinc-400">Другая дата:</span>
                  <input
                    type="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="px-2.5 py-1.5 rounded-md bg-[#161a25] border border-[#282f42] text-xs text-white focus:outline-none focus:border-[#ff5500]"
                  />
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {AVAILABLE_TIME_SLOTS.map(slot => {
                  const isSelected = formData.timeSlot === slot;
                  return (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormData(prev => ({ ...prev, timeSlot: slot }))}
                      className={`py-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#ff5500] border-[#ff5500] text-white shadow-md shadow-[#ff5500]/20'
                          : 'bg-[#161a25] border-[#252d3e] text-zinc-300 hover:border-[#384358]'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Client Contact Information */}
            <div className="pt-6 border-t border-[#202737]">
              <label className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
                4. Ваши контактные данные <span className="text-[#ff5500]">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-zinc-300 block mb-1.5">
                    Ваше имя <span className="text-[#ff5500]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, clientName: e.target.value }));
                        if (errors.clientName) setErrors(prev => ({ ...prev, clientName: '' }));
                      }}
                      placeholder="Константин"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#161a25] border border-[#272e3f] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500]"
                    />
                  </div>
                  {errors.clientName && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.clientName}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs text-zinc-300 block mb-1.5">
                    Телефон для подтверждения <span className="text-[#ff5500]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#161a25] border border-[#272e3f] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500]"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
                  )}
                  <span className="text-[10px] text-zinc-500 block mt-1">Формат: +7 (9XX) XXX-XX-XX</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1.5">
                  Симптомы неисправности или пожелания мастеру (необязательно)
                </label>
                <textarea
                  rows={2}
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="Например: скрип при торможении справа, вибрация на скорости свыше 90 км/ч..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#161a25] border border-[#272e3f] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] resize-none"
                />
              </div>
            </div>

            {/* Step 5: Policy & Submission */}
            <div className="pt-4 border-t border-[#202737] flex flex-col gap-4">
              
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-zinc-400">
                <input
                  type="checkbox"
                  checked={formData.agreeToPolicy}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, agreeToPolicy: e.target.checked }));
                    if (errors.agreeToPolicy) setErrors(prev => ({ ...prev, agreeToPolicy: '' }));
                  }}
                  className="w-4 h-4 rounded text-[#ff5500] focus:ring-[#ff5500] border-zinc-600 bg-[#161a25] accent-[#ff5500] mt-0.5"
                />
                <span>
                  Я согласен на обработку контактных данных в рамках регламента автосервиса и ознакомлен с правилами гарантии.
                </span>
              </label>
              {errors.agreeToPolicy && (
                <p className="text-[11px] text-red-400">{errors.agreeToPolicy}</p>
              )}

              {/* Total & Submit Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-zinc-400">Ориентировочная сумма:</span>
                  <span className="font-['Outfit'] text-2xl font-bold text-white tabular-nums">
                    {estimatedTotal.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#ff5500] hover:bg-[#ff6e26] active:bg-[#cc4400] text-white text-xs font-semibold shadow-lg shadow-[#ff5500]/25 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Подтвердить запись (Демо-режим)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </form>
        )}

      </div>
    </section>
  );
};
