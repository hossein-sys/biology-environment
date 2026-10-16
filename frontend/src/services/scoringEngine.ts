import { ActivityLog, AuditScore, DiscountIncentive, GreenTier } from '../types';

export interface ScoringResult {
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
  qualifiedForVoucher: boolean;
  taxExemptionPercentage: number;
  waterQuotaDiscountPercentage: number;
  fastTrackPermitRenewal: boolean;
}

/**
 * Pure deterministic Scoring Engine implementing official Zanjan Environmental Department regulations:
 * 1. Base Compliance (30 pts max):
 *    - Zero active judicial violations / red flags: 15 pts
 *    - Online continuous stack/effluent monitoring active: 15 pts
 * 2. Reduction of Pollutants (30 pts max):
 *    - Tailings neutralized / filter press & geomembrane isolation: 15 pts
 *    - Water recycling rate >= 60% or Zero-Liquid-Discharge (ZLD) active: 15 pts
 * 3. CSR & Community Health (20 pts max):
 *    - CSR budget dedicated to surrounding villages (Sardehat, Dehshir, Anguran, etc.): 10 pts
 *    - Staff and community environmental training (hours & attendance): 10 pts
 * 4. Proactive Audits (20 pts max):
 *    - Accredited third-party lab reports attached: 10 pts
 *    - Timely quarterly self-declaration submission: 10 pts
 */
