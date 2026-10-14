import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { connectDB } from './config/db';
import { seedDatabase } from './services/seedService';

import { authRoutes } from './routes/auth';
import { companiesRoutes } from './routes/companies';
import { activityLogsRoutes } from './routes/activityLogs';
import { inspectionsRoutes } from './routes/inspections';
import { resolutionsRoutes } from './routes/resolutions';
import { scoringRoutes } from './routes/scoring';
import { vouchersRoutes } from './routes/vouchers';
import { analyticsRoutes } from './routes/analytics';
import { swaggerRoutes } from './routes/swagger';

const app = new Hono();

// Global Middlewares
app.use('*', logger());
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

// Health check
app.get('/api/health', (c) => {
  return c.json({
    status: 'online',
    portal: 'سامانه صنعت سبز و فرهنگ محیط‌زیست استان زنجان',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.route('/api/auth', authRoutes);
app.route('/api/companies', companiesRoutes);
app.route('/api/activity-logs', activityLogsRoutes);
app.route('/api/inspections', inspectionsRoutes);
app.route('/api/resolutions', resolutionsRoutes);
app.route('/api/scoring', scoringRoutes);
app.route('/api/vouchers', vouchersRoutes);
app.route('/api/analytics', analyticsRoutes);
app.route('/api', swaggerRoutes);

// Root greeting
app.get('/', (c) => {
  return c.json({
    message: 'سامانه صنعت سبز و فرهنگ محیط‌زیست استان زنجان (Green Industry & Environmental Portal)',
    docs: '/api/docs',
    swagger: '/api/openapi.json',
    health: '/api/health',
  });
});

const PORT = Number(process.env.PORT) || 3001;

// Initialize Database and Start Server
async function startServer() {
  await connectDB();
  await seedDatabase();

  console.log(`[Green Portal Server] Running on http://localhost:${PORT}`);
  console.log(`[Swagger Docs] Available at http://localhost:${PORT}/api/docs`);
}

startServer();

export default {
  port: PORT,
  fetch: app.fetch,
};
