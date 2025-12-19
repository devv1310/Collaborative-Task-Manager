import axios from "axios";

export const api = axios.create({
  baseURL: "https://collaborative-task-manager-g6te.onrender.com/",
  withCredentials: true, // VERY IMPORTANT (JWT cookies)
});
