import prisma from "../utils/prisma";

export const taskRepository = {
  create: (data: any) => prisma.task.create({ data }),
  findAll: () =>
    prisma.task.findMany({
      include: { creator: true, assignee: true }
    }),
  findById: (id: string) =>
    prisma.task.findUnique({ where: { id } }),
  update: (id: string, data: any) =>
    prisma.task.update({ where: { id }, data }),
  delete: (id: string) =>
    prisma.task.delete({ where: { id } }),
};
