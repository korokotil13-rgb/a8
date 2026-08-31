export type TabType = 'equalizer' | 'spatial' | 'test' | 'dsp' | 'service' | 'research';

export interface EqualizerBand {
  frequency: number; // Hz: 31, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000
  label: string;
  gain: number; // -12 to +12 dB
}

export interface AudioPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  gains: number[]; // 10 values
  spatialWidth: number;
  elevationBoost: number;
  occlusionReduction: number;
  compressorThreshold: number;
  crystalizer: number;
  bassDamping: number;
}

export interface WindowsServiceState {
  isRunning: boolean;
  serviceName: string;
  pid: number;
  cpuUsage: number;
  memoryUsage: string;
  audioEndpoint: string;
  sampleRate: string;
  bitDepth: string;
  r6Detected: boolean;
}

export interface TestSoundConfig {
  surface: 'wood' | 'metal' | 'concrete' | 'tile' | 'gunshot' | 'explosion';
  direction: 'front' | 'back' | 'left' | 'right' | 'above' | 'below';
  distance: number; // 1 to 20 meters
}
