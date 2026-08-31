import React from 'react';
import { HEADSET_PROFILES } from '../data/r6AudioPresets';
import { Headphones, Globe, Volume2, Sliders, CheckCircle2, ShieldAlert } from 'lucide-react';

interface SpatialAudioTabProps {
  spatialWidth: number;
  onSpatialWidthChange: (val: number) => void;
  elevationBoost: number;
  onElevationBoostChange: (val: number) => void;
  occlusionReduction: number;
  onOcclusionReductionChange: (val: number) => void;
  selectedHeadset: string;
  onSelectHeadset: (id: string) => void;
}

import React from 'react';
import { HEADSET_PROFILES } from '../data/r6AudioPresets';
import { Headphones, Globe, Volume2, Sliders, CheckCircle2, ShieldAlert } from 'lucide-react';

interface SpatialAudioTabProps {
  spatialWidth: number;
  onSpatialWidthChange: (val: number) => void;
  elevationBoost: number;
  onElevationBoostChange: (val: number) => void;
  occlusionReduction: number;
  onOcclusionReductionChange: (val: number) => void;
  selectedHeadset: string;
  onSelectHeadset: (id: string) => void;
}

export const SpatialAudioTab: React.FC<SpatialAudioTabProps> = ({
  spatialWidth,
  onSpatialWidthChange,
  elevationBoost,
  onElevationBoostChange,
  occlusionReduction,
  onOcclusionReductionChange,
  selectedHeadset,
  onSelectHeadset,
}) => {
  return (
    <div className="space-y-6">
      {/* Headset selector card */}
      <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#222]">
          <div>
            <h2 className="text-sm font-bold text-[#e0e0e0] flex items-center space-x-2 space-x-reverse uppercase tracking-wider">
              <Headphones className="w-4 h-4 text-[#f27d26]" />
              <span>انتخاب هدفون و موتور صوتی سه‌بعدی PS5 (Pulse 3D / Tempest Engine)</span>
            </h2>
            <p className="text-xs text-[#888]">بهینه‌سازی ضرایب HRTF متناسب با مدل هدفون شما برای جهت‌یابی ۳۶۰ درجه دقیق</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HEADSET_PROFILES.map((headset) => {
            const isSelected = selectedHeadset === headset.id;
            return (
              <button
                key={headset.id}
                onClick={() => onSelectHeadset(headset.id)}
                className={`p-4 rounded-xl border text-right transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#f27d26] text-black border-[#f27d26] shadow-[0_0_20px_rgba(242,125,38,0.3)] font-bold'
                    : 'bg-[#111] border-[#222] hover:border-[#333] hover:bg-[#151515] text-[#e0e0e0]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold text-xs ${isSelected ? 'text-black font-bold' : 'text-[#e0e0e0]'}`}>{headset.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-black" />}
                  </div>
                  <p className={`text-[11px] font-mono mb-2 ${isSelected ? 'text-black/80' : 'text-[#f27d26]'}`}>{headset.hrtf}</p>
                </div>
                <div className={`pt-2.5 border-t flex items-center justify-between text-[10px] font-mono ${isSelected ? 'border-black/20 text-black/70' : 'border-[#222] text-[#666]'}`}>
                  <span>امپدانس: {headset.impedance}</span>
                  <span className={isSelected ? 'font-bold uppercase' : ''}>
                    {isSelected ? 'ACTIVE' : 'SELECT'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Advanced Spatial Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Spatial Width */}
        <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#e0e0e0] flex items-center space-x-1.5 space-x-reverse">
              <Globe className="w-3.5 h-3.5 text-[#f27d26]" />
              <span>گستردگی صحنه صوتی (Spatial Width)</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#f27d26]">{spatialWidth}%</span>
          </div>
          <input
            type="range"
            min="40"
            max="120"
            value={spatialWidth}
            onChange={(e) => onSpatialWidthChange(parseInt(e.target.value))}
            className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#f27d26]"
          />
          <p className="text-[11px] text-[#888] leading-relaxed">
            گسترش فضای استریو برای تفکیک بهتر جایگاه دشمن در سالن‌ها و راهروهای بزرگ رینبو.
          </p>
        </div>

        {/* Elevation Boost */}
        <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#e0e0e0] flex items-center space-x-1.5 space-x-reverse">
              <Sliders className="w-3.5 h-3.5 text-[#f27d26]" />
              <span>تقویت صدای طبقات (Elevation Boost)</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#f27d26]">{elevationBoost}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={elevationBoost}
            onChange={(e) => onElevationBoostChange(parseInt(e.target.value))}
            className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#f27d26]"
          />
          <p className="text-[11px] text-[#888] leading-relaxed">
            تشخیص دقیق اینکه آیا دشمن در طبقه بالا یا پایین شماست (مهم در مپ‌های چندطبقه مانند Bank و Clubhouse).
          </p>
        </div>

        {/* Occlusion Reduction */}
        <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#e0e0e0] flex items-center space-x-1.5 space-x-reverse">
              <ShieldAlert className="w-3.5 h-3.5 text-[#f27d26]" />
              <span>کاهش انسداد صوتی دیوارها (Occlusion Fix)</span>
            </span>
            <span className="text-xs font-mono font-bold text-[#f27d26]">{occlusionReduction}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={occlusionReduction}
            onChange={(e) => onOcclusionReductionChange(parseInt(e.target.value))}
            className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#f27d26]"
          />
          <p className="text-[11px] text-[#888] leading-relaxed">
            کاهش خفگی صدا پشت دیوارهای تخریب‌پذیر و موانع تا صدای پا واضح‌تر به گوش برسد.
          </p>
        </div>
      </div>
    </div>
  );
};

