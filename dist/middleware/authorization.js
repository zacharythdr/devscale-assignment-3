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
exports.authorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, refreshToken } = req.cookies;
    if (!accessToken || !refreshToken) {
        return res.status(401).json({ message: "Unauthorized, Login required!" });
    }
    if (accessToken) {
        try {
            jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_KEY);
        }
        catch (error) {
            if (!refreshToken) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            try {
                jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_KEY);
                const validRefTok = yield auth_service_1.default.getAuth(refreshToken);
                if (!validRefTok) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                const payload = jsonwebtoken_1.default.decode(refreshToken);
                const newAccessToken = jsonwebtoken_1.default.sign({
                    id: payload.id,
                    name: payload.name,
                    email: payload.email,
                }, process.env.JWT_ACCESS_KEY, { expiresIn: "15m" });
                // set to cookie
                return res.cookie("accessToken", newAccessToken, { httpOnly: true });
            }
            catch (error) {
                return res.status(401).json({ message: "Unauthorized" });
            }
        }
    }
    next();
});
exports.authorization = authorization;
