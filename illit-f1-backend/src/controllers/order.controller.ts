// src/controllers/order.controller.ts
import { Request, Response } from 'express';
import * as orderService from '../services/order.service';

export const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.user_id;
    const orders = await orderService.getAllOrders(userId);

    res.status(200).json({
      status: 'success',
      data: orders,
      count: orders.length
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách đơn hàng',
      error: error.message
    });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOrderById(orderId);

    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: 'Đơn hàng không tồn tại'
      });
    }

    res.status(200).json({
      status: 'success',
      data: order
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy chi tiết đơn hàng',
      error: error.message
    });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { total_amount, shipping_address, items, guest_email, guest_phone } = req.body;
    const userId = (req as any).user?.user_id;

    if (!total_amount || !shipping_address || !items || items.length === 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vui lòng cung cấp đầy đủ thông tin: tổng tiền, địa chỉ giao hàng và sản phẩm'
      });
    }

    const newOrder = await orderService.createOrder({
      user_id: userId,
      guest_email,
      guest_phone,
      total_amount,
      shipping_address,
      items
    });

    res.status(201).json({
      status: 'success',
      message: 'Tạo đơn hàng thành công!',
      data: newOrder
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server khi tạo đơn hàng',
      error: error.message
    });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vui lòng cung cấp trạng thái đơn hàng'
      });
    }

    const order = await orderService.updateOrderStatus(orderId, status);

    res.status(200).json({
      status: 'success',
      message: 'Cập nhật trạng thái đơn hàng thành công!',
      data: order
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server khi cập nhật đơn hàng',
      error: error.message
    });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    await orderService.deleteOrder(orderId);

    res.status(200).json({
      status: 'success',
      message: 'Xóa đơn hàng thành công!'
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server khi xóa đơn hàng',
      error: error.message
    });
  }
};
