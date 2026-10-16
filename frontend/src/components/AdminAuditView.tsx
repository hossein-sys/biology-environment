import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  Calculator,
  Building2,
  ChevronDown,
  ChevronUp,
  FileText,
  Sparkles,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Send,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Company, ActivityLog, DiscountIncentive } from '../types';
import { storageService } from '../services/storage';

interface AdminAuditViewProps {
  companies: Company[];
  logs: ActivityLog[];
  onRefreshData: () => void;
  onOpenCertificateModal: (voucher: DiscountIncentive) => void;
}

export const AdminAuditView: React.FC<AdminAuditViewProps> = ({
  companies,
  logs,
  onRefreshData,
  onOpenCertificateModal,
}) => {
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [inspectorNotes, setInspectorNotes] = useState<{ [key: string]: string }>({});

  // Calculator State
  const [selectedCalcCompanyId, setSelectedCalcCompanyId] = useState<string>(
    companies[0]?._id || ''
  );
  const [baseComplianceScore, setBaseComplianceScore] = useState<number>(28); // max 30
  const [pollutantReductionScore, setPollutantReductionScore] = useState<number>(28); // max 30
  const [csrAndEducationScore, setCsrAndEducationScore] = useState<number>(18); // max 20
  const [proactiveAuditScore, setProactiveAuditScore] = useState<number>(18); // max 20

  const selectedCompany =
    companies.find((c) => c._id === selectedCalcCompanyId) || companies[0];

  const totalCalculatedScore = Math.min(
    100,
    baseComplianceScore + pollutantReductionScore + csrAndEducationScore + proactiveAuditScore
  );

  const calculatedTier =
    totalCalculatedScore >= 85
      ? 'platinum'
      : totalCalculatedScore >= 70
      ? 'gold'
      : totalCalculatedScore >= 50
      ? 'silver'
      : 'red';

  const tierTitleFa =
    calculatedTier === 'platinum'
      ? 'صنعت سبز برتر - رتبه پلاتین (۱۰۰٪ معافیت ماده ۲۷)'
      : calculatedTier === 'gold'
      ? 'صنعت سبز همیار - رتبه طلا (۵۰٪ تخفیف ماده ۲۷)'
      : calculatedTier === 'silver'
      ? 'واحد در حال ارتقا - رتبه نقره (فاقد معافیت)'
      : 'واحد آلاینده مشمول جریمه (رتبه قرمز)';

  const handleApproveAndScore = (log: ActivityLog) => {
    const notes = inspectorNotes[log._id] || 'مستندات آزمایشگاه معتمد و اقدامات میدانی تایید گردید و امتیاز به شرکت افزوده شد.';
    storageService.updateLogStatus(log._id, 'approved', notes);

    // Boost company score in real-time
    const targetComp = companies.find((c) => c._id === log.companyId._id);
    if (targetComp) {
      const newScore = Math.min(100, targetComp.currentScore + 6);
      const newTier = newScore >= 85 ? 'platinum' : newScore >= 70 ? 'gold' : 'silver';
      storageService.saveCompany({
        ...targetComp,
        currentScore: newScore,
        currentTier: newTier,
      });

      // If unlocked tier, issue voucher
      if (newScore >= 70 && targetComp.currentScore < 70) {
        storageService.issueCertificateAndVoucher(targetComp, newScore, newTier as any);
      }
    }

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#059669'],
    });

    onRefreshData();
  };

  const handleRejectOrRevise = (logId: string, action: 'rejected' | 'revision_required') => {
    const notes = inspectorNotes[logId] || (action === 'rejected' ? 'گزارش به علت عدم انطباق آزمایشگاهی رد شد.' : 'نیازمند تکمیل مدارک و آزمایش مجدد');
    storageService.updateLogStatus(logId, action, notes);
    onRefreshData();
  };

  const handleManualIssueVoucher = () => {
    if (!selectedCompany) return;
    if (totalCalculatedScore < 70) {
      alert('امتیاز باید حداقل ۷۰ باشد تا مجوز تخفیف و گواهی صنعت سبز صادر گردد.');
      return;
    }

    const tierToAward = totalCalculatedScore >= 85 ? 'platinum' : 'gold';
    const newVoucher = storageService.issueCertificateAndVoucher(
      selectedCompany,
      totalCalculatedScore,
      tierToAward
    );

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#f59e0b'],
    });

    onRefreshData();
    onOpenCertificateModal(newVoucher);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-white border border-teal-100 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                کارتابل نظارتی رسمی بازرسان
              </span>
              <span className="text-xs text-slate-500">
                اداره کل حفاظت محیط‌زیست استان زنجان
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              کارتابل ممیزی و تایید اقدامات زیست‌محیطی صنایع
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
              بررسی خوداظهاری‌های ارسالی صنایع، تایید مدارک آزمایشگاهی، اعمال امتیاز انطباق و صدور احکام معافیت ماده ۲۷.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-500 block">واحدهای ثبت‌شده</span>
              <strong className="text-base text-emerald-800 font-bold">{companies.length} شرکت</strong>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-[10px] text-amber-700 block">گزارشات در صف بررسی</span>
              <strong className="text-base text-amber-900 font-bold">
                {logs.filter((l) => l.status === 'under_review').length} مورد
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Review Queue */}
      <div className="rounded-3xl bg-white border border-emerald-100 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              صف بررسی خوداظهاری‌ها (تایید بلادرنگ و اعطای امتیاز)
            </h3>
            <p className="text-xs text-slate-500">
              با تایید هر اقدام، امتیاز شرکت به‌صورت آنی افزایش یافته و مشمولیت تخفیف مالیاتی ارزیابی می‌شود.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {logs.map((log) => {
            const isExpanded = expandedLogId === log._id;
            const statusCardClass =
              log.status === 'approved'
                ? 'border-emerald-200 bg-emerald-50/30'
                : log.status === 'under_review'
                ? 'border-amber-200 bg-amber-50/30'
                : 'border-rose-200 bg-rose-50/30';

            return (
              <div
                key={log._id}
                className={`rounded-2xl border transition-all ${statusCardClass} overflow-hidden`}
              >
                {/* Collapsed Bar */}
                <div
                  onClick={() => setExpandedLogId(isExpanded ? null : log._id)}
                  className="p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-teal-700 shadow-2xs">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{log.companyId.name}</h4>
                        <span className="text-[11px] text-emerald-700 font-semibold">
                          ({log.companyId.countyFa})
                        </span>
                        <span className="text-[11px] text-slate-400">• {log.period}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {log.wasteManagement.tailingsNeutralizedTons.toLocaleString('fa-IR')} تن باطله •{' '}
                        {log.waterResources.recyclingRatePercentage}٪ بازچرخانی •{' '}
                        {log.airAndDust.bagFilterEfficiency}٪ فیلتراسیون
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        log.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : log.status === 'under_review'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {log.statusFa}
                    </span>
                    <button className="text-slate-400 p-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details & Actions */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-100 bg-white space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block mb-1">مدیریت پسماند و باطله</span>
                        <p className="font-bold text-slate-900">
                          {log.wasteManagement.tailingsNeutralizedTons.toLocaleString('fa-IR')} تن خنثی‌شده
                        </p>
                        <p className="text-[11px] text-emerald-700 mt-1">
                          {log.wasteManagement.filterPressActive ? '✓ فیلترپرس فعال' : '✗ فاقد فیلترپرس'}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block mb-1">حفاظت از منابع آب</span>
                        <p className="font-bold text-slate-900">
                          {log.waterResources.recyclingRatePercentage}٪ بازچرخانی
                        </p>
                        <p className="text-[11px] text-cyan-700 mt-1">
                          {log.waterResources.zeroLiquidDischargeActive ? '✓ تخلیه صفر (ZLD)' : 'فاقد ZLD'}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block mb-1">فیلتراسیون هوا</span>
                        <p className="font-bold text-slate-900">
                          {log.airAndDust.bagFilterEfficiency}٪ راندمان
                        </p>
                        <p className="text-[11px] text-emerald-700 mt-1">
                          فضای سبز: {log.airAndDust.greenSpaceAreaM2.toLocaleString('fa-IR')} م²
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block mb-1">مسئولیت اجتماعی CSR</span>
                        <p className="font-bold text-slate-900">
                          {((log.csrAndEducation.csrBudgetRials || 0) / 10000000).toLocaleString('fa-IR')} میلیون تومان
                        </p>
                        <p className="text-[11px] text-violet-700 mt-1">
                          آموزش: {log.csrAndEducation.staffTrainingHours} ساعت
                        </p>
                      </div>
                    </div>

                    {/* Files */}
                    {log.evidenceFiles.length > 0 && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block mb-2 font-bold">
                          مدارک آزمایشگاهی پیوستی:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {log.evidenceFiles.map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-emerald-200 text-emerald-800"
                            >
                              <FileText className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{file.fileName}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Inspector Action & Notes */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="یادداشت ممیز (نکات بازرسی، دستور رفع نقص یا تقدیر)..."
                          value={inspectorNotes[log._id] || ''}
                          onChange={(e) =>
                            setInspectorNotes({ ...inspectorNotes, [log._id]: e.target.value })
                          }
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleApproveAndScore(log)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          تایید و اعطای امتیاز
                        </button>

                        <button
                          onClick={() => handleRejectOrRevise(log._id, 'revision_required')}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all cursor-pointer"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          درخواست اصلاح
                        </button>

                        <button
                          onClick={() => handleRejectOrRevise(log._id, 'rejected')}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-bold transition-all cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          رد گزارش
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Scoring Calculator & Voucher Generator */}
      <div className="rounded-3xl bg-white border border-emerald-100 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              ماشین‌حساب هوشمند ممیزی و صدور گواهی صنعت سبز (ماده ۲۷)
            </h3>
            <p className="text-xs text-slate-500">
              محاسبه ۴ محوره امتیاز انطباق بر پایه مصوبات شورای فرهنگ عمومی و کارگروه حفاظت محیط‌زیست زنجان
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">واحد مورد ارزیابی:</span>
            <select
              value={selectedCalcCompanyId}
              onChange={(e) => setSelectedCalcCompanyId(e.target.value)}
              className="bg-slate-50 text-slate-900 border border-slate-200 rounded-xl px-3 py-1.5 font-bold focus:outline-none focus:border-emerald-500"
            >
              {companies.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} ({c.countyFa})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4 Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">
                ۱. ضوابط پایه و عدم تخلفات قضایی (۳۰٪)
              </span>
              <span className="text-emerald-700 font-bold font-mono text-sm">
                {baseComplianceScore} / ۳۰
              </span>
            </div>
            <p className="text-[11px] text-slate-500">عدم اخطار قضایی و فعال بودن پایش آنلاین</p>
            <input
              type="range"
              min={0}
              max={30}
              value={baseComplianceScore}
              onChange={(e) => setBaseComplianceScore(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">
                ۲. کاهش آلاینده‌ها و مدیریت پسماند/آب (۳۰٪)
              </span>
              <span className="text-emerald-700 font-bold font-mono text-sm">
                {pollutantReductionScore} / ۳۰
              </span>
            </div>
            <p className="text-[11px] text-slate-500">فیلترپرس باطله و بازچرخانی آب قزل‌اوزن</p>
            <input
              type="range"
              min={0}
              max={30}
              value={pollutantReductionScore}
              onChange={(e) => setPollutantReductionScore(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">
                ۳. مسئولیت اجتماعی CSR و آموزش (۲۰٪)
              </span>
              <span className="text-emerald-700 font-bold font-mono text-sm">
                {csrAndEducationScore} / ۲۰
              </span>
            </div>
            <p className="text-[11px] text-slate-500">خدمات بهداشتی به روستاها و دوره‌های پرسنل</p>
            <input
              type="range"
              min={0}
              max={20}
              value={csrAndEducationScore}
              onChange={(e) => setCsrAndEducationScore(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">
                ۴. نظم در خوداظهاری و پایش معتمد (۲۰٪)
              </span>
              <span className="text-emerald-700 font-bold font-mono text-sm">
                {proactiveAuditScore} / ۲۰
              </span>
            </div>
            <p className="text-[11px] text-slate-500">ارسال فصلی مدارک آزمایشگاه معتمد</p>
            <input
              type="range"
              min={0}
              max={20}
              value={proactiveAuditScore}
              onChange={(e) => setProactiveAuditScore(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Calculation Result */}
        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">امتیاز نهایی محاسبه‌شده:</span>
              <span className="text-2xl font-black text-emerald-950 font-vazir">
                {totalCalculatedScore}
              </span>
              <span className="text-xs text-slate-500">/ ۱۰۰</span>
            </div>
            <p className="text-xs font-bold text-emerald-800 mt-1">{tierTitleFa}</p>
          </div>

          <div>
            {totalCalculatedScore >= 70 ? (
              <button
                onClick={handleManualIssueVoucher}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-102 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-300" />
                صدور مجوز تخفیف و گواهی صنعت سبز (ماده ۲۷)
              </button>
            ) : (
              <span className="text-xs text-rose-700 font-bold bg-rose-50 px-3 py-2 rounded-xl border border-rose-200">
                امتیاز کمتر از ۷۰ است و حائز معافیت نمی‌باشد.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
