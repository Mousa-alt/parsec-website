
import React, { useState } from 'react';
import { Mail, Send, MessageCircle } from 'lucide-react';
import { WHATSAPP } from '../constants.tsx';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Contractor Command Center');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    const parts = [
      `Hi, I'm ${name || 'a potential client'}`,
      email ? `(${email})` : '',
      `.\n\nI'm interested in: ${inquiryType}.`,
      message ? `\n\n${message}` : '',
    ].filter(Boolean).join(' ');

    const url = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(parts)}`;
    window.open(url, '_blank');
  };

  const handleWhatsAppDirect = () => {
    const url = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Callout */}
      <div className="bg-[#F0F2F5] border border-[#E1E6EB] rounded-xl md:rounded-2xl p-4 md:p-6 flex items-start gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm shrink-0">
          <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#2D4769]" />
        </div>
        <div>
          <p className="font-black text-[#2D4769] text-base md:text-lg">Start a conversation</p>
          <p className="text-xs md:text-sm text-[#557089]">Our engineering team typically responds within 24 hours.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        <div className="space-y-6">
          <div className="group">
            <label className="text-[10px] font-black uppercase text-[#8EA3B5] tracking-widest block mb-2">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-[#E1E6EB] rounded-xl px-4 py-3 outline-none focus:border-[#2D4769] transition-colors text-[#2D4769] placeholder:text-[#C5D2E0]"
              placeholder="Full name"
            />
          </div>
          <div className="group">
            <label className="text-[10px] font-black uppercase text-[#8EA3B5] tracking-widest block mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-[#E1E6EB] rounded-xl px-4 py-3 outline-none focus:border-[#2D4769] transition-colors text-[#2D4769] placeholder:text-[#C5D2E0]"
              placeholder="name@company.com"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="group">
            <label className="text-[10px] font-black uppercase text-[#8EA3B5] tracking-widest block mb-2">Inquiry Type</label>
            <select
              value={inquiryType}
              onChange={(e) => setInquiryType(e.target.value)}
              className="w-full bg-white border border-[#E1E6EB] rounded-xl px-4 py-3 outline-none focus:border-[#2D4769] transition-colors text-[#2D4769] appearance-none cursor-pointer"
            >
              <option>Contractor Command Center</option>
              <option>Voice Agent Deployment</option>
              <option>General Architecture</option>
            </select>
          </div>
          <div className="group">
            <label className="text-[10px] font-black uppercase text-[#8EA3B5] tracking-widest block mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white border border-[#E1E6EB] rounded-xl px-4 py-3 outline-none focus:border-[#2D4769] transition-colors text-[#2D4769] placeholder:text-[#C5D2E0] resize-none"
              placeholder="What are you engineering?"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="pt-8 flex flex-wrap gap-6 items-center">
        <button
          onClick={handleSubmit}
          className="bg-[#2D4769] hover:bg-[#1D2F45] text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#2D4769]/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-3"
        >
          <Send className="w-4 h-4" />
          Submit Proposal
        </button>

        <button
          onClick={handleWhatsAppDirect}
          className="text-[10px] text-[#8EA3B5] hover:text-[#2D4769] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Or message us directly on WhatsApp
        </button>
      </div>
    </div>
  );
};
