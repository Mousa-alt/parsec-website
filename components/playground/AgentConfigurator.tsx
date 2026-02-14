import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  MessageCircle,
  Phone,
  Mail,
  Send,
  Calendar,
  Users,
  HeadphonesIcon,
  CreditCard,
  Bell,
  FileText,
  Building2,
  Stethoscope,
  HardHat,
  ShoppingCart,
  Briefcase,
  ArrowRight,
  Sparkles,
  Check,
  RotateCcw,
  Download,
} from 'lucide-react';
import { usePlaygroundStore, Industry, Channel, Skill } from '../../store/playground-store';
import { WHATSAPP } from '../../constants';

const industryOptions: { id: Industry; label: string; labelAr: string; icon: React.ReactNode; color: string }[] = [
  { id: 'real-estate', label: 'Real Estate', labelAr: 'العقارات', icon: <Building2 className="w-5 h-5" />, color: '#2D4769' },
  { id: 'healthcare', label: 'Healthcare', labelAr: 'الرعاية الصحية', icon: <Stethoscope className="w-5 h-5" />, color: '#10B981' },
  { id: 'construction', label: 'Construction', labelAr: 'المقاولات', icon: <HardHat className="w-5 h-5" />, color: '#F59E0B' },
  { id: 'ecommerce', label: 'E-commerce', labelAr: 'التجارة الإلكترونية', icon: <ShoppingCart className="w-5 h-5" />, color: '#8B5CF6' },
  { id: 'other', label: 'Other', labelAr: 'أخرى', icon: <Briefcase className="w-5 h-5" />, color: '#6B7280' },
];

const channelOptions: { id: Channel; label: string; labelAr: string; icon: React.ReactNode; color: string }[] = [
  { id: 'whatsapp', label: 'WhatsApp', labelAr: 'واتساب', icon: <MessageCircle className="w-5 h-5" />, color: '#25D366' },
  { id: 'voice', label: 'Voice Calls', labelAr: 'مكالمات صوتية', icon: <Phone className="w-5 h-5" />, color: '#3B82F6' },
  { id: 'email', label: 'Email', labelAr: 'بريد إلكتروني', icon: <Mail className="w-5 h-5" />, color: '#EF4444' },
  { id: 'telegram', label: 'Telegram', labelAr: 'تيليجرام', icon: <Send className="w-5 h-5" />, color: '#0088CC' },
];

const skillOptions: { id: Skill; label: string; labelAr: string; icon: React.ReactNode }[] = [
  { id: 'lead-qualification', label: 'Lead Qualification', labelAr: 'تأهيل العملاء', icon: <Users className="w-4 h-4" /> },
  { id: 'booking', label: 'Appointment Booking', labelAr: 'حجز المواعيد', icon: <Calendar className="w-4 h-4" /> },
  { id: 'support', label: 'Customer Support', labelAr: 'دعم العملاء', icon: <HeadphonesIcon className="w-4 h-4" /> },
  { id: 'payments', label: 'Payment Processing', labelAr: 'معالجة المدفوعات', icon: <CreditCard className="w-4 h-4" /> },
  { id: 'reminders', label: 'Reminders', labelAr: 'تذكيرات', icon: <Bell className="w-4 h-4" /> },
  { id: 'data-entry', label: 'Data Entry', labelAr: 'إدخال البيانات', icon: <FileText className="w-4 h-4" /> },
];

