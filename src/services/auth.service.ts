import { ILogin, ILoginResponse, IUser } from "../entities/interface";
import AuthRepository from "../repositories/auth.repository";

const AuthServices = {
  login: async (loginInfo: ILogin): Promise<ILoginResponse> => {
    try {
      const { email, password } = loginInfo;
      if (!email || !password) {
        throw new Error("Email and password is required!");
      }

      if (password.length < 8) {
        throw new Error("Password must be minimum 8 characters!");
      }

      
      const login = await AuthRepository.login(loginInfo);
      return login;
    } catch (error) {
      `Login service error: ${error}`;
      throw error;
    }
  },
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
  getAuth: async (refreshToken: string) => {
    try {
      const auth = await AuthRepository.getAuth(refreshToken);
      return auth;
    } catch (error) {
      console.log(`Service error: ${error}`);
    }
  },
  logout: async (refreshToken: string) => {
    try {
      await AuthRepository.logout(refreshToken);
    } catch (error) {
      console.log(`Service error: ${error}`);
    }
  },
};

export default AuthServices;
