// src/controllers/product.controller.ts
import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: products,
      count: products.length
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi lấy danh sách sản phẩm',
      error: error.message
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productService.createProduct(req.body);

    return res.status(201).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Thêm sản phẩm thành công!',
      data: newProduct
    });
  } catch (error: any) {
    // Bắt lỗi trùng mã SKU (Unique constraint)
    if (error.code === 'P2002') {
      return res.status(400).json({
        status: 'fail',
        message: 'Mã SKU của biến thể đã tồn tại trong hệ thống!'
      });
    }
    
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return ở đây để sửa dứt điểm lỗi TS7030
      status: 'error',
      message: 'Lỗi server khi tạo sản phẩm',
      error: error.message
    });
  }
};