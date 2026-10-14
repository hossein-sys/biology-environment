import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'zanjan-green-compliance-secret-key-1405';

export interface TokenPayload {
  userId: string;
  username: string;
  fullName: string;
  role: string;
  companyId?: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ success: false, message: 'توکن دسترسی معتبر ارسال نشده است (دسترسی غیرمجاز).' }, 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    c.set('user', decoded);
    await next();
  } catch (err) {
    return c.json({ success: false, message: 'توکن نامعتبر یا منقضی شده است.' }, 401);
  }
}

export function requireRoles(...roles: string[]) {
  return async (c: Context, next: Next) => {
    const user = c.get('user') as TokenPayload | undefined;
    if (!user) {
      return c.json({ success: false, message: 'دسترسی غیرمجاز. احراز هویت لازم است.' }, 401);
    }
    if (!roles.includes(user.role)) {
      return c.json(
        {
          success: false,
          message: `سطح دسترسی شما (${user.role}) برای این عملیات مجاز نمی‌باشد.`,
        },
        403
      );
    }
    await next();
  };
}
