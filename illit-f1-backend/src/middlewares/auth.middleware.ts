// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // 1. Lấy token từ header của request gửi lên
  const authHeader = req.headers.authorization;

  // Nếu không có token hoặc token không đúng chuẩn "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      status: 'fail', 
      message: 'Truy cập bị từ chối! Không tìm thấy Token.' 
    });
  }

  // 2. Tách lấy chuỗi mã token thực sự (bỏ chữ Bearer đi)
  const token = authHeader.split(' ')[1];

  try {
    // 3. Nhờ jwt giải mã xem vé này có phải hệ thống mình cấp không, có hết hạn chưa
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    // Nếu hợp lệ, lưu thông tin user (user_id) vào request để các hàm phía sau dùng
    (req as any).user = decoded;
    
    // 4. Mở cổng cho phép đi tiếp vào Controller
    next(); 
  } catch (error) {
    res.status(401).json({ 
      status: 'fail', 
      message: 'Token không hợp lệ hoặc đã hết hạn!' 
    });
  }
};