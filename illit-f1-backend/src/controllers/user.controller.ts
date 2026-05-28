// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import * as userService from '../services/user.service';

// 1. Lấy danh sách người dùng
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json({ // Thêm return
      status: 'success',
      data: users,
      count: users.length
    });
  } catch (error: any) {
    return res.status(500).json({ // Thêm return
      status: 'error',
      message: 'Lỗi khi lấy danh sách người dùng',
      error: error.message
    });
  }
};

// 2. Xử lý Đăng ký
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body);

    return res.status(201).json({ // Thêm return
      status: 'success',
      message: 'Tạo tài khoản thành công!',
      data: newUser
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({
        status: 'fail',
        message: 'Email này đã được sử dụng!'
      });
    }

    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return ở đây để hết lỗi TS7030
      status: 'error',
      message: 'Lỗi server khi tạo người dùng',
      error: error.message
    });
  }
};

// 3. Xử lý Đăng nhập
export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.loginUser(req.body);

    return res.status(200).json({ // Thêm return
      status: 'success',
      message: 'Đăng nhập thành công!',
      data: result
    });
  } catch (error: any) {
    return res.status(401).json({ // Thêm return
      status: 'fail',
      message: error.message
    });
  }
};