import { Hono } from 'hono';
import { Company } from '../models/Company';
import { authMiddleware, requireRoles } from '../middleware/authMiddleware';

export const companiesRoutes = new Hono();

// GET /api/companies (Filterable list)
companiesRoutes.get('/', async (c) => {
  try {
    const { county, sector, tier, search } = c.req.query();
    const filter: any = {};

    if (county && county !== 'all') {
      filter.county = county;
    }
    if (sector && sector !== 'all') {
      filter.sector = sector;
    }
    if (tier && tier !== 'all') {
      filter.currentTier = tier;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shenaseMelli: { $regex: search, $options: 'i' } },
        { industrialPark: { $regex: search, $options: 'i' } },
      ];
    }

    const companies = await Company.find(filter).sort({ currentScore: -1 });
    return c.json({ success: true, count: companies.length, data: companies });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// GET /api/companies/leaderboard/green-industry
companiesRoutes.get('/leaderboard/green-industry', async (c) => {
  try {
    const leaderboard = await Company.find({
      currentTier: { $in: ['platinum', 'gold', 'silver'] },
    })
      .sort({ currentScore: -1 })
      .limit(20);

    return c.json({ success: true, count: leaderboard.length, data: leaderboard });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// GET /api/companies/:id
companiesRoutes.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const company = await Company.findById(id);
    if (!company) {
      return c.json({ success: false, message: 'بنگاه صنعتی یافت نشد.' }, 404);
    }
    return c.json({ success: true, data: company });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// PUT /api/companies/:id
companiesRoutes.put('/:id', authMiddleware, async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const updated = await Company.findByIdAndUpdate(id, body, { new: true });
    if (!updated) {
      return c.json({ success: false, message: 'بنگاه صنعتی یافت نشد.' }, 404);
    }
    return c.json({ success: true, message: 'اطلاعات بنگاه با موفقیت به‌روزرسانی شد.', data: updated });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});
