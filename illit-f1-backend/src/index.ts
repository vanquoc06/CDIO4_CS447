import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './config/database';
import { logger } from './config/logger';
import userRoutes from './routes/user.routes';
import aiRoutes from './routes/ai.routes';
import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import cartRoutes from './routes/cart.routes';
import reviewRoutes from './routes/review.routes';
import voucherRoutes from './routes/voucher.routes';
import raceRoutes from './routes/race.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

dotenv.config();

// Validate biến môi trường
const requiredEnvVars = ['PORT', 'DATABASE_URL', 'JWT_SECRET', 'GEMINI_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  logger.error(`Thiếu biến môi trường: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: 'success',
      message: 'Server hoạt động bình thường',
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime()
    });
  } catch (error: any) {
    logger.error('Health check failed', { error: error.message });
    res.status(503).json({
      status: 'error',
      message: 'Server đang gặp vấn đề',
      database: 'disconnected',
      error: error.message
    });
  }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/f1', raceRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`🚀 Server đang chạy tại http://localhost:${port}`);
  logger.info(`📊 Database: ${process.env.DATABASE_URL?.split(';')[1] || 'connecting...'}`);
  logger.info(`🔒 JWT Secret: ${process.env.JWT_SECRET ? '✓ Configured' : '✗ Missing'}`);
  logger.info(`📍 Available routes: /api/{users,products,orders,cart,reviews,vouchers,f1,ai}`);
});