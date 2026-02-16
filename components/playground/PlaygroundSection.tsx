import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FlaskConical } from 'lucide-react';
import { usePlaygroundStore } from '../../store/playground-store';
import { LanguageToggle } from './LanguageToggle';

// Lazy load heavy components to prevent blocking
const TrustSignals = lazy(() => import('./TrustSignals').then(m => ({ default: m.TrustSignals })));
const AutomationQuiz = lazy(() => import('./AutomationQuiz').then(m => ({ default: m.AutomationQuiz })));
const DocProcessorDemo = lazy(() => import('./DocProcessorDemo').then(m => ({ default: m.DocProcessorDemo })));
const WhatsAppWidget = lazy(() => import('./WhatsAppWidget').then(m => ({ default: m.WhatsAppWidget })));
const AgentConfigurator = lazy(() => import('./AgentConfigurator').then(m => ({ default: m.AgentConfigurator })));
const WorkflowLibrary = lazy(() => import('./WorkflowLibrary').then(m => ({ default: m.WorkflowLibrary })));
const IntegrationShowcase = lazy(() => import('./IntegrationShowcase').then(m => ({ default: m.IntegrationShowcase })));

// Loading placeholder
const LoadingCard = () => (
  <div className="bg-white rounded-2xl border-2 border-[#E1E6EB] p-6 animate-pulse">
    <div className="h-4 bg-[#E1E6EB] rounded w-1/3 mb-4" />
    <div className="h-32 bg-[#F0F2F5] rounded" />
  </div>
);

export const PlaygroundSection: React.FC = () => {
  const { language } = usePlaygroundStore();
  const isArabic = language === 'ar';

  return (
    <div className="space-y-6 md:space-y-8" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center">
            <FlaskConical className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-[#2D4769]">
              {isArabic ? 'معمل التجارب' : 'Experiment Lab'}
            </h2>
            <p className="text-xs text-[#8EA3B5]">
              {isArabic
                ? 'جرب أدواتنا واكتشف إمكانات الأتمتة'
                : 'Test drive our tools and discover automation potential'}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <LanguageToggle />
        </motion.div>
      </div>

      {/* Trust Signals */}
      <Suspense fallback={<LoadingCard />}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TrustSignals />
        </motion.div>
      </Suspense>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <Suspense fallback={<LoadingCard />}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <AutomationQuiz />
            </motion.div>
          </Suspense>

          <Suspense fallback={<LoadingCard />}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DocProcessorDemo />
            </motion.div>
          </Suspense>

          <Suspense fallback={<LoadingCard />}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <WorkflowLibrary />
            </motion.div>
          </Suspense>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Suspense fallback={<LoadingCard />}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <WhatsAppWidget />
            </motion.div>
          </Suspense>

          <Suspense fallback={<LoadingCard />}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <AgentConfigurator />
            </motion.div>
          </Suspense>

          <Suspense fallback={<LoadingCard />}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <IntegrationShowcase />
            </motion.div>
          </Suspense>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[#2D4769] to-[#1D2F45] rounded-2xl p-6 md:p-8 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <Sparkles className="w-8 h-8 text-[#8B5CF6] mx-auto mb-4" />
          <h3 className="text-xl md:text-2xl font-black text-white mb-2">
            {isArabic ? 'جاهز لأتمتة عملك؟' : 'Ready to Automate Your Business?'}
          </h3>
          <p className="text-sm text-[#8EA3B5] mb-6">
            {isArabic
              ? 'تحدث مع فريقنا للحصول على حل مخصص يناسب احتياجاتك'
              : 'Talk to our team for a custom solution tailored to your needs'}
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-[#8B5CF6] text-white font-bold rounded-xl hover:bg-[#7C3AED] transition-all shadow-lg shadow-[#8B5CF6]/20"
          >
            {isArabic ? 'احصل على استشارة مجانية' : 'Get a Free Consultation'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
