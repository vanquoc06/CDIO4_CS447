import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware';
import { checkAdmin } from '../middlewares/admin.middleware';
import {
  bootstrapAdminAccess,
  createDefaultAdmin,
  getAdminDrivers,
  createAdminDriver,
  updateAdminDriver,
  deleteAdminDriver,
  getAdminTeams,
  createAdminTeam,
  updateAdminTeam,
  deleteAdminTeam,
  getAdminNews,
  createAdminNews,
  updateAdminNews,
  deleteAdminNews
} from '../controllers/admin.controller';

const router = Router();

router.post('/create-default-admin', createDefaultAdmin);
router.post('/bootstrap', verifyToken, bootstrapAdminAccess);
router.get('/drivers', verifyToken, checkAdmin, getAdminDrivers);
router.post('/drivers', verifyToken, checkAdmin, createAdminDriver);
router.put('/drivers/:driverId', verifyToken, checkAdmin, updateAdminDriver);
router.delete('/drivers/:driverId', verifyToken, checkAdmin, deleteAdminDriver);

router.get('/teams', verifyToken, checkAdmin, getAdminTeams);
router.post('/teams', verifyToken, checkAdmin, createAdminTeam);
router.put('/teams/:teamId', verifyToken, checkAdmin, updateAdminTeam);
router.delete('/teams/:teamId', verifyToken, checkAdmin, deleteAdminTeam);

router.get('/news', verifyToken, checkAdmin, getAdminNews);
router.post('/news', verifyToken, checkAdmin, createAdminNews);
router.put('/news/:newsId', verifyToken, checkAdmin, updateAdminNews);
router.delete('/news/:newsId', verifyToken, checkAdmin, deleteAdminNews);

export default router;
