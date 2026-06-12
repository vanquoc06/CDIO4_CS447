// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants';

// 1. Lấy danh sách người dùng
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(HTTP_STATUS.OK).json({ // Thêm return
      status: 'success',
      data: users,
      count: users.length
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // Thêm return
      status: 'error',
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// 2. Xử lý Đăng ký
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body);

    return res.status(HTTP_STATUS.CREATED).json({ // Thêm return
      status: 'success',
      message: 'Tạo tài khoản thành công!',
      data: newUser
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(HTTP_STATUS.CONFLICT).json({
        status: 'fail',
        message: ERROR_MESSAGES.EMAIL_TAKEN
      });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // ✨ ĐÃ SỬA: Thêm return ở đây để hết lỗi TS7030
      status: 'error',
      message: ERROR_MESSAGES.SERVER_ERROR,
      error: error.message
    });
  }
};

// 3. Xử lý Đăng nhập
export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.loginUser(req.body);

    return res.status(HTTP_STATUS.OK).json({ // Thêm return
      status: 'success',
      message: 'Đăng nhập thành công!',
      data: result
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ // Thêm return
      status: 'fail',
      message: error.message
    });
  }
};