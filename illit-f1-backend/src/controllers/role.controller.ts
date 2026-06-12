// src/controllers/role.controller.ts
import { Request, Response } from 'express';
import * as roleService from '../services/role.service';
import { HTTP_STATUS } from '../config/constants';

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();

    return res.status(HTTP_STATUS.OK).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: roles,
      count: roles.length
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi lấy danh sách roles',
      error: error.message
    });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const roleId = req.params.roleId as string;

    const parsedRoleId = parseInt(roleId);
    if (isNaN(parsedRoleId)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'fail',
        message: 'roleId phải là một số nguyên hợp lệ'
      });
    }

    const role = await roleService.getRoleById(parsedRoleId);

    if (!role) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        status: 'fail',
        message: 'Role không tồn tại'
      });
    }

    return res.status(HTTP_STATUS.OK).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: role
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // ✨ ĐÃ SỬA: Thêm return
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
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'fail',
        message: 'Tên role không được để trống'
      });
    }

    const role = await roleService.createRole(role_name);

    return res.status(HTTP_STATUS.CREATED).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Tạo role thành công!',
      data: role
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(HTTP_STATUS.CONFLICT).json({
        status: 'fail',
        message: 'Role này đã tồn tại'
      });
    }

    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // ✨ ĐÃ SỬA: Thêm return
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
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'fail',
        message: 'Vui lòng cung cấp userId và roleId'
      });
    }

    const userRole = await roleService.assignRoleToUser(userId, roleId);

    return res.status(HTTP_STATUS.CREATED).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Gán role cho user thành công!',
      data: userRole
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'fail',
      message: error.message
    });
  }
};

export const removeRole = async (req: Request, res: Response) => {
  try {
    const { userId, roleId } = req.body;

    if (!userId || !roleId) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: 'fail',
        message: 'Vui lòng cung cấp userId và roleId'
      });
    }

    await roleService.removeRoleFromUser(userId, roleId);

    return res.status(HTTP_STATUS.OK).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Xóa role khỏi user thành công!'
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({ // ✨ ĐÃ SỬA: Thêm return
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

    return res.status(HTTP_STATUS.OK).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: roles,
      count: roles.length
    });
  } catch (error: any) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi lấy roles của user',
      error: error.message
    });
  }
};