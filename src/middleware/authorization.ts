import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthServices from "../services/auth.service";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    console.log("gaada akses atau refresh token!");

    return res.status(401).json({ message: "Unauthorized, Login required!" });
  }

  if (accessToken) {
    try {
      jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);
    } catch (error) {
      if (!refreshToken) {
        console.log("refresh token ga valid!");

        return res.status(401).json({ message: "Unauthorized" });
      }

      try {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);
        const validRefTok = await AuthServices.getAuth(refreshToken);

        if (!validRefTok) {
          console.log("reftok ga valid");

          return res.status(401).json({ message: "Unauthorized" });
        }

        const payload = jwt.decode(refreshToken) as {
          id: string;
          name: string;
          email: string;
        };

        const newAccessToken = jwt.sign(
          {
            id: payload.id,
            name: payload.name,
            email: payload.email,
          },
          process.env.JWT_ACCESS_KEY as string,
          { expiresIn: "15m" }
        );

        // set to cookie
        return res.cookie("accessToken", newAccessToken, { httpOnly: true });
      } catch (error) {
        console.log(error);

        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  }
  next();
};
