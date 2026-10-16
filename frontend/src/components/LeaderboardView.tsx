import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Filter,
  Droplets,
  Trash2,
  Trees,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Sparkles,
  Building2,
} from 'lucide-react';
import { Company } from '../types';
import { COUNTIES, INDUSTRY_SECTORS } from '../services/storage';

interface LeaderboardViewProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  companies,
  onSelectCompany,
}) => {
  const [selectedCounty, setSelectedCounty] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const filteredCompanies = companies
    .filter((c) => {
      if (selectedCounty !== 'all' && c.county !== selectedCounty) return false;
      if (selectedSector !== 'all' && c.sector !== selectedSector) return false;
      return true;
    })
    .sort((a, b) => b.currentScore - a.currentScore);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="rounded-3xl bg-white border border-emerald-100 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                شفافیت و انضباط زیست‌محیطی
              </span>
              <span className="text-xs text-slate-500">استان زنجان</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              تالار رتبه‌بندی عمومی و برترین‌های صنعت سبز
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
              فهرست رتبه‌بندی شفاف صنایع و معادن متعهد به مدیریت باطله‌های روی، احیای قزل‌اوزن، کنترل غبار و اجرای مسئولیت اجتماعی.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-[10px] text-slate-500 block">واحدهای سبز حائز معافیت</span>
              <strong className="text-sm text-emerald-900 font-bold">
                {companies.filter((c) => c.currentScore >= 70).length} واحد ممتاز استانی
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 font-bold">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span>فیلتر بر اساس منطقه و رسته:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">شهرستان:</span>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="bg-slate-50 text-slate-900 rounded-xl px-3 py-1.5 border border-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="all">همه ۸ شهرستان استان زنجان</option>
              {COUNTIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.nameFa}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">رسته صنعتی:</span>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-slate-50 text-slate-900 rounded-xl px-3 py-1.5 border border-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="all">تمامی رسته‌های صنعتی و معدنی</option>
              {INDUSTRY_SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Ranked List */}
      <div className="space-y-3.5">
        {filteredCompanies.map((company, index) => {
          const rank = index + 1;
          const isPlatinum = company.currentTier === 'platinum';
          const isGold = company.currentTier === 'gold';

          return (
            <div
              key={company._id}
              className={`rounded-2xl border p-5 transition-all bg-white hover:shadow-md ${
                isPlatinum
                  ? 'border-emerald-300 shadow-xs'
                  : isGold
                  ? 'border-amber-300 shadow-xs'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left: Medal & Details */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shadow-xs shrink-0 ${
                      rank === 1
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-amber-500/20 ring-2 ring-amber-300'
                        : rank === 2
                        ? 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-800 ring-2 ring-slate-200'
                        : rank === 3
                        ? 'bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 ring-2 ring-amber-600'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {rank <= 3 ? <Trophy className="w-5 h-5" /> : `#${rank}`}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{company.name}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                          isPlatinum
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : isGold
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {isPlatinum ? 'صنعت سبز برتر - پلاتین' : isGold ? 'صنعت سبز همیار - طلا' : 'رتبه نقره'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        شهرستان {company.countyFa}
                      </span>
                      <span>•</span>
                      <span>{company.sector}</span>
                      <span>•</span>
                      <span className="text-slate-400">{company.industrialPark}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Progress Bar & Score */}
                <div className="flex items-center gap-6 shrink-0">
                  <div className="w-48 sm:w-64 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">امتیاز انطباق:</span>
                      <span className="font-bold text-emerald-950 font-vazir text-sm">
                        {company.currentScore} / ۱۰۰
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isPlatinum
                            ? 'bg-emerald-500'
                            : isGold
                            ? 'bg-amber-500'
                            : 'bg-slate-400'
                        }`}
                        style={{ width: `${company.currentScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectCompany(company)}
                    className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-emerald-600 hover:text-white text-emerald-800 text-xs font-bold border border-emerald-200 transition-all shrink-0 cursor-pointer"
                  >
                    مشاهده کارنامه
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
