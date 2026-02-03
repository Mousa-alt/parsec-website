
import React from 'react';
import { CASE_STUDIES } from '../constants.tsx';
import { ArrowRight, TrendingUp } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  return (
    <div className="space-y-6">
      {CASE_STUDIES.map((study) => (
        <div key={study.client} className="tactile-card p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#F0F2F5] rounded-2xl flex items-center justify-center text-[#2D4769] font-black text-lg border border-[#E1E6EB]">
              {study.client.charAt(0)}
            </div>
            <div>
              <h3 className="font-black text-[#2D4769] text-lg">{study.client}</h3>
              <p className="text-[10px] text-[#8EA3B5] uppercase tracking-widest font-bold">{study.industry}</p>
            </div>
          </div>

          <div className="bg-[#F0F2F5] border border-[#E1E6EB] rounded-2xl p-6 mb-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <TrendingUp className="w-5 h-5 text-[#2D4769]" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#8EA3B5] mb-1">The Breakthrough</div>
              <div className="text-lg font-black text-[#2D4769]">{study.result}</div>
            </div>
          </div>

          <div className="text-[#557089] italic pl-4 border-l-2 border-[#C5D2E0]">
            "{study.outcome}"
          </div>
        </div>
      ))}

      <button className="flex items-center gap-2 text-[11px] text-[#8EA3B5] hover:text-[#2D4769] py-2 px-2 transition-colors font-black uppercase tracking-widest">
        <ArrowRight className="w-4 h-4" /> View full archives
      </button>
    </div>
  );
};
