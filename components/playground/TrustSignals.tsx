import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { usePlaygroundStore } from '../../store/playground-store';
import { trustSignals } from '../../lib/playground-data';

// Generate random but realistic-looking numbers
const generateMetrics = () => ({
  activeAgents: Math.floor(Math.random() * 30) + 40, // 40-70
  messagesProcessed: Math.floor(Math.random() * 5000) + 10000, // 10k-15k
  uptime: (99 + Math.random() * 0.99).toFixed(2), // 99.00-99.99
  avgResponseTime: Math.floor(Math.random() * 500) + 200, // 200-700ms
});

export const TrustSignals: React.FC = () => {
  const { language } = usePlaygroundStore();
  const [currentSignal, setCurrentSignal] = useState(0);
  const [metrics, setMetrics] = useState(generateMetrics());

  const isArabic = language === 'ar';

  // Rotate trust signals every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSignal((prev) => (prev + 1) % trustSignals.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Update metrics occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(generateMetrics());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="space-y-3 md:space-y-4 overflow-hidden">
      {/* Trust Signal Ticker */}
      <div className="bg-gradient-to-r from-[#2D4769] to-[#1D2F45] rounded-xl p-4 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#8EA3B5]">
            {isArabic ? 'نشاط مباشر' : 'Live Activity'}
          </div>
        </div>

        <div className="h-8 mt-2 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSignal}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center overflow-hidden"
            >
              <Zap className="w-4 h-4 text-[#F59E0B] mr-2 flex-shrink-0" />
              <span className="text-xs md:text-sm text-white font-medium truncate" dir={isArabic ? 'rtl' : 'ltr'}>
                {isArabic ? trustSignals[currentSignal].ar : trustSignals[currentSignal].en}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1 mt-3 justify-center">
          {trustSignals.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentSignal ? 'bg-[#10B981] w-4' : 'bg-[#8EA3B5]/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl border border-[#E1E6EB] p-2 md:p-3 overflow-hidden"
        >
          <div className="flex items-center gap-1.5 md:gap-2 mb-1">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#8B5CF6]" />
            </div>
            <span className="text-[8px] md:text-[9px] font-bold uppercase text-[#8EA3B5] truncate">
              {isArabic ? 'وكلاء نشطين' : 'Active'}
            </span>
          </div>
          <motion.div
            key={metrics.activeAgents}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl font-black text-[#2D4769]"
          >
            {metrics.activeAgents}
          </motion.div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl border border-[#E1E6EB] p-2 md:p-3 overflow-hidden"
        >
          <div className="flex items-center gap-1.5 md:gap-2 mb-1">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#10B981]" />
            </div>
            <span className="text-[8px] md:text-[9px] font-bold uppercase text-[#8EA3B5] truncate">
              {isArabic ? 'رسائل' : 'Messages'}
            </span>
          </div>
          <motion.div
            key={metrics.messagesProcessed}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl font-black text-[#2D4769]"
          >
            {formatNumber(metrics.messagesProcessed)}
          </motion.div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl border border-[#E1E6EB] p-2 md:p-3 overflow-hidden"
        >
          <div className="flex items-center gap-1.5 md:gap-2 mb-1">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#F59E0B]" />
            </div>
            <span className="text-[8px] md:text-[9px] font-bold uppercase text-[#8EA3B5] truncate">
              {isArabic ? 'التشغيل' : 'Uptime'}
            </span>
          </div>
          <motion.div
            key={metrics.uptime}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl font-black text-[#2D4769]"
          >
            {metrics.uptime}%
          </motion.div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-xl border border-[#E1E6EB] p-2 md:p-3 overflow-hidden"
        >
          <div className="flex items-center gap-1.5 md:gap-2 mb-1">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-lg bg-[#2D4769]/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#2D4769]" />
            </div>
            <span className="text-[8px] md:text-[9px] font-bold uppercase text-[#8EA3B5] truncate">
              {isArabic ? 'الاستجابة' : 'Response'}
            </span>
          </div>
          <motion.div
            key={metrics.avgResponseTime}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className="text-lg md:text-xl font-black text-[#2D4769]"
          >
            {metrics.avgResponseTime}ms
          </motion.div>
        </motion.div>
      </div>

      {/* Regions */}
      <div className="flex items-center justify-center gap-4 text-[10px] text-[#8EA3B5]">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
          Cairo
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
          Riyadh
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
          Dubai
        </span>
      </div>
    </div>
  );
};
