import React, { useEffect, useRef, useState } from 'react';
import { STRATEGIC_CRISES } from '../data/zanjanPlanData';
import { soundEngine } from '../utils/soundEngine';
import { Scan, ShieldAlert, Activity, AlertTriangle, CheckCircle2, ChevronLeft } from 'lucide-react';

export const DeepDiveSplitScreen: React.FC = () => {
  const [activeCrisisIndex, setActiveCrisisIndex] = useState(0);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Monitor scroll focus to illuminate crisis paragraphs one by one
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(index)) {
            setActiveCrisisIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-25% 0px -35% 0px',
      threshold: 0.2,
    });

    paragraphRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 3D Sonar Hologram Canvas Animation for environmental terrain and crisis nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      angle += 0.012;
      const w = (canvas.width = canvas.parentElement?.clientWidth || 400);
      const h = (canvas.height = canvas.parentElement?.clientHeight || 450);

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(cx, cy) * 0.75;

      // Sonar concentric distance rings
      ctx.strokeStyle = 'rgba(16, 255, 160, 0.12)';
      ctx.lineWidth = 1;
      for (let r = 0.25; r <= 1.0; r += 0.25) {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Sonar Crosshairs
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Sweeping radar beam
      const beamGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      beamGradient.addColorStop(0, 'rgba(16, 255, 160, 0.35)');
      beamGradient.addColorStop(1, 'rgba(16, 255, 160, 0.0)');

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle, angle + 0.4);
      ctx.closePath();
      ctx.fillStyle = beamGradient;
      ctx.fill();
      ctx.restore();

      // 3D Terrain Elevation Contours (Topography of Zanjan)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.lineWidth = 1.2;
      const lines = 8;
      for (let i = 0; i < lines; i++) {
        const offset = (i - lines / 2) * 18;
        const wave = Math.sin(angle * 1.4 + i * 0.6) * 16;

        ctx.beginPath();
        for (let x = -radius * 0.8; x <= radius * 0.8; x += 12) {
          const profile = Math.cos((x / (radius * 0.8)) * Math.PI) * 45;
          const py = cy + offset + profile + wave;
          const px = cx + x;
          if (x === -radius * 0.8) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }

      // Reactive Hotspot Target Blip depending on activeCrisisIndex
      const targetAngle = angle * 0.75 + activeCrisisIndex * (Math.PI / 2);
      const targetDist = radius * (0.35 + (activeCrisisIndex % 3) * 0.2);
      const tx = cx + Math.cos(targetAngle) * targetDist;
      const ty = cy + Math.sin(targetAngle) * targetDist;

      ctx.beginPath();
      ctx.arc(tx, ty, 5, 0, Math.PI * 2);
      ctx.fillStyle = activeCrisisIndex === 0 ? '#ff4444' : '#10ffa0';
      ctx.shadowColor = activeCrisisIndex === 0 ? '#ff4444' : '#10ffa0';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Pulse ring around target
      const pulseSize = (Date.now() % 1600) / 1600;
      ctx.beginPath();
      ctx.arc(tx, ty, 6 + pulseSize * 20, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(16, 255, 160, ${1 - pulseSize})`;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [activeCrisisIndex]);

  const activeCrisis = STRATEGIC_CRISES[activeCrisisIndex] || STRATEGIC_CRISES[0];

  return (
    <section id="crises" className="relative py-28 bg-abyss-950 overflow-hidden border-t border-emerald-500/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 text-right">
          <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-emerald-400 uppercase mb-2">
            <Scan className="w-3.5 h-3.5" />
            <span>بخش ششم // تحلیل وضعیت موجود و ابرچالش‌های استان</span>
          </div>
          <h2 className="font-vazir text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight">
            کالبدشکافی ۴ ابرچالش
            <span className="italic block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-emerald-300 text-glow-neon">
              محیط‌زیستی استان زنجان
            </span>
          </h2>
          <p className="font-vazir text-slate-400 text-sm max-w-xl mt-4 font-light leading-relaxed">
            به موازات اسکرول به پایین، ابعاد هر ابرچالش روشن می‌گردد. رادار هولوگرافیک سمت چپ، کانون جغرافیایی و شاخص‌های حیاتی هر بحران را به صورت برخط رهگیری می‌کند.
          </p>
        </div>

        {/* Sticky Split-Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          {/* Sticky Left Column: Sonar Hologram & Active Telemetry HUD */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 z-20">
            <div className="rounded-2xl border border-emerald-500/30 bg-abyss-900/85 backdrop-blur-xl p-6 shadow-[0_0_40px_rgba(16,255,160,0.15)] relative overflow-hidden text-right font-vazir">
              {/* Top HUD */}
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10ffa0] animate-pulse" />
                  <span className="font-mono text-xs text-emerald-300 font-bold tracking-wider">
                    ECO-RADAR // ZANJAN
                  </span>
                </div>
                <span className="font-mono text-xs text-slate-400">
                  {activeCrisis.code}
                </span>
              </div>

              {/* Holographic Radar Canvas */}
              <div className="relative w-full h-72 sm:h-80 flex items-center justify-center bg-abyss-950/90 rounded-xl overflow-hidden border border-slate-800">
                <canvas ref={canvasRef} className="w-full h-full" />
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-emerald-400/90 tracking-wider bg-abyss-950/90 px-2.5 py-1 rounded border border-emerald-500/20">
                  مختصات کانون: {activeCrisis.location}
                </div>
              </div>

              {/* Active Crisis Info Panel */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-amber-400 tracking-wider">
                    وضعیت: {activeCrisis.status}
                  </span>
                  <span className="font-vazir text-xs text-slate-400">
                    ابرچالش ۰{activeCrisisIndex + 1} از ۰۴
                  </span>
                </div>
                <h4 className="text-base sm:text-lg text-white font-bold leading-snug">
                  {activeCrisis.title}
                </h4>

                {/* Impact Metric Chips */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-500/15">
                  {activeCrisis.impactStats.map((stat, idx) => (
                    <div key={idx} className="p-2 rounded bg-abyss-950/80 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-light">{stat.label}</span>
                      <span className="text-xs font-mono text-emerald-300 font-bold">
                        {stat.value} {stat.unit || ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scrolling Right Column: Scroll-Focus Illuminated Paragraphs */}
          <div className="lg:col-span-7 space-y-24 py-6 text-right font-vazir">
            {STRATEGIC_CRISES.map((crisis, index) => {
              const isFocused = index === activeCrisisIndex;
              return (
                <div
                  key={crisis.id}
                  data-index={index}
                  ref={(el) => {
                    paragraphRefs.current[index] = el;
                  }}
                  onClick={() => {
                    soundEngine.playHydroClick();
                    setActiveCrisisIndex(index);
                  }}
                  data-cursor-action="بحران"
                  className={`relative p-8 rounded-2xl border transition-all duration-700 cursor-pointer ${
                    isFocused
                      ? 'bg-abyss-900/95 border-emerald-400 shadow-[0_0_35px_rgba(16,255,160,0.2)] text-white scale-[1.01]'
                      : 'bg-abyss-900/30 border-slate-800/60 opacity-35 filter blur-[0.4px] hover:opacity-75 hover:blur-0'
                  }`}
                >
                  {/* Right luminous accent bar when active */}
                  {isFocused && (
                    <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-gradient-to-b from-emerald-400 to-cyan-400 rounded-r shadow-[0_0_12px_#10ffa0]" />
                  )}

                  {/* Header Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-emerald-400 font-bold tracking-wider">
                      {crisis.code}
                    </span>
                    <span className="font-vazir text-xs text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">
                      سطح: {crisis.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-2xl sm:text-3xl font-extrabold mb-3 leading-tight transition-colors ${
                    isFocused ? 'text-white' : 'text-slate-400'
                  }`}>
                    {crisis.title}
                  </h3>

                  {/* Subtitle / Lead */}
                  <p className={`text-base sm:text-lg mb-6 leading-relaxed font-medium ${
                    isFocused ? 'text-emerald-200' : 'text-slate-500'
                  }`}>
                    {crisis.subtitle}
                  </p>

                  {/* Summary Callout */}
                  <div className="p-4 rounded-xl border border-slate-800/80 bg-abyss-950/60 mb-6 text-sm text-slate-300 leading-relaxed font-light">
                    {crisis.summary}
                  </div>

                  {/* Detailed Analysis Points from PDF */}
                  <div className="space-y-4 text-sm sm:text-base leading-relaxed font-light">
                    {crisis.detailedAnalysis.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className={isFocused ? 'text-slate-300' : 'text-slate-500'}
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Mitigation Strategy */}
                  <div className="mt-8 pt-4 border-t border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-emerald-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold">راهکار راهبردی:</span>
                      <span className="text-slate-300 font-light">{crisis.mitigationStrategy}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
