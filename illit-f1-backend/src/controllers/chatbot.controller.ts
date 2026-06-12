// src/controllers/chatbot.controller.ts
import { Request, Response } from 'express';
import * as chatbotService from '../services/chatbot.service';
import * as aiService from '../services/ai.service';
import { HTTP_STATUS } from '../config/constants';

export const createSession = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.user_id;

    const session = await chatbotService.createChatSession(userId);

    return res.status(HTTP_STATUS.CREATED).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Tạo phiên chat thành công!',
      data: session
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi tạo phiên chat',
      error: error.message
    });
  }
};

export const getSessions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.user_id;

    const sessions = await chatbotService.getUserSessions(userId);

    return res.status(HTTP_STATUS.OK).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: sessions,
      count: sessions.length
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi lấy danh sách phiên chat',
      error: error.message
    });
  }
};

export const getSession = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để tránh lỗi TS2345
    const sessionId = req.params.sessionId as string;

    const session = await chatbotService.getChatSession(sessionId);

    if (!session) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: 'fail',
        message: 'Phiên chat không tồn tại'
      });
    }

    return res.status(HTTP_STATUS.OK).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: session
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi lấy phiên chat',
      error: error.message
    });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để tránh lỗi TS2345
    const sessionId = req.params.sessionId as string;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'fail',
        message: 'Tin nhắn không được để trống'
      });
    }

    // Save user message
    await chatbotService.saveChatMessage(sessionId, 'user', message);

    // Get AI response
    const aiResponse = await aiService.chatWithAI(message);

    // Save AI response
    await chatbotService.saveChatMessage(sessionId, 'bot', aiResponse);

    return res.status(HTTP_STATUS.OK).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Tin nhắn đã được gửi',
      data: {
        userMessage: message,
        botResponse: aiResponse
      }
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi gửi tin nhắn',
      error: error.message
    });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để tránh lỗi TS2345
    const sessionId = req.params.sessionId as string;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;

    const messages = await chatbotService.getChatMessages(sessionId, limit);

    return res.status(HTTP_STATUS.OK).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: messages,
      count: messages.length
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi lấy danh sách tin nhắn',
      error: error.message
    });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để tránh lỗi TS2345
    const sessionId = req.params.sessionId as string;

    await chatbotService.deleteSession(sessionId);

    return res.status(HTTP_STATUS.OK).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Xóa phiên chat thành công!'
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi xóa phiên chat',
      error: error.message
    });
  }
};

export const clearMessages = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để tránh lỗi TS2345
    const sessionId = req.params.sessionId as string;

    await chatbotService.clearSessionMessages(sessionId);

    return res.status(HTTP_STATUS.OK).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Xóa hết tin nhắn thành công!'
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi xóa tin nhắn',
      error: error.message
    });
  }
};