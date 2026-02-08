import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Users, Bot, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface ComparisonData {
  category: string;
  oldWay: { time: string; cost: string; resources: string; };
  parsecWay: { time: string; cost: string; resources: string; };
  savingsPercent: number;
}

const COMPARISONS: ComparisonData[] = [
  {
    category: 'Invoice Processing',
    oldWay: { time: '40 hrs/week', cost: '$2,000/mo', resources: '3 employees' },
    parsecWay: { time: '10 mins/week', cost: '$50/mo', resources: '1 AI agent' },
    savingsPercent: 97.5
  },
  {
    category: 'Customer Calls',
    oldWay: { time: '8 hrs/day', cost: '$3,500/mo', resources: '2 staff' },
    parsecWay: { time: '24/7 coverage', cost: '$200/mo', resources: '1 Voice Agent' },
    savingsPercent: 94
  },
  {
    category: 'Social Media',
    oldWay: { time: '20 hrs/week', cost: '$1,500/mo', resources: '1 manager' },
    parsecWay: { time: '2 hrs/week', cost: '$100/mo', resources: '1 Social Agent' },
    savingsPercent: 93
  },
  {
    category: 'Hiring',
    oldWay: { time: '30 hrs/hire', cost: '$500/hire', resources: 'HR team' },
    parsecWay: { time: '2 hrs/hire', cost: '$50/hire', resources: '1 Hiring Agent' },
    savingsPercent: 90
  }
];

export const Comparison: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const comparison = COMPARISONS[activeIndex];

  return (
    <div className="bg-white border-2 border-[#E1E6EB] rounded-2xl p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full" />
          <span className="text-xs font-black uppercase tracking-widest text-[#2D4769]">
            The ParSec Difference
          </span>
        </div>
        <div className="text-2xl font-black text-[#10B981]">{comparison.savingsPercent}% saved</div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {COMPARISONS.map((comp, index) => (
          <button
            key={comp.category}
            onClick={() => setActiveIndex(index)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
              activeIndex === index
                ? 'bg-[#2D4769] text-white'
                : 'bg-[#F0F2F5] text-[#557089] hover:bg-[#E1E6EB]'
            }`}
          >
            {comp.category}
          </button>
        ))}
      </div>

      {/* Comparison grid */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 gap-4"
      >
        {/* Old Way */}
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-4">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#EF4444] mb-3">Old Way</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#EF4444]" />
              <span className="text-xs font-bold text-[#991B1B]">{comparison.oldWay.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-[#EF4444]" />
              <span className="text-xs font-bold text-[#991B1B]">{comparison.oldWay.cost}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#EF4444]" />
              <span className="text-xs font-bold text-[#991B1B]">{comparison.oldWay.resources}</span>
            </div>
          </div>
        </div>

        {/* ParSec Way */}
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl p-4">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#10B981] mb-3">ParSec Way</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-xs font-bold text-[#065F46]">{comparison.parsecWay.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-xs font-bold text-[#065F46]">{comparison.parsecWay.cost}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-xs font-bold text-[#065F46]">{comparison.parsecWay.resources}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile navigation */}
      <div className="flex justify-center gap-3 mt-4 md:hidden">
        <button
          onClick={() => setActiveIndex((activeIndex - 1 + COMPARISONS.length) % COMPARISONS.length)}
          className="w-8 h-8 rounded-lg bg-[#F0F2F5] flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4 text-[#557089]" />
        </button>
        <button
          onClick={() => setActiveIndex((activeIndex + 1) % COMPARISONS.length)}
          className="w-8 h-8 rounded-lg bg-[#F0F2F5] flex items-center justify-center"
        >
          <ChevronRight className="w-4 h-4 text-[#557089]" />
        </button>
      </div>
    </div>
  );
};
