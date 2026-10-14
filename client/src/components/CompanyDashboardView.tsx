import React, { useState } from 'react';
import {
  Award,
  PlusCircle,
  FileCheck2,
  Trash2,
  Droplets,
  Wind,
  HeartHandshake,
  ShieldCheck,
  AlertCircle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Company, ActivityLog, DiscountIncentive } from '../types';
import { StatCard } from './StatCard';
import { ActivitySubmissionModal } from './ActivitySubmissionModal';

interface CompanyDashboardViewProps {
  company: Company;
  logs: ActivityLog[];
  vouchers: DiscountIncentive[];
  onOpenCertificateModal: (voucher: DiscountIncentive) => void;
  onRefreshData: () => void;
  onNavigateToTab: (tab: 'company' | 'admin' | 'certificate' | 'leaderboard') => void;
}

export const CompanyDashboardView: React.FC<CompanyDashboardViewProps> = ({
  company,
  logs,
  vouchers,
  onOpenCertificateModal,
  onRefreshData,
  onNavigateToTab,
}) => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const activeVouchers = vouchers.filter((v) => v.status === 'active');
  const isPlatinum = company.currentTier === 'platinum';
  const isGold = company.currentTier === 'gold';

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
      title: 'واحد در حال انطباق و ارتقا (رتبه نقره)',
      bg: 'bg-slate-500/20 text-slate-300 border-slate-400/40',
      tag: 'فاقد معافیت مالیاتی (دوره رفع نقص)',
    },
    red: {
      title: 'واحد آلاینده / مشمول جریمه',
      bg: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
      tag: 'مشمول حداکثر عوارض آلایندگی ماده ۲۷',
    },
    pending: {
      title: 'در حال بازبینی و بررسی اولیه',
      bg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
      tag: 'پرونده در نوبت کارگروه استانی',
    },
  };

  const currentBadge = tierBadgeMap[company.currentTier] || tierBadgeMap.pending;

  const filteredLogs = logs.filter((log) => {
    if (filterStatus === 'all') return true;
    return log.status === filterStatus;
  });

  const handleCelebrate = () => {
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#10b981', '#34d399', '#f59e0b', '#06b6d4'],
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome & Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950 p-6 sm:p-8 border border-emerald-500/30 shadow-2xl">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className={`px-3 py-1 rounded-xl text-xs font-bold border shadow-sm ${currentBadge.bg}`}>
                {currentBadge.title}
              </span>
              <span className="text-xs text-slate-400">
                شناسه ملی: <span className="font-mono text-slate-300">{company.shenaseMelli}</span>
              </span>
              <span className="text-xs text-slate-400">
                شهرستان: <strong className="text-emerald-400">{company.countyFa}</strong>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {company.name}
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              {company.industrialPark} • {company.sector}
              <br />
              <span className="text-emerald-400 font-semibold">{currentBadge.tag}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-xl shadow-emerald-950 transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              ثبت گزارش خوداظهاری جدید
            </button>

            {activeVouchers.length > 0 && (
              <button
                onClick={() => onOpenCertificateModal(activeVouchers[0])}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all shadow-lg"
              >
                <Award className="w-4 h-4 text-amber-400" />
                مشاهده گواهینامه رسمی
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3 Overview Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Score & Gauge */}
        <div className="rounded-2xl border border-emerald-500/30 p-5 bg-slate-900/80 backdrop-blur-md shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>امتیاز انطباق زیست‌محیطی</span>
              <span className="text-emerald-400 font-bold">فرمول ۴ محوره زنجان</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white font-vazir">
                {company.currentScore}
              </span>
              <span className="text-sm text-slate-400 font-medium">/ ۱۰۰ امتیاز</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  company.currentScore >= 85
                    ? 'bg-gradient-to-r from-teal-400 to-emerald-400'
                    : company.currentScore >= 70
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400'
                    : 'bg-gradient-to-r from-rose-500 to-amber-500'
                }`}
                style={{ width: `${company.currentScore}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400 mt-2">
              <span>حداقل طلایی (۷۰)</span>
              <span>حداقل پلاتین برتر (۸۵)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Status & Legal Tier */}
        <div className="rounded-2xl border border-emerald-500/30 p-5 bg-slate-900/80 backdrop-blur-md shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>وضعیت تاییدیه در کارگروه</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{currentBadge.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              تایید شده توسط ممیزان اداره کل حفاظت محیط‌زیست و کارگروه ارتقای فرهنگ صنعتی
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">تخلفات قضایی فعال:</span>
            <span className={company.activeViolationsCount === 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
              {company.activeViolationsCount === 0 ? 'صفر (پاک)' : `${company.activeViolationsCount} اخطار`}
            </span>
          </div>
        </div>

        {/* Card 3: Active Incentives & Vouchers */}
        <div className="rounded-2xl border border-amber-500/30 p-5 bg-gradient-to-br from-slate-900/90 to-amber-950/20 backdrop-blur-md shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>مشوق‌ها و بن‌های تخفیف فعال</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-300 font-vazir">
                {activeVouchers.length}
              </span>
              <span className="text-xs text-slate-300">گواهینامه رسمی معتبر</span>
            </div>
            <p className="text-xs text-amber-200/80 mt-1">
              {activeVouchers.length > 0
                ? activeVouchers[0].certificateTitleFa
                : 'برای دریافت معافیت مالیاتی ماده ۲۷، امتیاز بالای ۷۰ کسب کنید.'}
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => onNavigateToTab('certificate')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
            >
              مدیریت بن‌ها و چاپ گواهی
              <ChevronRight className="w-3.5 h-3.5 rotate-180" />
            </button>
            {isPlatinum && (
              <button
                onClick={handleCelebrate}
                className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 flex items-center gap-1 hover:bg-emerald-500/30"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                جشن رتبه برتر
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Submission History Table */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              سوابق گزارش‌های خوداظهاری و پایش زیست‌محیطی
            </h3>
            <p className="text-xs text-slate-400">
              اقدامات ثبت‌شده در حوزه‌های پسماند، بازچرخانی آب، کنترل گرد و غبار و مسئولیت اجتماعی
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-xl transition-all ${
                filterStatus === 'all'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              همه ({logs.length})
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-3 py-1 rounded-xl transition-all ${
                filterStatus === 'approved'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              تایید شده
            </button>
            <button
              onClick={() => setFilterStatus('under_review')}
              className={`px-3 py-1 rounded-xl transition-all ${
                filterStatus === 'under_review'
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              در انتظار بررسی
            </button>
            <button
              onClick={() => setFilterStatus('revision_required')}
              className={`px-3 py-1 rounded-xl transition-all ${
                filterStatus === 'revision_required'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              نیازمند اصلاح
            </button>
          </div>
        </div>

        {/* Table Content */}
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            هیچ گزارشی با این فیلتر ثبت نشده است.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="py-3 px-3">دوره / تاریخ</th>
                  <th className="py-3 px-3">شاخص‌های کلیدی محقق‌شده</th>
                  <th className="py-3 px-3">مستندات و آزمایشگاه</th>
                  <th className="py-3 px-3">وضعیت بررسی</th>
                  <th className="py-3 px-3">ملاحظات کارشناس اداره کل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLogs.map((log) => {
                  const statusBadgeClass =
                    log.status === 'approved'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : log.status === 'under_review'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40';

                  return (
                    <tr key={log._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white">{log.period}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {log.submittedAt || '۱۴۰۵'}
                        </div>
                      </td>

                      <td className="py-3.5 px-3 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                            <Trash2 className="w-3 h-3" />
                            {log.wasteManagement.tailingsNeutralizedTons.toLocaleString('fa-IR')} تن باطله خنثی
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                            <Droplets className="w-3 h-3" />
                            {log.waterResources.recyclingRatePercentage}٪ بازچرخانی آب
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                            <Wind className="w-3 h-3" />
                            راندمان فیلتر: {log.airAndDust.bagFilterEfficiency}٪
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        {log.evidenceFiles.length > 0 ? (
                          <div className="flex items-center gap-1.5 text-slate-300">
                            <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{log.evidenceFiles.length} فایل پیوست</span>
                          </div>
                        ) : (
                          <span className="text-slate-500">فاقد پیوست</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold border ${statusBadgeClass}`}>
                          {log.statusFa}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 max-w-xs">
                        {log.reviewerNotes ? (
                          <p className="text-[11px] text-slate-300 leading-snug">
                            {log.reviewerNotes}
                          </p>
                        ) : (
                          <span className="text-slate-500 text-[11px]">در صف بررسی کارشناس...</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <ActivitySubmissionModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        company={company}
        onActivitySubmitted={() => {
          onRefreshData();
        }}
      />
    </div>
  );
};
