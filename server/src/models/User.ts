import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = 'company_rep' | 'inspector' | 'task_force_admin' | 'public';

export interface IUser extends Document {
  username: string;
  nationalCode: string;
  fullName: string;
  phone: string;
  email?: string;
  passwordHash: string;
  role: UserRole;
  roleFa: string;
  companyId?: mongoose.Types.ObjectId;
  departmentOrAgency?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, index: true },
    nationalCode: { type: String, required: true, unique: true, index: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ['company_rep', 'inspector', 'task_force_admin', 'public'],
      required: true,
      index: true,
    },
    roleFa: { type: String, required: true },
    companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
    departmentOrAgency: { type: String, default: 'اداره کل حفاظت محیط زیست استان زنجان' },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
