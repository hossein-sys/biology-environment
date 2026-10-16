import React from 'react';
import {
  ShieldCheck,
  Building2,
  GraduationCap,
  Droplets,
  Trash2,
  Trees,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Users,
  Clock,
  MapPin,
  Award,
  Trophy,
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { Agency } from '../types/governmentalAgency';

interface GovernmentalLandingPageProps {
  onOpenAuth: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToLeaderboard: () => void;
  topAgencies: Agency[];
  stats: {
    totalHours: number;
    totalAudience: number;
    totalWorkshops: number;
    countiesCount: number;
    agenciesCount: number;
  };
}

export const GovernmentalLandingPage: React.FC<GovernmentalLandingPageProps> = ({
  onOpenAuth,
  onNavigateToDashboard,
  onNavigateToLeaderboard,
  topAgencies,
  stats,
}) => {
  return (
    <div className="space-y-16 lg:space-y-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-emerald-50/50 to-white dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-950 border border-emerald-100 dark:border-emerald-900/40 p-8 sm:p-12 lg:p-16 shadow-xs text-center transition-colors">
        {/* Soft background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-200/20 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200/80 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span>مصوب شورای فرهنگ عمومی استان زنجان و کارگروه ارتقای فرهنگ محیط‌زیست</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-emerald-950 dark:text-emerald-50 tracking-tight leading-tight sm:leading-snug">
            سامانه جامع ثبت و پایش اقدامات فرهنگی و ترویجی محیط‌زیست ادارات استان زنجان
          </h1>

          {/* Plain-Language Subheadline */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            بستر شفاف رصد دوره‌ها، کارگاه‌ها، پویش‌ها و ارزیابی اثربخشی عملکرد دستگاه‌های اجرایی در ارتقای فرهنگ زیست‌محیطی در ۸ شهرستان استان.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onNavigateToDashboard}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md shadow-emerald-600/25 transition-all hover:scale-102 cursor-pointer"
            >
              <span>ورود نمایندگان ادارات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToLeaderboard}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold border border-slate-200 dark:border-slate-700 shadow-xs transition-all hover:border-emerald-300 dark:hover:border-emerald-500 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>مشاهده رتبه‌بندی و جوایز دستگاه‌های برتر</span>
            </button>
          </div>

          {/* Live Trust Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-emerald-100 dark:border-emerald-900/40 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-right sm:text-center">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-100/70 dark:border-emerald-900/40 shadow-2xs">
              <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>مجموع ساعات آموزش</span>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-100 font-vazir">
                {stats.totalHours.toLocaleString('fa-IR')} ساعت
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block mt-0.5">آموزش رسمی تاییدشده</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-100/70 dark:border-emerald-900/40 shadow-2xs">
              <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>مخاطبان آموزش‌دیده</span>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-100 font-vazir">
                {stats.totalAudience.toLocaleString('fa-IR')} نفر
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block mt-0.5">دانش‌آموزان، معلمان، کشاورزان</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-100/70 dark:border-emerald-900/40 shadow-2xs">
              <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>کارگاه‌ها و پویش‌ها</span>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-100 font-vazir">
                {stats.totalWorkshops.toLocaleString('fa-IR')} رویداد
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block mt-0.5">میدانی، مدرسه‌ای و همایشی</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-100/70 dark:border-emerald-900/40 shadow-2xs">
              <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 text-xs mb-1">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>پوشش استانی</span>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-100 font-vazir">
                {stats.countiesCount.toLocaleString('fa-IR')} شهرستان
              </span>
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 block mt-0.5">زنجان، ماهنشان، طارم، ابهر و...</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUR CORE ENVIRONMENTAL PILLARS (بر اساس سند استانی) */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            چهار محور سند ارتقای فرهنگ محیط‌زیست زنجان
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-50">
            محورهای ارزیابی اقدامات فرهنگی و آموزشی ادارات
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            گزارش‌ها و رویدادهای ثبت‌شده توسط دستگاه‌های اجرایی در این چهار حوزه تخصصی دسته‌بندی و ممیزی می‌شوند:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                محور ۱: جامعه هدف گسترده
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                آموزش و توانمندسازی (مدارس، دانشگاه‌ها و جوامع محلی)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                تربیت معلمان و مربیان مروج محیط‌زیست، دوره‌های آموزشی ضمن‌خدمت کارکنان، کارگاه‌های علمی در دانشگاه زنجان، و نشست‌های گفتگوی نسلی با دانش‌آموزان پیرامون حفاظت از طبیعت بومی.
              </p>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>دستگاه‌های محوری: آموزش و پرورش، دانشگاه زنجان، فنی و حرفه‌ای</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                محور ۲: شریان حیاتی استان
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                صیانت از منابع آب و زیست‌بوم رودخانه قزل‌اوزن
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                آگاهی‌بخشی به کشاورزان و باغداران ماهنشان و طارم، تشریح عواقب اضافه برداشت، کارگاه‌های اصلاح الگوی کشت، و فرهنگ‌سازی سازگاری با کم‌آبی در دشت‌های بحرانی زنجان-ابهر.
              </p>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>دستگاه‌های محوری: شرکت آب منطقه‌ای، سازمان جهاد کشاورزی</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                <Trash2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                محور ۳: بهداشت عمومی و خاک
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                فرهنگ تفکیک پسماند و پیشگیری از آلودگی خاک و فلزات سنگین
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                ترویج تفکیک از مبدا در ادارات و محلات، ارتقای حساسیت عمومی نسبت به عدم رهاسازی پسماندهای خطرناک و باتری‌ها، و پویش‌های پاکسازی مبادی ورودی و فضاهای گردشگری شهرستان‌ها.
              </p>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>دستگاه‌های محوری: شهرداری‌های ۸‌گانه، بخشداری‌ها و دهیاری‌ها</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-slate-800 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
                <Trees className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                محور ۴: میراث طبیعی و تنوع زیستی
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                حفاظت از چمن تاریخی سلطانیه، مراتع و پناهگاه حیات وحش انگوران
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                ارتقای فرهنگ احترام به گونه‌های شاخص (کل و بز، قوچ و میش)، صیانت از چمن تاریخی سلطانیه در برابر چرای مفرط و فرسایش بادی، و جلب مشارکت جوامع محلی در پیشگیری از حریق مراتع.
              </p>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>دستگاه‌های محوری: اداره کل منابع طبیعی، حفاظت محیط‌زیست، میراث فرهنگی</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TOP AGENCIES & REWARDS PREVIEW */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white space-y-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            نظام تشویق و ارزیابی سالانه
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            دستگاه‌های پیشتاز و مشوق‌های رسمی کارگروه استانی
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            اداراتی که بالاترین اثربخشی، ساعات آموزشی و پوشش مخاطبان را ثبت کنند از امتیازات رسمی بهره‌مند می‌گردند:
          </p>
        </div>

        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topAgencies.slice(0, 3).map((agency, index) => (
            <div
              key={agency._id}
              className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  رتبه {index + 1} استان
                </span>
                <span className="text-xs text-emerald-300 font-black font-vazir">
                  {agency.totalScore} امتیاز
                </span>
              </div>
              <h4 className="text-sm font-bold text-white truncate">{agency.name}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-2">
                {agency.description}
              </p>
              <div className="pt-2 border-t border-white/10 flex justify-between text-[11px] text-slate-400">
                <span>{agency.totalHours} ساعت آموزش</span>
                <span>{agency.totalAudience.toLocaleString('fa-IR')} مخاطب</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
          <span className="text-xs text-slate-300">
            مشوق‌های رسمی: اولویت تخصیص اعتبارات فرهنگی، معرفی در شبکه اشراق و جشنواره شهید رجایی
          </span>
          <button
            onClick={onNavigateToLeaderboard}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Award className="w-4 h-4" />
            مشاهده کامل جدول رتبه‌بندی و لوح تقدیر
          </button>
        </div>
      </section>
    </div>
  );
};
