"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user-controller");
const recipe_controller_1 = require("../controller/recipe-controller");
const ingredient_controller_1 = require("../controller/ingredient-controller");
const step_controller_1 = require("../controller/step-controller");
exports.publicRouter = express_1.default.Router();
exports.publicRouter.post("/api/users", user_controller_1.UserController.register);
exports.publicRouter.post("/api/users/login", user_controller_1.UserController.login);
exports.publicRouter.get("/api/recipes/:recipeId(\\d+)", recipe_controller_1.RecipeController.getById);
exports.publicRouter.get("/api/recipes", recipe_controller_1.RecipeController.search);
exports.publicRouter.get("/api/recipes/:recipeId(\\d+)/ingredients", ingredient_controller_1.IngredientController.get);
exports.publicRouter.get("/api/recipes/:recipeId(\\d+)/steps", step_controller_1.StepController.get);
//# sourceMappingURL=public-api.js.map