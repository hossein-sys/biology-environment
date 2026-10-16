import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  User,
  GraduationCap,
  Users,
  Award,
  UploadCloud,
  FileText,
  Trash2,
  Check,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import {
  agencyStorageService,
  COUNTIES,
  EVENT_CATEGORIES,
  TARGET_AUDIENCES,
} from '../services/agencyStorage';
import {
  Agency,
  CountyKey,
  CulturalEvent,
  EffectivenessRating,
  EventCategory,
  TargetAudience,
} from '../types/governmentalAgency';

interface GovernmentalEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeAgency: Agency;
  onEventCreated: (event: CulturalEvent) => void;
}

export const GovernmentalEventModal: React.FC<GovernmentalEventModalProps> = ({
  isOpen,
  onClose,
  activeAgency,
  onEventCreated,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: General Info
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventCategory>('workshop');
  const [county, setCounty] = useState<CountyKey>(activeAgency.county);
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('۱۴۰۵/۰۲/۰۱');
  const [durationHours, setDurationHours] = useState<number>(4);

  // Step 2: Instructor / Organizer
  const [organizerName, setOrganizerName] = useState(
    activeAgency.liaisonOfficer.fullName
  );
  const [instructorName, setInstructorName] = useState('');
  const [instructorResume, setInstructorResume] = useState('');

  // Step 3: Audience & Effectiveness
  const [targetAudience, setTargetAudience] =
    useState<TargetAudience>('employees');
  const [attendeeCount, setAttendeeCount] = useState<number>(60);
  const [effectivenessRating, setEffectivenessRating] =
    useState<EffectivenessRating>('excellent');
  const [description, setDescription] = useState('');

  // Step 4: Documents & Evidence
  const [evidenceFiles, setEvidenceFiles] = useState<
    Array<{ id: string; name: string; size: string; type: string }>
  >([
    {
      id: 'doc-1',
      name: 'لیست_حضور_و_غیاب_ممهور.pdf',
      size: '1.8 MB',
      type: 'PDF',
    },
    {
      id: 'doc-2',
      name: 'گزارش_تصویری_و_عکس‌های_کارگاه.jpg',
      size: '4.2 MB',
      type: 'JPG',
    },
  ]);
  const [newFileName, setNewFileName] = useState('');

  if (!isOpen) return null;

  const handleAddFile = () => {
    if (!newFileName.trim()) return;
    setEvidenceFiles((prev) => [
      ...prev,
      {
        id: 'f-' + Date.now(),
        name: newFileName.trim().replace(/\s+/g, '_') + '.pdf',
        size: '2.5 MB',
        type: 'PDF',
      },
    ]);
    setNewFileName('');
  };

  const handleRemoveFile = (id: string) => {
    setEvidenceFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !instructorName.trim()) {
      alert('لطفاً عنوان کارگاه و نام مدرس را تکمیل فرمایید.');
      return;
    }

    const newEvent = agencyStorageService.saveEvent(
      {
        title: title.trim(),
        category,
        county,
        location: location.trim() || 'سالن همایش‌های اداره',
        eventDate,
        durationHours: Number(durationHours) || 4,
        organizerName: organizerName.trim(),
        instructorName: instructorName.trim(),
        instructorResume:
          instructorResume.trim() ||
          'عضو هیئت علمی و پژوهشگر ارشد محیط‌زیست با تاییدیه صلاحیت کارگروه',
        targetAudience,
        attendeeCount: Number(attendeeCount) || 50,
        effectivenessRating,
        description: description.trim() || 'کارگاه ثبت‌شده بر اساس برنامه عمل فرهنگی استان',
        evidenceFiles,
      },
      activeAgency
    );

    onEventCreated(newEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] transition-colors">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black">
                ثبت کارگاه و اقدام فرهنگی - محیط‌زیستی
              </h3>
              <p className="text-xs text-emerald-100">
                دستگاه ثبت‌کننده: {activeAgency.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Indicator */}
        <div className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 px-6 py-3">
          <div className="flex items-center justify-between text-xs">
            {[
              { step: 1, label: '۱. مشخصات رویداد' },
              { step: 2, label: '۲. مدرس و مجری' },
              { step: 3, label: '۳. مخاطبان و اثربخشی' },
              { step: 4, label: '۴. مستندات و تایید' },
            ].map((s) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setCurrentStep(s.step)}
                className={`flex items-center gap-1.5 font-bold transition-colors ${
                  currentStep === s.step
                    ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600 dark:border-emerald-500 pb-1'
                    : currentStep > s.step
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                    currentStep === s.step
                      ? 'bg-emerald-600 text-white'
                      : currentStep > s.step
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {currentStep > s.step ? <Check className="w-3 h-3" /> : s.step}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body / Steps */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 text-xs">
          {/* STEP 1: General Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  عنوان دقیق دوره، کارگاه یا پویش زیست‌محیطی:
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: کارگاه آموزش مدیریت پسماند و تفکیک زباله از مبدا در مدارس"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    دسته‌بندی رویداد:
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as EventCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none"
                  >
                    {EVENT_CATEGORIES.map((c) => (
                      <option key={c.key} value={c.key} className="dark:bg-slate-800">
                        {c.nameFa}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    شهرستان محل برگزاری:
                  </label>
                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value as CountyKey)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none"
                  >
                    {COUNTIES.map((c) => (
                      <option key={c.key} value={c.key} className="dark:bg-slate-800">
                        {c.nameFa}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  مکان دقیق برگزاری (سالن، روستا، مدرسه، حاشیه رودخانه):
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="مثال: سالن همایش‌های فرمانداری ابهر"
                    className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    تاریخ برگزاری (خورشیدی):
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      placeholder="۱۴۰۵/۰۲/۰۱"
                      className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none font-mono text-left"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    مدت زمان آموزش (به ساعت):
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                    <input
                      type="number"
                      min={1}
                      max={80}
                      value={durationHours}
                      onChange={(e) => setDurationHours(Number(e.target.value))}
                      className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none font-mono text-left"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Instructor & Organizer */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  نام و سمت مسئول یا مجری برگزاری اقدام:
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    placeholder="نام رابط یا معاون اداره"
                    className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  نام و نام خانوادگی مدرس / کارشناس ارائه‌دهنده:
                </label>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={instructorName}
                    onChange={(e) => setInstructorName(e.target.value)}
                    placeholder="مثال: دکتر علیرضا نوری (عضو هیئت علمی دانشگاه زنجان)"
                    className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  سوابق، رزومه علمی و صلاحیت تجربی مدرس (مهم در امتیازدهی کارگروه):
                </label>
                <textarea
                  rows={4}
                  value={instructorResume}
                  onChange={(e) => setInstructorResume(e.target.value)}
                  placeholder="مدرک تحصیلی، سوابق پژوهشی، کتب یا مقالات مرتبط، تجارب قبلی در حوزه حفاظت محیط‌زیست زنجان..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none leading-relaxed"
                />
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                  نکته: بهره‌گیری از اساتید دانشگاهی و کارشناسان دارای گواهی تدریس رسمی سبب ارتقای ضریب کیفی اقدام خواهد شد.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Audience & Effectiveness */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    گروه هدف مخاطبان:
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                    <select
                      value={targetAudience}
                      onChange={(e) =>
                        setTargetAudience(e.target.value as TargetAudience)
                      }
                      className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none"
                    >
                      {TARGET_AUDIENCES.map((a) => (
                        <option key={a.key} value={a.key} className="dark:bg-slate-800">
                          {a.nameFa}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    تعداد کل فراگیران / مخاطبان مستقیم:
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={10000}
                    value={attendeeCount}
                    onChange={(e) => setAttendeeCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none font-mono text-left"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  سطح اثربخشی اولیه رویداد (بر اساس کاربرگ نظرسنجی استاندارد):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  {[
                    {
                      key: 'excellent',
                      title: 'عالی (بالای ۹۰٪ رضایت و یادگیری)',
                      desc: 'تغییر نگرش ملموس و کسب نمرات بالای آزمون',
                    },
                    {
                      key: 'good',
                      title: 'خوب (۷۵٪ تا ۹۰٪ اثربخشی)',
                      desc: 'مشارکت فعال و رضایت بالای میانگین',
                    },
                    {
                      key: 'medium',
                      title: 'متوسط (۵۰٪ تا ۷۵٪)',
                      desc: 'مشارکت نسبی نیازمند پیگیری تکمیلی',
                    },
                    {
                      key: 'weak',
                      title: 'ضعیف و نیازمند بازنگری',
                      desc: 'اثربخشی پایین کمتر از ۵۰٪',
                    },
                  ].map((r) => (
                    <label
                      key={r.key}
                      onClick={() =>
                        setEffectivenessRating(r.key as EffectivenessRating)
                      }
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        effectivenessRating === r.key
                          ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/70 text-emerald-900 dark:text-emerald-200 font-bold'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="eff"
                          checked={effectivenessRating === r.key}
                          onChange={() =>
                            setEffectivenessRating(r.key as EffectivenessRating)
                          }
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-xs">{r.title}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 mr-5">
                        {r.desc}
                      </p>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  خلاصه محتوا، نتایج و دستاوردهای حاصله:
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="سرفصل‌های تدریس شده، مصوبات یا خروجی‌های رفتاری حاصله از کارگاه..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Proof & Documents */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-800/60 flex items-start gap-3">
                <Award className="w-5 h-5 text-emerald-700 dark:text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-xs">
                    تعهد صحت اطلاعات و مستندات قانونی
                  </h4>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5 leading-relaxed">
                    با ثبت این رویداد، مستندات پیوست مستقیماً به کارتابل ارزیابان کارگروه ارتقای فرهنگ محیط‌زیست استان زنجان ارسال شده و بر مبنای آن امتیاز رسمی محاسبه می‌شود.
                  </p>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  پیوست مستندات (صورتجلسه، عکس‌ها، فرم‌های نظرسنجی و لیست امضا):
                </label>

                {/* Simulated File List */}
                <div className="space-y-2 mb-3">
                  {evidenceFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="font-medium text-slate-700 dark:text-slate-200">
                          {file.name}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                          ({file.size})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(file.id)}
                        className="p-1 text-rose-500 hover:text-rose-700 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Mock File Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="نام فایل جدید (مثال: لینک_گزارش_خبری_صداوسیما)"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddFile}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>افزودن مدرک</span>
                  </button>
                </div>
              </div>

              {/* Summary Review */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <p className="font-bold text-slate-800 dark:text-slate-200 text-xs mb-2">
                  پیش‌نمایش خلاصه اقدام قبل از ثبت نهایی:
                </p>
                <div className="text-slate-600 dark:text-slate-300 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">عنوان: </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {title || 'ثبت نشده'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">مدرس: </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {instructorName || 'ثبت نشده'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">مدت و حاضرین: </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {durationHours} ساعت / {attendeeCount} نفر
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">شهرستان: </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">
                      {COUNTIES.find((c) => c.key === county)?.nameFa}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s - 1)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5"
              >
                <ChevronRight className="w-4 h-4" />
                <span>مرحله قبل</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => s + 1)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <span>مرحله بعد</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-bold shadow-md shadow-emerald-700/20 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>ثبت نهایی و ارسال به کارتابل ارزیابی</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
