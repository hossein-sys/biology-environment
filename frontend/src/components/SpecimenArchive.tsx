import React, { useRef, useState, useEffect } from 'react';
import { SPECIMENS } from '../data/abyssalData';
import { Specimen } from '../types/abyssal';
import { SpecimenModal } from './SpecimenModal';
import { soundEngine } from '../utils/soundEngine';
import { ChevronLeft, ChevronRight, Sparkles, ExternalLink, Activity, Disc } from 'lucide-react';

export const SpecimenArchive: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Monitor scroll progress for custom progress bar
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll);
    }
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    soundEngine.playHydroClick();
    if (!scrollContainerRef.current) return;
    const amount = direction === 'left' ? -460 : 460;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  // Mouse drag-to-scroll interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="archive" className="relative py-28 bg-abyss-950 overflow-hidden select-none border-t border-cyan-500/15">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[350px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-cyan-400 uppercase mb-2">
              <Disc className="w-3.5 h-3.5 animate-spin" />
              <span>CHAPTER 03 // BENTHIC SPECIMEN ARCHIVE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight">
              Colonies of the
              <span className="italic block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-biolume-neon">
                Abyssal Void
              </span>
            </h2>
          </div>

          {/* Controls: Prev/Next & Drag indicator */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-widest">
              <span>DRAG OR SCROLL HORIZONTALLY</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByAmount('left')}
                data-cursor-action="PREV"
                aria-label="Scroll specimens left"
                className="w-11 h-11 rounded-full border border-cyan-500/30 bg-abyss-900/80 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollByAmount('right')}
                data-cursor-action="NEXT"
                aria-label="Scroll specimens right"
                className="w-11 h-11 rounded-full border border-cyan-500/30 bg-abyss-900/80 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress track bar */}
        <div className="mt-8 w-full h-[2px] bg-slate-800/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-biolume-neon shadow-[0_0_8px_#00f0ff] transition-all duration-150"
            style={{ width: `${Math.max(scrollProgress * 100, 15)}%` }}
          />
        </div>
      </div>

      {/* Horizontal-Scrolling Card Gallery */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex gap-6 sm:gap-8 px-6 lg:px-12 overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing pb-8 pt-4 w-full"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {SPECIMENS.map((specimen, idx) => (
          <article
            key={specimen.id}
            onClick={() => {
              if (!isDragging) {
                soundEngine.playSonarPing();
                setSelectedSpecimen(specimen);
              }
            }}
            data-cursor-action="DOSSIER"
            style={{ scrollSnapAlign: 'start' }}
            className="flex-shrink-0 w-[310px] sm:w-[390px] md:w-[440px] rounded-2xl bg-abyss-900/90 border border-cyan-500/20 hover:border-cyan-400/80 p-6 flex flex-col justify-between group transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,240,255,0.25)] hover:-translate-y-2 relative overflow-hidden backdrop-blur-md"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-cyan-400/10 rounded-full blur-[60px] group-hover:bg-cyan-400/20 transition-all pointer-events-none" />

            {/* Top Card Telemetry Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/60 text-cyan-300 font-bold tracking-wider">
                  {specimen.catalogNumber}
                </span>
                <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                  HOLOTYPE 0{idx + 1} // 05
                </span>
              </div>

              {/* Specimen Visual Thumbnail with Dark Depth Filter */}
              <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden mb-5 bg-abyss-950 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                <img
                  src={specimen.image}
                  alt={specimen.scientificName}
                  className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.15] group-hover:scale-108 group-hover:brightness-95 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss-900 via-transparent to-transparent opacity-90" />

                {/* Spectral Emission Badge */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-abyss-950/90 border border-cyan-500/30 backdrop-blur-sm text-[11px] font-mono text-cyan-300 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{specimen.emissionWavelength}</span>
                </div>
              </div>

              {/* Organism Title */}
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal group-hover:text-cyan-200 transition-colors italic leading-tight">
                {specimen.scientificName}
              </h3>
              <p className="font-mono text-xs text-cyan-400/80 mb-3 tracking-wider">
                {specimen.commonName}
              </p>

              <p className="font-sans text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed font-light mb-6">
                {specimen.description}
              </p>
            </div>

            {/* Vital Statistics Tags Footer */}
            <div className="border-t border-cyan-500/15 pt-4">
              <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
                <div className="p-2 rounded bg-abyss-950/70 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">DEPTH STRATA:</span>
                  <span className="text-slate-200 font-semibold">{specimen.depthRange}</span>
                </div>
                <div className="p-2 rounded bg-abyss-950/70 border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">PRESSURE:</span>
                  <span className="text-biolume-neon font-semibold">{specimen.pressure}</span>
                </div>
              </div>

              {/* Inspect CTA */}
              <div className="flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300 transition-colors">
                <span className="tracking-widest uppercase flex items-center gap-1 font-semibold">
                  <span>INSPECT FULL DOSSIER</span>
                </span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Holotype Scientific Modal */}
      <SpecimenModal
        specimen={selectedSpecimen}
        onClose={() => setSelectedSpecimen(null)}
      />
    </section>
  );
};
