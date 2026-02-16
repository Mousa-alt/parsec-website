import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Stethoscope,
  HardHat,
  ShoppingCart,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  RotateCcw,
  MessageCircle,
  Download,
} from 'lucide-react';
import { usePlaygroundStore, Industry } from '../../store/playground-store';
import {
  industryQuestions,
  getIndustryQuestions,
  getRecommendation,
  getMaxScore,
  QuizQuestion,
} from '../../lib/playground-data';
import { WHATSAPP } from '../../constants';

const industryIcons: Record<Industry, React.ReactNode> = {
  'real-estate': <Building2 className="w-6 h-6" />,
  healthcare: <Stethoscope className="w-6 h-6" />,
  construction: <HardHat className="w-6 h-6" />,
  ecommerce: <ShoppingCart className="w-6 h-6" />,
  other: <Briefcase className="w-6 h-6" />,
};

export const AutomationQuiz: React.FC = () => {
  const {
    language,
    quizStep,
    quizResults,
    setQuizStep,
    setQuizIndustry,
    setCompanyName,
    addQuizAnswer,
    completeQuiz,
    resetQuiz,
    userContact,
    setUserContact,
    showLeadCapture,
    setShowLeadCapture,
  } = usePlaygroundStore();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [companyInput, setCompanyInput] = useState('');
  const [whatsappInput, setWhatsappInput] = useState('');

  const isArabic = language === 'ar';

  // Get questions for the selected industry
  const questions = useMemo(() => {
    if (!quizResults.industry) return [];
    return getIndustryQuestions(quizResults.industry);
  }, [quizResults.industry]);

  // Current question (after industry selection)
  const currentQuestion = questions[quizStep - 1];

  // Calculate progress
  const totalSteps = questions.length + 1; // +1 for industry selection
  const progress = ((quizStep) / totalSteps) * 100;

  // Handle industry selection
  const handleSelectIndustry = (industry: Industry) => {
    setQuizIndustry(industry);
    setQuizStep(1);
  };

  // Handle option selection
  const handleSelectOption = (value: string) => {
    if (currentQuestion?.multiSelect) {
      setSelectedOptions((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    } else {
      setSelectedOptions([value]);
    }
  };

  // Handle next step
  const handleNext = () => {
    if (selectedOptions.length === 0) return;

    const score = selectedOptions.reduce((sum, val) => {
      const opt = currentQuestion?.options.find((o) => o.value === val);
      return sum + (opt?.score || 0);
    }, 0);

    addQuizAnswer({
      questionId: currentQuestion?.id || '',
      answer: currentQuestion?.multiSelect ? selectedOptions : selectedOptions[0],
      score,
    });

    setSelectedOptions([]);

    if (quizStep >= questions.length) {
      // Quiz complete - ask for company name
      setQuizStep(quizStep + 1);
    } else {
      setQuizStep(quizStep + 1);
    }
  };

  // Handle company name submission
  const handleCompanySubmit = () => {
    if (!companyInput.trim()) return;
    setCompanyName(companyInput);
    completeQuiz();
  };

  // Handle WhatsApp lead capture
  const handleWhatsAppSubmit = () => {
    if (!whatsappInput.trim()) return;
    setUserContact({ whatsapp: whatsappInput });

    // Open WhatsApp with results
    const score = Math.round((quizResults.totalScore / getMaxScore(quizResults.industry!)) * 100);
    const recommendation = getRecommendation(score);
    const msg = encodeURIComponent(
      `Hi! I just completed the Automation Readiness Quiz.\n\n` +
      `Company: ${quizResults.companyName}\n` +
      `Industry: ${quizResults.industry}\n` +
      `Score: ${score}/100\n` +
      `Recommendation: ${recommendation.suggestedAgent}\n\n` +
      `I'd like to learn more about how ParSec can help automate my business.`
    );
    window.open(`https://wa.me/${WHATSAPP.number}?text=${msg}`, '_blank');
    setShowLeadCapture(false);
  };

  // Calculate final score percentage
  const scorePercentage = useMemo(() => {
    if (!quizResults.industry || !quizResults.completedAt) return 0;
    const maxScore = getMaxScore(quizResults.industry);
    return Math.round((quizResults.totalScore / maxScore) * 100);
  }, [quizResults]);

  const recommendation = useMemo(() => {
    return getRecommendation(scorePercentage);
  }, [scorePercentage]);

  // Render industry selection
  const renderIndustrySelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-2xl font-black text-[#2D4769] mb-2">
          {isArabic ? 'ما هي صناعتك؟' : 'What is your industry?'}
        </h3>
        <p className="text-sm text-[#8EA3B5]">
          {isArabic
            ? 'اختر صناعتك للحصول على أسئلة مخصصة'
            : 'Select your industry for customized questions'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        {industryQuestions.map((ind) => (
          <motion.button
            key={ind.industry}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelectIndustry(ind.industry)}
            className="p-3 md:p-6 rounded-xl border-2 border-[#E1E6EB] hover:border-[#8B5CF6] bg-white hover:bg-[#8B5CF6]/5 transition-all group text-left"
          >
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-2 md:mb-3 transition-colors"
              style={{ backgroundColor: `${ind.color}15`, color: ind.color }}
            >
              {industryIcons[ind.industry]}
            </div>
            <div className="font-bold text-[#2D4769] text-xs md:text-base truncate">
              {isArabic ? ind.labelAr : ind.label}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  // Render question
  const renderQuestion = () => {
    if (!currentQuestion) return null;

    return (
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        className="space-y-6"
      >
        <div className="mb-6">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#8EA3B5] mb-2">
            {isArabic
              ? `السؤال ${quizStep} من ${questions.length}`
              : `Question ${quizStep} of ${questions.length}`}
          </div>
          <h3 className="text-lg md:text-xl font-bold text-[#2D4769]">
            {isArabic ? currentQuestion.questionAr : currentQuestion.question}
          </h3>
          {currentQuestion.multiSelect && (
            <p className="text-xs text-[#8EA3B5] mt-1">
              {isArabic ? '(اختر كل ما ينطبق)' : '(Select all that apply)'}
            </p>
          )}
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((opt) => (
            <motion.button
              key={opt.value}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleSelectOption(opt.value)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                selectedOptions.includes(opt.value)
                  ? 'border-[#8B5CF6] bg-[#8B5CF6]/10'
                  : 'border-[#E1E6EB] hover:border-[#8B5CF6]/50'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedOptions.includes(opt.value)
                    ? 'border-[#8B5CF6] bg-[#8B5CF6]'
                    : 'border-[#C5D2E0]'
                }`}
              >
                {selectedOptions.includes(opt.value) && (
                  <CheckCircle className="w-3 h-3 text-white" />
                )}
              </div>
              <span className="font-medium text-[#2D4769]">
                {isArabic ? opt.labelAr : opt.label}
              </span>
            </motion.button>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => setQuizStep(quizStep - 1)}
            className="px-4 py-2 rounded-lg border border-[#E1E6EB] text-[#8EA3B5] hover:bg-[#F8F9FA] transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {isArabic ? 'السابق' : 'Back'}
          </button>
          <button
            onClick={handleNext}
            disabled={selectedOptions.length === 0}
            className="flex-1 px-6 py-2 rounded-lg bg-[#8B5CF6] text-white font-bold hover:bg-[#7C3AED] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {quizStep >= questions.length
              ? isArabic
                ? 'إنهاء'
                : 'Finish'
              : isArabic
              ? 'التالي'
              : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  };

  // Render company name input
  const renderCompanyInput = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mx-auto">
        <Sparkles className="w-8 h-8 text-[#8B5CF6]" />
      </div>
      <div>
        <h3 className="text-xl font-black text-[#2D4769] mb-2">
          {isArabic ? 'تقريباً انتهينا!' : 'Almost done!'}
        </h3>
        <p className="text-sm text-[#8EA3B5]">
          {isArabic
            ? 'أدخل اسم شركتك لتخصيص تقريرك'
            : 'Enter your company name to personalize your report'}
        </p>
      </div>
      <input
        type="text"
        value={companyInput}
        onChange={(e) => setCompanyInput(e.target.value)}
        placeholder={isArabic ? 'اسم شركتك' : 'Your company name'}
        className="w-full p-4 rounded-xl border-2 border-[#E1E6EB] focus:border-[#8B5CF6] outline-none text-center font-medium"
        dir={isArabic ? 'rtl' : 'ltr'}
      />
      <button
        onClick={handleCompanySubmit}
        disabled={!companyInput.trim()}
        className="w-full px-6 py-3 rounded-xl bg-[#8B5CF6] text-white font-bold hover:bg-[#7C3AED] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isArabic ? 'احصل على نتيجتك' : 'Get Your Score'}
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );

  // Render results
  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* Score Circle */}
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#E1E6EB"
              strokeWidth="12"
              fill="none"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              stroke={
                recommendation.priority === 'critical'
                  ? '#EF4444'
                  : recommendation.priority === 'high'
                  ? '#F59E0B'
                  : recommendation.priority === 'medium'
                  ? '#8B5CF6'
                  : '#10B981'
              }
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: scorePercentage / 100 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{
                strokeDasharray: '351.86',
                strokeDashoffset: '0',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-black text-[#2D4769]">{scorePercentage}</span>
          </div>
        </div>
        <h3 className="text-xl font-black text-[#2D4769] mb-1">
          {isArabic ? recommendation.titleAr : recommendation.title}
        </h3>
        <p className="text-sm text-[#8EA3B5] max-w-md mx-auto">
          {isArabic ? recommendation.descriptionAr : recommendation.description}
        </p>
      </div>

      {/* Recommendation Card */}
      <div className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5 rounded-xl p-5 border border-[#8B5CF6]/20">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B5CF6] mb-2">
          {isArabic ? 'توصيتنا' : 'Our Recommendation'}
        </div>
        <div className="text-lg font-black text-[#2D4769]">
          {isArabic ? recommendation.suggestedAgentAr : recommendation.suggestedAgent}
        </div>
        <div className="text-xs text-[#557089] mt-1">
          {isArabic
            ? `لـ ${quizResults.companyName}`
            : `For ${quizResults.companyName}`}
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setShowLeadCapture(true)}
          className="px-4 py-3 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20BD5A] transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          {isArabic ? 'احصل على التقرير' : 'Get Report'}
        </button>
        <button
          onClick={resetQuiz}
          className="px-4 py-3 rounded-xl border-2 border-[#E1E6EB] text-[#557089] font-bold hover:bg-[#F8F9FA] transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          {isArabic ? 'إعادة' : 'Retake'}
        </button>
      </div>
    </motion.div>
  );

  // Render lead capture modal
  const renderLeadCapture = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowLeadCapture(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
      >
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-7 h-7 text-[#25D366]" />
          </div>
          <h3 className="text-xl font-black text-[#2D4769] mb-2">
            {isArabic ? 'احصل على تقريرك الكامل' : 'Get Your Full Report'}
          </h3>
          <p className="text-sm text-[#8EA3B5]">
            {isArabic
              ? 'أدخل رقم واتساب لتلقي تقريرك المخصص'
              : 'Enter your WhatsApp number to receive your personalized report'}
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="tel"
            value={whatsappInput}
            onChange={(e) => setWhatsappInput(e.target.value)}
            placeholder={isArabic ? 'رقم واتساب (مثال: +201234567890)' : 'WhatsApp number (e.g., +201234567890)'}
            className="w-full p-4 rounded-xl border-2 border-[#E1E6EB] focus:border-[#25D366] outline-none"
            dir="ltr"
          />
          <button
            onClick={handleWhatsAppSubmit}
            disabled={!whatsappInput.trim()}
            className="w-full px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20BD5A] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isArabic ? 'إرسال التقرير عبر واتساب' : 'Send Report via WhatsApp'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="bg-white rounded-2xl border-2 border-[#E1E6EB] p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-black text-[#2D4769]">
              {isArabic ? 'اختبار الجاهزية للأتمتة' : 'Automation Readiness Quiz'}
            </h3>
            <p className="text-[10px] text-[#8EA3B5]">
              {isArabic ? '2-3 دقائق للإكمال' : '2-3 minutes to complete'}
            </p>
          </div>
        </div>
        {quizStep > 0 && !quizResults.completedAt && (
          <div className="text-right">
            <div className="text-[10px] font-bold text-[#8EA3B5] uppercase tracking-wider">
              {isArabic ? 'التقدم' : 'Progress'}
            </div>
            <div className="text-lg font-black text-[#8B5CF6]">{Math.round(progress)}%</div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {quizStep > 0 && !quizResults.completedAt && (
        <div className="h-1.5 bg-[#E1E6EB] rounded-full mb-6 overflow-hidden">
          <motion.div
            className="h-full bg-[#8B5CF6] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {quizStep === 0 && !quizResults.industry && renderIndustrySelection()}
        {quizStep > 0 && quizStep <= questions.length && renderQuestion()}
        {quizStep > questions.length && !quizResults.completedAt && renderCompanyInput()}
        {quizResults.completedAt && renderResults()}
      </AnimatePresence>

      {/* Lead Capture Modal */}
      <AnimatePresence>{showLeadCapture && renderLeadCapture()}</AnimatePresence>
    </div>
  );
};
