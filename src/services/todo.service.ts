import { ITodo } from "../entities/interface";
import TodoRepository from "../repositories/todo.repository";

const TodoServices = {
  getAll: async () => {
    try {
      const allTodos = await TodoRepository.getAll();
      return allTodos;
    } catch (error) {
      console.log(`Service Error: ${error}`);
    }
  },
  getOne: async (id: string) => {
    try {
      const singleTodo = await TodoRepository.getOne(id);
      return singleTodo;
    } catch (error) {
      console.log(`Service Error: ${error}`);
    }
  },
  create: async (newTodo: ITodo) => {
    try {
      const { userId, todo } = newTodo;
      if (!userId || !todo) {
        throw new Error("userId and todo is required!");
      }
      return await TodoRepository.create(newTodo);
    } catch (error) {
      console.log(`Service Error: ${error}`);
      throw error;
    }
  },
  update: async (id: string, todo: ITodo) => {
    try {
      if (!todo.todo) {
        throw new Error("todo is required!");
      }
      return await TodoRepository.update(id, todo);
    } catch (error) {
      console.log(`Service Error: ${error}`);
      throw error;
    }
  },
  delete: async (id: string) => {
    try {
      return await TodoRepository.delete(id);
    } catch (error) {
      console.log(`Service Error: ${error}`);
    }
  },
};

export default TodoServices;
