import { Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuth {
  userId: string;
  refreshToken: string;
}

export interface ITodo {
  todo: string;
  userId: Types.ObjectId;
}
