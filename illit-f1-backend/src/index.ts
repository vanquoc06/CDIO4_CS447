import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './config/database';
import userRoutes from './routes/user.routes';
import aiRoutes from './routes/ai.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// API kiểm tra trạng thái
app.get('/api/health', async (req: Request, res: Response) => {
  // ... (giữ nguyên code cũ của bạn)
});

// <-- 2. Gắn route vào đường dẫn /api/users
app.use('/api/users', userRoutes); 
app.use('/api/ai', aiRoutes);

app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${port}`);
});