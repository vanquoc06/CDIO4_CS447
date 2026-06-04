// src/controllers/voucher.controller.ts
import { Request, Response } from 'express';
import * as voucherService from '../services/voucher.service';

export const getVouchers = async (req: Request, res: Response) => {
  try {
    const vouchers = await voucherService.getAllVouchers();

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: vouchers,
      count: vouchers.length
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi lấy danh sách voucher',
      error: error.message
    });
  }
};

export const validateVoucher = async (req: Request, res: Response) => {
  try {
    const { code, orderValue } = req.body;

    if (!code || !orderValue) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vui lòng cung cấp code và giá trị đơn hàng'
      });
    }

    const result = await voucherService.calculateDiscount(code, orderValue);

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: result
    });
  } catch (error: any) {
    return res.status(400).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'fail',
      message: error.message
    });
  }
};

export const createVoucher = async (req: Request, res: Response) => {
  try {
    const { code, discount_percent, discount_amount, min_order_value, max_usage, valid_from, valid_until } = req.body;

    if (!code) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vui lòng cung cấp mã voucher'
      });
    }

    if (!discount_percent && !discount_amount) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vui lòng cung cấp giảm giá theo % hoặc số tiền'
      });
    }

    const voucher = await voucherService.createVoucher({
      code,
      discount_percent,
      discount_amount,
      min_order_value,
      max_usage,
      valid_from,
      valid_until
    });

    return res.status(201).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Tạo voucher thành công!',
      data: voucher
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi tạo voucher',
      error: error.message
    });
  }
};

export const updateVoucher = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để tránh lỗi TS2345
    const voucherId = req.params.voucherId as string;
    const updateData = req.body;

    const voucher = await voucherService.updateVoucher(voucherId, updateData);

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Cập nhật voucher thành công!',
      data: voucher
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi cập nhật voucher',
      error: error.message
    });
  }
};

export const deleteVoucher = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để tránh lỗi TS2345
    const voucherId = req.params.voucherId as string;

    await voucherService.deleteVoucher(voucherId);

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Xóa voucher thành công!'
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi xóa voucher',
      error: error.message
    });
  }
};