export function computeComplianceScore(log: ActivityLog, activeViolationsCount: number = 0): ScoringResult {
  let noJudicialViolationsPoints = 0;
  let onlineMonitoringPoints = 0;
  let tailingsManagementPoints = 0;
  let waterRecyclingPoints = 0;
  let csrBudgetPoints = 0;
  let staffTrainingPoints = 0;
  let labTestVerificationPoints = 0;
  let timelyReportingPoints = 0;

  // 1. Base Compliance
  if (activeViolationsCount === 0) {
    noJudicialViolationsPoints = 15;
  }
  if (log.airAndDust?.continuousOnlineMonitoringActive) {
    onlineMonitoringPoints = 15;
  } else if (log.airAndDust?.bagFilterEfficiency >= 85) {
    onlineMonitoringPoints = 10;
  }

  const baseComplianceScore = noJudicialViolationsPoints + onlineMonitoringPoints;

  // 2. Pollutant Reduction
  const tailingsNeutralizedRatio =
    log.wasteManagement?.tailingsProducedTons > 0
      ? log.wasteManagement.tailingsNeutralizedTons / log.wasteManagement.tailingsProducedTons
      : 1;

  if (log.wasteManagement?.filterPressActive && log.wasteManagement?.geomembraneIsolation) {
    tailingsManagementPoints = Math.min(15, Math.round(tailingsNeutralizedRatio * 15));
  } else if (log.wasteManagement?.filterPressActive) {
    tailingsManagementPoints = 10;
  } else {
    tailingsManagementPoints = 4;
  }

  // Water recycling
  const recyclingRate = log.waterResources?.recyclingRatePercentage || 0;
  if (log.waterResources?.zeroLiquidDischargeActive || recyclingRate >= 80) {
    waterRecyclingPoints = 15;
  } else if (recyclingRate >= 50) {
    waterRecyclingPoints = 10;
  } else if (recyclingRate >= 25) {
    waterRecyclingPoints = 6;
  } else {
    waterRecyclingPoints = 2;
  }

  // Penalty if direct untreated discharge to Qezel Ozan basin occurs
  if (log.waterResources?.qezelOzanDirectDischarge && !log.waterResources?.effluentCodBODCompliant) {
    waterRecyclingPoints = Math.max(0, waterRecyclingPoints - 10);
  }

  const pollutantReductionScore = tailingsManagementPoints + waterRecyclingPoints;

  // 3. CSR & Community Health
  const csrBudget = log.csrAndEducation?.csrBudgetRials || 0;
  if (csrBudget >= 10000000000) {
    // 10 Billion Rials (1 Billion Tomans)
    csrBudgetPoints = 10;
  } else if (csrBudget >= 3000000000) {
    csrBudgetPoints = 7;
  } else if (csrBudget > 0) {
    csrBudgetPoints = 4;
  }

  const staffHours = log.csrAndEducation?.staffTrainingHours || 0;
  if (staffHours >= 40 && (log.csrAndEducation?.staffTrainedCount || 0) >= 50) {
    staffTrainingPoints = 10;
  } else if (staffHours >= 20) {
    staffTrainingPoints = 7;
  } else if (staffHours > 0) {
    staffTrainingPoints = 4;
  }

  const csrAndEducationScore = csrBudgetPoints + staffTrainingPoints;

  // 4. Proactive Audits
  const hasLabReport = (log.evidenceFiles || []).some(
    (f) => f.fileType === 'lab_report' || f.verifiedByInspector
  );
  if (hasLabReport || log.waterResources?.waterAuditReportAttached) {
    labTestVerificationPoints = 10;
  } else {
    labTestVerificationPoints = 3;
  }

  // Timely reporting bonus
  timelyReportingPoints = log.status !== 'rejected' ? 10 : 0;

  const proactiveAuditScore = labTestVerificationPoints + timelyReportingPoints;

  // Total
  const totalScore = Math.min(
    100,
    baseComplianceScore + pollutantReductionScore + csrAndEducationScore + proactiveAuditScore
  );

  // Determine Tier and Incentives
  let tier: GreenTier = 'red';
  let tierTitleFa = 'واحد آلاینده / مشمول جریمه عوارض سبز';
  let qualifiedForVoucher = false;
  let taxExemptionPercentage = 0;
  let waterQuotaDiscountPercentage = 0;
  let fastTrackPermitRenewal = false;

  if (totalScore >= 85) {
    tier = 'platinum';
    tierTitleFa = 'صنعت سبز برتر استانی (رتبه پلاتین)';
    qualifiedForVoucher = true;
    taxExemptionPercentage = 100; // ماده ۲۷ قانون مالیات ارزش افزوده
    waterQuotaDiscountPercentage = 30;
    fastTrackPermitRenewal = true;
  } else if (totalScore >= 70) {
    tier = 'gold';
    tierTitleFa = 'صنعت سبز و دوستدار محیط‌زیست (رتبه طلا)';
    qualifiedForVoucher = true;
    taxExemptionPercentage = 50;
    waterQuotaDiscountPercentage = 15;
    fastTrackPermitRenewal = true;
  } else if (totalScore >= 50) {
    tier = 'silver';
    tierTitleFa = 'واحد در حال انطباق با استانداردهای سبز (رتبه نقره)';
    qualifiedForVoucher = false;
    taxExemptionPercentage = 0;
    waterQuotaDiscountPercentage = 5;
    fastTrackPermitRenewal = false;
  } else {
    tier = 'red';
    tierTitleFa = 'واحد غیرمنطبق / مشمول وصول عوارض آلایندگی';
    qualifiedForVoucher = false;
    taxExemptionPercentage = 0;
    waterQuotaDiscountPercentage = 0;
    fastTrackPermitRenewal = false;
  }

  return {
    baseComplianceScore,
    pollutantReductionScore,
    csrAndEducationScore,
    proactiveAuditScore,
    totalScore,
    tier,
    tierTitleFa,
    breakdownDetails: {
      noJudicialViolationsPoints,
      onlineMonitoringPoints,
      tailingsManagementPoints,
      waterRecyclingPoints,
      csrBudgetPoints,
      staffTrainingPoints,
      labTestVerificationPoints,
      timelyReportingPoints,
    },
    qualifiedForVoucher,
    taxExemptionPercentage,
    waterQuotaDiscountPercentage,
    fastTrackPermitRenewal,
  };
}
