import { Hono } from 'hono';
import { ActivityLog } from '../models/ActivityLog';
import { Company } from '../models/Company';
import { authMiddleware, requireRoles } from '../middleware/authMiddleware';

export const activityLogsRoutes = new Hono();

// GET /api/activity-logs
activityLogsRoutes.get('/', authMiddleware, async (c) => {
  try {
    const { companyId, status, period } = c.req.query();
    const user = c.get('user');

    const filter: any = {};
    if (user.role === 'company_rep') {
      filter.companyId = user.companyId;
    } else if (companyId) {
      filter.companyId = companyId;
    }

    if (status && status !== 'all') {
      filter.status = status;
    }
    if (period) {
      filter.period = period;
    }

    const logs = await ActivityLog.find(filter)
      .populate('companyId', 'name shenaseMelli county countyFa industrialPark sector')
      .populate('reviewedBy', 'fullName roleFa')
      .sort({ createdAt: -1 });

    return c.json({ success: true, count: logs.length, data: logs });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// GET /api/activity-logs/:id
activityLogsRoutes.get('/:id', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    const log = await ActivityLog.findById(id)
      .populate('companyId')
      .populate('reviewedBy', 'fullName roleFa departmentOrAgency');

    if (!log) {
      return c.json({ success: false, message: 'گزارش عملکرد خوداظهاری یافت نشد.' }, 404);
    }
    return c.json({ success: true, data: log });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// POST /api/activity-logs (Create new log)
activityLogsRoutes.post('/', authMiddleware, async (c) => {
  try {
    const user = c.get('user');
    const body = await c.req.json();

    const companyId = user.companyId || body.companyId;
    if (!companyId) {
      return c.json({ success: false, message: 'شناسه شرکت الزامی است.' }, 400);
    }

    const period = body.period || '۱۴۰۴-Q۲';
    const year = body.year || 1404;
    const quarter = body.quarter || 2;

    const newLog = new ActivityLog({
      companyId,
      period,
      year,
      quarter,
      status: body.status || 'draft',
      statusFa: body.status === 'submitted' ? 'ارسال شده جهت بازرسی' : 'پیش‌نویس',
      wasteManagement: body.wasteManagement || {},
      waterResources: body.waterResources || {},
      airAndDust: body.airAndDust || {},
      csrAndEducation: body.csrAndEducation || {},
      incidentsAndRemediation: body.incidentsAndRemediation || {},
      evidenceFiles: body.evidenceFiles || [],
      submittedAt: body.status === 'submitted' ? new Date() : undefined,
    });

    await newLog.save();
    return c.json({ success: true, message: 'گزارش با موفقیت ثبت شد.', data: newLog }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// PUT /api/activity-logs/:id
activityLogsRoutes.put('/:id', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();

    if (body.status === 'submitted') {
      body.statusFa = 'ارسال شده جهت بازرسی';
      body.submittedAt = new Date();
    }

    const updated = await ActivityLog.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return c.json({ success: false, message: 'گزارش عملکرد یافت نشد.' }, 404);
    }

    return c.json({ success: true, message: 'گزارش به‌روزرسانی شد.', data: updated });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// POST /api/activity-logs/:id/submit
activityLogsRoutes.post('/:id/submit', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    const log = await ActivityLog.findById(id);
    if (!log) {
      return c.json({ success: false, message: 'گزارش عملکرد یافت نشد.' }, 404);
    }

    log.status = 'submitted';
    log.statusFa = 'ارسال شده جهت بازرسی میدانی و تطبیق';
    log.submittedAt = new Date();
    await log.save();

    return c.json({ success: true, message: 'گزارش خوداظهاری با موفقیت به کارتابل بازرسی اداره کل محیط زیست ارسال گردید.', data: log });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// POST /api/activity-logs/:id/review (Inspector / Admin approval or dispute)
activityLogsRoutes.post(
  '/:id/review',
  authMiddleware,
  requireRoles('inspector', 'task_force_admin'),
  async (c) => {
    try {
      const id = c.req.param('id');
      const user = c.get('user');
      const { status, reviewerNotes, inspectorDisputeRemarks } = await c.req.json();

      const log = await ActivityLog.findById(id);
      if (!log) {
        return c.json({ success: false, message: 'گزارش عملکرد یافت نشد.' }, 404);
      }

      const statusFaMap: Record<string, string> = {
        approved: 'تأیید شده نهایی',
        rejected: 'رد شده به علت عدم تطابق آزمایشگاهی',
        revision_required: 'نیازمند اصلاح و تکمیل مستندات',
        under_review: 'در حال بررسی تخصصی',
      };

      log.status = status;
      log.statusFa = statusFaMap[status] || status;
      log.reviewedBy = user.userId as any;
      log.reviewerNotes = reviewerNotes || '';
      log.inspectorDisputeRemarks = inspectorDisputeRemarks || '';
      log.reviewedAt = new Date();

      await log.save();

      return c.json({
        success: true,
        message: 'نتیجه ارزیابی و ممیزی بازرس با موفقیت ثبت شد.',
        data: log,
      });
    } catch (error: any) {
      return c.json({ success: false, message: error.message }, 500);
    }
  }
);
