import prisma from "../utils/prisma";

export const userRepository = {
  create: (data: any) => prisma.user.create({ data }),
  findByEmail: (email: string) =>
    prisma.user.findUnique({ where: { email } }),
  findById: (id: string) =>
    prisma.user.findUnique({ where: { id } }),
  update: (id: string, data: any) =>
    prisma.user.update({ where: { id }, data }),
};
