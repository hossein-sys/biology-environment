import { Hono } from 'hono';
import { Company } from '../models/Company';
import { ActivityLog } from '../models/ActivityLog';
import { FieldObservation } from '../models/FieldObservation';
import { Resolution } from '../models/Resolution';
import { DiscountIncentive } from '../models/DiscountIncentive';

export const analyticsRoutes = new Hono();

// GET /api/analytics/provincial-kpis (Section 11 of Action Plan)
analyticsRoutes.get('/provincial-kpis', async (c) => {
  try {
    const totalCompanies = await Company.countDocuments();
    const platinumCompanies = await Company.countDocuments({ currentTier: 'platinum' });
    const goldCompanies = await Company.countDocuments({ currentTier: 'gold' });
    const silverCompanies = await Company.countDocuments({ currentTier: 'silver' });
    const redCompanies = await Company.countDocuments({ currentTier: 'red' });

    // Aggregate environmental metrics from approved logs
    const activityLogs = await ActivityLog.find({});

    let totalCsrRials = 0;
    let totalTailingsTons = 0;
    let totalNeutralizedTons = 0;
    let totalWaterConsumedM3 = 0;
    let totalGreywaterRecycledM3 = 0;
    let totalStaffTrained = 0;
    let totalGreenSpaceM2 = 0;

    activityLogs.forEach((log) => {
      totalCsrRials += log.csrAndEducation?.csrBudgetRials || 0;
      totalTailingsTons += log.wasteManagement?.tailingsProducedTons || 0;
      totalNeutralizedTons += log.wasteManagement?.tailingsNeutralizedTons || 0;
      totalWaterConsumedM3 += log.waterResources?.waterConsumedM3 || 0;
      totalGreywaterRecycledM3 += log.waterResources?.greywaterRecycledM3 || 0;
      totalStaffTrained += log.csrAndEducation?.staffTrainedCount || 0;
      totalGreenSpaceM2 += log.airAndDust?.greenSpaceAreaM2 || 0;
    });

    // Resolutions stats (Pewast 2)
    const totalResolutions = await Resolution.countDocuments();
    const completedResolutions = await Resolution.countDocuments({ status: 'completed' });
    const inProgressResolutions = await Resolution.countDocuments({ status: 'in_progress' });
    const delayedResolutions = await Resolution.countDocuments({ status: 'delayed' });

    // Inspections stats (Pewast 1)
    const totalObservations = await FieldObservation.countDocuments();
    const acuteObservations = await FieldObservation.countDocuments({ severity: 'acute' });
    const moderateObservations = await FieldObservation.countDocuments({ severity: 'moderate' });
    const resolvedObservations = await FieldObservation.countDocuments({ status: 'resolved' });

    // Active vouchers
    const activeVouchersCount = await DiscountIncentive.countDocuments({ status: 'active' });

    // County breakdown (8 Counties of Zanjan)
    const counties = [
      { key: 'zanjan', nameFa: 'زنجان', hub: 'شهرک تخصصی روی و قطب صنعتی' },
      { key: 'mahneshan', nameFa: 'ماهنشان', hub: 'معدن انگوران و شریان قزل‌اوزن' },
      { key: 'abhar', nameFa: 'ابهر', hub: 'شهرک صنعتی شریف و دشت ابهررود' },
      { key: 'khorramdarreh', nameFa: 'خرمدره', hub: 'صنایع دارویی و غذایی' },
      { key: 'soltaniyeh', nameFa: 'سلطانیه', hub: 'چمن تاریخی و گنبد جهانی' },
      { key: 'tarom', nameFa: 'طارم', hub: 'هندوستان ایران و باغات زیتون قزل‌اوزن' },
      { key: 'khodabandeh', nameFa: 'خدابنده', hub: 'دشت قیدار و غار کتله‌خور' },
      { key: 'ijrud', nameFa: 'ایجرود', hub: 'صنایع فولاد و حوضه سد گلابر' },
    ];

    const countyMetrics = await Promise.all(
      counties.map(async (c) => {
        const compCount = await Company.countDocuments({ county: c.key });
        const obsCount = await FieldObservation.countDocuments({ county: c.key });
        const platGoldCount = await Company.countDocuments({
          county: c.key,
          currentTier: { $in: ['platinum', 'gold'] },
        });

        return {
          key: c.key,
          nameFa: c.nameFa,
          hub: c.hub,
          companiesCount: compCount,
          observationsCount: obsCount,
          greenUnitsCount: platGoldCount,
        };
      })
    );

    return c.json({
      success: true,
      timestamp: new Date(),
      data: {
        summary: {
          totalCompanies,
          activeVouchersCount,
          totalObservations,
          acuteObservations,
          resolvedObservations,
          resolutionsImplementationRate: totalResolutions
            ? Math.round((completedResolutions / totalResolutions) * 100)
            : 0,
        },
        impactMetrics: {
          totalCsrRials,
          totalCsrTomans: Math.round(totalCsrRials / 10),
          totalTailingsTons,
          totalNeutralizedTons,
          neutralizationRate: totalTailingsTons
            ? Math.round((totalNeutralizedTons / totalTailingsTons) * 100)
            : 0,
          totalWaterConsumedM3,
          totalGreywaterRecycledM3,
          overallRecyclingRate: totalWaterConsumedM3
            ? Math.round((totalGreywaterRecycledM3 / totalWaterConsumedM3) * 100)
            : 0,
          totalStaffTrained,
          totalGreenSpaceM2,
        },
        tierDistribution: {
          platinum: platinumCompanies,
          gold: goldCompanies,
          silver: silverCompanies,
          red: redCompanies,
        },
        resolutionsBreakdown: {
          total: totalResolutions,
          completed: completedResolutions,
          inProgress: inProgressResolutions,
          delayed: delayedResolutions,
        },
        countyDistribution: countyMetrics,
      },
    });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});
