import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  Search,
  FileText,
  User,
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  Sparkles,
  MessageSquare,
  AlertCircle,
  Building2,
} from 'lucide-react';
import { CulturalEvent, Agency } from '../types/governmentalAgency';
import { agencyStorageService } from '../services/agencyStorage';

interface GovernmentalAdminReviewProps {
  events: CulturalEvent[];
  agencies: Agency[];
  onRefreshData: () => void;
}

export const GovernmentalAdminReview: React.FC<GovernmentalAdminReviewProps> = ({
  events,
  agencies,
  onRefreshData,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('pending');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Review action state
  const [pointsToAward, setPointsToAward] = useState<number>(25);
  const [reviewerNotes, setReviewerNotes] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredEvents = events.filter((e) => {
    const matchesStatus = filterStatus === 'all' || e.status === filterStatus;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.agencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.instructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.countyFa.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const selectedEvent = events.find((e) => e._id === selectedEventId) || filteredEvents[0];

  const pendingCount = events.filter((e) => e.status === 'pending').length;
  const approvedCount = events.filter((e) => e.status === 'approved').length;
  const revisionCount = events.filter((e) => e.status === 'revision_required').length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprove = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    agencyStorageService.updateEventStatus(
      selectedEvent._id,
      'approved',
      reviewerNotes.trim() || 'اقدام و مستندات مربوطه توسط کارگروه استانی تایید شد.',
      pointsToAward
    );
    showToast(`اقدام با موفقیت تایید و ${pointsToAward} امتیاز به ${selectedEvent.agencyName} اعطا گردید.`);
    setReviewerNotes('');
    onRefreshData();
  };

  const handleReject = () => {
    if (!selectedEvent) return;
    if (!reviewerNotes.trim()) {
      alert('لطفاً علت درخواست اصلاح یا رد اقدام را در کادر توضیحات داور وارد نمایید.');
      return;
    }

    agencyStorageService.updateEventStatus(
      selectedEvent._id,
      'revision_required',
      reviewerNotes.trim(),
      0
    );
    showToast(`وضعیت اقدام به «نیازمند اصلاح» تغییر یافت و یادداشت برای اداره مربوطه ارسال شد.`);
    setReviewerNotes('');
    onRefreshData();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-900 text-white px-6 py-3 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center gap-2 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>کارتابل تخصصی هیئت داوران و بازرسان کارگروه استانی</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              ارزیابی اقدامات، راستی‌آزمایی مستندات و اعطای امتیاز
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              بررسی صلاحیت اساتید، گزارش‌های تصویری، لیست‌های حضور و غیاب، و اثربخشی میدانی کارگاه‌های ارسالی توسط دستگاه‌های اجرایی استان زنجان.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <span className="text-2xl font-black text-amber-300">{pendingCount}</span>
              <p className="text-[11px] text-slate-300 mt-1">در انتظار بررسی</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <span className="text-2xl font-black text-emerald-400">{approvedCount}</span>
              <p className="text-[11px] text-slate-300 mt-1">تایید نهایی</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
              <span className="text-2xl font-black text-rose-300">{revisionCount}</span>
              <p className="text-[11px] text-slate-300 mt-1">نیازمند اصلاح</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Layout: Left/Top Queue, Right/Bottom Detailed Review */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Queue List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-emerald-100 dark:border-slate-800 p-4 shadow-sm space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-slate-800 dark:text-slate-100">
                صف پرونده‌های داوری
              </h3>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-bold">
                {filteredEvents.length} مورد
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                  filterStatus === 'pending'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                در انتظار ({pendingCount})
              </button>
              <button
                onClick={() => setFilterStatus('approved')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                  filterStatus === 'approved'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                تایید شده ({approvedCount})
              </button>
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                همه ({events.length})
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="جستجو بر اساس دستگاه، عنوان یا شهرستان..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-9 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-2.5 max-h-[600px] overflow-y-auto">
            {filteredEvents.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-400">
                موردی در این دسته وجود ندارد.
              </div>
            ) : (
              filteredEvents.map((event) => {
                const isSelected = selectedEvent?._id === event._id;
                return (
                  <div
                    key={event._id}
                    onClick={() => setSelectedEventId(event._id)}
                    className={`p-4 rounded-3xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/60 border-emerald-500 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-slate-100 leading-snug line-clamp-2">
                        {event.title}
                      </span>
                      {event.status === 'approved' ? (
                        <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full shrink-0">
                          تایید شده
                        </span>
                      ) : event.status === 'pending' ? (
                        <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full shrink-0">
                          در انتظار
                        </span>
                      ) : (
                        <span className="text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold px-2 py-0.5 rounded-full shrink-0">
                          نیازمند اصلاح
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span className="font-medium text-emerald-800 dark:text-emerald-400">
                        {event.agencyName}
                      </span>
                      <span className="text-slate-400 dark:text-slate-400">{event.countyFa}</span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-400">
                      <span>مدرس: {event.instructorName}</span>
                      <span>{event.durationHours} ساعت / {event.attendeeCount} نفر</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Detailed Evaluation Workspace (7 Cols) */}
        <div className="lg:col-span-7">
          {selectedEvent ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-emerald-100 dark:border-slate-800 p-6 shadow-sm space-y-6 transition-colors">
              {/* Event Title & Header */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-bold mb-1">
                  <Building2 className="w-4 h-4" />
                  <span>{selectedEvent.agencyName}</span>
                  <span>•</span>
                  <span>شهرستان {selectedEvent.countyFa}</span>
                </div>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 leading-snug">
                  {selectedEvent.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 dark:text-slate-400 mt-2 font-mono">
                  <span>تاریخ: {selectedEvent.eventDate}</span>
                  <span>•</span>
                  <span>مدت: {selectedEvent.durationHours} ساعت</span>
                  <span>•</span>
                  <span>حاضرین: {selectedEvent.attendeeCount} نفر</span>
                  <span>•</span>
                  <span>گروه هدف: {selectedEvent.targetAudienceFa}</span>
                </div>
              </div>

              {/* Instructor Credentials (Crucial for scoring) */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-slate-100">
                  <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>مشخصات و سوابق علمی مدرس:</span>
                </div>
                <p className="font-bold text-xs text-emerald-950 dark:text-emerald-300">
                  {selectedEvent.instructorName}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedEvent.instructorResume}
                </p>
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400 flex justify-between">
                  <span>مجری / سازمان‌دهنده: {selectedEvent.organizerName}</span>
                  <span>محل: {selectedEvent.location}</span>
                </div>
              </div>

              {/* Description & Impact */}
              <div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 mb-1">
                  شرح اهداف، محتوا و اثربخشی اقدام:
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Evidence Files */}
              <div>
                <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 mb-2">
                  مدارک، صورتجلسات و تصاویر پیوست:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedEvent.evidenceFiles.map((file) => (
                    <div
                      key={file.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                          {file.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {file.size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviewer Action Box */}
              <form onSubmit={handleApprove} className="bg-emerald-50/60 dark:bg-emerald-950/40 rounded-3xl p-5 border border-emerald-200/80 dark:border-emerald-800/60 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                  <h4 className="font-black text-xs text-emerald-950 dark:text-emerald-200">
                    تصمیم‌گیری داور و ثبت امتیاز رسمی
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      امتیاز پیشنهادی کارگروه (از ۰ تا ۳۰):
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={35}
                      value={pointsToAward}
                      onChange={(e) => setPointsToAward(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-emerald-800 dark:text-emerald-300 outline-none focus:border-emerald-500 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      ارزیابی کیفی مدرس و مستندات:
                    </label>
                    <div className="text-xs text-slate-600 dark:text-slate-300 py-2">
                      {selectedEvent.effectivenessFa}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    توضیحات و ابلاغیه رسمی کارشناس داور:
                  </label>
                  <textarea
                    rows={3}
                    value={reviewerNotes}
                    onChange={(e) => setReviewerNotes(e.target.value)}
                    placeholder="علت تایید، نقاط قوت اقدام یا ایرادات مستندات که دستگاه باید رفع نماید..."
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 outline-none focus:border-emerald-500 bg-white dark:bg-slate-800 leading-relaxed"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleReject}
                    className="px-4 py-2.5 rounded-xl border border-rose-300 dark:border-rose-800 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    <span>درخواست اصلاح مستندات / رد اقدام</span>
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black shadow-md shadow-emerald-800/20 transition-all flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>تایید اقدام و اعطای {pointsToAward} امتیاز رسمی</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center text-xs text-slate-400">
              یک پرونده را از فهرست سمت راست انتخاب فرمایید.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
