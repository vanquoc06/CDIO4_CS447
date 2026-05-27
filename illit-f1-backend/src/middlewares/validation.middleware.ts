import { Request, Response, NextFunction } from 'express';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateUserInput = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, full_name } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Email không hợp lệ'
    });
  }

  if (!password || !validatePassword(password)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Mật khẩu phải từ 6 ký tự trở lên'
    });
  }

  if (req.method === 'POST' && req.path === '/' && !full_name?.trim()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Họ tên không được để trống'
    });
  }

  next();
};

export const validateProductInput = (req: Request, res: Response, next: NextFunction) => {
  const { name, base_price, variants } = req.body;

  if (!name?.trim()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Tên sản phẩm không được để trống'
    });
  }

  if (typeof base_price !== 'number' || base_price <= 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Giá sản phẩm phải là số dương'
    });
  }

  if (!Array.isArray(variants) || variants.length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'Phải có ít nhất 1 biến thể sản phẩm'
    });
  }

  next();
};
