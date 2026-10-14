import React, { useState } from 'react';
import {
  X,
  Send,
  UploadCloud,
  FileCheck2,
  Trash2,
  Droplets,
  Wind,
  HeartHandshake,
  Calendar,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { Company, EvidenceFile } from '../types';
import { storageService } from '../services/storage';

interface ActivitySubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company;
  onActivitySubmitted: () => void;
}

export const ActivitySubmissionModal: React.FC<ActivitySubmissionModalProps> = ({
  isOpen,
  onClose,
  company,
  onActivitySubmitted,
}) => {
  const [activePillar, setActivePillar] = useState<'waste' | 'water' | 'air' | 'csr'>('waste');
  const [title, setTitle] = useState('');
  const [period, setPeriod] = useState('بهار ۱۴۰۵');
  const [description, setDescription] = useState('');

  // Pillar 1: Waste Management
  const [wasteTons, setWasteTons] = useState(5000);
  const [neutralizedTons, setNeutralizedTons] = useState(4800);
  const [filterPress, setFilterPress] = useState(true);
  const [geomembrane, setGeomembrane] = useState(true);
  const [wasteLocation, setWasteLocation] = useState('سد باطله ایزوله سرپوشیده دندی');

  // Pillar 2: Water Resources
  const [waterConsumed, setWaterConsumed] = useState(30000);
  const [waterRecycled, setWaterRecycled] = useState(24000);
  const [zldActive, setZldActive] = useState(true);
  const [effluentCompliant, setEffluentCompliant] = useState(true);

  // Pillar 3: Air & Dust
  const [filterEfficiency, setFilterEfficiency] = useState(96);
  const [sprayingActive, setSprayingActive] = useState(true);
  const [greenSpaceM2, setGreenSpaceM2] = useState(25000);
  const [treesCount, setTreesCount] = useState(500);

  // Pillar 4: CSR & Education
  const [csrBudgetTomans, setCsrBudgetTomans] = useState(850); // Millions/Billions
  const [targetVillages, setTargetVillages] = useState('انگوران، دندی');
  const [trainingHours, setTrainingHours] = useState(48);
  const [trainedStaff, setTrainedStaff] = useState(35);

  // Mock Upload Files
  const [uploadedFiles, setUploadedFiles] = useState<EvidenceFile[]>([
    {
      id: 'mock-file-1',
      fileName: 'نتایج_آنالیز_آزمایشگاه_معتمد_محیط_زیست.pdf',
      fileType: 'lab_report',
      fileTypeFa: 'گزارش آزمایشگاه معتمد',
      fileUrl: '#',
      fileSize: 1840000,
      uploadedAt: '۱۴۰۵/۰۱/۱۴',
      description: 'گزارش پایش دوره‌ای',
    },
  ]);
  const [dragOver, setDragOver] = useState(false);

  if (!isOpen) return null;

  const handleSimulateDrop = (e: React.DragEvent | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDragOver(false);
    const newFile: EvidenceFile = {
      id: 'mock-file-' + Date.now(),
      fileName: 'مستندات_اقدام_زیست‌محیطی_' + (uploadedFiles.length + 1) + '.pdf',
      fileType: 'lab_report',
      fileTypeFa: 'مستند پیوستی',
      fileUrl: '#',
      fileSize: Math.floor(1000000 + Math.random() * 2000000),
      uploadedAt: '۱۴۰۵/۰۱/۱۵',
      description: 'فایل بارگذاری شده توسط شرکت',
    };
    setUploadedFiles([...uploadedFiles, newFile]);
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('لطفاً عنوان خوداظهاری اقدام را وارد نمایید.');
      return;
    }

    const recyclingRate = waterConsumed > 0 ? (waterRecycled / waterConsumed) * 100 : 0;

    storageService.saveActivityLog(
      {
        period,
        wasteManagement: {
          tailingsProducedTons: Number(wasteTons),
          tailingsNeutralizedTons: Number(neutralizedTons),
          filterPressActive: filterPress,
          filterPressThroughputTonsPerDay: Math.round(neutralizedTons / 30),
          geomembraneIsolation: geomembrane,
          hazardousWasteTransferredTons: Number(neutralizedTons),
          safeDisposalSiteLocation: wasteLocation,
        },
        waterResources: {
          waterConsumedM3: Number(waterConsumed),
          greywaterRecycledM3: Number(waterRecycled),
          recyclingRatePercentage: Math.round(recyclingRate * 10) / 10,
          zeroLiquidDischargeActive: zldActive,
          qezelOzanDirectDischarge: false,
          effluentCodBODCompliant: effluentCompliant,
          waterAuditReportAttached: true,
        },
        airAndDust: {
          bagFilterEfficiency: Number(filterEfficiency),
          dustSuppressionSprayingActive: sprayingActive,
          greenSpaceAreaM2: Number(greenSpaceM2),
          treesPlantedCount: Number(treesCount),
          continuousOnlineMonitoringActive: true,
        },
        csrAndEducation: {
          csrBudgetRials: Number(csrBudgetTomans) * 10000000,
          communityProjectsDescription: description || `اقدامات کاهش آلایندگی در حوزه ${targetVillages}`,
          targetVillagesHelped: targetVillages.split('،').map((s) => s.trim()),
          staffTrainingHours: Number(trainingHours),
          staffTrainedCount: Number(trainedStaff),
          schoolOutreachFunded: true,
        },
        evidenceFiles: uploadedFiles,
      },
      company
    );

    onActivitySubmitted();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 px-6 py-4 border-b border-emerald-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                ثبت خوداظهاری اقدام و عملکرد زیست‌محیطی ۴ محوره
              </h3>
              <p className="text-[11px] text-slate-400">
                واحد: <strong>{company.name}</strong> ({company.countyFa})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* General Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">
                عنوان اقدام / طرح ارتقای زیست‌محیطی
              </label>
              <input
                type="text"
                required
                placeholder="مثال: راه‌اندازی فیلترپرس و آب‌بندی ژئوممبران سد باطله"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">دوره خوداظهاری</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="بهار ۱۴۰۵">بهار ۱۴۰۵</option>
                <option value="زمستان ۱۴۰۴">زمستان ۱۴۰۴</option>
                <option value="پاییز ۱۴۰۴">پاییز ۱۴۰۴</option>
              </select>
            </div>
          </div>

          {/* 4 Pillars Tab Switcher */}
          <div className="border border-slate-700/80 rounded-2xl p-4 bg-slate-850/60">
            <span className="text-[11px] text-slate-400 block mb-2 font-semibold">
              ارکان چهارگانه سند محیط‌زیست زنجان:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setActivePillar('waste')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activePillar === 'waste'
                    ? 'bg-amber-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                ۱. باطله و پسماند روی
              </button>
              <button
                type="button"
                onClick={() => setActivePillar('water')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activePillar === 'water'
                    ? 'bg-cyan-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Droplets className="w-3.5 h-3.5" />
                ۲. منابع آب و قزل‌اوزن
              </button>
              <button
                type="button"
                onClick={() => setActivePillar('air')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activePillar === 'air'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Wind className="w-3.5 h-3.5" />
                ۳. هوا و گرد و غبار
              </button>
              <button
                type="button"
                onClick={() => setActivePillar('csr')}
                className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activePillar === 'csr'
                    ? 'bg-violet-600 text-white shadow'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                ۴. مسئولیت CSR و آموزش
              </button>
            </div>

            {/* Pillar Content 1: Waste */}
            {activePillar === 'waste' && (
              <div className="space-y-3 pt-2 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">
                      میزان باطله تولیدشده در دوره (تن)
                    </label>
                    <input
                      type="number"
                      value={wasteTons}
                      onChange={(e) => setWasteTons(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">
                      میزان باطله تثبیت/خنثی‌شده (تن)
                    </label>
                    <input
                      type="number"
                      value={neutralizedTons}
                      onChange={(e) => setNeutralizedTons(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterPress}
                      onChange={(e) => setFilterPress(e.target.checked)}
                      className="rounded accent-emerald-500 w-4 h-4"
                    />
                    سیستم فیلترپرس باطله فعال است
                  </label>
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={geomembrane}
                      onChange={(e) => setGeomembrane(e.target.checked)}
                      className="rounded accent-emerald-500 w-4 h-4"
                    />
                    عایق‌بندی کامل ژئوممبران سد باطله اجرا شده است
                  </label>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">محل و نحوه نگهداری باطله</label>
                  <input
                    type="text"
                    value={wasteLocation}
                    onChange={(e) => setWasteLocation(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                  />
                </div>
              </div>
            )}

            {/* Pillar Content 2: Water */}
            {activePillar === 'water' && (
              <div className="space-y-3 pt-2 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">
                      آب مصرفی صنعتی کل (مترمکعب)
                    </label>
                    <input
                      type="number"
                      value={waterConsumed}
                      onChange={(e) => setWaterConsumed(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">
                      حجم پساب بازچرخانی‌شده (مترمکعب)
                    </label>
                    <input
                      type="number"
                      value={waterRecycled}
                      onChange={(e) => setWaterRecycled(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={zldActive}
                      onChange={(e) => setZldActive(e.target.checked)}
                      className="rounded accent-cyan-500 w-4 h-4"
                    />
                    تخلیه مایع صفر (ZLD) - عدم تخلیه هرگونه پساب به رودخانه قزل‌اوزن
                  </label>
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={effluentCompliant}
                      onChange={(e) => setEffluentCompliant(e.target.checked)}
                      className="rounded accent-cyan-500 w-4 h-4"
                    />
                    انطباق پارامترهای COD/BOD و فلزات سنگین با استاندارد ملی
                  </label>
                </div>
              </div>
            )}

            {/* Pillar Content 3: Air */}
            {activePillar === 'air' && (
              <div className="space-y-3 pt-2 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">
                      راندمان عملکرد فیلتراسیون هوا / بگ‌فیلتر (درصد)
                    </label>
                    <input
                      type="number"
                      max={100}
                      value={filterEfficiency}
                      onChange={(e) => setFilterEfficiency(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">مساحت فضای سبز محوطه (مترمربع)</label>
                    <input
                      type="number"
                      value={greenSpaceM2}
                      onChange={(e) => setGreenSpaceM2(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sprayingActive}
                      onChange={(e) => setSprayingActive(e.target.checked)}
                      className="rounded accent-emerald-500 w-4 h-4"
                    />
                    آب‌پاشی و تثبیت گرد و غبار دپوهای روباز و مسیرهای تردد
                  </label>
                </div>
              </div>
            )}

            {/* Pillar Content 4: CSR */}
            {activePillar === 'csr' && (
              <div className="space-y-3 pt-2 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1">
                      بودجه مسئولیت اجتماعی CSR (میلیون تومان)
                    </label>
                    <input
                      type="number"
                      value={csrBudgetTomans}
                      onChange={(e) => setCsrBudgetTomans(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-300 block mb-1">ساعات آموزش محیط‌زیست پرسنل</label>
                    <input
                      type="number"
                      value={trainingHours}
                      onChange={(e) => setTrainingHours(Number(e.target.value))}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">
                    روستاهای همجوار تحت پوشش خدمات CSR
                  </label>
                  <input
                    type="text"
                    value={targetVillages}
                    onChange={(e) => setTargetVillages(e.target.value)}
                    placeholder="مثال: انگوران، دندی، سراب، دیزج‌آباد"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              شرح تفصیلی اقدامات و نتایج کاهش آلایندگی
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="توضیحات تکمیلی پیرامون اصلاح فرآیند، استانداردهای ایزو، یا کاهش بار آلودگی..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Visual Mock Drag-and-Drop File Uploader */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              بارگذاری مستندات و گزارش آزمایشگاه معتمد (Mock File Uploader)
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
                  ? 'border-emerald-400 bg-emerald-950/30'
                  : 'border-slate-700 hover:border-slate-500 bg-slate-800/40'
              }`}
            >
              <input
                type="file"
                id="file-input"
                className="hidden"
                onChange={handleSimulateDrop}
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <UploadCloud className="w-8 h-8 mx-auto text-emerald-400 mb-2" />
                <p className="text-xs text-slate-200 font-semibold">
                  فایل‌های تاییدیه را اینجا بکشید یا برای انتخاب کلیک کنید
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  پشتیبانی از PDF، تصاویر UTM سد باطله و گواهی آزمایشگاه معتمد (حداکثر ۱۰ مگابایت)
                </p>
              </label>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedFiles.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-200 font-medium">{f.fileName}</span>
                      <span className="text-[10px] text-slate-400">
                        ({(f.fileSize / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(f.id)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-950 transition-all"
            >
              <Send className="w-4 h-4" />
              ارسال خوداظهاری به کارتابل بازرسان محیط‌زیست
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
