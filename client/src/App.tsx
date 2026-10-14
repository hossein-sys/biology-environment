import React, { useState, useEffect } from 'react';
import { FloatingHeader } from './components/FloatingHeader';
import { LandingPageView } from './components/LandingPageView';
import { CompanyDashboardView } from './components/CompanyDashboardView';
import { AdminAuditView } from './components/AdminAuditView';
import { CertificateView } from './components/CertificateView';
import { LeaderboardView } from './components/LeaderboardView';
import { AuthModal } from './components/AuthModal';
import { CertificateVoucherModal } from './components/CertificateVoucherModal';
import { storageService } from './services/storage';
import { Company, ActivityLog, DiscountIncentive } from './types';
import { ShieldCheck, Heart, Leaf } from 'lucide-react';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<'company_rep' | 'inspector'>(
    storageService.getCurrentRole()
  );
  const [activeView, setActiveView] = useState<'home' | 'dashboard' | 'rewards' | 'leaderboard' | 'admin'>('home');
  const [companies, setCompanies] = useState<Company[]>(storageService.getCompanies());
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(
    storageService.getSelectedCompanyId()
  );
  const [logs, setLogs] = useState<ActivityLog[]>(storageService.getActivityLogs());
  const [vouchers, setVouchers] = useState<DiscountIncentive[]>(storageService.getVouchers());

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedVoucherForModal, setSelectedVoucherForModal] =
    useState<DiscountIncentive | null>(null);

  useEffect(() => {
    refreshAllData();
  }, []);

  const refreshAllData = () => {
    const comps = storageService.getCompanies();
    setCompanies(comps);
    setLogs(storageService.getActivityLogs());
    setVouchers(storageService.getVouchers());
  };

  const handleRoleChange = (role: 'company_rep' | 'inspector') => {
    setCurrentRole(role);
    storageService.setCurrentRole(role);
    if (role === 'inspector') {
      setActiveView('admin');
    } else {
      setActiveView('dashboard');
    }
  };

  const handleCompanyChange = (id: string) => {
    setSelectedCompanyId(id);
    storageService.setSelectedCompanyId(id);
  };

  const activeCompany =
    companies.find((c) => c._id === selectedCompanyId) || companies[0];

  const activeCompanyLogs = logs.filter(
    (l) => l.companyId._id === activeCompany?._id
  );
  const activeCompanyVouchers = vouchers.filter(
    (v) => v.companyId._id === activeCompany?._id
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-vazir selection:bg-emerald-500 selection:text-white" dir="rtl">
      {/* Floating Glassmorphism Header */}
      <FloatingHeader
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeView={activeView}
        onViewChange={setActiveView}
        companies={companies}
        selectedCompanyId={selectedCompanyId}
        onCompanyChange={handleCompanyChange}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeView === 'home' && (
          <LandingPageView
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onNavigateToDashboard={() => setActiveView('dashboard')}
            onNavigateToLeaderboard={() => setActiveView('leaderboard')}
            onNavigateToRewards={() => setActiveView('rewards')}
            topCompanies={companies}
          />
        )}

        {activeView === 'dashboard' && activeCompany && (
          <CompanyDashboardView
            company={activeCompany}
            logs={activeCompanyLogs}
            vouchers={activeCompanyVouchers}
            onOpenCertificateModal={(v) => setSelectedVoucherForModal(v)}
            onRefreshData={refreshAllData}
            onNavigateToRewards={() => setActiveView('rewards')}
          />
        )}

        {activeView === 'admin' && (
          <AdminAuditView
            companies={companies}
            logs={logs}
            onRefreshData={refreshAllData}
            onOpenCertificateModal={(v) => setSelectedVoucherForModal(v)}
          />
        )}

        {activeView === 'rewards' && (
          <CertificateView
            vouchers={vouchers}
            companies={companies}
            selectedCompanyId={selectedCompanyId}
          />
        )}

        {activeView === 'leaderboard' && (
          <LeaderboardView
            companies={companies}
            onSelectCompany={(c) => {
              handleCompanyChange(c._id);
              setActiveView('dashboard');
            }}
          />
        )}
      </main>

      {/* Footer (Hidden in Print) */}
      <footer className="no-print mt-auto border-t border-emerald-100 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-800">
                سامانه پایش عملکرد و صنعت سبز استان زنجان
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                دبیرخانه شورای فرهنگ عمومی استان • کارگروه ارتقای فرهنگ حفاظت محیط‌زیست
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 max-w-md">
            اجرای ماده ۲۷ قانون مالیات بر ارزش افزوده و شیوه نامه استانی پایش فلزات سنگین سرب و روی، رودخانه قزل‌اوزن و دپوهای باطله
          </div>
        </div>
      </footer>

      {/* Onboarding & Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onCompanyCreatedOrSelected={(comp) => {
          refreshAllData();
          handleCompanyChange(comp._id);
          setActiveView('dashboard');
        }}
        onSelectRole={handleRoleChange}
      />

      {/* Print Certificate Modal */}
      {selectedVoucherForModal && (
        <CertificateVoucherModal
          voucher={selectedVoucherForModal}
          onClose={() => setSelectedVoucherForModal(null)}
        />
      )}
    </div>
  );
};
