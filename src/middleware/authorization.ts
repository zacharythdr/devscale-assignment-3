import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthServices from "../services/auth.service";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;

  // Screening both tokens
  if (!accessToken || !refreshToken) {
    return res.status(401).json({ message: "Unauthorized, Login required!" });
  }

  // Screening accessToken
  if (accessToken) {
    try {
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY as string);
    } catch (error) {
      // Screening refreshToken
      if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Generate new accessToken
      try {
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY as string);
        const validRefTok = await AuthServices.getAuth(refreshToken);

        // Screening refreshToken on Db
        if (!validRefTok) {
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
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  }
  next();
};
