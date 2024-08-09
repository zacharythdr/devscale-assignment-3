import { IUser } from "../entities/interface";
import AuthRepository from "../repositories/auth.repository";

const AuthServices = {
  login: async () => {},
  register: async (newUser: IUser) => {
    try {
      const { name, email, password } = newUser;
      if (!name || !email || !password) {
        throw new Error("Email, name, password is required!");
      }
      if (password.length < 8) {
        throw new Error("Password must be minimum 8 characters!");
      }
      const createUser = await AuthRepository.register(newUser);
      return createUser;
    } catch (error) {
      `Register service error: ${error}`;
      throw error;
    }
  },
  logout: async () => {},
};

export default AuthServices;
