// src/services/race.service.ts
import prisma from '../config/database';

const withFallback = async <T>(operation: () => Promise<T>, fallback: T): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.warn('Using fallback F1 data because the database is unavailable:', error);
    return fallback;
  }
};

const fallbackRaces = [
  {
    race_id: 'fallback-race-1',
    race_name: 'Monaco Grand Prix',
    circuit_name: 'Circuit de Monaco',
    country: 'Monaco',
    race_date: '2026-05-24T00:00:00.000Z',
    total_laps: 78,
    circuit_length_km: 3.337,
    Race_Results: [
      {
        position: 1,
        time_or_status: '1:48:51.980',
        Drivers: { driver_id: 'd1', first_name: 'Max', last_name: 'Verstappen', nationality: 'Netherlands' },
        Teams: { team_id: 't1', name: 'Red Bull Racing' }
      }
    ]
  },
  {
    race_id: 'fallback-race-2',
    race_name: 'British Grand Prix',
    circuit_name: 'Silverstone Circuit',
    country: 'United Kingdom',
    race_date: '2026-07-05T00:00:00.000Z',
    total_laps: 52,
    circuit_length_km: 5.891,
    Race_Results: [
      {
        position: 1,
        time_or_status: '1:30:27.325',
        Drivers: { driver_id: 'd2', first_name: 'Lando', last_name: 'Norris', nationality: 'United Kingdom' },
        Teams: { team_id: 't2', name: 'McLaren' }
      }
    ]
  }
];

const fallbackDrivers = [
  {
    driver_id: 'd1',
    first_name: 'Max',
    last_name: 'Verstappen',
    nationality: 'Netherlands',
    Teams: { team_id: 't1', name: 'Red Bull Racing' },
    Race_Results: [{ position: 1, points: 25 }]
  },
  {
    driver_id: 'd2',
    first_name: 'Lando',
    last_name: 'Norris',
    nationality: 'United Kingdom',
    Teams: { team_id: 't2', name: 'McLaren' },
    Race_Results: [{ position: 2, points: 18 }]
  },
  {
    driver_id: 'd3',
    first_name: 'Oscar',
    last_name: 'Piastri',
    nationality: 'Australia',
    Teams: { team_id: 't2', name: 'McLaren' },
    Race_Results: [{ position: 3, points: 15 }]
  }
];

const fallbackTeams = [
  {
    team_id: 't1',
    name: 'Red Bull Racing',
    chassis: 'RB21',
    power_unit: 'Honda RBPT',
    Drivers: [{ first_name: 'Max', last_name: 'Verstappen' }],
    Race_Results: [{ position: 1 }]
  },
  {
    team_id: 't2',
    name: 'McLaren',
    chassis: 'MCL39',
    power_unit: 'Mercedes',
    Drivers: [{ first_name: 'Lando', last_name: 'Norris' }, { first_name: 'Oscar', last_name: 'Piastri' }],
    Race_Results: [{ position: 2 }]
  }
];

const fallbackStandings = {
  driverStandings: [
    { driver: { first_name: 'Max', last_name: 'Verstappen' }, team: { name: 'Red Bull Racing' }, totalPoints: 25, rank: 1 },
    { driver: { first_name: 'Lando', last_name: 'Norris' }, team: { name: 'McLaren' }, totalPoints: 18, rank: 2 },
    { driver: { first_name: 'Oscar', last_name: 'Piastri' }, team: { name: 'McLaren' }, totalPoints: 15, rank: 3 }
  ],
  teamStandings: [
    { team: { name: 'Red Bull Racing' }, totalPoints: 25, wins: 1, podiums: 1, rank: 1 },
    { team: { name: 'McLaren' }, totalPoints: 33, wins: 0, podiums: 2, rank: 2 }
  ]
};

const fallbackNews = [
  {
    news_id: 'news-1',
    title: 'Monaco upgrade package boosts straight-line speed',
    summary: 'Phân tích',
    content: 'Các đội đã mang theo gói nâng cấp mới cho chặng Monaco.',
    image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    created_at: new Date().toISOString()
  },
  {
    news_id: 'news-2',
    title: 'McLaren nhắm mục tiêu chiến thắng tại Silverstone',
    summary: 'Kỹ thuật',
    content: 'McLaren đang tối ưu hóa hiệu năng cho đường đua tốc độ cao.',
    image_url: 'https://images.unsplash.com/photo-1516789592301-37e2d194bd1f?w=800',
    created_at: new Date().toISOString()
  }
];

