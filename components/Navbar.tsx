
import React, { useState, useEffect } from 'react';
import { ChevronRight, MessageSquare, MoreHorizontal, Lock, Unlock, Clock } from 'lucide-react';
import { BRANDING } from '../constants.tsx';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

          <button className="bg-[#2D4769] text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#2D4769]/20 hover:bg-[#1D2F45] transition-all">
            Share
          </button>

          <div className="w-px h-4 bg-[#E1E6EB] mx-1" />

          <button className="hover:bg-[#F0F2F5] p-1.5 rounded-lg transition-colors">
            <MessageSquare className="w-4 h-4 text-[#8EA3B5]" />
          </button>
          <button className="hover:bg-[#F0F2F5] p-1.5 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4 text-[#8EA3B5]" />
          </button>
        </div>
      </div>
    </nav>
  );
};
