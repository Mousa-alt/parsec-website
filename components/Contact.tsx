
import React from 'react';
import { Mail, Calendar, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Callout */}
      <div className="bg-[#F0F2F5] border border-[#E1E6EB] rounded-2xl p-6 flex items-start gap-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
          <Mail className="w-5 h-5 text-[#2D4769]" />
        </div>
        <div>
          <p className="font-black text-[#2D4769] text-lg">Start a conversation</p>
          <p className="text-sm text-[#557089]">Our engineering team typically responds within 24 hours.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        <div className="space-y-6">
          <div className="group">
            <label className="text-[10px] font-black uppercase text-[#8EA3B5] tracking-widest block mb-2">Your Name</label>
            <input
              type="text"
              className="w-full bg-white border border-[#E1E6EB] rounded-xl px-4 py-3 outline-none focus:border-[#2D4769] transition-colors text-[#2D4769] placeholder:text-[#C5D2E0]"
              placeholder="Full name"
            />
          </div>
          <div className="group">
            <label className="text-[10px] font-black uppercase text-[#8EA3B5] tracking-widest block mb-2">Email Address</label>
            <input
              type="email"
              className="w-full bg-white border border-[#E1E6EB] rounded-xl px-4 py-3 outline-none focus:border-[#2D4769] transition-colors text-[#2D4769] placeholder:text-[#C5D2E0]"
              placeholder="name@company.com"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="group">
            <label className="text-[10px] font-black uppercase text-[#8EA3B5] tracking-widest block mb-2">Inquiry Type</label>
            <select className="w-full bg-white border border-[#E1E6EB] rounded-xl px-4 py-3 outline-none focus:border-[#2D4769] transition-colors text-[#2D4769] appearance-none cursor-pointer">
              <option>Sigma HQ Implementation</option>
              <option>Voice Agent Deployment</option>
              <option>General Architecture</option>
            </select>
          </div>
          <div className="group">
            <label className="text-[10px] font-black uppercase text-[#8EA3B5] tracking-widest block mb-2">Message</label>
            <textarea
              className="w-full bg-white border border-[#E1E6EB] rounded-xl px-4 py-3 outline-none focus:border-[#2D4769] transition-colors text-[#2D4769] placeholder:text-[#C5D2E0] resize-none"
              placeholder="What are you engineering?"
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="pt-8 flex flex-wrap gap-6 items-center">
        <button className="bg-[#2D4769] hover:bg-[#1D2F45] text-white px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#2D4769]/20 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center gap-3">
          <Send className="w-4 h-4" />
          Submit Proposal
        </button>

        <div className="text-[10px] text-[#8EA3B5] font-bold uppercase tracking-widest flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Or schedule directly via Calendly
        </div>
      </div>
    </div>
  );
};
