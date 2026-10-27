import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesCatalog } from './components/ServicesCatalog';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { CostCalculator } from './components/CostCalculator';
import { BookingForm } from './components/BookingForm';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { CarClass, ServiceItem, ToastMessage } from './types';
import { SERVICES_DATA } from './data/servicesData';

export default function App() {
  // Navigation State: 'home' | 'services' | 'calculator' | 'about' | 'contacts'
  const [activeTab, setActiveTab] = useState<string>('home');

  // Detailed Service View Modal State
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);

  // Calculator State
  const [calculatorServiceIds, setCalculatorServiceIds] = useState<string[]>([
    SERVICES_DATA[0].id,
    SERVICES_DATA[1].id
  ]);
  const [calculatorCarClass, setCalculatorCarClass] = useState<CarClass>('sedan');
  const [calculatorAddonIds, setCalculatorAddonIds] = useState<string[]>(['addon-wash']);

  // Booking Form Pre-filled items
  const [bookingServiceIds, setBookingServiceIds] = useState<string[]>([]);
  const [bookingCarClass, setBookingCarClass] = useState<CarClass>('sedan');

  // Notification Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Calculator Toggles
  const handleToggleCalculatorService = (serviceOrId: ServiceItem | string) => {
    const serviceId = typeof serviceOrId === 'string' ? serviceOrId : serviceOrId.id;
    setCalculatorServiceIds(prev => {
      const exists = prev.includes(serviceId);
      const next = exists ? prev.filter(id => id !== serviceId) : [...prev, serviceId];
      const targetService = SERVICES_DATA.find(s => s.id === serviceId);
      if (!exists && targetService) {
        addToast('Добавлено в калькулятор', `Услуга «${targetService.title}» добавлена в предварительную смету.`, 'success');
      }
      return next;
    });
  };

  const handleToggleCalculatorAddon = (addonId: string) => {
    setCalculatorAddonIds(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handleClearCalculator = () => {
    setCalculatorServiceIds([]);
    setCalculatorAddonIds([]);
    addToast('Калькулятор очищен', 'Все выбранные позиции удалены из сметы.', 'info');
  };

  // Direct Book a specific service from Catalog or Modal
  const handleBookSingleService = (service: ServiceItem) => {
    setBookingServiceIds([service.id]);
    setBookingCarClass(calculatorCarClass);
    setActiveTab('home');
    setSelectedServiceForModal(null);
    
    // Smooth scroll to booking section
    setTimeout(() => {
      const el = document.getElementById('booking-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    
    addToast('Выбрана услуга', `Услуга «${service.title}» добавлена в форму онлайн-записи.`, 'info');
  };

  // Transfer from Calculator to Booking Form
  const handleProceedFromCalculatorToBooking = () => {
    if (calculatorServiceIds.length === 0) return;
    setBookingServiceIds([...calculatorServiceIds]);
    setBookingCarClass(calculatorCarClass);
    setActiveTab('home');

    setTimeout(() => {
      const el = document.getElementById('booking-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);

    addToast('Смета перенесена', `${calculatorServiceIds.length} усл. перенесены в заявку на запись.`, 'success');
  };

  // Quick Action to open Booking Form
  const handleOpenBooking = () => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById('booking-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenCalculator = () => {
    setActiveTab('calculator');
    setTimeout(() => {
      const el = document.getElementById('cost-calculator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0e1015] text-[#f1f3f7]">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        calculatorCount={calculatorServiceIds.length}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Render View Based on Active Tab */}
        {activeTab === 'home' && (
          <>
            <HeroSection
              onOpenBooking={handleOpenBooking}
              onOpenCalculator={handleOpenCalculator}
              onExploreServices={() => handleNavigate('services')}
            />

            <ServicesCatalog
              onSelectService={(service) => setSelectedServiceForModal(service)}
              onAddToCalculator={handleToggleCalculatorService}
              onBookService={handleBookSingleService}
              selectedCalculatorIds={calculatorServiceIds}
            />

            <CostCalculator
              selectedServiceIds={calculatorServiceIds}
              onToggleService={handleToggleCalculatorService}
              onClearCalculator={handleClearCalculator}
              selectedCarClass={calculatorCarClass}
              onCarClassChange={setCalculatorCarClass}
              selectedAddonIds={calculatorAddonIds}
              onToggleAddon={handleToggleCalculatorAddon}
              onProceedToBooking={handleProceedFromCalculatorToBooking}
            />

            <AboutSection />

            <BookingForm
              initialServiceIds={bookingServiceIds.length > 0 ? bookingServiceIds : calculatorServiceIds}
              initialCarClass={bookingCarClass}
              onSuccessToast={(msg) => addToast('Запись оформлена', msg, 'success')}
            />

            <FAQSection />

            <ContactSection
              onOpenBooking={handleOpenBooking}
              onShowToast={(msg) => addToast('Информация', msg, 'info')}
            />
          </>
        )}

        {activeTab === 'services' && (
          <div className="py-6">
            <ServicesCatalog
              onSelectService={(service) => setSelectedServiceForModal(service)}
              onAddToCalculator={handleToggleCalculatorService}
              onBookService={handleBookSingleService}
              selectedCalculatorIds={calculatorServiceIds}
            />
            
            {/* Quick Banner to Calculator */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="p-8 rounded-2xl bg-[#141822] border border-[#252c3c] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-['Outfit'] text-xl font-bold text-white">
                    Хотите узнать точную стоимость для вашей марки?
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Воспользуйтесь калькулятором с учётом класса автомобиля и нормо-часов.
                  </p>
                </div>
                <button
                  onClick={() => handleNavigate('calculator')}
                  className="px-6 py-3 rounded-xl bg-[#ff5500] hover:bg-[#ff6e26] text-white text-xs font-semibold whitespace-nowrap cursor-pointer transition-all"
                >
                  Перейти в калькулятор
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="py-6">
            <CostCalculator
              selectedServiceIds={calculatorServiceIds}
              onToggleService={handleToggleCalculatorService}
              onClearCalculator={handleClearCalculator}
              selectedCarClass={calculatorCarClass}
              onCarClassChange={setCalculatorCarClass}
              selectedAddonIds={calculatorAddonIds}
              onToggleAddon={handleToggleCalculatorAddon}
              onProceedToBooking={handleProceedFromCalculatorToBooking}
            />

            {/* Adjacent Booking Form for direct submission */}
            <BookingForm
              initialServiceIds={calculatorServiceIds}
              initialCarClass={calculatorCarClass}
              onSuccessToast={(msg) => addToast('Запись оформлена', msg, 'success')}
            />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="py-6">
            <AboutSection />
            <FAQSection />
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="py-6">
            <ContactSection
              onOpenBooking={handleOpenBooking}
              onShowToast={(msg) => addToast('Информация', msg, 'info')}
            />

            <BookingForm
              initialServiceIds={bookingServiceIds.length > 0 ? bookingServiceIds : calculatorServiceIds}
              initialCarClass={bookingCarClass}
              onSuccessToast={(msg) => addToast('Запись оформлена', msg, 'success')}
            />
          </div>
        )}

      </main>

      {/* Service Detail Modal (Подробная страница услуги) */}
      <ServiceDetailModal
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onAddToCalculator={handleToggleCalculatorService}
        onBookService={handleBookSingleService}
        isInCalculator={selectedServiceForModal ? calculatorServiceIds.includes(selectedServiceForModal.id) : false}
      />

      {/* Floating Notification Toasts */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
