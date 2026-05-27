// src/routes/voucher.routes.ts
import { Router } from 'express';
import { getVouchers, validateVoucher, createVoucher, updateVoucher, deleteVoucher } from '../controllers/voucher.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// GET danh sách voucher (không cần token)
router.get('/', getVouchers);

// POST validate voucher (không cần token)
router.post('/validate', validateVoucher);

// POST tạo voucher (chỉ admin - cần token)
router.post('/', verifyToken, createVoucher);

// PUT cập nhật voucher (chỉ admin - cần token)
router.put('/:voucherId', verifyToken, updateVoucher);

// DELETE xóa voucher (chỉ admin - cần token)
router.delete('/:voucherId', verifyToken, deleteVoucher);

export default router;
