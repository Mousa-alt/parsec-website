
import React from 'react';
import { METRICS } from '../constants.tsx';
import { motion } from 'framer-motion';

export const Metrics: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {METRICS.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="tactile-card p-8 relative overflow-hidden group bg-white"
        >
          {/* Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#F0F2F5]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
              className="h-full bg-[#2D4769]"
            />
          </div>

          {/* Title - LEFT ALIGNED */}
          <div className="mb-6">
            <div className="text-[#8EA3B5] text-xs font-black uppercase tracking-[0.2em] text-left">
              {metric.label}
            </div>
          </div>

          {/* Value - LARGER */}
          <div className="flex items-baseline gap-2">
            <span className="text-5xl lg:text-6xl font-black text-[#2D4769] tracking-tighter tabular-nums">
              {metric.prefix}{metric.value}
            </span>
            <span className="text-2xl font-black text-[#8EA3B5]">{metric.suffix}</span>
          </div>

          {/* Bottom indicator */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6].map(b => (
                <div key={b} className={`w-2 h-4 rounded-full ${b <= 5 ? 'bg-[#C5D2E0]' : 'bg-[#F0F2F5]'}`} />
              ))}
            </div>
            <div className="text-xs font-black text-[#557089] uppercase tracking-widest italic">Active</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
