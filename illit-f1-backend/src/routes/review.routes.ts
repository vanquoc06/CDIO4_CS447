// src/routes/review.routes.ts
import { Router } from 'express';
import {
  getProductReviews,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/review.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// GET đánh giá của sản phẩm (không cần token)
router.get('/product/:productId', getProductReviews);

// GET đánh giá của user (cần token)
router.get('/my-reviews', verifyToken, getMyReviews);

// POST tạo đánh giá (cần token)
router.post('/', verifyToken, createReview);

// PUT cập nhật đánh giá (cần token)
router.put('/:reviewId', verifyToken, updateReview);

// DELETE xóa đánh giá (cần token)
router.delete('/:reviewId', verifyToken, deleteReview);

export default router;
