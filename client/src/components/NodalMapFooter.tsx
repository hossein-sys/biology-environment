import React, { useState, useEffect, useRef } from 'react';
import { COUNTY_PROGRAMS, SEASONAL_EVENTS, OFFICIAL_ANNEXES } from '../data/zanjanPlanData';
import { soundEngine } from '../utils/soundEngine';
import { MapPin, ArrowUp, Globe, FileText, Calendar, Radio, CheckSquare, X } from 'lucide-react';

export const NodalMapFooter: React.FC = () => {
  const [selectedCounty, setSelectedCounty] = useState(COUNTY_PROGRAMS[0]);
  const [activeAnnexModal, setActiveAnnexModal] = useState<typeof OFFICIAL_ANNEXES[0] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const scrollToTop = () => {
    soundEngine.playSonarPing();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Interactive Nodal Mesh Canvas Animation for Zanjan Counties
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    // Coordinate percentage mapping for Zanjan geography
    const nodeCoords = [
      { id: 'county-zanjan', x: 50, y: 40, name: 'زنجان' },
      { id: 'county-mahneshan', x: 22, y: 35, name: 'ماهنشان' },
      { id: 'county-soltaniyeh', x: 62, y: 52, name: 'سلطانیه' },
      { id: 'county-tarom', x: 65, y: 18, name: 'طارم' },
      { id: 'county-abhar', x: 82, y: 65, name: 'ابهر' },
      { id: 'county-khorramdarreh', x: 75, y: 60, name: 'خرمدره' },
      { id: 'county-khodabandeh', x: 42, y: 75, name: 'خدابنده' },
      { id: 'county-ijrud', x: 38, y: 52, name: 'ایجرود' },
    ];

    const render = () => {
      t += 0.02;
      const w = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const h = (canvas.height = canvas.parentElement?.clientHeight || 360);

      ctx.clearRect(0, 0, w, h);

      const points = nodeCoords.map((n) => ({
        id: n.id,
        x: (n.x / 100) * w,
        y: (n.y / 100) * h,
        name: n.name,
      }));

      // Ecological Corridors / River Vector Paths
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p1 = points[i];
          const p2 = points[j];

          // Draw dashed ecological connectivity lines
          ctx.beginPath();
          ctx.setLineDash([4, 6]);
          ctx.strokeStyle = 'rgba(16, 255, 160, 0.18)';
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.setLineDash([]);

          // Animated energy pulse along corridor
          const progress = (t + (i + j) * 0.35) % 1;
          const px = p1.x + (p2.x - p1.x) * progress;
          const py = p1.y + (p2.y - p1.y) * progress;

          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = '#00f0ff';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw county node markers
      points.forEach((pt) => {
        const isSelected = pt.id === selectedCounty.id;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isSelected ? 12 : 7, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? 'rgba(16, 255, 160, 0.3)' : 'rgba(16, 255, 160, 0.1)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isSelected ? 4.5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#10ffa0' : '#64748b';
        if (isSelected) {
          ctx.shadowColor = '#10ffa0';
          ctx.shadowBlur = 10;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [selectedCounty]);

  return (
    <footer id="annexes" className="relative bg-abyss-950 text-slate-300 border-t border-emerald-500/20 pt-24 pb-12 overflow-hidden select-none font-vazir text-right">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 border-b border-emerald-500/15 pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-emerald-400 uppercase mb-2">
              <Globe className="w-3.5 h-3.5" />
              <span>بخش یازدهم و پیوست‌ها // شبکه بوم‌شناختی و کارتابل رصد میدانی</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight">
              شبکه کریدورهای زیستی
              <span className="italic block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300 text-glow-neon">
                و پیوست‌های چهارگانه سند
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400">
              ارتباط شبکه‌ای ۸ شهرستان // پایش آنلاین پیوست‌های مصوب
            </span>
          </div>
        </div>

        {/* Interactive Nodal Map Canvas & Station Details */}
        <div className="bg-abyss-900/80 border border-emerald-500/25 rounded-2xl p-6 sm:p-8 backdrop-blur-xl mb-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Canvas Map */}
            <div className="lg:col-span-8 relative h-72 sm:h-80 md:h-96 rounded-xl overflow-hidden bg-abyss-950 border border-emerald-500/20">
              <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />

              <div className="absolute top-4 right-4 font-mono text-[10px] text-emerald-400 tracking-wider bg-abyss-950/80 px-2.5 py-1 rounded border border-emerald-500/20">
                نقشه شبکه‌ای ۸ شهرستان و شریان قزل‌اوزن
              </div>
            </div>

            {/* Selected County Telemetry Card */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                انتخاب شهرستان روی نقشه:
              </div>

              {/* County Quick Buttons */}
              <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto no-scrollbar">
                {COUNTY_PROGRAMS.map((county) => {
                  const isCurrent = county.id === selectedCounty.id;
                  return (
                    <button
                      key={county.id}
                      onClick={() => {
                        soundEngine.playHydroClick();
                        setSelectedCounty(county);
                      }}
                      data-cursor-action="انتخاب"
                      className={`text-right p-2.5 rounded-lg border transition-all text-xs font-vazir flex items-center justify-between ${
                        isCurrent
                          ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200 shadow-[0_0_12px_rgba(16,255,160,0.2)]'
                          : 'bg-abyss-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <span className="font-bold truncate">{county.name}</span>
                      <span className="text-[10px] font-mono text-emerald-400">{county.code}</span>
                    </button>
                  );
                })}
              </div>

              {/* County Brief Card */}
              <div className="mt-3 p-4 rounded-xl border border-emerald-500/20 bg-abyss-950/90 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-300">{selectedCounty.name}</span>
                  <span className="text-[10px] text-amber-400">{selectedCounty.threatLevel}</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-light text-[11px]">
                  {selectedCounty.priorityAction}
                </p>
                <div className="text-slate-500 font-mono text-[10px] pt-1 border-t border-slate-800">
                  مختصات: {selectedCounty.coordinates}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Official Annexes Cards (Pages 39-42) */}
        <div className="mb-20">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase mb-4 font-bold">
            <FileText className="w-4 h-4" />
            <span>پیوست‌های مصوب سند کارگروه ارتقای فرهنگ حفاظت از محیط‌زیست استان زنجان</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {OFFICIAL_ANNEXES.map((annex) => (
              <div
                key={annex.id}
                onClick={() => {
                  soundEngine.playHydroClick();
                  setActiveAnnexModal(annex);
                }}
                data-cursor-action="پیوست"
                className="p-5 rounded-2xl border border-slate-800 bg-abyss-900/80 hover:border-emerald-500/40 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors leading-snug">
                    {annex.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light line-clamp-3">
                    {annex.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-bold flex items-center justify-between">
                  <span>مشاهده جزئیات فرم</span>
                  <span className="text-slate-500">←</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Standard Calendar Preview (Page 41) */}
        <div className="p-6 rounded-2xl border border-emerald-500/25 bg-abyss-900/60 backdrop-blur-xl mb-16">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs mb-4">
            <Calendar className="w-4 h-4" />
            <span>پیوست شماره ۳: تقویم زمانی استاندارد جلسات و رویدادهای فصلی استان زنجان</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {SEASONAL_EVENTS.map((ev) => (
              <div key={ev.season} className="p-4 rounded-xl border border-slate-800 bg-abyss-950/80 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-emerald-300">فصل {ev.season} ({ev.month})</span>
                  <span className="text-[10px] text-slate-500 font-mono">کارگروه فصلی</span>
                </div>
                <div className="text-slate-300 leading-relaxed text-[11px]">
                  <strong className="text-slate-400 block mb-0.5">دستور کار محوری:</strong>
                  {ev.agenda}
                </div>
                <div className="text-cyan-300 leading-relaxed text-[11px]">
                  <strong className="text-slate-400 block mb-0.5">رویداد میدانی:</strong>
                  {ev.fieldAction}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimalist Grid Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-t border-emerald-500/15 text-xs">
          <div>
            <h4 className="text-emerald-400 uppercase tracking-wider mb-4 font-bold">
              کانون‌های هشت‌گانه
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#counties" className="hover:text-emerald-300 transition-colors">شهرستان زنجان (بحران روی)</a></li>
              <li><a href="#counties" className="hover:text-emerald-300 transition-colors">شهرستان ماهنشان (معدن انگوران)</a></li>
              <li><a href="#counties" className="hover:text-emerald-300 transition-colors">شهرستان سلطانیه (چمن کهن)</a></li>
              <li><a href="#counties" className="hover:text-emerald-300 transition-colors">شهرستان طارم (پایین‌دست قزل‌اوزن)</a></li>
              <li><a href="#counties" className="hover:text-emerald-300 transition-colors">شهرستان ابهر، خرمدره، خدابنده و ایجرود</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-emerald-400 uppercase tracking-wider mb-4 font-bold">
              اسناد و ارکان راهبری
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#governance" className="hover:text-emerald-300 transition-colors">کارگروه استانی (ریاست استاندار)</a></li>
              <li><a href="#governance" className="hover:text-emerald-300 transition-colors">دبیرخانه (اداره‌کل محیط‌زیست)</a></li>
              <li><a href="#governance" className="hover:text-emerald-300 transition-colors">اتاق فکر علمی دانشگاه‌های استان</a></li>
              <li><a href="#governance" className="hover:text-emerald-300 transition-colors">ماتریس مسئولیت‌های RACI</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-emerald-400 uppercase tracking-wider mb-4 font-bold">
              محورهای عملیاتی سند
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#operations" className="hover:text-emerald-300 transition-colors">آموزش ۲۱۰ هزار دانش‌آموز استان</a></li>
              <li><a href="#operations" className="hover:text-emerald-300 transition-colors">مسئولیت اجتماعی (CSR) صنایع روی</a></li>
              <li><a href="#operations" className="hover:text-emerald-300 transition-colors">مطالبه حق‌آبه زیست‌محیطی قزل‌اوزن</a></li>
              <li><a href="#operations" className="hover:text-emerald-300 transition-colors">تفکیک از مبدأ پسماند در ۴۰٪ محلات</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-emerald-400 uppercase tracking-wider mb-4 font-bold">
              سامانه ثبت و صعود
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>سامانه مصوبات: فعال و برخط</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                همزیستی پایدار توسعه صنعتی-معدنی و حفاظت از آب و خاک در استان زنجان.
              </p>
              <button
                onClick={scrollToTop}
                data-cursor-action="صعود"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-emerald-400/40 bg-abyss-900 text-emerald-300 hover:bg-emerald-950/60 hover:border-emerald-300 transition-all text-xs font-bold"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>بازگشت به ابتدای سند</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            برنامه عمل ارتقای فرهنگ حفاظت از محیط‌زیست استان زنجان // افق ۱۴۰۵ تا ۱۴۰۹
          </div>
          <div className="flex items-center gap-4 font-vazir">
            <span>مصوب جلسه ۸۱۴ شورای فرهنگ عمومی کشور</span>
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            <span>اداره‌کل حفاظت محیط‌زیست استان زنجان</span>
          </div>
        </div>
      </div>

      {/* Annex Modal */}
      {activeAnnexModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 select-none font-vazir">
          <div
            className="fixed inset-0 bg-abyss-950/90 backdrop-blur-md"
            onClick={() => setActiveAnnexModal(null)}
          />
          <div className="relative w-full max-w-2xl bg-abyss-900 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 z-10 text-right space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
              <h3 className="text-base sm:text-lg font-bold text-white">
                {activeAnnexModal.title}
              </h3>
              <button
                onClick={() => setActiveAnnexModal(null)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-light">
              {activeAnnexModal.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 block">فیلدهای کاربرگ و فرم ثبت داده:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeAnnexModal.fields.map((f, i) => (
                  <div key={i} className="p-2.5 rounded-lg border border-slate-800 bg-abyss-950/80 text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-500 border-t border-slate-800 flex justify-between">
              <span>مرجع استقرار: دبیرخانه استانی</span>
              <span>قابل بارگذاری و ثبت در سامانه جامع</span>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
