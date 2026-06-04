// src/services/cart.service.ts
import prisma from '../config/database';

export const getOrCreateCart = async (userId?: string, sessionId?: string) => {
  const cart = await prisma.carts.findFirst({
    where: userId ? { user_id: userId } : { session_id: sessionId },
    include: { Cart_Items: { include: { Product_Variants: true } } }
  });

  if (!cart) {
    const newCart = await prisma.carts.create({
      data: {
        user_id: userId,
        session_id: sessionId
      },
      include: { Cart_Items: { include: { Product_Variants: true } } }
    });
    return newCart;
  }

  return cart;
};

export const getCartById = async (cartId: string) => {
  const cart = await prisma.carts.findUnique({
    where: { cart_id: cartId },
    include: { Cart_Items: { include: { Product_Variants: true } } }
  });
  return cart;
};

export const addToCart = async (cartId: string, variantId: string, quantity: number) => {
  const existingItem = await prisma.cart_Items.findFirst({
    where: { cart_id: cartId, variant_id: variantId }
  });

  if (existingItem) {
    // Nếu đã có, tăng số lượng
    const updatedItem = await prisma.cart_Items.update({
      where: { cart_item_id: existingItem.cart_item_id },
      data: { quantity: existingItem.quantity + quantity }
    });
    return updatedItem;
  }

  // Nếu chưa có, tạo mới
  const newItem = await prisma.cart_Items.create({
    data: {
      cart_id: cartId,
      variant_id: variantId,
      quantity
    }
  });
  return newItem;
};

export const removeFromCart = async (cartItemId: string) => {
  const item = await prisma.cart_Items.delete({
    where: { cart_item_id: cartItemId }
  });
  return item;
};

export const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
  if (quantity <= 0) {
    return await removeFromCart(cartItemId);
  }

  const item = await prisma.cart_Items.update({
    where: { cart_item_id: cartItemId },
    data: { quantity }
  });
  return item;
};

export const clearCart = async (cartId: string) => {
  await prisma.cart_Items.deleteMany({
    where: { cart_id: cartId }
  });

  const cart = await getCartById(cartId);
  return cart;
};
