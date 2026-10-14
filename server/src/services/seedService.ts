import bcrypt from 'bcryptjs';
import QRCode from 'qrcode';
import crypto from 'crypto';
import { Company } from '../models/Company';
import { User } from '../models/User';
import { ActivityLog } from '../models/ActivityLog';
import { FieldObservation } from '../models/FieldObservation';
import { Resolution } from '../models/Resolution';
import { AuditScore } from '../models/AuditScore';
import { DiscountIncentive } from '../models/DiscountIncentive';
import { calculateComplianceScore } from './scoringEngine';

export async function seedDatabase(): Promise<void> {
  try {
    const existingCount = await Company.countDocuments();
    if (existingCount > 0) {
      console.log(`[Seed] Database already contains ${existingCount} companies. Skipping full re-seed.`);
      return;
    }

    console.log('[Seed] Seeding realistic Zanjan Environmental Department data...');

    // 1. Seed Companies across Zanjan counties
    const companiesData = [
      {
        shenaseMelli: '10100452391',
        name: 'شرکت کالسیمین (مجتمع ذوب و روی زنجان)',
        county: 'zanjan' as const,
        countyFa: 'زنجان',
        industrialPark: 'شهرک تخصصی روی زنجان',
        sector: 'lead_zinc' as const,
        licenseNumber: 'ص/۹۸/۱۲۴۵',
        environmentalOfficer: {
          fullName: 'مهندس محمدرضا زنجانی',
          phone: '09121415678',
          nationalCode: '4280123456',
          email: 'env@calcimine.com',
        },
        waterSource: 'treated_effluent' as const,
        dischargeType: 'zero_liquid_discharge' as const,
        establishedYear: 1370,
        currentTier: 'platinum' as const,
        currentScore: 92,
        activeViolationsCount: 0,
        address: 'زنجان، کیلومتر ۵ جاده بیجار، شهرک تخصصی روی',
        coordinates: { lat: 36.6321, lng: 48.4215 },
      },
      {
        shenaseMelli: '10100894562',
        name: 'مجتمع معدنی و صنعتی سرب و روی انگوران',
        county: 'mahneshan' as const,
        countyFa: 'ماهنشان',
        industrialPark: 'منطقه معدنی انگوران - دندی',
        sector: 'mining' as const,
        licenseNumber: 'م/۸۵/۵۶۷۱',
        environmentalOfficer: {
          fullName: 'دکتر صابر افشار',
          phone: '09122419876',
          nationalCode: '4280987654',
          email: 'hse@anguran-mine.ir',
        },
        waterSource: 'deep_well' as const,
        dischargeType: 'evaporation_pond' as const,
        establishedYear: 1335,
        currentTier: 'gold' as const,
        currentScore: 78,
        activeViolationsCount: 0,
        address: 'ماهنشان، دندی، مجتمع عظیم معدنی انگوران',
        coordinates: { lat: 36.6854, lng: 47.4123 },
      },
      {
        shenaseMelli: '10100341258',
        name: 'شرکت فرآوری مواد معدنی ایران',
        county: 'zanjan' as const,
        countyFa: 'زنجان',
        industrialPark: 'شهرک صنعتی نوآوران',
        sector: 'lead_zinc' as const,
        licenseNumber: 'ص/۹۱/۳۳۴۲',
        environmentalOfficer: {
          fullName: 'مهندس علیرضا نوری',
          phone: '09123412233',
          nationalCode: '4281234567',
          email: 'eco@impas.ir',
        },
        waterSource: 'industrial_grid' as const,
        dischargeType: 'industrial_treatment_network' as const,
        establishedYear: 1373,
        currentTier: 'silver' as const,
        currentScore: 64,
        activeViolationsCount: 1,
        address: 'زنجان، شهرک صنعتی نوآوران، فاز شیمیایی',
        coordinates: { lat: 36.6541, lng: 48.3982 },
      },
      {
        shenaseMelli: '10100778899',
        name: 'مجتمع فولاد سهند ایجرود',
        county: 'ijrud' as const,
        countyFa: 'ایجرود',
        industrialPark: 'ناحیه صنعتی ایجرود',
        sector: 'steel_metal' as const,
        licenseNumber: 'ف/۹۵/۰۹۱۲',
        environmentalOfficer: {
          fullName: 'مهندس حسین موسوی',
          phone: '09125413344',
          nationalCode: '4282345678',
          email: 'hse@sahand-steel.ir',
        },
        waterSource: 'golabar_dam' as const,
        dischargeType: 'zero_liquid_discharge' as const,
        establishedYear: 1392,
        currentTier: 'gold' as const,
        currentScore: 75,
        activeViolationsCount: 0,
        address: 'ایجرود، کیلومتر ۳۵ جاده زنجان-بیجار، مجاورت زرین‌آباد',
        coordinates: { lat: 36.3892, lng: 48.2411 },
      },
      {
        shenaseMelli: '10100654321',
        name: 'شرکت روغن نباتی و کشت و صنعت دشت زیتون طارم',
        county: 'tarom' as const,
        countyFa: 'طارم',
        industrialPark: 'ناحیه صنعتی آب‌بر طارم',
        sector: 'agro_industrial' as const,
        licenseNumber: 'ک/۹۴/۴۴۱۱',
        environmentalOfficer: {
          fullName: 'مهندس فاطمه مرادی',
          phone: '09127415566',
          nationalCode: '4283456789',
          email: 'green@tarom-olive.ir',
        },
        waterSource: 'qezel_ozan' as const,
        dischargeType: 'controlled_drainage' as const,
        establishedYear: 1388,
        currentTier: 'gold' as const,
        currentScore: 82,
        activeViolationsCount: 0,
        address: 'طارم، شهر آب‌بر، حاشیه باغات زیتون قزل‌اوزن',
        coordinates: { lat: 36.9644, lng: 48.9612 },
      },
      {
        shenaseMelli: '10100554433',
        name: 'شرکت صنایع شوینده و بهداشتی پرند ابهر',
        county: 'abhar' as const,
        countyFa: 'ابهر',
        industrialPark: 'شهرک صنعتی شریف ابهر',
        sector: 'chemical' as const,
        licenseNumber: 'ص/۹۶/۶۶۷۱',
        environmentalOfficer: {
          fullName: 'مهندس بهزاد صادقی',
          phone: '09128416677',
          nationalCode: '4284567890',
          email: 'env@abhar-parand.ir',
        },
        waterSource: 'industrial_grid' as const,
        dischargeType: 'industrial_treatment_network' as const,
        establishedYear: 1382,
        currentTier: 'silver' as const,
        currentScore: 58,
        activeViolationsCount: 0,
        address: 'ابهر، شهرک صنعتی شریف، خیابان صنعت دوم',
        coordinates: { lat: 36.1422, lng: 49.2155 },
      },
      {
        shenaseMelli: '10100998811',
        name: 'کارخانه سیمان خمسه خدابنده',
        county: 'khodabandeh' as const,
        countyFa: 'خدابنده',
        industrialPark: 'کیلومتر ۱۰ جاده قیدار به ابهر',
        sector: 'mining' as const,
        licenseNumber: 'س/۸۹/۸۸۹۹',
        environmentalOfficer: {
          fullName: 'مهندس داوود کاظمی',
          phone: '09129417788',
          nationalCode: '4285678901',
          email: 'hse@khamseh-cement.com',
        },
        waterSource: 'deep_well' as const,
        dischargeType: 'zero_liquid_discharge' as const,
        establishedYear: 1386,
        currentTier: 'silver' as const,
        currentScore: 61,
        activeViolationsCount: 1,
        address: 'خدابنده، قیدار، کیلومتر ۱۰ جاده ابهر',
        coordinates: { lat: 35.8541, lng: 48.6214 },
      },
      {
        shenaseMelli: '10100123499',
        name: 'صنایع ریسندگی و بافندگی ابریشم سلطانیه',
        county: 'soltaniyeh' as const,
        countyFa: 'سلطانیه',
        industrialPark: 'ناحیه صنعتی سلطانیه',
        sector: 'chemical' as const,
        licenseNumber: 'ن/۹۰/۱۱۸۸',
        environmentalOfficer: {
          fullName: 'مهندس سمیرا خدایی',
          phone: '09121418899',
          nationalCode: '4286789012',
          email: 'eco@soltaniyeh-textile.ir',
        },
        waterSource: 'industrial_grid' as const,
        dischargeType: 'evaporation_pond' as const,
        establishedYear: 1380,
        currentTier: 'red' as const,
        currentScore: 44,
        activeViolationsCount: 2,
        address: 'سلطانیه، جاده ترانزیت، حاشیه چمن طبیعی سلطانیه',
        coordinates: { lat: 36.4321, lng: 48.7954 },
      },
    ];

    const insertedCompanies = await Company.insertMany(companiesData);
    console.log(`[Seed] Inserted ${insertedCompanies.length} companies.`);

    // 2. Seed Users
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);

    const calcimineCompany = insertedCompanies[0];

    const usersData = [
      {
        username: 'calcimine_rep',
        nationalCode: '4280123456',
        fullName: 'مهندس محمدرضا زنجانی',
        phone: '09121415678',
        email: 'company@zanjan.ir',
        passwordHash,
        role: 'company_rep' as const,
        roleFa: 'نماینده صنعت (کالسیمین)',
        companyId: calcimineCompany._id,
        departmentOrAgency: 'شرکت کالسیمین',
        isActive: true,
      },
      {
        username: 'inspector_zanjan',
        nationalCode: '4289998877',
        fullName: 'دکتر هادی حیدری (کارشناس ارشد پایش محیط زیست)',
        phone: '09120001122',
        email: 'inspector@zanjan.ir',
        passwordHash,
        role: 'inspector' as const,
        roleFa: 'کارشناس و بازرس اداره کل حفاظت محیط زیست',
        departmentOrAgency: 'اداره کل حفاظت محیط زیست استان زنجان - اداره نظارت و پایش',
        isActive: true,
      },
      {
        username: 'taskforce_admin',
        nationalCode: '4280001111',
        fullName: 'مهندس مرتضی اسماعیلی (دبیرخانه کارگروه ارتقای فرهنگ محیط‌زیست)',
        phone: '09120003344',
        email: 'taskforce@zanjan.ir',
        passwordHash,
        role: 'task_force_admin' as const,
        roleFa: 'دبیرخانه کارگروه استانی',
        departmentOrAgency: 'دبیرخانه کارگروه استانی ارتقای فرهنگ حفاظت از محیط زیست زنجان',
        isActive: true,
      },
      {
        username: 'tax_auditor',
        nationalCode: '4285554433',
        fullName: 'علیرضا حسینی (کارشناس ارشد امور مالیاتی ماده ۲۷)',
        phone: '09120007788',
        email: 'tax@zanjan.ir',
        passwordHash,
        role: 'public' as const,
        roleFa: 'ناظر و ممیز امور مالیاتی',
        departmentOrAgency: 'اداره کل امور اقتصادی و دارایی استان زنجان',
        isActive: true,
      },
    ];

    const insertedUsers = await User.insertMany(usersData);
    console.log(`[Seed] Inserted ${insertedUsers.length} system users.`);

    // 3. Seed Activity Log for Calcimine
    const activityLogData = new ActivityLog({
      companyId: calcimineCompany._id,
      period: '۱۴۰۴-Q۱',
      year: 1404,
      quarter: 1,
      status: 'approved',
      statusFa: 'تأیید شده نهایی',
      wasteManagement: {
        tailingsProducedTons: 12500,
        tailingsNeutralizedTons: 11800,
        filterPressActive: true,
        filterPressThroughputTonsPerDay: 450,
        geomembraneIsolation: true,
        hazardousWasteTransferredTons: 11800,
        safeDisposalSiteLocation: 'سایت تخصصی و ایزوله سردهات',
      },
      waterResources: {
        waterConsumedM3: 45000,
        greywaterRecycledM3: 38200,
        recyclingRatePercentage: 84.8,
        zeroLiquidDischargeActive: true,
        qezelOzanDirectDischarge: false,
        effluentCodBODCompliant: true,
        waterAuditReportAttached: true,
      },
      airAndDust: {
        bagFilterEfficiency: 99.2,
        dustSuppressionSprayingActive: true,
        greenSpaceAreaM2: 65000,
        treesPlantedCount: 3200,
        continuousOnlineMonitoringActive: true,
      },
      csrAndEducation: {
        csrBudgetRials: 18500000000, // 18.5 Billion Rials = 1.85 Billion Tomans
        communityProjectsDescription:
          'تأمین تجهیزات تصفیه آب شرب روستای سردهات، بهسازی فضای سبز دبستان دهشیر و احداث خانه محیط‌زیست در جوار شهرک تخصصی روی زنجان',
        targetVillagesHelped: ['روستای سردهات', 'روستای دهشیر', 'روستای دیزج‌آباد'],
        staffTrainingHours: 120,
        staffTrainedCount: 420,
        schoolOutreachFunded: true,
      },
      incidentsAndRemediation: {
        hadIncident: false,
        incidentType: 'none',
        incidentDescription: '',
        immediateActionTaken: '',
        remediationSuccessVerified: true,
      },
      evidenceFiles: [
        {
          id: 'DOC-1404-001',
          fileName: 'نتایج_آنالیز_آزمایشگاه_معتمد_فلزات_سنگین_بهار1404.pdf',
          fileType: 'lab_report',
          fileTypeFa: 'گواهی آزمایشگاه معتمد محیط زیست',
          fileUrl: '/uploads/lab_calcimine_q1.pdf',
          fileSize: 2450000,
          uploadedAt: new Date(),
          description: 'آنالیز غلظت کادمیوم، سرب و روی در پساب و خاک خروجی شهرک تخصصی روی',
          utmCoordinates: '39N 724100E 4061800N',
          verifiedByInspector: true,
        },
        {
          id: 'DOC-1404-002',
          fileName: 'فاکتور_و_بارنامه_حمل_باطله_به_سردهات.pdf',
          fileType: 'waste_manifest',
          fileTypeFa: 'مانیفست انتقال باطله به سایت سردهات',
          fileUrl: '/uploads/manifest_sardhat.pdf',
          fileSize: 1800000,
          uploadedAt: new Date(),
          description: 'تأییدیه باسکول و مجوز زیست‌محیطی تخلیه باطله فیلترپرس شده',
          utmCoordinates: '39N 712000E 4055000N',
          verifiedByInspector: true,
        },
        {
          id: 'DOC-1404-003',
          fileName: 'تصاویر_تثبیت_گردوغبار_و_کمربند_سبز_کالسیمین.jpg',
          fileType: 'utm_photo',
          fileTypeFa: 'مستندات تصویری ژئوتگ‌دار فضای سبز',
          fileUrl: '/uploads/greenbelt_utm.jpg',
          fileSize: 3100000,
          uploadedAt: new Date(),
          description: 'درختکاری و پوشش گیاهی باطله‌های تثبیت شده',
          utmCoordinates: '39N 724350E 4062100N',
          verifiedByInspector: true,
        },
      ],
      reviewedBy: insertedUsers[1]._id, // inspector
      reviewerNotes:
        'واحد مورد بازرسی میدانی قرار گرفت. سیستم فیلترپرس با راندمان مطلوب فعال است و هیچ‌گونه پسابی به منابع پذیرنده زیرزمینی یا سطحی تخلیه نمی‌شود. اقدامات مسئولیت اجتماعی در سردهات مورد تأیید دهیاری است.',
      submittedAt: new Date(Date.now() - 15 * 86400000),
      reviewedAt: new Date(Date.now() - 5 * 86400000),
    });

    const savedLog = await activityLogData.save();

    // 4. Calculate Score & create AuditScore
    const scoringInput = {
      activeViolationsCount: 0,
      continuousMonitoringActive: true,
      filterPressActive: true,
      tailingsProducedTons: 12500,
      tailingsNeutralizedTons: 11800,
      geomembraneIsolation: true,
      waterConsumedM3: 45000,
      greywaterRecycledM3: 38200,
      recyclingRatePercentage: 84.8,
      zeroLiquidDischargeActive: true,
      qezelOzanDirectDischarge: false,
      bagFilterEfficiency: 99.2,
      csrBudgetRials: 18500000000,
      targetVillagesCount: 3,
      staffTrainedPercentage: 70,
      staffTrainingHours: 120,
      labTestReportAttached: true,
      waterAuditAttached: true,
      timelySubmission: true,
      hadIncident: false,
    };

    const scoreResult = calculateComplianceScore(scoringInput);

    const auditScore = new AuditScore({
      companyId: calcimineCompany._id,
      activityLogId: savedLog._id,
      period: '۱۴۰۴-Q۱',
      evaluationDate: new Date(),
      baseComplianceScore: scoreResult.baseComplianceScore,
      pollutantReductionScore: scoreResult.pollutantReductionScore,
      csrAndEducationScore: scoreResult.csrAndEducationScore,
      proactiveAuditScore: scoreResult.proactiveAuditScore,
      totalScore: scoreResult.totalScore,
      tier: scoreResult.tier,
      tierTitleFa: scoreResult.tierTitleFa,
      breakdownDetails: scoreResult.breakdown,
      evaluatorNotes:
        'واحد حائز بالاترین استانداردهای کاهش آلایندگی سرب و روی و بهره‌وری مصرف آب در سطح استان زنجان تشخیص داده شد.',
      evaluatedBy: insertedUsers[1]._id,
      incentiveIssued: true,
    });

    const savedScore = await auditScore.save();
    savedLog.scoreId = savedScore._id as any;
    await savedLog.save();

    // 5. Generate Verifiable Discount Voucher and Digital Certificate
    const voucherNumber = 'ZNJ-ENV-1405-A892';
    const verificationPayload = JSON.stringify({
      voucherNumber,
      company: calcimineCompany.name,
      shenaseMelli: calcimineCompany.shenaseMelli,
      tier: 'PLATINUM',
      score: scoreResult.totalScore,
      taxExemption: '100% ماده ۲۷ قانون مالیات بر ارزش افزوده',
      waterQuotaBonus: '۲۵٪ تخفیف تعرفه',
      validUntil: '۱۴۰۵/۱۲/۲۹',
      issuer: 'اداره کل حفاظت محیط زیست استان زنجان',
      hash: crypto
        .createHash('sha256')
        .update(`${voucherNumber}-${calcimineCompany.shenaseMelli}-ZANJAN-GREEN-1405`)
        .digest('hex'),
    });

    const digitalVerificationHash = crypto
      .createHash('sha256')
      .update(verificationPayload)
      .digest('hex');

    const qrCodeDataUrl = await QRCode.toDataURL(
      `http://localhost:3000/verify/${voucherNumber}?hash=${digitalVerificationHash.substring(0, 16)}`,
      {
        errorCorrectionLevel: 'H',
        margin: 2,
        color: {
          dark: '#064e3b',
          light: '#ffffff',
        },
      }
    );

    const incentive = new DiscountIncentive({
      voucherNumber,
      digitalVerificationHash,
      companyId: calcimineCompany._id,
      auditScoreId: savedScore._id,
      period: '۱۴۰۴-Q۱',
      year: 1404,
      tier: 'platinum',
      certificateTitleFa: 'گواهینامه رتبه پلاتین - صنعت سبز برتر استان زنجان',
      taxExemptionPercentage: 100,
      taxExemptionArticle: 'ماده ۲۷ قانون مالیات بر ارزش افزوده (معافیت کامل عوارض آلایندگی)',
      waterQuotaDiscountPercentage: 25,
      fastTrackPermitRenewal: true,
      publicLeaderboardFeature: true,
      qrCodeData: verificationPayload,
      qrCodeDataUrl,
      issuedBy: 'کارگروه استانی ارتقای فرهنگ حفاظت از محیط زیست استان زنجان',
      signatoryTitle: 'مدیرکل حفاظت محیط زیست استان زنجان و دبیر کارگروه استانی',
      issueDateJalali: '۱۴۰۴/۰۲/۱۵',
      validUntilJalali: '۱۴۰۵/۰۲/۱۵',
      status: 'active',
    });

    const savedIncentive = await incentive.save();
    savedScore.incentiveId = savedIncentive._id as any;
    await savedScore.save();

    // 6. Seed Field Observations (پیوست ۱ سند)
    const fieldObservationsData = [
      {
        trackingCode: 'OBS-1404-ZNJ-01',
        inspectionDate: '۱۴۰۴/۰۱/۲۵',
        county: 'zanjan' as const,
        countyFa: 'زنجان',
        locationName: 'حاشیه جنوبی شهرک تخصصی روی، مجاورت جاده روستای سردهات',
        monitorNameOrNGO: 'دیدهبانان محیط‌زیست زنجان (سمن) / مهندس حیدری',
        utmCoordinates: '39N 724150E 4061950N',
        pollutionTypes: ['lead_zinc_tailings' as const, 'industrial_waste' as const],
        severity: 'moderate' as const,
        severityFa: 'متوسط',
        observationsDescription:
          'پایش میدانی از محل فیلتراسیون باطله‌ها انجام شد؛ پوشش ژئوممبران بخش قدیمی نیازمند ترمیم است اما نشت اسید به زهکش بیرونی مشاهده نشد. خاک سطحی غبارگیری شده است.',
        recommendedCulturalAction:
          'برگزاری کارگاه آموزشی فلزات سنگین و سلامت با همکاری دانشگاه علوم پزشکی برای اهالی روستای سردهات و دهشیر (منطبق بر اقدام A-1-4 سند استانی).',
        photoUrls: ['/uploads/obs_sardhat.jpg'],
        inspectorNotes: 'اخطاریه ایمن‌سازی ترانشه شماره ۴ به پیمانکار شهرک ابلاغ شد.',
        status: 'investigating' as const,
        statusFa: 'در حال بررسی',
        relatedCompanyId: calcimineCompany._id,
      },
      {
        trackingCode: 'OBS-1404-MHN-02',
        inspectionDate: '۱۴۰۴/۰۲/۱۰',
        county: 'mahneshan' as const,
        countyFa: 'ماهنشان',
        locationName: 'بستر و حاشیه رودخانه قزل‌اوزن، مقطع روستای سریک به پری',
        monitorNameOrNGO: 'کارشناس پایش محیط زیست ماهنشان و سمن قزل‌اوزن پایدار',
        utmCoordinates: '39N 685200E 4078900N',
        pollutionTypes: ['illegal_water_pumping' as const, 'riverbank_dumping' as const],
        severity: 'acute' as const,
        severityFa: 'حاد (تهدید آنی حیات وحش و آبزیان)',
        observationsDescription:
          'افت شدید جریان آب به دلیل برداشت غیرمجاز با موتورپمپ‌های پرقدرت در بالادست ماهنشان مشاهده شد که منجر به حبس هزاران قطعه ماهی در گودال‌های کم‌عمق شده است.',
        recommendedCulturalAction:
          'راه‌اندازی کارزار مردمی نجات ماهیان قزل‌اوزن در فصول کم‌آبی و آموزش بهره‌برداران با همکاری آب منطقه‌ای و جهاد کشاورزی (منطبق بر اقدام B-2-6 و ویژه شهرستان ماهنشان).',
        photoUrls: ['/uploads/qezel_drying.jpg'],
        inspectorNotes: 'مراتب به دادستانی شهرستان ماهنشان جهت توقیف موتورپمپ‌های غیرمجاز منعکس شد.',
        status: 'action_assigned' as const,
        statusFa: 'دستور اقدام صادر شد',
      },
      {
        trackingCode: 'OBS-1404-SLT-03',
        inspectionDate: '۱۴۰۴/۰۲/۱۸',
        county: 'soltaniyeh' as const,
        countyFa: 'سلطانیه',
        locationName: 'چمن طبیعی و تاریخی سلطانیه، حریم شرقی گنبد جهانی',
        monitorNameOrNGO: 'تشکل صیانت از چمن سلطانیه و میراث فرهنگی',
        utmCoordinates: '39N 748900E 4038100N',
        pollutionTypes: ['unauthorized_grazing_plowing' as const, 'illegal_water_pumping' as const],
        severity: 'acute' as const,
        severityFa: 'حاد (خطر فرونشست و گردوغبار محلی)',
        observationsDescription:
          'خشکیدگی لایه‌های پیت‌مانند چمنزار به دلیل حفر چاه‌های عمیق و زهکشی‌های نامناسب کشاورزی سنتی در اطراف؛ بستر گیاهی مستعد فعال‌شدن ریزگرد است.',
        recommendedCulturalAction:
          'اجرای فوری پویش عمومی صیانت از چمن تاریخی سلطانیه ویژه کشاورزان حوزه آبریز و نصب المان‌های آگاهی‌بخشی فرونشست زمین (منطبق بر جدول ۹ اقدام B-2-5).',
        photoUrls: ['/uploads/soltaniyeh_turf.jpg'],
        inspectorNotes: 'برگزاری جلسه فوری کارگروه شهرستانی به ریاست فرماندار سلطانیه تصویب گردید.',
        status: 'investigating' as const,
        statusFa: 'در حال بررسی',
      },
      {
        trackingCode: 'OBS-1404-ABH-04',
        inspectionDate: '۱۴۰۴/۰۲/۲۴',
        county: 'abhar' as const,
        countyFa: 'ابهر',
        locationName: 'شهرک صنعتی شریف ابهر، مجاورت بستر ابهررود',
        monitorNameOrNGO: 'کارشناس اداره محیط زیست ابهر',
        utmCoordinates: '39N 768200E 4022400N',
        pollutionTypes: ['industrial_waste' as const],
        severity: 'moderate' as const,
        severityFa: 'متوسط',
        observationsDescription:
          'کدورت پساب تصفیه‌خانه در فاز خروجی بالاست. عدم بازچرخانی بهینه در برخی واحدهای شیمیایی باعث وارد آمدن بار اضافی به شبکه تصفیه شده است.',
        recommendedCulturalAction:
          'کارگاه بازچرخانی آب در واحدهای صنعتی با همکاری دانشگاه آزاد ابهر و تشکیل کمیته پایش مردمی پساب صنایع شریف و هیدج (اقدام ویژه شهرستان ابهر).',
        photoUrls: ['/uploads/abhar_effluent.jpg'],
        inspectorNotes: 'مهلت یک‌ماهه جهت تنظیم دوز کلرزنی و فلوکولانت ابلاغ شد.',
        status: 'reported' as const,
        statusFa: 'ثبت شده',
      },
    ];

    await FieldObservation.insertMany(fieldObservationsData);
    console.log(`[Seed] Inserted ${fieldObservationsData.length} field observations.`);

    // 7. Seed Resolutions (پیوست ۲ سند و ماتریس RACI)
    const resolutionsData = [
      {
        code: '۱۴۰۵-۰۱',
        title: 'تدوین پروتکل بهداشت فردی و محیطی ساکنان پیرامون شهرک تخصصی روی زنجان',
        responsibleAgency: 'دانشگاه علوم پزشکی زنجان',
        raciRole: 'R' as const,
        raciRoleFa: 'مسئول مستقیم اجرا (R)',
        legalDeadline: '۳ ماه',
        completionMetric: 'ابلاغ و آموزش به ۱۰۰٪ خانوارهای ساکن سردهات و دهشیر',
        status: 'in_progress' as const,
        statusFa: 'در حال اجرا',
        progressPercent: 65,
        notes: 'محتوای آموزشی به زبان ترکی آذری و فارسی تدوین شده و مرحله غربالگری آغاز گردیده است.',
        pillarCategory: 'heavy_metals' as const,
        pillarCategoryFa: 'فلزات سنگین و باطله‌های روی',
      },
      {
        code: '۱۴۰۵-۰۲',
        title: 'مسدودسازی چاه‌های غیرمجاز و انسداد مجاری زهکشی مخل در حریم چمن سلطانیه',
        responsibleAgency: 'شرکت آب منطقه‌ای زنجان / دادگستری استان',
        raciRole: 'R' as const,
        raciRoleFa: 'مسئول مستقیم اجرا (R)',
        legalDeadline: '۶ ماه',
        completionMetric: 'انسداد دست‌کم ۳۰ حلقه چاه عمیق غیرمجاز در حوزه آبریز چمن',
        status: 'in_progress' as const,
        statusFa: 'در حال اجرا',
        progressPercent: 40,
        notes: 'با دستور دادستان عمومی و انقلاب سلطانیه، ۱۸ حلقه چاه غیرمجاز پر و مسلوب‌المنفعه شد.',
        pillarCategory: 'water_basin' as const,
        pillarCategoryFa: 'آب و چمن سلطانیه',
      },
      {
        code: '۱۴۰۵-۰۳',
        title: 'تولید و پخش بسته مستند روایی فاجعه زیستی قزل‌اوزن و کاهش سموم باغی طارم',
        responsibleAgency: 'صداوسیمای مرکز زنجان (شبکه اشراق)',
        raciRole: 'R' as const,
        raciRoleFa: 'مسئول مستقیم اجرا (R)',
        legalDeadline: '۴ ماه',
        completionMetric: 'پخش ۵۰۰ دقیقه برنامه تخصصی و مستند روایی',
        status: 'completed' as const,
        statusFa: 'اجرا شد',
        progressPercent: 100,
        notes: 'مجموعه مستند «قزل‌اوزن؛ نبض لرزان زنجان» در ۶ قسمت با حضور اساتید IASBS پخش گردید.',
        pillarCategory: 'media_culture' as const,
        pillarCategoryFa: 'رسانه و فضای مجازی',
      },
      {
        code: '۱۴۰۵-۰۴',
        title: 'طرح معدنکاری سبز، همزیستی با حیات وحش انگوران و تثبیت بیولوژیک باطله‌ها',
        responsibleAgency: 'سازمان صمت / مجتمع سرب و روی انگوران / محیط زیست',
        raciRole: 'R' as const,
        raciRoleFa: 'مسئول مستقیم اجرا (R)',
        legalDeadline: '۱۲ ماه',
        completionMetric: 'احیا و نهال‌کاری ۱۰۰ هکتار از باطله‌های معدنی و آموزش سالانه پرسنل',
        status: 'in_progress' as const,
        statusFa: 'در حال اجرا',
        progressPercent: 55,
        notes: 'گونه‌های بومی بادام کوهی و ارس در ۳۵ هکتار کشت شده و کریدور امن قوچ و میش حفظ گردیده است.',
        pillarCategory: 'waste_tailings' as const,
        pillarCategoryFa: 'معدن و باطله‌های انگوران',
      },
      {
        code: '۱۴۰۵-۰۵',
        title: 'استقرار برنامه منسجم آموزش محیط‌زیست و افتتاح طرح مدرسه دوستدار محیط‌زیست',
        responsibleAgency: 'اداره کل آموزش و پرورش استان زنجان',
        raciRole: 'R' as const,
        raciRoleFa: 'مسئول مستقیم اجرا (R)',
        legalDeadline: '۹ ماه',
        completionMetric: 'پوشش ۸۰ درصدی مدارس ابتدایی و تربیت ۲۰۰ سفیر محیط‌زیست',
        status: 'in_progress' as const,
        statusFa: 'در حال اجرا',
        progressPercent: 70,
        notes: 'کتابچه کار بومی مسائل زنجان (پسماند سرب و روی، آب و حیات وحش) برای ۱۲۰ مدرسه توزیع گردید.',
        pillarCategory: 'education_schools' as const,
        pillarCategoryFa: 'آموزش و مدارس',
      },
    ];

    await Resolution.insertMany(resolutionsData);
    console.log(`[Seed] Inserted ${resolutionsData.length} provincial resolutions.`);

    console.log('[Seed] Seeding completed successfully!');
  } catch (error) {
    console.error('[Seed] Error seeding data:', error);
  }
}