export const AgentConfigurator: React.FC = () => {
  const { language, configuratorState, setConfiguratorIndustry, toggleChannel, toggleSkill, resetConfigurator } = usePlaygroundStore();
  const [step, setStep] = useState(1);

  const isArabic = language === 'ar';

  const handleIndustrySelect = (industry: Industry) => {
    setConfiguratorIndustry(industry);
    setStep(2);
  };

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleReset = () => {
    resetConfigurator();
    setStep(1);
  };

  const handleGetQuote = () => {
    const selectedIndustry = industryOptions.find(i => i.id === configuratorState.selectedIndustry);
    const channels = configuratorState.selectedChannels.map(c => channelOptions.find(ch => ch.id === c)?.label).join(', ');
    const skills = configuratorState.selectedSkills.map(s => skillOptions.find(sk => sk.id === s)?.label).join(', ');

    const msg = encodeURIComponent(
      `Hi! I just configured my ideal AI Agent:\n\n` +
      `Industry: ${selectedIndustry?.label}\n` +
      `Channels: ${channels}\n` +
      `Skills: ${skills}\n` +
      `Estimated Savings: ${configuratorState.estimatedSavings} hours/month\n\n` +
      `I'd like to get a quote for building this agent.`
    );
    window.open(`https://wa.me/${WHATSAPP.number}?text=${msg}`, '_blank');
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <h4 className="font-bold text-[#2D4769]">
          {isArabic ? 'اختر صناعتك' : 'Select Your Industry'}
        </h4>
        <p className="text-xs text-[#8EA3B5]">
          {isArabic ? 'سيساعد هذا في تخصيص توصياتنا' : 'This helps customize our recommendations'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {industryOptions.map((industry) => (
          <motion.button
            key={industry.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleIndustrySelect(industry.id)}
            className={`p-2 md:p-3 rounded-xl border-2 transition-all text-left ${
              configuratorState.selectedIndustry === industry.id
                ? 'border-[#8B5CF6] bg-[#8B5CF6]/5'
                : 'border-[#E1E6EB] hover:border-[#8B5CF6]/50'
            }`}
          >
            <div
              className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center mb-1.5 md:mb-2"
              style={{ backgroundColor: `${industry.color}15`, color: industry.color }}
            >
              {React.cloneElement(industry.icon as React.ReactElement, { className: 'w-4 h-4 md:w-5 md:h-5' })}
            </div>
            <div className="text-[10px] md:text-xs font-bold text-[#2D4769] truncate">
              {isArabic ? industry.labelAr : industry.label}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <h4 className="font-bold text-[#2D4769]">
          {isArabic ? 'اختر قنوات التواصل' : 'Choose Communication Channels'}
        </h4>
        <p className="text-xs text-[#8EA3B5]">
          {isArabic ? 'أين يتواصل عملاؤك؟' : 'Where do your customers reach you?'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {channelOptions.map((channel) => {
          const isSelected = configuratorState.selectedChannels.includes(channel.id);
          return (
            <motion.button
              key={channel.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleChannel(channel.id)}
              className={`p-3 rounded-xl border-2 transition-all text-left relative ${
                isSelected
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/5'
                  : 'border-[#E1E6EB] hover:border-[#8B5CF6]/50'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 bg-[#8B5CF6] rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-white" />
                </div>
              )}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                style={{ backgroundColor: `${channel.color}15`, color: channel.color }}
              >
                {channel.icon}
              </div>
              <div className="text-xs font-bold text-[#2D4769]">
                {isArabic ? channel.labelAr : channel.label}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={handlePrevStep}
          className="px-3 py-2 rounded-lg border border-[#E1E6EB] text-xs text-[#8EA3B5] hover:bg-[#F8F9FA]"
        >
          {isArabic ? 'السابق' : 'Back'}
        </button>
        <button
          onClick={handleNextStep}
          disabled={configuratorState.selectedChannels.length === 0}
          className="flex-1 px-3 py-2 rounded-lg bg-[#8B5CF6] text-white text-xs font-bold hover:bg-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
        >
          {isArabic ? 'التالي' : 'Next'}
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="text-center mb-4">
        <h4 className="font-bold text-[#2D4769]">
          {isArabic ? 'اختر قدرات الوكيل' : 'Select Agent Capabilities'}
        </h4>
        <p className="text-xs text-[#8EA3B5]">
          {isArabic ? 'ماذا يجب أن يفعل وكيلك؟' : 'What should your agent do?'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {skillOptions.map((skill) => {
          const isSelected = configuratorState.selectedSkills.includes(skill.id);
          return (
            <motion.button
              key={skill.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleSkill(skill.id)}
              className={`p-2 rounded-lg border-2 transition-all text-left flex items-center gap-2 ${
                isSelected
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/5'
                  : 'border-[#E1E6EB] hover:border-[#8B5CF6]/50'
              }`}
            >
              <div className={`w-6 h-6 rounded flex items-center justify-center ${
                isSelected ? 'bg-[#8B5CF6] text-white' : 'bg-[#F0F2F5] text-[#8EA3B5]'
              }`}>
                {isSelected ? <Check className="w-3 h-3" /> : skill.icon}
              </div>
              <span className="text-[10px] font-bold text-[#2D4769]">
                {isArabic ? skill.labelAr : skill.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={handlePrevStep}
          className="px-3 py-2 rounded-lg border border-[#E1E6EB] text-xs text-[#8EA3B5] hover:bg-[#F8F9FA]"
        >
          {isArabic ? 'السابق' : 'Back'}
        </button>
        <button
          onClick={handleNextStep}
          disabled={configuratorState.selectedSkills.length === 0}
          className="flex-1 px-3 py-2 rounded-lg bg-[#8B5CF6] text-white text-xs font-bold hover:bg-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
        >
          {isArabic ? 'عرض النتيجة' : 'See Result'}
          <Sparkles className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );

  const renderStep4 = () => {
    const selectedIndustry = industryOptions.find(i => i.id === configuratorState.selectedIndustry);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-4"
      >
        {/* Concept Card */}
        <div className="bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-xl p-4 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs opacity-70">{isArabic ? 'وكيلك المخصص' : 'Your Custom Agent'}</div>
              <div className="font-bold">{selectedIndustry ? (isArabic ? selectedIndustry.labelAr : selectedIndustry.label) : ''} Agent</div>
            </div>
          </div>

          {/* Channels */}
          <div className="mb-3">
            <div className="text-[10px] opacity-70 mb-1">{isArabic ? 'القنوات' : 'Channels'}</div>
            <div className="flex flex-wrap gap-1">
              {configuratorState.selectedChannels.map((channelId) => {
                const channel = channelOptions.find(c => c.id === channelId);
                return (
                  <span key={channelId} className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] flex items-center gap-1">
                    {channel?.icon && React.cloneElement(channel.icon as React.ReactElement, { className: 'w-3 h-3' })}
                    {isArabic ? channel?.labelAr : channel?.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-3">
            <div className="text-[10px] opacity-70 mb-1">{isArabic ? 'القدرات' : 'Capabilities'}</div>
            <div className="flex flex-wrap gap-1">
              {configuratorState.selectedSkills.map((skillId) => {
                const skill = skillOptions.find(s => s.id === skillId);
                return (
                  <span key={skillId} className="px-2 py-0.5 bg-white/20 rounded-full text-[10px]">
                    {isArabic ? skill?.labelAr : skill?.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Estimated Savings */}
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-[10px] opacity-70">{isArabic ? 'التوفير المتوقع' : 'Estimated Monthly Savings'}</div>
            <div className="text-2xl font-black">{configuratorState.estimatedSavings}</div>
            <div className="text-xs opacity-70">{isArabic ? 'ساعة/شهر' : 'hours/month'}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-lg border border-[#E1E6EB] text-xs text-[#8EA3B5] hover:bg-[#F8F9FA] flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            {isArabic ? 'إعادة' : 'Start Over'}
          </button>
          <button
            onClick={handleGetQuote}
            className="px-3 py-2 rounded-lg bg-[#25D366] text-white text-xs font-bold hover:bg-[#20BD5A] flex items-center justify-center gap-1"
          >
            <Download className="w-3 h-3" />
            {isArabic ? 'احصل على عرض سعر' : 'Get Quote'}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#E1E6EB] p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6] flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-black text-[#2D4769]">
              {isArabic ? 'صمم وكيلك' : 'Build Your Agent'}
            </h3>
            <p className="text-[10px] text-[#8EA3B5]">
              {isArabic ? 'تصور حلك المخصص' : 'Visualize your custom solution'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-bold text-[#8EA3B5] uppercase tracking-wider">
            {isArabic ? 'الخطوة' : 'Step'}
          </div>
          <div className="text-lg font-black text-[#8B5CF6]">{step}/4</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 bg-[#E1E6EB] rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-[#8B5CF6] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </AnimatePresence>
    </div>
  );
};
