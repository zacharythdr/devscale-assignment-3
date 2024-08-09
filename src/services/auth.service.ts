import express from "express";
import AuthController from "../controllers/auth.controller";

export const authRouter = express.Router();
authRouter.post("/register", AuthController.handleRegister);
authRouter.post("/login", AuthController.handleLogin);
authRouter.post("/logout", AuthController.handleLogout);
