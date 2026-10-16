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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white border border-emerald-100 rounded-3xl shadow-xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-emerald-50/70 px-6 py-4 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white border border-emerald-200 text-emerald-700 shadow-2xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-950">
                ورود و ثبت‌نام در سامانه صنعت سبز زنجان
              </h3>
              <p className="text-[11px] text-slate-500">
                برنامه عمل ارتقای فرهنگ محیط‌زیست و معافیت ماده ۲۷ مالیاتی
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="p-6">
          <div className="flex rounded-xl bg-slate-100 p-1 mb-6 border border-slate-200">
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ثبت واحد صنعتی جدید
            </button>
            <button
              onClick={() => setMode('demo')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                mode === 'demo'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              ورود سریع با حساب دمو (شرکت نمونه)
            </button>
          </div>

          {mode === 'demo' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 mb-2">
                جهت ارزیابی سریع و بدون نیاز به تایپ، روی یکی از حساب‌های تستی زیر کلیک فرمایید:
              </p>

              {/* Inspector Fast Button */}
              <button
                onClick={handleQuickInspectorLogin}
                className="w-full p-4 rounded-2xl bg-teal-50 border border-teal-200 hover:border-teal-400 text-right transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white text-teal-700 border border-teal-200 shadow-2xs">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-teal-950 group-hover:text-teal-700">
                        ورود به عنوان کارشناس ممیزی اداره کل محیط‌زیست
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        بررسی گزارشات، تایید مدارک و صدور احکام معافیت ماده ۲۷
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-teal-700 font-bold">ورود ←</span>
                </div>
              </button>

              <div className="border-t border-slate-100 my-3 pt-3">
                <span className="text-[11px] text-slate-500 block mb-2 font-bold">
                  واحدهای صنعتی نمونه استان زنجان:
                </span>

                <div className="space-y-2">
                  <button
                    onClick={() => handleQuickDemoLogin('comp-calcimin')}
                    className="w-full p-3 rounded-xl bg-white border border-emerald-200 hover:border-emerald-400 text-right transition-all flex items-center justify-between shadow-2xs cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>شرکت کالسیمین (سهامی عام)</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                          پلاتین برتر (۹۲٪)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">ماهنشان • مجتمع دندی و انگوران</p>
                    </div>
                    <span className="text-xs text-emerald-700 font-bold">ورود ←</span>
                  </button>

                  <button
                    onClick={() => handleQuickDemoLogin('comp-zanjan-zinc')}
                    className="w-full p-3 rounded-xl bg-white border border-amber-200 hover:border-amber-400 text-right transition-all flex items-center justify-between shadow-2xs cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>مجتمع ذوب و روی زنجان</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                          طلا (۷۸٪)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">زنجان • شهرک تخصصی سرب و روی</p>
                    </div>
                    <span className="text-xs text-amber-700 font-bold">ورود ←</span>
                  </button>

                  <button
                    onClick={() => handleQuickDemoLogin('comp-tarom-olive')}
                    className="w-full p-3 rounded-xl bg-white border border-emerald-200 hover:border-emerald-400 text-right transition-all flex items-center justify-between shadow-2xs cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                        <span>کشت و صنعت زیتون سبز طارم</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                          طلا (۸۲٪)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">طارم • حفاظت از حوضه رودخانه قزل‌اوزن</p>
                    </div>
                    <span className="text-xs text-emerald-700 font-bold">ورود ←</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-emerald-600" />
                  نام کامل شرکت / کارخانه / معدن
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: شرکت کالسیمین، مجتمع سرب و روی زنجان"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-emerald-600" />
                    شناسه ملی شرکت (۱۱ رقم)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="10100458921"
                    value={formData.shenaseMelli}
                    onChange={(e) => setFormData({ ...formData, shenaseMelli: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    شهرستان محل استقرار
                  </label>
                  <select
                    value={formData.county}
                    onChange={(e) => setFormData({ ...formData, county: e.target.value as CountyKey })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
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
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  رسته و حوزه فعالیت صنعتی
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
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
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    نام کارشناس یا رابط محیط‌زیست
                  </label>
                  <input
                    type="text"
                    placeholder="مهندس علوی"
                    value={formData.officerName}
                    onChange={(e) => setFormData({ ...formData, officerName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    شماره تماس همراه
                  </label>
                  <input
                    type="tel"
                    placeholder="0912..."
                    value={formData.officerPhone}
                    onChange={(e) => setFormData({ ...formData, officerPhone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
