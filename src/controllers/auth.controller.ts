import type { Request, Response } from "express";
import AuthServices from "../services/auth.service";

const AuthController = {
  handleRegister: async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      await AuthServices.register(req.body);
      return res
        .status(201)
        .json({ message: "Register Success", data: { name, email } });
    } catch (error: any) {
      console.error("Error during registration:", error);

      const statusCode = error.message.includes("required") ? 400 : 500;

      return res.status(statusCode).json({ message: error.message });
    }
  },
  handleLogin: async (req: Request, res: Response) => {
    try {
      const login = await AuthServices.login(req.body);
      return res
        .cookie("accessToken", login.accessToken, { httpOnly: true })
        .cookie("refreshToken", login.refreshToken, { httpOnly: true })
        .status(200)
        .json({ message: "Login success!" });
    } catch (error: any) {
      let statusCode;
      console.error("Error during login:", error);
      if (error.message == "user not found") {
        statusCode = 404;
      } else if (error.message == "invalid password") {
        statusCode = 400;
      } else {
        statusCode = 500;
      }
      return res.status(statusCode).json({ message: error.message });
    }
  },
  handleLogout: async (req: Request, res: Response) => {},
};

export default AuthController;
