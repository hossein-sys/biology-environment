import { Hono } from 'hono';
import { FieldObservation, PollutionSeverity, PollutionType } from '../models/FieldObservation';
import { authMiddleware, requireRoles } from '../middleware/authMiddleware';

export const inspectionsRoutes = new Hono();

// GET /api/inspections
inspectionsRoutes.get('/', async (c) => {
  try {
    const { county, severity, status, search } = c.req.query();
    const filter: any = {};

    if (county && county !== 'all') filter.county = county;
    if (severity && severity !== 'all') filter.severity = severity;
    if (status && status !== 'all') filter.status = status;
    if (search) {
      filter.$or = [
        { locationName: { $regex: search, $options: 'i' } },
        { monitorNameOrNGO: { $regex: search, $options: 'i' } },
        { trackingCode: { $regex: search, $options: 'i' } },
      ];
    }

    const observations = await FieldObservation.find(filter)
      .populate('relatedCompanyId', 'name shenaseMelli')
      .sort({ createdAt: -1 });

    return c.json({ success: true, count: observations.length, data: observations });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// GET /api/inspections/:id
inspectionsRoutes.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const obs = await FieldObservation.findById(id).populate('relatedCompanyId');
    if (!obs) {
      return c.json({ success: false, message: 'فرم رصد میدانی یافت نشد.' }, 404);
    }
    return c.json({ success: true, data: obs });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// POST /api/inspections (Register new Appendix 1 Field Observation)
inspectionsRoutes.post(
  '/',
  authMiddleware,
  requireRoles('inspector', 'task_force_admin'),
  async (c) => {
    try {
      const body = await c.req.json();
      const count = await FieldObservation.countDocuments();
      const countyCode = (body.county || 'znj').substring(0, 3).toUpperCase();
      const trackingCode = `OBS-1404-${countyCode}-${String(count + 1).padStart(3, '0')}`;

      const severityFaMap: Record<PollutionSeverity, string> = {
        acute: 'حاد (تهدید آنی سلامت/حیات وحش)',
        moderate: 'متوسط',
        minor: 'جزئی',
      };

      const countyFaMap: Record<string, string> = {
        zanjan: 'زنجان',
        mahneshan: 'ماهنشان',
        abhar: 'ابهر',
        khorramdarreh: 'خرمدره',
        soltaniyeh: 'سلطانیه',
        tarom: 'طارم',
        khodabandeh: 'خدابنده',
        ijrud: 'ایجرود',
      };

      const newObs = new FieldObservation({
        trackingCode,
        inspectionDate: body.inspectionDate || '۱۴۰۴/۰۲/۲۸',
        county: body.county,
        countyFa: countyFaMap[body.county] || body.county,
        locationName: body.locationName,
        monitorNameOrNGO: body.monitorNameOrNGO,
        utmCoordinates: body.utmCoordinates,
        pollutionTypes: body.pollutionTypes || ['lead_zinc_tailings'],
        severity: body.severity || 'moderate',
        severityFa: severityFaMap[body.severity as PollutionSeverity] || 'متوسط',
        observationsDescription: body.observationsDescription,
        recommendedCulturalAction: body.recommendedCulturalAction,
        photoUrls: body.photoUrls || [],
        assignedAgency: body.assignedAgency || 'اداره کل حفاظت محیط زیست استان زنجان',
        status: 'reported',
        statusFa: 'ثبت شده',
        relatedCompanyId: body.relatedCompanyId || undefined,
      });

      await newObs.save();
      return c.json(
        {
          success: true,
          message: 'فرم رصد میدانی پیوست ۱ با موفقیت در سامانه کارگروه استانی ثبت شد.',
          data: newObs,
        },
        201
      );
    } catch (error: any) {
      return c.json({ success: false, message: error.message }, 500);
    }
  }
);

// PUT /api/inspections/:id
inspectionsRoutes.put(
  '/:id',
  authMiddleware,
  requireRoles('inspector', 'task_force_admin'),
  async (c) => {
    try {
      const id = c.req.param('id');
      const body = await c.req.json();

      const statusFaMap: Record<string, string> = {
        reported: 'ثبت شده',
        investigating: 'در حال بررسی',
        action_assigned: 'دستور اقدام صادر شد',
        resolved: 'برطرف شده و مختومه',
      };

      if (body.status && statusFaMap[body.status]) {
        body.statusFa = statusFaMap[body.status];
      }

      const updated = await FieldObservation.findByIdAndUpdate(id, body, { new: true });
      if (!updated) {
        return c.json({ success: false, message: 'موردی یافت نشد.' }, 404);
      }

      return c.json({ success: true, message: 'فرم رصد با موفقیت به‌روزرسانی شد.', data: updated });
    } catch (error: any) {
      return c.json({ success: false, message: error.message }, 500);
    }
  }
);
