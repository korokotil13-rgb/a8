import React, { useState } from 'react';
import { TabType, AudioPreset, WindowsServiceState } from './types';
import { R6_PRESETS } from './data/r6AudioPresets';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { EqualizerTab } from './components/EqualizerTab';
import { SpatialAudioTab } from './components/SpatialAudioTab';
import { SoundTestTab } from './components/SoundTestTab';
import { AdvancedDSPTab } from './components/AdvancedDSPTab';
import { WindowsServiceTab } from './components/WindowsServiceTab';
import { ResearchGuideTab } from './components/ResearchGuideTab';
import { FooterStatus } from './components/FooterStatus';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('equalizer');
  const [selectedPreset, setSelectedPreset] = useState<AudioPreset>(R6_PRESETS[0]);
  const [gains, setGains] = useState<number[]>(R6_PRESETS[0].gains);
  const [masterGain, setMasterGain] = useState<number>(0);

  // Spatial audio state
  const [spatialWidth, setSpatialWidth] = useState<number>(R6_PRESETS[0].spatialWidth);
  const [elevationBoost, setElevationBoost] = useState<number>(R6_PRESETS[0].elevationBoost);
  const [occlusionReduction, setOcclusionReduction] = useState<number>(R6_PRESETS[0].occlusionReduction);
  const [selectedHeadset, setSelectedHeadset] = useState<string>('ps5-pulse-3d');

  // DSP state
  const [compressorThreshold, setCompressorThreshold] = useState<number>(R6_PRESETS[0].compressorThreshold);
  const [crystalizer, setCrystalizer] = useState<number>(R6_PRESETS[0].crystalizer);
  const [bassDamping, setBassDamping] = useState<number>(R6_PRESETS[0].bassDamping);

  // Windows Service state
  const [serviceState, setServiceState] = useState<WindowsServiceState>({
    isRunning: true,
    serviceName: 'R6SiegeAudioAPOService',
    pid: 4892,
    cpuUsage: 0.4,
    memoryUsage: '34 MB',
    audioEndpoint: 'Sony PULSE 3D Wireless Headset (Spatial HRTF)',
    sampleRate: '48000 Hz',
    bitDepth: '24-bit',
    r6Detected: true,
  });

  const handleToggleService = () => {
    setServiceState((prev) => ({
      ...prev,
      isRunning: !prev.isRunning,
    }));
  };

  const handleSelectPreset = (preset: AudioPreset) => {
    setSelectedPreset(preset);
    setGains([...preset.gains]);
    setSpatialWidth(preset.spatialWidth);
    setElevationBoost(preset.elevationBoost);
    setOcclusionReduction(preset.occlusionReduction);
    setCompressorThreshold(preset.compressorThreshold);
    setCrystalizer(preset.crystalizer);
    setBassDamping(preset.bassDamping);
  };

  const handleGainChange = (index: number, val: number) => {
    const updated = [...gains];
    updated[index] = val;
    setGains(updated);
  };

  const handleResetGains = () => {
    setGains([...selectedPreset.gains]);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col font-sans selection:bg-[#f27d26] selection:text-black">
      {/* Windows Style Header */}
      <Header
        serviceState={serviceState}
        onToggleService={handleToggleService}
        activePresetName={selectedPreset.name}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          r6Detected={serviceState.r6Detected}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#080808]">
          <div className="max-w-6xl mx-auto space-y-6">
            {activeTab === 'equalizer' && (
              <EqualizerTab
                currentGains={gains}
                onGainChange={handleGainChange}
                selectedPresetId={selectedPreset.id}
                onSelectPreset={handleSelectPreset}
                onResetGains={handleResetGains}
                masterGain={masterGain}
                onMasterGainChange={setMasterGain}
              />
            )}

            {activeTab === 'spatial' && (
              <SpatialAudioTab
                spatialWidth={spatialWidth}
                onSpatialWidthChange={setSpatialWidth}
                elevationBoost={elevationBoost}
                onElevationBoostChange={setElevationBoost}
                occlusionReduction={occlusionReduction}
                onOcclusionReductionChange={setOcclusionReduction}
                selectedHeadset={selectedHeadset}
                onSelectHeadset={setSelectedHeadset}
              />
            )}

            {activeTab === 'test' && <SoundTestTab />}

            {activeTab === 'dsp' && (
              <AdvancedDSPTab
                compressorThreshold={compressorThreshold}
                onCompressorChange={setCompressorThreshold}
                crystalizer={crystalizer}
                onCrystalizerChange={setCrystalizer}
                bassDamping={bassDamping}
                onBassDampingChange={setBassDamping}
              />
            )}

            {activeTab === 'service' && (
              <WindowsServiceTab
                serviceState={serviceState}
                onToggleService={handleToggleService}
                currentPreset={selectedPreset}
              />
            )}

            {activeTab === 'research' && <ResearchGuideTab />}
          </div>
        </main>
      </div>

      {/* Footer Status Bar */}
      <FooterStatus
        serviceRunning={serviceState.isRunning}
        activePresetName={selectedPreset.name}
      />
    </div>
  );
}
