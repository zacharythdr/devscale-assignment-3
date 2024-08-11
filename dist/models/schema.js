"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = exports.Auth = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    password: String,
});
const authSchema = new mongoose_1.Schema({
    userId: String,
    refreshToken: String,
});
const todoSchema = new mongoose_1.Schema({
    todo: String,
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
exports.Auth = (0, mongoose_1.model)("Auth", authSchema);
exports.Todo = (0, mongoose_1.model)("Todo", todoSchema);
