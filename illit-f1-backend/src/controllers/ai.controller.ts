// src/controllers/ai.controller.ts
import { Request, Response } from 'express';
import * as aiService from '../services/ai.service';
import { HTTP_STATUS } from '../config/constants';

export const chat = async (req: Request, res: Response) => {
  try {
    // Lấy câu hỏi từ Body của request
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'fail',
        message: 'Bạn chưa nhập câu hỏi (prompt)!'
      });
    }

    // Gửi câu hỏi cho Gemini và chờ câu trả lời
    const aiResponse = await aiService.chatWithAI(prompt);

    return res.status(HTTP_STATUS.OK).json({ // ✨ ĐÃ SỬA: Thêm return ở đây
      status: 'success',
      data: aiResponse
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // ✨ ĐÃ SỬA: Thêm return ở đây để sửa dứt điểm lỗi TS7030
      status: 'error',
      message: error.message
    });
  }
};