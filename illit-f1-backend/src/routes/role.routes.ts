import { Router } from 'express';
import { getRoles, getRoleById, createRole, assignRole, removeRole, getUserRoles } from '../controllers/role.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getRoles);
router.get('/user/:userId', getUserRoles);
router.get('/:roleId', getRoleById);

router.post('/', verifyToken, createRole);
router.post('/assign', verifyToken, assignRole);
router.post('/remove', verifyToken, removeRole);

export default router;