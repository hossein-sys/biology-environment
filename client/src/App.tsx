import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CompanyDashboardView } from './components/CompanyDashboardView';
import { AdminAuditView } from './components/AdminAuditView';
import { CertificateView } from './components/CertificateView';
import { LeaderboardView } from './components/LeaderboardView';
import { AuthModal } from './components/AuthModal';
import { CertificateVoucherModal } from './components/CertificateVoucherModal';
import { storageService } from './services/storage';
import { Company, ActivityLog, DiscountIncentive } from './types';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<'company_rep' | 'inspector'>(
    storageService.getCurrentRole()
  );
  const [activeTab, setActiveTab] = useState<'company' | 'admin' | 'certificate' | 'leaderboard'>(
    'company'
  );
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
      setActiveTab('admin');
    } else {
      setActiveTab('company');
    }
  };

  const handleCompanyChange = (id: string) => {
    setSelectedCompanyId(id);
    storageService.setSelectedCompanyId(id);
  };

  const handleResetData = () => {
    if (window.confirm('آیا مایل به بازنشانی اطلاعات تستی اولیه به حالت پیش‌فرض هستید؟')) {
      storageService.resetData();
      refreshAllData();
      setSelectedCompanyId(storageService.getSelectedCompanyId());
      setCurrentRole('company_rep');
      setActiveTab('company');
    }
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-vazir selection:bg-emerald-500 selection:text-white" dir="rtl">
      {/* Navbar with Role Switcher & Tabs */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        companies={companies}
        selectedCompanyId={selectedCompanyId}
        onCompanyChange={handleCompanyChange}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'company' && activeCompany && (
          <CompanyDashboardView
            company={activeCompany}
            logs={activeCompanyLogs}
            vouchers={activeCompanyVouchers}
            onOpenCertificateModal={(v) => setSelectedVoucherForModal(v)}
            onRefreshData={refreshAllData}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'admin' && (
          <AdminAuditView
            companies={companies}
            logs={logs}
            onRefreshData={refreshAllData}
            onOpenCertificateModal={(v) => setSelectedVoucherForModal(v)}
          />
        )}

        {activeTab === 'certificate' && (
          <CertificateView
            vouchers={vouchers}
            companies={companies}
            selectedCompanyId={selectedCompanyId}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView
            companies={companies}
            onSelectCompany={(c) => {
              handleCompanyChange(c._id);
              setActiveTab('company');
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print mt-auto border-t border-slate-800 bg-slate-900/60 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
          <div>
            <span className="font-semibold text-slate-300">
              سامانه پایش عملکرد و صنعت سبز استان زنجان
            </span>{' '}
            — دبیرخانه شورای فرهنگ عمومی و کارگروه ارتقای فرهنگ حفاظت محیط‌زیست
          </div>
          <div className="text-[11px] text-slate-500">
            نسخه پیش‌نمایش MVP فرانت‌اند • منطبق بر ماده ۲۷ قانون مالیات بر ارزش افزوده
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
        }}
        onSelectRole={handleRoleChange}
      />

      {/* Certificate Print & Inspection Modal */}
      {selectedVoucherForModal && (
        <CertificateVoucherModal
          voucher={selectedVoucherForModal}
          onClose={() => setSelectedVoucherForModal(null)}
        />
      )}
    </div>
  );
};
