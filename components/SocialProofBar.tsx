import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Zap, Clock, TrendingUp, Shield } from 'lucide-react';

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
}> = ({ target, duration = 1200, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const steps = 30;
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

export const SocialProofBar: React.FC = () => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const metrics: MetricItem[] = [
    { icon: <Zap className="w-3.5 h-3.5" />, value: 50, label: 'Tasks', suffix: 'k+', color: '#2D4769' },
    { icon: <Shield className="w-3.5 h-3.5" />, value: 100, label: 'Uptime', suffix: '%', color: '#10B981' },
    { icon: <TrendingUp className="w-3.5 h-3.5" />, value: 99, label: 'Retention', suffix: '%', color: '#8B5CF6' },
    { icon: <Clock className="w-3.5 h-3.5" />, value: 64, label: 'Efficiency', suffix: '%', color: '#F59E0B' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-[#2D4769] to-[#1D2F45] rounded-2xl p-4 md:p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full bg-[#10B981] ${pulse ? 'animate-ping' : ''}`} />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/60">
            Live Stats
          </span>
        </div>
        <span className="text-[9px] text-white/40">Updated live</span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div
              className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center"
              style={{ backgroundColor: `${metric.color}20`, color: metric.color }}
            >
              {metric.icon}
            </div>
            <div className="text-xl md:text-2xl font-black text-white">
              <CountUpNumber target={metric.value} suffix={metric.suffix} />
            </div>
            <div className="text-[8px] md:text-[9px] font-bold uppercase tracking-wider text-white/50">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
