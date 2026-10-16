import React, { useState, useEffect } from 'react';
import {
  Award,
  Factory,
  Droplets,
  Trash2,
  HeartHandshake,
  FileCheck2,
  PlusCircle,
  ExternalLink,
  AlertCircle,
  ShieldAlert,
  Clock,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Company, ActivityLog, DiscountIncentive, AuditScore } from '../types';
import { api } from '../services/api';
import { StatCard } from './StatCard';
import { CertificateVoucherModal } from './CertificateVoucherModal';

interface CompanyDashboardProps {
  currentCompany: Company | null;
  onOpenReportWizard: () => void;
}

export const CompanyDashboard: React.FC<CompanyDashboardProps> = ({
  currentCompany,
  onOpenReportWizard,
}) => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [vouchers, setVouchers] = useState<DiscountIncentive[]>([]);
  const [scores, setScores] = useState<AuditScore[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<DiscountIncentive | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentCompany?._id) return;
    loadCompanyData();
  }, [currentCompany]);

  const loadCompanyData = async () => {
    try {
      setLoading(true);
      const [logsRes, vouchersRes, scoresRes] = await Promise.all([
        api.getActivityLogs({ companyId: currentCompany!._id }),
        api.getVouchers({ companyId: currentCompany!._id }),
        api.getCompanyScores(currentCompany!._id),
      ]);
      setLogs(logsRes);
      setVouchers(vouchersRes);
      setScores(scoresRes);

      // Trigger celebratory confetti if platinum
      if (currentCompany?.currentTier === 'platinum') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#10b981', '#34d399', '#f59e0b'],
        });
      }
    } catch (err) {
      console.error('Error loading company data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!currentCompany) {
    return (
      <div className="p-12 text-center text-slate-400">
        <Factory className="w-12 h-12 mx-auto text-slate-600 mb-3" />
        <p>اطلاعات بنگاه صنعتی بارگذاری نشده است.</p>
      </div>
    );
  }

  const latestScore = scores[0];
  const activeVoucher = vouchers.find((v) => v.status === 'active') || vouchers[0];

  const tierBadgeMap = {
    platinum: {
      title: 'صنعت سبز برتر (رتبه پلاتین)',
      bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      tag: 'معافیت ۱۰۰٪ ماده ۲۷ عوارض آلایندگی',
    },
    gold: {
      title: 'صنعت سبز و همیار محیط‌زیست (رتبه طلا)',
      bg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
      tag: 'تخفیف ۵۰٪ ماده ۲۷ عوارض آلایندگی',
    },
    silver: {
      title: 'واحد در حال انطباق (رتبه نقره)',
      bg: 'bg-slate-500/20 text-slate-300 border-slate-400/40',
      tag: 'فاقد معافیت مالیاتی (دوره رفع نقایص)',
    },
    red: {
      title: 'واحد آلاینده / مشمول جریمه',
      bg: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
      tag: 'مشمول عوارض آلایندگی و تذکر قضایی',
    },
    pending: {
      title: 'در انتظار ممیزی اولیه',
      bg: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
      tag: 'نیازمند ارسال خوداظهاری دوره',
    },
  };

  const currentTierBadge = tierBadgeMap[currentCompany.currentTier || 'pending'];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/60 to-slate-900 border border-emerald-600/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${currentTierBadge.bg}`}
              >
                <Award className="w-4 h-4" />
                {currentTierBadge.title}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                {currentTierBadge.tag}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-vazir">
              {currentCompany.name}
            </h2>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-300">
              <span>
                شناسه ملی: <strong className="font-mono text-emerald-400">{currentCompany.shenaseMelli}</strong>
              </span>
              <span>•</span>
              <span>
                شهرستان: <strong className="text-white">{currentCompany.countyFa}</strong>
              </span>
              <span>•</span>
              <span>
                مستقر در: <strong className="text-white">{currentCompany.industrialPark}</strong>
              </span>
              <span>•</span>
              <span>
                مسئول محیط‌زیست: <strong className="text-white">{currentCompany.environmentalOfficer?.fullName}</strong>
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            {activeVoucher && (
              <button
                onClick={() => setSelectedVoucher(activeVoucher)}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-bold text-xs shadow-lg transition-all transform hover:scale-105"
              >
                <Award className="w-4 h-4" />
                مشاهده و چاپ گواهینامه معافیت
              </button>
            )}

            <button
              onClick={onOpenReportWizard}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 transition-all transform hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              ثبت خوداظهاری جدید (۵ محور)
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="امتیاز ممیزی زیست‌محیطی (از ۱۰۰)"
          value={`${currentCompany.currentScore || 0} امتیاز`}
          subtitle="محاسبه‌شده با الگوریتم ۴ گانه سند"
          icon={<Award className="w-6 h-6" />}
          color="emerald"
          badge={currentCompany.currentScore >= 85 ? 'رتبه ممتاز' : 'منطبق'}
          trend="پایش فعال و معتبر"
        />

        <StatCard
          title="باطله خنثی‌شده و فیلترپرس"
          value={
            logs[0]?.wasteManagement?.tailingsNeutralizedTons
              ? `${logs[0].wasteManagement.tailingsNeutralizedTons.toLocaleString()} تن`
              : '۱۱,۸۰۰ تن'
          }
          subtitle="انتقال ایمن به سایت ایزوله سردهات"
          icon={<Trash2 className="w-6 h-6" />}
          color="cyan"
          badge="فیلترپرس فعال"
          trend="۹۴٪ تثبیت فلزات سنگین"
        />

        <StatCard
          title="بازچرخانی منابع آب و ZLD"
          value={
            logs[0]?.waterResources?.greywaterRecycledM3
              ? `${logs[0].waterResources.greywaterRecycledM3.toLocaleString()} m³`
              : '۳۸,۲۰۰ m³'
          }
          subtitle="کاهش برداشت از حوضه قزل‌اوزن"
          icon={<Droplets className="w-6 h-6" />}
          color="blue"
          badge="تخلیه صفر پساب"
          trend="۸۵٪ نرخ بازچرخانی"
        />

        <StatCard
          title="بودجه مسئولیت اجتماعی (CSR)"
          value={
            logs[0]?.csrAndEducation?.csrBudgetRials
              ? `${(logs[0].csrAndEducation.csrBudgetRials / 10_000_000).toLocaleString()} م. تومان`
              : '۱,۸۵۰ م. تومان'
          }
          subtitle="بهداشت و آموزش جوامع همجوار"
          icon={<HeartHandshake className="w-6 h-6" />}
          color="amber"
          badge="سردهات و دهشیر"
          trend="۴۲۰ پرسنل آموزش‌دیده"
        />
      </div>

      {/* Scoring Engine Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar / 4 Pillars Score Bars */}
        <div className="lg:col-span-2 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                تحلیل ۴ بُعدی ممیزی و امتیازدهی صنعت سبز
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                بر اساس مدل رسمی کارگروه ارتقای فرهنگ حفاظت از محیط‌زیست استان زنجان
              </p>
            </div>
            <div className="text-left font-mono">
              <span className="text-2xl font-black text-emerald-400">
                {currentCompany.currentScore || 0}
              </span>
              <span className="text-xs text-slate-500"> / 100</span>
            </div>
          </div>

          <div className="space-y-5">
            {/* Pillar 1: Base Compliance */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-200">
                  ۱. رعایت پایه‌ای قوانین و عدم تخلف قضایی (سقف ۳۰ امتیاز)
                </span>
                <span className="font-bold text-emerald-400">
                  {latestScore?.baseComplianceScore || 28} / 30
                </span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                  style={{
                    width: `${((latestScore?.baseComplianceScore || 28) / 30) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                فاقد پرونده فعال در محاکم دادگستری استان، استقرار پایش آنلاین دودکش و ژئوممبران حوضچه‌ها.
              </p>
            </div>

            {/* Pillar 2: Pollutant Reduction */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-200">
                  ۲. کاهش ملموس آلاینده‌ها و مدیریت باطله و آب (سقف ۳۰ امتیاز)
                </span>
                <span className="font-bold text-cyan-400">
                  {latestScore?.pollutantReductionScore || 27} / 30
                </span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full transition-all duration-1000"
                  style={{
                    width: `${((latestScore?.pollutantReductionScore || 27) / 30) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                راندمان ۹۹٪ فیلتراسیون باطله‌ها، بازچرخانی ۸۵٪ پساب و ممانعت کامل از ورود اسید به قزل‌اوزن.
              </p>
            </div>

            {/* Pillar 3: CSR & Education */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-200">
                  ۳. مسئولیت اجتماعی (CSR) و آموزش کارکنان (سقف ۲۰ امتیاز)
                </span>
                <span className="font-bold text-amber-400">
                  {latestScore?.csrAndEducationScore || 19} / 20
                </span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                  style={{
                    width: `${((latestScore?.csrAndEducationScore || 19) / 20) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                تخصیص اعتبار به روستاهای سردهات و دهشیر، برگزاری ۱۲۰ ساعت دوره تخصصی فرهنگ محیط‌زیست برای کارگران.
              </p>
            </div>

            {/* Pillar 4: Proactive Lab Audits */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-200">
                  ۴. خوداظهاری به‌موقع و گواهی آزمایشگاه معتمد (سقف ۲۰ امتیاز)
                </span>
                <span className="font-bold text-violet-400">
                  {latestScore?.proactiveAuditScore || 18} / 20
                </span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full transition-all duration-1000"
                  style={{
                    width: `${((latestScore?.proactiveAuditScore || 18) / 20) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                پیوست نتایج نمونه‌برداری فصلی فلزات سنگین خاک و پساب توسط آزمایشگاه مورد تأیید محیط زیست.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits & Voucher Card */}
        <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-3">
              <Award className="w-5 h-5" />
              <span className="text-xs font-bold tracking-wide">بسته مشوق‌ها و معافیت‌های مالیاتی</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">
              وضعیت ماده ۲۷ مالیات بر ارزش افزوده
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              واحدهای صنعتی دارای رتبه پلاتین و طلا، بر اساس مصوبه کارگروه ارتقای فرهنگ محیط‌زیست زنجان،
              از عوارض آلایندگی سبز معاف شده و سهمیه تشویقی آب و انرژی دریافت می‌دارند.
            </p>

            <div className="mt-5 space-y-2.5">
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                <span className="text-xs text-slate-400">تخفیف عوارض آلایندگی:</span>
                <span className="text-xs font-bold text-emerald-400">۱۰۰٪ معافیت کامل</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                <span className="text-xs text-slate-400">تخفیف تعرفه سهمیه آب:</span>
                <span className="text-xs font-bold text-blue-400">۲۵٪ تخفیف تعرفه</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                <span className="text-xs text-slate-400">تمدید پروانه زیست‌محیطی:</span>
                <span className="text-xs font-bold text-amber-400">مسیر سبز و بدون نوبت</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            {activeVoucher ? (
              <button
                onClick={() => setSelectedVoucher(activeVoucher)}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                دریافت گواهینامه دیجیتال رسمی (QR دار)
              </button>
            ) : (
              <p className="text-center text-xs text-slate-400">
                گواهینامه پس از ثبت خوداظهاری و تأیید بازرس صادر خواهد شد.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* History of Activity Logs */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">
              تاریخچه گزارش‌های فصلی خوداظهاری و وضعیت ممیزی
            </h3>
          </div>
          <span className="text-xs text-slate-400">تعداد پرونده‌ها: {logs.length}</span>
        </div>

        {logs.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            هنوز گزارشی برای این واحد ثبت نشده است. از دکمه «ثبت خوداظهاری جدید» استفاده نمایید.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="py-3 px-3">دوره گزارش</th>
                  <th className="py-3 px-3">باطله خنثی‌شده (تن)</th>
                  <th className="py-3 px-3">بازچرخانی آب (m³)</th>
                  <th className="py-3 px-3">بودجه CSR (ریال)</th>
                  <th className="py-3 px-3">مستندات آزمایشگاهی</th>
                  <th className="py-3 px-3">وضعیت ارزیابی</th>
                  <th className="py-3 px-3">یادداشت بازرس اداره کل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3 font-bold text-white">{log.period}</td>
                    <td className="py-3 px-3 font-mono text-cyan-300">
                      {log.wasteManagement?.tailingsNeutralizedTons?.toLocaleString() || '-'}
                    </td>
                    <td className="py-3 px-3 font-mono text-blue-300">
                      {log.waterResources?.greywaterRecycledM3?.toLocaleString() || '-'}
                    </td>
                    <td className="py-3 px-3 font-mono text-amber-300">
                      {log.csrAndEducation?.csrBudgetRials?.toLocaleString() || '-'}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md">
                        {log.evidenceFiles?.length || 0} فایل پیوست
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                          log.status === 'approved'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : log.status === 'submitted'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {log.statusFa}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300 max-w-xs truncate">
                      {log.reviewerNotes || 'در انتظار بررسی میدانی بازرس'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for printing certificate */}
      {selectedVoucher && (
        <CertificateVoucherModal
          voucher={selectedVoucher}
          onClose={() => setSelectedVoucher(null)}
        />
      )}
    </div>
  );
};
