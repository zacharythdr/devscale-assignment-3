import express from "express";
import TodoController from "../controllers/todo.controller";
import { authorization } from "../middleware/authorization";

export const todoRouter = express.Router();
todoRouter.use(authorization);

todoRouter.get("/", TodoController.handleGetAllTodos);
todoRouter.get("/:id", TodoController.handleGetSingleTodo);
todoRouter.post("/", TodoController.handleCreateTodo);
todoRouter.patch("/:id", TodoController.handleUpdateTodo);
todoRouter.delete("/:id", TodoController.handleDeleteTodo);
