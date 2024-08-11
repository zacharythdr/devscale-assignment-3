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
const todo_repository_1 = __importDefault(require("../repositories/todo.repository"));
const TodoServices = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allTodos = yield todo_repository_1.default.getAll();
            if (!allTodos) {
                throw new Error("No todos found");
            }
            console.log(allTodos);
            const transformedTodos = allTodos.map((todo) => {
                var _a;
                return ({
                    _id: todo._id,
                    todo: todo.todo,
                    userName: (_a = todo.userId) === null || _a === void 0 ? void 0 : _a.name,
                });
            });
            return transformedTodos;
        }
        catch (error) {
            console.log(`Service Error: ${error}`);
            throw error;
        }
    }),
    getOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const singleTodo = yield todo_repository_1.default.getOne(id);
            return singleTodo;
        }
        catch (error) {
            console.log(`Service Error: ${error}`);
            throw error;
        }
    }),
    create: (newTodo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, todo } = newTodo;
            if (!userId || !todo) {
                throw new Error("userId and todo is required!");
            }
            return yield todo_repository_1.default.create(newTodo);
        }
        catch (error) {
            console.log(`Service Error: ${error}`);
            throw error;
        }
    }),
    update: (id, todo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!todo.todo) {
                throw new Error("todo is required!");
            }
            return yield todo_repository_1.default.update(id, todo);
        }
        catch (error) {
            console.log(`Service Error: ${error}`);
            throw error;
        }
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield todo_repository_1.default.delete(id);
        }
        catch (error) {
            console.log(`Service Error: ${error}`);
            throw error;
        }
    }),
};
exports.default = TodoServices;
