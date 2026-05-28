// src/controllers/chatbot.controller.ts
import { Request, Response } from 'express';
import * as chatbotService from '../services/chatbot.service';
import * as aiService from '../services/ai.service';

export const createSession = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.user_id;

    const session = await chatbotService.createChatSession(userId);

    res.status(201).json({
      status: 'success',
      message: 'Tạo phiên chat thành công!',
      data: session
    });
  } catch (error: any) {
    res.status(500).json({
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

    res.status(200).json({
      status: 'success',
      data: sessions,
      count: sessions.length
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách phiên chat',
      error: error.message
    });
  }
};

export const getSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const session = await chatbotService.getChatSession(sessionId);

    if (!session) {
      return res.status(404).json({
        status: 'fail',
        message: 'Phiên chat không tồn tại'
      });
    }

    res.status(200).json({
      status: 'success',
      data: session
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy phiên chat',
      error: error.message
    });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
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

    res.status(200).json({
      status: 'success',
      message: 'Tin nhắn đã được gửi',
      data: {
        userMessage: message,
        botResponse: aiResponse
      }
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi gửi tin nhắn',
      error: error.message
    });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;

    const messages = await chatbotService.getChatMessages(sessionId, limit);

    res.status(200).json({
      status: 'success',
      data: messages,
      count: messages.length
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách tin nhắn',
      error: error.message
    });
  }
};

export const deleteSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    await chatbotService.deleteSession(sessionId);

    res.status(200).json({
      status: 'success',
      message: 'Xóa phiên chat thành công!'
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi xóa phiên chat',
      error: error.message
    });
  }
};

export const clearMessages = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    await chatbotService.clearSessionMessages(sessionId);

    res.status(200).json({
      status: 'success',
      message: 'Xóa hết tin nhắn thành công!'
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi xóa tin nhắn',
      error: error.message
    });
  }
};
