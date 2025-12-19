import { Response } from "express";
import { taskService } from "../services/task.service";
import { CreateTaskDto, UpdateTaskDto } from "../dto/task.dto";
import { AuthRequest } from "../middlewares/auth.middleware";

export const taskController = {
  async create(req: AuthRequest, res: Response) {
    try {
      const data = CreateTaskDto.parse(req.body);
      const task = await taskService.createTask(req.user!.id, data);
      res.status(201).json(task);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

//   async getAll(_: AuthRequest, res: Response) {
//     const tasks = await taskService.getAllTasks();
//     res.json(tasks);
//   },

  async update(req: AuthRequest, res: Response) {
    try {
      const data = UpdateTaskDto.parse(req.body);
      const task = await taskService.updateTask(
        req.params.id,
        req.user!.id,
        data
      );
      res.json(task);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  async delete(req: AuthRequest, res: Response) {
    try {
      await taskService.deleteTask(req.params.id, req.user!.id);
      res.status(204).send();
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },
};
