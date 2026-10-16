import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  color?: 'emerald' | 'amber' | 'cyan' | 'rose' | 'violet' | 'blue';
  badge?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'emerald',
  badge,
}) => {
  const colorMap = {
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
    rose: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    violet: 'bg-violet-500/10 border-violet-500/30 text-violet-400',
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  };

  const iconBgMap = {
    emerald: 'bg-emerald-500/20 text-emerald-400',
    amber: 'bg-amber-500/20 text-amber-400',
    cyan: 'bg-cyan-500/20 text-cyan-400',
    rose: 'bg-rose-500/20 text-rose-400',
    violet: 'bg-violet-500/20 text-violet-400',
    blue: 'bg-blue-500/20 text-blue-400',
  };

  return (
    <div
      className={`rounded-2xl border p-5 backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-[1.02] ${colorMap[color]} bg-slate-900/60`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-400 tracking-wide">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-white font-vazir">{value}</span>
            {badge && (
              <span className="inline-flex items-center rounded-md bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl border border-white/5 ${iconBgMap[color]}`}>{icon}</div>
      </div>
      {trend && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">وضعیت انطباق:</span>
          <span className="font-semibold text-emerald-400">{trend}</span>
        </div>
      )}
    </div>
  );
};
