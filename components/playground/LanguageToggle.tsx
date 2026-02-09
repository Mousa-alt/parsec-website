import React from 'react';
import { motion } from 'framer-motion';
import { Languages } from 'lucide-react';
import { usePlaygroundStore } from '../../store/playground-store';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = usePlaygroundStore();

  return (
    <div className="flex items-center gap-2 bg-white border border-[#E1E6EB] rounded-xl p-1">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
          language === 'en'
            ? 'bg-[#2D4769] text-white'
            : 'text-[#8EA3B5] hover:bg-[#F0F2F5]'
        }`}
      >
        <span className="text-[10px]">🇬🇧</span>
        EN
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
          language === 'ar'
            ? 'bg-[#2D4769] text-white'
            : 'text-[#8EA3B5] hover:bg-[#F0F2F5]'
        }`}
      >
        <span className="text-[10px]">🇸🇦</span>
        عربي
      </motion.button>
    </div>
  );
};

// Compact version for mobile
export const LanguageToggleCompact: React.FC = () => {
  const { language, setLanguage } = usePlaygroundStore();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E1E6EB] rounded-xl text-xs font-bold text-[#2D4769] hover:bg-[#F8F9FA] transition-all"
    >
      <Languages className="w-4 h-4 text-[#8EA3B5]" />
      {language === 'en' ? 'عربي' : 'EN'}
    </motion.button>
  );
};
