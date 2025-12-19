import axios from "axios";

export const api = axios.create({
  baseURL: "https://collaborative-task-manager-fzcl.onrender.com/",
  withCredentials: true, // VERY IMPORTANT (JWT cookies)
});
