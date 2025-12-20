// src/services/task.service.ts
import { taskRepository } from "../repositories/task.repository";
import { getIO } from "../socket/socket";

export const taskService = {
  async createTask(userId: string, data: any) {
    const task = await taskRepository.create({
      ...data,
      creatorId: userId,
      dueDate: new Date(data.dueDate),
    });

    const io = getIO();
    io.emit("taskCreated", task);

    io.to(data.assignedToId).emit("taskAssigned", {
      message: "You have been assigned a new task",
      task,
    });

    return task;
  },

  async deleteTask(taskId: string, userId: string) {
    const task = await taskRepository.findById(taskId);
    if (!task) throw new Error("Task not found");
    if (task.creatorId !== userId) throw new Error("Only creator can delete task");
    await taskRepository.delete(taskId);
  },

  async updateTask(taskId: string, userId: string, data: any) {
    const task = await taskRepository.findById(taskId);
    if (!task) throw new Error("Task not found");

    const updatedTask = await taskRepository.update(taskId, data);

    const io = getIO();
    io.emit("taskUpdated", updatedTask);

    if (data.assignedToId && data.assignedToId !== task.assignedToId) {
      io.to(data.assignedToId).emit("taskAssigned", {
        message: "You have been assigned a task",
        task: updatedTask,
      });
    }

    return updatedTask;
  },

  // ✅ Add this method
  async getAllTasks() {
    return taskRepository.findAll(); // make sure your repository has findAll()
  },
};
