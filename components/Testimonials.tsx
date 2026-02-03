
import React from 'react';
import { TESTIMONIALS } from '../constants.tsx';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full" />
        <h2 className="text-3xl font-black tracking-tight text-[#2D4769]">Testimonials</h2>
      </div>

      <div className="space-y-6">
        {TESTIMONIALS.map((t) => (
          <div key={t.author} className="tactile-card p-10 relative">
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-12 h-12 text-[#2D4769]" />
            </div>
            <p className="text-xl text-[#2D4769] italic mb-6 leading-relaxed relative z-10">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="w-10 h-10 rounded-full bg-[#F0F2F5] border border-[#E1E6EB] flex items-center justify-center text-[#2D4769] font-black">
                {t.author.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-[#2D4769]">{t.author}</span>
                <div className="text-[10px] text-[#8EA3B5] uppercase tracking-widest font-bold">
                  {t.role}, {t.company}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
