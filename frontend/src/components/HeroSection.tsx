import React, { useEffect, useState } from 'react';
import { ArrowDown, Radio, ShieldAlert, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { MarineSnowCanvas } from './MarineSnowCanvas';
import { soundEngine } from '../utils/soundEngine';
import { PROVINCE_STATS } from '../data/zanjanPlanData';

export const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDescendClick = () => {
    soundEngine.playSonarPing();
    const targetEl = document.getElementById('governance');
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const zoomFactor = 1 + Math.min(scrollY * 0.0005, 0.25);
  const translateY = Math.min(scrollY * 0.25, 180);
  const textOpacity = Math.max(1 - scrollY * 0.002, 0);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-abyss-950 select-none pt-20 pb-16"
    >
      {/* Full-Bleed Parallax Cinematic Background with Atmospheric Overlay */}
      <div
        className="absolute inset-0 z-0 will-change-transform transition-transform duration-100 ease-out"
        style={{
          transform: `scale(${zoomFactor}) translateY(${translateY}px)`,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=2400&q=85"
          alt="زیست‌بوم کوهستانی و مراتع استان زنجان"
          className="w-full h-full object-cover object-center opacity-30 filter brightness-[0.55] contrast-[1.25] saturate-[1.3]"
        />
        {/* Deep Carbon & Biolume Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-abyss-950 via-abyss-950/75 to-abyss-950/45" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-abyss-950/60 to-abyss-950" />
      </div>

      {/* Environmental Particle Canvas (MarineSnow / Eco-Spores) */}
      <MarineSnowCanvas />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none z-10" />

      {/* Top Floating Telemetry Chips */}
      <div className="absolute top-24 right-6 sm:right-12 z-20 hidden md:block text-right">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px] tracking-wider">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>PROVINCE CODE: ZNJ-IR // 36°40′N 48°29′E</span>
        </div>
        <p className="font-vazir text-xs text-slate-400 mt-1">
          شمال‌غرب فلات ایران // مساحت: ۲۲٬۱۶۴ کیلومتر مربع
        </p>
      </div>

      <div className="absolute top-24 left-6 sm:left-12 z-20 hidden md:block text-left">
        <div className="text-amber-400 font-mono text-[11px] tracking-wider flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>INDUSTRIAL-ECOLOGICAL BALANCE // 1405-1409</span>
        </div>
        <p className="font-vazir text-xs text-slate-400 mt-1">
          همزیستی توسعه صنعتی با پایداری آب و خاک
        </p>
      </div>

      {/* Main Hero Content */}
      <div
        className="relative z-20 max-w-6xl mx-auto px-6 text-center flex flex-col items-center justify-center min-h-[85vh]"
        style={{ opacity: textOpacity }}
      >
        {/* Official Directive Tag */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-emerald-500/35 bg-abyss-900/80 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(16,255,160,0.15)]">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="font-vazir text-xs font-semibold text-emerald-300">
            سند مصوب شورای فرهنگ عمومی کشور // افق پنج‌ساله ۱۴۰۵ تا ۱۴۰۹
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>

        {/* Massive Editorial Headline */}
        <h1 className="font-vazir text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1] text-white font-extrabold mb-6">
          <span className="block drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
            برنامه عمل ارتقای فرهنگ
          </span>
          <span className="block italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 text-glow-neon font-bold mt-1">
            حفاظت از محیط‌زیست استان زنجان
          </span>
        </h1>

        {/* Vision Statement Quote */}
        <div className="max-w-4xl mx-auto my-4 p-5 sm:p-6 rounded-2xl border border-emerald-500/25 bg-abyss-900/70 backdrop-blur-lg shadow-2xl relative">
          <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-emerald-950 border border-emerald-400/50 text-[11px] font-vazir text-emerald-300 font-bold">
            چشم‌انداز راهبردی سند
          </div>
          <p className="font-vazir text-slate-200 text-sm sm:text-base md:text-lg leading-relaxed font-normal italic">
            «استان زنجان تا پایان افق اجرای این برنامه، نمونه‌ای از همزیستی پایدار میان توسعه صنعتی–معدنی و حفاظت از خاک، آب و تنوع زیستی در شمال‌غرب کشور خواهد بود؛ استانی که در آن فرهنگ محیط‌زیستی به ارزشی نهادینه‌شده در همه سطوح جامعه، صنعت، آموزش و حکمرانی تبدیل شده است.»
          </p>
        </div>

        {/* Telemetry Key Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-4xl my-8 border-y border-emerald-500/20 py-5 backdrop-blur-[2px]">
          <div className="p-2 sm:p-3 rounded-xl bg-abyss-950/60 border border-slate-800/80">
            <div className="font-mono text-xl sm:text-2xl font-bold text-emerald-400">۲۲٬۱۶۴</div>
            <div className="font-vazir text-[11px] text-slate-400 mt-0.5">کیلومتر مربع وسعت</div>
          </div>
          <div className="p-2 sm:p-3 rounded-xl bg-abyss-950/60 border border-slate-800/80">
            <div className="font-mono text-xl sm:text-2xl font-bold text-cyan-400">۱٬۰۵۷٬۴۶۱</div>
            <div className="font-vazir text-[11px] text-slate-400 mt-0.5">جمعیت هدف استان</div>
          </div>
          <div className="p-2 sm:p-3 rounded-xl bg-abyss-950/60 border border-slate-800/80">
            <div className="font-mono text-xl sm:text-2xl font-bold text-amber-400">۹٬۰۰۰٬۰۰۰+</div>
            <div className="font-vazir text-[11px] text-slate-400 mt-0.5">تن پسماند نیازمند مدیریت</div>
          </div>
          <div className="p-2 sm:p-3 rounded-xl bg-abyss-950/60 border border-slate-800/80">
            <div className="font-mono text-xl sm:text-2xl font-bold text-purple-400">۲۱۰٬۰۰۰</div>
            <div className="font-vazir text-[11px] text-slate-400 mt-0.5">دانش‌آموز سفیر محیط‌زیست</div>
          </div>
        </div>

        {/* Interactive Scroll to Explore Prompt */}
        <button
          onClick={handleDescendClick}
          data-cursor-action="کاوش"
          className="group relative flex flex-col items-center gap-2.5 transition-transform duration-300 hover:scale-105 mt-2"
        >
          <div className="relative w-12 h-12 rounded-full border border-emerald-400/40 bg-abyss-900/80 backdrop-blur-sm flex items-center justify-center group-hover:border-emerald-300 group-hover:shadow-[0_0_25px_rgba(16,255,160,0.4)] transition-all">
            <div className="absolute inset-0 rounded-full border border-emerald-400/20 animate-ping opacity-60" />
            <ArrowDown className="w-5 h-5 text-emerald-300 group-hover:translate-y-1 transition-transform" />
          </div>
          <span className="font-vazir text-xs font-semibold text-emerald-300 tracking-wider flex items-center gap-2">
            <span>اسکرول جهت ورود به ارکان اجرایی و ساختار برنامه</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </span>
        </button>
      </div>

      {/* Bottom Fade Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-abyss-950 to-transparent pointer-events-none z-10" />
    </section>
  );
};
