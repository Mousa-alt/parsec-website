import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP } from '../constants';

export const FloatingWhatsApp: React.FC = () => {
  const handleClick = () => {
    window.open(
      `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.defaultMessage)}`,
      '_blank'
    );
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.4 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-shadow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </motion.button>
  );
};
