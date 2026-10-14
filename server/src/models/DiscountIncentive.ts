import mongoose, { Schema, Document } from 'mongoose';
import { GreenTierType } from './Company';

export interface IDiscountIncentive extends Document {
  voucherNumber: string; // e.g., 'ZNJ-ENV-1405-A892'
  digitalVerificationHash: string;
  companyId: mongoose.Types.ObjectId;
  auditScoreId: mongoose.Types.ObjectId;
  period: string; // e.g., '1404-Q1'
  year: number;

  tier: GreenTierType;
  certificateTitleFa: string; // 'گواهینامه رتبه پلاتین - صنعت سبز برتر استان زنجان'

  // Benefits & Vouchers
  taxExemptionPercentage: number; // e.g. 100 for Platinum, 50 for Gold
  taxExemptionArticle: string; // 'ماده ۲۷ قانون مالیات بر ارزش افزوده (عوارض سبز)'
  waterQuotaDiscountPercentage: number; // e.g. 20%
  fastTrackPermitRenewal: boolean;
  publicLeaderboardFeature: boolean;

  qrCodeData: string;
  qrCodeDataUrl: string;

  issuedBy: string;
  signatoryTitle: string;
  issueDateJalali: string;
  validUntilJalali: string;
  status: 'active' | 'revoked' | 'expired';

  verificationHits: number;
  lastVerifiedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const DiscountIncentiveSchema = new Schema<IDiscountIncentive>(
  {
    voucherNumber: { type: String, required: true, unique: true, index: true },
    digitalVerificationHash: { type: String, required: true, unique: true, index: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    auditScoreId: { type: Schema.Types.ObjectId, ref: 'AuditScore', required: true },
    period: { type: String, required: true },
    year: { type: Number, required: true },

    tier: { type: String, enum: ['platinum', 'gold', 'silver', 'red', 'pending'], required: true },
    certificateTitleFa: { type: String, required: true },

    taxExemptionPercentage: { type: Number, default: 0 },
    taxExemptionArticle: {
      type: String,
      default: 'ماده ۲۷ قانون مالیات بر ارزش افزوده (معافیت و تخفیف عوارض آلایندگی)',
    },
    waterQuotaDiscountPercentage: { type: Number, default: 0 },
    fastTrackPermitRenewal: { type: Boolean, default: false },
    publicLeaderboardFeature: { type: Boolean, default: false },

    qrCodeData: { type: String, required: true },
    qrCodeDataUrl: { type: String, required: true },

    issuedBy: {
      type: String,
      default: 'دبیرخانه کارگروه استانی ارتقای فرهنگ حفاظت از محیط زیست استان زنجان',
    },
    signatoryTitle: {
      type: String,
      default: 'مدیرکل حفاظت محیط زیست استان زنجان و دبیر کارگروه استانی',
    },
    issueDateJalali: { type: String, required: true },
    validUntilJalali: { type: String, required: true },
    status: { type: String, enum: ['active', 'revoked', 'expired'], default: 'active', index: true },

    verificationHits: { type: Number, default: 0 },
    lastVerifiedAt: { type: Date },
  },
  { timestamps: true }
);

export const DiscountIncentive = mongoose.model<IDiscountIncentive>('DiscountIncentive', DiscountIncentiveSchema);
