import React, { useRef, useState } from 'react';
import { COUNTY_PROGRAMS } from '../data/zanjanPlanData';
import { CountyProgram } from '../types/zanjanPlan';
import { CountyDetailModal } from './CountyDetailModal';
import { soundEngine } from '../utils/soundEngine';
import { ChevronRight, ChevronLeft, MapPin, ExternalLink, AlertTriangle, ShieldCheck, Layers } from 'lucide-react';

export const CountyArchiveGallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<CountyProgram | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.abs(scrollLeft) / maxScroll);
    }
  };

  const scrollByAmount = (direction: 'right' | 'left') => {
    soundEngine.playHydroClick();
    if (!scrollContainerRef.current) return;
    // In RTL, positive/negative scroll depends on browser implementation; scrollBy with smooth handles offset
    const amount = direction === 'left' ? -460 : 460;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

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

  const getThreatBadge = (level: 'بحرانی' | 'بالا' | 'متوسط') => {
    switch (level) {
      case 'بحرانی':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-vazir font-bold bg-red-950/80 text-red-300 border border-red-500/40">بحرانی</span>;
      case 'بالا':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-vazir font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40">تهدید بالا</span>;
      case 'متوسط':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-vazir font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">متوسط</span>;
    }
  };

  return (
    <section id="counties" className="relative py-28 bg-abyss-950 overflow-hidden select-none border-t border-emerald-500/15">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[350px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-emerald-400 uppercase mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>بخش نهم // برنامه‌های ویژه شهرستان‌های هشت‌گانه</span>
            </div>
            <h2 className="font-vazir text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight">
              اطلس راهبردی و کانون‌های
              <span className="italic block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 text-glow-neon">
                بحران محیط‌زیست استان زنجان
              </span>
            </h2>
          </div>

          {/* Controls: Prev/Next & Drag indicator */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-vazir text-slate-500">
              <span>جهت مرور افقی، بکشید یا اسکرول کنید</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByAmount('right')}
                data-cursor-action="بعدی"
                aria-label="شهرستان‌های بعدی"
                className="w-11 h-11 rounded-full border border-emerald-500/30 bg-abyss-900/80 flex items-center justify-center text-slate-300 hover:text-emerald-300 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,255,160,0.3)] transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollByAmount('left')}
                data-cursor-action="قبلی"
                aria-label="شهرستان‌های قبلی"
                className="w-11 h-11 rounded-full border border-emerald-500/30 bg-abyss-900/80 flex items-center justify-center text-slate-300 hover:text-emerald-300 hover:border-emerald-400 hover:shadow-[0_0_15px_rgba(16,255,160,0.3)] transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress track bar */}
        <div className="mt-8 w-full h-[2px] bg-slate-800/80 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-l from-emerald-400 to-cyan-400 shadow-[0_0_8px_#10ffa0] transition-all duration-150"
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
        {COUNTY_PROGRAMS.map((county, idx) => (
          <article
            key={county.id}
            onClick={() => {
              if (!isDragging) {
                soundEngine.playSonarPing();
                setSelectedCounty(county);
              }
            }}
            data-cursor-action="پرونده"
            style={{ scrollSnapAlign: 'start' }}
            className="flex-shrink-0 w-[320px] sm:w-[400px] md:w-[450px] rounded-2xl bg-abyss-900/90 border border-emerald-500/20 hover:border-emerald-400/80 p-6 flex flex-col justify-between group transition-all duration-500 hover:shadow-[0_0_40px_rgba(16,255,160,0.2)] hover:-translate-y-2 relative overflow-hidden backdrop-blur-md font-vazir"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-20 -left-20 w-44 h-44 bg-emerald-400/10 rounded-full blur-[60px] group-hover:bg-emerald-400/20 transition-all pointer-events-none" />

            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/70 text-emerald-300 font-bold tracking-wider">
                  {county.code}
                </span>
                <div className="flex items-center gap-2">
                  {getThreatBadge(county.threatLevel)}
                  <span className="font-mono text-xs text-slate-500">
                    ۰{idx + 1} // ۰۸
                  </span>
                </div>
              </div>

              {/* County Image */}
              <div className="relative w-full h-52 sm:h-60 rounded-xl overflow-hidden mb-5 bg-abyss-950 border border-slate-800 group-hover:border-emerald-500/40 transition-colors">
                <img
                  src={county.image}
                  alt={county.name}
                  className="w-full h-full object-cover object-center filter brightness-[0.7] contrast-[1.15] group-hover:scale-108 group-hover:brightness-90 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss-900 via-transparent to-transparent opacity-90" />

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-abyss-950/90 border border-emerald-500/30 backdrop-blur-sm text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{county.nickname}</span>
                </div>
              </div>

              {/* Title & Issue */}
              <h3 className="text-2xl sm:text-3xl text-white font-extrabold group-hover:text-emerald-200 transition-colors leading-tight mb-2">
                {county.name}
              </h3>

              <div className="p-3 rounded-lg border border-red-500/20 bg-red-950/15 text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                <strong className="text-red-400 block mb-0.5">مسئله محوری:</strong>
                {county.focalIssue}
              </div>

              <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-950/15 text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                <strong className="text-emerald-400 block mb-0.5">اقدام اولویت‌دار:</strong>
                {county.priorityAction}
              </div>
            </div>

            {/* Bottom Meta & CTA */}
            <div className="border-t border-emerald-500/15 pt-4">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-3">
                <span>مساحت: {county.area}</span>
                <span>جمعیت: {county.population}</span>
              </div>

              <div className="flex items-center justify-between text-xs font-vazir text-emerald-400 group-hover:text-emerald-300 transition-colors">
                <span className="font-bold flex items-center gap-1">
                  مشاهده تکالیف تفصیلی شهرستان
                </span>
                <ExternalLink className="w-4 h-4 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* County Detail Modal */}
      <CountyDetailModal
        county={selectedCounty}
        onClose={() => setSelectedCounty(null)}
      />
    </section>
  );
};
