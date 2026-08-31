import { AudioPreset } from '../types';

export const FREQUENCY_BANDS = [
  { frequency: 31, label: '31 Hz' },
  { frequency: 63, label: '63 Hz' },
  { frequency: 125, label: '125 Hz' },
  { frequency: 250, label: '250 Hz' },
  { frequency: 500, label: '500 Hz' },
  { frequency: 1000, label: '1 kHz' },
  { frequency: 2000, label: '2 kHz' },
  { frequency: 4000, label: '4 kHz' },
  { frequency: 8000, label: '8 kHz' },
  { frequency: 16000, label: '16 kHz' },
];

export const R6_PRESETS: AudioPreset[] = [
  {
    id: 'footstep-master',
    name: 'ردیاب صدای پا (Footstep Master)',
    description: 'بهینه‌سازی شده برای تشخیص دقیق صدای راه رفتن اپراتورها در فرکانس‌های 2kHz تا 4kHz با کاهش بیس انفجار',
    icon: 'Footprints',
    gains: [-4, -2, 0, 3, 6, 8, 9, 8, 4, 1],
    spatialWidth: 85,
    elevationBoost: 75,
    occlusionReduction: 70,
    compressorThreshold: -18,
    crystalizer: 80,
    bassDamping: 65,
  },
  {
    id: 'vertical-hearing',
    name: 'تشخیص طبقات (Vertical Sound Pro)',
    description: 'تقویت فرکانس‌های بالا و بازتاب صوتی برای تشخیص دقیق بالا یا پایین بودن دشمن در ساختمان‌های چندطبقه رینبو',
    icon: 'Layers',
    gains: [-6, -4, -2, 1, 4, 7, 10, 9, 6, 3],
    spatialWidth: 90,
    elevationBoost: 95,
    occlusionReduction: 85,
    compressorThreshold: -15,
    crystalizer: 90,
    bassDamping: 80,
  },
  {
    id: 'bomb-plant',
    name: 'تمرکز خنثی‌سازی (Bomb Plant Tracker)',
    description: 'تمرکز فوق‌العاده روی صدای خش‌خش تعویض خشاب، کاشت دیفیوزر و صداهای ظریف محیطی',
    icon: 'Target',
    gains: [-3, -1, 2, 4, 6, 8, 8, 7, 5, 2],
    spatialWidth: 75,
    elevationBoost: 60,
    occlusionReduction: 60,
    compressorThreshold: -20,
    crystalizer: 85,
    bassDamping: 50,
  },
  {
    id: 'competitive-balanced',
    name: 'رقابتی متعادل (Competitive Balanced)',
    description: 'تنظیم استاندارد مسابقات Esports برای تعادل بی‌نقص بین صدای پا، شلیک و هشدارهای صوتی تیم',
    icon: 'Shield',
    gains: [-2, 0, 2, 4, 5, 6, 7, 6, 3, 0],
    spatialWidth: 70,
    elevationBoost: 65,
    occlusionReduction: 50,
    compressorThreshold: -16,
    crystalizer: 60,
    bassDamping: 40,
  },
  {
    id: 'ps5-tempest-3d',
    name: 'هدفون پی‌اس۵ (PS5 Pulse 3D Optimized)',
    description: 'مخصوص هدفون‌های سونی پلی‌استیشن ۵ با موتور صوتی سه‌بعدی Tempest HRTF برای جهت‌یابی ۳۶۰ درجه واقعی',
    icon: 'Headphones',
    gains: [-1, 1, 3, 5, 6, 7, 8, 7, 4, 2],
    spatialWidth: 95,
    elevationBoost: 90,
    occlusionReduction: 75,
    compressorThreshold: -18,
    crystalizer: 75,
    bassDamping: 45,
  },
  {
    id: 'cinematic-immersion',
    name: 'سینمایی غوطه‌ور (Cinematic Immersion)',
    description: 'حفظ بیس عمیق و کوبش انفجارها در کنار شفافیت صدا برای تجربه‌ای سینمایی و خیره‌کننده در رینبو',
    icon: 'Zap',
    gains: [4, 5, 3, 1, 0, 1, 2, 3, 2, 1],
    spatialWidth: 60,
    elevationBoost: 40,
    occlusionReduction: 20,
    compressorThreshold: -10,
    crystalizer: 30,
    bassDamping: 10,
  }
];

