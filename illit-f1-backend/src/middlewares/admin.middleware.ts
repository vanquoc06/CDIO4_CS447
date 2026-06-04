// src/middlewares/admin.middleware.ts
import { Request, Response, NextFunction } from 'express';
import * as roleService from '../services/role.service';
import { logger } from '../config/logger';

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.user_id;

    if (!userId) {
      return res.status(401).json({
        status: 'fail',
        message: 'Không xác thực được user'
      });
    }

    const isAdmin = await roleService.isAdmin(userId);

    if (!isAdmin) {
      logger.warn('Unauthorized admin access attempt', { userId });
      return res.status(403).json({
        status: 'fail',
        message: 'Bạn không có quyền truy cập'
      });
    }

    next();
  } catch (error: any) {
    logger.error('Error in admin middleware', { error: error.message });
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi kiểm tra quyền admin'
    });
  }
};

export const checkModerator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.user_id;

    if (!userId) {
      return res.status(401).json({
        status: 'fail',
        message: 'Không xác thực được user'
      });
    }

    const isModerator = await roleService.isModerator(userId);

    if (!isModerator) {
      logger.warn('Unauthorized moderator access attempt', { userId });
      return res.status(403).json({
        status: 'fail',
        message: 'Bạn không có quyền truy cập'
      });
    }

    next();
  } catch (error: any) {
    logger.error('Error in moderator middleware', { error: error.message });
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi kiểm tra quyền moderator'
    });
  }
};
