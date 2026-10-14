import { GreenTierType } from '../models/Company';

export interface ScoringInput {
  activeViolationsCount: number;
  continuousMonitoringActive: boolean;
  filterPressActive: boolean;
  tailingsProducedTons: number;
  tailingsNeutralizedTons: number;
  geomembraneIsolation: boolean;
  waterConsumedM3: number;
  greywaterRecycledM3: number;
  recyclingRatePercentage: number;
  zeroLiquidDischargeActive: boolean;
  qezelOzanDirectDischarge: boolean;
  bagFilterEfficiency: number;
  csrBudgetRials: number;
  targetVillagesCount: number;
  staffTrainedPercentage: number; // 0 to 100%
  staffTrainingHours: number;
  labTestReportAttached: boolean;
  waterAuditAttached: boolean;
  timelySubmission: boolean;
  hadIncident: boolean;
}

export interface ScoringResult {
  baseComplianceScore: number; // max 30
  pollutantReductionScore: number; // max 30
  csrAndEducationScore: number; // max 20
  proactiveAuditScore: number; // max 20
  totalScore: number; // 0 to 100
  tier: GreenTierType;
  tierTitleFa: string;
  badgeColor: string;
  benefits: {
    taxExemptionPercentage: number;
    waterQuotaDiscountPercentage: number;
    fastTrackPermitRenewal: boolean;
    publicLeaderboardEligible: boolean;
    descriptionFa: string;
  };
  breakdown: {
    noJudicialViolationsPoints: number;
    onlineMonitoringPoints: number;
    tailingsManagementPoints: number;
    waterRecyclingPoints: number;
    csrBudgetPoints: number;
    staffTrainingPoints: number;
    labTestVerificationPoints: number;
    timelyReportingPoints: number;
  };
}

/**
 * Pure deterministic scoring utility for Zanjan Green Industry Compliance
 */
