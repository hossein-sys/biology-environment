import mongoose, { Schema, Document } from 'mongoose';

export type ResolutionStatus = 'completed' | 'in_progress' | 'delayed';
export type RaciRole = 'R' | 'A' | 'C' | 'I';

export interface IResolution extends Document {
  code: string; // e.g., '۱۴۰۵-۰۱'
  title: string; // متن مصوبه کارگروه
  responsibleAgency: string; // دستگاه مجری
  raciRole: RaciRole;
  raciRoleFa: string;
  legalDeadline: string; // مهلت قانونی (e.g., '۳ ماه', '۶ ماه')
  completionMetric: string; // شاخص تکمیل
  status: ResolutionStatus;
  statusFa: string;
  progressPercent: number; // 0 to 100
  notes?: string;
  pillarCategory: 'water_basin' | 'heavy_metals' | 'education_schools' | 'media_culture' | 'waste_tailings';
  pillarCategoryFa: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResolutionSchema = new Schema<IResolution>(
  {
    code: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    responsibleAgency: { type: String, required: true, index: true },
    raciRole: { type: String, enum: ['R', 'A', 'C', 'I'], default: 'R' },
    raciRoleFa: { type: String, default: 'مسئول مستقیم اجرا (R)' },
    legalDeadline: { type: String, required: true },
    completionMetric: { type: String, required: true },
    status: {
      type: String,
      enum: ['completed', 'in_progress', 'delayed'],
      default: 'in_progress',
      index: true,
    },
    statusFa: { type: String, default: 'در حال اجرا' },
    progressPercent: { type: Number, default: 0, min: 0, max: 100 },
    notes: { type: String, default: '' },
    pillarCategory: {
      type: String,
      enum: ['water_basin', 'heavy_metals', 'education_schools', 'media_culture', 'waste_tailings'],
      default: 'heavy_metals',
    },
    pillarCategoryFa: { type: String, default: 'فلزات سنگین و باطله‌ها' },
  },
  { timestamps: true }
);

export const Resolution = mongoose.model<IResolution>('Resolution', ResolutionSchema);
