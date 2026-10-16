import React, { useState } from 'react';
import {
  Clock,
  Users,
  Trophy,
  Award,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Filter,
  Eye,
  Building2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Agency, CulturalEvent } from '../types/governmentalAgency';

interface GovernmentalDashboardProps {
  agency: Agency;
  events: CulturalEvent[];
  onOpenNewEventModal: () => void;
  onNavigateToLeaderboard: () => void;
}

export const GovernmentalDashboard: React.FC<GovernmentalDashboardProps> = ({
  agency,
  events,
  onOpenNewEventModal,
  onNavigateToLeaderboard,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<CulturalEvent | null>(null);

  // Filter events for this agency
  const agencyEvents = events.filter((e) => e.agencyId === agency._id);

  const filteredEvents = agencyEvents.filter((e) => {
    const matchesStatus =
      filterStatus === 'all' || e.status === filterStatus;
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.instructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.countyFa.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const approvedEvents = agencyEvents.filter((e) => e.status === 'approved');
  const pendingEvents = agencyEvents.filter((e) => e.status === 'pending');
  const totalApprovedHours = approvedEvents.reduce((s, e) => s + e.durationHours, 0);
  const totalApprovedAudience = approvedEvents.reduce((s, e) => s + e.attendeeCount, 0);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Banner / Welcome Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-emerald-950/10 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-100 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>دستگاه اجرایی عضو کارگروه استانی • شهرستان {agency.countyFa}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {agency.name}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl leading-relaxed">
              رابط رسمی محیط‌زیست: <span className="font-bold text-white">{agency.liaisonOfficer.fullName}</span> ({agency.liaisonOfficer.title}) • تلفن مستقیم: <span className="font-mono text-white">{agency.liaisonOfficer.phone}</span>
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <button
              onClick={onOpenNewEventModal}
              className="px-5 py-3 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 text-xs sm:text-sm font-black shadow-lg shadow-black/10 transition-all flex items-center gap-2 group"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600 group-hover:rotate-90 transition-transform" />
              <span>ثبت اقدام / کارگاه جدید</span>
            </button>
            <button
              onClick={onNavigateToLeaderboard}
              className="px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold backdrop-blur-sm transition-colors flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>مشاهده رتبه‌بندی و لوح سپاس</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* KPI 1: Score */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">امتیاز عملکرد رسمی</span>
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">{agency.totalScore}</span>
            <span className="text-xs text-slate-400 font-medium">از ۱۰۰ امتیاز</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, agency.totalScore)}%` }}
            />
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            سطح عملکرد ممتاز در استان زنجان
          </p>
        </div>

        {/* KPI 2: Rank */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">رتبه در بین ادارات کل</span>
            <div className="w-9 h-9 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Trophy className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">#{agency.rank}</span>
            <span className="text-xs text-slate-400 font-medium">رتبه کل استان</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-4 truncate">
            {agency.awardBadge || 'دستگاه فعال در ترویج فرهنگ محیط‌زیست'}
          </p>
        </div>

        {/* KPI 3: Total Hours */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">ساعات آموزش تایید شده</span>
            <div className="w-9 h-9 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">
              {totalApprovedHours || agency.totalHours}
            </span>
            <span className="text-xs text-slate-400 font-medium">ساعت دوره و رویداد</span>
          </div>
          <p className="text-[11px] text-teal-700 font-medium mt-4">
            توزیع شده در سطح شهرستان‌های هدف
          </p>
        </div>

        {/* KPI 4: Audience */}
        <div className="bg-white rounded-3xl p-5 border border-emerald-100/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500">مخاطبان و فراگیران</span>
            <div className="w-9 h-9 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-800">
              {totalApprovedAudience || agency.totalAudience}
            </span>
            <span className="text-xs text-slate-400 font-medium">نفر مخاطب مستقیم</span>
          </div>
          <p className="text-[11px] text-blue-700 font-medium mt-4">
            معلمان، شهروندان، کشاورزان و پرسنل
          </p>
        </div>
      </div>

      {/* Events Log & Management Table */}
      <div className="bg-white rounded-3xl border border-emerald-100/80 shadow-sm overflow-hidden">
        {/* Table Header & Filters */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <span>کارنامه و پرونده اقدامات ثبت شده</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                {agencyEvents.length} اقدام
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              پیگیری آخرین وضعیت کارگاه‌ها، نظرات ارزیابان و امتیازات مکتسبه
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="جستجو در عناوین و مدرسان..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-9 pl-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-emerald-500 w-48 sm:w-64"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400 mr-2" />
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-white text-emerald-700 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                همه ({agencyEvents.length})
              </button>
              <button
                onClick={() => setFilterStatus('approved')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  filterStatus === 'approved'
                    ? 'bg-white text-emerald-700 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                تایید شده ({approvedEvents.length})
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  filterStatus === 'pending'
                    ? 'bg-white text-amber-700 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                در انتظار ({pendingEvents.length})
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 mx-auto mb-3">
              <FileText className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-slate-700 mb-1">
              اقدامی با این مشخصات یافت نشد
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              هنوز رویدادی با این شرایط ثبت نشده است یا با فیلترهای جستجو مطابقت ندارد.
            </p>
            <button
              onClick={onOpenNewEventModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>ثبت اولین اقدام فرهنگی</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-100 font-bold">
                <tr>
                  <th className="py-3 px-5">عنوان اقدام و موضوع</th>
                  <th className="py-3 px-4">مدرس / مجری</th>
                  <th className="py-3 px-4">شهرستان و تاریخ</th>
                  <th className="py-3 px-4">مدت / مخاطب</th>
                  <th className="py-3 px-4">وضعیت داوری</th>
                  <th className="py-3 px-4">امتیاز</th>
                  <th className="py-3 px-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredEvents.map((event) => (
                  <tr
                    key={event._id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <td className="py-4 px-5">
                      <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-xs sm:text-sm">
                        {event.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                          {event.categoryFa}
                        </span>
                        <span>•</span>
                        <span>مخاطب: {event.targetAudienceFa}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-slate-800">
                      <div>{event.instructorName}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                        مجری: {event.organizerName}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-800">{event.countyFa}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.eventDate}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-800">
                        {event.durationHours} ساعت
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {event.attendeeCount} فراگیر
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {event.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>تایید شده</span>
                        </span>
                      ) : event.status === 'pending' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200 text-[11px]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>در انتظار بررسی</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200 text-[11px]">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>نیازمند اصلاح</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {event.awardedPoints > 0 ? (
                        <span className="font-black text-emerald-700 text-sm bg-emerald-50 px-2.5 py-1 rounded-lg">
                          +{event.awardedPoints}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                        className="p-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors"
                        title="مشاهده جزئیات و نظر داور"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Event Detail Modal (when clicked) */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-100 p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-800">
                  پرونده اقدام زیست‌محیطی
                </h3>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <h4 className="text-sm font-black text-slate-900 leading-snug">
                  {selectedEvent.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  دستگاه: {selectedEvent.agencyName} • شهرستان {selectedEvent.countyFa}
                </p>
              </div>

              {/* Status Banner */}
              <div
                className={`p-3.5 rounded-2xl border ${
                  selectedEvent.status === 'approved'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : selectedEvent.status === 'pending'
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>وضعیت: {selectedEvent.statusFa}</span>
                  {selectedEvent.awardedPoints > 0 && (
                    <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                      امتیاز اعطا شده: {selectedEvent.awardedPoints}
                    </span>
                  )}
                </div>
                {selectedEvent.reviewerNotes ? (
                  <p className="text-[11px] leading-relaxed mt-1">
                    <span className="font-bold">یادداشت ارزیاب کارگروه استانی: </span>
                    {selectedEvent.reviewerNotes}
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-500 mt-1">
                    پرونده در صف بررسی کارشناسان کارگروه ارتقای فرهنگ محیط‌زیست استان قرار دارد.
                  </p>
                )}
              </div>

              {/* Instructor & Details */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">مدرس دوره:</span>
                  <span className="font-bold text-slate-800">{selectedEvent.instructorName}</span>
                </div>
                <div className="text-slate-600 text-[11px] leading-relaxed">
                  <span className="text-slate-400">سوابق مدرس: </span>
                  {selectedEvent.instructorResume}
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between">
                  <span className="text-slate-500">مدت و حاضرین:</span>
                  <span className="font-bold text-slate-800">
                    {selectedEvent.durationHours} ساعت / {selectedEvent.attendeeCount} نفر
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">اثربخشی اعلام‌شده:</span>
                  <span className="font-bold text-emerald-700">{selectedEvent.effectivenessFa}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h5 className="font-bold text-slate-700 mb-1">شرح و دستاوردها:</h5>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Evidence files */}
              <div>
                <h5 className="font-bold text-slate-700 mb-1">مدارک و ضمائم:</h5>
                <div className="space-y-1.5">
                  {selectedEvent.evidenceFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px]"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-medium text-slate-700">{file.name}</span>
                      </div>
                      <span className="text-slate-400 font-mono text-[10px]">
                        {file.size}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
