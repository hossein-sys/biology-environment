import React, { useState } from 'react';
import { OPERATIONAL_ACTIONS, KPI_LIST } from '../data/zanjanPlanData';
import { soundEngine } from '../utils/soundEngine';
import { CheckSquare, BarChart3, ShieldAlert, Target, Clock, UserCheck, Filter, ArrowUpRight } from 'lucide-react';

export const OperationalActionsKpiSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'actions' | 'kpis' | 'risks'>('actions');
  const [selectedAxis, setSelectedAxis] = useState<number | 'all'>('all');

  const filteredActions = selectedAxis === 'all'
    ? OPERATIONAL_ACTIONS
    : OPERATIONAL_ACTIONS.filter((act) => act.axisNumber === selectedAxis);

  const axes = [
    { num: 'all', title: 'همه محورها' },
    { num: 1, title: 'آموزش و مدارس' },
    { num: 2, title: 'فرهنگ عمومی و آب' },
    { num: 3, title: 'رسانه و اشراق' },
    { num: 4, title: 'سمن‌های مردمی' },
    { num: 5, title: 'جوامع محلی روی' },
    { num: 6, title: 'اداره سبز دستگاه‌ها' },
    { num: 7, title: 'صنعت، معدن و CSR' },
    { num: 8, title: 'پژوهش و داده بومی' },
  ];

  const RISKS = [
    {
      risk: 'کاهش مشارکت دستگاه‌های اجرایی در جلسات و اجرای مصوبات',
      probability: 'بالا',
      impact: 'زیاد',
      level: 'بحرانی',
      mitigation: 'تعریف نظام پاسخگویی رسمی؛ درج عملکرد در ارزیابی مدیران؛ ابلاغ مستقیم استانداری'
    },
    {
      risk: 'تأخیر یا عدم تأمین منابع مالی پایدار از محل CSR صنایع سرب و روی',
      probability: 'متوسط',
      impact: 'زیاد',
      level: 'بالا',
      mitigation: 'تنویع منابع؛ انعقاد تفاهمنامه با صنایع سرب و روی پیش از اجرا؛ ردیف بودجه‌ای مستقل'
    },
    {
      risk: 'مقاومت صنایع و معادن در برابر الزامات محیط‌زیستی و نظارت‌ها',
      probability: 'متوسط',
      impact: 'زیاد',
      level: 'بالا',
      mitigation: 'رویکرد مشارکتی و تشویقی با برند «صنعت سبز زنجان» و در صورت لزوم بهره‌گیری از ابزار حقوقی'
    },
    {
      risk: 'ناپایداری برنامه با تغییر مدیران استانی و شهرستانی',
      probability: 'بالا',
      impact: 'زیاد',
      level: 'بحرانی',
      mitigation: 'نهادینه‌سازی در ساختار رسمی؛ تصویب در شورای برنامه‌ریزی؛ دستورالعمل‌های مدون و مستندسازی دقیق'
    }
  ];

  return (
    <section id="operations" className="relative py-28 bg-abyss-950 overflow-hidden border-t border-emerald-500/15 font-vazir text-right">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6 border-b border-emerald-500/20 pb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs tracking-widest uppercase mb-2">
              <Target className="w-3.5 h-3.5" />
              <span>بخش‌های هفتم، نهم و دهم // اهداف SMART و شاخص‌های پایش</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight">
              برنامه عملیاتی، اقدامات SMART
              <span className="italic block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 text-glow-neon">
                و شاخص‌های کلیدی عملکرد (KPI)
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md leading-relaxed font-light">
            تعریف اقدامات اجرایی زمان‌بندی‌شده، شاخص‌های سنجش‌پذیر نهاده، فرآیند و اثربخشی، و ماتریس مدیریت ریسک‌های بومی استان زنجان.
          </p>
        </div>

        {/* Master Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <button
            onClick={() => { setActiveTab('actions'); soundEngine.playHydroClick(); }}
            data-cursor-action="اقدامات"
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
              activeTab === 'actions'
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,255,160,0.25)]'
                : 'bg-abyss-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>اقدامات اولویت‌دار ۸ محور راهبردی</span>
          </button>

          <button
            onClick={() => { setActiveTab('kpis'); soundEngine.playHydroClick(); }}
            data-cursor-action="شاخص‌ها"
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
              activeTab === 'kpis'
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,255,160,0.25)]'
                : 'bg-abyss-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>داشبورد شاخص‌های کلیدی عملکرد (KPI)</span>
          </button>

          <button
            onClick={() => { setActiveTab('risks'); soundEngine.playHydroClick(); }}
            data-cursor-action="ریسک‌ها"
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
              activeTab === 'risks'
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(16,255,160,0.25)]'
                : 'bg-abyss-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>ماتریس ریسک‌های اجرایی و راهکارها</span>
          </button>
        </div>

        {/* Tab 1: Operational Actions */}
        {activeTab === 'actions' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Axis Filter Pills */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
              {axes.map((ax) => (
                <button
                  key={ax.num}
                  onClick={() => {
                    setSelectedAxis(ax.num as number | 'all');
                    soundEngine.playHydroClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    selectedAxis === ax.num
                      ? 'bg-emerald-400 text-abyss-950 font-bold'
                      : 'bg-abyss-900/80 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {ax.title}
                </button>
              ))}
            </div>

            {/* Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredActions.map((action) => (
                <div
                  key={action.code}
                  className="p-5 rounded-2xl border border-slate-800 bg-abyss-900/85 hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 font-bold">
                        {action.code}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono px-2 py-0.5 rounded bg-abyss-950 border border-slate-800">
                        {action.timeframe}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors leading-snug">
                      {action.title}
                    </h4>

                    <div className="p-3 rounded-xl border border-red-500/20 bg-red-950/10 text-xs text-slate-300 mb-3">
                      <strong className="text-red-400 block mb-0.5">مسئله محوری:</strong>
                      {action.coreIssue}
                    </div>

                    <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-950/10 text-xs text-slate-200 mb-4">
                      <strong className="text-emerald-400 block mb-0.5">هدف کمی (SMART):</strong>
                      {action.smartTarget}
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-3 space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>مخاطب هدف:</span>
                      <span className="text-slate-200 font-medium">{action.targetAudience}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>دستگاه مسئول:</span>
                      <span className="text-emerald-400 font-medium">{action.responsibleEntity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: KPI Dashboard */}
        {activeTab === 'kpis' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {KPI_LIST.map((kpi) => (
                <div
                  key={kpi.id}
                  className="p-6 rounded-2xl border border-emerald-500/20 bg-abyss-900/90 space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                      دسته: {kpi.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      تناوب: {kpi.frequency}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white leading-snug">
                    {kpi.title}
                  </h4>

                  <div className="p-3 rounded-xl border border-slate-800 bg-abyss-950/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 font-vazir">واحد سنجش:</span>
                    <span className="text-cyan-300 font-bold">{kpi.unit}</span>
                  </div>

                  <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">هدف افق برنامه:</span>
                      <span className="font-bold text-emerald-400">{kpi.targetHorizon}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">وضعیت پایه / جاری:</span>
                      <span className="text-amber-300 font-mono">{kpi.currentEstimated}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>مرجع گردآوری داده:</span>
                      <span>{kpi.source}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Risk Matrix */}
        {activeTab === 'risks' && (
          <div className="bg-abyss-900/90 border border-slate-800 rounded-2xl p-6 overflow-hidden shadow-2xl animate-in fade-in duration-300">
            <h3 className="text-lg font-bold text-white mb-4">
              ماتریس ریسک‌های اجرایی برنامه استانی و راهکارهای کاهش آسیب (جدول ۱۳ سند)
            </h3>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-3 px-3">عنوان ریسک</th>
                    <th className="py-3 px-2 text-center">احتمال</th>
                    <th className="py-3 px-2 text-center">شدت اثر</th>
                    <th className="py-3 px-2 text-center">سطح ریسک</th>
                    <th className="py-3 px-4">راهکار کاهش آسیب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {RISKS.map((r, i) => (
                    <tr key={i} className="hover:bg-abyss-800/40">
                      <td className="py-3.5 px-3 font-semibold text-slate-200">{r.risk}</td>
                      <td className="py-3.5 px-2 text-center text-slate-400">{r.probability}</td>
                      <td className="py-3.5 px-2 text-center text-slate-400">{r.impact}</td>
                      <td className="py-3.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r.level === 'بحرانی' ? 'bg-red-950 text-red-300 border border-red-500/40' : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        }`}>
                          {r.level}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-emerald-300 font-light leading-relaxed">{r.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
