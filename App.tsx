
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialProofBar } from './components/SocialProofBar';
import { ROICalculator } from './components/ROICalculator';
import { ServicesGrid } from './components/ServicesGrid';
import { Playground } from './components/Playground';
import { Terminal } from './components/Terminal';
import { CaseStudies } from './components/CaseStudies';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TerminalProvider } from './TerminalContext';
import { PlaygroundSection } from './components/playground/PlaygroundSection';
import { SignatureProject } from './components/SignatureProject';
import { Home, Layers, Award, MessageCircle, Zap, AlertTriangle } from 'lucide-react';

// Error Boundary to catch rendering errors
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  declare props: ErrorBoundaryProps;
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (hasError) {
      return fallback || (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-red-700 mb-1">Something went wrong</h3>
          <p className="text-sm text-red-600">{error?.message}</p>
        </div>
      );
    }
    return children;
  }
}

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: <Home className="w-4 h-4" />, href: '#home', label: 'Home' },
    { icon: <Zap className="w-4 h-4" />, href: '#demo', label: 'Try It' },
    { icon: <Layers className="w-4 h-4" />, href: '#services', label: 'Services' },
    { icon: <Award className="w-4 h-4" />, href: '#results', label: 'Results' },
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

        {/* Social Proof Bar */}
        <section className="mb-10 md:mb-16">
          <SocialProofBar />
        </section>

        {/* ROI Calculator - Compact */}
        <section id="demo" className="mb-10 md:mb-16">
          <ROICalculator />
        </section>

        {/* Signature Project - Self-Updating Website */}
        <section id="signature" className="mb-10 md:mb-16">
          <SignatureProject />
        </section>

        {/* Services */}
        <section id="services" className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
          <ErrorBoundary>
            <PlaygroundSection />
          </ErrorBoundary>
        </section>

        {/* Case Studies */}
        <section id="results" className="mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 md:gap-4 mb-4 md:mb-6 group"
          >
            <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-lg md:text-2xl font-black tracking-tight text-[#2D4769]">Get Started</h2>
          </motion.div>
          <Contact />
        </section>

        <Footer />
      </main>

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
    </TerminalProvider>
  );
};

export default App;
