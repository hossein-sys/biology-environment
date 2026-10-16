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
}) => {
  const activeAgency =
    agencies.find((a) => a._id === selectedAgencyId) || agencies[0];

  return (
    <header className="sticky top-4 z-50 mx-4 my-2">
      <div className="backdrop-blur-md bg-white/85 border border-emerald-100 shadow-sm rounded-2xl px-5 sm:px-7 py-3 transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3.5">
          {/* Logo & Entity Name */}
          <div className="flex items-center justify-between">
            <div
              onClick={() => onViewChange('landing')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 p-0.5 shadow-md shadow-emerald-600/20 flex items-center justify-center transition-transform group-hover:scale-105">
                <div className="h-full w-full bg-white rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black text-emerald-950 tracking-tight">
                    سامانه ارزیابی فرهنگ محیط‌زیست ادارات
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    استان زنجان
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  دبیرخانه شورای فرهنگ عمومی و کارگروه استانی ارتقای فرهنگ محیط‌زیست
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
          <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none text-xs font-bold">
            <button
              onClick={() => onViewChange('landing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all shrink-0 cursor-pointer ${
                activeView === 'landing'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-emerald-800 hover:bg-slate-50'
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
                    ? 'bg-emerald-600 text-white font-extrabold shadow-sm shadow-emerald-600/30'
                    : 'text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100/70'
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
                    ? 'bg-teal-700 text-white font-extrabold shadow-sm'
                    : 'text-teal-800 bg-teal-50 hover:bg-teal-100'
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
                  ? 'bg-amber-50 text-amber-900 border border-amber-200 shadow-2xs font-extrabold'
                  : 'text-slate-600 hover:text-amber-900 hover:bg-amber-50/50'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              رتبه‌بندی و جوایز دستگاه‌ها
            </button>
          </nav>

          {/* Right Section: Role Switcher & Agency Selector */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Role Switcher Toggle */}
            <div className="bg-slate-100/90 p-0.5 rounded-xl border border-slate-200/80 flex text-[11px] font-bold">
              <button
                onClick={() => onRoleChange('agency_rep')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentRole === 'agency_rep'
                    ? 'bg-white text-emerald-800 shadow-2xs font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Building2 className="w-3 h-3 text-emerald-600" />
                نماینده اداره
              </button>
              <button
                onClick={() => onRoleChange('provincial_evaluator')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentRole === 'provincial_evaluator'
                    ? 'bg-teal-700 text-white shadow-2xs font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <UserCheck className="w-3 h-3" />
                کارشناس ارزیاب
              </button>
            </div>

            {/* Active Agency Dropdown (if agency_rep) */}
            {currentRole === 'agency_rep' && (
              <div className="hidden xl:flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                <span>دستگاه:</span>
                <select
                  value={selectedAgencyId}
                  onChange={(e) => onAgencyChange(e.target.value)}
                  className="bg-transparent text-emerald-950 font-bold text-[11px] focus:outline-none cursor-pointer max-w-[170px] truncate"
                >
                  {agencies.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Auth CTA */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer hover:scale-102"
            >
              <UserPlus className="w-3.5 h-3.5" />
              ورود / معرفی اداره
            </button>

            {/* Reset Mock Data */}
            <button
              onClick={onResetData}
              title="بازنشانی داده‌های تستی لوکال"
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200 text-xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
