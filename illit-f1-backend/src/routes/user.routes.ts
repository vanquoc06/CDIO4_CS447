// src/routes/user.routes.ts
import { Router } from 'express';
import { getUsers, createUser, loginUser } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', verifyToken, getUsers); 

// Route 1: Lấy danh sách (GET http://localhost:8080/api/users)
router.get('/', getUsers);

// Route 2: Đăng ký (POST http://localhost:8080/api/users)
router.post('/', createUser); 

// Route 3: Đăng nhập (POST http://localhost:8080/api/users/login)
router.post('/login', loginUser); 

export default router;