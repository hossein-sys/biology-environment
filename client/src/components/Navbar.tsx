import React from 'react';
import {
  ShieldCheck,
  Building2,
  FileCheck2,
  Award,
  Trophy,
  UserCheck,
  Sparkles,
  ChevronDown,
  RefreshCw,
  LogOut,
  UserPlus,
} from 'lucide-react';
import { Company } from '../types';

interface NavbarProps {
  currentRole: 'company_rep' | 'inspector';
  onRoleChange: (role: 'company_rep' | 'inspector') => void;
  activeTab: 'company' | 'admin' | 'certificate' | 'leaderboard';
  onTabChange: (tab: 'company' | 'admin' | 'certificate' | 'leaderboard') => void;
  companies: Company[];
  selectedCompanyId: string;
  onCompanyChange: (id: string) => void;
  onOpenAuthModal: () => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  companies,
  selectedCompanyId,
  onCompanyChange,
  onOpenAuthModal,
  onResetData,
}) => {
  const selectedCompany = companies.find((c) => c._id === selectedCompanyId) || companies[0];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-emerald-900/40 shadow-2xl">
      {/* Top Governmental Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 px-4 py-1.5 border-b border-emerald-800/30 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-semibold text-emerald-400">
              سامانه پایش عملکرد و صنعت سبز استان زنجان
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="text-slate-400 text-[11px] hidden md:inline">
              برنامه عمل ارتقای فرهنگ حفاظت از محیط‌زیست و کنترل آلایندگی
            </span>
          </div>

          {/* Role Switcher Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              تغییر نمای سامانه:
            </span>
            <div className="bg-slate-800/90 p-0.5 rounded-xl border border-slate-700/80 flex text-xs">
              <button
                onClick={() => onRoleChange('company_rep')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  currentRole === 'company_rep'
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-900/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                شرکت صنعتی / کارخانه
              </button>
              <button
                onClick={() => onRoleChange('inspector')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                  currentRole === 'inspector'
                    ? 'bg-teal-600 text-white font-bold shadow-md shadow-teal-900/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                کارشناس اداره محیط‌زیست
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Logo & Entity Branding */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-lg shadow-emerald-950 flex items-center justify-center">
                <div className="h-full w-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    پرتال صنعت سبز و هوای پاک
                  </h1>
                  <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
                    اداره کل استان زنجان
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  دبیرخانه ماده ۲۷ مالیات بر ارزش افزوده و مشوق‌های صنعتی
                </p>
              </div>
            </div>

            {/* Quick Actions (Mobile) */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onOpenAuthModal}
                className="p-2 rounded-xl bg-slate-800 text-emerald-400 border border-slate-700"
                title="ثبت‌نام / ورود"
              >
                <UserPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Company Selector (if in Company View) & User Profile */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {currentRole === 'company_rep' && (
              <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-xs">
                <span className="text-slate-400 hidden sm:inline">واحد فعال:</span>
                <div className="relative">
                  <select
                    value={selectedCompanyId}
                    onChange={(e) => onCompanyChange(e.target.value)}
                    className="bg-slate-900 text-emerald-300 font-semibold text-xs rounded-lg px-2.5 py-1 border border-emerald-900/50 focus:outline-none focus:border-emerald-500 cursor-pointer pr-2 pl-6"
                  >
                    {companies.map((c) => (
                      <option key={c._id} value={c._id} className="bg-slate-900 text-white">
                        {c.name} ({c.countyFa})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {currentRole === 'inspector' && (
              <div className="flex items-center gap-2 bg-teal-950/60 border border-teal-800/50 rounded-xl px-3 py-1.5 text-xs text-teal-300">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                <span>کارشناس ارشد ممیزی: <strong>دکتر علیرضا اسدی</strong></span>
              </div>
            )}

            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              <UserPlus className="w-3.5 h-3.5" />
              ثبت‌نام شرکت جدید
            </button>

            <button
              onClick={onResetData}
              title="بازنشانی داده‌های تستی لوکال"
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 text-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="mt-3.5 flex gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800/70 pt-2.5">
          <button
            onClick={() => onTabChange('company')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
              activeTab === 'company'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950 font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            داشبورد شرکت صنعتی
          </button>

          <button
            onClick={() => onTabChange('admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
              activeTab === 'admin'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-950 font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            کارتابل ممیزی و بازرسی اداره
          </button>

          <button
            onClick={() => onTabChange('certificate')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
              activeTab === 'certificate'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950 font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            گواهی رسمی و بن تخفیف ماده ۲۷
          </button>

          <button
            onClick={() => onTabChange('leaderboard')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
              activeTab === 'leaderboard'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950 font-bold'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            تالار رتبه‌بندی عمومی صنعت سبز
          </button>
        </nav>
      </div>
    </header>
  );
};
