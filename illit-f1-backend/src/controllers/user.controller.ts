// src/controllers/user.controller.ts
import { Request, Response } from 'express';
import * as userService from '../services/user.service';

// 1. Lấy danh sách người dùng
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      status: 'success',
      data: users
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách người dùng',
      error: error.message
    });
  }
};

// 2. Xử lý Đăng ký
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, full_name, phone_number } = req.body;

    if (!email || !password || !full_name) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vui lòng cung cấp đủ email, mật khẩu và họ tên!'
      });
    }

    const newUser = await userService.createUser(req.body);
    
    res.status(201).json({
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

    res.status(500).json({
      status: 'error',
      message: 'Lỗi server khi tạo người dùng',
      error: error.message
    });
  }
};

// 3. Xử lý Đăng nhập (MỚI THÊM)
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vui lòng nhập đầy đủ email và mật khẩu!'
      });
    }

    const result = await userService.loginUser(req.body);

    res.status(200).json({
      status: 'success',
      message: 'Đăng nhập thành công!',
      data: result
    });
  } catch (error: any) {
    // Nếu lỗi do sai pass/email thì ném status 401
    res.status(401).json({
      status: 'fail',
      message: error.message
    });
  }
};