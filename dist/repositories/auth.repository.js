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
const schema_1 = require("../models/schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthRepository = {
    login: (loginInfo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = loginInfo;
            // find user by email
            const user = yield schema_1.User.findOne({
                email,
            });
            // if user does not exist
            if (!user) {
                throw new Error("User not found");
            }
            // password validation
            const isPassMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isPassMatch) {
                throw new Error("Invalid password"); // client error
            }
            // authorization
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
            };
            const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
                expiresIn: 300,
            });
            const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
                expiresIn: "30d",
            });
            // TODO : Save Refresh Token to DB
            const newRefreshToken = new schema_1.Auth({
                userId: user.id,
                refreshToken,
            });
            yield newRefreshToken.save();
            return { accessToken, refreshToken };
        }
        catch (error) {
            console.log(error);
            throw new Error("Login failed");
        }
    }),
    register: (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password } = user;
            console.log(name, email, password);
            const hashedPassword = yield bcrypt_1.default.hash(password, 13);
            console.log(hashedPassword);
            const newUser = new schema_1.User({ name, email, password: hashedPassword });
            yield newUser.save();
            console.log(newUser);
            return newUser;
        }
        catch (error) {
            console.log(error);
            console.log("Can't register");
        }
    }),
    getAuth: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const auth = yield schema_1.Auth.findOne({ refreshToken });
            return auth;
        }
        catch (error) {
            console.log(`Repository error: ${error}`);
        }
    }),
    logout: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema_1.Auth.deleteOne({ refreshToken });
        }
        catch (error) {
            console.log(`Repository error: ${error}`);
        }
    }),
};
exports.default = AuthRepository;
