
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from './Typewriter';
import { BRANDING } from '../constants.tsx';
import { Logo } from './Logo';
import { Calendar, ExternalLink, ShieldCheck, Globe, Database } from 'lucide-react';
import { useTerminal } from '../TerminalContext';

export const Hero: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { executeCommand } = useTerminal();

  return (
    <section className="relative">
      {/* Cover Video - Living, breathing hero */}
      <div className="relative h-[280px] w-full rounded-t-[2.5rem] overflow-hidden group mb-16 shadow-2xl shadow-[#2D4769]/10">
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-all duration-1000 scale-105 ${videoLoaded ? 'z-10' : 'z-0'}`}
        >
          {/* Local video - replace /space-bg.mp4 with your own space video */}
          <source src="/space-bg.mp4" type="video/mp4" />
        </video>
        {/* Fallback image - only shows if video fails or hasn't loaded yet */}
        {(!videoLoaded || videoError) && (
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
            alt="AI Technology"
            className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F0F2F5] via-[#F0F2F5]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D4769]/10 to-transparent" />

        <div className="absolute bottom-6 right-8 flex gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
          <button
            onClick={() => executeCommand('demo')}
            className="bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.15em] border border-white/50 hover:bg-white shadow-xl transition-all text-[#2D4769]"
          >
            <ExternalLink className="w-3.5 h-3.5 inline mr-2" /> View Demo
          </button>
        </div>
      </div>

      <div className="px-4 md:px-14 relative">
        {/* Page Icon - BIGGER with DASHED BORDER like Request Architecture */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ rotate: -3, scale: 1.05 }}
          className="absolute -top-32 md:-top-44 left-4 md:left-14 w-32 h-32 md:w-52 md:h-52 rounded-[2rem] md:rounded-[3.5rem] bg-white border-[3px] border-dashed border-[#C5D2E0] shadow-[0_30px_60px_-15px_rgba(45,71,105,0.25)] flex items-center justify-center cursor-pointer group hover:border-[#2D4769] transition-colors duration-500 z-30"
        >
          <div className="group-hover:scale-110 transition-transform duration-500">
            <Logo size="2xl" showIcon />
          </div>
        </motion.div>

        <div className="pt-12 md:pt-20">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-6 md:mb-10"
          >
            <div className="px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-[#2D4769] text-white text-[10px] md:text-xs font-black uppercase tracking-[0.15em] md:tracking-[0.25em] shadow-lg shadow-[#2D4769]/30">
              Verified_Master_Node
            </div>
            <div className="text-xs md:text-sm font-bold text-[#8EA3B5] uppercase tracking-wider md:tracking-widest">Protocol: {BRANDING.version}</div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-[-0.05em] mb-8 md:mb-16 text-[#2D4769] leading-[0.9]"
          >
            <Typewriter />
          </motion.h1>

          {/* Detailed Property Blocks - LARGER FONTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-20 gap-y-6 md:gap-y-10 mb-10 md:mb-20 border-y border-[#E1E6EB] py-8 md:py-14">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-2 md:gap-4 text-[#8EA3B5] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#2D4769]" /> Initialized
              </div>
              <div className="font-black text-[#2D4769] tracking-tight text-sm md:text-lg">Q4 — 2025</div>
            </div>
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-2 md:gap-4 text-[#8EA3B5] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm">
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#2D4769]" /> Integrity
              </div>
              <div className="px-2 md:px-4 py-1 md:py-1.5 bg-emerald-50 text-emerald-700 font-bold rounded-lg text-xs md:text-sm border border-emerald-100 uppercase tracking-wider md:tracking-widest">Compliant</div>
            </div>
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-2 md:gap-4 text-[#8EA3B5] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm">
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-[#2D4769]" /> Latency
              </div>
              <div className="font-mono text-xs md:text-base font-black text-[#2D4769] uppercase tracking-tight">GLOBAL::12MS</div>
            </div>
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-2 md:gap-4 text-[#8EA3B5] font-black uppercase tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm">
                <Database className="w-4 h-4 md:w-5 md:h-5 text-[#2D4769]" /> Capacity
              </div>
              <div className="font-black text-[#2D4769] text-sm md:text-lg border-b-2 border-[#C5D2E0] italic">ULTRA_SCALE</div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-12"
          >
            <div className="bg-white border border-[#E1E6EB] p-6 md:p-12 rounded-2xl md:rounded-3xl shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 rotate-12 group-hover:rotate-0 transition-all duration-700 hidden md:block">
                <Logo size="2xl" showIcon />
              </div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start relative z-10">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-[#F0F2F5] rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-inner shrink-0">
                  ⚡
                </div>
                <div>
                  <p className="text-lg md:text-2xl font-black text-[#2D4769] mb-2 md:mb-4 tracking-tight">
                    The <span className="font-bold">Par</span><span className="italic">Sec</span> Mandate
                  </p>
                  <p className="text-[#557089] leading-relaxed max-w-2xl font-medium text-sm md:text-lg italic">
                    "We transform operational chaos into deterministic constants. By nesting intelligence within high-fidelity architecture, we eliminate the variables of failure."
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-8 items-start sm:items-center pb-6 md:pb-10">
              <button
                onClick={() => executeCommand('status')}
                className="w-full sm:w-auto bg-[#2D4769] hover:bg-[#1D2F45] text-white px-6 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.15em] md:tracking-[0.25em] text-xs md:text-sm shadow-[0_20px_40px_-10px_rgba(45,71,105,0.4)] transition-all hover:-translate-y-1 active:scale-95"
              >
                Execute System Brief
              </button>
              <div className="hidden sm:block w-px h-10 bg-[#E1E6EB]" />
              <div className="flex items-center gap-3 md:gap-4 text-[#8EA3B5] text-xs md:text-sm font-black uppercase tracking-[0.1em] md:tracking-[0.15em]">
                <div className="flex -space-x-2 md:-space-x-3">
                  {[1, 2, 3, 4].map(i => <div key={i} className="w-7 h-7 md:w-9 md:h-9 rounded-full border-3 md:border-4 border-white bg-[#C5D2E0] shadow-sm" />)}
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
