import React from 'react';
import {
  ShieldCheck,
  Building2,
  UserCheck,
  Award,
  Trophy,
  HelpCircle,
  Home,
  PlusCircle,
  Sparkles,
  ChevronDown,
  UserPlus,
} from 'lucide-react';
import { Company } from '../types';

interface FloatingHeaderProps {
  currentRole: 'company_rep' | 'inspector';
  onRoleChange: (role: 'company_rep' | 'inspector') => void;
  activeView: 'home' | 'dashboard' | 'rewards' | 'leaderboard' | 'admin';
  onViewChange: (view: 'home' | 'dashboard' | 'rewards' | 'leaderboard' | 'admin') => void;
  companies: Company[];
  selectedCompanyId: string;
  onCompanyChange: (id: string) => void;
  onOpenAuthModal: () => void;
}

export const FloatingHeader: React.FC<FloatingHeaderProps> = ({
  currentRole,
  onRoleChange,
  activeView,
  onViewChange,
  companies,
  selectedCompanyId,
  onCompanyChange,
  onOpenAuthModal,
}) => {
  const selectedCompany = companies.find((c) => c._id === selectedCompanyId) || companies[0];

  return (
    <header className="sticky top-4 z-50 mx-3 sm:mx-6 lg:mx-8 mb-6">
      <div className="bg-white/85 backdrop-blur-md border border-emerald-100 shadow-sm shadow-emerald-950/5 rounded-2xl px-4 sm:px-6 py-3 transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Logo & Platform Name */}
          <div className="flex items-center justify-between">
            <div
              onClick={() => onViewChange('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-md shadow-emerald-500/20 flex items-center justify-center transition-transform group-hover:scale-105">
                <div className="h-full w-full bg-white rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-extrabold text-emerald-950 tracking-tight">
                    سامانه صنعت سبز استان زنجان
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                    ماده ۲۷ مالیاتی
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  اداره کل حفاظت محیط‌زیست استان زنجان
                </p>
              </div>
            </div>

            {/* Mobile Auth Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenAuthModal}
                className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold"
              >
                <UserPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none text-xs font-semibold">
            <button
              onClick={() => onViewChange('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                activeView === 'home'
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              صفحه اصلی
            </button>

            <button
              onClick={() => {
                if (activeView !== 'home') onViewChange('home');
                setTimeout(() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-slate-50 transition-all shrink-0"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              چگونه کار می‌کند؟
            </button>

            <button
              onClick={() => onViewChange('leaderboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                activeView === 'leaderboard'
                  ? 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200/80 shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              جدول صنایع برتر
            </button>

            {currentRole === 'company_rep' ? (
              <button
                onClick={() => onViewChange('dashboard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                  activeView === 'dashboard'
                    ? 'bg-emerald-600 text-white font-bold shadow-sm shadow-emerald-500/30'
                    : 'text-emerald-700 bg-emerald-50/70 hover:bg-emerald-100/60'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                ثبت فعالیت‌ها و داشبورد
              </button>
            ) : (
              <button
                onClick={() => onViewChange('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                  activeView === 'admin'
                    ? 'bg-teal-700 text-white font-bold shadow-sm'
                    : 'text-teal-800 bg-teal-50 hover:bg-teal-100'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                کارتابل ممیزی بازرس
              </button>
            )}

            <button
              onClick={() => onViewChange('rewards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                activeView === 'rewards'
                  ? 'bg-amber-50 text-amber-800 font-bold border border-amber-200 shadow-xs'
                  : 'text-slate-600 hover:text-amber-800 hover:bg-amber-50/50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              گواهی و تخفیف‌ها
            </button>
          </nav>

          {/* Right Section: Role Switcher & Auth CTA */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Role Switcher Toggle */}
            <div className="bg-slate-100/90 p-0.5 rounded-xl border border-slate-200/80 flex text-[11px] font-semibold">
              <button
                onClick={() => onRoleChange('company_rep')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  currentRole === 'company_rep'
                    ? 'bg-white text-emerald-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Building2 className="w-3 h-3 text-emerald-600" />
                نمای شرکت صنعتی
              </button>
              <button
                onClick={() => onRoleChange('inspector')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                  currentRole === 'inspector'
                    ? 'bg-teal-700 text-white font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <UserCheck className="w-3 h-3" />
                نمای بازرس محیط‌زیست
              </button>
            </div>

            {/* Active Company Selector if in Company Role */}
            {currentRole === 'company_rep' && (
              <div className="hidden xl:flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                <span>شرکت:</span>
                <select
                  value={selectedCompanyId}
                  onChange={(e) => onCompanyChange(e.target.value)}
                  className="bg-transparent text-emerald-900 font-bold text-[11px] focus:outline-none cursor-pointer max-w-[150px] truncate"
                >
                  {companies.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Auth CTA */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all hover:scale-102"
            >
              <UserPlus className="w-3.5 h-3.5" />
              ثبت‌نام / ورود صنایع
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
