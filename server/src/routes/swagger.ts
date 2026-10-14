import { Hono } from 'hono';

export const swaggerRoutes = new Hono();

const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Green Industry & Environmental Portal API - سامانه صنعت سبز و فرهنگ محیط‌زیست زنجان',
    version: '1.0.0',
    description:
      'مستندات کامل رابط‌های برنامه‌نویسی سامانه صنعت سبز و فرهنگ حفاظت از محیط‌زیست استان زنجان (برنامه عمل مصوب شورای فرهنگ عمومی)',
    contact: {
      name: 'اداره کل حفاظت محیط زیست استان زنجان - کارگروه ارتقای فرهنگ محیط‌زیست',
      url: 'https://zanjan.doe.ir',
    },
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'سرور محلی API (Hono Backend)',
    },
  ],
  tags: [
    { name: 'Authentication', description: 'احراز هویت و ثبت‌نام بنگاه‌های صنعتی' },
    { name: 'Companies', description: 'مدیریت و رتبه‌بندی صنایع استان زنجان' },
    { name: 'ActivityLogs', description: 'گزارش‌های خوداظهاری ۵ محوری صنعت' },
    { name: 'Inspections', description: 'فرم رصد میدانی پسماند و آلودگی (پیوست ۱)' },
    { name: 'Resolutions', description: 'ردیابی مصوبات کارگروه استانی و مدل RACI (پیوست ۲)' },
    { name: 'Scoring', description: 'موتور قطعی امتیازدهی صنعت سبز و ممیزی' },
    { name: 'Vouchers', description: 'صدور و اعتبارسنجی کیوآرکد گواهینامه و بن تخفیف ماده ۲۷' },
    { name: 'Analytics', description: 'شاخص‌های کلیدی عملکرد (KPI بخش ۱۱ سند)' },
  ],
  paths: {
    '/api/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'ورود به سامانه با نام کاربری/شناسه ملی',
      },
    },
    '/api/auth/register-company': {
      post: {
        tags: ['Authentication'],
        summary: 'ثبت‌نام خودکار بنگاه صنعتی با اطلاعات مدیر محیط‌زیست',
      },
    },
    '/api/companies': {
      get: {
        tags: ['Companies'],
        summary: 'فهرست صنایع استان با فیلتر شهرستان و بخش صنعتی',
      },
    },
    '/api/companies/leaderboard/green-industry': {
      get: {
        tags: ['Companies'],
        summary: 'تالار افتخارات و رتبه‌بندی واحدهای صنعت سبز استان',
      },
    },
    '/api/activity-logs': {
      get: {
        tags: ['ActivityLogs'],
        summary: 'لیست گزارش‌های خوداظهاری ۵ محوری',
      },
      post: {
        tags: ['ActivityLogs'],
        summary: 'ثبت گزارش دوره‌ای باطله، آب، هوا، CSR و حوادث',
      },
    },
    '/api/inspections': {
      get: {
        tags: ['Inspections'],
        summary: 'دریافت رصدهای میدانی پسماندها و کانون‌های آلودگی (پیوست ۱)',
      },
      post: {
        tags: ['Inspections'],
        summary: 'ثبت فرم جدید رصد میدانی با مختصات UTM و شدت آلودگی',
      },
    },
    '/api/resolutions': {
      get: {
        tags: ['Resolutions'],
        summary: 'فهرست مصوبات کارگروه استانی و کارنامه پیشرفت دستگاه‌ها',
      },
    },
    '/api/resolutions/raci-matrix': {
      get: {
        tags: ['Resolutions'],
        summary: 'ماتریس کامل RACI مصوب در جدول ۲ سند استانی',
      },
    },
    '/api/scoring/evaluate/{logId}': {
      post: {
        tags: ['Scoring'],
        summary: 'اجرای موتور قطعی امتیازدهی صنعت سبز و ارتقای رتبه بنگاه',
      },
    },
    '/api/vouchers/verify/{voucherNumber}': {
      get: {
        tags: ['Vouchers'],
        summary: 'اعتبارسنجی برخط QR Code گواهینامه معافیت مالیاتی ماده ۲۷',
      },
    },
    '/api/analytics/provincial-kpis': {
      get: {
        tags: ['Analytics'],
        summary: 'داشبورد مدیریتی شاخص‌های عملکرد بخش یازدهم برنامه عمل',
      },
    },
  },
};

// GET /api/openapi.json
swaggerRoutes.get('/openapi.json', (c) => {
  return c.json(openApiSpec);
});

// GET /api/docs (Interactive Swagger UI via CDN)
swaggerRoutes.get('/docs', (c) => {
  const html = `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8">
  <title>مستندات Swagger API - سامانه صنعت سبز استان زنجان</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui.css" />
  <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Vazirmatn', sans-serif; margin: 0; background-color: #0f172a; color: #f8fafc; }
    .swagger-ui .topbar { display: none; }
    .swagger-ui { font-family: 'Vazirmatn', sans-serif !important; direction: ltr; }
    .swagger-header { background: #064e3b; color: white; padding: 20px; text-align: center; direction: rtl; }
    .swagger-header h1 { margin: 0 0 8px 0; font-size: 24px; }
    .swagger-header p { margin: 0; opacity: 0.9; font-size: 14px; }
  </style>
</head>
<body>
  <div class="swagger-header">
    <h1>سامانه صنعت سبز و فرهنگ حفاظت از محیط‌زیست استان زنجان</h1>
    <p>مستندات تعاملی REST API & Swagger بر پایه سند عمل مصوب کارگروه استانی</p>
  </div>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui-bundle.js"></script>
  <script>
    window.onload = function() {
      SwaggerUIBundle({
        url: "/api/openapi.json",
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIBundle.SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout"
      });
    };
  </script>
</body>
</html>`;
  return c.html(html);
});
