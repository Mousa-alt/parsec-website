
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, WHATSAPP } from '../constants.tsx';
import { ServiceCategory } from '../types';
import { Logo } from './Logo';
import {
  ArrowRight,
  ChevronDown,
  Phone,
  Users,
  Share2,
  CreditCard,
  Zap,
  Globe,
  Palette,
  Camera,
  Rocket,
  Cpu,
  Building,
  MessageCircle
} from 'lucide-react';
import { useTerminal } from '../TerminalContext';

// Icon mapping for service items
const iconMap: Record<string, React.ReactNode> = {
  'phone': <Phone className="w-5 h-5" />,
  'users': <Users className="w-5 h-5" />,
  'share': <Share2 className="w-5 h-5" />,
  'credit-card': <CreditCard className="w-5 h-5" />,
  'zap': <Zap className="w-5 h-5" />,
  'globe': <Globe className="w-5 h-5" />,
  'palette': <Palette className="w-5 h-5" />,
  'camera': <Camera className="w-5 h-5" />,
  'rocket': <Rocket className="w-5 h-5" />,
  'cpu': <Cpu className="w-5 h-5" />,
  'building': <Building className="w-5 h-5" />,
};

// Individual Service Category Card
const ServiceCategoryCard: React.FC<{
  category: ServiceCategory;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ category, isExpanded, onToggle }) => {
  const { executeCommand } = useTerminal();

  return (
    <motion.div
      layout
      className="tactile-card overflow-hidden"
    >
      {/* Category Header */}
      <div
        onClick={onToggle}
        className="p-6 md:p-8 cursor-pointer group"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Logo size="xs" showIcon />
              <span className="px-2 py-0.5 bg-[#F0F2F5] text-[#8EA3B5] text-[10px] font-black uppercase rounded border border-[#E1E6EB]">
                {category.items.length} Services
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-[#2D4769] tracking-tight mb-2">
              {category.title}
            </h3>
            <p className="text-sm text-[#8EA3B5] font-bold italic mb-2">
              "{category.tagline}"
            </p>
            <p className="text-sm text-[#557089] font-medium leading-relaxed">
              {category.description}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="w-10 h-10 bg-[#F0F2F5] rounded-xl flex items-center justify-center group-hover:bg-[#2D4769] group-hover:text-white transition-all shrink-0"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      {/* Expanded Services List */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-[#F0F2F5]">
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.items.map((item, idx) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => executeCommand(`service ${item.name.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="flex items-center gap-4 p-4 bg-[#F8F9FA] rounded-xl hover:bg-[#F0F2F5] hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#2D4769] border border-[#E1E6EB] group-hover:bg-[#2D4769] group-hover:text-white group-hover:border-[#2D4769] transition-all">
                      {iconMap[item.icon] || <Zap className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#2D4769] text-sm truncate">{item.name}</div>
                      <div className="text-xs text-[#8EA3B5] truncate">{item.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C5D2E0] group-hover:text-[#2D4769] group-hover:translate-x-1 transition-all shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const ServicesGrid: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('automate');

  const handleContactStudio = () => {
    const msg = encodeURIComponent("Hi, I'm interested in discussing a custom project with ParSec.");
    window.open(`https://wa.me/${WHATSAPP.number}?text=${msg}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Service Categories */}
      {SERVICES.map((category) => (
        <ServiceCategoryCard
          key={category.id}
          category={category}
          isExpanded={expandedId === category.id}
          onToggle={() => setExpandedId(expandedId === category.id ? null : category.id)}
        />
      ))}

      {/* Custom Project Card */}
      <div className="tactile-card bg-[#F8F9FA] border-[3px] border-dashed border-[#C5D2E0] flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10 group hover:border-[#2D4769] transition-colors duration-500">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl border-[3px] border-dashed border-[#8EA3B5] flex items-center justify-center group-hover:scale-110 group-hover:border-[#2D4769] transition-all duration-500 bg-white shadow-lg">
            <Logo size="md" showIcon />
          </div>
          <div>
            <div className="text-xl md:text-2xl font-black text-[#2D4769] tracking-tight mb-1">
              Something Else?
            </div>
            <p className="text-sm text-[#8EA3B5] font-medium max-w-md">
              Have a unique challenge? Let's discuss custom solutions tailored to your needs.
            </p>
          </div>
        </div>
        <button
          onClick={handleContactStudio}
          className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.15em] text-white bg-[#2D4769] hover:bg-[#1D2F45] px-8 py-4 rounded-xl shadow-lg shadow-[#2D4769]/20 transition-all hover:-translate-y-0.5 active:scale-95 whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4" />
          Let's Talk
        </button>
      </div>
    </div>
  );
};
