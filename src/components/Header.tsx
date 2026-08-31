import React from 'react';
import { WindowsServiceState } from '../types';
import { Shield, Power, Activity, Minimize2, Maximize2, X, Volume2 } from 'lucide-react';

interface HeaderProps {
  serviceState: WindowsServiceState;
  onToggleService: () => void;
  activePresetName: string;
}

import React from 'react';
import { WindowsServiceState } from '../types';
import { Shield, Power, Activity, Minimize2, Maximize2, X, Volume2 } from 'lucide-react';

interface HeaderProps {
  serviceState: WindowsServiceState;
  onToggleService: () => void;
  activePresetName: string;
}

export const Header: React.FC<HeaderProps> = ({
  serviceState,
  onToggleService,
  activePresetName,
}) => {
  return (
    <header className="h-20 bg-[#0a0a0a] border-b border-[#222] text-[#e0e0e0] px-6 flex items-center justify-between select-none sticky top-0 z-50">
      {/* App Branding & Windows titlebar left */}
      <div className="flex items-center space-x-4 space-x-reverse">
        <div className="w-10 h-10 rounded-lg bg-[#f27d26] flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(242,125,38,0.3)]">
          R6
        </div>
        <div>
          <div className="flex items-center space-x-3 space-x-reverse">
            <h1 className="font-bold text-base tracking-tighter uppercase text-[#f27d26]">
              Sonic Master Pro
            </h1>
            <span className="px-2.5 py-0.5 bg-[#1a1a1a] border border-[#333] text-[10px] text-[#888] rounded uppercase tracking-widest font-mono">
              Rainbow Six Siege Edition
            </span>
          </div>
          <p className="text-xs text-[#888] flex items-center space-x-2 space-x-reverse mt-0.5">
            <span>موتور صوتی سه‌بعدی PS5</span>
            <span className="text-[#333]">•</span>
            <span className="text-[#f27d26] font-medium">پروفایل فعال: {activePresetName}</span>
          </p>
        </div>
      </div>

      {/* Center status indicator & Windows service switch */}
      <div className="hidden md:flex items-center space-x-3 space-x-reverse bg-[#111] px-4 py-2 rounded-full border border-[#222]">
        <div className="flex items-center space-x-2 space-x-reverse">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              serviceState.isRunning
                ? 'bg-[#00ff41] shadow-[0_0_8px_#00ff41] animate-pulse'
                : 'bg-[#ff4444]'
            }`}
          />
          <span className="text-xs font-medium text-[#aaa] uppercase tracking-wider">
            {serviceState.isRunning ? 'Service: Running' : 'Service: Stopped'}
          </span>
        </div>

        <button
          onClick={onToggleService}
          className={`ml-2 text-[10px] px-3 py-1 rounded-sm uppercase font-bold transition-all ${
            serviceState.isRunning
              ? 'bg-[#ff4444] text-white hover:bg-red-600'
              : 'bg-[#00ff41] text-black hover:brightness-110'
          }`}
        >
          {serviceState.isRunning ? 'Stop Service' : 'Start Service'}
        </button>
      </div>

      {/* Windows window control buttons style */}
      <div className="flex items-center space-x-1 space-x-reverse text-[#888]">
        <div className="hidden sm:flex items-center space-x-2 space-x-reverse px-2 text-xs text-[#888] font-mono">
          <Volume2 className="w-3.5 h-3.5 text-[#f27d26]" />
          <span>48kHz / 24-bit</span>
        </div>
        <div className="h-4 w-[1px] bg-[#222] mx-2 hidden sm:block"></div>
        <button
          title="کوچک‌سازی"
          className="w-8 h-8 rounded bg-[#151515] border border-[#222] hover:bg-[#222] hover:text-[#e0e0e0] flex items-center justify-center transition-colors"
        >
          <Minimize2 className="w-3.5 h-3.5" />
        </button>
        <button
          title="بزرگنمایی"
          className="w-8 h-8 rounded bg-[#151515] border border-[#222] hover:bg-[#222] hover:text-[#e0e0e0] flex items-center justify-center transition-colors"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <button
          title="بستن برنامه"
          className="w-8 h-8 rounded bg-[#151515] border border-[#222] hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

