import { api } from "./axios";

export const fetchTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (data: any) => {
  const res = await api.post("/tasks", data);
  return res.data;
};

export const updateTask = async (id: string, data: any) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};
export const assignTask = async (id: string, userId: string) => {
  const res = await api.post(`/tasks/${id}/assign`, { userId });
  return res.data;
}