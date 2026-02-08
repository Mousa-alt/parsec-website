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
    if (file) {
      processFile(file);
    }
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

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

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

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderStars = (score: number) => {
    const fullStars = Math.floor(score / 2);
    const hasHalf = score % 2 >= 1;
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? 'text-[#F59E0B] fill-[#F59E0B]'
                : i === fullStars && hasHalf
                ? 'text-[#F59E0B] fill-[#F59E0B]/50'
                : 'text-[#E1E6EB]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="tactile-card p-6 md:p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B5CF6]/10 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
          <span className="text-xs font-black uppercase tracking-widest text-[#8B5CF6]">
            Try Our AI
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-black text-[#2D4769] mb-2">
          Media Analyst Playground
        </h3>
        <p className="text-sm text-[#8EA3B5] max-w-md mx-auto">
          Upload any image and see how our AI scores it for marketing potential
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* Upload area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          className={`relative border-3 border-dashed rounded-2xl p-8 transition-all ${
            isDragging
              ? 'border-[#8B5CF6] bg-[#8B5CF6]/5'
              : image
              ? 'border-[#10B981] bg-[#10B981]/5'
              : 'border-[#C5D2E0] hover:border-[#8B5CF6]'
          }`}
        >
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-48 object-cover rounded-xl"
              />
              <button
                onClick={resetPlayground}
                className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#F0F2F5] transition-colors"
              >
                <span className="text-[#557089] text-lg">&times;</span>
              </button>
              <div className="mt-3 text-center">
                <span className="text-xs text-[#8EA3B5] truncate block">{fileName}</span>
              </div>
            </div>
          ) : (
            <label className="cursor-pointer flex flex-col items-center justify-center h-48">
              <div className="w-16 h-16 rounded-2xl bg-[#F0F2F5] flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-[#8EA3B5]" />
              </div>
              <span className="text-sm font-bold text-[#557089] mb-1">
                Drop image here or click to upload
              </span>
              <span className="text-[10px] text-[#8EA3B5]">
                JPG, PNG, WebP (max 5MB)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Results area */}
        <div className="bg-[#F8F9FA] rounded-2xl p-6 min-h-[250px] flex flex-col">
          <div className="text-xs font-black uppercase tracking-widest text-[#8EA3B5] mb-4">
            Analysis Results
          </div>

          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center"
              >
                <Loader2 className="w-10 h-10 text-[#8B5CF6] animate-spin mb-4" />
                <span className="text-sm font-bold text-[#557089]">Analyzing image...</span>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <AlertCircle className="w-10 h-10 text-[#EF4444] mb-4" />
                <span className="text-sm font-bold text-[#EF4444]">{error}</span>
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex-1 space-y-4"
              >
                {/* Score */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#557089]">Marketing Score</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-[#2D4769]">{result.score}/10</span>
                    {renderStars(result.score)}
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#557089]">Category</span>
                  <span className="px-3 py-1 bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs font-bold rounded-full">
                    {result.category}
                  </span>
                </div>

                {/* Hero worthy badge */}
                {result.heroWorthy && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#10B981]/10 rounded-lg">
                    <Star className="w-4 h-4 text-[#10B981] fill-[#10B981]" />
                    <span className="text-xs font-bold text-[#10B981]">Hero Shot Worthy!</span>
                  </div>
                )}

                {/* Strengths */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8EA3B5] mb-2 block">
                    Strengths
                  </span>
                  <div className="space-y-1">
                    {result.strengths.slice(0, 2).map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#10B981]">
                        <CheckCircle className="w-3 h-3" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Improvements */}
                {result.improvements.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8EA3B5] mb-2 block">
                      Could Improve
                    </span>
                    <div className="space-y-1">
                      {result.improvements.slice(0, 2).map((s, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#F59E0B]">
                          <AlertCircle className="w-3 h-3" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Caption */}
                <div className="pt-2 border-t border-[#E1E6EB]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8EA3B5] mb-1 block">
                    Suggested Caption
                  </span>
                  <p className="text-xs text-[#557089] italic">"{result.caption}"</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <Image className="w-10 h-10 text-[#C5D2E0] mb-4" />
                <span className="text-sm text-[#8EA3B5]">
                  Upload an image to see the analysis
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="mt-8 text-center">
        <p className="text-sm text-[#8EA3B5] mb-4">
          This is what our agents do for thousands of photos daily
        </p>
        <button
          onClick={scrollToContact}
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#8B5CF6] text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-[#7C3AED] transition-all shadow-lg shadow-[#8B5CF6]/20 hover:-translate-y-0.5"
        >
          Automate Your Media Workflow
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
