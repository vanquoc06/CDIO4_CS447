// src/controllers/review.controller.ts
import { Request, Response } from 'express';
import * as reviewService from '../services/review.service';

export const getProductReviews = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để tránh lỗi TS2345
    const productId = req.params.productId as string; 
    const reviews = await reviewService.getReviewsByProduct(productId);
    const rating = await reviewService.getAverageRating(productId);

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: reviews,
      rating,
      count: reviews.length
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi lấy danh sách đánh giá',
      error: error.message
    });
  }
};

export const getMyReviews = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.user_id;
    const reviews = await reviewService.getUserReviews(userId);

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      data: reviews,
      count: reviews.length
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi lấy danh sách đánh giá của bạn',
      error: error.message
    });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const { product_id, rating, comment, image_url } = req.body;
    const userId = (req as any).user?.user_id;

    if (!product_id || !rating) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vui lòng cung cấp product_id và rating'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        status: 'fail',
        message: 'Rating phải từ 1 đến 5'
      });
    }

    const review = await reviewService.createReview({
      product_id,
      user_id: userId,
      rating,
      comment,
      image_url
    });

    return res.status(201).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Tạo đánh giá thành công! Admin sẽ duyệt đánh giá của bạn.',
      data: review
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi tạo đánh giá',
      error: error.message
    });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để tránh lỗi TS2345
    const reviewId = req.params.reviewId as string; 
    const { rating, comment, image_url } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Rating phải từ 1 đến 5'
      });
    }

    const review = await reviewService.updateReview(reviewId, {
      rating,
      comment,
      image_url
    });

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Cập nhật đánh giá thành công!',
      data: review
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi cập nhật đánh giá',
      error: error.message
    });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    // ✨ ĐÃ SỬA: Ép kiểu 'as string' để tránh lỗi TS2345
    const reviewId = req.params.reviewId as string; 
    await reviewService.deleteReview(reviewId);

    return res.status(200).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'success',
      message: 'Xóa đánh giá thành công!'
    });
  } catch (error: any) {
    return res.status(500).json({ // ✨ ĐÃ SỬA: Thêm return
      status: 'error',
      message: 'Lỗi khi xóa đánh giá',
      error: error.message
    });
  }
};