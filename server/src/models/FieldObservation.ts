import mongoose, { Schema, Document } from 'mongoose';
import { CountyType } from './Company';

export type PollutionType =
  | 'lead_zinc_tailings'
  | 'industrial_waste'
  | 'riverbank_dumping'
  | 'unauthorized_grazing_plowing'
  | 'illegal_water_pumping';

export type PollutionSeverity = 'acute' | 'moderate' | 'minor';
export type ObservationStatus = 'reported' | 'investigating' | 'action_assigned' | 'resolved';

export interface IFieldObservation extends Document {
  trackingCode: string;
  inspectionDate: string; // e.g. '1404/05/20'
  county: CountyType;
  countyFa: string;
  locationName: string;
  monitorNameOrNGO: string;
  utmCoordinates: string; // e.g. '39N 724120E 4062140N'
  pollutionTypes: PollutionType[];
  severity: PollutionSeverity;
  severityFa: string;
  observationsDescription: string;
  recommendedCulturalAction: string;
  photoUrls: string[];
  inspectorNotes?: string;
  assignedAgency?: string;
  status: ObservationStatus;
  statusFa: string;
  relatedCompanyId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FieldObservationSchema = new Schema<IFieldObservation>(
  {
    trackingCode: { type: String, required: true, unique: true, index: true },
    inspectionDate: { type: String, required: true },
    county: {
      type: String,
      enum: ['zanjan', 'mahneshan', 'abhar', 'khorramdarreh', 'soltaniyeh', 'tarom', 'khodabandeh', 'ijrud'],
      required: true,
      index: true,
    },
    countyFa: { type: String, required: true },
    locationName: { type: String, required: true },
    monitorNameOrNGO: { type: String, required: true },
    utmCoordinates: { type: String, required: true },
    pollutionTypes: [{
      type: String,
      enum: [
        'lead_zinc_tailings',
        'industrial_waste',
        'riverbank_dumping',
        'unauthorized_grazing_plowing',
        'illegal_water_pumping',
      ],
      required: true,
    }],
    severity: {
      type: String,
      enum: ['acute', 'moderate', 'minor'],
      required: true,
      index: true,
    },
    severityFa: { type: String, required: true },
    observationsDescription: { type: String, required: true },
    recommendedCulturalAction: { type: String, required: true },
    photoUrls: [{ type: String }],
    inspectorNotes: { type: String, default: '' },
    assignedAgency: { type: String, default: 'اداره کل حفاظت محیط زیست زنجان' },
    status: {
      type: String,
      enum: ['reported', 'investigating', 'action_assigned', 'resolved'],
      default: 'reported',
      index: true,
    },
    statusFa: { type: String, default: 'ثبت شده' },
    relatedCompanyId: { type: Schema.Types.ObjectId, ref: 'Company' },
  },
  { timestamps: true }
);

export const FieldObservation = mongoose.model<IFieldObservation>('FieldObservation', FieldObservationSchema);
