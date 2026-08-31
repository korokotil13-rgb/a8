import React, { useState } from 'react';
import { PlayCircle, Volume2, Footprints, Zap, ShieldAlert, Compass, Sparkles } from 'lucide-react';

export const SoundTestTab: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [surface, setSurface] = useState<'wood' | 'metal' | 'concrete' | 'tile' | 'gunshot' | 'explosion'>('wood');
  const [direction, setDirection] = useState<'front' | 'back' | 'left' | 'right' | 'above' | 'below'>('front');
  const [distance, setDistance] = useState<number>(5);

  // Web Audio API synthesizer for testing R6 audio cues
  const playTestSound = (soundType: 'wood' | 'metal' | 'concrete' | 'tile' | 'gunshot' | 'explosion') => {
    setIsPlaying(soundType);
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.3;

      // Spatial panner simulation if supported
      if (ctx.createStereoPanner) {
        const panner = ctx.createStereoPanner();
        if (direction === 'left') panner.pan.value = -0.9;
        else if (direction === 'right') panner.pan.value = 0.9;
        else panner.pan.value = 0.0;
        masterGain.connect(panner);
        panner.connect(ctx.destination);
      } else {
        masterGain.connect(ctx.destination);
      }

      const now = ctx.currentTime;

      if (soundType === 'wood' || soundType === 'metal' || soundType === 'concrete' || soundType === 'tile') {
        // Footstep synthesis: noise burst + resonant filter
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        if (soundType === 'wood') {
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(2200, now); // Footstep frequency
          filter.Q.value = 3;
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(180, now);
        } else if (soundType === 'metal') {
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(3800, now); // Metallic ring
          filter.Q.value = 8;
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(650, now);
        } else if (soundType === 'concrete') {
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1200, now); // Dull thud
          filter.Q.value = 2;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(110, now);
        } else {
          // Tile
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(4200, now);
          filter.Q.value = 6;
          osc.type = 'square';
          osc.frequency.setValueAtTime(800, now);
        }

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.18);

        setTimeout(() => {
          setIsPlaying(null);
        }, 300);
      } else if (soundType === 'gunshot') {
        // Gunshot simulation
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);

        gain.gain.setValueAtTime(0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.3);

        setTimeout(() => {
          setIsPlaying(null);
        }, 400);
      } else if (soundType === 'explosion') {
        // Heavy explosion sub-bass
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);

        gain.gain.setValueAtTime(0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.8);

        setTimeout(() => {
          setIsPlaying(null);
        }, 900);
      }
    } catch {
      setIsPlaying(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d0d] border border-[#222] rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#222]">
          <div>
            <h2 className="text-sm font-bold text-[#e0e0e0] flex items-center space-x-2 space-x-reverse uppercase tracking-wider">
              <PlayCircle className="w-4 h-4 text-[#f27d26]" />
              <span>محیط تست و کالیبراسیون صدای رینبو سیکس (Audio Test Range)</span>
            </h2>
            <p className="text-xs text-[#888]">تست زنده صدای پا روی سطوح مختلف، شلیک و جهت‌یابی ۳۶۰ درجه برای تنظیم اکولایزر</p>
          </div>
        </div>

        {/* Configuration Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Surface selector */}
          <div className="bg-[#111] p-4 rounded-xl border border-[#222] space-y-3">
            <label className="text-xs font-semibold text-[#e0e0e0] flex items-center space-x-1.5 space-x-reverse">
              <Footprints className="w-3.5 h-3.5 text-[#f27d26]" />
              <span>انتخاب سطح برخورد (Surface Material)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'wood', label: 'چوب (Wood)' },
                { id: 'metal', label: 'فلز (Metal)' },
                { id: 'concrete', label: 'بتن (Concrete)' },
                { id: 'tile', label: 'کاشی (Tile)' },
                { id: 'gunshot', label: 'شلیک اسلحه' },
                { id: 'explosion', label: 'انفجار دیوار' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSurface(item.id as typeof surface)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-right ${
                    surface === item.id
                      ? 'bg-[#f27d26] text-black font-bold shadow-[0_0_15px_rgba(242,125,38,0.3)]'
                      : 'bg-[#151515] text-[#888] hover:bg-[#222] hover:text-[#e0e0e0] border border-[#222]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Direction selector */}
          <div className="bg-[#111] p-4 rounded-xl border border-[#222] space-y-3">
            <label className="text-xs font-semibold text-[#e0e0e0] flex items-center space-x-1.5 space-x-reverse">
              <Compass className="w-3.5 h-3.5 text-[#f27d26]" />
              <span>جهت منبع صوت (3D Direction)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'front', label: 'روبرو (Front)' },
                { id: 'back', label: 'پشت سر (Back)' },
                { id: 'left', label: 'چپ (Left)' },
                { id: 'right', label: 'راست (Right)' },
                { id: 'above', label: 'بالا (طبقه بالا)' },
                { id: 'below', label: 'پایین (زمین/زیرین)' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDirection(item.id as typeof direction)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-right ${
                    direction === item.id
                      ? 'bg-[#f27d26] text-black font-bold shadow-[0_0_15px_rgba(242,125,38,0.3)]'
                      : 'bg-[#151515] text-[#888] hover:bg-[#222] hover:text-[#e0e0e0] border border-[#222]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Distance slider & trigger */}
          <div className="bg-[#111] p-4 rounded-xl border border-[#222] flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#e0e0e0]">فاصله دشمن:</span>
                <span className="font-mono font-bold text-[#f27d26]">{distance} متر</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
                className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#f27d26]"
              />
            </div>

            <button
              onClick={() => playTestSound(surface)}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 space-x-reverse transition-all shadow-lg ${
                isPlaying === surface
                  ? 'bg-[#00ff41] text-black shadow-[0_0_15px_#00ff41] scale-95'
                  : 'bg-[#f27d26] text-black hover:brightness-110 shadow-[0_0_20px_rgba(242,125,38,0.3)]'
              }`}
            >
              <Volume2 className="w-4 h-4 animate-bounce" />
              <span>{isPlaying === surface ? 'در حال پخش پالس صوتی...' : 'پخش تست صدای انتخاب شده'}</span>
            </button>
          </div>
        </div>

        {/* Radar visualizer preview */}
        <div className="bg-[#151515] p-6 rounded-xl border border-[#222] flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,125,38,0.05)_0,transparent_70%)] pointer-events-none"></div>
          <div className="w-48 h-48 rounded-full border border-[#f27d26]/30 flex items-center justify-center relative animate-pulse">
            <div className="w-32 h-32 rounded-full border border-[#f27d26]/50 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-[#f27d26]/80 flex items-center justify-center bg-[#f27d26]/10 text-[#f27d26] font-mono text-xs">
                مستخدم
              </div>
            </div>
            {/* Direction indicator dot */}
            <span
              className={`absolute w-4 h-4 rounded-full bg-[#f27d26] shadow-[0_0_12px_rgba(242,125,38,0.9)] transition-all ${
                direction === 'front'
                  ? 'top-2'
                  : direction === 'back'
                  ? 'bottom-2'
                  : direction === 'left'
                  ? 'left-2'
                  : direction === 'right'
                  ? 'right-2'
                  : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150 bg-[#00ff41]'
              }`}
            />
          </div>
          <p className="text-xs text-[#888] mt-4 text-center">
            موقعیت سه‌بعدی شبیه‌سازی شده: <span className="text-[#f27d26] font-bold">{direction}</span> روی سطح{' '}
            <span className="text-[#f27d26] font-bold">{surface}</span> در فاصله{' '}
            <span className="text-[#f27d26] font-bold">{distance} متری</span>
          </p>
        </div>
      </div>
    </div>
  );
};
