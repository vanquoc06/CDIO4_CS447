// src/routes/user.routes.ts
import { Router } from 'express';
import { getUsers, createUser, loginUser } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import { validateUserInput } from '../middlewares/validation.middleware';

const router = Router();

// Route 1: Lấy danh sách người dùng (có token)
router.get('/', verifyToken, getUsers);

// Route 2: Đăng ký tài khoản mới (với validation)
router.post('/', validateUserInput, createUser);

// Route 3: Đăng nhập (với validation)
router.post('/login', validateUserInput, loginUser);

export default router;