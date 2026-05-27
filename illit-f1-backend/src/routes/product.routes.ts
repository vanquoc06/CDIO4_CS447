// src/routes/product.routes.ts
import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/product.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { validateProductInput } from '../middlewares/validation.middleware';

const router = Router();

// Khách hàng vãng lai cũng có thể xem danh sách sản phẩm (Không cần Token)
router.get('/', getProducts);

// CHỈ NGƯỜI ĐÃ ĐĂNG NHẬP mới được tạo sản phẩm (Cần Token + Validation)
router.post('/', verifyToken, validateProductInput, createProduct);

export default router;