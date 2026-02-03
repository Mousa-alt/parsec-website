
import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from './Typewriter';
import { BRANDING } from '../constants.tsx';
import { Logo } from './Logo';
import { Calendar, ExternalLink, ShieldCheck, Globe, Database } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative">
      {/* Cover Image - More vibrant and fun */}
      <div className="relative h-[280px] w-full rounded-t-[2.5rem] overflow-hidden group mb-16 shadow-2xl shadow-[#2D4769]/10">
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
          alt="AI Technology"
          className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F0F2F5] via-[#F0F2F5]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D4769]/10 to-transparent" />

        <div className="absolute bottom-6 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
          <button className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.15em] border border-white/50 hover:bg-white shadow-xl transition-all text-[#2D4769]">
            <ExternalLink className="w-3.5 h-3.5 inline mr-2" /> View Demo
          </button>
        </div>
      </div>

      <div className="px-14 relative">
        {/* Page Icon - BIGGER with DASHED BORDER like Request Architecture */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ rotate: -3, scale: 1.05 }}
          className="absolute -top-44 left-14 w-52 h-52 rounded-[3.5rem] bg-white border-[3px] border-dashed border-[#C5D2E0] shadow-[0_30px_60px_-15px_rgba(45,71,105,0.25)] flex items-center justify-center cursor-pointer group hover:border-[#2D4769] transition-colors duration-500"
        >
          <div className="group-hover:scale-110 transition-transform duration-500">
            <Logo size="xl" showIcon />
          </div>
        </motion.div>

        <div className="pt-20">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="px-5 py-2 rounded-full bg-[#2D4769] text-white text-xs font-black uppercase tracking-[0.25em] shadow-lg shadow-[#2D4769]/30">
              Verified_Master_Node
            </div>
            <div className="text-sm font-bold text-[#8EA3B5] uppercase tracking-widest">Protocol Version: {BRANDING.version}</div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-[-0.05em] mb-16 text-[#2D4769] leading-[0.85]"
          >
            <Typewriter />
          </motion.h1>

          {/* Detailed Property Blocks - LARGER FONTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10 mb-20 border-y border-[#E1E6EB] py-14">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4 text-[#8EA3B5] font-black uppercase tracking-[0.15em] text-sm">
                <Calendar className="w-5 h-5 text-[#2D4769]" /> Initialized
              </div>
              <div className="font-black text-[#2D4769] tracking-tight text-lg">Q4 — 2025</div>
            </div>
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4 text-[#8EA3B5] font-black uppercase tracking-[0.15em] text-sm">
                <ShieldCheck className="w-5 h-5 text-[#2D4769]" /> Integrity
              </div>
              <div className="px-4 py-1.5 bg-emerald-50 text-emerald-700 font-bold rounded-lg text-sm border border-emerald-100 uppercase tracking-widest">Compliant</div>
            </div>
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4 text-[#8EA3B5] font-black uppercase tracking-[0.15em] text-sm">
                <Globe className="w-5 h-5 text-[#2D4769]" /> Latency
              </div>
              <div className="font-mono text-base font-black text-[#2D4769] uppercase tracking-tight">GLOBAL_HUB::12MS</div>
            </div>
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-4 text-[#8EA3B5] font-black uppercase tracking-[0.15em] text-sm">
                <Database className="w-5 h-5 text-[#2D4769]" /> Capacity
              </div>
              <div className="font-black text-[#2D4769] text-lg border-b-2 border-[#C5D2E0] italic">ULTRA_SCALE</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-12"
          >
            <div className="bg-white border border-[#E1E6EB] p-12 rounded-3xl shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12 group-hover:rotate-0 transition-all duration-700">
                <Logo size="2xl" showIcon />
              </div>
              <div className="flex gap-8 items-start relative z-10">
                <div className="w-14 h-14 bg-[#F0F2F5] rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                  ⚡
                </div>
                <div>
                  <p className="text-2xl font-black text-[#2D4769] mb-4 tracking-tight">
                    The <span className="font-bold">Par</span><span className="italic">Sec</span> Mandate
                  </p>
                  <p className="text-[#557089] leading-relaxed max-w-2xl font-medium text-lg italic">
                    "We transform operational chaos into deterministic constants. By nesting intelligence within high-fidelity architecture, we eliminate the variables of failure."
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 items-center pb-10">
              <button className="bg-[#2D4769] hover:bg-[#1D2F45] text-white px-12 py-6 rounded-2xl font-black uppercase tracking-[0.25em] text-sm shadow-[0_20px_40px_-10px_rgba(45,71,105,0.4)] transition-all hover:-translate-y-1 active:scale-95">
                Execute System Brief
              </button>
              <div className="w-px h-10 bg-[#E1E6EB]" />
              <div className="flex items-center gap-4 text-[#8EA3B5] text-sm font-black uppercase tracking-[0.15em]">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-9 h-9 rounded-full border-4 border-white bg-[#C5D2E0] shadow-sm" />)}
                </div>
                <span>Engineering Trust Daily</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
