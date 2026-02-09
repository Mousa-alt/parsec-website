import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Beaker, FlaskConical } from 'lucide-react';
import { usePlaygroundStore } from '../../store/playground-store';
import { AutomationQuiz } from './AutomationQuiz';
import { DocProcessorDemo } from './DocProcessorDemo';
import { WhatsAppWidget } from './WhatsAppWidget';
import { AgentConfigurator } from './AgentConfigurator';
import { WorkflowLibrary } from './WorkflowLibrary';
import { IntegrationShowcase } from './IntegrationShowcase';
import { TrustSignals } from './TrustSignals';
import { LanguageToggle } from './LanguageToggle';

export const PlaygroundSection: React.FC = () => {
  const { language } = usePlaygroundStore();
  const isArabic = language === 'ar';

  return (
    <div className="space-y-8" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <LanguageToggle />
        </motion.div>
      </div>

      {/* Trust Signals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <TrustSignals />
      </motion.div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AutomationQuiz />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DocProcessorDemo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <WorkflowLibrary />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <WhatsAppWidget />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <AgentConfigurator />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <IntegrationShowcase />
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
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
