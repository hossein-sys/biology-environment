import { Company, ActivityLog, AuditScore, DiscountIncentive, User, CountyKey } from '../types';

export const COUNTIES: { key: CountyKey; nameFa: string }[] = [
  { key: 'zanjan', nameFa: 'زنجان' },
  { key: 'mahneshan', nameFa: 'ماهنشان' },
  { key: 'abhar', nameFa: 'ابهر' },
  { key: 'khorramdarreh', nameFa: 'خرم‌دره' },
  { key: 'soltaniyeh', nameFa: 'سلطانیه' },
  { key: 'tarom', nameFa: 'طارم' },
  { key: 'khodabandeh', nameFa: 'خدابنده' },
  { key: 'ijrud', nameFa: 'ایجرود' },
];

export const INDUSTRY_SECTORS = [
  'صنایع سرب و روی و متالورژی',
  'صنایع شیمیایی و پتروشیمی',
  'صنایع غذایی، کشاورزی و تبدیلی',
  'صنایع معدنی و کانی غیرفلزی',
  'ریخته‌گری و فولاد',
  'صنایع نساجی و بسته‌بندی',
];

const INITIAL_COMPANIES: Company[] = [
  {
    _id: 'comp-calcimin',
    shenaseMelli: '10100458921',
    name: 'شرکت کالسیمین (سهامی عام)',
    county: 'mahneshan',
    countyFa: 'ماهنشان',
    industrialPark: 'مجتمع معدنی انگوران و واحد هیدرو متالورژی دندی',
    sector: 'صنایع سرب و روی و متالورژی',
    licenseNumber: 'ص/۹۸/۱۲۴۵۴',
    environmentalOfficer: {
      fullName: 'مهندس محمدرضا موسوی',
      phone: '09121415678',
      nationalCode: '4281234567',
      email: 'hse@calcimin.com',
    },
    waterSource: 'پساب تصفیه شده + چاه کشاورزی دارای پروانه',
    dischargeType: 'بازچرخانی کامل (ZLD) - بدون خروجی به قزل‌اوزن',
    establishedYear: 1358,
    currentTier: 'platinum',
    currentScore: 92,
    activeViolationsCount: 0,
    address: 'استان زنجان، شهرستان ماهنشان، مجتمع دندی',
    coordinates: { lat: 36.56, lng: 47.78 },
  },
  {
    _id: 'comp-zanjan-zinc',
    shenaseMelli: '10861234567',
    name: 'مجتمع ذوب و روی زنجان',
    county: 'zanjan',
    countyFa: 'زنجان',
    industrialPark: 'شهرک تخصصی روی زنجان (کیلومتر ۱۲ جاده بیجار)',
    sector: 'صنایع سرب و روی و متالورژی',
    licenseNumber: 'ص/۱۴۰۰/۷۸۹۰',
    environmentalOfficer: {
      fullName: 'مهندس فاطمه سلیمانی',
      phone: '09123419876',
      nationalCode: '4279876543',
      email: 'env@zanjanzinc.ir',
    },
    waterSource: 'تصفیه‌خانه مرکزی شهرک روی',
    dischargeType: 'بازچرخانی و استفاده در خنک‌کاری برج‌ها',
    establishedYear: 1378,
    currentTier: 'gold',
    currentScore: 78,
    activeViolationsCount: 0,
    address: 'استان زنجان، شهرستان زنجان، شهرک صنعتی تخصصی روی',
    coordinates: { lat: 36.63, lng: 48.45 },
  },
  {
    _id: 'comp-sahand-abhar',
    shenaseMelli: '10100987654',
    name: 'صنایع ریخته‌گری سهند ابهر',
    county: 'abhar',
    countyFa: 'ابهر',
    industrialPark: 'شهرک صنعتی نورین ابهر',
    sector: 'ریخته‌گری و فولاد',
    licenseNumber: 'ص/۹۵/۳۳۱۱',
    environmentalOfficer: {
      fullName: 'مهندس کامران رستمی',
      phone: '09127412233',
      nationalCode: '4295556677',
      email: 'hse@sahand-foundry.com',
    },
    waterSource: 'چاه شهرک صنعتی',
    dischargeType: 'تصفیه‌خانه سپتیک محلی',
    establishedYear: 1385,
    currentTier: 'silver',
    currentScore: 54,
    activeViolationsCount: 1,
    address: 'استان زنجان، شهرستان ابهر، شهرک صنعتی نورین',
    coordinates: { lat: 36.14, lng: 49.21 },
  },
  {
    _id: 'comp-tarom-olive',
    shenaseMelli: '10100554433',
    name: 'کشت و صنعت زیتون سبز طارم',
    county: 'tarom',
    countyFa: 'طارم',
    industrialPark: 'شهرک کشاورزی و صنایع تبدیلی طارم (حاشیه قزل‌اوزن)',
    sector: 'صنایع غذایی، کشاورزی و تبدیلی',
    licenseNumber: 'ص/۱۴۰۱/۹۱۸۲',
    environmentalOfficer: {
      fullName: 'مهندس سارا محمدی',
      phone: '09124418899',
      nationalCode: '4271122334',
      email: 'green@tarom-olive.ir',
    },
    waterSource: 'پساب تصفیه شده زیتون‌کشی + آبیاری قطره‌ای',
    dischargeType: 'بازچرخانی کامل پساب زیتون و تبدیل به کمپوست آلی',
    establishedYear: 1392,
    currentTier: 'gold',
    currentScore: 82,
    activeViolationsCount: 0,
    address: 'استان زنجان، شهرستان طارم، آب‌بر، کیلومتر ۵ جاده درام',
    coordinates: { lat: 36.98, lng: 48.96 },
  },
];

