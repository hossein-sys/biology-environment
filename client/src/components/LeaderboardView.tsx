import React, { useState } from 'react';
import {
  Trophy,
  Building2,
  Award,
  Filter,
  Droplets,
  Trash2,
  Trees,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Company, CountyKey } from '../types';
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
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 sm:p-8 border border-emerald-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                شفافیت و انضباط زیست‌محیطی
              </span>
              <span className="text-xs text-slate-400">استان زنجان</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              تالار افتخارات و رتبه‌بندی عمومی صنعت سبز
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              فهرست رتبه‌بندی واحدهای صنعتی متعهد به کنترل آلایندگی باطله‌های سرب و روی، احیای قزل‌اوزن، کنترل غبار و اجرای مسئولیت اجتماعی.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
              <span className="text-[10px] text-slate-400 block">واحدهای سبز استان</span>
              <strong className="text-sm text-emerald-400 font-bold">
                {companies.filter((c) => c.currentScore >= 70).length} واحد ممتاز
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <Filter className="w-4 h-4 text-emerald-400" />
          <span>فیلتر بر اساس منطقه و رسته:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* County Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">شهرستان:</span>
            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="bg-slate-800 text-white rounded-xl px-3 py-1.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">همه ۸ شهرستان استان</option>
              {COUNTIES.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.nameFa}
                </option>
              ))}
            </select>
          </div>

          {/* Sector Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">رسته صنعتی:</span>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-slate-800 text-white rounded-xl px-3 py-1.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">تمامی رسته‌های صنعتی</option>
              {INDUSTRY_SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Ranked Company Cards */}
      <div className="space-y-4">
        {filteredCompanies.map((company, index) => {
          const rank = index + 1;
          const isPlatinum = company.currentTier === 'platinum';
          const isGold = company.currentTier === 'gold';

          return (
            <div
              key={company._id}
              className={`rounded-2xl border p-5 transition-all hover:scale-[1.01] ${
                isPlatinum
                  ? 'bg-gradient-to-r from-slate-900 via-slate-850 to-emerald-950/40 border-emerald-500/50 shadow-xl'
                  : isGold
                  ? 'bg-gradient-to-r from-slate-900 via-slate-850 to-amber-950/30 border-amber-500/40 shadow-lg'
                  : 'bg-slate-900/80 border-slate-800 shadow'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left (Rank + Info) */}
                <div className="flex items-center gap-4">
                  {/* Rank Medal */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shadow-md shrink-0 ${
                      rank === 1
                        ? 'bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 shadow-amber-500/30 ring-2 ring-amber-300'
                        : rank === 2
                        ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-slate-950 shadow-slate-500/30 ring-2 ring-slate-200'
                        : rank === 3
                        ? 'bg-gradient-to-br from-amber-700 to-amber-900 text-amber-100 ring-2 ring-amber-600'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {rank <= 3 ? (
                      <span className="flex items-center gap-0.5">
                        <Trophy className="w-5 h-5" />
                      </span>
                    ) : (
                      `#${rank}`
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-white">{company.name}</h3>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                          isPlatinum
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                            : isGold
                            ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                            : 'bg-slate-700 text-slate-300 border-slate-600'
                        }`}
                      >
                        {isPlatinum ? 'رتبه پلاتین (برتر)' : isGold ? 'رتبه طلا (همیار)' : 'رتبه نقره'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <MapPin className="w-3.5 h-3.5" />
                        شهرستان {company.countyFa}
                      </span>
                      <span>•</span>
                      <span>{company.sector}</span>
                      <span>•</span>
                      <span className="font-mono text-slate-500">{company.industrialPark}</span>
                    </div>
                  </div>
                </div>

                {/* Right (Progress Bar + Score) */}
                <div className="flex items-center gap-6 shrink-0">
                  <div className="w-48 sm:w-64 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">امتیاز ارزیابی کارگروه:</span>
                      <span className="font-bold text-white font-vazir text-sm">
                        {company.currentScore} / ۱۰۰
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isPlatinum
                            ? 'bg-gradient-to-r from-teal-400 to-emerald-400'
                            : isGold
                            ? 'bg-gradient-to-r from-amber-400 to-yellow-400'
                            : 'bg-slate-500'
                        }`}
                        style={{ width: `${company.currentScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectCompany(company)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-emerald-400 text-xs font-semibold border border-slate-700 transition-all shrink-0"
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
