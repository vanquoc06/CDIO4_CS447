// src/services/ai.service.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Khởi tạo Gemini AI với API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const chatWithAI = async (prompt: string) => {
  try {
    // Chọn model tối ưu cho chat (gemini-1.5-flash là bản mới và rất nhanh)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Gửi câu hỏi tới AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return response.text();
  } catch (error) {
    console.error("Lỗi AI:", error);
    throw new Error("Trí tuệ nhân tạo đang gặp sự cố kết nối!");
  }
};