// src/controllers/role.controller.ts
import { Request, Response } from 'express';
import * as roleService from '../services/role.service';

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: roles,
      count: roles.length
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi lấy danh sách roles',
      error: error.message
    });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.roleId as string;

    const role = await roleService.getRoleById(parseInt(roleId));

    if (!role) {
      return res.status(404).json({
        status: 'fail',
        message: 'Role không tồn tại'
      });
    }

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: role
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi lấy chi tiết role',
      error: error.message
    });
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const { role_name } = req.body;

    if (!role_name || !role_name.trim()) {
      return res.status(400).json({
        status: 'fail',
        message: 'Tên role không được để trống'
      });
    }

    const role = await roleService.createRole(role_name);

    return res.status(201).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Tạo role thành công!',
      data: role
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({
        status: 'fail',
        message: 'Role này đã tồn tại'
      });
    }

    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi tạo role',
      error: error.message
    });
  }
};

export const assignRole = async (req: Request, res: Response) => {
  try {
    const { userId, roleId } = req.body;

    if (!userId || !roleId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vui lòng cung cấp userId và roleId'
      });
    }

    const userRole = await roleService.assignRoleToUser(userId, roleId);

    return res.status(201).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Gán role cho user thành công!',
      data: userRole
    });
  } catch (error: any) {
    return res.status(400).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'fail',
      message: error.message
    });
  }
};

export const removeRole = async (req: Request, res: Response) => {
  try {
    const { userId, roleId } = req.body;

    if (!userId || !roleId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vui lòng cung cấp userId và roleId'
      });
    }

    await roleService.removeRoleFromUser(userId, roleId);

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Xóa role khỏi user thành công!'
    });
  } catch (error: any) {
    return res.status(400).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'fail',
      message: error.message
    });
  }
};

export const getUserRoles = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để tránh lỗi lỏng lẻo dữ liệu TS2345
    const userId = req.params.userId as string;

    const roles = await roleService.getUserRoles(userId);

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: roles,
      count: roles.length
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi lấy roles của user',
      error: error.message
    });
  }
};