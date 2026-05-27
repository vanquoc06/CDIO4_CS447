// src/services/voucher.service.ts
import prisma from '../config/database';
import { Decimal } from '@prisma/client/runtime/library';

export const getAllVouchers = async () => {
  const vouchers = await prisma.vouchers.findMany({
    where: { is_active: true },
    orderBy: { valid_from: 'desc' }
  });
  return vouchers;
};

export const getVoucherByCode = async (code: string) => {
  const voucher = await prisma.vouchers.findUnique({
    where: { code }
  });
  return voucher;
};

export const validateVoucher = async (code: string, orderValue: number) => {
  const voucher = await prisma.vouchers.findUnique({
    where: { code }
  });

  if (!voucher) {
    throw new Error('Mã voucher không tồn tại');
  }

  if (!voucher.is_active) {
    throw new Error('Mã voucher đã hết hiệu lực');
  }

  const now = new Date();
  if (voucher.valid_from && new Date(voucher.valid_from) > now) {
    throw new Error('Mã voucher chưa có hiệu lực');
  }

  if (voucher.valid_until && new Date(voucher.valid_until) < now) {
    throw new Error('Mã voucher đã hết hiệu lực');
  }

  if (voucher.min_order_value && orderValue < voucher.min_order_value.toNumber()) {
    throw new Error(`Giá trị đơn hàng tối thiểu: ${voucher.min_order_value}`);
  }

  return voucher;
};

export const calculateDiscount = async (code: string, orderValue: number) => {
  const voucher = await validateVoucher(code, orderValue);

  let discount = 0;
  if (voucher.discount_percent) {
    discount = (orderValue * voucher.discount_percent.toNumber()) / 100;
  } else if (voucher.discount_amount) {
    discount = voucher.discount_amount.toNumber();
  }

  return {
    voucher,
    discount,
    finalAmount: Math.max(0, orderValue - discount)
  };
};

export const createVoucher = async (voucherData: any) => {
  const voucher = await prisma.vouchers.create({
    data: {
      code: voucherData.code,
      discount_percent: voucherData.discount_percent ? new Decimal(voucherData.discount_percent) : null,
      discount_amount: voucherData.discount_amount ? new Decimal(voucherData.discount_amount) : null,
      min_order_value: voucherData.min_order_value ? new Decimal(voucherData.min_order_value) : null,
      max_usage: voucherData.max_usage,
      valid_from: voucherData.valid_from,
      valid_until: voucherData.valid_until,
      is_active: voucherData.is_active !== false
    }
  });
  return voucher;
};

export const updateVoucher = async (voucherId: string, voucherData: any) => {
  const voucher = await prisma.vouchers.update({
    where: { voucher_id: voucherId },
    data: voucherData
  });
  return voucher;
};

export const deleteVoucher = async (voucherId: string) => {
  const voucher = await prisma.vouchers.delete({
    where: { voucher_id: voucherId }
  });
  return voucher;
};
