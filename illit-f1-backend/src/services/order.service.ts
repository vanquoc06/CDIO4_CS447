// src/services/order.service.ts
import prisma from '../config/database';
import { Decimal } from '@prisma/client/runtime/library';

export const getAllOrders = async (userId?: string) => {
  const orders = await prisma.orders.findMany({
    where: userId ? { user_id: userId } : {},
    include: {
      Order_Items: {
        include: {
          Product_Variants: true
        }
      }
    },
    orderBy: { created_at: 'desc' }
  });
  return orders;
};

export const getOrderById = async (orderId: string) => {
  const order = await prisma.orders.findUnique({
    where: { order_id: orderId },
    include: {
      Order_Items: {
        include: {
          Product_Variants: true
        }
      }
    }
  });
  return order;
};

export const createOrder = async (orderData: any) => {
  const order = await prisma.orders.create({
    data: {
      user_id: orderData.user_id,
      guest_email: orderData.guest_email,
      guest_phone: orderData.guest_phone,
      total_amount: new Decimal(orderData.total_amount),
      shipping_address: orderData.shipping_address,
      status: 'Pending',
      Order_Items: {
        create: orderData.items.map((item: any) => ({
          variant_id: item.variant_id,
          sku_code_snapshot: item.sku_code,
          product_name_snapshot: item.product_name,
          quantity: item.quantity,
          price_at_purchase: new Decimal(item.price)
        }))
      }
    },
    include: {
      Order_Items: true
    }
  });

  return order;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const order = await prisma.orders.update({
    where: { order_id: orderId },
    data: { status }
  });
  return order;
};

export const deleteOrder = async (orderId: string) => {
  // Xóa items trước rồi mới xóa order
  await prisma.order_Items.deleteMany({
    where: { order_id: orderId }
  });

  const order = await prisma.orders.delete({
    where: { order_id: orderId }
  });

  return order;
};
