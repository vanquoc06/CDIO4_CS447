// src/controllers/cart.controller.ts
import { Request, Response } from 'express';
import * as cartService from '../services/cart.service';

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.user_id;
    const sessionId = req.query.sessionId as string;

    const cart = await cartService.getOrCreateCart(userId, sessionId);

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: cart
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi lấy giỏ hàng',
      error: error.message
    });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { cartId, variantId, quantity } = req.body;

    if (!cartId || !variantId || !quantity) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vui lòng cung cấp cartId, variantId và số lượng'
      });
    }

    const item = await cartService.addToCart(cartId, variantId, quantity);

    return res.status(201).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Thêm vào giỏ hàng thành công!',
      data: item
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi thêm vào giỏ hàng',
      error: error.message
    });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để sửa lỗi TS2345
    const cartItemId = req.params.cartItemId as string; 

    await cartService.removeFromCart(cartItemId);

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Xóa khỏi giỏ hàng thành công!'
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi xóa khỏi giỏ hàng',
      error: error.message
    });
  }
};

export const updateQuantity = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để sửa lỗi TS2345
    const cartItemId = req.params.cartItemId as string; 
    const { quantity } = req.body;

    if (!quantity || quantity < 0) {
      return res.status(400).json({
        status: 'fail',
        message: 'Số lượng phải lớn hơn 0'
      });
    }

    const item = await cartService.updateCartItemQuantity(cartItemId, quantity);

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Cập nhật số lượng thành công!',
      data: item
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi cập nhật số lượng',
      error: error.message
    });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để sửa lỗi TS2345
    const cartId = req.params.cartId as string; 

    const cart = await cartService.clearCart(cartId);

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Xóa giỏ hàng thành công!',
      data: cart
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi xóa giỏ hàng',
      error: error.message
    });
  }
};