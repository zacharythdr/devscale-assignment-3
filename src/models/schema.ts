import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

const authSchema = new Schema({
  userId: String,
  refreshToken: String,
});

const todoSchema = new Schema({
  todo: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export const User = model("User", userSchema);
export const Auth = model("Auth", authSchema);
export const Todo = model("Todo", todoSchema);
