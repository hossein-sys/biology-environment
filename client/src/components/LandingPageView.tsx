import React from 'react';
import {
  ShieldCheck,
  Building2,
  Droplets,
  Trash2,
  Wind,
  HeartHandshake,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  TrendingDown,
  Zap,
  Award,
  Trees,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  FileCheck2,
} from 'lucide-react';
import { Company } from '../types';

interface LandingPageViewProps {
  onOpenAuth: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToLeaderboard: () => void;
  onNavigateToRewards: () => void;
  topCompanies: Company[];
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  onOpenAuth,
  onNavigateToDashboard,
  onNavigateToLeaderboard,
  onNavigateToRewards,
  topCompanies,
}) => {
  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-emerald-50/40 to-white border border-emerald-100 p-8 sm:p-12 lg:p-16 shadow-xs text-center">
        {/* Soft emerald background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>طرح تحول محیط‌زیستی و اجرای ماده ۲۷ قانون مالیات بر ارزش افزوده</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-emerald-950 tracking-tight leading-tight sm:leading-tight">
            همزیستی پایدار صنعت و طبیعت در استان زنجان
          </h1>

          {/* Plain-Language Subheadline */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed sm:leading-relaxed max-w-3xl mx-auto font-normal">
            سامانه رسمی ثبت اقدامات محیط‌زیستی صنایع و معادن استان زنجان. فعالیت‌های سبز، کاهش آلایندگی و پروژه‌های مسئولیت اجتماعی (CSR) شرکت خود را ثبت کنید، امتیاز بگیرید و از تخفیف‌ها و معافیت‌های قانونی عوارض آلایندگی بهره‌مند شوید.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md shadow-emerald-600/25 transition-all hover:scale-102 cursor-pointer"
            >
              <span>ثبت‌نام و ورود صنایع</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold border border-slate-200 shadow-xs transition-all hover:border-emerald-300 cursor-pointer"
            >
              <span>راهنمای گام‌به‌گام و مزایا</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Live Trust Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-emerald-100/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-right sm:text-center">
            <div className="p-4 rounded-2xl bg-white/70 border border-emerald-100/60 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium block">شهرستان‌های تحت پوشش</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-900 font-vazir">۸ شهرستان</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">زنجان، ماهنشان، ابهر، طارم و...</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-emerald-100/60 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium block">پسماند و باطله خنثی‌شده</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-900 font-vazir">۳۴,۲۵۰ تن</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">سد باطله دندی و شهرک روی</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-emerald-100/60 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium block">آب و پساب بازچرخانی‌شده</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-900 font-vazir">۸۱,۵۰۰ م³</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">حفاظت از حوضه قزل‌اوزن</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 border border-emerald-100/60 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium block">واحدهای صنعتی ثبت‌شده</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-900 font-vazir">۴ واحد ممتاز</span>
              <span className="text-[10px] text-emerald-600 block mt-0.5">دارای گواهینامه معتبر ماده ۲۷</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (چگونه کار می‌کند؟) */}
      <section id="how-it-works" className="space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            مسیر ساده ۴ مرحله‌ای
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950">
            سامانه چگونه کار می‌کند؟
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            از ثبت واحد صنعتی تا صدور گواهینامه رسمی و دریافت معافیت مالیاتی، روندی کاملاً شفاف و دیجیتال
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-xs hover:shadow-md transition-all space-y-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-lg border border-emerald-200">
              ۱
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              احراز هویت و ثبت واحد صنعتی
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ثبت‌نام کارخانه یا معدن با شناسه ملی، تعیین شهرستان استقرار، رسته صنعتی و معرفی نماینده رسمی محیط‌زیست شرکت.
            </p>
            <div className="text-[11px] text-emerald-700 font-semibold pt-1">
              مدت زمان: کمتر از ۲ دقیقه
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-xs hover:shadow-md transition-all space-y-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-lg border border-emerald-200">
              ۲
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              ثبت فعالیت‌ها و اثرات مثبت
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ثبت اقدامات دوره‌ای در ۴ حوزه پسماند، بازچرخانی آب، کنترل غبار و مسئولیت اجتماعی همراه با پیوست نتایج آزمایشگاه معتمد.
            </p>
            <div className="text-[11px] text-emerald-700 font-semibold pt-1">
              ورود سنجه‌های کمی (تن، مترمکعب)
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-xs hover:shadow-md transition-all space-y-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-lg border border-emerald-200">
              ۳
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              پایش و امتیازدهی هوشمند
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              راستی‌آزمایی مستندات توسط کارشناسان اداره کل حفاظت محیط‌زیست و محاسبه سیستمی امتیاز انطباق (۰ تا ۱۰۰).
            </p>
            <div className="text-[11px] text-emerald-700 font-semibold pt-1">
              بر پایه فرمول کارگروه استانی
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-xs hover:shadow-md transition-all space-y-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-lg border border-amber-200">
              ۴
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              دریافت گواهی و تخفیف‌ها
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              صدور گواهینامه معتبر با QR Code و بن تخفیف ۵۰٪ تا ۱۰۰٪ عوارض آلایندگی موضوع ماده ۲۷ قانون مالیات بر ارزش افزوده.
            </p>
            <div className="text-[11px] text-amber-700 font-semibold pt-1">
              معافیت مالیاتی قابل استعلام
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE ENVIRONMENTAL PILLARS OF ZANJAN */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            برنامه عمل مصوب استان
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950">
            محورهای اولویت‌دار محیط‌زیستی استان زنجان
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            چه اقداماتی برای شرکت شما امتیاز انطباق و معافیت عوارض به همراه دارد؟
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-xs hover:border-emerald-300 transition-all space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
                <Trash2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                تا ۳۰ امتیاز ممیزی
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                ۱. مدیریت پسماند و باطله‌های سرب و روی
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ایزولاسیون کامل سدهای باطله با ورق‌های ژئوممبران، فعال‌سازی فیلترپرس و کیک‌گیری، جلوگیری از نفوذ فلزات سنگین (سرب، روی، کادمیوم) به آب‌های زیرزمینی دندی و شهرک تخصصی روی.
              </p>
            </div>
            <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>مستند قابل پذیرش: تاییدیه ناظر نظام مهندسی و عکس‌های UTM سد باطله</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-xs hover:border-emerald-300 transition-all space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-cyan-50 text-cyan-700 border border-cyan-200">
                <Droplets className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-800 border border-cyan-200">
                تا ۳۰ امتیاز ممیزی
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                ۲. حفاظت از منابع آب و شریان قزل‌اوزن
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                راه‌اندازی سیستم تخلیه مایع صفر (ZLD)، تصفیه و بازچرخانی بیش از ۶۰٪ پساب صنعتی به خطوط تولید، نصب کنتور هوشمند و جلوگیری مطلق از ورود پساب اسیدی به بستر رودخانه قزل‌اوزن.
              </p>
            </div>
            <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>مستند قابل پذیرش: نتایج آزمایشگاه معتمد درباره COD/BOD و فلزات محلول</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-xs hover:border-emerald-300 transition-all space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Wind className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                تا ۲۰ امتیاز ممیزی
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                ۳. احیای زیست‌بوم و کنترل گردوغبار
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                ارتقای راندمان بگ‌فیلترها و اسکرابرهای صنعتی به بالای ۹۰٪، تثبیت گرد و غبار دپوهای سیلیس و باطله، کاشت درختان بومی و توسعه کمربند سبز صنعتی در جوار چمن سلطانیه و دندی.
              </p>
            </div>
            <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>مستند قابل پذیرش: گزارش آنلاین خروجی دودکش و تاییدیه توسعه فضای سبز</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-xs hover:border-emerald-300 transition-all space-y-4">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-violet-50 text-violet-700 border border-violet-200">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-violet-50 text-violet-800 border border-violet-200">
                تا ۲۰ امتیاز ممیزی
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                ۴. مسئولیت اجتماعی (CSR) و آموزش
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                برگزاری دوره‌های تخصصی HSE و فرهنگ محیط‌زیست برای کارکنان، تخصیص بودجه مسئولیت اجتماعی جهت تجهیز درمانگاه‌ها و مدارس روستاهای مجاور معادن (انگوران، دندی، دیزج‌آباد).
              </p>
            </div>
            <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>مستند قابل پذیرش: لیست ساعات آموزشی و تاییدیه بخشداری منطقه</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INCENTIVES & DISCOUNTS SHOWCASE */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white space-y-8 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            طرح تشویق قانون‌محور
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            مزایا و جوایز پیش‌بینی شده برای صنایع سبز
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            کسب رتبه‌های طلایی و پلاتین علاوه بر حفظ سرمایه‌های طبیعی استان، بازدهی اقتصادی مستقیم برای کارخانه‌ها دارد:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 w-fit">
              <TrendingDown className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">معافیت عوارض آلایندگی</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              معافیت ۱۰۰٪ (پلاتین) یا تخفیف ۵۰٪ (طلا) از پرداخت عوارض سبز موضوع ماده ۲۷ قانون مالیات بر ارزش افزوده.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 w-fit">
              <Droplets className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">سهمیه تشویقی آب و انرژی</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              تخفیف در تعرفه انشعاب آب شهرک‌های صنعتی و اولویت در تخصیص پساب تصفیه شده جهت خنک‌کاری.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 w-fit">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">گواهینامه رسمی صنعت سبز</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              اعطای تندیس و گواهینامه معتبر اداره کل حفاظت محیط‌زیست استان با شناسه و QR Code استعلام کشوری.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
            <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300 w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">اولویت تمدید پروانه‌ها</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              تسهیل و تسریع در صدور مجوزهای توسعه خطوط تولید و موافقت‌نامه‌های زیست‌محیطی سازمان صمت استان.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
          <span className="text-xs text-slate-300">
            آیا واحد صنعتی شما در زنجان مستقر است و مایل به ارزیابی هستید؟
          </span>
          <button
            onClick={onNavigateToRewards}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <Award className="w-4 h-4" />
            مشاهده نمونه گواهینامه و بن تخفیف
          </button>
        </div>
      </section>

      {/* 5. MINI LEADERBOARD PREVIEW */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-emerald-950">
              صنایع سبز پیشتاز استان زنجان
            </h3>
            <p className="text-xs text-slate-500">
              واحدهای صنعتی پیشرو در کاهش آلایندگی و اجرای طرح صنعت سبز
            </p>
          </div>

          <button
            onClick={onNavigateToLeaderboard}
            className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold hover:text-emerald-800 cursor-pointer"
          >
            <span>مشاهده جدول کامل صنایع برتر</span>
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topCompanies.slice(0, 4).map((c, i) => (
            <div
              key={c._id}
              className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs hover:border-emerald-300 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400">رتبه #{i + 1}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  c.currentTier === 'platinum'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {c.currentTier === 'platinum' ? 'پلاتین برتر' : 'طلا'}
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 truncate">{c.name}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{c.countyFa} • {c.sector}</p>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">امتیاز انطباق:</span>
                  <span className="font-bold text-emerald-900 font-vazir">{c.currentScore} / ۱۰۰</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${c.currentScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
