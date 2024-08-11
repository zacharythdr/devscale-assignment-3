"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../services/auth.service"));
const AuthController = {
    handleRegister: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email } = req.body;
            yield auth_service_1.default.register(req.body);
            return res
                .status(201)
                .json({ message: "Register Success", data: { name, email } });
        }
        catch (error) {
            console.error("Error during registration:", error);
            const statusCode = error.message.includes("required") ? 400 : 500;
            return res.status(statusCode).json({ message: error.message });
        }
    }),
    handleLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const login = yield auth_service_1.default.login(req.body);
            return res
                .cookie("accessToken", login.accessToken, { httpOnly: true })
                .cookie("refreshToken", login.refreshToken, { httpOnly: true })
                .status(200)
                .json({ message: "Login success!" });
        }
        catch (error) {
            let statusCode;
            console.error("Error during login:", error);
            if (error.message == "user not found") {
                statusCode = 404;
            }
            else if (error.message == "invalid password") {
                statusCode = 400;
            }
            else {
                statusCode = 500;
            }
            return res.status(statusCode).json({ message: error.message });
        }
    }),
    handleLogout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { refreshToken } = req.cookies;
        yield auth_service_1.default.logout(refreshToken);
        return res
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .status(200)
            .json({ message: "Logout successfully" });
    }),
};
exports.default = AuthController;
