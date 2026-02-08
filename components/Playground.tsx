import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, Star, CheckCircle, AlertCircle, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

interface AnalysisResult {
  score: number;
  category: string;
  strengths: string[];
  improvements: string[];
  heroWorthy: boolean;
  caption: string;
}

export const Playground: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB');
      return;
    }
    setFileName(file.name);
    setError(null);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setImage(base64);
      analyzeImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (base64: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });
      if (!response.ok) throw new Error('Analysis failed');
      const data = await response.json();
      setResult(data);
    } catch {
      setError('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetPlayground = () => {
    setImage(null);
    setFileName('');
    setResult(null);
    setError(null);
  };

  const renderStars = (score: number) => {
    const fullStars = Math.floor(score / 2);
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < fullStars ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-[#E1E6EB]'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border-2 border-[#E1E6EB] rounded-2xl p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="text-sm md:text-base font-black text-[#2D4769]">Media Analyst</h3>
          <p className="text-[10px] text-[#8EA3B5]">Upload an image for instant scoring</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Upload area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          className={`relative border-2 border-dashed rounded-xl p-4 transition-all ${
            isDragging ? 'border-[#8B5CF6] bg-[#8B5CF6]/5' :
            image ? 'border-[#10B981] bg-[#10B981]/5' : 'border-[#C5D2E0]'
          }`}
        >
          {image ? (
            <div className="relative">
              <img src={image} alt="Uploaded" className="w-full h-32 object-cover rounded-lg" />
              <button
                onClick={resetPlayground}
                className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow text-[#557089] text-sm"
              >
                &times;
              </button>
              <div className="mt-2 text-[10px] text-[#8EA3B5] truncate">{fileName}</div>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center justify-center h-32">
              <Upload className="w-6 h-6 text-[#8EA3B5] mb-2" />
              <span className="text-xs font-bold text-[#557089]">Drop image or click</span>
              <span className="text-[9px] text-[#8EA3B5]">JPG, PNG, WebP (max 5MB)</span>
              <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            </label>
          )}
        </div>

        {/* Results area */}
        <div className="bg-[#F8F9FA] rounded-xl p-4 min-h-[140px]">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div key="loading" className="flex flex-col items-center justify-center h-full">
                <Loader2 className="w-6 h-6 text-[#8B5CF6] animate-spin mb-2" />
                <span className="text-xs text-[#557089]">Analyzing...</span>
              </motion.div>
            ) : error ? (
              <motion.div key="error" className="flex flex-col items-center justify-center h-full">
                <AlertCircle className="w-6 h-6 text-[#EF4444] mb-2" />
                <span className="text-xs text-[#EF4444]">{error}</span>
              </motion.div>
            ) : result ? (
              <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#557089]">Score</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-[#2D4769]">{result.score}/10</span>
                    {renderStars(result.score)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#557089]">Category</span>
                  <span className="px-2 py-0.5 bg-[#8B5CF6]/10 text-[#8B5CF6] text-[10px] font-bold rounded">{result.category}</span>
                </div>
                {result.heroWorthy && (
                  <div className="flex items-center gap-1 text-[10px] text-[#10B981] font-bold">
                    <Star className="w-3 h-3 fill-[#10B981]" /> Hero Shot Worthy
                  </div>
                )}
                <div className="pt-1 border-t border-[#E1E6EB]">
                  <span className="text-[9px] text-[#8EA3B5] block mb-1">Suggested Caption</span>
                  <p className="text-[10px] text-[#557089] italic">"{result.caption}"</p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" className="flex flex-col items-center justify-center h-full">
                <Image className="w-6 h-6 text-[#C5D2E0] mb-2" />
                <span className="text-xs text-[#8EA3B5]">Upload to analyze</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#7C3AED] transition-all"
        >
          Automate Media
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
