import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Printer,
  Sparkles,
  CheckCircle2,
  Tv,
  Coins,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { Agency, CommendationCertificate } from '../types/governmentalAgency';
import { agencyStorageService } from '../services/agencyStorage';

interface GovernmentalLeaderboardAndAwardsProps {
  agencies: Agency[];
  activeAgency: Agency;
  onRefreshData: () => void;
}

export const GovernmentalLeaderboardAndAwards: React.FC<GovernmentalLeaderboardAndAwardsProps> = ({
  agencies,
  activeAgency,
  onRefreshData,
}) => {
  const [selectedCert, setSelectedCert] = useState<CommendationCertificate | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>('spring1405');

  // Sorted agencies by score descending
  const sortedAgencies = [...agencies].sort((a, b) => b.totalScore - a.totalScore);

  const certificates = agencyStorageService.getCertificates();

  const handleIssueCertForCurrent = () => {
    const cert = agencyStorageService.issueCertificate(activeAgency);
    onRefreshData();
    setSelectedCert(cert);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* Top Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-black shadow-xs">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>ارزیابی دوره‌ای عملکرد دستگاه‌های اجرایی استان زنجان</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          جدول رده‌بندی ادارات و اعطای نشان‌های افتخار
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          بر اساس شاخص‌های برنامه عمل مصوب شورای فرهنگ عمومی، دستگاه‌هایی که بیشترین اثربخشی را در آموزش و صیانت از منابع طبیعی استان زنجان داشته‌اند مفتخر به دریافت لوح سپاس استانی می‌شوند.
        </p>
      </div>

      {/* Incentives & Perks Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 mb-1">
              اولویت اعتبارات فرهنگی
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              تخصیص سهم مضاعف از بودجه‌های فصل فرهنگ و آموزش استانی به دستگاه‌های حائز رتبه‌های اول تا سوم.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Tv className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 mb-1">
              معرفی در شبکه استانی اشراق
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              تولید مستندهای کوتاه و برنامه‌های زنده صدا و سیمای زنجان برای تجلیل از اقدامات شاخص ادارات برگزیده.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 mb-1">
              امتیاز جشنواره شهید رجایی
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ثبت حداکثر امتیاز شاخص‌های محیط‌زیستی در فرم‌های ارزیابی عملکرد سالانه مدیران دستگاه‌های اجرایی.
            </p>
          </div>
        </div>
      </div>

      {/* Main Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>جدول رتبه‌بندی ادارات کل و فرمانداری‌ها</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              محاسبه زنده بر اساس ساعت‌های آموزشی تایید شده، سنجش اثربخشی و نمرات کارگروه داوری
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2 pr-4 pl-9 rounded-xl outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="spring1405">دوره ارزیابی بهار ۱۴۰۵ (دوره جاری)</option>
                <option value="winter1404">کارنامه عملکرد سال ۱۴۰۴</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-5 text-center w-16">رتبه</th>
                <th className="py-3 px-4">دستگاه اجرایی / اداره کل</th>
                <th className="py-3 px-4">شهرستان و حوزه</th>
                <th className="py-3 px-4">ساعات تاییدشده</th>
                <th className="py-3 px-4">مخاطبان مستقیم</th>
                <th className="py-3 px-4">نشان افتخار اعطا شده</th>
                <th className="py-3 px-5 text-center">امتیاز نهایی</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {sortedAgencies.map((agency, index) => {
                const rankNum = index + 1;
                const isCurrent = agency._id === activeAgency._id;

                return (
                  <tr
                    key={agency._id}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-emerald-50/70 font-semibold'
                        : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="py-4 px-5 text-center">
                      {rankNum === 1 ? (
                        <div className="w-8 h-8 rounded-full bg-amber-400 text-white font-black flex items-center justify-center mx-auto shadow-sm">
                          ۱
                        </div>
                      ) : rankNum === 2 ? (
                        <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-700 font-black flex items-center justify-center mx-auto shadow-sm">
                          ۲
                        </div>
                      ) : rankNum === 3 ? (
                        <div className="w-8 h-8 rounded-full bg-amber-600/80 text-white font-black flex items-center justify-center mx-auto shadow-sm">
                          ۳
                        </div>
                      ) : (
                        <span className="font-bold text-slate-500 text-sm">
                          {rankNum}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 text-sm">
                          {agency.name}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                            دستگاه شما
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        رابط: {agency.liaisonOfficer.fullName}
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-800">
                        {agency.countyFa}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {agency.category}
                      </div>
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-800 text-sm">
                      {agency.totalHours}{' '}
                      <span className="text-xs text-slate-400 font-normal">
                        ساعت
                      </span>
                    </td>

                    <td className="py-4 px-4 font-bold text-slate-800 text-sm">
                      {agency.totalAudience.toLocaleString('fa-IR')}{' '}
                      <span className="text-xs text-slate-400 font-normal">
                        نفر
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      {agency.awardBadge ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>{agency.awardBadge}</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">در دست بررسی</span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-center">
                      <div className="inline-block px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-sm shadow-sm">
                        {agency.totalScore}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Certificate Issuance & Showcase */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold">
              <Award className="w-4 h-4" />
              <span>سامانه صدور گواهینامه و لوح سپاس رسمی کارگروه استانی</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              صدور و چاپ لوح تقدیر رسمی برای {activeAgency.name}
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              دستگاه شما با امتیاز مکتسبه <span className="font-black text-white">{activeAgency.totalScore}</span> واجد شرایط دریافت لوح سپاس رسمی کارگروه با امضای استاندار زنجان و مدیرکل حفاظت محیط‌زیست استان می‌باشد.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={handleIssueCertForCurrent}
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-900" />
              <span>صدور / مشاهده لوح سپاس رسمی</span>
            </button>
          </div>
        </div>

        {/* Existing Certificates Carousel/List */}
        {certificates.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/20">
            <h4 className="text-xs font-bold text-emerald-100 mb-3">
              لوح‌های صادر شده قبلی در سامانه:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="bg-white/10 hover:bg-white/20 p-3.5 rounded-2xl border border-white/20 cursor-pointer transition-all flex items-center justify-between backdrop-blur-sm"
                >
                  <div className="truncate">
                    <p className="font-bold text-xs text-white truncate">
                      {cert.agencyName}
                    </p>
                    <p className="text-[10px] text-emerald-200 mt-0.5">
                      سریال: {cert.serialNumber} • {cert.year}
                    </p>
                  </div>
                  <Award className="w-5 h-5 text-amber-300 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Official Certificate Modal (Print Ready) */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8">
            {/* Action Bar (Not shown in print) */}
            <div className="no-print bg-slate-900 text-white px-6 py-3 flex items-center justify-between">
              <span className="text-xs text-slate-300">
                پیش‌نمایش لوح تقدیر رسمی کارگروه استانی • آماده برای چاپ
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  <span>چاپ لوح تقدیر (Print)</span>
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  بستن
                </button>
              </div>
            </div>

            {/* Printable Certificate Frame */}
            <div
              id="printable-certificate"
              className="p-8 sm:p-14 bg-[#FFFDF7] text-slate-800 relative border-8 border-double border-emerald-900 m-4 rounded-2xl shadow-inner select-none font-vazirmatn"
            >
              {/* Ornate Inner Corner Accents */}
              <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-amber-600" />
              <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-amber-600" />
              <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-amber-600" />
              <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-amber-600" />

              {/* Certificate Header */}
              <div className="text-center space-y-2 mb-8">
                <div className="text-xs font-bold tracking-widest text-emerald-900">
                  جمهوری اسلامی ایران
                </div>
                <div className="text-xs font-bold text-slate-600">
                  شورای فرهنگ عمومی استان زنجان
                </div>
                <div className="text-xs font-bold text-slate-600">
                  کارگروه استانی ارتقای فرهنگ حفاظت از محیط‌زیست
                </div>

                <div className="py-4">
                  <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-wide">
                    {selectedCert.title}
                  </h1>
                  <div className="w-24 h-1 bg-amber-500 mx-auto mt-2 rounded-full" />
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-500 px-6 pt-2 border-b border-amber-200/60 pb-3 font-mono">
                  <span>شماره سریال: {selectedCert.serialNumber}</span>
                  <span>تاریخ صدور: {selectedCert.issuedDate}</span>
                  <span>دوره ارزیابی: {selectedCert.year}</span>
                </div>
              </div>

              {/* Certificate Body Text */}
              <div className="space-y-6 text-justify text-sm sm:text-base leading-loose px-4 sm:px-8 text-slate-800 font-medium">
                <p>
                  مسئولان و کارکنان خدوم{' '}
                  <span className="font-black text-emerald-950 text-base sm:text-lg border-b-2 border-amber-500 pb-0.5">
                    {selectedCert.agencyName}
                  </span>
                </p>

                <p className="indent-6">
                  با عنایت به ارزیابی‌های جامع به‌عمل‌آمده توسط هیئت داوران کارگروه استانی و به استناد مفاد مصوب «برنامه عمل ارتقای فرهنگ حفاظت از محیط‌زیست استان زنجان»، بدین‌وسیله مراتب سپاس و قدردانی کارگروه به پاس اهتمام شایسته، مدیریت خردمندانه و تلاش‌های مستمر آن مجموعه در برگزاری دوره‌ها و کارگاه‌های آموزشی اثربخش، صیانت از منابع حیاتی آب، خاک و تنوع زیستی استان زنجان و نیل به کسب امتیاز درخشان{' '}
                  <span className="font-black text-emerald-900 bg-emerald-100/60 px-2 py-0.5 rounded">
                    {selectedCert.score} از ۱۰۰
                  </span>{' '}
                  ابلاغ می‌گردد.
                </p>

                <p className="indent-6">
                  کسب عنوان افتخارآمیز{' '}
                  <span className="font-black text-amber-800 underline decoration-amber-400">
                    «{selectedCert.rankTitle}»
                  </span>{' '}
                  را تبریک عرض نموده و دوام توفیقات الهی آن دستگاه را در ترویج فرهنگ غنی زیست‌محیطی و خدمت به مردمان شریف خطه تاریخی زنجان مسئلت داریم.
                </p>

                {/* Approved Incentives Box */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 mt-6">
                  <h5 className="font-black text-xs text-emerald-950 mb-2">
                    مزایا و تسهیلات قانونی منضم به این لوح:
                  </h5>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                    {selectedCert.incentivePoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Signatures & Seal */}
              <div className="mt-12 pt-8 grid grid-cols-2 gap-8 text-center text-xs sm:text-sm font-bold text-slate-800">
                <div className="space-y-12">
                  <div>
                    <div className="text-slate-500 text-xs">رئیس شورای فرهنگ عمومی</div>
                    <div className="font-black text-slate-900 mt-1">استاندار زنجان</div>
                  </div>
                  <div className="text-emerald-800 text-[10px] italic border-t border-slate-300 pt-2 inline-block px-4">
                    محل امضا و توشیح رسمی
                  </div>
                </div>

                <div className="space-y-12">
                  <div>
                    <div className="text-slate-500 text-xs">دبیر کارگروه استانی</div>
                    <div className="font-black text-slate-900 mt-1">
                      مدیرکل حفاظت محیط‌زیست استان زنجان
                    </div>
                  </div>
                  <div className="text-emerald-800 text-[10px] italic border-t border-slate-300 pt-2 inline-block px-4">
                    محل امضا و مهر برجسته کارگروه
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
