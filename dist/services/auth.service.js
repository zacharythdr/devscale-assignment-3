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
const auth_repository_1 = __importDefault(require("../repositories/auth.repository"));
const AuthServices = {
    login: (loginInfo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = loginInfo;
            if (!email || !password) {
                throw new Error("Email and password is required!");
            }
            if (password.length < 8) {
                throw new Error("Password must be minimum 8 characters!");
            }
            const login = yield auth_repository_1.default.login(loginInfo);
            return login;
        }
        catch (error) {
            `Login service error: ${error}`;
            throw error;
        }
    }),
    register: (newUser) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = newUser;
            if (!name || !email || !password) {
                throw new Error("Email, name, password is required!");
            }
            if (password.length < 8) {
                throw new Error("Password must be minimum 8 characters!");
            }
            const createUser = yield auth_repository_1.default.register(newUser);
            return createUser;
        }
        catch (error) {
            `Register service error: ${error}`;
            throw error;
        }
    }),
    getAuth: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const auth = yield auth_repository_1.default.getAuth(refreshToken);
            return auth;
        }
        catch (error) {
            console.log(`Service error: ${error}`);
        }
    }),
    logout: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield auth_repository_1.default.logout(refreshToken);
        }
        catch (error) {
            console.log(`Service error: ${error}`);
        }
    }),
};
exports.default = AuthServices;
