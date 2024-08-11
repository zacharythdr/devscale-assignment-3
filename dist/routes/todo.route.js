"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const todo_controller_1 = __importDefault(require("../controllers/todo.controller"));
const authorization_1 = require("../middleware/authorization");
exports.todoRouter = express_1.default.Router();
exports.todoRouter.use(authorization_1.authorization);
exports.todoRouter.get("/", todo_controller_1.default.handleGetAllTodos);
exports.todoRouter.get("/:id", todo_controller_1.default.handleGetSingleTodo);
exports.todoRouter.post("/", todo_controller_1.default.handleCreateTodo);
exports.todoRouter.patch("/:id", todo_controller_1.default.handleUpdateTodo);
exports.todoRouter.delete("/:id", todo_controller_1.default.handleDeleteTodo);
