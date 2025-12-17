import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { RegisterDto, LoginDto } from "../dto/auth.dto";

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const data = RegisterDto.parse(req.body);
      const user = await authService.register(data);
      res.status(201).json({ message: "User registered", user });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const data = LoginDto.parse(req.body);
      const { user, token } = await authService.login(data);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      res.json({ message: "Login successful", user });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },
};