export const HEADSET_PROFILES = [
  { id: 'ps5-pulse-3d', name: 'Sony PlayStation Pulse 3D / Elite', hrtf: 'Tempest 3D HRTF v2.4', impedance: '32 Ω' },
  { id: 'hyperx-cloud-alpha', name: 'HyperX Cloud Alpha / II', hrtf: 'Studio Reference Spatial', impedance: '65 Ω' },
  { id: 'razer-blackshark', name: 'Razer BlackShark V2 Pro', hrtf: 'THX Spatial Audio Hook', impedance: '32 Ω' },
  { id: 'logitech-g-pro-x', name: 'Logitech G PRO X 2 Lightspeed', hrtf: 'Blue VO!CE & DTS Headphone:X', impedance: '38 Ω' },
  { id: 'sennheiser-epos', name: 'EPOS / Sennheiser H6PRO', hrtf: 'Acoustic Open/Closed 3D', impedance: '28 Ω' },
  { id: 'generic-gaming', name: 'سایر هدفون‌های گیمینگ استاندارد (Generic USB/3.5mm)', hrtf: 'Universal Binaural R6 Matrix', impedance: 'Auto' },
];

export const R6_RESEARCH_INFO = {
  title: 'تحقیقات مهندسی صدا در بازی Rainbow Six Siege و تکنولوژی سه‌بعدی PS5',
  summary: 'موتور صوتی بازی Rainbow Six Siege (بر پایه فناوری Real-World Acoustic Propagation) صداها را به صورت فیزیکی از طریق موانع، دیوارها و داکت‌های تهویه شبیه‌سازی می‌کند.',
  points: [
    {
      title: 'فرکانس‌های حیاتی صدای پا (2kHz تا 4kHz)',
      desc: 'بیشترین انرژی صوتی ایجاد شده توسط کفش اپراتورها روی سطوح مختلف (چوب، فلز، بتن، کاشی) در بازه فرکانسی ۲ تا ۴ کیلوهرتز قرار دارد. تقویت این محدوده در اکولایزر باعث می‌شود صدای قدم زدن دشمن از پشت موانع نازک یا در راهروها بسیار زودتر شنیده شود.'
    },
    {
      title: 'مدیریت Occlusion (انسداد صوتی)',
      desc: 'بازی رینبو سیکس به صورت پیش‌فرض صدای پشت دیوارهای تخریب‌پذیر را خفه می‌کند. الگوریتم پیشرفته ما با فیلتر عبور فرکانس بالا (High-Shelf Filter) افت صدا از پشت موانع را جبران کرده و وضوح دیالوگ‌ها و قدم‌ها را حفظ می‌کند.'
    },
    {
      title: 'صدای سه‌بعدی متناسب با هدفون‌های PS5 (Pulse 3D / Tempest Engine)',
      desc: 'هدفون‌های PS5 از پردازش سخت‌افزاری صدای سه‌بعدی (HRTF) بهره می‌برند. برنامه ما با شبیه‌سازی دقیق زوایای بوم‌شناختی گوش انسان (Binaural Cues)، جهت‌یابی جلو، عقب، بالا و پایین را با دقت زیر ۱ متر ممکن می‌سازد.'
    },
    {
      title: 'مهار بیس انفجارها (Explosion Suppression)',
      desc: 'انفجار سل‌برید، باروت، و نارنجک‌ها دارای انرژی زیادی در فرکانس‌های زیر 150 هرتز است که می‌تواند گوش را کر کرده و صدای قدم‌های بعدی را بپوشاند. کمپرسور داینامیک داخلی ما اوج صدای انفجار را مهار می‌کند.'
    }
  ]
};
