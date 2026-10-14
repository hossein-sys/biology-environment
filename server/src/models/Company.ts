import mongoose, { Schema, Document } from 'mongoose';

export type CountyType =
  | 'zanjan'
  | 'mahneshan'
  | 'abhar'
  | 'khorramdarreh'
  | 'soltaniyeh'
  | 'tarom'
  | 'khodabandeh'
  | 'ijrud';

export type SectorType =
  | 'lead_zinc'
  | 'mining'
  | 'chemical'
  | 'agro_industrial'
  | 'steel_metal'
  | 'food_pharma'
  | 'other';

export type GreenTierType = 'platinum' | 'gold' | 'silver' | 'red' | 'pending';

export interface ICompany extends Document {
  shenaseMelli: string; // شناسه ملی ۱۱ رقمی
  name: string;
  county: CountyType;
  countyFa: string;
  industrialPark: string;
  sector: SectorType;
  licenseNumber: string;
  environmentalOfficer: {
    fullName: string;
    phone: string;
    nationalCode: string;
    email?: string;
  };
  waterSource: 'deep_well' | 'industrial_grid' | 'qezel_ozan' | 'golabar_dam' | 'treated_effluent';
  dischargeType: 'zero_liquid_discharge' | 'evaporation_pond' | 'industrial_treatment_network' | 'controlled_drainage';
  establishedYear: number;
  currentTier: GreenTierType;
  currentScore: number;
  activeViolationsCount: number;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<ICompany>(
  {
    shenaseMelli: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, index: true },
    county: {
      type: String,
      enum: ['zanjan', 'mahneshan', 'abhar', 'khorramdarreh', 'soltaniyeh', 'tarom', 'khodabandeh', 'ijrud'],
      required: true,
      index: true,
    },
    countyFa: { type: String, required: true },
    industrialPark: { type: String, required: true },
    sector: {
      type: String,
      enum: ['lead_zinc', 'mining', 'chemical', 'agro_industrial', 'steel_metal', 'food_pharma', 'other'],
      required: true,
      index: true,
    },
    licenseNumber: { type: String, required: true },
    environmentalOfficer: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      nationalCode: { type: String, required: true },
      email: { type: String },
    },
    waterSource: {
      type: String,
      enum: ['deep_well', 'industrial_grid', 'qezel_ozan', 'golabar_dam', 'treated_effluent'],
      default: 'industrial_grid',
    },
    dischargeType: {
      type: String,
      enum: ['zero_liquid_discharge', 'evaporation_pond', 'industrial_treatment_network', 'controlled_drainage'],
      default: 'industrial_treatment_network',
    },
    establishedYear: { type: Number, default: 1385 },
    currentTier: {
      type: String,
      enum: ['platinum', 'gold', 'silver', 'red', 'pending'],
      default: 'pending',
      index: true,
    },
    currentScore: { type: Number, default: 0 },
    activeViolationsCount: { type: Number, default: 0 },
    address: { type: String, default: '' },
    coordinates: {
      lat: { type: Number, default: 36.6736 },
      lng: { type: Number, default: 48.4787 },
    },
  },
  { timestamps: true }
);

export const Company = mongoose.model<ICompany>('Company', CompanySchema);
