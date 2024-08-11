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
const todo_service_1 = __importDefault(require("../services/todo.service"));
const TodoController = {
    handleGetAllTodos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const todos = yield todo_service_1.default.getAll();
            return res.status(200).json({ message: "Get All Success", data: todos });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }),
    handleGetSingleTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const todoId = req.params.id;
            const todo = yield todo_service_1.default.getOne(todoId);
            return res.status(200).json({ message: "Get Todo Success", data: todo });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }),
    handleCreateTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, todo } = req.body;
            const newTodo = yield todo_service_1.default.create({ userId, todo });
            return res
                .status(200)
                .json({ message: "Create Todo Success", data: todo });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }),
    handleUpdateTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const todoId = req.params.id;
            const updateTodo = yield todo_service_1.default.update(todoId, req.body);
            return res
                .status(200)
                .json({ message: "Update Todo Success", data: updateTodo });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }),
    handleDeleteTodo: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("test dleete");
            const todoId = req.params.id;
            console.log(todoId);
            const deleteTodo = yield todo_service_1.default.delete(todoId);
            return res
                .status(200)
                .json({ message: "Delete Todo Success", deletedData: deleteTodo });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: error });
        }
    }),
};
exports.default = TodoController;
