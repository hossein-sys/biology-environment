import React from 'react';
import {
  ShieldCheck,
  Building2,
  FileCheck2,
  QrCode,
  Trophy,
  ExternalLink,
  Users2,
  ClipboardList,
  Sparkles,
} from 'lucide-react';
import { User, UserRole } from '../types';

interface HeaderProps {
  currentUser: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSwitchRole: (role: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onSwitchRole,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-emerald-900/40 shadow-xl">
      {/* Top Governmental Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 px-4 py-2 border-b border-emerald-800/20 text-xs text-slate-300 flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-emerald-400">
            برنامه عمل ارتقای فرهنگ حفاظت از محیط‌زیست استان زنجان
          </span>
          <span className="text-slate-500 hidden md:inline">|</span>
          <span className="text-slate-400 hidden md:inline">
            مصوب شورای فرهنگ عمومی (جلسه ۸۱۴) و کارگروه ملی
          </span>
        </div>

        {/* Demo Fast Role Switcher */}
        <div className="flex items-center gap-2 mt-1 sm:mt-0">
          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> تغییر سریع نقش کاربر:
          </span>
          <div className="flex bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60 text-xs">
            <button
              onClick={() => onSwitchRole('company_rep')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currentUser?.role === 'company_rep'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              نماینده کالسیمین
            </button>
            <button
              onClick={() => onSwitchRole('inspector')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currentUser?.role === 'inspector'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              بازرس محیط زیست
            </button>
            <button
              onClick={() => onSwitchRole('task_force_admin')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currentUser?.role === 'task_force_admin'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              کارگروه استانی
            </button>
            <button
              onClick={() => onSwitchRole('public')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                currentUser?.role === 'public'
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              ممیز مالیاتی
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          {/* Logo & Emblem */}
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 p-0.5 shadow-lg shadow-emerald-900/40 flex items-center justify-center">
              <div className="h-full w-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  سامانه صنعت سبز و فرهنگ محیط‌زیست
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  استان زنجان
                </span>
              </div>
              <p className="text-xs text-slate-400">
                اداره کل حفاظت محیط زیست استان زنجان — دبیرخانه کارگروه استانی
              </p>
            </div>
          </div>

          {/* Current User Badge & Swagger Link */}
          <div className="flex items-center gap-3">
            <a
              href="http://localhost:3001/api/docs"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs text-emerald-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              مستندات Swagger
            </a>

            {currentUser && (
              <div className="flex items-center gap-2.5 bg-slate-800/60 border border-slate-700/70 rounded-xl px-3 py-1.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-xs font-bold text-emerald-300">
                  {currentUser.fullName.charAt(0)}
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-200">{currentUser.fullName}</div>
                  <div className="text-[10px] text-emerald-400 font-medium">{currentUser.roleFa}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="mt-4 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-slate-800/60 pt-2.5">
          <button
            onClick={() => setActiveTab('company_dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
              activeTab === 'company_dashboard'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            داشبورد بنگاه صنعتی
          </button>

          <button
            onClick={() => setActiveTab('report_wizard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
              activeTab === 'report_wizard'
                ? 'bg-emerald-600 text-white shadow-md font-semibold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            ثبت خوداظهاری ۵ محوره
          </button>

          <button
            onClick={() => setActiveTab('inspector_queue')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
              activeTab === 'inspector_queue'
                ? 'bg-emerald-600 text-white shadow-md font-semibold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            کارتابل ممیزی و بازرسی
          </button>

          <button
            onClick={() => setActiveTab('field_observations')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
              activeTab === 'field_observations'
                ? 'bg-emerald-600 text-white shadow-md font-semibold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            رصد میدانی (پیوست ۱)
          </button>

          <button
            onClick={() => setActiveTab('super_admin')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
              activeTab === 'super_admin'
                ? 'bg-emerald-600 text-white shadow-md font-semibold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <Users2 className="w-4 h-4" />
            کارگروه استانی (سند ۱۱)
          </button>

          <button
            onClick={() => setActiveTab('resolutions')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
              activeTab === 'resolutions'
                ? 'bg-emerald-600 text-white shadow-md font-semibold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            ردیابی مصوبات (پیوست ۲)
          </button>

          <button
            onClick={() => setActiveTab('raci_matrix')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
              activeTab === 'raci_matrix'
                ? 'bg-emerald-600 text-white shadow-md font-semibold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <Users2 className="w-4 h-4" />
            ماتریس RACI (جدول ۲)
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
              activeTab === 'leaderboard'
                ? 'bg-emerald-600 text-white shadow-md font-semibold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            تالار صنعت سبز
          </button>

          <button
            onClick={() => setActiveTab('verify_voucher')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
              activeTab === 'verify_voucher'
                ? 'bg-emerald-600 text-white shadow-md font-semibold'
                : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            استعلام QR گواهینامه
          </button>
        </nav>
      </div>
    </header>
  );
};
