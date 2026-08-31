import React from 'react';
import { Shield, Activity, Cpu, Volume2 } from 'lucide-react';

interface FooterStatusProps {
  serviceRunning: boolean;
  activePresetName: string;
}

import React from 'react';
import { Shield, Activity, Cpu, Volume2 } from 'lucide-react';

interface FooterStatusProps {
  serviceRunning: boolean;
  activePresetName: string;
}

export const FooterStatus: React.FC<FooterStatusProps> = ({ serviceRunning, activePresetName }) => {
  return (
    <footer className="h-20 bg-[#0d0d0d] border-t border-[#222] text-[#888] px-8 flex items-center justify-between text-xs select-none">
      <div className="flex items-center space-x-6 space-x-reverse">
        <div className="flex items-center space-x-2 space-x-reverse">
          <Shield className="w-4 h-4 text-[#f27d26]" />
          <span className="font-mono uppercase tracking-wider text-[11px]">Windows Audio APO Engine v3.4</span>
        </div>
        <span className="text-[#333]">•</span>
        <div className="flex items-center space-x-2 space-x-reverse font-mono text-[11px]">
          <Activity className="w-4 h-4 text-[#00ff41]" />
          <span>Latency: 2.4ms</span>
        </div>
      </div>

      <div className="flex items-center space-x-6 space-x-reverse">
        <span className="text-[#666]">پروفایل فعال: <strong className="text-[#e0e0e0]">{activePresetName}</strong></span>
        <span className="text-[#333]">•</span>
        <span className={`font-semibold uppercase tracking-wider text-[11px] ${serviceRunning ? 'text-[#00ff41]' : 'text-[#ff4444]'}`}>
          {serviceRunning ? 'Service Active & Filtering' : 'Service Stopped'}
        </span>
      </div>
    </footer>
  );
};

