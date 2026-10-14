import { Hono } from 'hono';
import crypto from 'crypto';
import QRCode from 'qrcode';
import { ActivityLog } from '../models/ActivityLog';
import { Company } from '../models/Company';
import { AuditScore } from '../models/AuditScore';
import { DiscountIncentive } from '../models/DiscountIncentive';
import { calculateComplianceScore } from '../services/scoringEngine';
import { authMiddleware, requireRoles } from '../middleware/authMiddleware';

export const scoringRoutes = new Hono();

// POST /api/scoring/evaluate/:logId
scoringRoutes.post(
  '/evaluate/:logId',
  authMiddleware,
  requireRoles('inspector', 'task_force_admin'),
  async (c) => {
    try {
      const logId = c.req.param('logId');
      const user = c.get('user');
      const body = await c.req.json().catch(() => ({}));

      const log = await ActivityLog.findById(logId).populate('companyId');
      if (!log) {
        return c.json({ success: false, message: 'گزارش عملکرد خوداظهاری یافت نشد.' }, 404);
      }

      const company = await Company.findById(log.companyId);
      if (!company) {
        return c.json({ success: false, message: 'شرکت مربوطه یافت نشد.' }, 404);
      }

      const totalTrained = log.csrAndEducation.staffTrainedCount || 0;
      const staffPercentage = Math.min(100, Math.round((totalTrained / 500) * 100)); // normalized against typical plant workforce

      const scoringInput = {
        activeViolationsCount: company.activeViolationsCount || 0,
        continuousMonitoringActive: log.airAndDust.continuousOnlineMonitoringActive || false,
        filterPressActive: log.wasteManagement.filterPressActive || false,
        tailingsProducedTons: log.wasteManagement.tailingsProducedTons || 0,
        tailingsNeutralizedTons: log.wasteManagement.tailingsNeutralizedTons || 0,
        geomembraneIsolation: log.wasteManagement.geomembraneIsolation || false,
        waterConsumedM3: log.waterResources.waterConsumedM3 || 0,
        greywaterRecycledM3: log.waterResources.greywaterRecycledM3 || 0,
        recyclingRatePercentage: log.waterResources.recyclingRatePercentage || 0,
        zeroLiquidDischargeActive: log.waterResources.zeroLiquidDischargeActive || false,
        qezelOzanDirectDischarge: log.waterResources.qezelOzanDirectDischarge || false,
        bagFilterEfficiency: log.airAndDust.bagFilterEfficiency || 0,
        csrBudgetRials: log.csrAndEducation.csrBudgetRials || 0,
        targetVillagesCount: log.csrAndEducation.targetVillagesHelped?.length || 0,
        staffTrainedPercentage: staffPercentage,
        staffTrainingHours: log.csrAndEducation.staffTrainingHours || 0,
        labTestReportAttached: log.evidenceFiles.some((f) => f.fileType === 'lab_report'),
        waterAuditAttached: log.waterResources.waterAuditReportAttached || false,
        timelySubmission: true,
        hadIncident: log.incidentsAndRemediation.hadIncident || false,
      };

      const result = calculateComplianceScore(scoringInput);

      // Create or update AuditScore
      let auditScore = await AuditScore.findOne({ activityLogId: log._id });
      if (!auditScore) {
        auditScore = new AuditScore({
          companyId: company._id,
          activityLogId: log._id,
          period: log.period,
          evaluationDate: new Date(),
          baseComplianceScore: result.baseComplianceScore,
          pollutantReductionScore: result.pollutantReductionScore,
          csrAndEducationScore: result.csrAndEducationScore,
          proactiveAuditScore: result.proactiveAuditScore,
          totalScore: result.totalScore,
          tier: result.tier,
          tierTitleFa: result.tierTitleFa,
          breakdownDetails: result.breakdown,
          evaluatorNotes: body.evaluatorNotes || 'ارزیابی بر مبنای مستندات خوداظهاری و پایش میدانی',
          evaluatedBy: user.userId,
          incentiveIssued: false,
        });
      } else {
        auditScore.baseComplianceScore = result.baseComplianceScore;
        auditScore.pollutantReductionScore = result.pollutantReductionScore;
        auditScore.csrAndEducationScore = result.csrAndEducationScore;
        auditScore.proactiveAuditScore = result.proactiveAuditScore;
        auditScore.totalScore = result.totalScore;
        auditScore.tier = result.tier;
        auditScore.tierTitleFa = result.tierTitleFa;
        auditScore.breakdownDetails = result.breakdown as any;
        if (body.evaluatorNotes) auditScore.evaluatorNotes = body.evaluatorNotes;
        auditScore.evaluatedBy = user.userId;
      }

      await auditScore.save();

      // Update company
      company.currentTier = result.tier;
      company.currentScore = result.totalScore;
      await company.save();

      // Update log
      log.status = 'approved';
      log.statusFa = 'تأیید شده نهایی و ممیزی‌شده';
      log.scoreId = auditScore._id as any;
      await log.save();

      // If eligible for voucher (Gold or Platinum) and not yet generated
      let incentive = await DiscountIncentive.findOne({ auditScoreId: auditScore._id });
      if ((result.tier === 'platinum' || result.tier === 'gold') && !incentive) {
        const serial = Math.floor(1000 + Math.random() * 9000);
        const prefix = result.tier === 'platinum' ? 'PLT' : 'GLD';
        const voucherNumber = `ZNJ-ENV-1405-${prefix}${serial}`;

        const verificationData = JSON.stringify({
          voucherNumber,
          company: company.name,
          shenaseMelli: company.shenaseMelli,
          county: company.countyFa,
          tier: result.tier.toUpperCase(),
          score: result.totalScore,
          taxExemption: `${result.benefits.taxExemptionPercentage}% ماده ۲۷ مالیات بر ارزش افزوده`,
          waterDiscount: `${result.benefits.waterQuotaDiscountPercentage}%`,
          validUntil: '۱۴۰۵/۱۲/۲۹',
          issuer: 'اداره کل حفاظت محیط زیست استان زنجان',
        });

        const digitalVerificationHash = crypto
          .createHash('sha256')
          .update(verificationData)
          .digest('hex');

        const qrCodeDataUrl = await QRCode.toDataURL(
          `http://localhost:3000/verify/${voucherNumber}?hash=${digitalVerificationHash.substring(0, 16)}`,
          {
            errorCorrectionLevel: 'H',
            margin: 2,
            color: { dark: '#064e3b', light: '#ffffff' },
          }
        );

        incentive = new DiscountIncentive({
          voucherNumber,
          digitalVerificationHash,
          companyId: company._id,
          auditScoreId: auditScore._id,
          period: log.period,
          year: log.year,
          tier: result.tier,
          certificateTitleFa:
            result.tier === 'platinum'
              ? 'گواهینامه رتبه پلاتین - صنعت سبز برتر استان زنجان'
              : 'گواهینامه رتبه طلا - صنعت سبز و همیار محیط‌زیست زنجان',
          taxExemptionPercentage: result.benefits.taxExemptionPercentage,
          taxExemptionArticle: 'ماده ۲۷ قانون مالیات بر ارزش افزوده (معافیت و تخفیف عوارض سبز آلایندگی)',
          waterQuotaDiscountPercentage: result.benefits.waterQuotaDiscountPercentage,
          fastTrackPermitRenewal: result.benefits.fastTrackPermitRenewal,
          publicLeaderboardFeature: result.benefits.publicLeaderboardEligible,
          qrCodeData: verificationData,
          qrCodeDataUrl,
          issuedBy: 'کارگروه استانی ارتقای فرهنگ حفاظت از محیط زیست استان زنجان',
          signatoryTitle: 'مدیرکل حفاظت محیط زیست استان زنجان و دبیر کارگروه استانی',
          issueDateJalali: '۱۴۰۴/۰۲/۲۰',
          validUntilJalali: '۱۴۰۵/۰۲/۲۰',
          status: 'active',
        });

        await incentive.save();
        auditScore.incentiveIssued = true;
        auditScore.incentiveId = incentive._id as any;
        await auditScore.save();
      }

      return c.json({
        success: true,
        message: 'محاسبه امتیاز و صدور ممیزی با موفقیت به انجام رسید.',
        score: auditScore,
        incentive,
      });
    } catch (error: any) {
      return c.json({ success: false, message: error.message }, 500);
    }
  }
);

// GET /api/scoring/company/:companyId
scoringRoutes.get('/company/:companyId', async (c) => {
  try {
    const companyId = c.req.param('companyId');
    const scores = await AuditScore.find({ companyId })
      .populate('incentiveId')
      .populate('evaluatedBy', 'fullName roleFa')
      .sort({ createdAt: -1 });

    return c.json({ success: true, count: scores.length, data: scores });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});
