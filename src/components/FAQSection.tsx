import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/mockData';

export const FAQSection: React.FC = () => {
  // Keep first FAQ open by default
  const [openIds, setOpenIds] = useState<string[]>([FAQ_DATA[0].id]);

  const toggleItem = (id: string) => {
    setOpenIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq-section" className="py-16 lg:py-24 bg-[#0e1015] border-b border-[#1c212e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#ff5500] uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>ОТВЕТЫ НА ВОПРОСЫ</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-zinc-400 font-normal">ПРОЗРАЧНЫЕ ПРАВИЛА</span>
          </div>
          <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Часто задаваемые вопросы
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Всё, что важно знать перед визитом в автосервис AUTOCARE.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="rounded-xl bg-[#131620] border border-[#232938] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-[#ff6e26] transition-colors focus:outline-none focus:ring-1 focus:ring-[#ff5500] cursor-pointer"
                >
                  <span className="pr-4">{item.question}</span>
                  <div className={`p-1.5 rounded-lg bg-[#1a1e2a] text-zinc-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-[#ff5500]' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-zinc-300 leading-relaxed border-t border-[#1d2330]/60 animate-in fade-in duration-150">
                    <p>{item.answer}</p>
                    <div className="mt-3 text-[11px] text-zinc-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
                      <span>Категория: {item.category}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
