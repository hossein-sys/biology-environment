import {
  Agency,
  CulturalEvent,
  CommendationCertificate,
  CountyKey,
  EventCategory,
  TargetAudience,
  EffectivenessRating,
} from '../types/governmentalAgency';

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

export const EVENT_CATEGORIES: { key: EventCategory; nameFa: string }[] = [
  { key: 'workshop', nameFa: 'کارگاه آموزشی تخصصی' },
  { key: 'field_campaign', nameFa: 'پویش و رویداد میدانی' },
  { key: 'competition', nameFa: 'مسابقه، جشنواره و نمایشگاه' },
  { key: 'conference', nameFa: 'همایش و نشست نخبگانی' },
];

export const TARGET_AUDIENCES: { key: TargetAudience; nameFa: string }[] = [
  { key: 'students_teachers', nameFa: 'دانش‌آموزان، معلمان و فرهنگیان' },
  { key: 'employees', nameFa: 'کارمندان دولت و خانواده‌ها' },
  { key: 'farmers', nameFa: 'کشاورزان و بهره‌برداران منابع طبیعی' },
  { key: 'industrialists', nameFa: 'صنعتگران، معدن‌کاران و فعالان اقتصادی' },
  { key: 'citizens', nameFa: 'عموم شهروندان و جوامع محلی' },
];

const INITIAL_AGENCIES: Agency[] = [
  {
    _id: 'agency-medu',
    name: 'اداره کل آموزش و پرورش استان زنجان',
    county: 'zanjan',
    countyFa: 'زنجان',
    category: 'آموزشی، پژوهشی و فرهنگی',
    liaisonOfficer: {
      fullName: 'دکتر علیرضا رحمانی',
      phone: '09121418877',
      title: 'رئیس اداره امور فرهنگی و رابط محیط‌زیست',
      email: 'edu_env@zanjanedu.ir',
    },
    totalScore: 94,
    totalHours: 124,
    totalAudience: 1850,
    rank: 1,
    awardBadge: 'دستگاه پیشرو در فرهنگ‌سازی محیط‌زیست',
    description: 'مجری مدارس سبز و دوره‌های جامع معلمان در حوزه صیانت از تنوع زیستی و منابع آب استان',
  },
  {
    _id: 'agency-water',
    name: 'شرکت آب منطقه‌ای استان زنجان',
    county: 'zanjan',
    countyFa: 'زنجان',
    category: 'دستگاه‌های زیربنایی و خدمات آب',
    liaisonOfficer: {
      fullName: 'مهندس مریم کاظمی',
      phone: '09123415522',
      title: 'مدیر روابط عمومی و ترویج سازگاری با کم‌آبی',
      email: 'tarvij@znrw.ir',
    },
    totalScore: 88,
    totalHours: 78,
    totalAudience: 920,
    rank: 2,
    awardBadge: 'اداره سبز نمونه در صیانت از منابع آب',
    description: 'پیشگام آموزش کشاورزان حوضه قزل‌اوزن و دشت‌های زنجان-ابهر در مدیریت منابع آب',
  },
  {
    _id: 'agency-agri',
    name: 'سازمان جهاد کشاورزی استان زنجان',
    county: 'zanjan',
    countyFa: 'زنجان',
    category: 'کشاورزی، باغبانی و منابع طبیعی',
    liaisonOfficer: {
      fullName: 'دکتر حمیدرضا موسوی',
      phone: '09122419900',
      title: 'معاون ترویج و هماهنگی تشکل‌های کشاورزی',
      email: 'tarvij@jzn.ir',
    },
    totalScore: 81,
    totalHours: 64,
    totalAudience: 770,
    rank: 3,
    awardBadge: 'دستگاه برتر در آموزش شهروندی و روستایی',
    description: 'ترویج کشاورزی حفاظتی و کاهش آفت‌کش‌ها در باغات زیتون طارم و زراعت خرم‌دره',
  },
  {
    _id: 'agency-abhar-muni',
    name: 'شهرداری ابهر',
    county: 'abhar',
    countyFa: 'ابهر',
    category: 'مدیریت شهری و خدمات زیست‌محیطی',
    liaisonOfficer: {
      fullName: 'مهندس سعید کریمی',
      phone: '09127413344',
      title: 'مدیر پسماند شهری و روابط عمومی',
      email: 'pasmand@abhar.ir',
    },
    totalScore: 72,
    totalHours: 42,
    totalAudience: 460,
    rank: 4,
    awardBadge: 'پیشرو در ارتقای تفکیک پسماند شهری',
    description: 'اجرای طرح محله‌محور تفکیک پسماند از مبدا و فرهنگ‌سازی در مدارس و اماکن عمومی ابهر',
  },
  {
    _id: 'agency-znu',
    name: 'دانشگاه زنجان',
    county: 'zanjan',
    countyFa: 'زنجان',
    category: 'آموزش عالی و تولید دانش',
    liaisonOfficer: {
      fullName: 'دکتر ناصر فلاحی',
      phone: '09123411188',
      title: 'عضو هیئت علمی و دبیر کمیته سبز دانشگاه',
      email: 'green_campus@znu.ac.ir',
    },
    totalScore: 85,
    totalHours: 86,
    totalAudience: 680,
    rank: 5,
    awardBadge: 'مرکز علمی نمونه در پژوهش‌های محیط‌زیستی',
    description: 'پشتیبان علمی کارگروه ارتقای فرهنگ محیط‌زیست و ارزیابی اثربخشی برنامه‌های آموزشی',
  },
];

