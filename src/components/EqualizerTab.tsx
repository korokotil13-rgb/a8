import React from 'react';
import { AudioPreset, EqualizerBand } from '../types';
import { FREQUENCY_BANDS, R6_PRESETS } from '../data/r6AudioPresets';
import { Sliders, RotateCcw, Footprints, Layers, Target, Shield, Headphones, Zap, Check } from 'lucide-react';

interface EqualizerTabProps {
  currentGains: number[];
  onGainChange: (index: number, value: number) => void;
  selectedPresetId: string;
  onSelectPreset: (preset: AudioPreset) => void;
  onResetGains: () => void;
  masterGain: number;
  onMasterGainChange: (val: number) => void;
}

import React from 'react';
import { AudioPreset, EqualizerBand } from '../types';
import { FREQUENCY_BANDS, R6_PRESETS } from '../data/r6AudioPresets';
import { Sliders, RotateCcw, Footprints, Layers, Target, Shield, Headphones, Zap, Check } from 'lucide-react';

interface EqualizerTabProps {
  currentGains: number[];
  onGainChange: (index: number, value: number) => void;
  selectedPresetId: string;
  onSelectPreset: (preset: AudioPreset) => void;
  onResetGains: () => void;
  masterGain: number;
  onMasterGainChange: (val: number) => void;
}

export const EqualizerTab: React.FC<EqualizerTabProps> = ({
  currentGains,
  onGainChange,
  selectedPresetId,
  onSelectPreset,
  onResetGains,
  masterGain,
  onMasterGainChange,
}) => {
  const getPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints':
        return Footprints;
      case 'Layers':
        return Layers;
      case 'Target':
        return Target;
      case 'Shield':
        return Shield;
      case 'Headphones':
        return Headphones;
      default:
        return Zap;
    }
  };

  return (
    <div className="space-y-6">
      {/* Presets Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-[#e0e0e0] flex items-center space-x-2 space-x-reverse uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-[#f27d26]" />
            <span>پروفایل‌های صوتی تخصصی Rainbow Six Siege</span>
          </h2>
          <span className="text-xs text-[#888]">کلیک برای اعمال فوری تنظیمات فرکانسی</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {R6_PRESETS.map((preset) => {
            const Icon = getPresetIcon(preset.icon);
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#f27d26] text-black border-[#f27d26] shadow-[0_0_20px_rgba(242,125,38,0.3)] font-bold'
                    : 'bg-[#0d0d0d] border-[#222] hover:border-[#333] hover:bg-[#111] text-[#e0e0e0]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2.5 space-x-reverse">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected
                            ? 'bg-black text-[#f27d26]'
                            : 'bg-[#1a1a1a] text-[#f27d26] border border-[#222]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`font-semibold text-xs ${isSelected ? 'text-black font-bold' : 'text-[#e0e0e0]'}`}>{preset.name}</span>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-black text-[#f27d26] flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className={`text-[11px] line-clamp-2 leading-relaxed ${isSelected ? 'text-black/80' : 'text-[#888]'}`}>
                    {preset.description}
                  </p>
                </div>
                <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-[10px] font-mono ${isSelected ? 'border-black/20 text-black/70' : 'border-[#222] text-[#666]'}`}>
                  <span>کانال: سه‌بعدی HRTF</span>
                  <span className={isSelected ? 'font-bold uppercase' : ''}>
                    {isSelected ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 10-Band Graphic Equalizer */}
      <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#222]">
          <div>
            <h3 className="text-sm font-bold text-[#e0e0e0] uppercase tracking-wider">اکولایزر گرافیکی ۱۰ بانده (10-Band EQ)</h3>
            <p className="text-xs text-[#888]">تنظیم دقیق فرکانس‌های صدای پا (2kHz - 4kHz) و مهار بیس انفجار</p>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <button
              onClick={onResetGains}
              className="px-3 py-1.5 rounded-lg bg-[#151515] hover:bg-[#222] border border-[#222] text-[#888] hover:text-[#e0e0e0] text-xs font-medium flex items-center space-x-1.5 space-x-reverse transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>بازنشانی پیش‌فرض</span>
            </button>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-4 pt-2 pb-4">
          {FREQUENCY_BANDS.map((band, idx) => {
            const gain = currentGains[idx] || 0;
            return (
              <div
                key={band.frequency}
                className="flex flex-col items-center bg-[#111] p-3 rounded-xl border border-[#222] group hover:border-[#f27d26]/40 transition-colors"
              >
                <span className="text-xs font-mono font-bold text-[#f27d26] mb-1">
                  {gain > 0 ? `+${gain}` : gain} dB
                </span>

                {/* Vertical slider wrapper */}
                <div className="h-44 py-2 flex items-center justify-center relative">
                  <input
                    type="range"
                    min="-12"
                    max="12"
                    step="0.5"
                    value={gain}
                    onChange={(e) => onGainChange(idx, parseFloat(e.target.value))}
                    className="w-40 h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#f27d26] transform -rotate-90 focus:outline-none"
                  />
                </div>

                <span className="text-[11px] font-mono font-medium text-[#e0e0e0] mt-2">
                  {band.label}
                </span>
                <span className="text-[9px] text-[#666] mt-0.5">
                  {idx < 3 ? 'بیس/انفجار' : idx < 7 ? 'صدای پا' : 'جزئیات/خش‌خش'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Master Gain Slider */}
        <div className="mt-6 pt-4 border-t border-[#222] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#111] p-4 rounded-xl border border-[#222]">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-xs font-semibold text-[#e0e0e0]">ولوم اصلی خروجی (Master Gain):</span>
            <span className="text-xs font-mono font-bold text-[#f27d26]">{masterGain} dB</span>
          </div>
          <div className="flex items-center space-x-3 space-x-reverse w-full sm:w-1/2">
            <span className="text-[10px] text-[#666]">-12dB</span>
            <input
              type="range"
              min="-12"
              max="12"
              step="0.5"
              value={masterGain}
              onChange={(e) => onMasterGainChange(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#f27d26]"
            />
            <span className="text-[10px] text-[#666]">+12dB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

