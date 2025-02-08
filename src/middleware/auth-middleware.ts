import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { MYENV } from "../application/environment";
import { UserRequest } from "../types/user-request";
import { error } from "winston";

export const SECRET_KEY: Secret = MYENV.JWT_SECRET;

export const AuthMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    req.user = decoded as any; // TODO: Fix this any

    next();
  } catch (err) {
    res.status(401).json({
      errors: "Please authenticate",
    });
  }
};
