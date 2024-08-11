import { ILogin, ILoginResponse, IUser } from "../entities/interface";
import { Auth, User } from "../models/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AuthRepository = {
  login: async (loginInfo: ILogin): Promise<ILoginResponse> => {
    try {
      const { email, password } = loginInfo;
      // find user by email
      const user = await User.findOne({
        email,
      });

      // if user does not exist
      if (!user) {
        throw new Error("User not found");
      }

      // password validation
      const isPassMatch = await bcrypt.compare(
        password,
        user.password as string
      );

      if (!isPassMatch) {
        throw new Error("Invalid password"); // client error
      }

      // authorization
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET as string,
        {
          expiresIn: 300,
        }
      );
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET as string,
        {
          expiresIn: "30d",
        }
      );

      // TODO : Save Refresh Token to DB
      const newRefreshToken = new Auth({
        userId: user.id,
        refreshToken,
      });
      await newRefreshToken.save();
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
      throw new Error("Login failed");
    }
  },
  register: async (user: IUser) => {
    try {
      const { name, email, password } = user;
      console.log(name, email, password);

      const hashedPassword = await bcrypt.hash(password, 13);
      console.log(hashedPassword);

      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      console.log(newUser);

      return newUser;
    } catch (error) {
      console.log(error);
      console.log("Can't register");
    }
  },
  getAuth: async (refreshToken: string) => {
    try {
      const auth = await Auth.findOne({ refreshToken });
      return auth;
    } catch (error) {
      console.log(`Repository error: ${error}`);
    }
  },
  logout: async (refreshToken: string) => {
    try {
      await Auth.deleteOne({ refreshToken });
    } catch (error) {
      console.log(`Repository error: ${error}`);
    }
  },
};

export default AuthRepository;
