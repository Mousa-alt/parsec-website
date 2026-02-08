
import React, { useLayoutEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveMetrics } from './components/LiveMetrics';
import { ROICalculator } from './components/ROICalculator';
import { Comparison } from './components/Comparison';
import { ServicesGrid } from './components/ServicesGrid';
import { Playground } from './components/Playground';
import { Terminal } from './components/Terminal';
import { Metrics } from './components/Metrics';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { TerminalProvider } from './TerminalContext';
import { Home, Layers, Terminal as TermIcon, Award, MessageCircle, Calculator, ImageIcon } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: <Home className="w-4 h-4" />, href: '#home', label: 'Home' },
    { icon: <Calculator className="w-4 h-4" />, href: '#roi', label: 'Calculator' },
    { icon: <Layers className="w-4 h-4" />, href: '#services', label: 'Services' },
    { icon: <ImageIcon className="w-4 h-4" />, href: '#playground', label: 'Try AI' },
    { icon: <TermIcon className="w-4 h-4" />, href: '#demo', label: 'Console' },
    { icon: <Award className="w-4 h-4" />, href: '#case-studies', label: 'Results' },
    { icon: <MessageCircle className="w-4 h-4" />, href: '#contact', label: 'Contact' },
  ];

  return (
    <div className="hidden xl:flex sidebar-anchor flex-col gap-4 p-2 bg-white/40 backdrop-blur-sm border border-[#E1E6EB] rounded-2xl">
      {navItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all text-[#8EA3B5] hover:text-[#2D4769] group relative"
        >
          {item.icon}
          <span className="absolute left-full ml-4 px-2 py-1 bg-[#2D4769] text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {item.label}
          </span>
        </a>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // useLayoutEffect runs before browser paint - ensures scroll happens before render
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TerminalProvider>
    <div className="relative min-h-screen font-['Poppins']">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#2D4769] z-[60] origin-left" style={{ scaleX }} />

      <Navbar />
      <Sidebar />

      <main className="doc-container pt-20 md:pt-32 pb-20 md:pb-40 relative">
        <section id="home">
          <Hero />
        </section>

        <div className="h-12 md:h-24" />

        {/* Live Metrics Counter */}
        <section className="mb-16 md:mb-24">
          <LiveMetrics />
        </section>

        {/* ROI Calculator */}
        <section id="roi" className="mb-20 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-2 md:gap-4 mb-6 md:mb-10 group"
          >
            <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-xl md:text-3xl font-black tracking-tight text-[#2D4769]">Calculate Your Savings</h2>
            <span className="text-[10px] md:text-xs font-mono text-[#8EA3B5] mt-1 md:mt-2">ROI Preview</span>
          </motion.div>
          <ROICalculator />
        </section>

        {/* Visual Comparisons */}
        <section className="mb-20 md:mb-40">
          <Comparison />
        </section>

        <section id="services" className="mb-20 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-2 md:gap-4 mb-6 md:mb-10 group"
          >
            <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-xl md:text-3xl font-black tracking-tight text-[#2D4769]">Our Services</h2>
            <span className="text-[10px] md:text-xs font-mono text-[#8EA3B5] mt-1 md:mt-2">What We Do</span>
          </motion.div>
          <ServicesGrid />
        </section>

        {/* Playground Demo */}
        <section id="playground" className="mb-20 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-2 md:gap-4 mb-6 md:mb-10 group"
          >
            <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-xl md:text-3xl font-black tracking-tight text-[#2D4769]">Try Our AI</h2>
            <span className="text-[10px] md:text-xs font-mono text-[#8EA3B5] mt-1 md:mt-2">Live Demo</span>
          </motion.div>
          <Playground />
        </section>

        <section id="demo" className="mb-20 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 group"
          >
            <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-xl md:text-3xl font-black tracking-tight text-[#2D4769]">System Console</h2>
          </motion.div>
          <Terminal />
        </section>

        <section className="mb-20 md:mb-40">
          <Metrics />
        </section>

        <section id="case-studies" className="mb-20 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 group"
          >
            <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-xl md:text-3xl font-black tracking-tight text-[#2D4769]">Success Stories</h2>
            <span className="text-[10px] md:text-xs font-mono text-[#8EA3B5] mt-1 md:mt-2">Real Results</span>
          </motion.div>
          <CaseStudies />
        </section>

        {/* Testimonials section hidden for now
        <section id="testimonials" className="mb-20 md:mb-40">
          <Testimonials />
        </section>
        */}

        <section id="contact" className="mb-20 md:mb-40">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 group"
          >
            <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-xl md:text-3xl font-black tracking-tight text-[#2D4769]">Project Initialization</h2>
          </motion.div>
          <Contact />
        </section>

        <Footer />
      </main>

      {/* Floating Badge - hidden on mobile */}
      <div className="hidden md:block fixed bottom-10 right-10 z-50">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white border border-[#E1E6EB] p-4 rounded-2xl shadow-2xl flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-[#2D4769] flex items-center justify-center text-white font-bold text-xs">
            LIVE
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#8EA3B5]">Status</div>
            <div className="text-xs font-bold text-[#2D4769]">Operational</div>
          </div>
        </motion.div>
      </div>
    </div>
    </TerminalProvider>
  );
};

export default App;
