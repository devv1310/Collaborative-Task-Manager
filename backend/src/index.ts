import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.routes";
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

server.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

app.use("/api/auth", authRoutes);
