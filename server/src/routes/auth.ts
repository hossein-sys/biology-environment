import { Hono } from 'hono';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { Company, CountyType, SectorType } from '../models/Company';
import { generateToken, authMiddleware } from '../middleware/authMiddleware';

export const authRoutes = new Hono();

// POST /api/auth/login
authRoutes.post('/login', async (c) => {
  try {
    const { username, password } = await c.req.json();
    if (!username || !password) {
      return c.json({ success: false, message: 'نام کاربری و کلمه عبور الزامی است.' }, 400);
    }

    const user = await User.findOne({
      $or: [{ username: username.trim() }, { email: username.trim() }],
    }).populate('companyId');

    if (!user) {
      return c.json({ success: false, message: 'کاربری با این مشخصات یافت نشد.' }, 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return c.json({ success: false, message: 'کلمه عبور نادرست است.' }, 401);
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken({
      userId: user._id.toString(),
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      companyId: user.companyId ? (user.companyId as any)._id?.toString() : undefined,
    });

    return c.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
        roleFa: user.roleFa,
        nationalCode: user.nationalCode,
        phone: user.phone,
        departmentOrAgency: user.departmentOrAgency,
        company: user.companyId,
      },
    });
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// POST /api/auth/register-company (Self-registration)
authRoutes.post('/register-company', async (c) => {
  try {
    const body = await c.req.json();
    const {
      shenaseMelli,
      name,
      county,
      industrialPark,
      sector,
      licenseNumber,
      officerFullName,
      officerPhone,
      officerNationalCode,
      officerEmail,
      waterSource,
      dischargeType,
      password,
    } = body;

    if (!shenaseMelli || !name || !county || !industrialPark || !officerNationalCode || !password) {
      return c.json({ success: false, message: 'لطفاً تمامی فیلدهای الزامی را تکمیل نمایید.' }, 400);
    }

    // Check duplicate company
    const existingComp = await Company.findOne({ shenaseMelli });
    if (existingComp) {
      return c.json({ success: false, message: 'شرکتی با این شناسه ملی پیش‌تر ثبت‌نام شده است.' }, 409);
    }

    const countyFaMap: Record<string, string> = {
      zanjan: 'زنجان',
      mahneshan: 'ماهنشان',
      abhar: 'ابهر',
      khorramdarreh: 'خرمدره',
      soltaniyeh: 'سلطانیه',
      tarom: 'طارم',
      khodabandeh: 'خدابنده',
      ijrud: 'ایجرود',
    };

    const newCompany = new Company({
      shenaseMelli,
      name,
      county: county as CountyType,
      countyFa: countyFaMap[county] || county,
      industrialPark,
      sector: (sector || 'lead_zinc') as SectorType,
      licenseNumber: licenseNumber || 'ص/۱۴۰۴/۰۰۱',
      environmentalOfficer: {
        fullName: officerFullName,
        phone: officerPhone,
        nationalCode: officerNationalCode,
        email: officerEmail,
      },
      waterSource: waterSource || 'industrial_grid',
      dischargeType: dischargeType || 'industrial_treatment_network',
      establishedYear: 1400,
      currentTier: 'pending',
      currentScore: 0,
      activeViolationsCount: 0,
    });

    await newCompany.save();

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username: `comp_${shenaseMelli}`,
      nationalCode: officerNationalCode,
      fullName: officerFullName,
      phone: officerPhone,
      email: officerEmail,
      passwordHash,
      role: 'company_rep',
      roleFa: `نماینده شرکت ${name}`,
      companyId: newCompany._id,
      departmentOrAgency: name,
      isActive: true,
    });

    await newUser.save();

    const token = generateToken({
      userId: newUser._id.toString(),
      username: newUser.username,
      fullName: newUser.fullName,
      role: newUser.role,
      companyId: newCompany._id.toString(),
    });

    return c.json({
      success: true,
      message: 'ثبت‌نام بنگاه صنعتی با موفقیت انجام شد.',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        role: newUser.role,
        roleFa: newUser.roleFa,
        company: newCompany,
      },
    }, 201);
  } catch (error: any) {
    return c.json({ success: false, message: error.message }, 500);
  }
});

// GET /api/auth/me
authRoutes.get('/me', authMiddleware, async (c) => {
  const tokenUser = c.get('user');
  const user = await User.findById(tokenUser.userId).populate('companyId');
  if (!user) {
    return c.json({ success: false, message: 'کاربر یافت نشد.' }, 404);
  }
  return c.json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      roleFa: user.roleFa,
      nationalCode: user.nationalCode,
      phone: user.phone,
      departmentOrAgency: user.departmentOrAgency,
      company: user.companyId,
    },
  });
});

// GET /api/auth/demo-switch/:role (Quick Switcher for convenient evaluation)
authRoutes.get('/demo-switch/:role', async (c) => {
  const targetRole = c.req.param('role');
  const user = await User.findOne({ role: targetRole }).populate('companyId');
  if (!user) {
    return c.json({ success: false, message: `کاربر پیش‌فرضی برای نقش ${targetRole} یافت نشد.` }, 404);
  }

  const token = generateToken({
    userId: user._id.toString(),
    username: user.username,
    fullName: user.fullName,
    role: user.role,
    companyId: user.companyId ? (user.companyId as any)._id?.toString() : undefined,
  });

  return c.json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      roleFa: user.roleFa,
      nationalCode: user.nationalCode,
      phone: user.phone,
      departmentOrAgency: user.departmentOrAgency,
      company: user.companyId,
    },
  });
});
