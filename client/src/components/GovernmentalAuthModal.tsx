import React, { useState } from 'react';
import { X, Building2, User, Phone, MapPin, Briefcase, Sparkles, CheckCircle2 } from 'lucide-react';
import { agencyStorageService, COUNTIES } from '../services/agencyStorage';
import { Agency, CountyKey } from '../types/governmentalAgency';

interface GovernmentalAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (agency: Agency) => void;
}

export const GovernmentalAuthModal: React.FC<GovernmentalAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const existingAgencies = agencyStorageService.getAgencies();

  const [mode, setMode] = useState<'select' | 'register'>('select');
  const [selectedAgencyId, setSelectedAgencyId] = useState<string>(
    existingAgencies[0]?._id || ''
  );

  // New Agency Form fields
  const [name, setName] = useState('');
  const [county, setCounty] = useState<CountyKey>('zanjan');
  const [category, setCategory] = useState('آموزشی، پژوهشی و فرهنگی');
  const [officerName, setOfficerName] = useState('');
  const [officerPhone, setOfficerPhone] = useState('');
  const [officerTitle, setOfficerTitle] = useState('');
  const [officerEmail, setOfficerEmail] = useState('');

  if (!isOpen) return null;

  const handleQuickSelect = (agencyId: string) => {
    agencyStorageService.setActiveAgencyId(agencyId);
    agencyStorageService.setCurrentRole('agency_rep');
    const ag = agencyStorageService.getAgencyById(agencyId);
    if (ag) {
      onSuccess(ag);
      onClose();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const saved = agencyStorageService.saveAgency({
      name: name.trim(),
      county,
      category,
      liaisonOfficer: {
        fullName: officerName.trim() || 'رابط محترم محیط‌زیست',
        phone: officerPhone.trim() || '۰۹۱۲۰۰۰۰۰۰۰',
        title: officerTitle.trim() || 'کارشناس رسمی رابط',
        email: officerEmail.trim() || undefined,
      },
      description: `دستگاه ثبت‌شده در حوزه ${county}`,
    });

    agencyStorageService.setCurrentRole('agency_rep');
    onSuccess(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-emerald-100 dark:border-slate-800 overflow-hidden transition-colors">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black">ورود و معرفی دستگاه اجرایی</h3>
              <p className="text-emerald-100 text-xs">
                سامانه ارزیابی عملکرد فرهنگی - محیط‌زیستی ادارات استان زنجان
              </p>
            </div>
          </div>

          {/* Quick Demo Switcher */}
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs text-emerald-100 mb-2 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              ورود سریع با اکانت‌های تایید شده کارگروه استانی:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickSelect('agency-medu')}
                className="text-xs bg-white text-emerald-800 font-bold px-3 py-1.5 rounded-lg shadow-sm hover:bg-emerald-50 transition-colors flex items-center gap-1"
              >
                <span>آموزش و پرورش (رتبه ۱)</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect('agency-water')}
                className="text-xs bg-white/20 hover:bg-white/30 text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>شرکت آب منطقه‌ای</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickSelect('agency-abhar-muni')}
                className="text-xs bg-white/20 hover:bg-white/30 text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>شهرداری ابهر</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mode Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-4 bg-slate-50/60 dark:bg-slate-800/50">
          <button
            onClick={() => setMode('select')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
              mode === 'select'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            انتخاب از دستگاه‌های ثبت‌شده
          </button>
          <button
            onClick={() => setMode('register')}
            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-colors ${
              mode === 'register'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            معرفی دستگاه اجرایی جدید
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {mode === 'select' ? (
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300">
                دستگاه اجرایی یا سازمان خود را انتخاب فرمایید:
              </label>
              <div className="space-y-2">
                {existingAgencies.map((ag) => (
                  <label
                    key={ag._id}
                    onClick={() => setSelectedAgencyId(ag._id)}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      selectedAgencyId === ag._id
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="agencyRadio"
                      checked={selectedAgencyId === ag._id}
                      onChange={() => setSelectedAgencyId(ag._id)}
                      className="mt-1 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-800 dark:text-slate-100">
                          {ag.name}
                        </span>
                        <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-medium">
                          {ag.countyFa}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
                        <span>رابط: {ag.liaisonOfficer.fullName}</span>
                        <span>•</span>
                        <span>رتبه استانی: {ag.rank}</span>
                        <span>•</span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">امتیاز: {ag.totalScore}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSelect(selectedAgencyId)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ورود به سامانه با این دستگاه</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  نام کامل دستگاه اجرایی / سازمان / اداره کل:
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: اداره کل صنعت، معدن و تجارت استان زنجان"
                    className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">شهرستان:</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                    <select
                      value={county}
                      onChange={(e) => setCounty(e.target.value as CountyKey)}
                      className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none"
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
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">حوزه فعالیت:</label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none"
                    >
                      <option value="آموزشی، پژوهشی و فرهنگی" className="dark:bg-slate-800">آموزشی، پژوهشی و فرهنگی</option>
                      <option value="دستگاه‌های زیربنایی و خدمات آب" className="dark:bg-slate-800">دستگاه‌های زیربنایی و خدمات آب</option>
                      <option value="کشاورزی، باغبانی و منابع طبیعی" className="dark:bg-slate-800">کشاورزی، باغبانی و منابع طبیعی</option>
                      <option value="مدیریت شهری و خدمات زیست‌محیطی" className="dark:bg-slate-800">مدیریت شهری و خدمات زیست‌محیطی</option>
                      <option value="صنعت، معدن و تجارت" className="dark:bg-slate-800">صنعت، معدن و تجارت</option>
                      <option value="سلامت و درمان" className="dark:bg-slate-800">سلامت و بهداشت عمومی</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-black text-slate-800 dark:text-slate-100 mb-2">مشخصات رابط رسمی محیط‌زیست:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">نام و نام خانوادگی:</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={officerName}
                        onChange={(e) => setOfficerName(e.target.value)}
                        placeholder="مثال: مهندس احمد محمدی"
                        className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">شماره تماس مستقیم / همراه:</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute right-3 top-2.5 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={officerPhone}
                        onChange={(e) => setOfficerPhone(e.target.value)}
                        placeholder="۰۹۱۲..."
                        className="w-full pr-10 pl-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none text-left font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">سمت سازمانی:</label>
                    <input
                      type="text"
                      value={officerTitle}
                      onChange={(e) => setOfficerTitle(e.target.value)}
                      placeholder="مثال: رئیس اداره حراست و رابط محیط‌زیست"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">پست الکترونیکی سازمانی (اختیاری):</label>
                    <input
                      type="email"
                      value={officerEmail}
                      onChange={(e) => setOfficerEmail(e.target.value)}
                      placeholder="officer@agency.ir"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm focus:border-emerald-500 outline-none text-left"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20"
                >
                  ثبت نام و ورود به پنل
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
