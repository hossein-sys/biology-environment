import React, { useState } from 'react';
import {
  X,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone,
  User,
  MapPin,
  Hash,
  Factory,
} from 'lucide-react';
import { COUNTIES, INDUSTRY_SECTORS, storageService } from '../services/storage';
import { Company, CountyKey } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompanyCreatedOrSelected: (company: Company) => void;
  onSelectRole: (role: 'company_rep' | 'inspector') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onCompanyCreatedOrSelected,
  onSelectRole,
}) => {
  const [mode, setMode] = useState<'register' | 'demo'>('register');
  const [formData, setFormData] = useState({
    name: '',
    shenaseMelli: '',
    county: 'zanjan' as CountyKey,
    sector: INDUSTRY_SECTORS[0],
    officerName: '',
    officerPhone: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.shenaseMelli) {
      alert('لطفاً نام شرکت و شناسه ملی را وارد نمایید.');
      return;
    }

    const saved = storageService.saveCompany({
      name: formData.name,
      shenaseMelli: formData.shenaseMelli,
      county: formData.county,
      countyFa: COUNTIES.find((c) => c.key === formData.county)?.nameFa || 'زنجان',
      sector: formData.sector,
      environmentalOfficer: {
        fullName: formData.officerName || 'کارشناس رسمی HSE',
        phone: formData.officerPhone || '09121410000',
        nationalCode: '4280000000',
      },
    });

    onCompanyCreatedOrSelected(saved);
    onSelectRole('company_rep');
    onClose();
  };

  const handleQuickDemoLogin = (companyId: string) => {
    const comp = storageService.getCompany(companyId);
    if (comp) {
      storageService.setSelectedCompanyId(comp._id);
      onCompanyCreatedOrSelected(comp);
      onSelectRole('company_rep');
      onClose();
    }
  };

  const handleQuickInspectorLogin = () => {
    onSelectRole('inspector');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 to-slate-900 px-6 py-4 border-b border-emerald-900/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                ورود و ثبت‌نام در سامانه پایش صنعت سبز زنجان
              </h3>
              <p className="text-[11px] text-slate-400">
                برنامه عمل ارتقای فرهنگ محیط‌زیست و معافیت ماده ۲۷ مالیاتی
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

        {/* Tab Toggle */}
        <div className="p-6">
          <div className="flex rounded-xl bg-slate-800/80 p-1 mb-6 border border-slate-700">
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ثبت واحد صنعتی جدید
            </button>
            <button
              onClick={() => setMode('demo')}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'demo'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              ورود سریع با اکانت تستی
            </button>
          </div>

          {mode === 'demo' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-300 mb-2">
                برای تست سریع تمامی بخش‌های سامانه، یکی از نقش‌های زیر را با یک کلیک انتخاب نمایید:
              </p>

              {/* Inspector Fast Button */}
              <button
                onClick={handleQuickInspectorLogin}
                className="w-full p-4 rounded-2xl bg-teal-950/40 border border-teal-500/40 hover:border-teal-400 text-right transition-all group hover:bg-teal-900/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-teal-300">
                        ورود به عنوان کارشناس ممیزی اداره کل محیط‌زیست
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        بررسی کارتابل گزارشات، محاسبه امتیاز و صدور گواهینامه و بن ماده ۲۷
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-teal-400 font-semibold">ورود سریع ←</span>
                </div>
              </button>

              <div className="border-t border-slate-800 my-3 pt-3">
                <span className="text-[11px] text-slate-400 block mb-2 font-medium">
                  واحدهای صنعتی ثبت‌شده در زنجان:
                </span>

                <div className="space-y-2">
                  <button
                    onClick={() => handleQuickDemoLogin('comp-calcimin')}
                    className="w-full p-3 rounded-xl bg-slate-800/80 border border-emerald-500/30 hover:border-emerald-400 text-right transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>شرکت کالسیمین (سهامی عام)</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
                          پلاتین (۹۲٪)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">ماهنشان • صنایع سرب و روی و متالورژی</p>
                    </div>
                    <span className="text-xs text-emerald-400 font-medium">ورود ←</span>
                  </button>

                  <button
                    onClick={() => handleQuickDemoLogin('comp-zanjan-zinc')}
                    className="w-full p-3 rounded-xl bg-slate-800/80 border border-amber-500/30 hover:border-amber-400 text-right transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>مجتمع ذوب و روی زنجان</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                          طلایی (۷۸٪)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">زنجان (شهرک تخصصی روی) • گزارش در حال بررسی</p>
                    </div>
                    <span className="text-xs text-amber-400 font-medium">ورود ←</span>
                  </button>

                  <button
                    onClick={() => handleQuickDemoLogin('comp-sahand-abhar')}
                    className="w-full p-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-right transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>صنایع ریخته‌گری سهند ابهر</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 text-[10px]">
                          نقره‌ای (۵۴٪)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">ابهر • نیازمند ارتقا و اصلاح فیلتراسیون</p>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">ورود ←</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-emerald-400" />
                  نام کامل واحد صنعتی / شرکت
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: شرکت کالسیمین، مجتمع فرآوری سرب و روی"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-emerald-400" />
                    شناسه ملی شرکت (۱۱ رقم)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="10100458921"
                    value={formData.shenaseMelli}
                    onChange={(e) => setFormData({ ...formData, shenaseMelli: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    شهرستان محل استقرار
                  </label>
                  <select
                    value={formData.county}
                    onChange={(e) => setFormData({ ...formData, county: e.target.value as CountyKey })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    {COUNTIES.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.nameFa}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  رسته و نوع فعالیت صنعتی
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  {INDUSTRY_SECTORS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    نام کارشناس محیط‌زیست / HSE
                  </label>
                  <input
                    type="text"
                    placeholder="مهندس احمدی"
                    value={formData.officerName}
                    onChange={(e) => setFormData({ ...formData, officerName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    شماره تماس همراه
                  </label>
                  <input
                    type="tel"
                    placeholder="0912..."
                    value={formData.officerPhone}
                    onChange={(e) => setFormData({ ...formData, officerPhone: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                تکمیل ثبت‌نام و ورود به پنل خوداظهاری
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
