import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";



const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true }
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (_: any, res: { send: (arg0: string) => void; }) => {
  res.send("API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


import { initSocket } from "./socket/socket";

const server1 = http.createServer(app);
initSocket(server1);

server1.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://YOUR_FRONTEND_URL.vercel.app"
    ],
    credentials: true,
  })
);
