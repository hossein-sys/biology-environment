export type CountyKey =
  | 'zanjan'
  | 'mahneshan'
  | 'abhar'
  | 'khorramdarreh'
  | 'soltaniyeh'
  | 'tarom'
  | 'khodabandeh'
  | 'ijrud';

export type EventCategory =
  | 'workshop'
  | 'field_campaign'
  | 'competition'
  | 'conference';

export type TargetAudience =
  | 'employees'
  | 'students_teachers'
  | 'farmers'
  | 'industrialists'
  | 'citizens';

export type EffectivenessRating = 'excellent' | 'good' | 'medium' | 'weak';

export type EventStatus = 'approved' | 'pending' | 'revision_required';

export interface Agency {
  _id: string;
  name: string;
  county: CountyKey;
  countyFa: string;
  category: string;
  liaisonOfficer: {
    fullName: string;
    phone: string;
    title: string;
    email?: string;
  };
  totalScore: number;
  totalHours: number;
  totalAudience: number;
  rank: number;
  awardBadge?: string;
  description?: string;
}

export interface CulturalEvent {
  _id: string;
  agencyId: string;
  agencyName: string;
  title: string;
  category: EventCategory;
  categoryFa: string;
  county: CountyKey;
  countyFa: string;
  location: string;
  eventDate: string;
  durationHours: number;
  organizerName: string;
  instructorName: string;
  instructorResume: string;
  targetAudience: TargetAudience;
  targetAudienceFa: string;
  attendeeCount: number;
  effectivenessRating: EffectivenessRating;
  effectivenessFa: string;
  description: string;
  evidenceFiles: Array<{
    id: string;
    name: string;
    size: string;
    type: string;
  }>;
  status: EventStatus;
  statusFa: string;
  awardedPoints: number;
  reviewerNotes?: string;
  reviewedAt?: string;
  createdAt: string;
}

export interface CommendationCertificate {
  id: string;
  agencyId: string;
  agencyName: string;
  serialNumber: string;
  title: string;
  rankTitle: string;
  year: string;
  score: number;
  signatoryTitle: string;
  issuedDate: string;
  incentivePoints: string[];
}
