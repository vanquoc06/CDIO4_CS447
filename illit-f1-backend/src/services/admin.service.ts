import prisma from '../config/database';

export const bootstrapAdminAccess = async (userId: string) => {
  const adminRole = await prisma.roles.findUnique({ where: { role_name: 'admin' } });

  if (!adminRole) {
    const createdRole = await prisma.roles.create({ data: { role_name: 'admin' } });
    await prisma.user_Roles.create({ data: { user_id: userId, role_id: createdRole.role_id } });
    return { role: createdRole }; 
  }

  const existingAssignment = await prisma.user_Roles.findUnique({
    where: { user_id_role_id: { user_id: userId, role_id: adminRole.role_id } }
  });

  if (!existingAssignment) {
    await prisma.user_Roles.create({ data: { user_id: userId, role_id: adminRole.role_id } });
  }

  return { role: adminRole };
};

export const getAdminDrivers = async () => {
  return prisma.drivers.findMany({
    where: { is_deleted: false },
    include: { Teams: true },
    orderBy: { first_name: 'asc' }
  });
};

export const createAdminDriver = async (driverData: any) => {
  return prisma.drivers.create({
    data: {
      first_name: driverData.first_name,
      last_name: driverData.last_name,
      nationality: driverData.nationality || null,
      dob: driverData.dob ? new Date(driverData.dob) : null,
      team_id: driverData.team_id || null
    },
    include: { Teams: true }
  });
};

export const updateAdminDriver = async (driverId: string, driverData: any) => {
  return prisma.drivers.update({
    where: { driver_id: driverId },
    data: {
      first_name: driverData.first_name,
      last_name: driverData.last_name,
      nationality: driverData.nationality || null,
      dob: driverData.dob ? new Date(driverData.dob) : null,
      team_id: driverData.team_id || null
    },
    include: { Teams: true }
  });
};

export const deleteAdminDriver = async (driverId: string) => {
  return prisma.drivers.update({
    where: { driver_id: driverId },
    data: { is_deleted: true }
  });
};

export const getAdminTeams = async () => {
  return prisma.teams.findMany({
    where: { is_deleted: false },
    include: { Drivers: true, Race_Results: true },
    orderBy: { name: 'asc' }
  });
};

export const createAdminTeam = async (teamData: any) => {
  return prisma.teams.create({
    data: {
      name: teamData.name,
      principal: teamData.principal || null,
      chassis: teamData.chassis || null,
      power_unit: teamData.power_unit || null
    },
    include: { Drivers: true }
  });
};

export const updateAdminTeam = async (teamId: string, teamData: any) => {
  return prisma.teams.update({
    where: { team_id: teamId },
    data: {
      name: teamData.name,
      principal: teamData.principal || null,
      chassis: teamData.chassis || null,
      power_unit: teamData.power_unit || null
    },
    include: { Drivers: true }
  });
};

export const deleteAdminTeam = async (teamId: string) => {
  return prisma.teams.update({
    where: { team_id: teamId },
    data: { is_deleted: true }
  });
};

export const getAdminNews = async () => {
  return prisma.news.findMany({
    orderBy: { created_at: 'desc' }
  });
};

export const createAdminNews = async (newsData: any) => {
  return prisma.news.create({
    data: {
      title: newsData.title,
      summary: newsData.summary || null,
      content: newsData.content,
      image_url: newsData.image_url || null
    }
  });
};

export const updateAdminNews = async (newsId: string, newsData: any) => {
  return prisma.news.update({
    where: { news_id: newsId },
    data: {
      title: newsData.title,
      summary: newsData.summary || null,
      content: newsData.content,
      image_url: newsData.image_url || null
    }
  });
};

export const deleteAdminNews = async (newsId: string) => {
  return prisma.news.delete({
    where: { news_id: newsId }
  });
};

export const createDefaultAdminUser = async () => {
  const bcrypt = require('bcrypt');

  // Create admin role if not exists
  let adminRole = await prisma.roles.findUnique({
    where: { role_name: 'admin' }
  });

  if (!adminRole) {
    adminRole = await prisma.roles.create({
      data: { role_name: 'admin' }
    });
  }

  // Check if admin user already exists
  const existingAdmin = await prisma.users.findUnique({
    where: { email: 'admin' }
  });

  if (existingAdmin) {
    const existingAssignment = await prisma.user_Roles.findUnique({
      where: { user_id_role_id: { user_id: existingAdmin.user_id, role_id: adminRole.role_id } }
    });

    if (!existingAssignment) {
      await prisma.user_Roles.create({ data: { user_id: existingAdmin.user_id, role_id: adminRole.role_id } });
    }

    return {
      exists: true,
      message: 'Admin account đã tồn tại',
      email: existingAdmin.email,
      user_id: existingAdmin.user_id,
      note: 'Đã cấp quyền admin nếu cần'
    };
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('123456789', 10);
  const adminUser = await prisma.users.create({
    data: {
      email: 'admin',
      password_hash: hashedPassword,
      full_name: 'Admin',
      status: 'active'
    }
  });

  // Assign admin role to user
  await prisma.user_Roles.create({
    data: {
      user_id: adminUser.user_id,
      role_id: adminRole.role_id
    }
  });

  return {
    exists: false,
    message: 'Admin account đã được tạo thành công',
    email: adminUser.email,
    password: '123456789',
    user_id: adminUser.user_id,
    note: 'Sử dụng ngay rồi đổi mật khẩu nếu cần'
  };
};
