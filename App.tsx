
import React, { useLayoutEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveMetrics } from './components/LiveMetrics';
import { ROICalculator } from './components/ROICalculator';
import { ServicesGrid } from './components/ServicesGrid';
import { Playground } from './components/Playground';
import { Terminal } from './components/Terminal';
import { Metrics } from './components/Metrics';
import { CaseStudies } from './components/CaseStudies';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { TerminalProvider } from './TerminalContext';
import { PlaygroundSection } from './components/playground/PlaygroundSection';
import { Home, Layers, Award, MessageCircle, Calculator, Sparkles, FlaskConical } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: <Home className="w-4 h-4" />, href: '#home', label: 'Home' },
    { icon: <Calculator className="w-4 h-4" />, href: '#roi', label: 'Calculator' },
    { icon: <Layers className="w-4 h-4" />, href: '#services', label: 'Services' },
    { icon: <Sparkles className="w-4 h-4" />, href: '#playground', label: 'Playground' },
    { icon: <FlaskConical className="w-4 h-4" />, href: '#lab', label: 'Lab' },
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

        <div className="h-8 md:h-16" />

        {/* Live Metrics - Compact */}
        <section className="mb-10 md:mb-16">
          <LiveMetrics />
        </section>

        {/* ROI Calculator - Compact */}
        <section id="roi" className="mb-10 md:mb-16">
          <ROICalculator />
        </section>

        {/* Services */}
        <section id="services" className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6 group"
          >
            <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-lg md:text-2xl font-black tracking-tight text-[#2D4769]">Our Services</h2>
          </motion.div>
          <ServicesGrid />
        </section>

        {/* Playground - Contains Terminal + Image Analysis */}
        <section id="playground" className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6 group"
          >
            <div className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-lg md:text-2xl font-black tracking-tight text-[#2D4769]">Playground</h2>
            <span className="text-[10px] md:text-xs font-mono text-[#8EA3B5]">Interactive Demo</span>
          </motion.div>

          <div className="space-y-6">
            {/* Terminal at top of Playground */}
            <Terminal />

            {/* Image Analysis Demo */}
            <Playground />
          </div>
        </section>

        {/* Premium Playground / Experiment Lab */}
        <section id="lab" className="mb-10 md:mb-16">
          <PlaygroundSection />
        </section>

        {/* Metrics - Compact */}
        <section className="mb-10 md:mb-16">
          <Metrics />
        </section>

        {/* Case Studies */}
        <section id="case-studies" className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6 group"
          >
            <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-lg md:text-2xl font-black tracking-tight text-[#2D4769]">Success Stories</h2>
          </motion.div>
          <CaseStudies />
        </section>

        {/* Contact */}
        <section id="contact" className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6 group"
          >
            <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-lg md:text-2xl font-black tracking-tight text-[#2D4769]">Get Started</h2>
          </motion.div>
          <Contact />
        </section>

        <Footer />
      </main>

      {/* Floating Badge - hidden on mobile */}
      <div className="hidden md:block fixed bottom-10 right-10 z-50">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white border border-[#E1E6EB] p-3 rounded-xl shadow-xl flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-[#2D4769] flex items-center justify-center text-white font-bold text-[10px]">
            LIVE
          </div>
          <div>
            <div className="text-[9px] font-black uppercase tracking-widest text-[#8EA3B5]">Status</div>
            <div className="text-xs font-bold text-[#2D4769]">Operational</div>
          </div>
        </motion.div>
      </div>
    </div>
    </TerminalProvider>
  );
};

export default App;
