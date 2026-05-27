// src/routes/order.routes.ts
import { Router } from 'express';
import { getOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder } from '../controllers/order.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// GET tất cả đơn hàng của user (cần token)
router.get('/', verifyToken, getOrders);

// GET chi tiết 1 đơn hàng (cần token)
router.get('/:orderId', verifyToken, getOrderById);

// POST tạo đơn hàng mới (cần token)
router.post('/', verifyToken, createOrder);

// PUT cập nhật trạng thái (cần token)
router.put('/:orderId', verifyToken, updateOrderStatus);

// DELETE xóa đơn hàng (cần token)
router.delete('/:orderId', verifyToken, deleteOrder);

export default router;