const INITIAL_LOGS: ActivityLog[] = [
  {
    _id: 'log-101',
    companyId: INITIAL_COMPANIES[0],
    period: 'زمستان ۱۴۰۴',
    year: 1404,
    quarter: 4,
    status: 'approved',
    statusFa: 'تایید شده',
    wasteManagement: {
      tailingsProducedTons: 14000,
      tailingsNeutralizedTons: 13500,
      filterPressActive: true,
      filterPressThroughputTonsPerDay: 450,
      geomembraneIsolation: true,
      hazardousWasteTransferredTons: 13500,
      safeDisposalSiteLocation: 'سد باطله ایزوله سرپوشیده دندی - مورد تایید محیط‌زیست',
    },
    waterResources: {
      waterConsumedM3: 45000,
      greywaterRecycledM3: 39000,
      recyclingRatePercentage: 86.6,
      zeroLiquidDischargeActive: true,
      qezelOzanDirectDischarge: false,
      effluentCodBODCompliant: true,
      waterAuditReportAttached: true,
    },
    airAndDust: {
      bagFilterEfficiency: 98.5,
      dustSuppressionSprayingActive: true,
      greenSpaceAreaM2: 55000,
      treesPlantedCount: 1200,
      continuousOnlineMonitoringActive: true,
    },
    csrAndEducation: {
      csrBudgetRials: 18000000000, // 1.8 Billion Tomans
      communityProjectsDescription: 'احداث خانه بهداشت در روستای دندی و تامین اقلام پایش سلامت اهالی حوزه معدنی',
      targetVillagesHelped: ['دندی', 'سراب', 'انگوران'],
      staffTrainingHours: 120,
      staffTrainedCount: 85,
      schoolOutreachFunded: true,
    },
    incidentsAndRemediation: {
      hadIncident: false,
      incidentType: 'ندارد',
    },
    evidenceFiles: [
      {
        id: 'file-1',
        fileName: 'گزارش_آزمایشگاه_معتمد_کیفیت_پساب.pdf',
        fileType: 'lab_report',
        fileTypeFa: 'گزارش آزمایشگاه معتمد',
        fileUrl: '#',
        fileSize: 2450000,
        uploadedAt: '1404/11/15',
        description: 'نتایج آنالیز فلزات سنگین سرب و کادمیوم - خروجی صفر آلایندگی',
        verifiedByInspector: true,
      },
      {
        id: 'file-2',
        fileName: 'تاییدیه_ایزولاسیون_ژئوممبران_سد_باطله.pdf',
        fileType: 'utm_photo',
        fileTypeFa: 'مستندات ژئوممبران',
        fileUrl: '#',
        fileSize: 4200000,
        uploadedAt: '1404/11/18',
        description: 'تصاویر و گزارش مهندسی آب‌بندی باطله‌های صنعتی',
        verifiedByInspector: true,
      },
    ],
    reviewedBy: {
      fullName: 'دکتر علیرضا اسدی',
      roleFa: 'سرممیز صنایع شیمیایی و معدنی',
      departmentOrAgency: 'اداره کل حفاظت محیط‌زیست استان زنجان',
    },
    reviewerNotes: 'تمامی ضوابط مدیریت پسماند خطرناک و بازچرخانی آب در حوزه قزل‌اوزن رعایت شده است. حائز رتبه پلاتین.',
    submittedAt: '1404/11/10',
    reviewedAt: '1404/11/25',
    createdAt: '2026-02-14T09:00:00Z',
  },
  {
    _id: 'log-102',
    companyId: INITIAL_COMPANIES[1],
    period: 'زمستان ۱۴۰۴',
    year: 1404,
    quarter: 4,
    status: 'under_review',
    statusFa: 'در انتظار بررسی',
    wasteManagement: {
      tailingsProducedTons: 9500,
      tailingsNeutralizedTons: 7600,
      filterPressActive: true,
      filterPressThroughputTonsPerDay: 300,
      geomembraneIsolation: true,
      hazardousWasteTransferredTons: 7600,
      safeDisposalSiteLocation: 'سایت تجمیع پسماند صنعتی شهرک تخصصی روی',
    },
    waterResources: {
      waterConsumedM3: 28000,
      greywaterRecycledM3: 20000,
      recyclingRatePercentage: 71.4,
      zeroLiquidDischargeActive: false,
      qezelOzanDirectDischarge: false,
      effluentCodBODCompliant: true,
      waterAuditReportAttached: true,
    },
    airAndDust: {
      bagFilterEfficiency: 92,
      dustSuppressionSprayingActive: true,
      greenSpaceAreaM2: 18000,
      treesPlantedCount: 450,
      continuousOnlineMonitoringActive: true,
    },
    csrAndEducation: {
      csrBudgetRials: 9500000000,
      communityProjectsDescription: 'برگزاری کارگاه‌های مدیریت ایمن پسماند و توزیع بسته‌های بهداشتی در مدارس همجوار',
      targetVillagesHelped: ['دیزج‌آباد', 'حسن‌ابدال'],
      staffTrainingHours: 64,
      staffTrainedCount: 42,
      schoolOutreachFunded: true,
    },
    incidentsAndRemediation: {
      hadIncident: false,
      incidentType: 'ندارد',
    },
    evidenceFiles: [
      {
        id: 'file-3',
        fileName: 'گزارش_فیلتراسیون_غبار_اسکرابر.pdf',
        fileType: 'lab_report',
        fileTypeFa: 'گزارش فیلتراسیون هوا',
        fileUrl: '#',
        fileSize: 1850000,
        uploadedAt: '1404/12/01',
        description: 'راندمان خروجی بگ‌فیلتر کوره ذوب',
      },
    ],
    submittedAt: '1404/12/02',
    createdAt: '2026-03-01T11:30:00Z',
  },
  {
    _id: 'log-103',
    companyId: INITIAL_COMPANIES[2],
    period: 'پاییز ۱۴۰۴',
    year: 1404,
    quarter: 3,
    status: 'revision_required',
    statusFa: 'نیازمند اصلاح',
    wasteManagement: {
      tailingsProducedTons: 3200,
      tailingsNeutralizedTons: 1200,
      filterPressActive: false,
      filterPressThroughputTonsPerDay: 0,
      geomembraneIsolation: false,
      hazardousWasteTransferredTons: 1200,
      safeDisposalSiteLocation: 'دپوی روباز موقت محوطه کارخانه',
    },
    waterResources: {
      waterConsumedM3: 15000,
      greywaterRecycledM3: 4000,
      recyclingRatePercentage: 26.6,
      zeroLiquidDischargeActive: false,
      qezelOzanDirectDischarge: false,
      effluentCodBODCompliant: false,
      waterAuditReportAttached: false,
    },
    airAndDust: {
      bagFilterEfficiency: 74,
      dustSuppressionSprayingActive: false,
      greenSpaceAreaM2: 4000,
      treesPlantedCount: 80,
      continuousOnlineMonitoringActive: false,
    },
    csrAndEducation: {
      csrBudgetRials: 1000000000,
      communityProjectsDescription: 'برنامه‌های مقدماتی آموزش HSE درون‌کارگاهی',
      targetVillagesHelped: ['نورین'],
      staffTrainingHours: 16,
      staffTrainedCount: 12,
      schoolOutreachFunded: false,
    },
    incidentsAndRemediation: {
      hadIncident: true,
      incidentType: 'نشت موضعی غبار سیلیس',
      incidentDescription: 'نقص فنی بگ‌فیلتر خط ۲ ذوب',
      immediateActionTaken: 'تعویض کیسه‌های فیلتر و تعمیر سیستم مکش',
    },
    evidenceFiles: [],
    reviewedBy: {
      fullName: 'مهندس پروانه کریمی',
      roleFa: 'کارشناس پایش محیط‌زیست ابهر',
      departmentOrAgency: 'اداره حفاظت محیط‌زیست ابهر',
    },
    reviewerNotes: 'ایزولاسیون دپوی پسماند غیراستاندارد است و راندمان غبارگیر زیر ۸۰٪ می‌باشد. سریعاً مدارک اصلاحی بارگذاری شود.',
    submittedAt: '1404/09/20',
    reviewedAt: '1404/09/28',
    createdAt: '2025-12-11T14:15:00Z',
  },
  {
    _id: 'log-104',
    companyId: INITIAL_COMPANIES[3],
    period: 'زمستان ۱۴۰۴',
    year: 1404,
    quarter: 4,
    status: 'approved',
    statusFa: 'تایید شده',
    wasteManagement: {
      tailingsProducedTons: 1200,
      tailingsNeutralizedTons: 1150,
      filterPressActive: true,
      filterPressThroughputTonsPerDay: 50,
      geomembraneIsolation: true,
      hazardousWasteTransferredTons: 0,
      safeDisposalSiteLocation: 'سایت استاندارد بازیافت و تولید کمپوست آلی طارم',
    },
    waterResources: {
      waterConsumedM3: 22000,
      greywaterRecycledM3: 18500,
      recyclingRatePercentage: 84.1,
      zeroLiquidDischargeActive: true,
      qezelOzanDirectDischarge: false,
      effluentCodBODCompliant: true,
      waterAuditReportAttached: true,
    },
    airAndDust: {
      bagFilterEfficiency: 95,
      dustSuppressionSprayingActive: true,
      greenSpaceAreaM2: 85000,
      treesPlantedCount: 3500,
      continuousOnlineMonitoringActive: true,
    },
    csrAndEducation: {
      csrBudgetRials: 6500000000,
      communityProjectsDescription: 'احیای باغات بومی زیتون در حاشیه رودخانه قزل‌اوزن و آموزش کشاورزی پایدار به باغداران',
      targetVillagesHelped: ['گیلوان', 'درام', 'آب‌بر'],
      staffTrainingHours: 54,
      staffTrainedCount: 38,
      schoolOutreachFunded: true,
    },
    incidentsAndRemediation: {
      hadIncident: false,
      incidentType: 'ندارد',
    },
    evidenceFiles: [
      {
        id: 'file-4',
        fileName: 'تاییدیه_تصفیه_پساب_کشاورزی_حوزه_قزل_اوزن.pdf',
        fileType: 'lab_report',
        fileTypeFa: 'گواهی عدم آلودگی قزل‌اوزن',
        fileUrl: '#',
        fileSize: 1650000,
        uploadedAt: '1404/11/20',
        description: 'آنالیز کیفیت آب برگشتی به چرخه آبیاری قطره‌ای',
        verifiedByInspector: true,
      },
    ],
    reviewedBy: {
      fullName: 'مهندس جلال صادقی',
      roleFa: 'کارشناس پایش محیط‌زیست طارم',
      departmentOrAgency: 'اداره حفاظت محیط‌زیست شهرستان طارم',
    },
    reviewerNotes: 'بازچرخانی پساب زیتون‌کشی و جلوگیری از ورود فاضلاب اسیدی به قزل‌اوزن به طور کامل محقق شده است.',
    submittedAt: '1404/11/15',
    reviewedAt: '1404/11/28',
    createdAt: '2026-02-18T10:00:00Z',
  },
];

