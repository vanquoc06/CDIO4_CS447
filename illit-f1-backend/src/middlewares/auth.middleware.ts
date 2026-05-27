// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../config/logger';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn('Unauthorized access attempt - missing token', { path: req.path });
    return res.status(401).json({
      status: 'fail',
      message: 'Truy cập bị từ chối! Không tìm thấy Token.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    logger.debug('Token verified', { userId: (decoded as any).user_id });
    next();
  } catch (error: any) {
    logger.warn('Invalid or expired token', { error: error.message });
    res.status(401).json({
      status: 'fail',
      message: 'Token không hợp lệ hoặc đã hết hạn!'
    });
  }
};