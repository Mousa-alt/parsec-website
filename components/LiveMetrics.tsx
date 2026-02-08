import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Clock, Bot, Activity } from 'lucide-react';

interface MetricItem {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix: string;
  color: string;
}

const CountUpNumber: React.FC<{
  target: number;
  duration?: number;
  suffix?: string;
}> = ({ target, duration = 1500, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const steps = 40;
      const increment = target / steps;
      let current = 0;
      const stepDuration = duration / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const LiveMetrics: React.FC = () => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const metrics: MetricItem[] = [
    { icon: <Zap className="w-4 h-4" />, value: 14203, label: 'Tasks Automated', suffix: '+', color: '#2D4769' },
    { icon: <Clock className="w-4 h-4" />, value: 2400, label: 'Hours Saved', suffix: '+', color: '#10B981' },
    { icon: <Bot className="w-4 h-4" />, value: 47, label: 'Active Agents', suffix: '', color: '#8B5CF6' },
    { icon: <Activity className="w-4 h-4" />, value: 99, label: 'Uptime', suffix: '%', color: '#2D4769' }
  ];

  return (
    <div className="bg-white border-2 border-[#E1E6EB] rounded-2xl p-4 md:p-5">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full bg-[#10B981] ${pulse ? 'animate-ping' : ''}`} />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#8EA3B5]">
            Live Metrics
          </span>
        </div>
        <span className="text-[9px] text-[#C5D2E0]">This week</span>
      </div>

      {/* Compact metrics row */}
      <div className="grid grid-cols-4 gap-3">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="text-center"
          >
            <div
              className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center"
              style={{ backgroundColor: `${metric.color}10`, color: metric.color }}
            >
              {metric.icon}
            </div>
            <div className="text-lg md:text-xl font-black" style={{ color: metric.color }}>
              <CountUpNumber target={metric.value} suffix={metric.suffix} />
            </div>
            <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-[#8EA3B5]">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
