import { Hono } from 'hono';
import { Resolution, ResolutionStatus } from '../models/Resolution';
import { authMiddleware, requireRoles } from '../middleware/authMiddleware';

export const resolutionsRoutes = new Hono();

// GET /api/resolutions
resolutionsRoutes.get('/', async (c) => {
  try {
    const { status, agency, category } = c.req.query();
    const filter: any = {};

    if (status && status !== 'all') filter.status = status;
    if (agency && agency !== 'all') filter.responsibleAgency = { $regex: agency, $options: 'i' };
    if (category && category !== 'all') filter.pillarCategory = category;

    const resolutions = await Resolution.find(filter).sort({ code: 1 });
    return c.json({ success: true, count: resolutions.length, data: resolutions });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// GET /api/resolutions/raci-matrix (Exact data from Table 2 of the Action Plan)
resolutionsRoutes.get('/raci-matrix', async (c) => {
  const matrixData = [
    {
      agency: 'اداره‌کل حفاظت محیط‌زیست استان زنجان',
      schoolEducation: 'A',
      waterBasin: 'A',
      csrLeadZinc: 'A',
      wasteSeparation: 'A',
      soltaniyehTurf: 'A',
      biodiversityAnguran: 'A',
      mediaVirtualSpace: 'A',
    },
    {
      agency: 'آموزش و پرورش استان زنجان',
      schoolEducation: 'R',
      waterBasin: 'C',
      csrLeadZinc: 'I',
      wasteSeparation: 'R',
      soltaniyehTurf: 'C',
      biodiversityAnguran: 'C',
      mediaVirtualSpace: 'I',
    },
    {
      agency: 'دانشگاه‌های استان (زنجان، علوم پایه، آزاد، علوم پزشکی)',
      schoolEducation: 'R',
      waterBasin: 'C',
      csrLeadZinc: 'C',
      wasteSeparation: 'C',
      soltaniyehTurf: 'C',
      biodiversityAnguran: 'C',
      mediaVirtualSpace: 'C',
    },
    {
      agency: 'سازمان صمت و اتاق بازرگانی زنجان',
      schoolEducation: 'I',
      waterBasin: 'C',
      csrLeadZinc: 'R',
      wasteSeparation: 'C',
      soltaniyehTurf: 'I',
      biodiversityAnguran: 'C',
      mediaVirtualSpace: 'I',
    },
    {
      agency: 'صنایع و معادن سرب و روی (انگوران و شهرک روی)',
      schoolEducation: 'I',
      waterBasin: 'I',
      csrLeadZinc: 'R',
      wasteSeparation: 'C',
      soltaniyehTurf: 'I',
      biodiversityAnguran: 'R',
      mediaVirtualSpace: 'I',
    },
    {
      agency: 'شرکت آب منطقه‌ای و آبفا استان',
      schoolEducation: 'C',
      waterBasin: 'R',
      csrLeadZinc: 'C',
      wasteSeparation: 'I',
      soltaniyehTurf: 'R',
      biodiversityAnguran: 'C',
      mediaVirtualSpace: 'C',
    },
    {
      agency: 'سازمان جهاد کشاورزی و منابع طبیعی زنجان',
      schoolEducation: 'C',
      waterBasin: 'R',
      csrLeadZinc: 'I',
      wasteSeparation: 'C',
      soltaniyehTurf: 'R',
      biodiversityAnguran: 'R',
      mediaVirtualSpace: 'I',
    },
    {
      agency: 'شهرداری‌ها و دهیاری‌های استان',
      schoolEducation: 'C',
      waterBasin: 'C',
      csrLeadZinc: 'I',
      wasteSeparation: 'R',
      soltaniyehTurf: 'C',
      biodiversityAnguran: 'I',
      mediaVirtualSpace: 'I',
    },
    {
      agency: 'صداوسیمای مرکز زنجان (شبکه اشراق)',
      schoolEducation: 'C',
      waterBasin: 'R',
      csrLeadZinc: 'C',
      wasteSeparation: 'R',
      soltaniyehTurf: 'C',
      biodiversityAnguran: 'C',
      mediaVirtualSpace: 'R',
    },
    {
      agency: 'اداره‌کل فرهنگ و ارشاد اسلامی استان',
      schoolEducation: 'C',
      waterBasin: 'C',
      csrLeadZinc: 'I',
      wasteSeparation: 'C',
      soltaniyehTurf: 'C',
      biodiversityAnguran: 'I',
      mediaVirtualSpace: 'R',
    },
    {
      agency: 'تشکل‌های مردم‌نهاد محیط‌زیستی (سمن‌ها)',
      schoolEducation: 'C',
      waterBasin: 'R',
      csrLeadZinc: 'C',
      wasteSeparation: 'R',
      soltaniyehTurf: 'R',
      biodiversityAnguran: 'R',
      mediaVirtualSpace: 'C',
    },
    {
      agency: 'حوزه علمیه و سازمان تبلیغات اسلامی',
      schoolEducation: 'C',
      waterBasin: 'R',
      csrLeadZinc: 'I',
      wasteSeparation: 'C',
      soltaniyehTurf: 'C',
      biodiversityAnguran: 'I',
      mediaVirtualSpace: 'C',
    },
  ];

  return c.json({
    success: true,
    description: 'جدول ۲ ماتریس نقش‌ها و مسئولیت‌ها بر اساس مدل RACI برنامه عمل استان زنجان',
    legend: {
      R: 'مسئول مستقیم اجرا (Responsible)',
      A: 'پاسخگوی نهایی دستاورد (Accountable)',
      C: 'مشاور تخصصی (Consulted)',
      I: 'مطلع و بهره‌بردار (Informed)',
    },
    data: matrixData,
  });
});

// POST /api/resolutions
resolutionsRoutes.post(
  '/',
  authMiddleware,
  requireRoles('task_force_admin'),
  async (c) => {
    try {
      const body = await c.req.json();
      const count = await Resolution.countDocuments();
      const code = body.code || `۱۴۰۵-${String(count + 1).padStart(2, '0')}`;

      const statusFaMap: Record<ResolutionStatus, string> = {
        completed: 'اجرا شد',
        in_progress: 'در حال اجرا',
        delayed: 'معوق',
      };

      const newRes = new Resolution({
        code,
        title: body.title,
        responsibleAgency: body.responsibleAgency,
        raciRole: body.raciRole || 'R',
        raciRoleFa:
          body.raciRole === 'R'
            ? 'مسئول مستقیم اجرا (R)'
            : body.raciRole === 'A'
            ? 'پاسخگوی نهایی (A)'
            : body.raciRole === 'C'
            ? 'مشاور تخصصی (C)'
            : 'مطلع و بهره‌بردار (I)',
        legalDeadline: body.legalDeadline,
        completionMetric: body.completionMetric,
        status: body.status || 'in_progress',
        statusFa: statusFaMap[body.status as ResolutionStatus] || 'در حال اجرا',
        progressPercent: body.progressPercent || 0,
        notes: body.notes || '',
        pillarCategory: body.pillarCategory || 'heavy_metals',
        pillarCategoryFa: body.pillarCategoryFa || 'فلزات سنگین و باطله‌ها',
      });

      await newRes.save();
      return c.json(
        { success: true, message: 'مصوبه با موفقیت در کاربرگ پیوست ۲ ثبت شد.', data: newRes },
        201
      );
    } catch (error: any) {
      return c.json({ success: false, message: error.message }, 500);
    }
  }
);

// PUT /api/resolutions/:id
resolutionsRoutes.put(
  '/:id',
  authMiddleware,
  requireRoles('task_force_admin', 'inspector'),
  async (c) => {
    try {
      const id = c.req.param('id');
      const body = await c.req.json();

      const statusFaMap: Record<string, string> = {
        completed: 'اجرا شد',
        in_progress: 'در حال اجرا',
        delayed: 'معوق',
      };

      if (body.status && statusFaMap[body.status]) {
        body.statusFa = statusFaMap[body.status];
      }

      const updated = await Resolution.findByIdAndUpdate(id, body, { new: true });
      if (!updated) {
        return c.json({ success: false, message: 'مصوبه یافت نشد.' }, 404);
      }

      return c.json({ success: true, message: 'وضعیت مصوبه به‌روزرسانی شد.', data: updated });
    } catch (error: any) {
      return c.json({ success: false, message: error.message }, 500);
    }
  }
);
