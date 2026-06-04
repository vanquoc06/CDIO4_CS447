// src/services/race.service.ts
import prisma from '../config/database';

export const getAllRaces = async () => {
  const races = await prisma.race_Schedules.findMany({
    include: {
      Race_Results: {
        include: {
          Drivers: true,
          Teams: true
        },
        orderBy: { position: 'asc' }
      }
    },
    orderBy: { race_date: 'desc' }
  });
  return races;
};

export const getRaceById = async (raceId: string) => {
  const race = await prisma.race_Schedules.findUnique({
    where: { race_id: raceId },
    include: {
      Race_Results: {
        include: {
          Drivers: true,
          Teams: true
        },
        orderBy: { position: 'asc' }
      }
    }
  });
  return race;
};

export const getAllDrivers = async () => {
  const drivers = await prisma.drivers.findMany({
    where: { is_deleted: false },
    include: {
      Race_Results: true
    },
    orderBy: { first_name: 'asc' }
  });
  return drivers;
};

export const getDriverById = async (driverId: string) => {
  const driver = await prisma.drivers.findUnique({
    where: { driver_id: driverId },
    include: {
      Race_Results: {
        include: {
          Race_Schedules: true,
          Teams: true
        }
      }
    }
  });
  return driver;
};

export const getAllTeams = async () => {
  const teams = await prisma.teams.findMany({
    where: { is_deleted: false },
    include: {
      Race_Results: true
    },
    orderBy: { name: 'asc' }
  });
  return teams;
};

export const getTeamById = async (teamId: string) => {
  const team = await prisma.teams.findUnique({
    where: { team_id: teamId },
    include: {
      Race_Results: {
        include: {
          Drivers: true,
          Race_Schedules: true
        }
      }
    }
  });
  return team;
};

export const getStandings = async () => {
  const results = await prisma.race_Results.findMany({
    include: {
      Drivers: true,
      Teams: true
    }
  });

  const driverStandings = new Map();
  results.forEach(result => {
    const driverId = result.driver_id;
    if (!driverStandings.has(driverId)) {
      driverStandings.set(driverId, {
        driver: result.Drivers,
        totalPoints: 0,
        races: 0
      });
    }
    const current = driverStandings.get(driverId);
    current.totalPoints += result.points.toNumber();
    current.races += 1;
  });

  const standings = Array.from(driverStandings.values())
    .sort((a, b) => b.totalPoints - a.totalPoints);

  return standings;
};

export const createRace = async (raceData: any) => {
  const race = await prisma.race_Schedules.create({
    data: {
      race_name: raceData.race_name,
      circuit_name: raceData.circuit_name,
      country: raceData.country,
      race_date: new Date(raceData.race_date),
      total_laps: raceData.total_laps,
      circuit_length_km: raceData.circuit_length_km
    }
  });
  return race;
};
