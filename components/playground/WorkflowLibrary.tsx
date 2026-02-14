import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitBranch,
  Download,
  Star,
  MessageCircle,
  Building2,
  Stethoscope,
  HardHat,
  ShoppingCart,
  Filter,
  ExternalLink,
  X,
} from 'lucide-react';
import { usePlaygroundStore, Industry } from '../../store/playground-store';
import { workflowTemplates, WorkflowTemplate } from '../../lib/playground-data';
import { WHATSAPP } from '../../constants';

const industryFilters: { id: Industry | 'all'; label: string; labelAr: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All', labelAr: 'الكل', icon: <Filter className="w-4 h-4" /> },
  { id: 'real-estate', label: 'Real Estate', labelAr: 'العقارات', icon: <Building2 className="w-4 h-4" /> },
  { id: 'healthcare', label: 'Healthcare', labelAr: 'الصحة', icon: <Stethoscope className="w-4 h-4" /> },
  { id: 'construction', label: 'Construction', labelAr: 'المقاولات', icon: <HardHat className="w-4 h-4" /> },
  { id: 'ecommerce', label: 'E-commerce', labelAr: 'التجارة', icon: <ShoppingCart className="w-4 h-4" /> },
];

const categoryColors: Record<string, string> = {
  'lead-gen': '#10B981',
  support: '#3B82F6',
  operations: '#F59E0B',
  marketing: '#8B5CF6',
};

export const WorkflowLibrary: React.FC = () => {
  const { language, userContact, setUserContact, setShowLeadCapture } = usePlaygroundStore();
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'all'>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [whatsappInput, setWhatsappInput] = useState('');

  const isArabic = language === 'ar';

  const filteredTemplates = workflowTemplates.filter(
    (template) => selectedIndustry === 'all' || template.industry === selectedIndustry || template.industry === 'all'
  );

  const handleDownloadClick = (template: WorkflowTemplate) => {
    setSelectedTemplate(template);
    if (userContact.whatsapp) {
      // Already have contact, trigger download
      handleDownload(template);
    } else {
      // Need to capture contact
      setShowDownloadModal(true);
    }
  };

  const handleDownload = (template: WorkflowTemplate) => {
    // Open WhatsApp with template request
    const msg = encodeURIComponent(
      `Hi! I'd like to download the "${template.name}" workflow template.\n\n` +
      `Please send me the JSON file and setup guide.`
    );
    window.open(`https://wa.me/${WHATSAPP.number}?text=${msg}`, '_blank');
    setShowDownloadModal(false);
  };

  const handleWhatsAppSubmit = () => {
    if (!whatsappInput.trim() || !selectedTemplate) return;
    setUserContact({ whatsapp: whatsappInput });
    handleDownload(selectedTemplate);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < Math.floor(rating) ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#E1E6EB]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#E1E6EB] p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EA4B71] flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-black text-[#2D4769]">
              {isArabic ? 'مكتبة سير العمل' : 'Workflow Library'}
            </h3>
            <p className="text-[10px] text-[#8EA3B5]">
              {isArabic ? 'قوالب n8n جاهزة للاستخدام' : 'Ready-to-use n8n templates'}
            </p>
          </div>
        </div>
        <a
          href="https://n8n.io/workflows/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10px] text-[#8EA3B5] hover:text-[#2D4769] transition-colors"
        >
          {isArabic ? 'استكشف المزيد' : 'Explore more'}
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Industry Filters */}
      <div className="flex gap-1.5 md:gap-2 mb-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        {industryFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedIndustry(filter.id)}
            className={`flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-bold whitespace-nowrap transition-all flex-shrink-0 ${
              selectedIndustry === filter.id
                ? 'bg-[#2D4769] text-white'
                : 'bg-[#F0F2F5] text-[#557089] hover:bg-[#E1E6EB]'
            }`}
          >
            {filter.icon}
            {isArabic ? filter.labelAr : filter.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid gap-3 max-h-[320px] overflow-y-auto pr-1">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-3 border border-[#E1E6EB] rounded-xl hover:border-[#8B5CF6]/50 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase"
                      style={{
                        backgroundColor: `${categoryColors[template.category]}15`,
                        color: categoryColors[template.category],
                      }}
                    >
                      {template.category}
                    </span>
                    <span className="text-[9px] text-[#8EA3B5]">
                      {template.nodes} {isArabic ? 'عقدة' : 'nodes'}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#2D4769] mb-0.5 truncate">
                    {isArabic ? template.nameAr : template.name}
                  </h4>
                  <p className="text-[10px] text-[#8EA3B5] line-clamp-2">
                    {isArabic ? template.descriptionAr : template.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    {renderStars(template.rating)}
                    <span className="text-[9px] text-[#8EA3B5]">
                      {template.downloads.toLocaleString()} {isArabic ? 'تحميل' : 'downloads'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDownloadClick(template)}
                  className="p-2 rounded-lg bg-[#F0F2F5] text-[#8EA3B5] group-hover:bg-[#8B5CF6] group-hover:text-white transition-all shrink-0"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Download Modal */}
      <AnimatePresence>
        {showDownloadModal && selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDownloadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
            >
              <button
                onClick={() => setShowDownloadModal(false)}
                className="absolute top-4 right-4 p-1 hover:bg-[#F0F2F5] rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-[#8EA3B5]" />
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-[#EA4B71]/10 flex items-center justify-center mx-auto mb-4">
                  <GitBranch className="w-7 h-7 text-[#EA4B71]" />
                </div>
                <h3 className="text-xl font-black text-[#2D4769] mb-2">
                  {isArabic ? 'تحميل القالب' : 'Download Template'}
                </h3>
                <p className="text-sm text-[#8EA3B5]">
                  {isArabic ? selectedTemplate.nameAr : selectedTemplate.name}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-[#557089] text-center">
                  {isArabic
                    ? 'أدخل رقم واتساب لتلقي ملف JSON ودليل الإعداد'
                    : 'Enter your WhatsApp to receive the JSON file and setup guide'}
                </p>
                <input
                  type="tel"
                  value={whatsappInput}
                  onChange={(e) => setWhatsappInput(e.target.value)}
                  placeholder={isArabic ? 'رقم واتساب' : 'WhatsApp number'}
                  className="w-full p-4 rounded-xl border-2 border-[#E1E6EB] focus:border-[#EA4B71] outline-none"
                  dir="ltr"
                />
                <button
                  onClick={handleWhatsAppSubmit}
                  disabled={!whatsappInput.trim()}
                  className="w-full px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#20BD5A] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  {isArabic ? 'إرسال عبر واتساب' : 'Send via WhatsApp'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
