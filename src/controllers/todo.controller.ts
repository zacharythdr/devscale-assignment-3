import type { Request, Response } from "express";
import TodoServices from "../services/todo.service";

const TodoController = {
  handleGetAllTodos: async (req: Request, res: Response) => {
    try {
      const todos = await TodoServices.getAll();
      return res.status(200).json({ message: "Get All Success", data: todos });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  },
  handleGetSingleTodo: async (req: Request, res: Response) => {
    try {
      const todoId = req.params.id;
      const todo = await TodoServices.getOne(todoId);
      return res.status(200).json({ message: "Get Todo Success", data: todo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  },
  handleCreateTodo: async (req: Request, res: Response) => {
    try {
      const { userId, todo } = req.body;
      const newTodo = await TodoServices.create({ userId, todo });
      return res
        .status(200)
        .json({ message: "Create Todo Success", data: todo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  },
  handleUpdateTodo: async (req: Request, res: Response) => {
    try {
      const { todo } = req.body;
      const todoId = req.params.id;
      const updateTodo = await TodoServices.update(todoId, todo);
      return res
        .status(200)
        .json({ message: "Update Todo Success", data: updateTodo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  },
  handleDeleteTodo: async (req: Request, res: Response) => {
    try {
      const todoId = req.params.id;
      const deleteTodo = await TodoServices.delete(todoId);
      return res
        .status(200)
        .json({ message: "Delete Todo Success", data: deleteTodo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  },
};

export default TodoController;