const fallbackAwards = [
  {
    award_id: 'award-1',
    award_name: 'Tài xế của tuần',
    description: 'Max Verstappen giành chiến thắng tại Monaco',
    Drivers: { first_name: 'Max', last_name: 'Verstappen' },
    Teams: { name: 'Red Bull Racing' }
  }
];

export const getAllRaces = async () => withFallback(async () => {
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
}, fallbackRaces as any);

export const getRaceById = async (raceId: string) => withFallback(async () => {
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
}, fallbackRaces.find((race) => race.race_id === raceId) as any);

export const getAllDrivers = async () => withFallback(async () => {
  const drivers = await prisma.drivers.findMany({
    where: { is_deleted: false },
    include: {
      Teams: true,
      Race_Results: true
    },
    orderBy: { first_name: 'asc' }
  });
  return drivers;
}, fallbackDrivers as any);

export const getDriverById = async (driverId: string) => withFallback(async () => {
  const driver = await prisma.drivers.findUnique({
    where: { driver_id: driverId },
    include: {
      Teams: true,
      Race_Results: {
        include: {
          Race_Schedules: true,
          Teams: true
        }
      }
    }
  });
  return driver;
}, fallbackDrivers.find((driver) => driver.driver_id === driverId) as any);

export const getAllTeams = async () => withFallback(async () => {
  const teams = await prisma.teams.findMany({
    where: { is_deleted: false },
    include: {
      Drivers: true,
      Race_Results: true
    },
    orderBy: { name: 'asc' }
  });
  return teams;
}, fallbackTeams as any);

export const getTeamById = async (teamId: string) => withFallback(async () => {
  const team = await prisma.teams.findUnique({
    where: { team_id: teamId },
    include: {
      Drivers: true,
      Race_Results: {
        include: {
          Drivers: true,
          Race_Schedules: true
        }
      }
    }
  });
  return team;
}, fallbackTeams.find((team) => team.team_id === teamId) as any);

export const getStandings = async () => withFallback(async () => {
  const results = await prisma.race_Results.findMany({
    include: {
      Drivers: true,
      Teams: true
    }
  });

  const driverStandingsMap = new Map();
  const teamStandingsMap = new Map();

  results.forEach((result: any) => {
    const driverId = result.driver_id;
    if (!driverStandingsMap.has(driverId)) {
      driverStandingsMap.set(driverId, {
        driver: result.Drivers,
        team: result.Teams,
        totalPoints: 0,
        races: 0
      });
    }

    const driverStanding = driverStandingsMap.get(driverId);
    driverStanding.totalPoints += result.points.toNumber();
    driverStanding.races += 1;

    const teamId = result.team_id;
    if (!teamStandingsMap.has(teamId)) {
      teamStandingsMap.set(teamId, {
        team: result.Teams,
        totalPoints: 0,
        wins: 0,
        podiums: 0,
        races: 0
      });
    }

    const teamStanding = teamStandingsMap.get(teamId);
    teamStanding.totalPoints += result.points.toNumber();
    teamStanding.races += 1;

    if (result.position === 1) teamStanding.wins += 1;
    if (result.position <= 3) teamStanding.podiums += 1;
  });

  const driverStandings = Array.from(driverStandingsMap.values())
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  const teamStandings = Array.from(teamStandingsMap.values())
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((item, index) => ({ ...item, rank: index + 1 }));

  return { driverStandings, teamStandings };
}, fallbackStandings as any);

export const getAllNews = async () => withFallback(async () => {
  const news = await prisma.news.findMany({
    orderBy: { created_at: 'desc' }
  });
  return news;
}, fallbackNews as any);

export const getNewsById = async (newsId: string) => withFallback(async () => {
  const news = await prisma.news.findUnique({
    where: { news_id: newsId }
  });
  return news;
}, fallbackNews.find((news) => news.news_id === newsId) as any);

export const getAllAwards = async () => withFallback(async () => {
  const awards = await prisma.awards.findMany({
    include: {
      Drivers: true,
      Teams: true
    },
    orderBy: { year: 'desc' }
  });
  return awards;
}, fallbackAwards as any);

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
