export type UserRole = 'company_rep' | 'inspector' | 'task_force_admin' | 'public';
export type GreenTier = 'platinum' | 'gold' | 'silver' | 'red' | 'pending';
export type CountyKey =
  | 'zanjan'
  | 'mahneshan'
  | 'abhar'
  | 'khorramdarreh'
  | 'soltaniyeh'
  | 'tarom'
  | 'khodabandeh'
  | 'ijrud';

export interface Company {
  _id: string;
  shenaseMelli: string;
  name: string;
  county: CountyKey;
  countyFa: string;
  industrialPark: string;
  sector: string;
  licenseNumber: string;
  environmentalOfficer: {
    fullName: string;
    phone: string;
    nationalCode: string;
    email?: string;
  };
  waterSource: string;
  dischargeType: string;
  establishedYear: number;
  currentTier: GreenTier;
  currentScore: number;
  activeViolationsCount: number;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  roleFa: string;
  nationalCode: string;
  phone: string;
  departmentOrAgency?: string;
  company?: Company;
}

export interface EvidenceFile {
  id: string;
  fileName: string;
  fileType: 'lab_report' | 'invoice' | 'utm_photo' | 'training_attendance' | 'waste_manifest';
  fileTypeFa: string;
  fileUrl: string;
  fileSize: number;
  uploadedAt: string;
  description?: string;
  utmCoordinates?: string;
  verifiedByInspector?: boolean;
}

export interface ActivityLog {
  _id: string;
  companyId: Company;
  period: string;
  year: number;
  quarter: number;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'revision_required';
  statusFa: string;
  wasteManagement: {
    tailingsProducedTons: number;
    tailingsNeutralizedTons: number;
    filterPressActive: boolean;
    filterPressThroughputTonsPerDay: number;
    geomembraneIsolation: boolean;
    hazardousWasteTransferredTons: number;
    safeDisposalSiteLocation: string;
  };
  waterResources: {
    waterConsumedM3: number;
    greywaterRecycledM3: number;
    recyclingRatePercentage: number;
    zeroLiquidDischargeActive: boolean;
    qezelOzanDirectDischarge: boolean;
    effluentCodBODCompliant: boolean;
    waterAuditReportAttached: boolean;
  };
  airAndDust: {
    bagFilterEfficiency: number;
    dustSuppressionSprayingActive: boolean;
    greenSpaceAreaM2: number;
    treesPlantedCount: number;
    continuousOnlineMonitoringActive: boolean;
  };
  csrAndEducation: {
    csrBudgetRials: number;
    communityProjectsDescription: string;
    targetVillagesHelped: string[];
    staffTrainingHours: number;
    staffTrainedCount: number;
    schoolOutreachFunded: boolean;
  };
  incidentsAndRemediation: {
    hadIncident: boolean;
    incidentType: string;
    incidentDescription?: string;
    immediateActionTaken?: string;
    remediationSuccessVerified?: boolean;
  };
  evidenceFiles: EvidenceFile[];
  scoreId?: string;
  reviewedBy?: {
    fullName: string;
    roleFa: string;
    departmentOrAgency?: string;
  };
  reviewerNotes?: string;
  inspectorDisputeRemarks?: string;
  submittedAt?: string;
  reviewedAt?: string;
  createdAt: string;
}

export interface FieldObservation {
  _id: string;
  trackingCode: string;
  inspectionDate: string;
  county: CountyKey;
  countyFa: string;
  locationName: string;
  monitorNameOrNGO: string;
  utmCoordinates: string;
  pollutionTypes: string[];
  severity: 'acute' | 'moderate' | 'minor';
  severityFa: string;
  observationsDescription: string;
  recommendedCulturalAction: string;
  photoUrls: string[];
  inspectorNotes?: string;
  assignedAgency?: string;
  status: 'reported' | 'investigating' | 'action_assigned' | 'resolved';
  statusFa: string;
  relatedCompanyId?: Company;
  createdAt: string;
}

export interface Resolution {
  _id: string;
  code: string;
  title: string;
  responsibleAgency: string;
  raciRole: 'R' | 'A' | 'C' | 'I';
  raciRoleFa: string;
  legalDeadline: string;
  completionMetric: string;
  status: 'completed' | 'in_progress' | 'delayed';
  statusFa: string;
  progressPercent: number;
  notes?: string;
  pillarCategory: string;
  pillarCategoryFa: string;
}

export interface AuditScore {
  _id: string;
  companyId: string;
  activityLogId?: string;
  period: string;
  evaluationDate: string;
  baseComplianceScore: number;
  pollutantReductionScore: number;
  csrAndEducationScore: number;
  proactiveAuditScore: number;
  totalScore: number;
  tier: GreenTier;
  tierTitleFa: string;
  breakdownDetails: {
    noJudicialViolationsPoints: number;
    onlineMonitoringPoints: number;
    tailingsManagementPoints: number;
    waterRecyclingPoints: number;
    csrBudgetPoints: number;
    staffTrainingPoints: number;
    labTestVerificationPoints: number;
    timelyReportingPoints: number;
  };
  evaluatorNotes: string;
  incentiveIssued: boolean;
  incentiveId?: DiscountIncentive;
}

export interface DiscountIncentive {
  _id: string;
  voucherNumber: string;
  digitalVerificationHash: string;
  companyId: Company;
  auditScoreId: string;
  period: string;
  year: number;
  tier: GreenTier;
  certificateTitleFa: string;
  taxExemptionPercentage: number;
  taxExemptionArticle: string;
  waterQuotaDiscountPercentage: number;
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
}

export interface ProvincialKPIs {
  summary: {
    totalCompanies: number;
    activeVouchersCount: number;
    totalObservations: number;
    acuteObservations: number;
    resolvedObservations: number;
    resolutionsImplementationRate: number;
  };
  impactMetrics: {
    totalCsrRials: number;
    totalCsrTomans: number;
    totalTailingsTons: number;
    totalNeutralizedTons: number;
    neutralizationRate: number;
    totalWaterConsumedM3: number;
    totalGreywaterRecycledM3: number;
    overallRecyclingRate: number;
    totalStaffTrained: number;
    totalGreenSpaceM2: number;
  };
  tierDistribution: {
    platinum: number;
    gold: number;
    silver: number;
    red: number;
  };
  resolutionsBreakdown: {
    total: number;
    completed: number;
    inProgress: number;
    delayed: number;
  };
  countyDistribution: Array<{
    key: CountyKey;
    nameFa: string;
    hub: string;
    companiesCount: number;
    observationsCount: number;
    greenUnitsCount: number;
  }>;
}
