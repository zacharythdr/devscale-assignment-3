import type { Request, Response } from "express";
import AuthServices from "../services/auth.service";

const AuthController = {
  handleRegister: async (req: Request, res: Response) => {
    const { name, email } = req.body;
    await AuthServices.register(req.body);
    return res
      .status(201)
      .json({ message: "Register Success", data: { name, email } });
  },
  handleLogin: async (req: Request, res: Response) => {},
  handleLogout: async (req: Request, res: Response) => {},
};

export default AuthController;
