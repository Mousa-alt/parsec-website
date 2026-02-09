import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  Sparkles,
  X,
  FileJson,
  Table,
} from 'lucide-react';
import { usePlaygroundStore } from '../../store/playground-store';

interface ExtractedData {
  vendor: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  lineItems: {
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }[];
  confidence: number;
}

// Simulated extraction results for demo
const mockExtractions: ExtractedData[] = [
  {
    vendor: 'ABC Construction Supplies',
    invoiceNumber: 'INV-2024-001234',
    date: '2024-01-15',
    dueDate: '2024-02-15',
    subtotal: 12500,
    tax: 1750,
    total: 14250,
    currency: 'SAR',
    lineItems: [
      { description: 'Steel Beams (Grade A)', quantity: 50, unitPrice: 150, amount: 7500 },
      { description: 'Concrete Mix (Premium)', quantity: 100, unitPrice: 50, amount: 5000 },
    ],
    confidence: 98.5,
  },
  {
    vendor: 'Medical Equipment Ltd',
    invoiceNumber: 'ME-78945',
    date: '2024-01-20',
    dueDate: '2024-02-20',
    subtotal: 8750,
    tax: 1312.5,
    total: 10062.5,
    currency: 'AED',
    lineItems: [
      { description: 'Dental Chair (Model X500)', quantity: 1, unitPrice: 5000, amount: 5000 },
      { description: 'Sterilization Unit', quantity: 1, unitPrice: 2500, amount: 2500 },
      { description: 'Consumables Kit', quantity: 5, unitPrice: 250, amount: 1250 },
    ],
    confidence: 96.2,
  },
  {
    vendor: 'Office Pro Supplies',
    invoiceNumber: 'OPS-2024-5678',
    date: '2024-01-22',
    dueDate: '2024-02-22',
    subtotal: 3200,
    tax: 480,
    total: 3680,
    currency: 'EGP',
    lineItems: [
      { description: 'HP LaserJet Printer', quantity: 2, unitPrice: 1200, amount: 2400 },
      { description: 'A4 Paper (500 sheets)', quantity: 10, unitPrice: 50, amount: 500 },
      { description: 'Ink Cartridges (Set)', quantity: 2, unitPrice: 150, amount: 300 },
    ],
    confidence: 99.1,
  },
];

