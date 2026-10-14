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
  Sliders,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
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
  // Review Queue state
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [inspectorNotes, setInspectorNotes] = useState<{ [key: string]: string }>({});

  // Calculator State
  const [selectedCalcCompanyId, setSelectedCalcCompanyId] = useState<string>(companies[0]?._id || '');
  const [baseComplianceScore, setBaseComplianceScore] = useState<number>(28); // max 30
  const [pollutantReductionScore, setPollutantReductionScore] = useState<number>(27); // max 30
  const [csrAndEducationScore, setCsrAndEducationScore] = useState<number>(18); // max 20
  const [proactiveAuditScore, setProactiveAuditScore] = useState<number>(19); // max 20

  const selectedCompany = companies.find((c) => c._id === selectedCalcCompanyId) || companies[0];

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
      ? 'صنعت سبز برتر (رتبه پلاتین - ۱۰۰٪ معافیت ماده ۲۷)'
      : calculatedTier === 'gold'
      ? 'صنعت سبز همیار (رتبه طلا - ۵۰٪ تخفیف ماده ۲۷)'
      : calculatedTier === 'silver'
      ? 'واحد در حال ارتقا (رتبه نقره - فاقد معافیت)'
      : 'واحد آلاینده مشمول جریمه (رتبه قرمز)';

  const handleAction = (
    logId: string,
    action: 'approved' | 'rejected' | 'revision_required'
  ) => {
    const notes = inspectorNotes[logId] || (action === 'approved' ? 'گزارش و مستندات میدانی مورد تایید ممیز قرار گرفت.' : 'نیازمند تکمیل مدارک');
    storageService.updateLogStatus(logId, action, notes);
    onRefreshData();
  };

  const handleIssueVoucher = () => {
    if (!selectedCompany) return;
    if (totalCalculatedScore < 70) {
      alert('امتیاز شرکت باید حداقل ۷۰ باشد تا مجوز تخفیف و گواهی صنعت سبز صادر گردد.');
      return;
    }

    const tierToAward = totalCalculatedScore >= 85 ? 'platinum' : 'gold';
    const newVoucher = storageService.issueCertificateAndVoucher(
      selectedCompany,
      totalCalculatedScore,
      tierToAward
    );

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#f59e0b', '#06b6d4'],
    });

    onRefreshData();
    onOpenCertificateModal(newVoucher);
  };

  return (
    <div className="space-y-8">
      {/* Admin Title Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-950 via-slate-900 to-slate-950 p-6 sm:p-8 border border-teal-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                کارتابل نظارتی رسمی
              </span>
              <span className="text-xs text-slate-400">
                اداره کل حفاظت محیط‌زیست استان زنجان
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              کارتابل ممیزی بازرسان و سامانه ارزیابی صنعت سبز
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              بررسی خوداظهاری‌های دریافتی از صنایع استان زنجان، اعمال ممیزی ۴ محوره و صدور احکام معافیت ماده ۲۷ مالیات بر ارزش افزوده.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 text-center">
              <span className="text-[10px] text-slate-400 block">واحدهای ثبت‌شده</span>
              <strong className="text-sm text-emerald-400 font-bold">{companies.length} شرکت</strong>
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 text-center">
              <span className="text-[10px] text-slate-400 block">گزارشات در انتظار</span>
              <strong className="text-sm text-amber-400 font-bold">
                {logs.filter((l) => l.status === 'under_review').length} مورد
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Part 1: Review Queue */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-teal-400" />
              صف بررسی خوداظهاری و اقدامات زیست‌محیطی صنایع
            </h3>
            <p className="text-xs text-slate-400">
              واحدهای صنعتی واقع در شهرستان‌های زنجان، ماهنشان، ابهر و سایر نقاط استان
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {logs.map((log) => {
            const isExpanded = expandedLogId === log._id;
            const statusColor =
              log.status === 'approved'
                ? 'border-emerald-500/40 bg-emerald-950/10'
                : log.status === 'under_review'
                ? 'border-amber-500/40 bg-amber-950/10'
                : 'border-rose-500/40 bg-rose-950/10';

            return (
              <div
                key={log._id}
                className={`rounded-2xl border transition-all ${statusColor} overflow-hidden`}
              >
                {/* Collapsed Bar */}
                <div
                  onClick={() => setExpandedLogId(isExpanded ? null : log._id)}
                  className="p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-teal-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-white">{log.companyId.name}</h4>
                        <span className="text-[11px] text-emerald-400 font-medium">
                          ({log.companyId.countyFa})
                        </span>
                        <span className="text-[11px] text-slate-400">• {log.period}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {log.wasteManagement.tailingsNeutralizedTons.toLocaleString('fa-IR')} تن باطله •{' '}
                        {log.waterResources.recyclingRatePercentage}٪ بازچرخانی آب •{' '}
                        {log.airAndDust.bagFilterEfficiency}٪ فیلتراسیون
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${
                        log.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : log.status === 'under_review'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
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
                  <div className="p-5 border-t border-slate-800/80 bg-slate-900/60 space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                        <span className="text-slate-400 block mb-1">مدیریت پسماند و باطله</span>
                        <p className="font-semibold text-white">
                          تثبیت {log.wasteManagement.tailingsNeutralizedTons} از {log.wasteManagement.tailingsProducedTons} تن
                        </p>
                        <p className="text-[11px] text-emerald-400 mt-1">
                          {log.wasteManagement.filterPressActive ? '✓ فیلترپرس فعال' : '✗ فاقد فیلترپرس'} •{' '}
                          {log.wasteManagement.geomembraneIsolation ? '✓ ژئوممبران' : '✗ بدون عایق'}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                        <span className="text-slate-400 block mb-1">حفاظت از منابع آب و قزل‌اوزن</span>
                        <p className="font-semibold text-white">
                          نرخ بازچرخانی: {log.waterResources.recyclingRatePercentage}٪
                        </p>
                        <p className="text-[11px] text-cyan-400 mt-1">
                          {log.waterResources.zeroLiquidDischargeActive ? '✓ تخلیه مایع صفر (ZLD)' : 'فاقد ZLD'}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                        <span className="text-slate-400 block mb-1">کنترل غبار و فضای سبز</span>
                        <p className="font-semibold text-white">
                          راندمان بگ‌فیلتر: {log.airAndDust.bagFilterEfficiency}٪
                        </p>
                        <p className="text-[11px] text-emerald-400 mt-1">
                          فضای سبز: {log.airAndDust.greenSpaceAreaM2.toLocaleString('fa-IR')} م²
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-800/70 border border-slate-700">
                        <span className="text-slate-400 block mb-1">مسئولیت اجتماعی و آموزش</span>
                        <p className="font-semibold text-white">
                          {((log.csrAndEducation.csrBudgetRials || 0) / 10000000).toLocaleString('fa-IR')} میلیون تومان
                        </p>
                        <p className="text-[11px] text-violet-400 mt-1">
                          آموزش: {log.csrAndEducation.staffTrainingHours} ساعت
                        </p>
                      </div>
                    </div>

                    {/* Evidence Files */}
                    {log.evidenceFiles.length > 0 && (
                      <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60">
                        <span className="text-slate-400 block mb-2 font-semibold">
                          مدارک و مستندات پیوستی:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {log.evidenceFiles.map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-emerald-500/30 text-emerald-300"
                            >
                              <FileText className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{file.fileName}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Inspector Action & Notes Input */}
                    <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="یادداشت ممیز (نکات بازرسی میدانی یا دلایل رد / درخواست اصلاح)..."
                          value={inspectorNotes[log._id] || ''}
                          onChange={(e) =>
                            setInspectorNotes({ ...inspectorNotes, [log._id]: e.target.value })
                          }
                          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleAction(log._id, 'approved')}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          تایید اقدام
                        </button>

                        <button
                          onClick={() => handleAction(log._id, 'revision_required')}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all"
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                          درخواست اصلاح
                        </button>

                        <button
                          onClick={() => handleAction(log._id, 'rejected')}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          رد اقدام
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

      {/* Part 2: Interactive Scoring & Incentive Calculator */}
      <div className="rounded-3xl border border-teal-500/30 bg-slate-900/90 backdrop-blur-xl p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-teal-400" />
              ماشین‌حساب هوشمند ممیزی و صدور گواهینامه صنعت سبز (ماده ۲۷)
            </h3>
            <p className="text-xs text-slate-400">
              محاسبه آنی امتیاز انطباق بر پایه فرمول ۴ محوره مصوب کارگروه ارتقای فرهنگ حفاظت محیط‌زیست استان زنجان
            </p>
          </div>

          {/* Select Target Company */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">انتخاب واحد صنعتی:</span>
            <select
              value={selectedCalcCompanyId}
              onChange={(e) => setSelectedCalcCompanyId(e.target.value)}
              className="bg-slate-800 text-white border border-teal-500/40 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-teal-400"
            >
              {companies.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} ({c.countyFa})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4 Interactive Sliders based on the Document */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1 */}
          <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">
                ۱. رعایت ضوابط پایه و عدم تخلفات قضایی (۳۰٪)
              </span>
              <span className="text-teal-400 font-bold font-mono text-sm">
                {baseComplianceScore} / ۳۰
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              عدم اخطار قضایی، فعال بودن سامانه پایش آنلاین دودکش و پساب
            </p>
            <input
              type="range"
              min={0}
              max={30}
              value={baseComplianceScore}
              onChange={(e) => setBaseComplianceScore(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">
                ۲. کاهش کمی آلاینده‌ها و مدیریت پسماند/آب (۳۰٪)
              </span>
              <span className="text-teal-400 font-bold font-mono text-sm">
                {pollutantReductionScore} / ۳۰
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              راه‌اندازی فیلترپرس و ایزولاسیون باطله، بازچرخانی آب بالای ۶۰٪ یا عدم تخلیه به قزل‌اوزن
            </p>
            <input
              type="range"
              min={0}
              max={30}
              value={pollutantReductionScore}
              onChange={(e) => setPollutantReductionScore(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">
                ۳. مسئولیت اجتماعی CSR و آموزش محیط‌زیستی (۲۰٪)
              </span>
              <span className="text-teal-400 font-bold font-mono text-sm">
                {csrAndEducationScore} / ۲۰
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              خدمات بهداشتی به روستاهای مجاور، دوره‌های آموزشی کارکنان
            </p>
            <input
              type="range"
              min={0}
              max={20}
              value={csrAndEducationScore}
              onChange={(e) => setCsrAndEducationScore(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          {/* Pillar 4 */}
          <div className="p-4 rounded-2xl bg-slate-850 border border-slate-700/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200">
                ۴. نظم در خوداظهاری و پایش دوره‌ای آزمایشگاه (۲۰٪)
              </span>
              <span className="text-teal-400 font-bold font-mono text-sm">
                {proactiveAuditScore} / ۲۰
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              ارسال بموقع گزارشات فصلی و نتایج آزمایشگاه‌های معتمد محیط‌زیست
            </p>
            <input
              type="range"
              min={0}
              max={20}
              value={proactiveAuditScore}
              onChange={(e) => setProactiveAuditScore(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Calculation Result & Issue Button Bar */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-850 to-teal-950 border border-teal-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="text-xs text-slate-400">جمع امتیاز نهایی ممیزی:</span>
              <span className="text-3xl font-black text-white font-vazir">
                {totalCalculatedScore}
              </span>
              <span className="text-xs text-slate-400">از ۱۰۰</span>
            </div>
            <p className="text-xs font-bold text-teal-300">{tierTitleFa}</p>
          </div>

          <div className="flex items-center gap-3">
            {totalCalculatedScore >= 70 ? (
              <button
                onClick={handleIssueVoucher}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-xl shadow-teal-950 transition-all hover:scale-105"
              >
                <Award className="w-5 h-5 text-amber-300" />
                صدور مجوز تخفیف و گواهی صنعت سبز (ماده ۲۷)
              </button>
            ) : (
              <div className="text-xs text-rose-400 bg-rose-950/40 px-4 py-3 rounded-xl border border-rose-800/40">
                امتیاز کمتر از ۷۰ است. امکان صدور معافیت مالیاتی وجود ندارد.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
