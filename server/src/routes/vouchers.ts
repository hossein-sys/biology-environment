import { Hono } from 'hono';
import { DiscountIncentive } from '../models/DiscountIncentive';
import { Company } from '../models/Company';
import { authMiddleware } from '../middleware/authMiddleware';

export const vouchersRoutes = new Hono();

// GET /api/vouchers
vouchersRoutes.get('/', async (c) => {
  try {
    const { companyId, tier } = c.req.query();
    const filter: any = {};
    if (companyId) filter.companyId = companyId;
    if (tier && tier !== 'all') filter.tier = tier;

    const vouchers = await DiscountIncentive.find(filter)
      .populate('companyId')
      .populate('auditScoreId')
      .sort({ createdAt: -1 });

    return c.json({ success: true, count: vouchers.length, data: vouchers });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// GET /api/vouchers/:voucherNumber (Detailed view for Certificate / Voucher printing)
vouchersRoutes.get('/:voucherNumber', async (c) => {
  try {
    const voucherNumber = c.req.param('voucherNumber');
    const voucher = await DiscountIncentive.findOne({ voucherNumber })
      .populate('companyId')
      .populate('auditScoreId');

    if (!voucher) {
      return c.json({ success: false, message: 'گواهینامه یا بن تخفیف با این شماره یافت نشد.' }, 404);
    }

    return c.json({ success: true, data: voucher });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// GET /api/vouchers/verify/:voucherNumber (Public QR Validation endpoint)
vouchersRoutes.get('/verify/:voucherNumber', async (c) => {
  try {
    const voucherNumber = c.req.param('voucherNumber');
    const voucher = await DiscountIncentive.findOne({ voucherNumber })
      .populate('companyId')
      .populate('auditScoreId');

    if (!voucher) {
      return c.json({
        success: false,
        isValid: false,
        message: 'این گواهینامه در سامانه رسمی اداره کل حفاظت محیط زیست استان زنجان ثبت نشده است (جعلی یا نامعتبر).',
      }, 404);
    }

    voucher.verificationHits += 1;
    voucher.lastVerifiedAt = new Date();
    await voucher.save();

    const company = voucher.companyId as any;

    return c.json({
      success: true,
      isValid: voucher.status === 'active',
      status: voucher.status,
      statusFa:
        voucher.status === 'active'
          ? 'معتبر و دارای اصالت رسمی'
          : voucher.status === 'expired'
          ? 'منقضی شده'
          : 'باطل شده توسط کارگروه',
      verificationDetails: {
        voucherNumber: voucher.voucherNumber,
        companyName: company?.name,
        shenaseMelli: company?.shenaseMelli,
        county: company?.countyFa,
        industrialPark: company?.industrialPark,
        tier: voucher.tier.toUpperCase(),
        certificateTitleFa: voucher.certificateTitleFa,
        taxExemptionPercentage: voucher.taxExemptionPercentage,
        waterQuotaDiscountPercentage: voucher.waterQuotaDiscountPercentage,
        taxArticle: voucher.taxExemptionArticle,
        issuedBy: voucher.issuedBy,
        signatoryTitle: voucher.signatoryTitle,
        issueDateJalali: voucher.issueDateJalali,
        validUntilJalali: voucher.validUntilJalali,
        verificationHits: voucher.verificationHits,
        verificationTimestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});