export const DocProcessorDemo: React.FC = () => {
  const { language } = usePlaygroundStore();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'json' | 'table'>('table');
  const [isDragging, setIsDragging] = useState(false);

  const isArabic = language === 'ar';

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      setError(isArabic ? 'نوع الملف غير مدعوم' : 'Unsupported file type');
      return;
    }

    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError(isArabic ? 'حجم الملف يجب أن يكون أقل من 10MB' : 'File must be under 10MB');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setExtractedData(null);

    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }

    // Simulate processing
    simulateExtraction();
  };

  const simulateExtraction = () => {
    setIsProcessing(true);
    // Simulate API call delay
    setTimeout(() => {
      const randomExtraction = mockExtractions[Math.floor(Math.random() * mockExtractions.length)];
      setExtractedData(randomExtraction);
      setIsProcessing(false);
    }, 2000);
  };

  const resetDemo = () => {
    setFile(null);
    setPreview(null);
    setExtractedData(null);
    setError(null);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'EGP' ? 'EGP' : currency === 'SAR' ? 'SAR' : 'AED',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#E1E6EB] p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#10B981] flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-black text-[#2D4769]">
              {isArabic ? 'معالج المستندات' : 'Document Processor'}
            </h3>
            <p className="text-[10px] text-[#8EA3B5]">
              {isArabic ? 'استخراج البيانات فوراً' : 'Instant data extraction'}
            </p>
          </div>
        </div>
        {extractedData && (
          <button
            onClick={resetDemo}
            className="p-2 rounded-lg hover:bg-[#F8F9FA] text-[#8EA3B5] hover:text-[#2D4769] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Upload Area / Preview */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          className={`relative border-2 border-dashed rounded-xl p-4 transition-all min-h-[200px] flex items-center justify-center ${
            isDragging
              ? 'border-[#10B981] bg-[#10B981]/5'
              : file
              ? 'border-[#10B981] bg-[#10B981]/5'
              : 'border-[#C5D2E0] hover:border-[#10B981]/50'
          }`}
        >
          {preview ? (
            <div className="relative w-full">
              <img
                src={preview}
                alt="Invoice preview"
                className="w-full h-40 object-contain rounded-lg"
              />
              <div className="absolute top-2 right-2 px-2 py-1 bg-[#10B981] text-white text-[10px] font-bold rounded">
                {file?.name}
              </div>
            </div>
          ) : file ? (
            <div className="text-center">
              <FileText className="w-12 h-12 text-[#10B981] mx-auto mb-2" />
              <div className="text-sm font-bold text-[#2D4769]">{file.name}</div>
              <div className="text-xs text-[#8EA3B5]">
                {(file.size / 1024).toFixed(1)} KB
              </div>
            </div>
          ) : (
            <label className="cursor-pointer text-center">
              <Upload className="w-8 h-8 text-[#8EA3B5] mx-auto mb-3" />
              <div className="text-sm font-bold text-[#557089] mb-1">
                {isArabic ? 'أسقط الفاتورة هنا أو انقر' : 'Drop invoice here or click'}
              </div>
              <div className="text-[10px] text-[#8EA3B5]">
                {isArabic ? 'JPG, PNG, PDF (الحد الأقصى 10MB)' : 'JPG, PNG, PDF (max 10MB)'}
              </div>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          )}

          {isProcessing && (
            <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center rounded-xl">
              <Loader2 className="w-8 h-8 text-[#10B981] animate-spin mb-2" />
              <span className="text-sm font-bold text-[#2D4769]">
                {isArabic ? 'جاري المعالجة...' : 'Processing...'}
              </span>
              <span className="text-xs text-[#8EA3B5]">
                {isArabic ? 'استخراج البيانات من المستند' : 'Extracting data from document'}
              </span>
            </div>
          )}
        </div>

        {/* Results Area */}
        <div className="bg-[#F8F9FA] rounded-xl p-4 min-h-[200px]">
          <AnimatePresence mode="wait">
            {error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full"
              >
                <AlertCircle className="w-8 h-8 text-[#EF4444] mb-2" />
                <span className="text-sm text-[#EF4444]">{error}</span>
              </motion.div>
            ) : extractedData ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full"
              >
                {/* View Mode Toggle */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[10px]">
                    <CheckCircle className="w-3 h-3 text-[#10B981]" />
                    <span className="text-[#10B981] font-bold">
                      {extractedData.confidence}% {isArabic ? 'ثقة' : 'confidence'}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setViewMode('table')}
                      className={`p-1.5 rounded transition-all ${
                        viewMode === 'table'
                          ? 'bg-[#10B981] text-white'
                          : 'bg-white text-[#8EA3B5]'
                      }`}
                    >
                      <Table className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => setViewMode('json')}
                      className={`p-1.5 rounded transition-all ${
                        viewMode === 'json'
                          ? 'bg-[#10B981] text-white'
                          : 'bg-white text-[#8EA3B5]'
                      }`}
                    >
                      <FileJson className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {viewMode === 'table' ? (
                  <div className="space-y-2 text-xs overflow-auto max-h-[160px]">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded p-2">
                        <div className="text-[9px] text-[#8EA3B5] uppercase">
                          {isArabic ? 'المورد' : 'Vendor'}
                        </div>
                        <div className="font-bold text-[#2D4769] truncate">
                          {extractedData.vendor}
                        </div>
                      </div>
                      <div className="bg-white rounded p-2">
                        <div className="text-[9px] text-[#8EA3B5] uppercase">
                          {isArabic ? 'رقم الفاتورة' : 'Invoice #'}
                        </div>
                        <div className="font-bold text-[#2D4769]">
                          {extractedData.invoiceNumber}
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded p-2">
                      <div className="text-[9px] text-[#8EA3B5] uppercase mb-1">
                        {isArabic ? 'البنود' : 'Line Items'}
                      </div>
                      {extractedData.lineItems.map((item, i) => (
                        <div key={i} className="flex justify-between text-[10px] py-1 border-b border-[#F0F2F5] last:border-0">
                          <span className="text-[#557089] truncate flex-1">{item.description}</span>
                          <span className="font-bold text-[#2D4769] ml-2">
                            {formatCurrency(item.amount, extractedData.currency)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#10B981]/10 rounded p-2 flex justify-between">
                      <span className="font-bold text-[#10B981]">{isArabic ? 'الإجمالي' : 'Total'}</span>
                      <span className="font-black text-[#10B981]">
                        {formatCurrency(extractedData.total, extractedData.currency)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <pre className="text-[9px] bg-[#1E1E1E] text-[#D4D4D4] p-3 rounded-lg overflow-auto max-h-[160px] font-mono">
                    {JSON.stringify(extractedData, null, 2)}
                  </pre>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full"
              >
                <Sparkles className="w-8 h-8 text-[#C5D2E0] mb-2" />
                <span className="text-sm text-[#8EA3B5]">
                  {isArabic ? 'ارفع مستند للمعالجة' : 'Upload a document to process'}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CTA */}
      {extractedData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-gradient-to-r from-[#10B981]/10 to-[#10B981]/5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3"
        >
          <div>
            <div className="text-sm font-bold text-[#2D4769]">
              {isArabic
                ? 'تخيل هذا لـ 1000 فاتورة شهرياً'
                : 'Imagine this for 1,000 invoices/month'}
            </div>
            <div className="text-xs text-[#8EA3B5]">
              {isArabic
                ? 'وفر ساعات من إدخال البيانات اليدوي'
                : 'Save hours of manual data entry'}
            </div>
          </div>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-4 py-2 bg-[#10B981] text-white font-bold text-xs rounded-lg hover:bg-[#0D9668] transition-all flex items-center gap-2 whitespace-nowrap"
          >
            {isArabic ? 'أتمتة معالجة المستندات' : 'Automate Document Processing'}
            <ArrowRight className="w-3 h-3" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
