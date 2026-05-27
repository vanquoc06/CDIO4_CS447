// src/controllers/product.controller.ts
import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({
      status: 'success',
      data: products,
      count: products.length
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách sản phẩm',
      error: error.message
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await productService.createProduct(req.body);

    res.status(201).json({
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
    res.status(500).json({
      status: 'error',
      message: 'Lỗi server khi tạo sản phẩm',
      error: error.message
    });
  }
};