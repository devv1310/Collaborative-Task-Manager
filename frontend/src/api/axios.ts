import axios from "axios";

export const api = axios.create({
  baseURL: "https://collaborative-task-manager-6721.onrender.com/",
  withCredentials: true, // VERY IMPORTANT (JWT cookies)
});
