import React, { useState } from 'react';
import { DEPTH_STRATA } from '../data/abyssalData';
import { soundEngine } from '../utils/soundEngine';
import { Layers, Thermometer, Gauge, SunMedium, Sparkles, ChevronRight } from 'lucide-react';

export const StrataManifesto: React.FC = () => {
  const [selectedStrataIndex, setSelectedStrataIndex] = useState(2); // default to Bathypelagic
  const activeStrata = DEPTH_STRATA[selectedStrataIndex];

  const handleSelectStrata = (index: number) => {
    setSelectedStrataIndex(index);
    soundEngine.playHydroClick();
  };

  return (
    <section id="strata" className="relative py-28 bg-abyss-950 overflow-hidden border-t border-cyan-500/15">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-cyan-500/20 pb-8">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>CHAPTER 02 // BATHYMETRIC STRATIFICATION</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight">
              The Five Strata of
              <span className="italic block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-biolume-neon">
                Total Obscurity
              </span>
            </h2>
          </div>
          <p className="font-sans text-slate-400 text-sm max-w-md leading-relaxed font-light">
            As depth escalates exponentially, solar photons vanish completely.
            Select a stratum below to inspect barometric shifts, thermal plunges, and evolutionary survival adaptations.
          </p>
        </div>

        {/* Interactive Strata Progression Navigator */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {DEPTH_STRATA.map((stratum, index) => {
            const isActive = index === selectedStrataIndex;
            return (
              <button
                key={stratum.id}
                onClick={() => handleSelectStrata(index)}
                data-cursor-action="STRATA"
                className={`relative text-left p-4 rounded-xl border transition-all duration-300 group overflow-hidden ${
                  isActive
                    ? 'bg-abyss-900 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.2)]'
                    : 'bg-abyss-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-abyss-900/80'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-biolume-neon shadow-[0_0_10px_#00f0ff]" />
                )}

                <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest mb-1 group-hover:text-cyan-400 transition-colors">
                  STRATUM 0{index + 1}
                </div>
                <div className={`font-serif text-lg font-medium mb-1 transition-colors ${
                  isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                }`}>
                  {stratum.name.replace(' Zone', '')}
                </div>
                <div className="font-mono text-xs text-cyan-400/90 font-semibold tabular-nums">
                  {stratum.depthRange}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stratum Telemetry & Manifest Terminal */}
        <div className="bg-abyss-900/80 border border-cyan-500/25 rounded-2xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* Left Column: Strata Narrative & Scientific Manifest */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/40 text-cyan-300 font-mono text-[11px] tracking-wider uppercase">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>ZONE PROFILE: {activeStrata.name.toUpperCase()}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                {activeStrata.name}
              </h3>

              <p className="font-sans text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                {activeStrata.keyFeature}
              </p>

              <div className="border-t border-cyan-500/20 pt-6">
                <div className="font-mono text-xs tracking-wider uppercase text-slate-400 mb-3 flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Documented Stratum Fauna:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeStrata.fauna.map((organism) => (
                    <span
                      key={organism}
                      className="px-3 py-1 rounded-lg border border-slate-700 bg-abyss-950 text-slate-300 font-mono text-xs tracking-wide hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
                    >
                      {organism}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: High-Precision Environmental HUD Telemetry */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="p-4 rounded-xl border border-cyan-500/20 bg-abyss-950/70">
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                  <SunMedium className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Solar Illuminance</span>
                </div>
                <div className="font-mono text-xl text-white font-bold">{activeStrata.lux}</div>
                <p className="font-sans text-[11px] text-slate-500 mt-1">Measured at lower stratum boundary</p>
              </div>

              <div className="p-4 rounded-xl border border-cyan-500/20 bg-abyss-950/70">
                <div className="flex items-center gap-2 text-biolume-neon mb-1">
                  <Gauge className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Hydrostatic Pressure</span>
                </div>
                <div className="font-mono text-xl text-white font-bold">{activeStrata.atmospheres}</div>
                <p className="font-sans text-[11px] text-slate-500 mt-1">1 ATM added per 10m of saline descent</p>
              </div>

              <div className="p-4 rounded-xl border border-cyan-500/20 bg-abyss-950/70">
                <div className="flex items-center gap-2 text-purple-400 mb-1">
                  <Thermometer className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400">Benthic Temperature</span>
                </div>
                <div className="font-mono text-xl text-white font-bold">{activeStrata.temperature}</div>
                <p className="font-sans text-[11px] text-slate-500 mt-1">Thermocline stabilization gradient</p>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Footnote Manifesto */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl border border-slate-800 bg-abyss-900/40 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-light">
          <div>
            <div className="font-mono text-xs text-cyan-400 font-semibold mb-2">01 / THE 470NM WINDOW</div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Water selectively scatters red and yellow light in the first 100 meters. Only blue-green wavelengths between 460nm and 490nm travel long distances, making cyan the universal language of hadal life.
            </p>
          </div>
          <div>
            <div className="font-mono text-xs text-biolume-neon font-semibold mb-2">02 / BAROPHILIC PRESSURE</div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              At 8,000 meters, cell membranes would solidify and ordinary enzymes denature. Benthic organisms synthesize dense polyunsaturated fatty acids and TMAO chaperones to keep cells liquid and functional.
            </p>
          </div>
          <div>
            <div className="font-mono text-xs text-purple-400 font-semibold mb-2">03 / COLD THERMODYNAMICS</div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Bioluminescence is nearly 100% efficient cold light. Almost no energy is lost as radiant heat, ensuring survival in nutrient-scarce hadal trenches where every joule of energy is preserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
