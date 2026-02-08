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
}> = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const steps = 60;
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

  // Subtle pulse effect every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const metrics: MetricItem[] = [
    {
      icon: <Zap className="w-5 h-5" />,
      value: 14203,
      label: 'Tasks Automated',
      suffix: '+',
      color: '#2D4769'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      value: 2400,
      label: 'Hours Saved',
      suffix: '+',
      color: '#10B981'
    },
    {
      icon: <Bot className="w-5 h-5" />,
      value: 47,
      label: 'Active Agents',
      suffix: '',
      color: '#8B5CF6'
    },
    {
      icon: <Activity className="w-5 h-5" />,
      value: 99,
      label: 'Uptime',
      suffix: '%',
      color: '#F59E0B'
    }
  ];

  return (
    <div className="relative">
      {/* Live indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className={`w-2 h-2 rounded-full bg-[#10B981] ${pulse ? 'animate-ping' : ''}`} />
        <span className="text-[10px] font-black uppercase tracking-widest text-[#8EA3B5]">
          Live System Metrics
        </span>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border-2 border-[#E1E6EB] rounded-2xl p-4 md:p-6 text-center hover:border-[#2D4769] transition-colors group"
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${metric.color}10`, color: metric.color }}
            >
              {metric.icon}
            </div>

            {/* Value */}
            <div
              className="text-2xl md:text-3xl font-black mb-1"
              style={{ color: metric.color }}
            >
              <CountUpNumber target={metric.value} suffix={metric.suffix} />
            </div>

            {/* Label */}
            <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#8EA3B5]">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Subtle disclaimer */}
      <div className="text-center mt-4">
        <span className="text-[9px] text-[#C5D2E0]">This week's statistics</span>
      </div>
    </div>
  );
};
