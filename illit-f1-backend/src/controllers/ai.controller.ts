// src/controllers/ai.controller.ts
import { Request, Response } from 'express';
import * as aiService from '../services/ai.service';

export const chat = async (req: Request, res: Response) => {
  try {
    // Lấy câu hỏi từ Body của request
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        status: 'fail',
        message: 'Bạn chưa nhập câu hỏi (prompt)!'
      });
    }

    // Gửi câu hỏi cho Gemini và chờ câu trả lời
    const aiResponse = await aiService.chatWithAI(prompt);

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return ở đây
      status: 'success',
      data: aiResponse
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return ở đây để sửa dứt điểm lỗi TS7030
      status: 'error',
      message: error.message
    });
  }
};