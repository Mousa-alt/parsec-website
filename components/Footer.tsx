
import React from 'react';
import { motion } from 'framer-motion';
import { BRANDING, FOOTER_NAV } from '../constants.tsx';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="tactile-card p-8 md:p-10">
      {/* Main Content - Flexbox for proper alignment */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-8 justify-between">
        {/* Left - Branding */}
        <div className="lg:flex-shrink-0">
          <Logo size="lg" />
          <p className="mt-6 text-[#557089] text-sm font-medium leading-relaxed max-w-xs italic">
            Engineering precision automation for high-consequence enterprise.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-[#F0F2F5] border border-[#E1E6EB] px-4 py-2 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider text-[#2D4769]">
              {BRANDING.version}
            </span>
          </div>
        </div>

        {/* Right - Navigation */}
        <div className="flex flex-wrap gap-8 lg:gap-12">
          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.15em] text-[#2D4769] opacity-50 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-[#557089] font-semibold hover:text-[#2D4769] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 pt-6 border-t border-[#E1E6EB] flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8EA3B5]">
          © {new Date().getFullYear()} ParSec · Egypt, Saudi Arabia & UAE
        </p>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-[#2D4769]">100% Operational</span>
          <motion.button
            whileHover={{ y: -3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 rounded-lg border-2 border-dashed border-[#C5D2E0] flex items-center justify-center hover:border-[#2D4769] transition-colors"
          >
            <span className="text-[#2D4769] font-bold text-sm">↑</span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