const INITIAL_VOUCHERS: DiscountIncentive[] = [
  {
    _id: 'vch-1001',
    voucherNumber: 'GRN-ZNJ-1404-0092',
    digitalVerificationHash: '8e4f1c99b25a3d7e8b61c23f',
    companyId: INITIAL_COMPANIES[0],
    auditScoreId: 'score-101',
    period: 'سال ۱۴۰۴ - ۱۴۰۵',
    year: 1404,
    tier: 'platinum',
    certificateTitleFa: 'گواهینامه و بن زرین صنعت سبز برتر (رتبه پلاتین)',
    taxExemptionPercentage: 100,
    taxExemptionArticle: 'ماده ۲۷ قانون مالیات بر ارزش افزوده و تبصره ۲ ماده ۶ قانون هوای پاک',
    waterQuotaDiscountPercentage: 40,
    fastTrackPermitRenewal: true,
    publicLeaderboardFeature: true,
    qrCodeData: 'https://zanjan-doe.ir/verify/GRN-ZNJ-1404-0092',
    qrCodeDataUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://zanjan-doe.ir/verify/GRN-ZNJ-1404-0092',
    issuedBy: 'مدیرکل حفاظت محیط‌زیست استان زنجان و دبیر کارگروه استانی',
    signatoryTitle: 'دکتر محمدرضا یافتیان',
    issueDateJalali: '۱۴۰۴/۱۲/۰۱',
    validUntilJalali: '۱۴۰۵/۱۲/۰۱',
    status: 'active',
    verificationHits: 47,
  },
  {
    _id: 'vch-1002',
    voucherNumber: 'GRN-ZNJ-1404-0055',
    digitalVerificationHash: '3a7d9910c4f8b2e1a556d8e2',
    companyId: INITIAL_COMPANIES[1],
    auditScoreId: 'score-102',
    period: 'سال ۱۴۰۴ - ۱۴۰۵',
    year: 1404,
    tier: 'gold',
    certificateTitleFa: 'گواهینامه و بن سیمین صنعت سبز همیار (رتبه طلا)',
    taxExemptionPercentage: 50,
    taxExemptionArticle: 'ماده ۲۷ قانون مالیات بر ارزش افزوده',
    waterQuotaDiscountPercentage: 20,
    fastTrackPermitRenewal: true,
    publicLeaderboardFeature: true,
    qrCodeData: 'https://zanjan-doe.ir/verify/GRN-ZNJ-1404-0055',
    qrCodeDataUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://zanjan-doe.ir/verify/GRN-ZNJ-1404-0055',
    issuedBy: 'اداره کل حفاظت محیط‌زیست استان زنجان',
    signatoryTitle: 'دکتر محمدرضا یافتیان',
    issueDateJalali: '۱۴۰۴/۱۱/۲۰',
    validUntilJalali: '۱۴۰۵/۱۱/۲۰',
    status: 'active',
    verificationHits: 21,
  },
  {
    _id: 'vch-1003',
    voucherNumber: 'GRN-ZNJ-1404-0077',
    digitalVerificationHash: '9c2e4418a1f7d3b5c689e001',
    companyId: INITIAL_COMPANIES[3],
    auditScoreId: 'score-104',
    period: 'سال ۱۴۰۴ - ۱۴۰۵',
    year: 1404,
    tier: 'gold',
    certificateTitleFa: 'گواهینامه و بن سیمین صنعت سبز همیار (رتبه طلا)',
    taxExemptionPercentage: 50,
    taxExemptionArticle: 'ماده ۲۷ قانون مالیات بر ارزش افزوده و تبصره ۲ ماده ۶ هوای پاک',
    waterQuotaDiscountPercentage: 30,
    fastTrackPermitRenewal: true,
    publicLeaderboardFeature: true,
    qrCodeData: 'https://zanjan-doe.ir/verify/GRN-ZNJ-1404-0077',
    qrCodeDataUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://zanjan-doe.ir/verify/GRN-ZNJ-1404-0077',
    issuedBy: 'اداره کل حفاظت محیط‌زیست استان زنجان',
    signatoryTitle: 'دکتر محمدرضا یافتیان',
    issueDateJalali: '۱۴۰۴/۱۲/۰۵',
    validUntilJalali: '۱۴۰۵/۱۲/۰۵',
    status: 'active',
    verificationHits: 14,
  },
];

