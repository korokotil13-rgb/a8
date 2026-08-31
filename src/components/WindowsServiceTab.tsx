import React, { useState } from 'react';
import { WindowsServiceState, AudioPreset } from '../types';
import { Settings, Power, FileText, CheckCircle, RefreshCw, Terminal, Download } from 'lucide-react';

interface WindowsServiceTabProps {
  serviceState: WindowsServiceState;
  onToggleService: () => void;
  currentPreset: AudioPreset;
}

export const WindowsServiceTab: React.FC<WindowsServiceTabProps> = ({
  serviceState,
  onToggleService,
  currentPreset,
}) => {
  const [copied, setCopied] = useState(false);

  // Generate Equalizer APO text configuration format
  const generateApoconfig = () => {
    return `# R6 Siege Pro Audio Equalizer APO Configuration v3.4
# Target Game: RainbowSix.exe
# Active Preset: ${currentPreset.name}
Device: All

# Preamp
Preamp: 0 dB

# Graphic Equalizer (10-Band)
GraphicEQ: 31 ${currentPreset.gains[0]} dB; 63 ${currentPreset.gains[1]} dB; 125 ${currentPreset.gains[2]} dB; 250 ${currentPreset.gains[3]} dB; 500 ${currentPreset.gains[4]} dB; 1000 ${currentPreset.gains[5]} dB; 2000 ${currentPreset.gains[6]} dB; 4000 ${currentPreset.gains[7]} dB; 8000 ${currentPreset.gains[8]} dB; 16000 ${currentPreset.gains[9]} dB

# Spatial Audio Matrix & HRTF
SpatialWidth: ${currentPreset.spatialWidth}%
ElevationBoost: ${currentPreset.elevationBoost}%
OcclusionCompensation: ${currentPreset.occlusionReduction}%

# Advanced DSP Dynamics
CompressorThreshold: ${currentPreset.compressorThreshold} dB
CrystalizerLevel: ${currentPreset.crystalizer}%
BassDamping: ${currentPreset.bassDamping}%
`;
  };

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(generateApoconfig());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadConfig = () => {
    const element = document.createElement('a');
    const file = new Blob([generateApoconfig()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `R6_Audio_APO_${currentPreset.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Service Status Dashboard */}
      <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#222]">
          <div>
            <h2 className="text-sm font-bold text-[#e0e0e0] flex items-center space-x-2 space-x-reverse uppercase tracking-wider">
              <Settings className="w-4 h-4 text-[#f27d26]" />
              <span>مدیریت سرویس صوتی اختصاصی ویندوز (Windows Audio Hook & APO)</span>
            </h2>
            <p className="text-xs text-[#888]">کنترل مستقیم درایور صوتی ویندوز بدون نیاز به نرم‌افزارهای سنگین جانبی</p>
          </div>
          <button
            onClick={onToggleService}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-2 space-x-reverse ${
              serviceState.isRunning
                ? 'bg-[#ff4444] text-white hover:bg-red-600'
                : 'bg-[#00ff41] text-black hover:brightness-110'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{serviceState.isRunning ? 'Stop Audio Service' : 'Start Audio Service'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
            <span className="text-[11px] text-[#666] block mb-1">وضعیت سرویس</span>
            <div className="flex items-center space-x-2 space-x-reverse">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  serviceState.isRunning ? 'bg-[#00ff41] shadow-[0_0_8px_#00ff41]' : 'bg-[#ff4444]'
                }`}
              />
              <span className="text-xs font-bold text-[#e0e0e0]">
                {serviceState.isRunning ? 'در حال اجرا (Active)' : 'متوقف شده (Stopped)'}
              </span>
            </div>
          </div>

          <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
            <span className="text-[11px] text-[#666] block mb-1">شناسه پردازش (PID)</span>
            <span className="text-xs font-mono font-bold text-[#f27d26]">
              {serviceState.isRunning ? `#${serviceState.pid}` : '---'}
            </span>
          </div>

          <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
            <span className="text-[11px] text-[#666] block mb-1">بازی رینبو سیکس</span>
            <span
              className={`text-xs font-bold ${
                serviceState.r6Detected ? 'text-[#00ff41]' : 'text-amber-400'
              }`}
            >
              {serviceState.r6Detected ? 'در حال اجرا (RainbowSix.exe)' : 'در انتظار اجرا'}
            </span>
          </div>

          <div className="bg-[#111] p-4 rounded-xl border border-[#222]">
            <span className="text-[11px] text-[#666] block mb-1">خروجی صوتی ویندوز</span>
            <span className="text-xs font-mono font-bold text-[#e0e0e0] truncate block">
              {serviceState.audioEndpoint}
            </span>
          </div>
        </div>
      </div>

      {/* APO Configuration generator & export */}
      <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-[#222]">
          <div>
            <h3 className="text-sm font-bold text-[#e0e0e0] flex items-center space-x-2 space-x-reverse uppercase tracking-wider">
              <FileText className="w-4 h-4 text-[#f27d26]" />
              <span>خروجی فایل تنظیمات Equalizer APO و اسکریپت ویندوز</span>
            </h3>
            <p className="text-xs text-[#888]">کد و تنظیمات اعمال شده روی اکولایزر برای تزریق مستقیم به درایور ویندوز</p>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={handleCopyConfig}
              className="px-3.5 py-2 rounded-lg bg-[#151515] hover:bg-[#222] border border-[#222] text-[#e0e0e0] text-xs font-medium flex items-center space-x-1.5 space-x-reverse transition-colors"
            >
              {copied ? <CheckCircle className="w-3.5 h-3.5 text-[#00ff41]" /> : <Terminal className="w-3.5 h-3.5 text-[#f27d26]" />}
              <span>{copied ? 'کپی شد!' : 'کپی تنظیمات'}</span>
            </button>
            <button
              onClick={handleDownloadConfig}
              className="px-3.5 py-2 rounded-lg bg-[#f27d26] hover:brightness-110 text-black font-bold text-xs flex items-center space-x-1.5 space-x-reverse transition-colors shadow-[0_0_15px_rgba(242,125,38,0.3)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>دانلود فایل APO</span>
            </button>
          </div>
        </div>

        <div className="bg-[#111] p-4 rounded-xl border border-[#222] font-mono text-xs text-[#aaa] overflow-x-auto whitespace-pre leading-relaxed dir-ltr text-left">
          {generateApoconfig()}
        </div>
      </div>
    </div>
  );
};
