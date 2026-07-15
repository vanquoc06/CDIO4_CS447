// src/controllers/race.controller.ts
import { Request, Response } from 'express';
import * as raceService from '../services/race.service';

export const getRaces = async (req: Request, res: Response) => {
  try {
    const races = await raceService.getAllRaces();

    return res.status(200).json({
      status: 'success',
      data: races,
      count: races.length
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách giải đua',
      error: error.message
    });
  }
};

export const getRaceById = async (req: Request, res: Response) => {
  try {
    const raceId = req.params.raceId as string;
    const race = await raceService.getRaceById(raceId);

    if (!race) {
      return res.status(404).json({
        status: 'fail',
        message: 'Giải đua không tồn tại'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: race
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy chi tiết giải đua',
      error: error.message
    });
  }
};

export const getDrivers = async (req: Request, res: Response) => {
  try {
    const drivers = await raceService.getAllDrivers();

    return res.status(200).json({
      status: 'success',
      data: drivers,
      count: drivers.length
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách tài xế',
      error: error.message
    });
  }
};

export const getDriverById = async (req: Request, res: Response) => {
  try {
    const driverId = req.params.driverId as string;
    const driver = await raceService.getDriverById(driverId);

    if (!driver) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tài xế không tồn tại'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: driver
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy chi tiết tài xế',
      error: error.message
    });
  }
};

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams = await raceService.getAllTeams();

    return res.status(200).json({
      status: 'success',
      data: teams,
      count: teams.length
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách đội',
      error: error.message
    });
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const teamId = req.params.teamId as string;
    const team = await raceService.getTeamById(teamId);

    if (!team) {
      return res.status(404).json({
        status: 'fail',
        message: 'Đội không tồn tại'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: team
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy chi tiết đội',
      error: error.message
    });
  }
};

export const getStandings = async (req: Request, res: Response) => {
  try {
    const standings = await raceService.getStandings();

    return res.status(200).json({
      status: 'success',
      data: standings,
      count: (standings.driverStandings?.length || 0) + (standings.teamStandings?.length || 0)
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy bảng xếp hạng',
      error: error.message
    });
  }
};

export const getNews = async (req: Request, res: Response) => {
  try {
    const news = await raceService.getAllNews();

    return res.status(200).json({
      status: 'success',
      data: news,
      count: news.length
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách tin tức',
      error: error.message
    });
  }
};

export const getNewsById = async (req: Request, res: Response) => {
  try {
    const newsId = req.params.newsId as string;
    const news = await raceService.getNewsById(newsId);

    if (!news) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tin tức không tồn tại'
      });
    }

    return res.status(200).json({
      status: 'success',
      data: news
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy chi tiết tin tức',
      error: error.message
    });
  }
};

export const getAwards = async (req: Request, res: Response) => {
  try {
    const awards = await raceService.getAllAwards();

    return res.status(200).json({
      status: 'success',
      data: awards,
      count: awards.length
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: 'Lỗi khi lấy danh sách giải thưởng',
      error: error.message
    });
  }
};