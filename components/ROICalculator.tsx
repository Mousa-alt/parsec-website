import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calculator, Clock, DollarSign, TrendingUp, Zap, ArrowRight } from 'lucide-react';

interface ROIResults {
  annualHoursSaved: number;
  annualCostSaved: number;
  roiPercentage: number;
  paybackWeeks: number;
}

const AnimatedNumber: React.FC<{ value: number; prefix?: string; suffix?: string }> = ({
  value, prefix = '', suffix = ''
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 1000;
      const steps = 30;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

export const ROICalculator: React.FC = () => {
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [hourlyRate, setHourlyRate] = useState(25);
  const [results, setResults] = useState<ROIResults>({
    annualHoursSaved: 0,
    annualCostSaved: 0,
    roiPercentage: 0,
    paybackWeeks: 0
  });

  useEffect(() => {
    // Calculate savings (90% reduction in manual work)
    const weeksPerYear = 50;
    const reductionRate = 0.9;
    const agentMonthlyCost = 500; // Estimated agent cost

    const annualHoursSaved = Math.round(hoursPerWeek * weeksPerYear * reductionRate);
    const annualCostSaved = Math.round(annualHoursSaved * hourlyRate);
    const annualAgentCost = agentMonthlyCost * 12;
    const roiPercentage = Math.round(((annualCostSaved - annualAgentCost) / annualAgentCost) * 100);
    const paybackWeeks = Math.round((agentMonthlyCost / (hoursPerWeek * hourlyRate * reductionRate / 4)) * 4);

    setResults({
      annualHoursSaved,
      annualCostSaved,
      roiPercentage: Math.max(0, roiPercentage),
      paybackWeeks: Math.max(1, paybackWeeks)
    });
  }, [hoursPerWeek, hourlyRate]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="tactile-card p-6 md:p-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-[#10B981]" />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-black text-[#2D4769]">Calculate Your Savings</h3>
          <p className="text-xs text-[#8EA3B5]">See what automation could save you</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          {/* Hours per week slider */}
          <div>
            <label className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-[#557089]">Hours on repetitive tasks/week</span>
              <span className="text-lg font-black text-[#2D4769]">{hoursPerWeek} hrs</span>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-[#E1E6EB] rounded-lg appearance-none cursor-pointer accent-[#2D4769]"
            />
            <div className="flex justify-between text-[10px] text-[#8EA3B5] mt-1">
              <span>5 hrs</span>
              <span>100 hrs</span>
            </div>
          </div>

          {/* Hourly rate slider */}
          <div>
            <label className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-[#557089]">Average hourly cost</span>
              <span className="text-lg font-black text-[#2D4769]">${hourlyRate}/hr</span>
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-[#E1E6EB] rounded-lg appearance-none cursor-pointer accent-[#2D4769]"
            />
            <div className="flex justify-between text-[10px] text-[#8EA3B5] mt-1">
              <span>$10/hr</span>
              <span>$100/hr</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-[#10B981]/5 to-[#2D4769]/5 rounded-2xl p-6 border-2 border-[#10B981]/20"
        >
          <div className="text-xs font-black uppercase tracking-widest text-[#10B981] mb-4">
            Your Potential Savings
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Hours saved */}
            <div className="bg-white rounded-xl p-4 border border-[#E1E6EB]">
              <Clock className="w-4 h-4 text-[#8EA3B5] mb-2" />
              <div className="text-2xl font-black text-[#2D4769]">
                <AnimatedNumber value={results.annualHoursSaved} suffix="+" />
              </div>
              <div className="text-[10px] text-[#8EA3B5] font-bold uppercase">Hours/Year Saved</div>
            </div>

            {/* Cost saved */}
            <div className="bg-white rounded-xl p-4 border border-[#E1E6EB]">
              <DollarSign className="w-4 h-4 text-[#10B981] mb-2" />
              <div className="text-2xl font-black text-[#10B981]">
                <AnimatedNumber value={results.annualCostSaved} prefix="$" />
              </div>
              <div className="text-[10px] text-[#8EA3B5] font-bold uppercase">Annual Savings</div>
            </div>

            {/* ROI */}
            <div className="bg-white rounded-xl p-4 border border-[#E1E6EB]">
              <TrendingUp className="w-4 h-4 text-[#8B5CF6] mb-2" />
              <div className="text-2xl font-black text-[#8B5CF6]">
                <AnimatedNumber value={results.roiPercentage} suffix="%" />
              </div>
              <div className="text-[10px] text-[#8EA3B5] font-bold uppercase">ROI First Year</div>
            </div>

            {/* Payback */}
            <div className="bg-white rounded-xl p-4 border border-[#E1E6EB]">
              <Zap className="w-4 h-4 text-[#F59E0B] mb-2" />
              <div className="text-2xl font-black text-[#F59E0B]">
                <AnimatedNumber value={results.paybackWeeks} suffix=" wks" />
              </div>
              <div className="text-[10px] text-[#8EA3B5] font-bold uppercase">Payback Period</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={scrollToContact}
          className="flex items-center gap-3 px-8 py-4 bg-[#10B981] text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-[#059669] transition-all shadow-lg shadow-[#10B981]/20 hover:-translate-y-0.5"
        >
          Get Your Custom Automation Plan
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
