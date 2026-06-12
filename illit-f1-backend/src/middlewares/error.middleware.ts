import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export interface CustomError extends Error {
  status?: number;
  code?: string;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Lỗi server không xác định';

  logger.error(`${status} - ${message}`, {
    path: req.path,
    method: req.method,
    error: err.toString()
  });

  res.status(status).json({
    status: status >= 400 && status < 500 ? 'fail' : 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { error: err.toString() })
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  logger.warn('Route not found', { path: req.path, method: req.method });
  res.status(404).json({
    status: 'fail',
    message: `Route ${req.method} ${req.originalUrl} không tồn tại`
  });
};
