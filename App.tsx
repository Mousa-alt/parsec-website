
import React, { useLayoutEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductsGrid } from './components/ProductsGrid';
import { Terminal } from './components/Terminal';
import { Metrics } from './components/Metrics';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { Home, Layers, Terminal as TermIcon, Award, MessageCircle } from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: <Home className="w-4 h-4" />, href: '#home', label: 'Index' },
    { icon: <Layers className="w-4 h-4" />, href: '#products', label: 'Solutions' },
    { icon: <TermIcon className="w-4 h-4" />, href: '#demo', label: 'Console' },
    { icon: <Award className="w-4 h-4" />, href: '#case-studies', label: 'Success' },
    { icon: <MessageCircle className="w-4 h-4" />, href: '#contact', label: 'Query' },
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
    <div className="relative min-h-screen font-['Poppins']">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#2D4769] z-[60] origin-left" style={{ scaleX }} />
      
      <Navbar />
      <Sidebar />

      <main className="doc-container pt-32 pb-40 relative">
        <section id="home">
          <Hero />
        </section>
        
        <div className="h-24" />

        <section id="products" className="mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-10 group"
          >
            <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-3xl font-black tracking-tight text-[#2D4769]">Architectural Library</h2>
            <span className="text-xs font-mono text-[#8EA3B5] mt-2">DB.PRSC.v2</span>
          </motion.div>
          <ProductsGrid />
        </section>

        <section id="demo" className="mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-10 group"
          >
            <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-3xl font-black tracking-tight text-[#2D4769]">System Console</h2>
          </motion.div>
          <Terminal />
        </section>

        <section className="mb-40">
          <Metrics />
        </section>

        <section id="case-studies" className="mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-10 group"
          >
            <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-3xl font-black tracking-tight text-[#2D4769]">Validation Logs</h2>
          </motion.div>
          <CaseStudies />
        </section>

        {/* Testimonials section hidden for now
        <section id="testimonials" className="mb-40">
          <Testimonials />
        </section>
        */}

        <section id="contact" className="mb-40">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-10 group"
          >
            <div className="w-1.5 h-1.5 bg-[#2D4769] rounded-full group-hover:scale-150 transition-transform" />
            <h2 className="text-3xl font-black tracking-tight text-[#2D4769]">Project Initialization</h2>
          </motion.div>
          <Contact />
        </section>

        <Footer />
      </main>

      {/* Floating Badge */}
      <div className="fixed bottom-10 right-10 z-50">
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
  );
};

export default App;
