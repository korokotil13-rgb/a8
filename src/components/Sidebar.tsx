import React from 'react';
import { TabType } from '../types';
import { Sliders, Headphones, PlayCircle, Cpu, Settings, BookOpen } from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  r6Detected: boolean;
}

import React from 'react';
import { TabType } from '../types';
import { Sliders, Headphones, PlayCircle, Cpu, Settings, BookOpen } from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  r6Detected: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, r6Detected }) => {
  const menuItems: { id: TabType; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'equalizer', label: 'اکولایزر و پروفایل‌ها', icon: Sliders },
    { id: 'spatial', label: 'صدای سه‌بعدی PS5 و هدفون', icon: Headphones, badge: 'Tempest' },
    { id: 'test', label: 'شبیه‌ساز و تست صدا', icon: PlayCircle, badge: 'Interactive' },
    { id: 'dsp', label: 'پردازشگر DSP و کمپرسور', icon: Cpu },
    { id: 'service', label: 'مدیریت سرویس ویندوز', icon: Settings, badge: r6Detected ? 'R6 در حال اجرا' : 'آماده' },
    { id: 'research', label: 'تحقیقات صدای رینبو سیکس', icon: BookOpen },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#0d0d0d] border-r border-[#222] p-4 flex flex-col justify-between shrink-0 select-none">
      <div className="space-y-2">
        <div className="px-3 py-2 text-[11px] font-bold text-[#666] uppercase tracking-[0.2em]">
          منوی اصلی کنترل صوتی
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#f27d26] text-black font-bold shadow-[0_0_15px_rgba(242,125,38,0.3)]'
                  : 'text-[#888] hover:bg-[#151515] hover:text-[#e0e0e0] border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#666]'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                    item.badge.includes('اجرا')
                      ? 'bg-[#1a1a1a] text-[#00ff41] border border-[#222]'
                      : 'bg-[#1a1a1a] text-[#888] border border-[#222]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom hardware status widget */}
      <div className="mt-6 p-4 bg-[#111] rounded-xl border border-[#222] text-xs space-y-2">
        <div className="flex items-center justify-between text-[#888]">
          <span>پردازنده بازی:</span>
          <span className={r6Detected ? 'text-[#00ff41] font-semibold' : 'text-amber-400 font-semibold'}>
            {r6Detected ? 'RainbowSix.exe یافت شد' : 'در انتظار اجرای بازی'}
          </span>
        </div>
        <div className="w-full bg-[#1a1a1a] rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              r6Detected ? 'w-full bg-[#00ff41]' : 'w-1/3 bg-amber-500'
            }`}
          />
        </div>
        <p className="text-[10px] text-[#666] leading-relaxed">
          اتصال مستقیم به درایور صوتی ویندوز (APO) بدون نیاز به نرم‌افزار جانبی.
        </p>
      </div>
    </aside>
  );
};

