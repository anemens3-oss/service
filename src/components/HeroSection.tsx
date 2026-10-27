import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, Shield, Clock, Award, Phone } from 'lucide-react';
import { COMPANY_INFO, WORKSHOP_STATS } from '../data/mockData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenCalculator,
  onExploreServices
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#1f2430]">
      {/* Subtle ambient gradient mesh in background */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-[#ff5500]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[300px] bg-[#1a2333]/30 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Split: Value Proposition & High-Tech Workshop Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Quiet unboxed kicker metadata with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wide text-zinc-400 mb-4">
              <span className="text-[#ff5500]">AUTOCARE ENGINEERING</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span>ПРЕМИУМ СТАНДАРТЫ</span>
              <span aria-hidden="true" className="text-zinc-600">/</span>
              <span>12 МЕСЯЦЕВ ГАРАНТИИ</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.08] mb-6">
              Современный автосервис честных правил и <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#ff7733]">заводской точности</span>
            </h1>

            {/* Value Proposition Description */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-8 font-normal">
              Комплексное техническое обслуживание, высокоточная компьютерная диагностика 360°, ремонт узлов и детейлинг. Открытая ремзона, видеофиксация работ и фиксированные сметы без навязанных услуг.
            </p>

            {/* Adjacency Trust Proof Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-9">
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span>Дилерские сканеры Bosch & Launch</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span>Фиксация цены до начала работ</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span>Панорамный лаундж с трансляцией</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#ff5500] shrink-0" />
                <span>Сертифицированные масла с допусками</span>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-semibold text-white bg-[#ff5500] hover:bg-[#ff6e26] active:bg-[#cc4400] shadow-lg shadow-[#ff5500]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Записаться на обслуживание</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-semibold text-zinc-200 bg-[#171a22] hover:bg-[#202532] border border-[#2d3445] hover:text-white transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-[#ff5500]" />
                <span>Калькулятор стоимости</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="inline-flex sm:hidden items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-semibold text-zinc-300 bg-[#14161e] border border-[#262c3a]"
              >
                <Phone className="w-4 h-4 text-[#ff5500]" />
                <span>Быстрый звонок (Демо)</span>
              </a>
            </div>

          </div>

          {/* Right Column: High-End Automotive Visual Rig Schematic & Service Bay Viewport */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-[#141720] border border-[#272d3d] p-5 shadow-2xl overflow-hidden group">
              
              {/* Header bar of the workshop terminal */}
              <div className="flex items-center justify-between pb-4 border-b border-[#242b3b] mb-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5500]" />
                  <span className="font-semibold text-zinc-200 tracking-wider">BAY 04 / ДИАГНОСТИЧЕСКИЙ ПОСТ</span>
                </div>
                <span className="text-zinc-400 font-mono text-[11px]">HUNTER 3D ONLINE</span>
              </div>

              {/* Graphic Stage: Modern Precision Automotive Silhouette & Telemetry Grid */}
              <div className="relative w-full aspect-[4/3] rounded-xl bg-gradient-to-b from-[#0b0c10] via-[#10131a] to-[#141822] border border-[#1f2533] p-4 flex flex-col justify-between overflow-hidden">
                
                {/* Laser Grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2535_1px,transparent_1px),linear-gradient(to_bottom,#1f2535_1px,transparent_1px)] bg-[size:28px_28px] opacity-25" />
                
                {/* Ambient glow underneath car */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-[#ff5500]/15 blur-xl rounded-full" />

                {/* SVG Automotive Silhouette & Calibration Vectors */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 460 220"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                    aria-label="Схема высокоточной калибровки автомобиля в сервисном боксе"
                  >
                    {/* Floor scissor lift base */}
                    <rect x="50" y="180" width="360" height="8" rx="2" fill="#2a3040" />
                    <rect x="90" y="166" width="90" height="14" rx="2" fill="#384154" />
                    <rect x="280" y="166" width="90" height="14" rx="2" fill="#384154" />
                    <path d="M110 180 L160 166 M160 180 L110 166" stroke="#4b556b" strokeWidth="2" />
                    <path d="M300 180 L350 166 M350 180 L300 166" stroke="#4b556b" strokeWidth="2" />

                    {/* Wheel Assemblies */}
                    {/* Front Wheel */}
                    <circle cx="120" cy="155" r="28" fill="#15171e" stroke="#ff5500" strokeWidth="2.5" />
                    <circle cx="120" cy="155" r="16" fill="#202532" stroke="#4f5970" strokeWidth="1.5" />
                    <circle cx="120" cy="155" r="6" fill="#ff5500" />
                    {/* Rear Wheel */}
                    <circle cx="340" cy="155" r="28" fill="#15171e" stroke="#ff5500" strokeWidth="2.5" />
                    <circle cx="340" cy="155" r="16" fill="#202532" stroke="#4f5970" strokeWidth="1.5" />
                    <circle cx="340" cy="155" r="6" fill="#ff5500" />

                    {/* Brake discs glow */}
                    <circle cx="120" cy="155" r="12" stroke="#ff8533" strokeDasharray="3 3" strokeWidth="1.5" opacity="0.6" />
                    <circle cx="340" cy="155" r="12" stroke="#ff8533" strokeDasharray="3 3" strokeWidth="1.5" opacity="0.6" />

                    {/* Sleek Aerodynamic Sports Sedan Silhouette */}
                    <path
                      d="M40 152 C45 135 60 128 85 125 L120 123 L165 88 C185 75 220 72 270 72 L330 84 C360 92 385 108 410 130 C425 142 428 152 422 154 C415 155 400 155 372 155 C370 135 350 125 340 125 C320 125 310 140 308 155 L152 155 C150 135 138 125 120 125 C102 125 90 140 88 155 L40 152 Z"
                      fill="url(#car-gradient)"
                      stroke="#454f66"
                      strokeWidth="1.5"
                    />

                    {/* Greenhouse / Cabin windows */}
                    <path
                      d="M172 90 L220 80 L275 80 L322 92 C320 110 300 118 275 118 L195 118 C180 118 174 105 172 90 Z"
                      fill="#0d1118"
                      stroke="#ff5500"
                      strokeWidth="1"
                      opacity="0.8"
                    />
                    {/* B-Pillar divider */}
                    <line x1="245" y1="80" x2="245" y2="118" stroke="#333c4d" strokeWidth="2.5" />

                    {/* Headlight & Taillight laser lines */}
                    {/* Taillight amber strip */}
                    <path d="M41 138 Q50 140 60 140" stroke="#ff3b30" strokeWidth="3" strokeLinecap="round" />
                    {/* Headlight LED Matrix signature */}
                    <path d="M410 132 Q422 136 425 142" stroke="#5eead4" strokeWidth="3" strokeLinecap="round" />
                    <line x1="425" y1="140" x2="455" y2="148" stroke="#5eead4" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                    {/* 3D Laser Alignment Vectors & Crosshairs */}
                    <line x1="120" y1="20" x2="120" y2="185" stroke="#ff5500" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
                    <line x1="340" y1="20" x2="340" y2="185" stroke="#ff5500" strokeWidth="1" strokeDasharray="4 4" opacity="0.7" />
                    <circle cx="120" cy="50" r="4" fill="#ff5500" />
                    <circle cx="340" cy="50" r="4" fill="#ff5500" />

                    <text x="130" y="53" fill="#ff7733" fontSize="10" fontFamily="monospace" fontWeight="bold">AXLE_01: 0.00°</text>
                    <text x="350" y="53" fill="#ff7733" fontSize="10" fontFamily="monospace" fontWeight="bold">AXLE_02: +0.02°</text>

                    {/* Gradient Definitions */}
                    <defs>
                      <linearGradient id="car-gradient" x1="40" y1="72" x2="428" y2="155" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#1e222e" />
                        <stop offset="45%" stopColor="#2c3345" />
                        <stop offset="70%" stopColor="#222837" />
                        <stop offset="100%" stopColor="#141822" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Lower Diagnostic Readout Badges inside viewport */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-[#1c2230]">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>СИСТЕМА В НОРМЕ (0 ОШИБОК)</span>
                  </div>
                  <span className="text-zinc-500">Hunter DSP700 Calibration</span>
                </div>

              </div>

              {/* Service Bay Status Card Strip */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#ff5500]" />
                  <span>Гарантия 12 месяцев</span>
                </div>
                <div className="text-zinc-500">·</div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#ff5500]" />
                  <span>Приём по записи без очередей</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Full-width 4-Column KPI Trust Strip below the Hero Split */}
        <div className="mt-16 pt-10 border-t border-[#1f2432] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WORKSHOP_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                  {stat.value}
                </span>
                {stat.value === '12' && <span className="text-sm font-semibold text-[#ff5500]">мес.</span>}
                {stat.value === '45' && <span className="text-sm font-semibold text-[#ff5500]">мин.</span>}
              </div>
              <span className="text-sm font-semibold text-zinc-200 mb-1">{stat.label}</span>
              <span className="text-xs text-zinc-400 leading-snug">{stat.detail}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
