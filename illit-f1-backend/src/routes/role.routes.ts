// src/routes/role.routes.ts
import { Router } from 'express';
import { getRoles, getRoleById, createRole, assignRole, removeRole, getUserRoles } from '../controllers/role.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// GET tất cả roles (public)
router.get('/', getRoles);

// GET chi tiết role
router.get('/:roleId', getRoleById);

// GET roles của user
router.get('/user/:userId', getUserRoles);

// Admin only operations (với token)
router.post('/', verifyToken, createRole);
router.post('/assign', verifyToken, assignRole);
router.post('/remove', verifyToken, removeRole);

export default router;
