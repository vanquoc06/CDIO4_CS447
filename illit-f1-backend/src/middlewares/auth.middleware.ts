// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../config/logger';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logger.warn('Unauthorized access attempt - missing token', { path: req.path });
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      status: 'fail',
      message: ERROR_MESSAGES.TOKEN_MISSING
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    logger.debug('Token verified', { userId: (decoded as any).user_id });
    
    return next(); 
  } catch (error: any) {
    logger.warn('Invalid or expired token', { error: error.message });
    
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
      status: 'fail',
      message: ERROR_MESSAGES.TOKEN_INVALID
    });
  }
};