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
  Sparkles,
  ChevronRight,
  TrendingUp,
  MapPin,
  UploadCloud,
  X,
  Send,
  Calendar,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Company, ActivityLog, DiscountIncentive, EvidenceFile } from '../types';
import { storageService } from '../services/storage';

interface CompanyDashboardViewProps {
  company: Company;
  logs: ActivityLog[];
  vouchers: DiscountIncentive[];
  onOpenCertificateModal: (voucher: DiscountIncentive) => void;
  onRefreshData: () => void;
  onNavigateToRewards: () => void;
}

export const CompanyDashboardView: React.FC<CompanyDashboardViewProps> = ({
  company,
  logs,
  vouchers,
  onOpenCertificateModal,
  onRefreshData,
  onNavigateToRewards,
}) => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Form State for Recording New Activity
  const [pillar, setPillar] = useState<'waste' | 'water' | 'air' | 'csr'>('waste');
  const [activityTitle, setActivityTitle] = useState('');
  const [period, setPeriod] = useState('بهار ۱۴۰۵');
  const [description, setDescription] = useState('');
  const [metricAmount, setMetricAmount] = useState<number>(50);
  const [metricUnit, setMetricUnit] = useState<string>('تن پسماند خنثی‌شده');
  const [utmCoordinates, setUtmCoordinates] = useState('39S 478200 4048900');
  const [uploadedFiles, setUploadedFiles] = useState<EvidenceFile[]>([
    {
      id: 'mock-1',
      fileName: 'گزارش_آنالیز_آزمایشگاه_معتمد_محیط‌زیست.pdf',
      fileType: 'lab_report',
      fileTypeFa: 'گزارش آزمایشگاه معتمد',
      fileUrl: '#',
      fileSize: 1850000,
      uploadedAt: '۱۴۰۵/۰۱/۱۵',
      description: 'گزارش دوره‌ای فلزات سنگین',
    },
  ]);
  const [dragOver, setDragOver] = useState(false);

  const activeVouchers = vouchers.filter((v) => v.status === 'active');
  const isPlatinum = company.currentTier === 'platinum';

  const tierBadgeMap = {
    platinum: {
      title: 'صنعت سبز برتر - پلاتین',
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      tag: 'معافیت ۱۰۰٪ ماده ۲۷ عوارض آلایندگی',
      nextTierText: 'حداکثر امتیاز و معافیت کامل قانونی محقق شده است',
      nextThreshold: 100,
    },
    gold: {
      title: 'صنعت سبز همیار - طلا',
      bg: 'bg-amber-50 text-amber-800 border-amber-300',
      tag: 'تخفیف ۵۰٪ ماده ۲۷ عوارض آلایندگی',
      nextTierText: '۷ امتیاز تا ارتقا به رتبه پلاتین و معافیت ۱۰۰٪',
      nextThreshold: 85,
    },
    silver: {
      title: 'واحد در حال ارتقا - نقره',
      bg: 'bg-slate-100 text-slate-700 border-slate-300',
      tag: 'دوره اصلاح و فاقد معافیت مالیاتی',
      nextTierText: '۱۶ امتیاز تا کسب رتبه طلا و ۵۰٪ معافیت ماده ۲۷',
      nextThreshold: 70,
    },
    red: {
      title: 'واحد آلاینده مشمول جریمه',
      bg: 'bg-rose-50 text-rose-700 border-rose-300',
      tag: 'مشمول حداکثر عوارض سبز ماده ۲۷',
      nextTierText: 'نیازمند اصلاح فوری فیلتراسیون و مدیریت پسماند',
      nextThreshold: 50,
    },
    pending: {
      title: 'در حال بازبینی کارگروه',
      bg: 'bg-cyan-50 text-cyan-800 border-cyan-300',
      tag: 'پرونده در نوبت ممیزی',
      nextTierText: 'در انتظار تایید مدارک',
      nextThreshold: 70,
    },
  };

  const currentBadge = tierBadgeMap[company.currentTier] || tierBadgeMap.pending;

  const filteredLogs = logs.filter((log) => {
    if (filterStatus === 'all') return true;
    return log.status === filterStatus;
  });

  const handleSimulateDrop = (e: React.DragEvent | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDragOver(false);
    const newFile: EvidenceFile = {
      id: 'mock-file-' + Date.now(),
      fileName: 'مستند_آزمایشگاه_معتمد_' + (uploadedFiles.length + 1) + '.pdf',
      fileType: 'lab_report',
      fileTypeFa: 'مستند پیوستی',
      fileUrl: '#',
      fileSize: 2100000,
      uploadedAt: '۱۴۰۵/۰۱/۱۵',
      description: 'فایل بارگذاری‌شده آزمایشی',
    };
    setUploadedFiles([...uploadedFiles, newFile]);
  };

  const handlePillarChange = (newPillar: 'waste' | 'water' | 'air' | 'csr') => {
    setPillar(newPillar);
    if (newPillar === 'waste') setMetricUnit('تن پسماند/باطله خنثی‌شده');
    if (newPillar === 'water') setMetricUnit('مترمکعب پساب بازچرخانی‌شده');
    if (newPillar === 'air') setMetricUnit('درصد راندمان فیلتراسیون هوا');
    if (newPillar === 'csr') setMetricUnit('ساعت آموزش محیط‌زیست پرسنل');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityTitle) {
      alert('لطفاً عنوان اقدام انجام شده را وارد نمایید.');
      return;
    }

    storageService.saveActivityLog(
      {
        period,
        wasteManagement: {
          tailingsProducedTons: pillar === 'waste' ? metricAmount * 1.1 : 0,
          tailingsNeutralizedTons: pillar === 'waste' ? metricAmount : 0,
          filterPressActive: true,
          filterPressThroughputTonsPerDay: 40,
          geomembraneIsolation: true,
          hazardousWasteTransferredTons: metricAmount,
          safeDisposalSiteLocation: 'سایت استاندارد دندی/شهرک روی',
        },
        waterResources: {
          waterConsumedM3: pillar === 'water' ? metricAmount * 1.25 : 0,
          greywaterRecycledM3: pillar === 'water' ? metricAmount : 0,
          recyclingRatePercentage: pillar === 'water' ? 80 : 0,
          zeroLiquidDischargeActive: true,
          qezelOzanDirectDischarge: false,
          effluentCodBODCompliant: true,
          waterAuditReportAttached: true,
        },
        airAndDust: {
          bagFilterEfficiency: pillar === 'air' ? metricAmount : 95,
          dustSuppressionSprayingActive: true,
          greenSpaceAreaM2: 12000,
          treesPlantedCount: 200,
          continuousOnlineMonitoringActive: true,
        },
        csrAndEducation: {
          csrBudgetRials: pillar === 'csr' ? metricAmount * 10000000 : 5000000000,
          communityProjectsDescription: description,
          targetVillagesHelped: ['انگوران', 'دندی', 'دیزج‌آباد'],
          staffTrainingHours: pillar === 'csr' ? metricAmount : 40,
          staffTrainedCount: 30,
          schoolOutreachFunded: true,
        },
        evidenceFiles: uploadedFiles,
      },
      company
    );

    setIsSubmitModalOpen(false);
    setActivityTitle('');
    setDescription('');
    onRefreshData();

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#059669'],
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. STATUS HEADER */}
      <div className="rounded-3xl bg-white border border-emerald-100 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Company Details */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${currentBadge.bg}`}>
                {currentBadge.title}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                شهرستان {company.countyFa}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-mono">
                شناسه ملی: {company.shenaseMelli}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-emerald-950">
              {company.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {company.industrialPark} • {company.sector}
              <br />
              <span className="font-semibold text-emerald-700">{currentBadge.tag}</span>
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm shadow-emerald-600/30 transition-all hover:scale-102 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              ثبت فعالیت و اثر محیط‌زیستی جدید
            </button>

            {activeVouchers.length > 0 && (
              <button
                onClick={() => onOpenCertificateModal(activeVouchers[0])}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-600" />
                مشاهده و چاپ گواهینامه رسمی
              </button>
            )}
          </div>
        </div>

        {/* Score & Progress to Next Reward Tier */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Current Score */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
            <span className="text-xs text-slate-500 block mb-1">امتیاز انطباق کنونی</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-emerald-900 font-vazir">
                {company.currentScore}
              </span>
              <span className="text-xs text-slate-500">/ ۱۰۰ امتیاز</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">مسیر ارتقا به رتبه بعدی پاداش</span>
              <span className="text-emerald-700 font-semibold">{currentBadge.nextTierText}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${company.currentScore}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>حداقل نقره (۵۰)</span>
              <span>حدنصاب طلا - ۵۰٪ معافیت (۷۰)</span>
              <span>حدنصاب پلاتین - ۱۰۰٪ معافیت (۸۵)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RECORD NEW ACTIVITY FORM (MODAL) */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white border border-emerald-100 rounded-3xl shadow-xl overflow-hidden my-8">
            <div className="bg-emerald-50/70 px-6 py-4 border-b border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white text-emerald-600 shadow-2xs border border-emerald-100">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-950">
                    ثبت فعالیت و اثرات محیط‌زیستی
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    واحد: <strong>{company.name}</strong> ({company.countyFa})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
              {/* Pillar Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  انتخاب حوزه و محور اقدام:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handlePillarChange('waste')}
                    className={`p-3 rounded-2xl border text-xs font-bold text-right transition-all flex flex-col justify-between h-20 ${
                      pillar === 'waste'
                        ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Trash2 className="w-4 h-4 text-amber-600" />
                    <span>پسماند و باطله روی</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePillarChange('water')}
                    className={`p-3 rounded-2xl border text-xs font-bold text-right transition-all flex flex-col justify-between h-20 ${
                      pillar === 'water'
                        ? 'bg-cyan-50 border-cyan-300 text-cyan-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Droplets className="w-4 h-4 text-cyan-600" />
                    <span>آب و قزل‌اوزن</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePillarChange('air')}
                    className={`p-3 rounded-2xl border text-xs font-bold text-right transition-all flex flex-col justify-between h-20 ${
                      pillar === 'air'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Wind className="w-4 h-4 text-emerald-600" />
                    <span>هوا و گردوغبار</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePillarChange('csr')}
                    className={`p-3 rounded-2xl border text-xs font-bold text-right transition-all flex flex-col justify-between h-20 ${
                      pillar === 'csr'
                        ? 'bg-violet-50 border-violet-300 text-violet-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <HeartHandshake className="w-4 h-4 text-violet-600" />
                    <span>مسئولیت CSR</span>
                  </button>
                </div>
              </div>

              {/* Title & Period */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    عنوان اقدام انجام شده
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: آب‌بندی سد باطله با ژئوممبران / راه‌اندازی فیلترپرس"
                    value={activityTitle}
                    onChange={(e) => setActivityTitle(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">دوره</label>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="بهار ۱۴۰۵">بهار ۱۴۰۵</option>
                    <option value="زمستان ۱۴۰۴">زمستان ۱۴۰۴</option>
                    <option value="پاییز ۱۴۰۴">پاییز ۱۴۰۴</option>
                  </select>
                </div>
              </div>

              {/* Measurable Impact & UTM */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    اثر کمی اقدام ({metricUnit})
                  </label>
                  <input
                    type="number"
                    required
                    value={metricAmount}
                    onChange={(e) => setMetricAmount(Number(e.target.value))}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    مختصات جغرافیایی یا UTM محل اقدام
                  </label>
                  <input
                    type="text"
                    value={utmCoordinates}
                    onChange={(e) => setUtmCoordinates(e.target.value)}
                    placeholder="39S 478200 4048900"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  شرح اقدام انجام شده یا در حال انجام
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="توضیحات پیرامون نحوه اجرا، استانداردهای آزمایشگاهی، و کاهش میزان آلاینده‌ها..."
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Drag and Drop Mock File Upload */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  پیوست نتایج آزمایشگاه معتمد یا گزارش تصویری
                </label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleSimulateDrop}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all cursor-pointer ${
                    dragOver
                      ? 'border-emerald-400 bg-emerald-50'
                      : 'border-slate-200 hover:border-emerald-300 bg-slate-50/50'
                  }`}
                >
                  <input
                    type="file"
                    id="activity-file"
                    className="hidden"
                    onChange={handleSimulateDrop}
                  />
                  <label htmlFor="activity-file" className="cursor-pointer">
                    <UploadCloud className="w-7 h-7 mx-auto text-emerald-600 mb-1" />
                    <p className="text-xs text-slate-800 font-bold">
                      فایل گزارش یا عکس را بکشید یا برای انتخاب کلیک کنید
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      PDF گزارش آزمایشگاه معتمد، نتایج آنالیز فلزات سنگین، فرم خوداظهاری
                    </p>
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    {uploadedFiles.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <FileCheck2 className="w-4 h-4 text-emerald-600" />
                          <span className="text-slate-800 font-medium">{f.fileName}</span>
                        </div>
                        <span className="text-[11px] text-emerald-700 font-bold">پیوست شد ✓</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/25 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  ارسال گزارش به کارتابل بازرسان
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. MY ACTIVITY HISTORY TABLE */}
      <div className="rounded-3xl bg-white border border-emerald-100 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              سوابق فعالیت‌های ثبت‌شده و امتیازات احرازشده
            </h3>
            <p className="text-xs text-slate-500">
              اقدامات انجام‌شده در حوزه‌های باطله روی، بازچرخانی آب، فیلتراسیون هوا و مسئولیت اجتماعی
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-xl transition-all ${
                filterStatus === 'all'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              همه ({logs.length})
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-3 py-1 rounded-xl transition-all ${
                filterStatus === 'approved'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              تایید شده
            </button>
            <button
              onClick={() => setFilterStatus('under_review')}
              className={`px-3 py-1 rounded-xl transition-all ${
                filterStatus === 'under_review'
                  ? 'bg-amber-500 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              در انتظار بررسی
            </button>
            <button
              onClick={() => setFilterStatus('revision_required')}
              className={`px-3 py-1 rounded-xl transition-all ${
                filterStatus === 'revision_required'
                  ? 'bg-rose-500 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              نیازمند اصلاح
            </button>
          </div>
        </div>

        {/* Table */}
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            هیچ گزارشی با این فیلتر ثبت نشده است.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[11px]">
                  <th className="py-3 px-3">دوره / تاریخ</th>
                  <th className="py-3 px-3">شاخص‌های کمی تاییدشده</th>
                  <th className="py-3 px-3">مستندات پیوستی</th>
                  <th className="py-3 px-3">وضعیت بررسی</th>
                  <th className="py-3 px-3">نظرات ممیز اداره کل</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map((log) => {
                  const statusPillClass =
                    log.status === 'approved'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : log.status === 'under_review'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200';

                  return (
                    <tr key={log._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-slate-900">{log.period}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {log.submittedAt || '۱۴۰۵'}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {log.wasteManagement.tailingsNeutralizedTons > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-medium">
                              <Trash2 className="w-3 h-3" />
                              {log.wasteManagement.tailingsNeutralizedTons.toLocaleString('fa-IR')} تن باطله
                            </span>
                          )}
                          {log.waterResources.recyclingRatePercentage > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cyan-50 text-cyan-800 border border-cyan-200 text-[10px] font-medium">
                              <Droplets className="w-3 h-3" />
                              {log.waterResources.recyclingRatePercentage}٪ بازچرخانی
                            </span>
                          )}
                          {log.airAndDust.bagFilterEfficiency > 0 && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-medium">
                              <Wind className="w-3 h-3" />
                              {log.airAndDust.bagFilterEfficiency}٪ فیلتر
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        {log.evidenceFiles.length > 0 ? (
                          <span className="text-slate-600 font-medium">
                            {log.evidenceFiles.length} مستند آزمایشگاهی
                          </span>
                        ) : (
                          <span className="text-slate-400">فاقد فایل</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-[11px] font-bold border ${statusPillClass}`}>
                          {log.statusFa}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 max-w-xs text-[11px] text-slate-600">
                        {log.reviewerNotes || 'در انتظار تایید نهایی کارشناس اداره کل...'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
