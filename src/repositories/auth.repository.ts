import { IUser } from "../entities/interface";
import { User } from "../models/schema";
import bcrypt from "bcrypt";

const AuthRepository = {
  login: async () => {},
  register: async (user: IUser) => {
    try {
      const { name, email, password } = user;
      const hashedPassword = await bcrypt.hash(password, 13);

      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
      console.log("Can't register");
    }
  },
  logout: async () => {},
};

export default AuthRepository;
