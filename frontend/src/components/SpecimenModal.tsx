import React, { useEffect } from 'react';
import { Specimen } from '../types/abyssal';
import { X, Activity, ShieldCheck, Zap, Compass, Dna } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface SpecimenModalProps {
  specimen: Specimen | null;
  onClose: () => void;
}

export const SpecimenModal: React.FC<SpecimenModalProps> = ({ specimen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (specimen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [specimen, onClose]);

  if (!specimen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-abyss-950/85 backdrop-blur-md transition-opacity duration-300"
        onClick={() => {
          soundEngine.playHydroClick();
          onClose();
        }}
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-abyss-900 border border-cyan-500/30 rounded-2xl overflow-y-auto shadow-[0_0_50px_rgba(0,240,255,0.2)] z-10 text-slate-200">
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-abyss-950/90 backdrop-blur-md border-b border-cyan-500/20">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-semibold tracking-wider">
              {specimen.catalogNumber}
            </span>
            <span className="font-mono text-xs text-slate-400">
              STRATA: {specimen.strata.toUpperCase()}
            </span>
          </div>
          <button
            onClick={() => {
              soundEngine.playHydroClick();
              onClose();
            }}
            data-cursor-action="CLOSE"
            className="p-1.5 rounded-full border border-slate-700 bg-abyss-900 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition-colors"
            aria-label="Close Holotype Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Main Hero Split in Modal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visual with Bioluminescent Glow Effect */}
            <div className="relative rounded-xl overflow-hidden border border-cyan-500/25 group h-72 sm:h-80 bg-abyss-950">
              <img
                src={specimen.image}
                alt={specimen.scientificName}
                className="w-full h-full object-cover object-center filter contrast-[1.15] brightness-[0.8] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss-950 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono bg-abyss-950/80 backdrop-blur-sm px-3 py-1.5 rounded border border-cyan-500/20">
                <span className="text-cyan-300 font-bold">{specimen.emissionWavelength}</span>
                <span className="text-slate-400">{specimen.depthRange}</span>
              </div>
            </div>

            {/* Specimen Nomenclature & Taxonomy */}
            <div className="space-y-4">
              <div className="font-mono text-xs tracking-widest text-cyan-400 uppercase">
                // HOLOTYPE DOSSIER & TAXONOMIC RECORD
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight italic">
                {specimen.scientificName}
              </h2>
              <p className="font-mono text-sm text-slate-400">
                Common vernacular: <span className="text-slate-200">{specimen.commonName}</span>
              </p>
              <p className="font-sans text-slate-300 text-sm leading-relaxed font-light">
                {specimen.description}
              </p>

              <div className="flex items-center gap-2 pt-2 text-xs font-mono text-slate-400">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>Recorded Location: {specimen.location} ({specimen.discoveryYear})</span>
              </div>
            </div>
          </div>

          {/* Vital Statistics Grid */}
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-cyan-400 uppercase mb-4">
              <Activity className="w-4 h-4" />
              <span>Benthic Telemetry & Vital Measurements</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {specimen.vitalStats.map((stat) => (
                <div key={stat.label} className="p-3.5 rounded-xl border border-cyan-500/20 bg-abyss-950/80">
                  <div className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  <div className="font-mono text-sm sm:text-base text-cyan-300 font-bold mt-1">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Biochemical Bioluminescence Matrix */}
          <div className="p-5 rounded-xl border border-cyan-500/20 bg-abyss-950/90 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-biolume-neon uppercase">
              <Dna className="w-4 h-4 text-biolume-neon" />
              <span>Cold Biochemical Emission Mechanism</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">SUBSTRATE COMPOUND:</span>
                <span className="text-slate-200 font-medium">{specimen.biochemistry.compound}</span>
              </div>
              <div>
                <span className="text-slate-500 block">CATALYTIC CO-FACTOR:</span>
                <span className="text-slate-200 font-medium">{specimen.biochemistry.coFactor}</span>
              </div>
              <div>
                <span className="text-slate-500 block">QUANTUM YIELD:</span>
                <span className="text-biolume-neon font-bold">{specimen.biochemistry.quantumYield}</span>
              </div>
              <div>
                <span className="text-slate-500 block">PRIMARY FUNCTION:</span>
                <span className="text-cyan-300 font-medium">{specimen.biochemistry.purpose}</span>
              </div>
            </div>
          </div>

          {/* Field Notes from Hadal Submersible Logs */}
          <div className="p-5 rounded-xl border border-slate-800 bg-abyss-950/40">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-slate-400 uppercase mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Submersible Log Excerpt // Dive Transcript</span>
            </div>
            <p className="font-sans text-sm text-slate-300 italic leading-relaxed font-light">
              "{specimen.fieldNotes}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
