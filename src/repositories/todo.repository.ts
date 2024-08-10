import { ITodo } from "../entities/interface";
import { Todo } from "../models/schema";

const TodoRepository = {
  getAll: async () => {
    try {
      const allTodos = await Todo.find().populate("userId").exec();
      return allTodos;
    } catch (error) {
      console.log(`Repository Error: ${error}`);
    }
  },
  getOne: async (id: string) => {
    try {
      const singleTodo = await Todo.findById(id);
      return singleTodo;
    } catch (error) {
      console.log(`Repository Error: ${error}`);
    }
  },
  create: async (todo: ITodo) => {
    try {
      const newTodo = new Todo(todo);
      await newTodo.save();
    } catch (error) {
      console.log(`Repository Error: ${error}`);
    }
  },
  update: async (id: string, todo: ITodo) => {
    try {
      const updateTodo = await Todo.findByIdAndUpdate(id, todo);
      return updateTodo;
    } catch (error) {
      console.log(`Repository Error: ${error}`);
    }
  },
  delete: async (id: string) => {
    try {
      return await Todo.findByIdAndDelete(id);
    } catch (error) {
      console.log(`Repository Error: ${error}`);
    }
  },
};

export default TodoRepository;
