
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, SIGMA_SCREENSHOTS } from '../constants.tsx';
import { Product } from '../types';
import { Logo } from './Logo';
import { ArrowRight, Play, Cpu, Sparkles } from 'lucide-react';

// Sigma HQ - Featured product with screenshot thumbnails
const SigmaHQShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sigmaProduct = PRODUCTS.find(p => p.id === 'sigma-hq');

  return (
    <div className="tactile-card overflow-hidden group">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Logo size="xs" showIcon />
          <h3 className="text-lg font-black text-[#2D4769] tracking-tight">{sigmaProduct?.title || 'Sigma HQ'}</h3>
          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase rounded border border-emerald-100">
            Live
          </span>
        </div>

        <p className="text-[#557089] text-sm font-medium leading-relaxed mb-6 max-w-xl">
          {sigmaProduct?.description}
        </p>

        {/* Screenshot Gallery - Horizontal thumbnails */}
        <div className="flex gap-3 mb-6">
          {SIGMA_SCREENSHOTS.map((shot, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative flex-1 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                i === activeIdx
                  ? 'border-[#2D4769] shadow-lg'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={shot.src}
                alt={shot.label}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                <span className="text-[9px] font-bold text-white uppercase tracking-wide">
                  {shot.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Main Preview */}
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#1a2332] border border-[#E1E6EB]">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={SIGMA_SCREENSHOTS[activeIdx].src}
              alt={SIGMA_SCREENSHOTS[activeIdx].label}
              className="w-full h-full object-cover object-top"
            />
          </AnimatePresence>
        </div>

        {/* Tags & CTA */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-[#F0F2F5]">
          <div className="flex flex-wrap gap-2">
            {['SaaS', 'Construction', 'AI-Powered'].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-lg bg-[#F0F2F5] text-[#2D4769] text-[9px] font-black uppercase tracking-wider border border-[#E1E6EB]">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm font-black text-[#2D4769] uppercase tracking-wider cursor-pointer group-hover:translate-x-1 transition-transform">
            Explore <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Card for Voice Agents and Personal AI
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="tactile-card group cursor-pointer h-full flex flex-col overflow-hidden">
      {/* Image */}
      <div className="aspect-video bg-[#F0F2F5] border-b border-[#E1E6EB] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <Logo size="xs" showIcon />
          <h3 className="text-lg font-black text-[#2D4769] tracking-tight">
            {product.title}
          </h3>
        </div>

        <p className="text-[#557089] text-sm font-medium leading-relaxed mb-4 flex-grow">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 rounded-md bg-[#F0F2F5] text-[#2D4769] text-[9px] font-black uppercase tracking-wider border border-[#E1E6EB]">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#F0F2F5]">
          <span className="flex items-center gap-2 text-xs font-black text-[#2D4769] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
            Learn More <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <Cpu className="w-4 h-4 text-[#C5D2E0]" />
        </div>
      </div>
    </div>
  );
};

export const ProductsGrid: React.FC = () => {
  // Filter out Sigma HQ since we're showing it separately
  const otherProducts = PRODUCTS.filter(p => p.id !== 'sigma-hq');

  return (
    <div className="space-y-10">
      {/* Sigma HQ - Featured with screenshots */}
      <SigmaHQShowcase />

      {/* Other Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {otherProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {/* Request Architecture Card - DASHED BORDER, LARGER ICON */}
        <div className="tactile-card bg-[#F8F9FA] border-[3px] border-dashed border-[#C5D2E0] flex flex-col items-center justify-center p-12 text-center group hover:border-[#2D4769] transition-colors duration-500">
          <div className="w-28 h-28 rounded-[2.5rem] border-[3px] border-dashed border-[#8EA3B5] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-[#2D4769] transition-all duration-500 bg-white shadow-lg">
            <Logo size="lg" showIcon />
          </div>
          <div className="text-2xl font-black text-[#2D4769] tracking-tight mb-3">Request Architecture</div>
          <p className="text-sm text-[#8EA3B5] max-w-[260px] font-bold leading-relaxed mb-8">
            Modular engineering for proprietary constraints and custom requirements.
          </p>
          <button className="text-sm font-black uppercase tracking-[0.2em] text-white bg-[#2D4769] hover:bg-[#1D2F45] px-8 py-3 rounded-xl shadow-lg shadow-[#2D4769]/20 transition-all hover:-translate-y-0.5 active:scale-95">
            Contact Studio
          </button>
        </div>
      </div>
    </div>
  );
};
