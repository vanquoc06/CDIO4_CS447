// src/routes/cart.routes.ts
import { Router } from 'express';
import { getCart, addToCart, removeFromCart, updateQuantity, clearCart } from '../controllers/cart.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// GET giỏ hàng (có thể dùng userId hoặc sessionId)
router.get('/', verifyToken, getCart);

// POST thêm vào giỏ
router.post('/items', verifyToken, addToCart);

// DELETE xóa khỏi giỏ
router.delete('/items/:cartItemId', verifyToken, removeFromCart);

// PUT cập nhật số lượng
router.put('/items/:cartItemId', verifyToken, updateQuantity);

// DELETE xóa hết giỏ
router.delete('/:cartId', verifyToken, clearCart);

export default router;
