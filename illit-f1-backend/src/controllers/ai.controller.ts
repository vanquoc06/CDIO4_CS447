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

    res.status(200).json({
      status: 'success',
      data: aiResponse
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};