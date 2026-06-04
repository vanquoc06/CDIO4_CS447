// src/routes/chatbot.routes.ts
import { Router } from 'express';
import {
  createSession,
  getSessions,
  getSession,
  sendMessage,
  getMessages,
  deleteSession,
  clearMessages
} from '../controllers/chatbot.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// All chatbot routes require authentication
router.use(verifyToken);

// POST tạo phiên chat mới
router.post('/sessions', createSession);

// GET danh sách phiên chat của user
router.get('/sessions', getSessions);

// GET chi tiết 1 phiên chat
router.get('/sessions/:sessionId', getSession);

// POST gửi tin nhắn (gọi AI và lưu vào DB)
router.post('/sessions/:sessionId/messages', sendMessage);

// GET danh sách tin nhắn trong phiên
router.get('/sessions/:sessionId/messages', getMessages);

// DELETE xóa phiên chat
router.delete('/sessions/:sessionId', deleteSession);

// DELETE xóa hết tin nhắn trong phiên
router.delete('/sessions/:sessionId/messages', clearMessages);

export default router;
