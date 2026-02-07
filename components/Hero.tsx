
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BRANDING, SERVICES } from '../constants.tsx';
import { Logo } from './Logo';
import { Typewriter } from './Typewriter';
import { ArrowRight, Zap, Palette, TrendingUp, Play } from 'lucide-react';
import { useTerminal } from '../TerminalContext';

const ServicePillar: React.FC<{
  title: string;
  tagline: string;
  icon: React.ReactNode;
  delay: number;
  onClick: () => void;
}> = ({ title, tagline, icon, delay, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    onClick={onClick}
    className="flex-1 bg-white border border-[#E1E6EB] p-6 md:p-8 rounded-2xl hover:shadow-xl hover:border-[#2D4769] transition-all cursor-pointer group"
  >
    <div className="w-12 h-12 md:w-14 md:h-14 bg-[#F0F2F5] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2D4769] group-hover:text-white transition-all">
      {icon}
    </div>
    <h3 className="text-lg md:text-xl font-black text-[#2D4769] mb-2 tracking-tight">{title}</h3>
    <p className="text-sm text-[#8EA3B5] font-medium">{tagline}</p>
    <div className="mt-4 flex items-center gap-2 text-xs font-black text-[#2D4769] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
      Learn More <ArrowRight className="w-3.5 h-3.5" />
    </div>
  </motion.div>
);

export const Hero: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { executeCommand } = useTerminal();

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

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
          <source src="/space-bg.mp4" type="video/mp4" />
        </video>
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
            <Play className="w-3.5 h-3.5 inline mr-2" /> Watch Demo
          </button>
        </div>
      </div>

      <div className="px-4 md:px-14 relative">
        {/* Page Icon */}
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
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-6 md:mb-10"
          >
            <div className="px-3 md:px-5 py-1.5 md:py-2 rounded-full bg-[#2D4769] text-white text-[10px] md:text-xs font-black uppercase tracking-[0.15em] md:tracking-[0.25em] shadow-lg shadow-[#2D4769]/30">
              AI-Powered Agency
            </div>
            <div className="text-xs md:text-sm font-bold text-[#8EA3B5] uppercase tracking-wider md:tracking-widest">{BRANDING.locations}</div>
          </motion.div>

          {/* Main Headline - WITH TYPEWRITER EFFECT */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-[-0.05em] mb-6 md:mb-8 text-[#2D4769] leading-[0.9]"
          >
            <Typewriter />
          </motion.h1>

          {/* Subheadline - EXPLAINS WHAT WE DO */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-2xl text-[#557089] font-medium max-w-3xl mb-10 md:mb-16 leading-relaxed"
          >
            {BRANDING.subtitle}
          </motion.p>

          {/* Three Pillars - OUTCOME-FOCUSED */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-16">
            <ServicePillar
              title={SERVICES[0].title}
              tagline={SERVICES[0].tagline}
              icon={<Zap className="w-6 h-6 text-[#2D4769]" />}
              delay={0.2}
              onClick={scrollToServices}
            />
            <ServicePillar
              title={SERVICES[1].title}
              tagline={SERVICES[1].tagline}
              icon={<Palette className="w-6 h-6 text-[#2D4769]" />}
              delay={0.3}
              onClick={scrollToServices}
            />
            <ServicePillar
              title={SERVICES[2].title}
              tagline={SERVICES[2].tagline}
              icon={<TrendingUp className="w-6 h-6 text-[#2D4769]" />}
              delay={0.4}
              onClick={scrollToServices}
            />
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-6 items-start sm:items-center pb-6 md:pb-10"
          >
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-[#2D4769] hover:bg-[#1D2F45] text-white px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm shadow-[0_20px_40px_-10px_rgba(45,71,105,0.4)] transition-all hover:-translate-y-1 active:scale-95"
            >
              Get Started
            </button>
            <button
              onClick={scrollToServices}
              className="w-full sm:w-auto bg-white hover:bg-[#F0F2F5] text-[#2D4769] px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-xs md:text-sm border-2 border-[#E1E6EB] hover:border-[#2D4769] transition-all"
            >
              Explore Services
            </button>
            <div className="hidden sm:block w-px h-10 bg-[#E1E6EB]" />
            <div className="flex items-center gap-3 md:gap-4 text-[#8EA3B5] text-xs md:text-sm font-bold">
              <div className="flex -space-x-2 md:-space-x-3">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-7 h-7 md:w-9 md:h-9 rounded-full border-3 md:border-4 border-white bg-[#C5D2E0] shadow-sm" />)}
              </div>
              <span>Trusted by 50+ businesses</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
