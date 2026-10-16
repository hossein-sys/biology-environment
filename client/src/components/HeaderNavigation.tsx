import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Radio, Menu, X, ArrowDown, Leaf, ShieldAlert } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface HeaderNavigationProps {
  scrollProgress: number;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ scrollProgress }) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const state = soundEngine.toggleSound();
    setIsAudioActive(state);
  };

  const navLinks = [
    { label: '۰۱. چشم‌انداز و کلیات', href: '#hero' },
    { label: '۰۲. ساختار راهبری و RACI', href: '#governance' },
    { label: '۰۳. اطلس ۸ شهرستان', href: '#counties' },
    { label: '۰۴. تحلیل ۴ ابرچالش', href: '#crises' },
    { label: '۰۵. اقدامات SMART و KPI', href: '#operations' },
    { label: '۰۶. پیوست‌ها و رصد میدانی', href: '#annexes' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    soundEngine.playHydroClick();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-abyss-950/90 backdrop-blur-md border-b border-emerald-500/20 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.85)]'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Official Title */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className="group flex items-center gap-3 text-slate-100"
            data-cursor-action="آغاز"
          >
            <div className="relative w-9 h-9 rounded-full border border-emerald-400/50 flex items-center justify-center bg-emerald-950/40 group-hover:border-emerald-300 transition-colors">
              <Leaf className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10ffa0] absolute -top-0.5 -right-0.5 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-vazir text-xs font-bold text-emerald-400 tracking-wide">
                  برنامه عمل حفاظت محیط‌زیست
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  استان زنجان
                </span>
              </div>
              <span className="font-mono text-[11px] text-slate-400 block -mt-0.5">
                افق ۱۴۰۵ — ۱۴۰۹ // مصوبه ۸۱۴ شورای فرهنگ عمومی
              </span>
            </div>
          </a>
        </div>

        {/* Live Telemetry Progress (Center) */}
        <div className="hidden xl:flex items-center gap-6 px-4 py-1.5 rounded-full border border-emerald-500/25 bg-abyss-900/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-vazir text-xs text-slate-400">
              وسعت:
            </span>
            <span className="font-mono text-xs text-emerald-300 font-bold tabular-nums">
              ۲۲٬۱۶۴ ک.م²
            </span>
          </div>
          <div className="w-[1px] h-3 bg-emerald-500/25" />
          <div className="flex items-center gap-2">
            <span className="font-vazir text-xs text-slate-400">
              شهرستان‌ها:
            </span>
            <span className="font-mono text-xs text-cyan-300 font-bold">
              ۸ کانون راهبردی
            </span>
          </div>
          <div className="w-[1px] h-3 bg-emerald-500/25" />
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-vazir text-xs text-slate-400">
              پسماند روی:
            </span>
            <span className="font-mono text-xs text-amber-300 font-bold tabular-nums">
              ۹ میلیون تن
            </span>
          </div>
        </div>

        {/* Nav Links + Soundscape Switch */}
        <div className="flex items-center gap-3">
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                data-cursor-action="بخش"
                className="font-vazir text-xs text-slate-300 hover:text-emerald-300 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Soundscape Synthesizer Button */}
          <button
            onClick={handleToggleAudio}
            data-cursor-action="صدا"
            aria-label="تغییر وضعیت صدای زمینه محیطی"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-vazir transition-all duration-300 border ${
              isAudioActive
                ? 'border-emerald-400/80 bg-emerald-950/60 text-emerald-300 shadow-[0_0_15px_rgba(16,255,160,0.3)]'
                : 'border-slate-800 bg-abyss-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline font-mono text-[11px]">SONAR ACTIVE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">صوت محیطی</span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
            aria-label="منوی ناوبری"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-abyss-950/98 border-b border-emerald-500/30 px-6 py-6 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20 text-xs font-vazir text-emerald-400">
              <span>وسعت استان: ۲۲٬۱۶۴ ک.م²</span>
              <span>افق اجرایی: ۱۴۰۵ تا ۱۴۰۹</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="font-vazir text-sm text-slate-300 hover:text-emerald-300 py-1 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowDown className="w-3.5 h-3.5 text-emerald-400/60" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
