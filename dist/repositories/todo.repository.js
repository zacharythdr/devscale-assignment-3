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
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../models/schema");
const TodoRepository = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allTodos = yield schema_1.Todo.find().populate("userId").exec();
            return allTodos;
        }
        catch (error) {
            console.log(`Repository Error: ${error}`);
        }
    }),
    getOne: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const singleTodo = yield schema_1.Todo.findById(id);
            return singleTodo;
        }
        catch (error) {
            console.log(`Repository Error: ${error}`);
        }
    }),
    create: (todo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newTodo = new schema_1.Todo(todo);
            yield newTodo.save();
        }
        catch (error) {
            console.log(`Repository Error: ${error}`);
        }
    }),
    update: (id, todo) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updateTodo = yield schema_1.Todo.findByIdAndUpdate(id, todo);
            console.log(updateTodo);
            return updateTodo;
        }
        catch (error) {
            console.log(`Repository Error: ${error}`);
        }
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield schema_1.Todo.findByIdAndDelete(id);
        }
        catch (error) {
            console.log(`Repository Error: ${error}`);
        }
    }),
};
exports.default = TodoRepository;
