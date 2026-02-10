
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CASE_STUDIES } from '../constants.tsx';
import { ArrowRight, ArrowDown, AlertTriangle, Sparkles, Rocket, Check, ChevronDown, ChevronUp, Download, Play } from 'lucide-react';

export const CaseStudies: React.FC = () => {
  const [expandedStudy, setExpandedStudy] = useState<string | null>(null);

  const toggleStudy = (client: string) => {
    setExpandedStudy(expandedStudy === client ? null : client);
  };

  return (
    <div className="space-y-6">
      {CASE_STUDIES.map((study, index) => (
        <motion.div
          key={study.client}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="tactile-card overflow-hidden"
        >
          {/* Header - Always visible */}
          <button
            onClick={() => toggleStudy(study.client)}
            className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-[#F8F9FA] transition-colors"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#2D4769] to-[#557089] rounded-xl md:rounded-2xl flex items-center justify-center text-white font-black text-base md:text-lg shadow-lg">
                {study.client.charAt(0)}
              </div>
              <div className="text-left">
                <h3 className="font-black text-[#2D4769] text-base md:text-lg">{study.client}</h3>
                <p className="text-[9px] md:text-[10px] text-[#8EA3B5] uppercase tracking-wider md:tracking-widest font-bold">{study.industry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden md:block text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full">
                {study.result}
              </span>
              {expandedStudy === study.client ? (
                <ChevronUp className="w-5 h-5 text-[#8EA3B5]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#8EA3B5]" />
              )}
            </div>
          </button>

          {/* Narrative Arc - Expandable */}
          <AnimatePresence>
            {expandedStudy === study.client && study.narrative && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 md:px-6 pb-6 space-y-4">
                  {/* Mobile result badge */}
                  <div className="md:hidden">
                    <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-3 py-1 rounded-full">
                      {study.result}
                    </span>
                  </div>

                  {/* The Nightmare */}
                  <div className="bg-gradient-to-r from-[#F59E0B]/5 to-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl p-4 md:p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#F59E0B]/70 mb-1">The Nightmare</div>
                        <div className="text-sm font-bold text-[#2D4769] mb-2">{study.narrative.nightmare.title}</div>
                        <p className="text-sm text-[#557089] leading-relaxed">{study.narrative.nightmare.story}</p>
                        <div className="mt-3 inline-block bg-[#F59E0B]/10 text-[#F59E0B] text-[10px] font-bold px-2 py-1 rounded">
                          {study.narrative.nightmare.painMetric}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowDown className="w-5 h-5 text-[#C5D2E0]" />
                  </div>

                  {/* The Magic Moment */}
                  <div className="bg-gradient-to-r from-[#8B5CF6]/5 to-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded-xl p-4 md:p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center shrink-0">
                        <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#8B5CF6]/70 mb-1">The Magic Moment</div>
                        <div className="text-sm font-bold text-[#2D4769] mb-2">{study.narrative.magicMoment.title}</div>
                        <p className="text-sm text-[#557089] leading-relaxed italic">"{study.narrative.magicMoment.story}"</p>
                        <div className="mt-3 inline-block bg-[#8B5CF6]/10 text-[#8B5CF6] text-[10px] font-bold px-2 py-1 rounded">
                          Powered by {study.narrative.magicMoment.agentUsed}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowDown className="w-5 h-5 text-[#C5D2E0]" />
                  </div>

                  {/* The New Reality */}
                  <div className="bg-gradient-to-r from-[#10B981]/5 to-[#10B981]/10 border border-[#10B981]/20 rounded-xl p-4 md:p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center shrink-0">
                        <Rocket className="w-4 h-4 text-[#10B981]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#10B981]/70 mb-1">The New Reality</div>
                        <div className="text-sm font-bold text-[#2D4769] mb-2">{study.narrative.newReality.title}</div>
                        <p className="text-sm text-[#557089] leading-relaxed mb-3">{study.narrative.newReality.story}</p>
                        <div className="flex flex-wrap gap-2">
                          {study.narrative.newReality.resultMetrics.map((metric, idx) => (
                            <div key={idx} className="flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] text-[10px] font-bold px-2 py-1 rounded">
                              <Check className="w-3 h-3" />
                              {metric}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button className="flex items-center gap-2 text-[10px] text-[#8EA3B5] hover:text-[#2D4769] py-2 px-3 border border-[#E1E6EB] rounded-lg transition-colors font-bold uppercase tracking-wider hover:border-[#2D4769]">
                      <Download className="w-3 h-3" /> Workflow Blueprint
                    </button>
                    <button className="flex items-center gap-2 text-[10px] text-[#8EA3B5] hover:text-[#2D4769] py-2 px-3 border border-[#E1E6EB] rounded-lg transition-colors font-bold uppercase tracking-wider hover:border-[#2D4769]">
                      <Play className="w-3 h-3" /> Watch Testimonial
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <button
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="flex items-center gap-2 text-[11px] text-[#8EA3B5] hover:text-[#2D4769] py-2 px-2 transition-colors font-black uppercase tracking-widest"
      >
        <ArrowRight className="w-4 h-4" /> Start your transformation
      </button>
    </div>
  );
};