const INITIAL_EVENTS: CulturalEvent[] = [
  {
    _id: 'event-101',
    agencyId: 'agency-medu',
    agencyName: 'اداره کل آموزش و پرورش استان زنجان',
    title: 'کارگاه توانمندسازی ۵۰۰ معلم استان در موضوع آب، خاک و تنوع زیستی',
    category: 'workshop',
    categoryFa: 'کارگاه آموزشی تخصصی',
    county: 'zanjan',
    countyFa: 'زنجان',
    location: 'سالن همایش‌های شهید بهشتی اداره کل آموزش و پرورش زنجان',
    eventDate: '۱۴۰۵/۰۱/۱۸',
    durationHours: 16,
    organizerName: 'دکتر علیرضا رحمانی (معاونت پرورشی و فرهنگی)',
    instructorName: 'دکتر علی کاظمی (دانشیار گروه محیط‌زیست دانشگاه زنجان)',
    instructorResume: 'دکترای اکولوژی، پژوهشگر نمونه کشوری در حوزه اکوسیستم‌های قزل‌اوزن با بیش از ۱۵ سال سابقه تدریس تخصصی و تالیف کتب زیست‌محیطی.',
    targetAudience: 'students_teachers',
    targetAudienceFa: 'دانش‌آموزان، معلمان و فرهنگیان',
    attendeeCount: 500,
    effectivenessRating: 'excellent',
    effectivenessFa: 'عالی (بیش از ۹۰٪ اثربخشی)',
    description: 'برگزاری دوره آموزشی ضمن‌خدمت برای آموزگاران مقطع ابتدایی و متوسطه اول با تمرکز بر انتقال جذاب مفاهیم صرفه‌جویی آب، تفکیک زباله و احترام به گونه‌های بومی زنجان به دانش‌آموزان.',
    evidenceFiles: [
      { id: 'ev-1', name: 'لیست_امضای_معلمان_شرکت‌کننده.pdf', size: '2.4 MB', type: 'PDF' },
      { id: 'ev-2', name: 'تصاویر_میدانی_سالن_شهید_بهشتی.jpg', size: '4.8 MB', type: 'JPG' },
      { id: 'ev-3', name: 'گواهی_ضمن_خدمت_صادره.pdf', size: '1.2 MB', type: 'PDF' },
    ],
    status: 'approved',
    statusFa: 'تایید شده',
    awardedPoints: 30,
    reviewerNotes: 'اقدام شاخص با جامعه آماری گسترده و مدرس دارای بالاترین مدارج علمی. بازخورد سنجش یادگیری در کاربرگ سنجش اثربخشی تایید شد.',
    reviewedAt: '۱۴۰۵/۰۱/۲۰',
    createdAt: '2026-04-06T09:00:00Z',
  },
  {
    _id: 'event-102',
    agencyId: 'agency-water',
    agencyName: 'شرکت آب منطقه‌ای استان زنجان',
    title: 'کارگاه ترویجی مصرف بهینه کشاورزان حوزه قزل‌اوزن در شهرستان ماهنشان',
    category: 'workshop',
    categoryFa: 'کارگاه آموزشی تخصصی',
    county: 'mahneshan',
    countyFa: 'ماهنشان',
    location: 'مسجد جامع روستای پری و سالن بخشداری ماهنشان',
    eventDate: '۱۴۰۵/۰۱/۲۲',
    durationHours: 8,
    organizerName: 'مهندس مریم کاظمی و اداره امور آب ماهنشان',
    instructorName: 'مهندس سهراب اسدی (کارشناس ارشد مهندسی آب و کشاورزی)',
    instructorResume: '۱۸ سال سابقه میدانی در مدیریت پایدار آبخوان‌های زنجان و مجری طرح‌های احیای قزل‌اوزن در حوضه آبریز سفیدرود.',
    targetAudience: 'farmers',
    targetAudienceFa: 'کشاورزان و بهره‌برداران منابع طبیعی',
    attendeeCount: 80,
    effectivenessRating: 'excellent',
    effectivenessFa: 'عالی (بیش از ۹۰٪ اثربخشی)',
    description: 'تبیین الزامات جلوگیری از برداشت غیرمجاز از بستر رودخانه قزل‌اوزن، آموزش شیوه‌های آبیاری قطره‌ای و تجارب موفق جایگزینی محصولات کم‌آب‌بر در ماهنشان.',
    evidenceFiles: [
      { id: 'ev-4', name: 'صورتجلسه_نشست_با_شوراهای_روستایی.pdf', size: '1.9 MB', type: 'PDF' },
      { id: 'ev-5', name: 'گزارش_تصویری_کارگاه_کشاورزان.jpg', size: '3.6 MB', type: 'JPG' },
    ],
    status: 'approved',
    statusFa: 'تایید شده',
    awardedPoints: 26,
    reviewerNotes: 'اقدام اثرگذار در کانون بحرانی آب و رودخانه قزل‌اوزن. تعهد کتبی کشاورزان به کاهش برداشت ثبت گردیده است.',
    reviewedAt: '۱۴۰۵/۰۱/۲۴',
    createdAt: '2026-04-10T11:00:00Z',
  },
  {
    _id: 'event-103',
    agencyId: 'agency-abhar-muni',
    agencyName: 'شهرداری ابهر',
    title: 'پویش همگانی تفکیک پسماند شهری و پاکسازی حریم پارک ملت ابهر',
    category: 'field_campaign',
    categoryFa: 'پویش و رویداد میدانی',
    county: 'abhar',
    countyFa: 'ابهر',
    location: 'پارک ملت و ۳ مدرسه همجوار در شهر ابهر',
    eventDate: '۱۴۰۵/۰۱/۲۵',
    durationHours: 6,
    organizerName: 'مهندس سعید کریمی (سازمان مدیریت پسماند شهرداری ابهر)',
    instructorName: 'خانم مهندس پروانه صادقی (کارشناس ارشد بهداشت محیط)',
    instructorResume: 'مدرس دانشگاه پیام‌نور و طراح کمپین‌های تفکیک از مبدا در استان‌های شمال غرب کشور.',
    targetAudience: 'citizens',
    targetAudienceFa: 'عموم شهروندان و جوامع محلی',
    attendeeCount: 200,
    effectivenessRating: 'good',
    effectivenessFa: 'خوب (۷۵٪ تا ۹۰٪ اثربخشی)',
    description: 'توزیع مخازن تفکیک پسماند خشک و تر، کارگاه توجیهی برای بانوان و دانش‌آموزان و مسابقه نقاشی محیط‌زیستی با اهدای جوایز به ۵۰ دانش‌آموز برگزیده.',
    evidenceFiles: [
      { id: 'ev-6', name: 'تصاویر_پویش_پاکسازی_پارک_ملت.jpg', size: '5.1 MB', type: 'JPG' },
      { id: 'ev-7', name: 'بروشور_توزیع‌شده_بین_شهروندان.pdf', size: '950 KB', type: 'PDF' },
    ],
    status: 'pending',
    statusFa: 'در انتظار بررسی',
    awardedPoints: 20,
    reviewerNotes: 'پرونده توسط دبیرخانه کارگروه در حال ارزیابی است. فرم نظرسنجی شهروندی نیازمند ضمیمه است.',
    createdAt: '2026-04-13T14:30:00Z',
  },
  {
    _id: 'event-104',
    agencyId: 'agency-agri',
    agencyName: 'سازمان جهاد کشاورزی استان زنجان',
    title: 'کارگاه جامع کاهش سموم شیمیایی و ارتقای سلامت خاک در باغات طارم',
    category: 'workshop',
    categoryFa: 'کارگاه آموزشی تخصصی',
    county: 'tarom',
    countyFa: 'طارم',
    location: 'مرکز خدمات کشاورزی شهر آب‌بر شهرستان طارم',
    eventDate: '۱۴۰۵/۰۱/۲۷',
    durationHours: 10,
    organizerName: 'دکتر حمیدرضا موسوی (مدیریت حفظ نباتات استان)',
    instructorName: 'دکتر بهزاد رستمی (متخصص حشره‌شناسی و مدیریت بیولوژیک آفات)',
    instructorResume: 'عضو هیئت علمی مرکز تحقیقات کشاورزی استان زنجان با ۱۰ مقاله ISI در زمینه مبارزه بیولوژیک با مگس زیتون بدون سموم شیمیایی.',
    targetAudience: 'farmers',
    targetAudienceFa: 'کشاورزان و بهره‌برداران منابع طبیعی',
    attendeeCount: 120,
    effectivenessRating: 'excellent',
    effectivenessFa: 'عالی (بیش از ۹۰٪ اثربخشی)',
    description: 'آموزش تله‌های فرومونی و محلول‌پاشی استاندارد به باغداران زیتون به منظور به حداقل رساندن نفوذ سموم به آبراه‌های فصلی منتهی به رودخانه قزل‌اوزن.',
    evidenceFiles: [
      { id: 'ev-8', name: 'تاییدیه_کلینیک_گیاه‌پزشکی_طارم.pdf', size: '1.4 MB', type: 'PDF' },
      { id: 'ev-9', name: 'عکس‌های_کارگاه_عملی_باغداری_سبز.jpg', size: '4.2 MB', type: 'JPG' },
    ],
    status: 'approved',
    statusFa: 'تایید شده',
    awardedPoints: 28,
    reviewerNotes: 'مدرس بسیار مسلط با سوابق تایید شده. تطابق کامل با محور صیانت از قزل‌اوزن و سلامت زنجیره غذایی.',
    reviewedAt: '۱۴۰۵/۰۱/۲۸',
    createdAt: '2026-04-15T08:45:00Z',
  },
];

