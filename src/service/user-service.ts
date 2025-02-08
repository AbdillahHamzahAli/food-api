import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { MYENV } from "../application/environment";
import { ResponseError } from "../error/response-error";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const regiterRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const totalUserWithSameUsename = await prismaClient.user.count({
      where: {
        username: regiterRequest.username,
      },
    });

    if (totalUserWithSameUsename > 0) {
      throw new ResponseError(400, "Username already exists");
    }

    regiterRequest.password = await bcrypt.hash(regiterRequest.password, 10);

    const user = await prismaClient.user.create({
      data: regiterRequest,
    });

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const LoginRequest = Validation.validate(UserValidation.LOGIN, request);

    const user = await prismaClient.user.findUnique({
      where: {
        username: LoginRequest.username,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Username or password is incorrect");
    }

    const isPasswordValid = await bcrypt.compare(
      LoginRequest.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ResponseError(401, "Username or password is incorrect");
    }

    const token = jwt.sign(
      {
        name: user.name,
        username: user.username,
      },
      MYENV.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const response = toUserResponse(user);

    response.token = token;
    return response;
  }

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  static async update(
    user: User,
    req: UpdateUserRequest
  ): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, req);

    if (updateRequest.password) {
      updateRequest.password = await bcrypt.hash(updateRequest.password, 10);
    }

    const updatedUser = await prismaClient.user.update({
      where: {
        username: user.username,
      },
      data: updateRequest,
    });

    return toUserResponse(updatedUser);
  }
  // No Logout Because JWT is stateless
}
