"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("../application/database");
const environment_1 = require("../application/environment");
const response_error_1 = require("../error/response-error");
const user_model_1 = require("../model/user-model");
const user_validation_1 = require("../validation/user-validation");
const validation_1 = require("../validation/validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    static register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const regiterRequest = validation_1.Validation.validate(user_validation_1.UserValidation.REGISTER, request);
            const totalUserWithSameUsename = yield database_1.prismaClient.user.count({
                where: {
                    username: regiterRequest.username,
                },
            });
            if (totalUserWithSameUsename > 0) {
                throw new response_error_1.ResponseError(400, "Username already exists");
            }
            regiterRequest.password = yield bcrypt_1.default.hash(regiterRequest.password, 10);
            const user = yield database_1.prismaClient.user.create({
                data: regiterRequest,
            });
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const LoginRequest = validation_1.Validation.validate(user_validation_1.UserValidation.LOGIN, request);
            const user = yield database_1.prismaClient.user.findUnique({
                where: {
                    username: LoginRequest.username,
                },
            });
            if (!user) {
                throw new response_error_1.ResponseError(401, "Username or password is incorrect");
            }
            const isPasswordValid = yield bcrypt_1.default.compare(LoginRequest.password, user.password);
            if (!isPasswordValid) {
                throw new response_error_1.ResponseError(401, "Username or password is incorrect");
            }
            const token = jsonwebtoken_1.default.sign({
                name: user.name,
                username: user.username,
            }, environment_1.MYENV.JWT_SECRET, { expiresIn: "1h" });
            const response = (0, user_model_1.toUserResponse)(user);
            response.token = token;
            return response;
        });
    }
    static get(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_model_1.toUserResponse)(user);
        });
    }
    static update(user, req) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(user_validation_1.UserValidation.UPDATE, req);
            if (updateRequest.password) {
                updateRequest.password = yield bcrypt_1.default.hash(updateRequest.password, 10);
            }
            const updatedUser = yield database_1.prismaClient.user.update({
                where: {
                    username: user.username,
                },
                data: updateRequest,
            });
            return (0, user_model_1.toUserResponse)(updatedUser);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map