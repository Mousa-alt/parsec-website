import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  Cloud,
  Sparkles,
  Globe,
  ArrowRight,
  CheckCircle,
  Zap,
  Image,
  Upload,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { WHATSAPP } from '../constants';

// Simulated photo pipeline stages
const pipelineStages = [
  { id: 'upload', icon: Upload, label: 'Photographer uploads to Drive', color: '#3B82F6' },
  { id: 'detect', icon: Eye, label: 'AI detects new photos', color: '#8B5CF6' },
  { id: 'analyze', icon: Sparkles, label: 'Vision AI analyzes shots', color: '#F59E0B' },
  { id: 'select', icon: Image, label: 'Hero shot selected (logo/branding)', color: '#10B981' },
  { id: 'publish', icon: Globe, label: 'Auto-published to website', color: '#2D4769' },
];

// Sample project photos (placeholders - these would be real project images)
const samplePhotos = [
  { id: 1, type: 'hero', label: 'Hero Shot', hasLogo: true },
  { id: 2, type: 'detail', label: 'Detail Shot', hasLogo: false },
  { id: 3, type: 'progress', label: 'Progress Shot', hasLogo: false },
  { id: 4, type: 'hero', label: 'Hero Shot', hasLogo: true },
];

export const SignatureProject: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Animate through pipeline stages
  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % pipelineStages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleContactClick = () => {
    const msg = encodeURIComponent(
      "Hi! I saw the self-updating website project on your site. I'd love to learn how you can build something similar for my business."
    );
    window.open(`https://wa.me/${WHATSAPP.number}?text=${msg}`, '_blank');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D4769] via-[#1D2F45] to-[#0F1A2A]" />

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 p-6 md:p-10">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="px-3 py-1 bg-[#F59E0B] text-[#1D2F45] text-[10px] font-black uppercase tracking-wider rounded-full flex items-center gap-1">
            <Zap className="w-3 h-3" />
            Signature Project
          </div>
          <div className="px-3 py-1 bg-white/10 text-white/70 text-[10px] font-bold rounded-full">
            Live Automation
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
              The Website That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B]">
                Updates Itself
              </span>
            </h2>

            <p className="text-[#8EA3B5] text-sm md:text-base mb-6 leading-relaxed">
              We built a fit-out contractor's portfolio website that <strong className="text-white">automatically syncs</strong> with their photographers' shared drive.
              When new project photos are uploaded, our AI analyzes each shot, identifies the hero images (ones with branding or logos),
              and <strong className="text-white">publishes them to the website instantly</strong>. Zero manual work.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl font-black text-[#10B981]">0</div>
                <div className="text-[10px] text-[#8EA3B5] uppercase tracking-wider">Manual Updates</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl font-black text-[#8B5CF6]">24/7</div>
                <div className="text-[10px] text-[#8EA3B5] uppercase tracking-wider">Auto-Sync</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl font-black text-[#F59E0B]">AI</div>
                <div className="text-[10px] text-[#8EA3B5] uppercase tracking-wider">Hero Selection</div>
              </div>
            </div>

            {/* How It Works - Compact */}
            <div className="mb-6">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8EA3B5] mb-3">
                How It Works
              </div>
              <div className="space-y-2">
                {pipelineStages.map((stage, index) => {
                  const Icon = stage.icon;
                  const isActive = index === activeStage;
                  const isPast = index < activeStage;

                  return (
                    <motion.div
                      key={stage.id}
                      animate={{
                        backgroundColor: isActive ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        borderColor: isActive ? stage.color : 'rgba(255, 255, 255, 0.1)',
                      }}
                      className="flex items-center gap-3 p-2.5 rounded-lg border transition-all"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                        style={{
                          backgroundColor: isActive || isPast ? `${stage.color}20` : 'rgba(255,255,255,0.05)',
                          color: isActive || isPast ? stage.color : '#557089',
                        }}
                      >
                        {isPast ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <span
                        className={`text-xs font-medium transition-colors ${isActive ? 'text-white' : isPast ? 'text-[#8EA3B5]' : 'text-[#557089]'
                          }`}
                      >
                        {stage.label}
                      </span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto"
                        >
                          <RefreshCw className="w-3 h-3 text-[#8B5CF6] animate-spin" />
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleContactClick}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-bold rounded-xl shadow-lg shadow-[#8B5CF6]/20 hover:shadow-[#8B5CF6]/40 transition-all"
            >
              Build Something Like This
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Right: Visual Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Mock Website Preview */}
            <div className="bg-[#0F1A2A] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white/10 rounded-full px-3 py-1 text-[10px] text-[#8EA3B5] font-mono">
                    contractor-portfolio.com/projects
                  </div>
                </div>
                <RefreshCw className="w-4 h-4 text-[#8EA3B5]" />
              </div>

              {/* Website Content */}
              <div className="p-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8EA3B5] mb-3">
                  Latest Project Photos
                </div>

                {/* Photo Grid with Animation */}
                <div className="grid grid-cols-2 gap-2">
                  {samplePhotos.map((photo, index) => (
                    <motion.div
                      key={photo.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative aspect-video rounded-lg overflow-hidden ${photo.hasLogo ? 'ring-2 ring-[#10B981]' : ''
                        }`}
                    >
                      {/* Placeholder image with gradient */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: photo.hasLogo
                            ? 'linear-gradient(135deg, #2D4769 0%, #8B5CF6 100%)'
                            : 'linear-gradient(135deg, #1D2F45 0%, #2D4769 100%)',
                        }}
                      />

                      {/* Icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        {photo.hasLogo ? (
                          <div className="flex flex-col items-center">
                            <Sparkles className="w-6 h-6 text-[#F59E0B]" />
                            <span className="text-[8px] text-white/70 mt-1">Hero Shot</span>
                          </div>
                        ) : (
                          <Camera className="w-5 h-5 text-white/30" />
                        )}
                      </div>

                      {/* Hero badge */}
                      {photo.hasLogo && (
                        <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-[#10B981] rounded text-[7px] font-bold text-white">
                          AI Selected
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Sync indicator */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center gap-2 mt-4 p-2 bg-[#10B981]/10 rounded-lg border border-[#10B981]/20"
                >
                  <Cloud className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[10px] text-[#10B981] font-medium">
                    Synced with Google Drive • Last update: Just now
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-2 right-2 w-16 h-16 bg-[#8B5CF6]/20 rounded-full blur-xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-2 left-2 w-20 h-20 bg-[#F59E0B]/20 rounded-full blur-xl"
            />
          </motion.div>
        </div>

        {/* Bottom Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-6 border-t border-white/10"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-[#8EA3B5]">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#4285F4] rounded-full" />
              Google Drive API
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#8B5CF6] rounded-full" />
              Claude Vision AI
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#EA4B71] rounded-full" />
              n8n Automation
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-[#10B981] rounded-full" />
              Vercel Deployment
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
