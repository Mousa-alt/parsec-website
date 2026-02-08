import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calculator, Clock, DollarSign, TrendingUp, Zap, ArrowRight, ChevronDown } from 'lucide-react';

interface ROIResults {
  annualHoursSaved: number;
  annualCostSaved: number;
  roiPercentage: number;
  paybackWeeks: number;
}

interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Relative to USD
}

const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1 },
  { code: 'EGP', symbol: 'E£', name: 'Egyptian Pound', rate: 50 },
  { code: 'SAR', symbol: 'SR', name: 'Saudi Riyal', rate: 3.75 },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 3.67 },
];

const AnimatedNumber: React.FC<{ value: number; prefix?: string; suffix?: string }> = ({
  value, prefix = '', suffix = ''
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 800;
      const steps = 25;
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
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [results, setResults] = useState<ROIResults>({
    annualHoursSaved: 0,
    annualCostSaved: 0,
    roiPercentage: 0,
    paybackWeeks: 0
  });

  useEffect(() => {
    const weeksPerYear = 50;
    const reductionRate = 0.9;
    const agentMonthlyCostUSD = 500;
    const agentMonthlyCost = agentMonthlyCostUSD * currency.rate;

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
  }, [hoursPerWeek, hourlyRate, currency]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white border-2 border-[#E1E6EB] rounded-2xl p-5 md:p-6">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2D4769] flex items-center justify-center">
            <Calculator className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-black text-[#2D4769]">Calculate Your Savings</h3>
          </div>
        </div>

        {/* Currency Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0F2F5] rounded-lg text-xs font-bold text-[#557089] hover:bg-[#E1E6EB] transition-colors"
          >
            {currency.symbol} {currency.code}
            <ChevronDown className="w-3 h-3" />
          </button>
          {showCurrencyDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-[#E1E6EB] rounded-lg shadow-xl z-20 min-w-[140px]">
              {CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => { setCurrency(c); setShowCurrencyDropdown(false); }}
                  className={`w-full text-left px-3 py-2 text-xs font-bold hover:bg-[#F0F2F5] transition-colors ${
                    currency.code === c.code ? 'text-[#2D4769] bg-[#F0F2F5]' : 'text-[#557089]'
                  }`}
                >
                  {c.symbol} {c.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Inputs - Compact */}
        <div className="space-y-4">
          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#557089]">Hours on repetitive tasks/week</span>
              <span className="text-sm font-black text-[#2D4769]">{hoursPerWeek} hrs</span>
            </label>
            <input
              type="range"
              min="5"
              max="100"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full h-1.5 bg-[#E1E6EB] rounded-lg appearance-none cursor-pointer accent-[#2D4769]"
            />
          </div>

          <div>
            <label className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#557089]">Average hourly cost</span>
              <span className="text-sm font-black text-[#2D4769]">{currency.symbol}{hourlyRate}/hr</span>
            </label>
            <input
              type="range"
              min="10"
              max="200"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-1.5 bg-[#E1E6EB] rounded-lg appearance-none cursor-pointer accent-[#2D4769]"
            />
          </div>
        </div>

        {/* Results - Compact */}
        <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E1E6EB]">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <Clock className="w-4 h-4 text-[#2D4769] mx-auto mb-1" />
              <div className="text-lg font-black text-[#2D4769]">
                <AnimatedNumber value={results.annualHoursSaved} suffix="+" />
              </div>
              <div className="text-[9px] text-[#8EA3B5] font-bold uppercase">Hours/Year</div>
            </div>

            <div className="text-center">
              <DollarSign className="w-4 h-4 text-[#10B981] mx-auto mb-1" />
              <div className="text-lg font-black text-[#10B981]">
                <AnimatedNumber value={results.annualCostSaved} prefix={currency.symbol} />
              </div>
              <div className="text-[9px] text-[#8EA3B5] font-bold uppercase">Annual Savings</div>
            </div>

            <div className="text-center">
              <TrendingUp className="w-4 h-4 text-[#8B5CF6] mx-auto mb-1" />
              <div className="text-lg font-black text-[#8B5CF6]">
                <AnimatedNumber value={results.roiPercentage} suffix="%" />
              </div>
              <div className="text-[9px] text-[#8EA3B5] font-bold uppercase">ROI</div>
            </div>

            <div className="text-center">
              <Zap className="w-4 h-4 text-[#F59E0B] mx-auto mb-1" />
              <div className="text-lg font-black text-[#F59E0B]">
                <AnimatedNumber value={results.paybackWeeks} suffix="wk" />
              </div>
              <div className="text-[9px] text-[#8EA3B5] font-bold uppercase">Payback</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA - Compact */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={scrollToContact}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2D4769] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#1D2F45] transition-all"
        >
          Get Custom Plan
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
