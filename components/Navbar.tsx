
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, MessageSquare, MoreHorizontal, Lock, Unlock, Clock, ExternalLink, MessageCircle, Link2, Check } from 'lucide-react';
import { BRANDING, WHATSAPP } from '../constants.tsx';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [copied, setCopied] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMore(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'ParSec - Precision Automation',
      text: BRANDING.tagline,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled or share failed, fall back to copy
        copyLink();
      }
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMessage = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.defaultMessage)}`, '_blank');
  };

  const handlePortfolio = () => {
    window.open(`https://${WHATSAPP.portfolioUrl.replace('https://', '')}`, '_blank');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#E1E6EB] transition-all duration-300 ${scrolled ? 'h-12' : 'h-14'}`}>
      <div className="px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-1 overflow-hidden">
          {/* Vault breadcrumb with icon */}
          <div className="flex items-center hover:bg-[#F0F2F5] px-2 py-1 rounded-lg transition-colors cursor-pointer shrink-0">
            <Logo size="xs" showIcon />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#2D4769] ml-2">Vault</span>
          </div>

          <ChevronRight className="w-3 h-3 text-[#C5D2E0]" />

          {/* Main logo */}
          <div className="flex items-center gap-1 hover:bg-[#F0F2F5] px-2 py-1 rounded-lg cursor-pointer transition-colors">
            <Logo size="xs" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 text-[10px] text-[#8EA3B5] font-bold border-r border-[#E1E6EB] mr-1 uppercase tracking-tighter">
            <Clock className="w-3 h-3" /> Last Synced: {BRANDING.lastEdited}
          </div>

          <button
            onClick={() => setIsLocked(!isLocked)}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#F0F2F5] px-2 py-1 rounded-lg transition-all active:scale-95"
          >
            {isLocked ? <Lock className="w-3 h-3 text-[#2D4769]" /> : <Unlock className="w-3 h-3 text-sky-500 animate-pulse" />}
            <span className="hidden md:inline">{isLocked ? 'READ_ONLY' : 'LIVE_EDIT'}</span>
          </button>

          <button
            onClick={handleShare}
            className="bg-[#2D4769] text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#2D4769]/20 hover:bg-[#1D2F45] transition-all flex items-center gap-1.5"
          >
            {copied ? <><Check className="w-3 h-3" /><span className="hidden sm:inline">Copied!</span></> : 'Share'}
          </button>

          <div className="w-px h-4 bg-[#E1E6EB] mx-1" />

          <button
            onClick={handleMessage}
            className="hover:bg-[#F0F2F5] p-1.5 rounded-lg transition-colors"
            title="Send a message"
          >
            <MessageSquare className="w-4 h-4 text-[#8EA3B5]" />
          </button>

          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setShowMore(!showMore)}
              className="hover:bg-[#F0F2F5] p-1.5 rounded-lg transition-colors"
            >
              <MoreHorizontal className="w-4 h-4 text-[#8EA3B5]" />
            </button>

            {showMore && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-[#E1E6EB] rounded-xl shadow-2xl shadow-black/10 py-2 min-w-[200px] z-50">
                <button
                  onClick={() => { handlePortfolio(); setShowMore(false); }}
                  className="w-full px-4 py-2.5 text-left text-xs font-bold text-[#2D4769] hover:bg-[#F0F2F5] transition-colors flex items-center gap-3"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#8EA3B5]" />
                  Visit Portfolio
                </button>
                <button
                  onClick={() => { handleWhatsApp(); setShowMore(false); }}
                  className="w-full px-4 py-2.5 text-left text-xs font-bold text-[#2D4769] hover:bg-[#F0F2F5] transition-colors flex items-center gap-3"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#8EA3B5]" />
                  WhatsApp
                </button>
                <button
                  onClick={() => { copyLink(); setShowMore(false); }}
                  className="w-full px-4 py-2.5 text-left text-xs font-bold text-[#2D4769] hover:bg-[#F0F2F5] transition-colors flex items-center gap-3"
                >
                  <Link2 className="w-3.5 h-3.5 text-[#8EA3B5]" />
                  Copy Link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
