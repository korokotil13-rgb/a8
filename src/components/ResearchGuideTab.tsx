import React from 'react';
import { R6_RESEARCH_INFO } from '../data/r6AudioPresets';
import { BookOpen, Shield, Zap, Sparkles } from 'lucide-react';

export const ResearchGuideTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-6 shadow-xl space-y-6">
        <div className="flex items-center space-x-3 space-x-reverse pb-4 border-b border-[#222]">
          <div className="w-10 h-10 rounded-xl bg-[#151515] border border-[#222] flex items-center justify-center text-[#f27d26]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#e0e0e0] uppercase tracking-wider">{R6_RESEARCH_INFO.title}</h2>
            <p className="text-xs text-[#888] mt-1 leading-relaxed">{R6_RESEARCH_INFO.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {R6_RESEARCH_INFO.points.map((point, index) => (
            <div key={index} className="bg-[#111] p-4 rounded-xl border border-[#222] space-y-2">
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className="w-6 h-6 rounded-lg bg-[#f27d26]/10 text-[#f27d26] border border-[#f27d26]/30 flex items-center justify-center text-xs font-mono font-bold">
                  0{index + 1}
                </span>
                <h3 className="text-xs font-bold text-[#e0e0e0] uppercase tracking-wide">{point.title}</h3>
              </div>
              <p className="text-xs text-[#888] leading-relaxed pr-8">{point.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#151515] p-4 rounded-xl border border-[#222] flex items-center space-x-3 space-x-reverse">
          <Sparkles className="w-6 h-6 text-[#f27d26] shrink-0" />
          <p className="text-xs text-[#ccc] leading-relaxed">
            این برنامه با شبیه‌سازی دقیق فیزیک انتشار صوتی در رینبو سیکس و تطبیق آن با هدفون‌های گیمینگ حرفه‌ای (به‌ویژه سری پلی‌استیشن ۵)، به شما برتری تاکتیکی بی‌نظیری در شناسایی موقعیت دشمن قبل از دیدن آن‌ها می‌دهد.
          </p>
        </div>
      </div>
    </div>
  );
};

