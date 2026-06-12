// src/services/user.service.ts
import prisma from '../config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 1. Lấy danh sách người dùng
export const getAllUsers = async () => {
  const users = await prisma.users.findMany({
    select: {
      user_id: true,
      email: true,
      full_name: true,
      created_at: true,
    }
  });
  return users;
};

// 2. Đăng ký tài khoản
export const createUser = async (userData: any) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const newUser = await prisma.users.create({
    data: {
      email: userData.email,
      password_hash: hashedPassword, 
      full_name: userData.full_name,
      phone_number: userData.phone_number,
    },
    select: {
      user_id: true,
      email: true,
      full_name: true
    }
  });

  return newUser;
};

// 3. Đăng nhập (MỚI THÊM)
export const loginUser = async (loginData: any) => {
  // Tìm kiếm email trong DB
  const user = await prisma.users.findUnique({
    where: { email: loginData.email }
  });

  if (!user) {
    throw new Error('Email không tồn tại trong hệ thống!');
  }

  // So sánh mật khẩu
  const isPasswordMatch = await bcrypt.compare(loginData.password, user.password_hash);
  
  if (!isPasswordMatch) {
    throw new Error('Mật khẩu không chính xác!');
  }

  // Tạo JWT Token
  const token = jwt.sign(
    { user_id: user.user_id },
    process.env.JWT_SECRET as string,
    { expiresIn: '1d' } // Token sống được 1 ngày
  );

  return {
    user: {
      user_id: user.user_id,
      email: user.email,
      full_name: user.full_name
    },
    token: token
  };
};