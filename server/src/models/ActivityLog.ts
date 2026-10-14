import mongoose, { Schema, Document } from 'mongoose';

export type LogStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'revision_required';

export interface IEvidenceFile {
  id: string;
  fileName: string;
  fileType: 'lab_report' | 'invoice' | 'utm_photo' | 'training_attendance' | 'waste_manifest';
  fileTypeFa: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: Date;
  description?: string;
  utmCoordinates?: string;
  verifiedByInspector?: boolean;
}

export interface IActivityLog extends Document {
  companyId: mongoose.Types.ObjectId;
  period: string; // e.g., '1404-Q1', '1404-Q2', '1404-Q3', '1404-Q4'
  year: number; // e.g., 1404 or 1405
  quarter: 1 | 2 | 3 | 4;
  status: LogStatus;
  statusFa: string;

  // Pillar 1: Industrial Waste Management (مدیریت پسماند صنعتی و باطله‌ها)
  wasteManagement: {
    tailingsProducedTons: number;
    tailingsNeutralizedTons: number;
    filterPressActive: boolean;
    filterPressThroughputTonsPerDay: number;
    geomembraneIsolation: boolean;
    hazardousWasteTransferredTons: number;
    safeDisposalSiteLocation: string; // e.g., سردهات / انبار ایزوله استاندارد
  };

  // Pillar 2: Water Resources & Qezel Ozan (حفاظت منابع آب و حوضه قزل‌اوزن)
  waterResources: {
    waterConsumedM3: number;
    greywaterRecycledM3: number;
    recyclingRatePercentage: number;
    zeroLiquidDischargeActive: boolean;
    qezelOzanDirectDischarge: boolean;
    effluentCodBODCompliant: boolean;
    waterAuditReportAttached: boolean;
  };

  // Pillar 3: Air & Dust Abatement (کنترل گردوغبار و فضای سبز)
  airAndDust: {
    bagFilterEfficiency: number; // percentage, e.g. 98.5%
    dustSuppressionSprayingActive: boolean;
    greenSpaceAreaM2: number;
    treesPlantedCount: number;
    continuousOnlineMonitoringActive: boolean;
  };

  // Pillar 4: CSR & Community Education (مسئولیت اجتماعی و آموزش محیط‌زیستی)
  csrAndEducation: {
    csrBudgetRials: number;
    communityProjectsDescription: string;
    targetVillagesHelped: string[]; // e.g., ['روستای سردهات', 'دهشیر', 'روستاهای انگوران']
    staffTrainingHours: number;
    staffTrainedCount: number;
    schoolOutreachFunded: boolean;
  };

  // Pillar 5: Incidents & Remediation Disclosures (خوداظهاری حوادث و اقدامات اصلاحی)
  incidentsAndRemediation: {
    hadIncident: boolean;
    incidentType?: 'acid_leak' | 'tailings_spill' | 'filter_malfunction' | 'exceedance_emission' | 'none';
    incidentDate?: string;
    incidentDescription?: string;
    immediateActionTaken?: string;
    remediationSuccessVerified?: boolean;
  };

  evidenceFiles: IEvidenceFile[];

  // Review & scoring audit link
  scoreId?: mongoose.Types.ObjectId;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewerNotes?: string;
  inspectorDisputeRemarks?: string;
  submittedAt?: Date;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EvidenceFileSchema = new Schema<IEvidenceFile>(
  {
    id: { type: String, required: true },
    fileName: { type: String, required: true },
    fileType: {
      type: String,
      enum: ['lab_report', 'invoice', 'utm_photo', 'training_attendance', 'waste_manifest'],
      required: true,
    },
    fileTypeFa: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, default: 0 },
    uploadedAt: { type: Date, default: Date.now },
    description: { type: String },
    utmCoordinates: { type: String },
    verifiedByInspector: { type: Boolean, default: false },
  },
  { _id: false }
);

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true, index: true },
    period: { type: String, required: true, index: true },
    year: { type: Number, required: true },
    quarter: { type: Number, required: true, min: 1, max: 4 },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'revision_required'],
      default: 'draft',
      index: true,
    },
    statusFa: { type: String, default: 'پیش‌نویس' },

    wasteManagement: {
      tailingsProducedTons: { type: Number, default: 0 },
      tailingsNeutralizedTons: { type: Number, default: 0 },
      filterPressActive: { type: Boolean, default: false },
      filterPressThroughputTonsPerDay: { type: Number, default: 0 },
      geomembraneIsolation: { type: Boolean, default: false },
      hazardousWasteTransferredTons: { type: Number, default: 0 },
      safeDisposalSiteLocation: { type: String, default: 'سایت تخصصی سردهات' },
    },

    waterResources: {
      waterConsumedM3: { type: Number, default: 0 },
      greywaterRecycledM3: { type: Number, default: 0 },
      recyclingRatePercentage: { type: Number, default: 0 },
      zeroLiquidDischargeActive: { type: Boolean, default: false },
      qezelOzanDirectDischarge: { type: Boolean, default: false },
      effluentCodBODCompliant: { type: Boolean, default: true },
      waterAuditReportAttached: { type: Boolean, default: false },
    },

    airAndDust: {
      bagFilterEfficiency: { type: Number, default: 0 },
      dustSuppressionSprayingActive: { type: Boolean, default: false },
      greenSpaceAreaM2: { type: Number, default: 0 },
      treesPlantedCount: { type: Number, default: 0 },
      continuousOnlineMonitoringActive: { type: Boolean, default: false },
    },

    csrAndEducation: {
      csrBudgetRials: { type: Number, default: 0 },
      communityProjectsDescription: { type: String, default: '' },
      targetVillagesHelped: [{ type: String }],
      staffTrainingHours: { type: Number, default: 0 },
      staffTrainedCount: { type: Number, default: 0 },
      schoolOutreachFunded: { type: Boolean, default: false },
    },

    incidentsAndRemediation: {
      hadIncident: { type: Boolean, default: false },
      incidentType: {
        type: String,
        enum: ['acid_leak', 'tailings_spill', 'filter_malfunction', 'exceedance_emission', 'none'],
        default: 'none',
      },
      incidentDate: { type: String },
      incidentDescription: { type: String, default: '' },
      immediateActionTaken: { type: String, default: '' },
      remediationSuccessVerified: { type: Boolean, default: true },
    },

    evidenceFiles: [EvidenceFileSchema],

    scoreId: { type: Schema.Types.ObjectId, ref: 'AuditScore' },
    reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    reviewerNotes: { type: String, default: '' },
    inspectorDisputeRemarks: { type: String, default: '' },
    submittedAt: { type: Date },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

export const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
