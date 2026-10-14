import {
  User,
  Company,
  ActivityLog,
  FieldObservation,
  Resolution,
  AuditScore,
  DiscountIncentive,
  ProvincialKPIs,
} from '../types';

const API_BASE = '/api';

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const api = {
  // Auth
  async login(username: string, password: string):Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'خطا در ورود به سامانه');
    return data;
  },

  async registerCompany(companyData: any): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/register-company`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(companyData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'خطا در ثبت‌نام');
    return data;
  },

  async getMe(): Promise<{ user: User }> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'خطا در احراز هویت');
    return data;
  },

  async demoSwitchRole(role: string): Promise<{ token: string; user: User }> {
    const res = await fetch(`${API_BASE}/auth/demo-switch/${role}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    localStorage.setItem('token', data.token);
    return data;
  },

  // Companies
  async getCompanies(params?: { county?: string; sector?: string; tier?: string; search?: string }): Promise<Company[]> {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/companies?${query}`);
    const data = await res.json();
    return data.data || [];
  },

  async getCompanyById(id: string): Promise<Company> {
    const res = await fetch(`${API_BASE}/companies/${id}`);
    const data = await res.json();
    return data.data;
  },

  async getLeaderboard(): Promise<Company[]> {
    const res = await fetch(`${API_BASE}/companies/leaderboard/green-industry`);
    const data = await res.json();
    return data.data || [];
  },

  // Activity Logs
  async getActivityLogs(params?: { companyId?: string; status?: string; period?: string }): Promise<ActivityLog[]> {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/activity-logs?${query}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    return data.data || [];
  },

  async getActivityLogById(id: string): Promise<ActivityLog> {
    const res = await fetch(`${API_BASE}/activity-logs/${id}`, {
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    return data.data;
  },

  async createActivityLog(logData: any): Promise<ActivityLog> {
    const res = await fetch(`${API_BASE}/activity-logs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(logData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async submitActivityLog(id: string): Promise<ActivityLog> {
    const res = await fetch(`${API_BASE}/activity-logs/${id}/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async reviewActivityLog(
    id: string,
    reviewData: { status: string; reviewerNotes?: string; inspectorDisputeRemarks?: string }
  ): Promise<ActivityLog> {
    const res = await fetch(`${API_BASE}/activity-logs/${id}/review`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reviewData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  // Inspections (Appendix 1)
  async getFieldObservations(params?: { county?: string; severity?: string; status?: string; search?: string }): Promise<FieldObservation[]> {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/inspections?${query}`);
    const data = await res.json();
    return data.data || [];
  },

  async createFieldObservation(obsData: any): Promise<FieldObservation> {
    const res = await fetch(`${API_BASE}/inspections`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(obsData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async updateFieldObservation(id: string, updateData: any): Promise<FieldObservation> {
    const res = await fetch(`${API_BASE}/inspections/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  // Resolutions (Appendix 2)
  async getResolutions(params?: { status?: string; agency?: string; category?: string }): Promise<Resolution[]> {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/resolutions?${query}`);
    const data = await res.json();
    return data.data || [];
  },

  async getRaciMatrix(): Promise<{ description: string; legend: any; data: any[] }> {
    const res = await fetch(`${API_BASE}/resolutions/raci-matrix`);
    const data = await res.json();
    return data;
  },

  async createResolution(resData: any): Promise<Resolution> {
    const res = await fetch(`${API_BASE}/resolutions`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(resData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async updateResolution(id: string, updateData: any): Promise<Resolution> {
    const res = await fetch(`${API_BASE}/resolutions/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateData),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  // Scoring Engine
  async evaluateActivityLog(logId: string, evaluatorNotes?: string): Promise<{ score: AuditScore; incentive?: DiscountIncentive }> {
    const res = await fetch(`${API_BASE}/scoring/evaluate/${logId}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ evaluatorNotes }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data;
  },

  async getCompanyScores(companyId: string): Promise<AuditScore[]> {
    const res = await fetch(`${API_BASE}/scoring/company/${companyId}`);
    const data = await res.json();
    return data.data || [];
  },

  // Vouchers & Certificates
  async getVouchers(params?: { companyId?: string; tier?: string }): Promise<DiscountIncentive[]> {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_BASE}/vouchers?${query}`);
    const data = await res.json();
    return data.data || [];
  },

  async getVoucherByNumber(voucherNumber: string): Promise<DiscountIncentive> {
    const res = await fetch(`${API_BASE}/vouchers/${voucherNumber}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    return data.data;
  },

  async verifyVoucher(voucherNumber: string): Promise<any> {
    const res = await fetch(`${API_BASE}/vouchers/verify/${voucherNumber}`);
    const data = await res.json();
    return data;
  },

  // Analytics
  async getProvincialKPIs(): Promise<ProvincialKPIs> {
    const res = await fetch(`${API_BASE}/analytics/provincial-kpis`);
    const data = await res.json();
    return data.data;
  },
};
