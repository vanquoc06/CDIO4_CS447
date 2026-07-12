import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './config/database';
import { logger } from './config/logger';
import userRoutes from './routes/user.routes';
import chatbotRoutes from './routes/chatbot.routes';
import roleRoutes from './routes/role.routes';
import raceRoutes from './routes/race.routes';
import aiRoutes from './routes/ai.routes';
import { errorHandler, notFoundHandler } from './middlewares/error.middleware';

dotenv.config();

// Validate required environment variables for the core API.
// GEMINI_API_KEY is checked only when an AI endpoint is called.
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  logger.error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const app = express();
const port = Number(process.env.PORT || 8080);

app.use(cors());
app.use(express.json());

app.get('/api/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: 'success',
      message: 'Server is running normally',
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime()
    });
  } catch (error: any) {
    logger.error('Health check failed', { error: error.message });
    res.status(503).json({
      status: 'error',
      message: 'Server is having a problem',
      database: 'disconnected',
      error: error.message
    });
  }
});

app.use('/api/users', userRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/f1', raceRoutes);
app.use('/api/ai', aiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(port, '0.0.0.0', () => {
  logger.info(`Server is running at http://localhost:${port}`);
  logger.info(`Database: ${process.env.DATABASE_URL?.split(';')[1] || 'connecting...'}`);
  logger.info(`JWT Secret: ${process.env.JWT_SECRET ? 'configured' : 'missing'}`);
  logger.info(`Gemini AI: ${process.env.GEMINI_API_KEY ? 'configured' : 'optional - not configured'}`);
  logger.info('Available routes: /api/{health,users,roles,f1,ai,chatbot}');
});

server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    logger.error(`Port ${port} is already in use. Stop the old backend process or change PORT in .env.`);
    process.exit(1);
  }

  logger.error('Server failed to start', { error: error.message });
  process.exit(1);
});

const shutdown = async () => {
  logger.info('Shutting down server...');
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);