// src/services/review.service.ts
import prisma from '../config/database';

type ReviewInput = {
  product_id: string;
  user_id: string | null;
  rating: number;
  comment?: string;
  image_url?: string;
};

const notImplemented = async (): Promise<any> => {
  throw new Error('Review feature is not available with the current database schema.');
};

export const getReviewsByProduct = async (productId: string): Promise<any> => notImplemented();
export const getReviewById = async (reviewId: string): Promise<any> => notImplemented();
export const getUserReviews = async (userId: string): Promise<any> => notImplemented();
export const createReview = async (reviewData: ReviewInput): Promise<any> => notImplemented();
export const updateReview = async (reviewId: string, reviewData: Partial<ReviewInput>): Promise<any> => notImplemented();
export const approveReview = async (reviewId: string): Promise<any> => notImplemented();
export const deleteReview = async (reviewId: string): Promise<any> => notImplemented();
export const getAverageRating = async (productId: string): Promise<any> => notImplemented();
