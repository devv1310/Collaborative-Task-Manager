import { taskService } from "../src/services/task.service";
import { getIO } from "../src/socket/socket";
import { describe, test, afterEach, expect } from "@jest/globals";
import { jest } from "@jest/globals";

jest.mock("../src/repositories/task.repository", () => {
  const { taskRepository } = require("./mocks/task.repository.mock");
  return { taskRepository };
});



const mockEmit = jest.fn();
const mockTo = jest.fn().mockReturnThis();

jest.mock("../src/socket/socket", () => ({
  getIO: jest.fn(() => ({
    emit: mockEmit,
    to: mockTo,
  })),
}));


describe("Task Service", () => {
  const userId = "user-1";
  const otherUserId = "user-2";

  const { taskRepository } = require("./mocks/task.repository.mock");

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create task with creatorId", async () => {
    taskRepository.create.mockResolvedValue({
      id: "task-1",
      title: "Test Task",
      creatorId: userId,
    });

    const task = await taskService.createTask(userId, {
      title: "Test Task",
      description: "Desc",
      dueDate: new Date().toISOString(),
      priority: "LOW",
      status: "TODO",
      assignedToId: userId,
    });

    expect(task.creatorId).toBe(userId);
  });

  test("should not allow non-owner to delete task", async () => {
    taskRepository.findById.mockResolvedValue({
      id: "task-1",
      creatorId: userId,
    });

    await expect(
      taskService.deleteTask("task-1", otherUserId)
    ).rejects.toThrow("Unauthorized: only task creator can delete");
  });

  test("should allow creator to update task", async () => {
    taskRepository.findById.mockResolvedValue({
      id: "task-1",
      creatorId: userId,
      assignedToId: otherUserId,
    });

    taskRepository.update.mockResolvedValue({
      id: "task-1",
      status: "COMPLETED",
    });

    const updated = await taskService.updateTask("task-1", userId, {
      status: "COMPLETED",
    });

    expect(updated.status).toBe("COMPLETED");
  });

  test("should emit socket event on task creation", async () => {
    // Test implementation here
  });
});