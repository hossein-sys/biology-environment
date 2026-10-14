import mongoose, { Schema, Document } from 'mongoose';
import { GreenTierType } from './Company';

export interface IAuditScore extends Document {
  companyId: mongoose.Types.ObjectId;
  activityLogId?: mongoose.Types.ObjectId;
  period: string; // e.g. '1404-Q1'
  evaluationDate: Date;

  // Breakdown 0 - 100
  baseComplianceScore: number; // Max 30
  pollutantReductionScore: number; // Max 30
  csrAndEducationScore: number; // Max 20
  proactiveAuditScore: number; // Max 20
  totalScore: number; // 0 - 100

  tier: GreenTierType;
  tierTitleFa: string;

  breakdownDetails: {
    noJudicialViolationsPoints: number; // up to 15
    onlineMonitoringPoints: number; // up to 15
    tailingsManagementPoints: number; // up to 15
    waterRecyclingPoints: number; // up to 15
    csrBudgetPoints: number; // up to 10
    staffTrainingPoints: number; // up to 10
    labTestVerificationPoints: number; // up to 10
    timelyReportingPoints: number; // up to 10
  };

  evaluatorNotes: string;
  evaluatedBy?: mongoose.Types.ObjectId;
  incentiveIssued: boolean;
  incentiveId?: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const AuditScoreSchema = new Schema<IAuditScore>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    activityLogId: { type: Schema.Types.ObjectId, ref: 'ActivityLog' },
    period: { type: String, required: true },
    evaluationDate: { type: Date, default: Date.now },

    baseComplianceScore: { type: Number, required: true, min: 0, max: 30 },
    pollutantReductionScore: { type: Number, required: true, min: 0, max: 30 },
    csrAndEducationScore: { type: Number, required: true, min: 0, max: 20 },
    proactiveAuditScore: { type: Number, required: true, min: 0, max: 20 },
    totalScore: { type: Number, required: true, min: 0, max: 100, index: true },

    tier: {
      type: String,
      enum: ['platinum', 'gold', 'silver', 'red', 'pending'],
      required: true,
      index: true,
    },
    tierTitleFa: { type: String, required: true },

    breakdownDetails: {
      noJudicialViolationsPoints: { type: Number, default: 0 },
      onlineMonitoringPoints: { type: Number, default: 0 },
      tailingsManagementPoints: { type: Number, default: 0 },
      waterRecyclingPoints: { type: Number, default: 0 },
      csrBudgetPoints: { type: Number, default: 0 },
      staffTrainingPoints: { type: Number, default: 0 },
      labTestVerificationPoints: { type: Number, default: 0 },
      timelyReportingPoints: { type: Number, default: 0 },
    },

    evaluatorNotes: { type: String, default: '' },
    evaluatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    incentiveIssued: { type: Boolean, default: false },
    incentiveId: { type: Schema.Types.ObjectId, ref: 'DiscountIncentive' },
  },
  { timestamps: true }
);

export const AuditScore = mongoose.model<IAuditScore>('AuditScore', AuditScoreSchema);