const INITIAL_CERTIFICATES: CommendationCertificate[] = [
  {
    id: 'cert-1',
    agencyId: 'agency-medu',
    agencyName: 'اداره کل آموزش و پرورش استان زنجان',
    serialNumber: 'ZN-ENV-1405-001',
    title: 'لوح سپاس رسمی کارگروه استانی ارتقای فرهنگ محیط‌زیست زنجان',
    rankTitle: 'دستگاه پیشرو و رتبه اول در فرهنگ‌سازی محیط‌زیست استان زنجان',
    year: 'سال ۱۴۰۵',
    score: 94,
    signatoryTitle: 'استاندار زنجان و رئیس شورای فرهنگ عمومی استان',
    issuedDate: '۱۴۰۵/۰۱/۲۵',
    incentivePoints: [
      'اولویت در تخصیص اعتبارات فرهنگی سالانه استان',
      'معرفی ویژه در برنامه زنده شبکه اشراق صدا و سیمای زنجان',
      'کسب حداکثر امتیاز شاخص‌های زیست‌محیطی در ارزیابی جشنواره شهید رجایی',
    ],
  },
  {
    id: 'cert-2',
    agencyId: 'agency-water',
    agencyName: 'شرکت آب منطقه‌ای استان زنجان',
    serialNumber: 'ZN-ENV-1405-002',
    title: 'لوح تقدیر کارگروه ارتقای فرهنگ محیط‌زیست استان زنجان',
    rankTitle: 'اداره سبز نمونه و رتبه دوم در صیانت از منابع آب و آموزش کشاورزان',
    year: 'سال ۱۴۰۵',
    score: 88,
    signatoryTitle: 'دبیر کارگروه استانی و مدیرکل حفاظت محیط‌زیست استان زنجان',
    issuedDate: '۱۴۰۵/۰۱/۲۴',
    incentivePoints: [
      'تقدیر در جلسه شورای فرهنگ عمومی استان زنجان',
      'حمایت از انتشار محصولات چندرسانه‌ای ترویج مصرف آب',
      'درج در کارنامه ارزیابی عملکرد سالانه دستگاه‌های اجرایی',
    ],
  },
];

