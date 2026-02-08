
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BRANDING, SERVICES } from '../constants.tsx';
import { Logo } from './Logo';
import { Typewriter } from './Typewriter';
import { ArrowRight, Play } from 'lucide-react';
import { useTerminal } from '../TerminalContext';

interface ServicePillarProps {
  number: string;
  title: string;
  highlight: string;
  items: string[];
  accentColor: string;
  delay: number;
  onClick: () => void;
}

const ServicePillar: React.FC<ServicePillarProps> = ({
  number, title, highlight, items, accentColor, delay, onClick
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    onClick={onClick}
    className="flex-1 relative bg-white border-2 border-[#E1E6EB] p-5 md:p-8 rounded-2xl cursor-pointer group overflow-hidden hover:border-[#2D4769] transition-all duration-300"
  >
    {/* Subtle gradient accent */}
    <div
      className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{ background: accentColor }}
    />

    {/* Large number as design element */}
    <div
      className="text-6xl md:text-7xl font-black mb-2 opacity-[0.08] absolute top-4 right-4 select-none"
      style={{ color: accentColor }}
    >
      {number}
    </div>

    {/* Small colored dot indicator */}
    <div
      className="w-3 h-3 rounded-full mb-4"
      style={{ background: accentColor }}
    />

    {/* Title with colored highlight */}
    <h3 className="text-lg md:text-xl font-black text-[#2D4769] mb-3 tracking-tight relative z-10">
      {title} <span style={{ color: accentColor }}>{highlight}</span>
    </h3>

    {/* Service items as pills */}
    <div className="flex flex-wrap gap-2 mb-4 relative z-10">
      {items.map((item, i) => (
        <span
          key={i}
          className="text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full bg-[#F0F2F5] text-[#557089] border border-[#E1E6EB] group-hover:border-[#C5D2E0] transition-colors"
        >
          {item}
        </span>
      ))}
    </div>

    {/* Hover CTA */}
    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 relative z-10" style={{ color: accentColor }}>
      Explore <ArrowRight className="w-3.5 h-3.5" />
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
      <div className="relative h-[180px] md:h-[280px] w-full rounded-t-[2.5rem] overflow-hidden group mb-8 md:mb-16 shadow-2xl shadow-[#2D4769]/10">
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
          className="absolute -top-20 md:-top-44 left-4 md:left-14 w-24 min-w-24 h-24 min-h-24 md:w-52 md:min-w-52 md:h-52 md:min-h-52 !aspect-square shrink-0 rounded-[1.5rem] md:rounded-[3.5rem] bg-white border-[3px] border-dashed border-[#C5D2E0] shadow-[0_30px_60px_-15px_rgba(45,71,105,0.25)] flex items-center justify-center cursor-pointer group hover:border-[#2D4769] transition-colors duration-500 z-30"
        >
          <div className="group-hover:scale-110 transition-transform duration-500 scale-[0.6] md:scale-100">
            <Logo size="2xl" showIcon />
          </div>
        </motion.div>

        <div className="pt-8 md:pt-20">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 md:mb-10"
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-[-0.05em] mb-4 md:mb-8 text-[#2D4769] leading-[0.9]"
          >
            <Typewriter />
          </motion.h1>

          {/* Subheadline - EXPLAINS WHAT WE DO */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-2xl text-[#557089] font-medium max-w-3xl mb-4 md:mb-8 leading-relaxed"
          >
            {BRANDING.subtitle}
          </motion.p>

          {/* Three Pillars - CLEAN & PROFESSIONAL */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-16">
            <ServicePillar
              number="01"
              title="AI That"
              highlight="Works"
              items={['Personal Assistants', 'Voice Agents', 'Hiring', 'Support Bots', '+4 more']}
              accentColor="#2D4769"
              delay={0.2}
              onClick={scrollToServices}
            />
            <ServicePillar
              number="02"
              title="Brands That"
              highlight="Pop"
              items={['Websites', 'Branding', 'Pitch Decks', 'Copywriting', '+2 more']}
              accentColor="#8B5CF6"
              delay={0.3}
              onClick={scrollToServices}
            />
            <ServicePillar
              number="03"
              title="Growth That"
              highlight="Lasts"
              items={['Consulting', 'Research', 'Custom AI', 'SaaS Dev', '+2 more']}
              accentColor="#10B981"
              delay={0.4}
              onClick={scrollToServices}
            />
          </div>

          {/* CTAs - Three buttons aligned with three cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 pb-6 md:pb-10"
          >
            <button
              onClick={scrollToContact}
              className="bg-[#2D4769] hover:bg-[#1D2F45] text-white px-6 md:px-8 py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.12em] md:tracking-[0.15em] text-xs shadow-[0_20px_40px_-10px_rgba(45,71,105,0.4)] transition-all hover:-translate-y-1 active:scale-95"
            >
              Get Started
            </button>
            <button
              onClick={scrollToServices}
              className="bg-white hover:bg-[#F0F2F5] text-[#8B5CF6] px-6 md:px-8 py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.12em] md:tracking-[0.15em] text-xs border-2 border-[#E1E6EB] hover:border-[#8B5CF6] transition-all"
            >
              Explore Services
            </button>
            <button
              onClick={() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white hover:bg-[#F0F2F5] text-[#10B981] px-6 md:px-8 py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-[0.12em] md:tracking-[0.15em] text-xs border-2 border-[#E1E6EB] hover:border-[#10B981] transition-all"
            >
              Try Playground
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
