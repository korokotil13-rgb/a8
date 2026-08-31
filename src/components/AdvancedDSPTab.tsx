import React from 'react';
import { Cpu, Sliders, Zap, ShieldAlert, Radio } from 'lucide-react';

interface AdvancedDSPTabProps {
  compressorThreshold: number;
  onCompressorChange: (val: number) => void;
  crystalizer: number;
  onCrystalizerChange: (val: number) => void;
  bassDamping: number;
  onBassDampingChange: (val: number) => void;
}

import React from 'react';
import { Cpu, Sliders, Zap, ShieldAlert, Radio } from 'lucide-react';

interface AdvancedDSPTabProps {
  compressorThreshold: number;
  onCompressorChange: (val: number) => void;
  crystalizer: number;
  onCrystalizerChange: (val: number) => void;
  bassDamping: number;
  onBassDampingChange: (val: number) => void;
}

export const AdvancedDSPTab: React.FC<AdvancedDSPTabProps> = ({
  compressorThreshold,
  onCompressorChange,
  crystalizer,
  onCrystalizerChange,
  bassDamping,
  onBassDampingChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#222]">
          <div>
            <h2 className="text-sm font-bold text-[#e0e0e0] flex items-center space-x-2 space-x-reverse uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-[#f27d26]" />
              <span>پردازشگر سیگنال صوتی پیشرفته (Advanced DSP & Limiter)</span>
            </h2>
            <p className="text-xs text-[#888]">کنترل پویایی صدا، شفاف‌سازی فرکانس‌ها و مهار نویز محیطی برای حداکثر تمرکز در رینبو سیکس</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Compressor */}
          <div className="bg-[#111] p-5 rounded-xl border border-[#222] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#e0e0e0] flex items-center space-x-1.5 space-x-reverse">
                <Sliders className="w-3.5 h-3.5 text-[#f27d26]" />
                <span>کمپرسور داینامیک (Threshold)</span>
              </span>
              <span className="text-xs font-mono font-bold text-[#f27d26]">{compressorThreshold} dB</span>
            </div>
            <input
              type="range"
              min="-30"
              max="-5"
              value={compressorThreshold}
              onChange={(e) => onCompressorChange(parseInt(e.target.value))}
              className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#f27d26]"
            />
            <p className="text-[11px] text-[#888] leading-relaxed">
              مهار انفجارهای ناگهانی و بالا آوردن سطح صدای صداهای ضعیف مثل راه رفتن و لغزش تجهیزات.
            </p>
          </div>

          {/* Crystalizer */}
          <div className="bg-[#111] p-5 rounded-xl border border-[#222] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#e0e0e0] flex items-center space-x-1.5 space-x-reverse">
                <Zap className="w-3.5 h-3.5 text-[#f27d26]" />
                <span>کریستالایزر صوتی (Clarity Boost)</span>
              </span>
              <span className="text-xs font-mono font-bold text-[#f27d26]">{crystalizer}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={crystalizer}
              onChange={(e) => onCrystalizerChange(parseInt(e.target.value))}
              className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#f27d26]"
            />
            <p className="text-[11px] text-[#888] leading-relaxed">
              بازگردانی جزئیات از دست رفته و شفاف‌سازی صدای خش‌خش لباس، کشیدن خشاب و پین نارنجک.
            </p>
          </div>

          {/* Bass Damping */}
          <div className="bg-[#111] p-5 rounded-xl border border-[#222] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#e0e0e0] flex items-center space-x-1.5 space-x-reverse">
                <ShieldAlert className="w-3.5 h-3.5 text-[#f27d26]" />
                <span>کاهش فرکانس‌های مزاحم (Bass Damping)</span>
              </span>
              <span className="text-xs font-mono font-bold text-[#f27d26]">{bassDamping}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={bassDamping}
              onChange={(e) => onBassDampingChange(parseInt(e.target.value))}
              className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#f27d26]"
            />
            <p className="text-[11px] text-[#888] leading-relaxed">
              حذف همهمه‌ها و بیس‌های سنگین محیطی که مانع تشخیص دقیق جهت تیراندازی می‌شوند.
            </p>
          </div>
        </div>
      </div>

      {/* Mic Noise Gate & Sidetone section */}
      <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 rounded-xl bg-[#151515] border border-[#222] flex items-center justify-center text-[#f27d26]">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#e0e0e0] uppercase tracking-wider">حذف نویز میکروفون و سایدتون (Mic Noise Gate & Sidetone)</h3>
            <p className="text-xs text-[#888]">ارسال صدای شفاف به هم‌تیمی‌ها در Discord و درون بازی بدون صدای فن و کیبورد</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <span className="text-xs text-[#00ff41] bg-[#1a1a1a] border border-[#222] px-3 py-1.5 rounded font-mono uppercase tracking-widest">
            AI Noise Suppression Active
          </span>
          <button className="px-4 py-2 bg-[#151515] hover:bg-[#222] border border-[#222] text-[#e0e0e0] rounded-lg text-xs font-medium transition-colors">
            تنظیمات میکروفون
          </button>
        </div>
      </div>
    </div>
  );
};

