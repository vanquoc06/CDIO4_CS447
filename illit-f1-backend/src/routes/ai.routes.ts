// src/routes/ai.routes.ts
import { Router } from 'express';
import { chat } from '../controllers/ai.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Gắn bác bảo vệ verifyToken luôn để tránh người lạ dùng "chùa" AI của bạn
router.post('/chat', verifyToken, chat);

export default router;