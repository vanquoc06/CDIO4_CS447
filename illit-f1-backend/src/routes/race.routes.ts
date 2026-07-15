// src/routes/race.routes.ts
import { Router } from 'express';
import {
  getRaces,
  getRaceById,
  getDrivers,
  getDriverById,
  getTeams,
  getTeamById,
  getStandings,
  getNews,
  getNewsById,
  getAwards
} from '../controllers/race.controller';

const router = Router();

// GET giải đua
router.get('/races', getRaces);
router.get('/races/:raceId', getRaceById);

// GET tài xế
router.get('/drivers', getDrivers);
router.get('/drivers/:driverId', getDriverById);

// GET đội
router.get('/teams', getTeams);
router.get('/teams/:teamId', getTeamById);

// GET bảng xếp hạng
router.get('/standings', getStandings);

// GET tin tức
router.get('/news', getNews);
router.get('/news/:newsId', getNewsById);

// GET giải thưởng
router.get('/awards', getAwards);

export default router;