const STORAGE_KEYS = {
  AGENCIES: 'zanjan_gov_agencies_v2',
  EVENTS: 'zanjan_gov_events_v2',
  CERTIFICATES: 'zanjan_gov_certs_v2',
  ROLE: 'zanjan_gov_role_v2',
  ACTIVE_AGENCY_ID: 'zanjan_gov_active_agency_v2',
};

export const agencyStorageService = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.AGENCIES)) {
      localStorage.setItem(STORAGE_KEYS.AGENCIES, JSON.stringify(INITIAL_AGENCIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CERTIFICATES)) {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(INITIAL_CERTIFICATES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ROLE)) {
      localStorage.setItem(STORAGE_KEYS.ROLE, 'agency_rep');
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVE_AGENCY_ID)) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_AGENCY_ID, INITIAL_AGENCIES[0]._id);
    }
  },

  resetData() {
    localStorage.setItem(STORAGE_KEYS.AGENCIES, JSON.stringify(INITIAL_AGENCIES));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(INITIAL_CERTIFICATES));
    localStorage.setItem(STORAGE_KEYS.ROLE, 'agency_rep');
    localStorage.setItem(STORAGE_KEYS.ACTIVE_AGENCY_ID, INITIAL_AGENCIES[0]._id);
  },

  getAgencies(): Agency[] {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.AGENCIES) || '[]');
    } catch {
      return INITIAL_AGENCIES;
    }
  },

  getAgencyById(id: string): Agency | undefined {
    return this.getAgencies().find((a) => a._id === id);
  },

  saveAgency(data: Partial<Agency>): Agency {
    const list = this.getAgencies();
    const existingIndex = list.findIndex(
      (a) => a._id === data._id || a.name === data.name
    );

    const countyObj = COUNTIES.find((c) => c.key === data.county);
    const newAgency: Agency = {
      _id: data._id || 'agency-' + Date.now(),
      name: data.name || 'دستگاه اجرایی جدید',
      county: data.county || 'zanjan',
      countyFa: countyObj?.nameFa || 'زنجان',
      category: data.category || 'دستگاه‌های اجرایی استان',
      liaisonOfficer: data.liaisonOfficer || {
        fullName: 'کارشناس رسمی رابط',
        phone: '09120000000',
        title: 'رابط فرهنگی - محیط‌زیستی',
      },
      totalScore: data.totalScore || 60,
      totalHours: data.totalHours || 0,
      totalAudience: data.totalAudience || 0,
      rank: data.rank || list.length + 1,
      awardBadge: data.awardBadge,
      description: data.description || 'عضو سامانه ارتقای فرهنگ محیط‌زیست استان زنجان',
    };

    if (existingIndex >= 0) {
      list[existingIndex] = { ...list[existingIndex], ...newAgency };
    } else {
      list.push(newAgency);
    }

    localStorage.setItem(STORAGE_KEYS.AGENCIES, JSON.stringify(list));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_AGENCY_ID, newAgency._id);
    return newAgency;
  },

  getEvents(agencyId?: string): CulturalEvent[] {
    this.init();
    try {
      const all: CulturalEvent[] = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]'
      );
      if (agencyId) {
        return all.filter((e) => e.agencyId === agencyId);
      }
      return all;
    } catch {
      return INITIAL_EVENTS;
    }
  },

  saveEvent(
    data: Partial<CulturalEvent>,
    agency: Agency
  ): CulturalEvent {
    const list = this.getEvents();
    const countyObj = COUNTIES.find((c) => c.key === (data.county || agency.county));
    const catObj = EVENT_CATEGORIES.find((c) => c.key === data.category);
    const audObj = TARGET_AUDIENCES.find((c) => c.key === data.targetAudience);

    const effFaMap: Record<EffectivenessRating, string> = {
      excellent: 'عالی (بیش از ۹۰٪ اثربخشی)',
      good: 'خوب (۷۵٪ تا ۹۰٪ اثربخشی)',
      medium: 'متوسط (۵۰٪ تا ۷۵٪ اثربخشی)',
      weak: 'نیازمند بازنگری',
    };

    const newEvent: CulturalEvent = {
      _id: 'event-' + Date.now(),
      agencyId: agency._id,
      agencyName: agency.name,
      title: data.title || 'کارگاه آموزشی فرهنگی محیط‌زیستی',
      category: data.category || 'workshop',
      categoryFa: catObj?.nameFa || 'کارگاه آموزشی تخصصی',
      county: data.county || agency.county,
      countyFa: countyObj?.nameFa || agency.countyFa,
      location: data.location || 'سالن جلسات اداره کل',
      eventDate: data.eventDate || '۱۴۰۵/۰۲/۰۱',
      durationHours: Number(data.durationHours) || 4,
      organizerName: data.organizerName || agency.liaisonOfficer.fullName,
      instructorName: data.instructorName || 'استاد دانشگاه زنجان',
      instructorResume:
        data.instructorResume || 'عضو هیئت علمی با سوابق مرتبط پژوهشی',
      targetAudience: data.targetAudience || 'employees',
      targetAudienceFa: audObj?.nameFa || 'کارمندان دولت',
      attendeeCount: Number(data.attendeeCount) || 50,
      effectivenessRating: data.effectivenessRating || 'good',
      effectivenessFa: effFaMap[data.effectivenessRating || 'good'],
      description: data.description || 'گزارش ثبت شده توسط رابط محیط‌زیست اداره',
      evidenceFiles: data.evidenceFiles || [
        { id: 'f-def', name: 'تصاویر_میدانی_و_لیست_حاضرین.pdf', size: '2.1 MB', type: 'PDF' },
      ],
      status: 'pending',
      statusFa: 'در انتظار بررسی',
      awardedPoints: 0,
      createdAt: new Date().toISOString(),
    };

    list.unshift(newEvent);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(list));
    return newEvent;
  },

  updateEventStatus(
    eventId: string,
    status: 'approved' | 'revision_required',
    notes: string,
    pointsToAward: number = 25
  ): CulturalEvent | null {
    const list = this.getEvents();
    const idx = list.findIndex((e) => e._id === eventId);
    if (idx === -1) return null;

    const event = list[idx];
    event.status = status;
    event.statusFa = status === 'approved' ? 'تایید شده' : 'نیازمند اصلاح';
    event.reviewerNotes = notes;
    event.reviewedAt = new Intl.DateTimeFormat('fa-IR').format(new Date());

    if (status === 'approved') {
      event.awardedPoints = pointsToAward;

      // Update Agency Score, Hours, Audience
      const agencies = this.getAgencies();
      const aIdx = agencies.findIndex((a) => a._id === event.agencyId);
      if (aIdx >= 0) {
        agencies[aIdx].totalScore = Math.min(100, agencies[aIdx].totalScore + 4);
        agencies[aIdx].totalHours += event.durationHours;
        agencies[aIdx].totalAudience += event.attendeeCount;
        localStorage.setItem(STORAGE_KEYS.AGENCIES, JSON.stringify(agencies));
      }
    }

    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(list));
    return event;
  },

  getCertificates(agencyId?: string): CommendationCertificate[] {
    this.init();
    try {
      const all: CommendationCertificate[] = JSON.parse(
        localStorage.getItem(STORAGE_KEYS.CERTIFICATES) || '[]'
      );
      if (agencyId) {
        return all.filter((c) => c.agencyId === agencyId);
      }
      return all;
    } catch {
      return INITIAL_CERTIFICATES;
    }
  },

  issueCertificate(agency: Agency): CommendationCertificate {
    const list = this.getCertificates();
    const serial = Math.floor(100 + Math.random() * 900);
    const newCert: CommendationCertificate = {
      id: 'cert-' + Date.now(),
      agencyId: agency._id,
      agencyName: agency.name,
      serialNumber: `ZN-ENV-1405-${serial}`,
      title: 'لوح سپاس و افتخار رسمی کارگروه استانی ارتقای فرهنگ محیط‌زیست زنجان',
      rankTitle: agency.awardBadge || 'دستگاه پیشرو و ممتاز در آموزش و فرهنگ‌سازی محیط‌زیست',
      year: 'سال ۱۴۰۵',
      score: agency.totalScore,
      signatoryTitle: 'استاندار زنجان و مدیرکل حفاظت محیط‌زیست استان',
      issuedDate: new Intl.DateTimeFormat('fa-IR').format(new Date()),
      incentivePoints: [
        'اولویت ویژه در تخصیص اعتبارات فرهنگی و عمرانی استان',
        'معرفی دستگاه و اقدامات شاخص در شبکه استانی اشراق',
        'ثبت حداکثر امتیاز در جشنواره شهید رجایی و ارزیابی مدیران',
      ],
    };

    list.unshift(newCert);
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(list));
    return newCert;
  },

  getProvinceStats() {
    const agencies = this.getAgencies();
    const events = this.getEvents();

    const totalHours = events
      .filter((e) => e.status === 'approved')
      .reduce((sum, e) => sum + e.durationHours, 0);

    const totalAudience = events
      .filter((e) => e.status === 'approved')
      .reduce((sum, e) => sum + e.attendeeCount, 0);

    const totalWorkshops = events.length;
    const countiesCount = 8;

    return {
      totalHours: totalHours || 282,
      totalAudience: totalAudience || 3640,
      totalWorkshops: totalWorkshops || 18,
      countiesCount,
      agenciesCount: agencies.length,
    };
  },

  getActiveAgencyId(): string {
    this.init();
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_AGENCY_ID) || INITIAL_AGENCIES[0]._id;
  },

  setActiveAgencyId(id: string) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_AGENCY_ID, id);
  },

  getCurrentRole(): 'agency_rep' | 'provincial_evaluator' {
    this.init();
    return (
      (localStorage.getItem(STORAGE_KEYS.ROLE) as any) || 'agency_rep'
    );
  },

  setCurrentRole(role: 'agency_rep' | 'provincial_evaluator') {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  },
};
