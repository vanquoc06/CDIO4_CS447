// src/services/role.service.ts
import prisma from '../config/database';

export const getAllRoles = async () => {
  const roles = await prisma.roles.findMany();
  return roles;
};

export const getRoleById = async (roleId: number) => {
  const role = await prisma.roles.findUnique({
    where: { role_id: roleId },
    include: {
      User_Roles: {
        include: {
          Users: {
            select: {
              user_id: true,
              email: true,
              full_name: true
            }
          }
        }
      }
    }
  });
  return role;
};

export const getRoleByName = async (roleName: string) => {
  const role = await prisma.roles.findUnique({
    where: { role_name: roleName }
  });
  return role;
};

export const createRole = async (roleName: string) => {
  const role = await prisma.roles.create({
    data: { role_name: roleName }
  });
  return role;
};

export const assignRoleToUser = async (userId: string, roleId: number) => {
  // Check if already has role
  const existing = await prisma.user_Roles.findUnique({
    where: {
      user_id_role_id: {
        user_id: userId,
        role_id: roleId
      }
    }
  });

  if (existing) {
    throw new Error('User already has this role');
  }

  const userRole = await prisma.user_Roles.create({
    data: {
      user_id: userId,
      role_id: roleId
    }
  });

  return userRole;
};

export const removeRoleFromUser = async (userId: string, roleId: number) => {
  const userRole = await prisma.user_Roles.delete({
    where: {
      user_id_role_id: {
        user_id: userId,
        role_id: roleId
      }
    }
  });

  return userRole;
};

export const getUserRoles = async (userId: string) => {
  const userRoles = await prisma.user_Roles.findMany({
    where: { user_id: userId },
    include: { Roles: true }
  });

  return userRoles.map((ur: any) => ur.Roles);
};

export const checkUserRole = async (userId: string, roleName: string): Promise<boolean> => {
  const role = await getRoleByName(roleName);

  if (!role) {
    return false;
  }

  const userRole = await prisma.user_Roles.findUnique({
    where: {
      user_id_role_id: {
        user_id: userId,
        role_id: role.role_id
      }
    }
  });

  return !!userRole;
};

export const isAdmin = async (userId: string): Promise<boolean> => {
  return await checkUserRole(userId, 'admin');
};

export const isModerator = async (userId: string): Promise<boolean> => {
  return await checkUserRole(userId, 'moderator');
};