export function calculateComplianceScore(input: ScoringInput): ScoringResult {
  // 1. Base Compliance (Max 30)
  // No violations: 15 points if 0, minus 5 per violation, min 0
  const noJudicialViolationsPoints = Math.max(0, 15 - (input.activeViolationsCount * 5));
  // Continuous monitoring or geomembrane isolation
  let onlineMonitoringPoints = 0;
  if (input.continuousMonitoringActive) onlineMonitoringPoints += 8;
  if (input.geomembraneIsolation) onlineMonitoringPoints += 7;
  const baseComplianceScore = Math.min(30, noJudicialViolationsPoints + onlineMonitoringPoints);

  // 2. Pollutant Reduction & Heavy Metals Neutralization (Max 30)
  let tailingsManagementPoints = 0;
  if (input.filterPressActive) tailingsManagementPoints += 6;
  if (input.bagFilterEfficiency >= 95) tailingsManagementPoints += 5;
  else if (input.bagFilterEfficiency >= 85) tailingsManagementPoints += 3;
  
  if (input.tailingsProducedTons > 0) {
    const neutralizationRatio = input.tailingsNeutralizedTons / input.tailingsProducedTons;
    if (neutralizationRatio >= 0.8) tailingsManagementPoints += 4;
    else if (neutralizationRatio >= 0.5) tailingsManagementPoints += 2;
  } else {
    tailingsManagementPoints += 4;
  }
  tailingsManagementPoints = Math.min(15, tailingsManagementPoints);

  // Water recycling & Qezel Ozan basin protection (15 points)
  let waterRecyclingPoints = 0;
  if (input.zeroLiquidDischargeActive) {
    waterRecyclingPoints = 15;
  } else {
    if (input.recyclingRatePercentage >= 60) waterRecyclingPoints += 10;
    else if (input.recyclingRatePercentage >= 35) waterRecyclingPoints += 6;
    else if (input.recyclingRatePercentage >= 15) waterRecyclingPoints += 3;

    if (!input.qezelOzanDirectDischarge) waterRecyclingPoints += 5;
  }
  waterRecyclingPoints = Math.min(15, waterRecyclingPoints);
  const pollutantReductionScore = Math.min(30, tailingsManagementPoints + waterRecyclingPoints);

  // 3. CSR & Community Education (Max 20)
  let csrBudgetPoints = 0;
  // CSR Budget (Rials): >= 1,000,000,000 Rials (100M Tomans) -> 6 pts; >= 400M Rials -> 4 pts
  if (input.csrBudgetRials >= 1_000_000_000) csrBudgetPoints += 6;
  else if (input.csrBudgetRials >= 400_000_000) csrBudgetPoints += 4;
  else if (input.csrBudgetRials > 0) csrBudgetPoints += 2;

  if (input.targetVillagesCount >= 2) csrBudgetPoints += 4;
  else if (input.targetVillagesCount >= 1) csrBudgetPoints += 2;
  csrBudgetPoints = Math.min(10, csrBudgetPoints);

  let staffTrainingPoints = 0;
  if (input.staffTrainedPercentage >= 50) staffTrainingPoints += 5;
  else if (input.staffTrainedPercentage >= 25) staffTrainingPoints += 3;

  if (input.staffTrainingHours >= 40) staffTrainingPoints += 5;
  else if (input.staffTrainingHours >= 20) staffTrainingPoints += 3;
  staffTrainingPoints = Math.min(10, staffTrainingPoints);

  const csrAndEducationScore = Math.min(20, csrBudgetPoints + staffTrainingPoints);

  // 4. Proactive Audits & Lab Verification (Max 20)
  let labTestVerificationPoints = 0;
  if (input.labTestReportAttached) labTestVerificationPoints += 6;
  if (input.waterAuditAttached) labTestVerificationPoints += 4;
  labTestVerificationPoints = Math.min(10, labTestVerificationPoints);

  let timelyReportingPoints = 0;
  if (input.timelySubmission) timelyReportingPoints += 6;
  if (!input.hadIncident) timelyReportingPoints += 4; // penalty for unmitigated incidents
  timelyReportingPoints = Math.min(10, timelyReportingPoints);

  const proactiveAuditScore = Math.min(20, labTestVerificationPoints + timelyReportingPoints);

  const totalScore = Math.round(
    baseComplianceScore + pollutantReductionScore + csrAndEducationScore + proactiveAuditScore
  );

  let tier: GreenTierType = 'red';
  let tierTitleFa = 'واحد آلاینده / غیرمنطبق با استانداردهای زیست‌محیطی';
  let badgeColor = '#ef4444'; // Red
  let benefits = {
    taxExemptionPercentage: 0,
    waterQuotaDiscountPercentage: 0,
    fastTrackPermitRenewal: false,
    publicLeaderboardEligible: false,
    descriptionFa: 'عدم احراز شرایط صنعت سبز؛ مشمول اخطار و عوارض آلایندگی دوره جاری.',
  };

  if (totalScore >= 85) {
    tier = 'platinum';
    tierTitleFa = 'صنعت سبز برتر استان زنجان (رتبه پلاتین)';
    badgeColor = '#059669'; // Emerald
    benefits = {
      taxExemptionPercentage: 100,
      waterQuotaDiscountPercentage: 25,
      fastTrackPermitRenewal: true,
      publicLeaderboardEligible: true,
      descriptionFa:
        'معافیت ۱۰۰٪ از عوارض آلایندگی موضوع ماده ۲۷ قانون مالیات بر ارزش افزوده، تخفیف ۲۵٪ تعرفه آب/برق، تمدید فوری پروانه‌ها و ثبت در تالار افتخارات صنعت سبز استان.',
    };
  } else if (totalScore >= 70) {
    tier = 'gold';
    tierTitleFa = 'صنعت سبز و همیار محیط‌زیست (رتبه طلا)';
    badgeColor = '#d97706'; // Amber / Gold
    benefits = {
      taxExemptionPercentage: 50,
      waterQuotaDiscountPercentage: 15,
      fastTrackPermitRenewal: true,
      publicLeaderboardEligible: true,
      descriptionFa:
        'تخفیف ۵۰٪ عوارض آلایندگی ماده ۲۷ قانون مالیات، تخفیف ۱۵٪ در سهمیه مصرف، و اولویت در تمدید سالانه پروانه‌ها.',
    };
  } else if (totalScore >= 50) {
    tier = 'silver';
    tierTitleFa = 'واحد در حال انطباق و پایش زیست‌محیطی (رتبه نقره)';
    badgeColor = '#64748b'; // Slate / Silver
    benefits = {
      taxExemptionPercentage: 0,
      waterQuotaDiscountPercentage: 0,
      fastTrackPermitRenewal: false,
      publicLeaderboardEligible: false,
      descriptionFa:
        'انطباق مشروط؛ فاقد تخفیفات عوارض مالیاتی؛ مهلت ۶ ماهه برای رفع نقایص فیلتراسیون و مدیریت باطله‌ها.',
    };
  }

  return {
    baseComplianceScore,
    pollutantReductionScore,
    csrAndEducationScore,
    proactiveAuditScore,
    totalScore,
    tier,
    tierTitleFa,
    badgeColor,
    benefits,
    breakdown: {
      noJudicialViolationsPoints,
      onlineMonitoringPoints,
      tailingsManagementPoints,
      waterRecyclingPoints,
      csrBudgetPoints,
      staffTrainingPoints,
      labTestVerificationPoints,
      timelyReportingPoints,
    },
  };
}
