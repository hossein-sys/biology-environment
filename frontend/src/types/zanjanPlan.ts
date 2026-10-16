export interface CountyProgram {
  id: string;
  code: string;
  name: string;
  nickname: string;
  focalIssue: string;
  priorityAction: string;
  secondaryActions: string[];
  keyEcosystems: string[];
  threatLevel: 'بحرانی' | 'بالا' | 'متوسط';
  population: string;
  area: string;
  image: string;
  coordinates: string;
  specialistQuote: string;
}

export interface StrategicCrisis {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  summary: string;
  detailedAnalysis: string[];
  impactStats: { label: string; value: string; unit?: string }[];
  location: string;
  status: 'بحرانی' | 'هشدار جدی' | 'در دست اقدام';
  mitigationStrategy: string;
}

export interface OperationalAction {
  code: string;
  axisNumber: number;
  axisTitle: string;
  title: string;
  coreIssue: string;
  smartTarget: string;
  targetAudience: string;
  executionLevel: 'استانی' | 'شهرستانی' | 'دستگاهی' | 'ملی';
  responsibleEntity: string;
  timeframe: 'کوتاه‌مدت' | 'میان‌مدت' | 'بلندمدت';
}

export interface RaciMatrixItem {
  entity: string;
  education: 'A' | 'R' | 'C' | 'I';
  waterQezelOzan: 'A' | 'R' | 'C' | 'I';
  leadZincCsr: 'A' | 'R' | 'C' | 'I';
  wasteSorting: 'A' | 'R' | 'C' | 'I';
  soltaniyehDust: 'A' | 'R' | 'C' | 'I';
  anguranBiodiversity: 'A' | 'R' | 'C' | 'I';
  mediaVirtualSpace: 'A' | 'R' | 'C' | 'I';
}

export interface KpiItem {
  id: string;
  title: string;
  category: 'نهاده و منابع' | 'فرآیند و خروجی' | 'اثربخشی و پیامد';
  unit: string;
  frequency: 'فصلی' | 'سالانه' | 'ماهانه';
  source: string;
  targetHorizon: string;
  currentEstimated: string;
}

export interface SeasonalEvent {
  season: 'بهار' | 'تابستان' | 'پاییز' | 'زمستان';
  month: string;
  agenda: string;
  fieldAction: string;
}
