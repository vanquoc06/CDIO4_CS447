// src/services/product.service.ts
import prisma from '../config/database';

// Lấy danh sách tất cả sản phẩm (kèm theo các biến thể của nó)
export const getAllProducts = async () => {
  return await prisma.products.findMany({
    where: { is_deleted: false }, // Chỉ lấy các sản phẩm chưa bị xóa mềm
    include: {
      Product_Variants: true // Kéo theo cả bảng Product_Variants
    }
  });
};

// Tạo một sản phẩm mới kèm các biến thể (SKU, Màu, Size)
export const createProduct = async (productData: any) => {
  const newProduct = await prisma.products.create({
    data: {
      name: productData.name,
      description: productData.description,
      base_price: productData.base_price,
      // Tạo luôn các biến thể (variants) cùng lúc với việc tạo Product
      Product_Variants: {
        create: productData.variants 
      }
    },
    include: {
      Product_Variants: true
    }
  });

  return newProduct;
};