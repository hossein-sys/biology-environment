import React, { useState } from 'react';
import { RACI_MATRIX } from '../data/zanjanPlanData';
import { soundEngine } from '../utils/soundEngine';
import { Users, Layers, ShieldCheck, CheckCircle2, Building, GraduationCap, Factory, Droplets, Landmark } from 'lucide-react';

export const GovernanceRaciSection: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'committees' | 'raci'>('committees');
  const [activeCommitteeGroup, setActiveCommitteeGroup] = useState<'thematic' | 'audience' | 'thinktank'>('thematic');

  const handleTabChange = (tab: 'committees' | 'raci') => {
    setSelectedTab(tab);
    soundEngine.playHydroClick();
  };

  const getRaciBadge = (role: 'A' | 'R' | 'C' | 'I') => {
    switch (role) {
      case 'A':
        return <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-red-950/80 text-red-300 border border-red-500/40" title="Accountable: پاسخگوی نهایی دستاورد">A</span>;
      case 'R':
        return <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-emerald-950/80 text-emerald-300 border border-emerald-500/40" title="Responsible: مسئول مستقیم اجرا">R</span>;
      case 'C':
        return <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-cyan-950/80 text-cyan-300 border border-cyan-500/40" title="Consulted: مشاور تخصصی">C</span>;
      case 'I':
        return <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-slate-900 text-slate-400 border border-slate-700" title="Informed: مطلع و بهره‌بردار">I</span>;
    }
  };

  return (
    <section id="governance" className="relative py-28 bg-abyss-950 overflow-hidden border-t border-emerald-500/15">
      {/* Background glow ambience */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 border-b border-emerald-500/20 pb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>بخش سوم و چهارم // ساختار راهبری و ارکان اجرایی</span>
            </div>
            <h2 className="font-vazir text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight">
              ارکان راهبری و ماتریس
              <span className="italic block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 text-glow-neon">
                مسئولیت‌های بین‌دستگاهی (RACI)
              </span>
            </h2>
          </div>
          <p className="font-vazir text-slate-400 text-sm max-w-md leading-relaxed font-light">
            استقرار کارگروه استانی با ریاست استاندار زنجان، ۵ کمیته تخصصی موضوعی و ۵ کمیته مخاطب‌محور جهت تضمین اقدام عملیاتی یکپارچه در سطح استان.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={() => handleTabChange('committees')}
            data-cursor-action="کمیته‌ها"
            className={`px-5 py-2.5 rounded-xl font-vazir text-xs font-bold transition-all border ${
              selectedTab === 'committees'
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,255,160,0.25)]'
                : 'bg-abyss-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            ساختار کمیته‌های تخصصی و اتاق فکر
          </button>
          <button
            onClick={() => handleTabChange('raci')}
            data-cursor-action="RACI"
            className={`px-5 py-2.5 rounded-xl font-vazir text-xs font-bold transition-all border ${
              selectedTab === 'raci'
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,255,160,0.25)]'
                : 'bg-abyss-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            ماتریس تکالیف دستگاه‌ها (مدل RACI)
          </button>
        </div>

        {/* View 1: Committees Structure */}
        {selectedTab === 'committees' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Governance Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-emerald-500/25 bg-abyss-900/80 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block">باالاترین رکن تصمیم‌گیری</span>
                    <h3 className="font-vazir text-lg font-bold text-white">کارگروه استانی ارتقای فرهنگ حفاظت محیط‌زیست</h3>
                  </div>
                </div>
                <p className="font-vazir text-xs text-slate-300 leading-relaxed">
                  با ریاست <strong className="text-emerald-300">استاندار زنجان</strong> (یا معاون عمرانی) و دبیری <strong className="text-emerald-300">مدیرکل حفاظت محیط‌زیست استان</strong>. مسئول تصویب سالانه برنامه‌ها، رصد پیشرفت، تخصیص تکالیف دستگاه‌ها و رفع موانع اجرایی.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-cyan-500/25 bg-abyss-900/80 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block">بازوی اجرایی و هماهنگ‌کننده</span>
                    <h3 className="font-vazir text-lg font-bold text-white">دبیرخانه استانی برنامه</h3>
                  </div>
                </div>
                <p className="font-vazir text-xs text-slate-300 leading-relaxed">
                  مستقر در <strong className="text-cyan-300">اداره‌کل حفاظت محیط‌زیست استان زنجان</strong> (زیر نظر مسئول آموزش و مشارکت‌های مردمی). وظیفه پیگیری روزمره، ابلاغ مصوبات، تحلیل داده‌های پایش و گزارش‌دهی فصلی به کارگروه ملی.
                </p>
              </div>
            </div>

            {/* Committee Group Sub-tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-3">
              <button
                onClick={() => { setActiveCommitteeGroup('thematic'); soundEngine.playHydroClick(); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-vazir transition-colors ${
                  activeCommitteeGroup === 'thematic' ? 'bg-slate-800 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                ۵ کمیته تخصصی موضوعی
              </button>
              <button
                onClick={() => { setActiveCommitteeGroup('audience'); soundEngine.playHydroClick(); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-vazir transition-colors ${
                  activeCommitteeGroup === 'audience' ? 'bg-slate-800 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                ۵ کمیته تخصصی مخاطب‌محور
              </button>
              <button
                onClick={() => { setActiveCommitteeGroup('thinktank'); soundEngine.playHydroClick(); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-vazir transition-colors ${
                  activeCommitteeGroup === 'thinktank' ? 'bg-slate-800 text-emerald-300 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                اتاق فکر علمی و دانشگاهی
              </button>
            </div>

            {/* Group Content */}
            {activeCommitteeGroup === 'thematic' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-abyss-900/60 hover:border-emerald-500/40 transition-colors">
                  <div className="font-mono text-[10px] text-amber-400 mb-1">کمیته ۰۱</div>
                  <h4 className="font-vazir text-sm font-bold text-white mb-2">کمیته صنعت، معدن، پسماند و فلزات سنگین</h4>
                  <p className="font-vazir text-xs text-slate-400 leading-relaxed">
                    تمرکز بر شهرک تخصصی روی، باطله‌های صنعتی و معدن انگوران (مسئولیت سازمان صمت و همکاری انجمن سرب و روی).
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-abyss-900/60 hover:border-emerald-500/40 transition-colors">
                  <div className="font-mono text-[10px] text-cyan-400 mb-1">کمیته ۰۲</div>
                  <h4 className="font-vazir text-sm font-bold text-white mb-2">کمیته آب، قزل‌اوزن و کشاورزی پایدار</h4>
                  <p className="font-vazir text-xs text-slate-400 leading-relaxed">
                    احیای بوم‌سازگان قزل‌اوزن، تأمین حق‌آبه زیست‌محیطی و اصلاح الگوی مصرف دشت‌ها (مسئولیت شرکت آب منطقه‌ای و جهاد کشاورزی).
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-abyss-900/60 hover:border-emerald-500/40 transition-colors">
                  <div className="font-mono text-[10px] text-emerald-400 mb-1">کمیته ۰۳</div>
                  <h4 className="font-vazir text-sm font-bold text-white mb-2">کمیته مراتع، فرسایش خاک و چمن تاریخی سلطانیه</h4>
                  <p className="font-vazir text-xs text-slate-400 leading-relaxed">
                    حفظ بستر اکولوژیک سلطانیه و مهار فعال‌شدن کانون‌های ریزگرد داخلی (مسئولیت منابع طبیعی و میراث فرهنگی).
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-abyss-900/60 hover:border-emerald-500/40 transition-colors">
                  <div className="font-mono text-[10px] text-purple-400 mb-1">کمیته ۰۴</div>
                  <h4 className="font-vazir text-sm font-bold text-white mb-2">کمیته تنوع زیستی، اکوتوریسم و پناهگاه‌ها</h4>
                  <p className="font-vazir text-xs text-slate-400 leading-relaxed">
                    محوریت مناطق سرخ‌آباد، پناهگاه انگوران و شکارممنوع خرمنه‌سر طارم (مسئولیت اداره‌کل حفاظت محیط‌زیست).
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-abyss-900/60 hover:border-emerald-500/40 transition-colors sm:col-span-2 lg:col-span-2">
                  <div className="font-mono text-[10px] text-teal-400 mb-1">کمیته ۰۵</div>
                  <h4 className="font-vazir text-sm font-bold text-white mb-2">کمیته مدیریت پسماند شهری و روستایی</h4>
                  <p className="font-vazir text-xs text-slate-400 leading-relaxed">
                    تفکیک از مبدأ پسماند، کاهش مصرف پلاستیک در بازارها و دفن بهداشتی (مسئولیت شهرداری زنجان و امور روستایی استانداری).
                  </p>
                </div>
              </div>
            )}

            {activeCommitteeGroup === 'audience' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-slate-800 bg-abyss-900/60">
                  <div className="font-mono text-[10px] text-emerald-400 mb-1">مخاطب ۰۱</div>
                  <h4 className="font-vazir text-sm font-bold text-white mb-1">کودکان، نوجوانان و مدارس</h4>
                  <p className="font-vazir text-xs text-slate-400">برنامه‌ریزی برای ۲۱۰ هزار دانش‌آموز استان و مدارس سبز.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-abyss-900/60">
                  <div className="font-mono text-[10px] text-cyan-400 mb-1">مخاطب ۰۲</div>
                  <h4 className="font-vazir text-sm font-bold text-white mb-1">جوانان، دانشجویان و نخبگان</h4>
                  <p className="font-vazir text-xs text-slate-400">هدایت پایان‌نامه‌های مسئله‌محور استان در دانشگاه زنجان و علوم پایه.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-abyss-900/60">
                  <div className="font-mono text-[10px] text-purple-400 mb-1">مخاطب ۰۳</div>
                  <h4 className="font-vazir text-sm font-bold text-white mb-1">خانواده و بانوان</h4>
                  <p className="font-vazir text-xs text-slate-400">مدیریت مصرف آب خانگی و اصلاح سبد خرید با امور بانوان استانداری.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-abyss-900/60">
                  <div className="font-mono text-[10px] text-amber-400 mb-1">مخاطب ۰۴</div>
                  <h4 className="font-vazir text-sm font-bold text-white mb-1">کارگران و مدیران صنعتی-معدنی</h4>
                  <p className="font-vazir text-xs text-slate-400">توانمندسازی نیروی کار شاغل در صنایع سرب و روی در ایمنی محیط‌زیست.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-abyss-900/60 sm:col-span-2 lg:col-span-2">
                  <div className="font-mono text-[10px] text-teal-400 mb-1">مخاطب ۰۵</div>
                  <h4 className="font-vazir text-sm font-bold text-white mb-1">کشاورزان، صیادان و جوامع محلی</h4>
                  <p className="font-vazir text-xs text-slate-400">اولویت روستاهای مجاور کانون روی (سردهات و ده‌شیر) و حاشیه قزل‌اوزن.</p>
                </div>
              </div>
            )}

            {activeCommitteeGroup === 'thinktank' && (
              <div className="p-6 rounded-2xl border border-emerald-500/30 bg-abyss-900/90 text-right space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                  <GraduationCap className="w-4 h-4" />
                  <span>اتاق فکر تخصصی–مشورتی استان (مغز متفکر کارگروه)</span>
                </div>
                <h4 className="font-vazir text-lg font-bold text-white">
                  حضور دانشگاه زنجان، مرکز تحصیلات تکمیلی علوم پایه (IASBS)، دانشگاه علوم پزشکی و سمن‌ها
                </h4>
                <p className="font-vazir text-sm text-slate-300 leading-relaxed font-light">
                  بررسی موشکافانه علمی طرح‌ها پیش از ورود به صحن کارگروه، پایش کانون‌های آلودگی خاک و فلزات سنگین، طراحی بسته‌های فناورانه تغییر رفتار، و ارائه راهکارهای بدیع برای آشتی صنعت و محیط‌زیست.
                </p>
              </div>
            )}
          </div>
        )}

        {/* View 2: Full RACI Matrix */}
        {selectedTab === 'raci' && (
          <div className="bg-abyss-900/90 border border-emerald-500/25 rounded-2xl p-6 overflow-hidden shadow-2xl animate-in fade-in duration-300">
            {/* RACI Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-800 text-xs font-vazir">
              <span className="text-slate-400 font-bold">راهنمای حروف در ماتریس مسئولیت‌ها:</span>
              <div className="flex flex-wrap gap-4 font-mono text-xs">
                <span className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 rounded bg-red-950 text-red-300 font-bold border border-red-500/40">A</span> پاسخگوی نهایی (Accountable)</span>
                <span className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/40">R</span> مسئول مستقیم اجرا (Responsible)</span>
                <span className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/40">C</span> مشاور تخصصی (Consulted)</span>
                <span className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700">I</span> مطلع و بهره‌بردار (Informed)</span>
              </div>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="border-b border-emerald-500/20 text-slate-400 font-vazir">
                    <th className="py-3 px-3">دستگاه اجرایی / نهاد</th>
                    <th className="py-3 px-2 text-center">آموزش مدارس</th>
                    <th className="py-3 px-2 text-center">آب و قزل‌اوزن</th>
                    <th className="py-3 px-2 text-center">CSR سرب و روی</th>
                    <th className="py-3 px-2 text-center">پسماند و تفکیک</th>
                    <th className="py-3 px-2 text-center">چمن سلطانیه</th>
                    <th className="py-3 px-2 text-center">تنوع انگوران</th>
                    <th className="py-3 px-2 text-center">رسانه و مجازی</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-vazir">
                  {RACI_MATRIX.map((item, idx) => (
                    <tr key={idx} className="hover:bg-abyss-800/50 transition-colors">
                      <td className="py-3.5 px-3 font-semibold text-slate-200">{item.entity}</td>
                      <td className="py-3.5 px-2 text-center">{getRaciBadge(item.education)}</td>
                      <td className="py-3.5 px-2 text-center">{getRaciBadge(item.waterQezelOzan)}</td>
                      <td className="py-3.5 px-2 text-center">{getRaciBadge(item.leadZincCsr)}</td>
                      <td className="py-3.5 px-2 text-center">{getRaciBadge(item.wasteSorting)}</td>
                      <td className="py-3.5 px-2 text-center">{getRaciBadge(item.soltaniyehDust)}</td>
                      <td className="py-3.5 px-2 text-center">{getRaciBadge(item.anguranBiodiversity)}</td>
                      <td className="py-3.5 px-2 text-center">{getRaciBadge(item.mediaVirtualSpace)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
