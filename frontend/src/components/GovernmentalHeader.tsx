import React from 'react';
import {
  ShieldCheck,
  Building2,
  UserCheck,
  Award,
  Trophy,
  Home,
  PlusCircle,
  FileCheck2,
  UserPlus,
  RefreshCw,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { Agency } from '../types/governmentalAgency';

interface GovernmentalHeaderProps {
  currentRole: 'agency_rep' | 'provincial_evaluator';
  onRoleChange: (role: 'agency_rep' | 'provincial_evaluator') => void;
  activeView: 'landing' | 'dashboard' | 'leaderboard' | 'admin';
  onViewChange: (view: 'landing' | 'dashboard' | 'leaderboard' | 'admin') => void;
  agencies: Agency[];
  selectedAgencyId: string;
  onAgencyChange: (id: string) => void;
  onOpenAuthModal: () => void;
  onResetData: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const GovernmentalHeader: React.FC<GovernmentalHeaderProps> = ({
  currentRole,
  onRoleChange,
  activeView,
  onViewChange,
  agencies,
  selectedAgencyId,
  onAgencyChange,
  onOpenAuthModal,
  onResetData,
  isDark,
  onToggleTheme,
}) => {
  const activeAgency =
    agencies.find((a) => a._id === selectedAgencyId) || agencies[0];

  return (
    <header className="sticky top-4 z-50 mx-4 my-2 transition-colors duration-200">
      <div className="backdrop-blur-md bg-white/85 dark:bg-slate-900/90 border border-emerald-100 dark:border-emerald-900/40 shadow-sm dark:shadow-emerald-950/20 rounded-2xl px-4 sm:px-6 py-3 transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3.5">
          {/* Logo & Entity Name */}
          <div className="flex items-center justify-between">
            <div
              onClick={() => onViewChange('landing')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 p-0.5 shadow-md shadow-emerald-600/20 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
                <div className="h-full w-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black text-emerald-950 dark:text-emerald-50 tracking-tight">
                    سامانه ارزیابی فرهنگ محیط‌زیست ادارات
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold">
                    استان زنجان
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  دبیرخانه شورای فرهنگ عمومی و کارگروه استانی ارتقای فرهنگ محیط‌زیست
                </p>
              </div>
            </div>

            {/* Mobile Actions (Theme + Auth) */}
            <div className="flex lg:hidden items-center gap-1.5">
              <button
                onClick={onToggleTheme}
                title={isDark ? 'تغییر به حالت روز' : 'تغییر به حالت شب'}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-amber-400 border border-slate-200 dark:border-slate-700 text-xs"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                onClick={onOpenAuthModal}
                className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold"
              >
                <UserPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none text-xs font-bold">
            <button
              onClick={() => onViewChange('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                activeView === 'landing'
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-2xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-emerald-800 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              صفحه اصلی
            </button>

            {currentRole === 'agency_rep' ? (
              <button
                onClick={() => onViewChange('dashboard')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                  activeView === 'dashboard'
                    ? 'bg-emerald-600 dark:bg-emerald-500 text-white font-extrabold shadow-sm shadow-emerald-600/30'
                    : 'text-emerald-800 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/50'
                }`}
              >
                <PlusCircle className="w-3.5 h-3.5" />
                داشبورد و ثبت رویدادها
              </button>
            ) : (
              <button
                onClick={() => onViewChange('admin')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                  activeView === 'admin'
                    ? 'bg-teal-700 dark:bg-teal-600 text-white font-extrabold shadow-sm'
                    : 'text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 dark:hover:bg-teal-900/50'
                }`}
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                کارتابل ارزیاب استانی
              </button>
            )}

            <button
              onClick={() => onViewChange('leaderboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                activeView === 'leaderboard'
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800 shadow-2xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-900 dark:hover:text-amber-300 hover:bg-amber-50/50 dark:hover:bg-amber-950/40'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              رتبه‌بندی و جوایز دستگاه‌ها
            </button>
          </nav>

          {/* Right Section: Role Switcher & Agency Selector & Theme Changer */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Role Switcher Toggle */}
            <div className="bg-slate-100/90 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700 flex text-[11px] font-bold">
              <button
                onClick={() => onRoleChange('agency_rep')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentRole === 'agency_rep'
                    ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-2xs font-extrabold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Building2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                نماینده اداره
              </button>
              <button
                onClick={() => onRoleChange('provincial_evaluator')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentRole === 'provincial_evaluator'
                    ? 'bg-teal-700 text-white shadow-2xs font-extrabold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <UserCheck className="w-3 h-3" />
                کارشناس ارزیاب
              </button>
            </div>

            {/* Active Agency Dropdown (if agency_rep) */}
            {currentRole === 'agency_rep' && (
              <div className="hidden xl:flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-1">
                <span>دستگاه:</span>
                <select
                  value={selectedAgencyId}
                  onChange={(e) => onAgencyChange(e.target.value)}
                  className="bg-transparent text-emerald-950 dark:text-emerald-200 font-bold text-[11px] focus:outline-none cursor-pointer max-w-[160px] truncate"
                >
                  {agencies.map((a) => (
                    <option key={a._id} value={a._id} className="dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Theme Toggle Button (Desktop & Tablet) */}
            <button
              onClick={onToggleTheme}
              title={isDark ? 'تغییر به حالت روز (روشن)' : 'تغییر به حالت شب (تاریک)'}
              aria-label="تغییر تم"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-slate-600 dark:text-amber-400 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer hover:scale-105"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 hover:text-emerald-700 -rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Auth CTA */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer hover:scale-102"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>ورود / معرفی اداره</span>
            </button>

            {/* Reset Mock Data */}
            <button
              onClick={onResetData}
              title="بازنشانی داده‌های تستی لوکال"
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
