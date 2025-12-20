import { io } from "socket.io-client";

export const socket = io("https://collaborative-task-manager-6721.onrender.com", {
  withCredentials: true,
});