const STORAGE_KEYS = {
  COMPANIES: 'zanjan_green_companies_v1',
  LOGS: 'zanjan_green_logs_v1',
  VOUCHERS: 'zanjan_green_vouchers_v1',
  CURRENT_USER_ROLE: 'zanjan_green_role_v1',
  SELECTED_COMPANY_ID: 'zanjan_green_selected_comp_v1',
};

export const storageService = {
  initStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.COMPANIES)) {
      localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(INITIAL_COMPANIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.LOGS)) {
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(INITIAL_LOGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VOUCHERS)) {
      localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(INITIAL_VOUCHERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ROLE)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ROLE, 'company_rep');
    }
    if (!localStorage.getItem(STORAGE_KEYS.SELECTED_COMPANY_ID)) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_COMPANY_ID, INITIAL_COMPANIES[0]._id);
    }
  },

  resetData() {
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(INITIAL_COMPANIES));
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(INITIAL_LOGS));
    localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(INITIAL_VOUCHERS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ROLE, 'company_rep');
    localStorage.setItem(STORAGE_KEYS.SELECTED_COMPANY_ID, INITIAL_COMPANIES[0]._id);
  },

  getCompanies(): Company[] {
    this.initStorage();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPANIES) || '[]');
    } catch {
      return INITIAL_COMPANIES;
    }
  },

  getCompany(id: string): Company | undefined {
    const list = this.getCompanies();
    return list.find((c) => c._id === id);
  },

  saveCompany(company: Partial<Company>): Company {
    const list = this.getCompanies();
    const newCompany: Company = {
      _id: company._id || 'comp-' + Date.now(),
      shenaseMelli: company.shenaseMelli || '',
      name: company.name || 'واحد صنعتی جدید',
      county: company.county || 'zanjan',
      countyFa: COUNTIES.find((c) => c.key === company.county)?.nameFa || 'زنجان',
      industrialPark: company.industrialPark || 'شهرک صنعتی شماره ۱ زنجان',
      sector: company.sector || 'صنایع عمومی',
      licenseNumber: company.licenseNumber || 'ص/' + Math.floor(1000 + Math.random() * 9000),
      environmentalOfficer: company.environmentalOfficer || {
        fullName: 'کارشناس ثبت‌نامی',
        phone: '09120000000',
        nationalCode: '4280000000',
      },
      waterSource: 'انشعاب شهرک صنعتی',
      dischargeType: 'تصفیه مقدماتی',
      establishedYear: 1400,
      currentTier: 'silver',
      currentScore: 45,
      activeViolationsCount: 0,
      address: company.address || 'استان زنجان',
      coordinates: { lat: 36.67, lng: 48.48 },
    };

    const existingIndex = list.findIndex((c) => c._id === newCompany._id || c.shenaseMelli === newCompany.shenaseMelli);
    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...newCompany };
    } else {
      list.push(newCompany);
    }

    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(list));
    localStorage.setItem(STORAGE_KEYS.SELECTED_COMPANY_ID, newCompany._id);
    return newCompany;
  },

  getActivityLogs(companyId?: string): ActivityLog[] {
    this.initStorage();
    try {
      const all: ActivityLog[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.LOGS) || '[]');
      if (companyId) {
        return all.filter((l) => l.companyId._id === companyId);
      }
      return all;
    } catch {
      return INITIAL_LOGS;
    }
  },

  saveActivityLog(logData: Partial<ActivityLog>, company: Company): ActivityLog {
    const list = this.getActivityLogs();
    const newLog: ActivityLog = {
      _id: 'log-' + Date.now(),
      companyId: company,
      period: logData.period || 'بهار ۱۴۰۵',
      year: 1405,
      quarter: 1,
      status: 'under_review',
      statusFa: 'در انتظار بررسی',
      wasteManagement: logData.wasteManagement || {
        tailingsProducedTons: 0,
        tailingsNeutralizedTons: 0,
        filterPressActive: false,
        filterPressThroughputTonsPerDay: 0,
        geomembraneIsolation: false,
        hazardousWasteTransferredTons: 0,
        safeDisposalSiteLocation: '',
      },
      waterResources: logData.waterResources || {
        waterConsumedM3: 0,
        greywaterRecycledM3: 0,
        recyclingRatePercentage: 0,
        zeroLiquidDischargeActive: false,
        qezelOzanDirectDischarge: false,
        effluentCodBODCompliant: true,
        waterAuditReportAttached: false,
      },
      airAndDust: logData.airAndDust || {
        bagFilterEfficiency: 85,
        dustSuppressionSprayingActive: false,
        greenSpaceAreaM2: 0,
        treesPlantedCount: 0,
        continuousOnlineMonitoringActive: false,
      },
      csrAndEducation: logData.csrAndEducation || {
        csrBudgetRials: 0,
        communityProjectsDescription: '',
        targetVillagesHelped: [],
        staffTrainingHours: 0,
        staffTrainedCount: 0,
        schoolOutreachFunded: false,
      },
      incidentsAndRemediation: {
        hadIncident: false,
        incidentType: 'ندارد',
      },
      evidenceFiles: logData.evidenceFiles || [],
      submittedAt: new Intl.DateTimeFormat('fa-IR').format(new Date()),
      createdAt: new Date().toISOString(),
    };

    list.unshift(newLog);
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(list));
    return newLog;
  },

  updateLogStatus(logId: string, status: 'approved' | 'rejected' | 'revision_required', reviewerNotes: string): ActivityLog | null {
    const list = this.getActivityLogs();
    const idx = list.findIndex((l) => l._id === logId);
    if (idx === -1) return null;

    const statusFaMap = {
      approved: 'تایید شده',
      rejected: 'رد شده',
      revision_required: 'نیازمند اصلاح',
      under_review: 'در انتظار بررسی',
      submitted: 'ثبت شده',
      draft: 'پیش‌نویس',
    };

    list[idx].status = status;
    list[idx].statusFa = statusFaMap[status] || status;
    list[idx].reviewerNotes = reviewerNotes;
    list[idx].reviewedAt = new Intl.DateTimeFormat('fa-IR').format(new Date());
    list[idx].reviewedBy = {
      fullName: 'کارشناس پایش محیط‌زیست استان زنجان',
      roleFa: 'کارشناس رسمی اداره کل حفاظت محیط‌زیست',
      departmentOrAgency: 'اداره کل حفاظت محیط‌زیست استان زنجان',
    };

    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(list));
    return list[idx];
  },

  getVouchers(companyId?: string): DiscountIncentive[] {
    this.initStorage();
    try {
      const all: DiscountIncentive[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.VOUCHERS) || '[]');
      if (companyId) {
        return all.filter((v) => v.companyId._id === companyId);
      }
      return all;
    } catch {
      return INITIAL_VOUCHERS;
    }
  },

  issueCertificateAndVoucher(company: Company, score: number, tier: 'platinum' | 'gold'): DiscountIncentive {
    const vouchers = this.getVouchers();
    const serial = Math.floor(1000 + Math.random() * 9000);
    const voucherNumber = `GRN-ZNJ-1405-${serial}`;
    const hash = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    const isPlatinum = tier === 'platinum';

    const newVoucher: DiscountIncentive = {
      _id: 'vch-' + Date.now(),
      voucherNumber,
      digitalVerificationHash: hash,
      companyId: company,
      auditScoreId: 'score-' + Date.now(),
      period: 'سال ۱۴۰۵ - ۱۴۰۶',
      year: 1405,
      tier,
      certificateTitleFa: isPlatinum
        ? 'گواهینامه و بن زرین صنعت سبز برتر (رتبه پلاتین)'
        : 'گواهینامه و بن سیمین صنعت سبز همیار (رتبه طلا)',
      taxExemptionPercentage: isPlatinum ? 100 : 50,
      taxExemptionArticle: 'ماده ۲۷ قانون مالیات بر ارزش افزوده و تبصره ۲ ماده ۶ قانون هوای پاک',
      waterQuotaDiscountPercentage: isPlatinum ? 40 : 25,
      fastTrackPermitRenewal: true,
      publicLeaderboardFeature: true,
      qrCodeData: `https://zanjan-doe.ir/verify/${voucherNumber}`,
      qrCodeDataUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://zanjan-doe.ir/verify/${voucherNumber}`,
      issuedBy: 'مدیرکل حفاظت محیط‌زیست استان زنجان و دبیر کارگروه استانی',
      signatoryTitle: 'دکتر محمدرضا یافتیان',
      issueDateJalali: '۱۴۰۵/۰۱/۱۵',
      validUntilJalali: '۱۴۰۶/۰۱/۱۵',
      status: 'active',
      verificationHits: 1,
    };

    vouchers.unshift(newVoucher);
    localStorage.setItem(STORAGE_KEYS.VOUCHERS, JSON.stringify(vouchers));

    // Update company tier and score
    const companies = this.getCompanies();
    const cIdx = companies.findIndex((c) => c._id === company._id);
    if (cIdx >= 0) {
      companies[cIdx].currentTier = tier;
      companies[cIdx].currentScore = score;
      localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
    }

    return newVoucher;
  },

  getSelectedCompanyId(): string {
    this.initStorage();
    return localStorage.getItem(STORAGE_KEYS.SELECTED_COMPANY_ID) || INITIAL_COMPANIES[0]._id;
  },

  setSelectedCompanyId(id: string) {
    localStorage.setItem(STORAGE_KEYS.SELECTED_COMPANY_ID, id);
  },

  getCurrentRole(): 'company_rep' | 'inspector' {
    this.initStorage();
    return (localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ROLE) as any) || 'company_rep';
  },

  setCurrentRole(role: 'company_rep' | 'inspector') {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ROLE, role);
  },
};
