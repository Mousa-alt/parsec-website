
import React from 'react';
import { motion } from 'framer-motion';
import { Braces } from './Braces';

export const About: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-[#E1E6EB] bg-white p-2 shadow-xl">
          <img
            src="https://picsum.photos/seed/founder/800/1000"
            alt="Founder"
            className="w-full h-full object-cover rounded-2xl opacity-90 grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        {/* Floating badge */}
        <div className="absolute -bottom-6 -right-6 bg-white px-6 py-4 rounded-2xl border border-[#E1E6EB] shadow-xl">
          <div className="text-[#2D4769] font-bold">Omar Mosallam</div>
          <div className="text-[10px] text-[#8EA3B5] uppercase tracking-widest font-black">Founder & CEO</div>
        </div>
      </motion.div>

      <div>
        <h2 className="text-4xl font-black mb-6 text-[#2D4769] tracking-tight">Our Philosophy</h2>
        <div className="space-y-6 text-[#557089] leading-relaxed text-lg">
          <p>
            Parsec was born from a simple realization: high-end industries move too slow. We saw contractors drowning in paperwork and clinics losing patients to busy phone lines.
          </p>
          <p>
            We don't build "templates." We engineer custom AI nervous systems that act as an invisible, highly-competent extension of your team.
          </p>
          <p>
            Our signature <Braces size="sm"><span className="font-bold text-[#2D4769]">branding</span></Braces> represents our modular approach—replacing the "impossible" variables in your business with high-performance automated constants.
          </p>
        </div>

        <div className="mt-10 flex gap-4">
          <div className="px-5 py-2.5 rounded-full bg-[#F0F2F5] border border-[#E1E6EB] text-[10px] font-black text-[#2D4769] uppercase tracking-widest">
            Precision First
          </div>
          <div className="px-5 py-2.5 rounded-full bg-[#F0F2F5] border border-[#E1E6EB] text-[10px] font-black text-[#2D4769] uppercase tracking-widest">
            Quiet Confidence
          </div>
        </div>
      </div>
    </div>
  );
};
