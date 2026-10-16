import React, { useEffect } from 'react';
import { CountyProgram } from '../types/zanjanPlan';
import { X, ShieldAlert, CheckCircle2, MapPin, Users, Maximize2, AlertTriangle, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

interface CountyDetailModalProps {
  county: CountyProgram | null;
  onClose: () => void;
}

export const CountyDetailModal: React.FC<CountyDetailModalProps> = ({ county, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (county) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [county, onClose]);

  if (!county) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-10 select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-abyss-950/85 backdrop-blur-md transition-opacity duration-300"
        onClick={() => {
          soundEngine.playHydroClick();
          onClose();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-abyss-900 border border-emerald-500/35 rounded-2xl overflow-y-auto shadow-[0_0_50px_rgba(16,255,160,0.2)] z-10 text-slate-200">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-abyss-950/95 backdrop-blur-md border-b border-emerald-500/20">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 font-bold">
              {county.code}
            </span>
            <span className="font-vazir text-xs text-slate-400">
              پرونده عملیاتی کارگروه شهرستانی // به ریاست فرماندار
            </span>
          </div>
          <button
            onClick={() => {
              soundEngine.playHydroClick();
              onClose();
            }}
            data-cursor-action="بستن"
            className="p-1.5 rounded-full border border-slate-700 bg-abyss-900 hover:border-emerald-400 text-slate-400 hover:text-emerald-300 transition-colors"
            aria-label="بستن پرونده شهرستان"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-8 text-right font-vazir">
          {/* Top Banner Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visual with Dark Aesthetic */}
            <div className="relative rounded-xl overflow-hidden border border-emerald-500/25 h-72 sm:h-80 bg-abyss-950 group">
              <img
                src={county.image}
                alt={county.name}
                className="w-full h-full object-cover object-center filter contrast-[1.1] brightness-[0.75] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss-950 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs font-mono bg-abyss-950/85 backdrop-blur-sm px-3 py-1.5 rounded border border-emerald-500/20">
                <span className="text-emerald-300 font-bold">{county.coordinates}</span>
                <span className="text-slate-400 font-vazir">وسعت: {county.area}</span>
              </div>
            </div>

            {/* County Info */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-vazir bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>سطح تهدید زیست‌محیطی: {county.threatLevel}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl text-white font-extrabold leading-tight">
                {county.name}
              </h2>
              <p className="text-sm font-semibold text-emerald-400/90">
                عنوان هویتی و اکولوژیک: {county.nickname}
              </p>

              <div className="p-4 rounded-xl border border-slate-800 bg-abyss-950/80 text-xs text-slate-300 space-y-2">
                <div className="text-slate-400 font-bold">بوم‌سازگان‌های تحت پایش:</div>
                <div className="flex flex-wrap gap-1.5">
                  {county.keyEcosystems.map((eco) => (
                    <span key={eco} className="px-2 py-0.5 rounded bg-abyss-900 border border-slate-700 text-slate-200">
                      {eco}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>جمعیت: {county.population}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>مساحت: {county.area}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Focal Issue Box */}
          <div className="p-5 rounded-xl border border-red-500/30 bg-red-950/20 space-y-2">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>مسئله محوری و کانون بحران شهرستان:</span>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">
              {county.focalIssue}
            </p>
          </div>

          {/* Priority Action (Page 32-34) */}
          <div className="p-5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>اقدام اولویت‌دار مصوب سند استانی:</span>
            </div>
            <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-medium">
              {county.priorityAction}
            </p>
          </div>

          {/* Secondary Actions */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              سایر تکالیف و برنامه‌های اجرایی شهرستان:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {county.secondaryActions.map((sec, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-800 bg-abyss-950/80 text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-400 font-mono font-bold">0{idx + 1}.</span>
                  <span>{sec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specialist Quote */}
          <div className="p-4 rounded-xl border border-slate-800 bg-abyss-950/40 text-xs text-slate-400 italic">
            «{county.specialistQuote}»
          </div>
        </div>
      </div>
    </div>
  );
};
