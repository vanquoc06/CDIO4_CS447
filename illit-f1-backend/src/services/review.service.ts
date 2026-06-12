// src/services/review.service.ts
import prisma from '../config/database';

export const getReviewsByProduct = async (productId: string) => {
  const reviews = await prisma.product_Reviews.findMany({
    where: {
      product_id: productId,
      is_approved: true
    },
    include: {
      Users: {
        select: {
          full_name: true,
          user_id: true
        }
      }
    },
    orderBy: { created_at: 'desc' }
  });
  return reviews;
};

export const getReviewById = async (reviewId: string) => {
  const review = await prisma.product_Reviews.findUnique({
    where: { review_id: reviewId },
    include: {
      Users: true,
      Products: true
    }
  });
  return review;
};

export const getUserReviews = async (userId: string) => {
  const reviews = await prisma.product_Reviews.findMany({
    where: { user_id: userId },
    include: {
      Products: {
        select: { name: true }
      }
    },
    orderBy: { created_at: 'desc' }
  });
  return reviews;
};

export const createReview = async (reviewData: any) => {
  const review = await prisma.product_Reviews.create({
    data: {
      product_id: reviewData.product_id,
      user_id: reviewData.user_id,
      rating: reviewData.rating,
      comment: reviewData.comment,
      image_url: reviewData.image_url,
      is_approved: false
    }
  });
  return review;
};

export const updateReview = async (reviewId: string, reviewData: any) => {
  const review = await prisma.product_Reviews.update({
    where: { review_id: reviewId },
    data: {
      rating: reviewData.rating,
      comment: reviewData.comment,
      image_url: reviewData.image_url
    }
  });
  return review;
};

export const approveReview = async (reviewId: string) => {
  const review = await prisma.product_Reviews.update({
    where: { review_id: reviewId },
    data: { is_approved: true }
  });
  return review;
};

export const deleteReview = async (reviewId: string) => {
  const review = await prisma.product_Reviews.delete({
    where: { review_id: reviewId }
  });
  return review;
};

export const getAverageRating = async (productId: string) => {
  const result = await prisma.product_Reviews.aggregate({
    where: {
      product_id: productId,
      is_approved: true
    },
    _avg: {
      rating: true
    },
    _count: {
      review_id: true
    }
  });
  return {
    averageRating: result._avg.rating || 0,
    totalReviews: result._count.review_id
  };
};
