import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Users, Bot, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface ComparisonData {
  category: string;
  icon: string;
  oldWay: {
    time: string;
    cost: string;
    resources: string;
  };
  parsecWay: {
    time: string;
    cost: string;
    resources: string;
  };
  savingsPercent: number;
}

const COMPARISONS: ComparisonData[] = [
  {
    category: 'Invoice Processing',
    icon: 'invoice',
    oldWay: {
      time: '40 hrs/week',
      cost: '$2,000/month',
      resources: '3 employees'
    },
    parsecWay: {
      time: '10 mins/week',
      cost: '$50/month',
      resources: '1 AI agent'
    },
    savingsPercent: 97.5
  },
  {
    category: 'Customer Calls',
    icon: 'phone',
    oldWay: {
      time: '8 hrs/day',
      cost: '$3,500/month',
      resources: '2 receptionists'
    },
    parsecWay: {
      time: '24/7 coverage',
      cost: '$200/month',
      resources: '1 Voice Agent'
    },
    savingsPercent: 94
  },
  {
    category: 'Social Media',
    icon: 'social',
    oldWay: {
      time: '20 hrs/week',
      cost: '$1,500/month',
      resources: '1 content manager'
    },
    parsecWay: {
      time: '2 hrs/week',
      cost: '$100/month',
      resources: '1 Social Agent'
    },
    savingsPercent: 93
  },
  {
    category: 'Hiring & Screening',
    icon: 'hiring',
    oldWay: {
      time: '30 hrs/hire',
      cost: '$500/hire',
      resources: 'HR team'
    },
    parsecWay: {
      time: '2 hrs/hire',
      cost: '$50/hire',
      resources: '1 Hiring Agent'
    },
    savingsPercent: 90
  }
];

export const Comparison: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const comparison = COMPARISONS[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % COMPARISONS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + COMPARISONS.length) % COMPARISONS.length);
  };

  return (
    <div className="tactile-card p-6 md:p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-xs font-black uppercase tracking-widest text-[#8EA3B5] mb-2">
          The ParSec Difference
        </div>
        <h3 className="text-xl md:text-2xl font-black text-[#2D4769]">
          See the Transformation
        </h3>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {COMPARISONS.map((comp, index) => (
          <button
            key={comp.category}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeIndex === index
                ? 'bg-[#2D4769] text-white'
                : 'bg-[#F0F2F5] text-[#557089] hover:bg-[#E1E6EB]'
            }`}
          >
            {comp.category}
          </button>
        ))}
      </div>

      {/* Comparison cards */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-6 md:gap-10"
      >
        {/* Old Way */}
        <div className="bg-[#FEF2F2] border-2 border-[#FECACA] rounded-2xl p-6 relative">
          <div className="absolute -top-3 left-4 px-3 py-1 bg-[#EF4444] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
            Old Way
          </div>

          <div className="pt-4 space-y-4">
            <div className="text-lg font-black text-[#991B1B] mb-4">{comparison.category}</div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#EF4444]" />
              <div>
                <div className="text-sm font-bold text-[#991B1B]">{comparison.oldWay.time}</div>
                <div className="text-[10px] text-[#B91C1C]">Time Required</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-[#EF4444]" />
              <div>
                <div className="text-sm font-bold text-[#991B1B]">{comparison.oldWay.cost}</div>
                <div className="text-[10px] text-[#B91C1C]">Monthly Cost</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#EF4444]" />
              <div>
                <div className="text-sm font-bold text-[#991B1B]">{comparison.oldWay.resources}</div>
                <div className="text-[10px] text-[#B91C1C]">Resources Needed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow (hidden on mobile, shown on md+) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-12 h-12 rounded-full bg-[#2D4769] flex items-center justify-center shadow-xl">
            <ArrowRight className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* ParSec Way */}
        <div className="bg-[#ECFDF5] border-2 border-[#A7F3D0] rounded-2xl p-6 relative">
          <div className="absolute -top-3 left-4 px-3 py-1 bg-[#10B981] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
            ParSec Way
          </div>

          <div className="pt-4 space-y-4">
            <div className="text-lg font-black text-[#065F46] mb-4">{comparison.category}</div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#10B981]" />
              <div>
                <div className="text-sm font-bold text-[#065F46]">{comparison.parsecWay.time}</div>
                <div className="text-[10px] text-[#047857]">Time Required</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-[#10B981]" />
              <div>
                <div className="text-sm font-bold text-[#065F46]">{comparison.parsecWay.cost}</div>
                <div className="text-[10px] text-[#047857]">Monthly Cost</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Bot className="w-5 h-5 text-[#10B981]" />
              <div>
                <div className="text-sm font-bold text-[#065F46]">{comparison.parsecWay.resources}</div>
                <div className="text-[10px] text-[#047857]">Resources Needed</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Savings badge */}
      <motion.div
        key={`savings-${activeIndex}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex justify-center mt-8"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#10B981] text-white rounded-full shadow-lg shadow-[#10B981]/30">
          <span className="text-2xl font-black">{comparison.savingsPercent}%</span>
          <span className="text-xs font-bold uppercase tracking-wider">Cost Reduction</span>
        </div>
      </motion.div>

      {/* Navigation arrows (mobile) */}
      <div className="flex justify-center gap-4 mt-6 md:hidden">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center hover:bg-[#E1E6EB] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#557089]" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-[#F0F2F5] flex items-center justify-center hover:bg-[#E1E6EB] transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-[#557089]" />
        </button>
      </div>
    </div>
  );
};
