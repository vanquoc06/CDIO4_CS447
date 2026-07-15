import { Request, Response } from 'express';
import * as adminService from '../services/admin.service';

export const bootstrapAdminAccess = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.user_id;
    if (!userId) {
      return res.status(401).json({ status: 'fail', message: 'Không xác thực được người dùng' });
    }

    const result = await adminService.bootstrapAdminAccess(userId);
    return res.status(200).json({ status: 'success', message: 'Quyền admin đã được kích hoạt', data: result });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể kích hoạt quyền admin', error: error.message });
  }
};

export const getAdminDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await adminService.getAdminDrivers();
    return res.status(200).json({ status: 'success', data: drivers });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể lấy danh sách tài xế', error: error.message });
  }
};

export const createAdminDriver = async (req: Request, res: Response) => {
  try {
    const driver = await adminService.createAdminDriver(req.body);
    return res.status(201).json({ status: 'success', message: 'Thêm tài xế thành công', data: driver });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể thêm tài xế', error: error.message });
  }
};

export const updateAdminDriver = async (req: Request, res: Response) => {
  try {
    const driverId = req.params.driverId as string;
    const driver = await adminService.updateAdminDriver(driverId, req.body);
    return res.status(200).json({ status: 'success', message: 'Cập nhật tài xế thành công', data: driver });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể cập nhật tài xế', error: error.message });
  }
};

export const deleteAdminDriver = async (req: Request, res: Response) => {
  try {
    const driverId = req.params.driverId as string;
    await adminService.deleteAdminDriver(driverId);
    return res.status(200).json({ status: 'success', message: 'Xóa tài xế thành công' });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể xóa tài xế', error: error.message });
  }
};

export const getAdminTeams = async (req: Request, res: Response) => {
  try {
    const teams = await adminService.getAdminTeams();
    return res.status(200).json({ status: 'success', data: teams });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể lấy danh sách đội', error: error.message });
  }
};

export const createAdminTeam = async (req: Request, res: Response) => {
  try {
    const team = await adminService.createAdminTeam(req.body);
    return res.status(201).json({ status: 'success', message: 'Thêm đội thành công', data: team });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể thêm đội', error: error.message });
  }
};

export const updateAdminTeam = async (req: Request, res: Response) => {
  try {
    const teamId = req.params.teamId as string;
    const team = await adminService.updateAdminTeam(teamId, req.body);
    return res.status(200).json({ status: 'success', message: 'Cập nhật đội thành công', data: team });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể cập nhật đội', error: error.message });
  }
};

export const deleteAdminTeam = async (req: Request, res: Response) => {
  try {
    const teamId = req.params.teamId as string;
    await adminService.deleteAdminTeam(teamId);
    return res.status(200).json({ status: 'success', message: 'Xóa đội thành công' });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể xóa đội', error: error.message });
  }
};

export const getAdminNews = async (req: Request, res: Response) => {
  try {
    const news = await adminService.getAdminNews();
    return res.status(200).json({ status: 'success', data: news });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể lấy danh sách tin tức', error: error.message });
  }
};

export const createAdminNews = async (req: Request, res: Response) => {
  try {
    const item = await adminService.createAdminNews(req.body);
    return res.status(201).json({ status: 'success', message: 'Thêm tin tức thành công', data: item });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể thêm tin tức', error: error.message });
  }
};

export const updateAdminNews = async (req: Request, res: Response) => {
  try {
    const newsId = req.params.newsId as string;
    const item = await adminService.updateAdminNews(newsId, req.body);
    return res.status(200).json({ status: 'success', message: 'Cập nhật tin tức thành công', data: item });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể cập nhật tin tức', error: error.message });
  }
};

export const deleteAdminNews = async (req: Request, res: Response) => {
  try {
    const newsId = req.params.newsId as string;
    await adminService.deleteAdminNews(newsId);
    return res.status(200).json({ status: 'success', message: 'Xóa tin tức thành công' });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể xóa tin tức', error: error.message });
  }
};

export const createDefaultAdmin = async (req: Request, res: Response) => {
  try {
    const result = await adminService.createDefaultAdminUser();
    return res.status(201).json({ status: 'success', data: result });
  } catch (error: any) {
    return res.status(500).json({ status: 'error', message: 'Không thể tạo admin account', error: error.message });
  }
};
