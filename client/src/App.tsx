import React, { useState, useEffect } from 'react';
import { agencyStorageService } from './services/agencyStorage';
import { Agency, CulturalEvent } from './types/governmentalAgency';
import { GovernmentalHeader } from './components/GovernmentalHeader';
import { GovernmentalLandingPage } from './components/GovernmentalLandingPage';
import { GovernmentalDashboard } from './components/GovernmentalDashboard';
import { GovernmentalLeaderboardAndAwards } from './components/GovernmentalLeaderboardAndAwards';
import { GovernmentalAdminReview } from './components/GovernmentalAdminReview';
import { GovernmentalAuthModal } from './components/GovernmentalAuthModal';
import { GovernmentalEventModal } from './components/GovernmentalEventModal';
import { ShieldCheck, MapPin, ExternalLink } from 'lucide-react';

export const App: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [events, setEvents] = useState<CulturalEvent[]>([]);
  const [selectedAgencyId, setSelectedAgencyId] = useState<string>('');
  const [currentRole, setCurrentRole] = useState<'agency_rep' | 'provincial_evaluator'>('agency_rep');
  const [activeView, setActiveView] = useState<'landing' | 'dashboard' | 'leaderboard' | 'admin'>('landing');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => agencyStorageService.getTheme());

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState<boolean>(false);

  // Sync dark class on documentElement
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    agencyStorageService.setTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Sync state from agencyStorageService
  const refreshData = () => {
    const loadedAgencies = agencyStorageService.getAgencies();
    const loadedEvents = agencyStorageService.getEvents();
    const storedAgencyId = agencyStorageService.getActiveAgencyId();
    const storedRole = agencyStorageService.getCurrentRole();

    setAgencies(loadedAgencies);
    setEvents(loadedEvents);
    setSelectedAgencyId(
      loadedAgencies.some((a) => a._id === storedAgencyId)
        ? storedAgencyId
        : loadedAgencies[0]?._id || ''
    );
    setCurrentRole(storedRole);
  };

  useEffect(() => {
    agencyStorageService.init();
    refreshData();
  }, []);

  const activeAgency =
    agencies.find((a) => a._id === selectedAgencyId) ||
    agencies[0] || {
      _id: 'agency-medu',
      name: 'اداره کل آموزش و پرورش استان زنجان',
      county: 'zanjan',
      countyFa: 'زنجان',
      category: 'آموزشی و فرهنگی',
      liaisonOfficer: {
        fullName: 'دکتر علیرضا رحمانی',
        phone: '۰۹۱۲۱۴۱۸۸۷۷',
        title: 'رابط محیط‌زیست',
      },
      totalScore: 94,
      totalHours: 124,
      totalAudience: 1850,
      rank: 1,
    };

  const handleRoleChange = (role: 'agency_rep' | 'provincial_evaluator') => {
    setCurrentRole(role);
    agencyStorageService.setCurrentRole(role);
    if (role === 'provincial_evaluator' && activeView === 'dashboard') {
      setActiveView('admin');
    } else if (role === 'agency_rep' && activeView === 'admin') {
      setActiveView('dashboard');
    }
  };

  const handleAgencyChange = (agencyId: string) => {
    setSelectedAgencyId(agencyId);
    agencyStorageService.setActiveAgencyId(agencyId);
  };

  const handleResetData = () => {
    if (window.confirm('آیا از بازنشانی داده‌های تستی لوکال به وضعیت اولیه اطمینان دارید؟')) {
      agencyStorageService.resetData();
      refreshData();
    }
  };

  const stats = agencyStorageService.getProvinceStats();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-vazirmatn antialiased selection:bg-emerald-200 dark:selection:bg-emerald-900 selection:text-emerald-900 dark:selection:text-emerald-100 transition-colors duration-200"
    >
      {/* Floating Glassmorphic Header */}
      <GovernmentalHeader
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeView={activeView}
        onViewChange={setActiveView}
        agencies={agencies}
        selectedAgencyId={selectedAgencyId}
        onAgencyChange={handleAgencyChange}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onResetData={handleResetData}
        isDark={theme === 'dark'}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {activeView === 'landing' && (
          <GovernmentalLandingPage
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onNavigateToDashboard={() => setActiveView('dashboard')}
            onNavigateToLeaderboard={() => setActiveView('leaderboard')}
            topAgencies={agencies}
            stats={stats}
          />
        )}

        {activeView === 'dashboard' && (
          <GovernmentalDashboard
            agency={activeAgency}
            events={events}
            onOpenNewEventModal={() => setIsEventModalOpen(true)}
            onNavigateToLeaderboard={() => setActiveView('leaderboard')}
          />
        )}

        {activeView === 'leaderboard' && (
          <GovernmentalLeaderboardAndAwards
            agencies={agencies}
            activeAgency={activeAgency}
            onRefreshData={refreshData}
          />
        )}

        {activeView === 'admin' && (
          <GovernmentalAdminReview
            events={events}
            agencies={agencies}
            onRefreshData={refreshData}
          />
        )}
      </main>

      {/* Official Footer */}
      <footer className="no-print mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/80 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                سامانه پایش عملکرد و ارتقای فرهنگ محیط‌زیست ادارات استان زنجان
              </p>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                دبیرخانه شورای فرهنگ عمومی استان • اداره کل حفاظت محیط‌زیست زنجان
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500 dark:text-slate-400 text-xs">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>پوشش شهرستان‌های هشت‌گانه استان زنجان</span>
            </span>
            <span>•</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-medium">
              ماده ۱۲ برنامه عمل جامع ارتقای فرهنگ محیط‌زیست
            </span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 gap-3">
          <span>
            طراحی و پیاده‌سازی مبتنی بر استانداردهای کارگروه استانی • کلیه داده‌ها در حافظه محلی (LocalStorage) ذخیره و پردازش می‌شوند.
          </span>
          <span className="font-mono">نسخه ۱.۰.۰ • ۱۴۰۵</span>
        </div>
      </footer>

      {/* Auth / Onboarding Modal */}
      <GovernmentalAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(agency) => {
          refreshData();
          setSelectedAgencyId(agency._id);
          setActiveView('dashboard');
        }}
      />

      {/* Multi-step Event Submission Modal */}
      <GovernmentalEventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        activeAgency={activeAgency}
        onEventCreated={() => {
          refreshData();
        }}
      />
    </div>
  );
};

export default App;
