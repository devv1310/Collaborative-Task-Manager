import { getIO } from "../socket/socket";
import { taskRepository } from "../repositories/task.repository";


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
  async deleteTask(taskId: string, userId: string): Promise<void> {
    const task = await taskRepository.findById(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    if (task.creatorId !== userId) {
      throw new Error("Unauthorized: only task creator can delete");
    }

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
};
