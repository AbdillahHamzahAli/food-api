"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const user_controller_1 = require("../controller/user-controller");
const recipe_controller_1 = require("../controller/recipe-controller");
const ingredient_controller_1 = require("../controller/ingredient-controller");
const step_controller_1 = require("../controller/step-controller");
exports.apiRouter = express_1.default.Router();
exports.apiRouter.use(auth_middleware_1.AuthMiddleware);
exports.apiRouter.get("/api/users/me", user_controller_1.UserController.get);
exports.apiRouter.patch("/api/users/me", user_controller_1.UserController.update);
exports.apiRouter.post("/api/recipes", recipe_controller_1.RecipeController.create);
exports.apiRouter.put("/api/recipes/:recipeId(\\d+)", recipe_controller_1.RecipeController.update);
exports.apiRouter.delete("/api/recipes/:recipeId(\\d+)", recipe_controller_1.RecipeController.remove);
exports.apiRouter.post("/api/recipes/:recipeId(\\d+)/ingredients", ingredient_controller_1.IngredientController.create);
exports.apiRouter.put("/api/recipes/:recipeId(\\d+)/ingredients/:ingredientId(\\d+)", ingredient_controller_1.IngredientController.update);
exports.apiRouter.delete("/api/recipes/:recipeId(\\d+)/ingredients/:ingredientId(\\d+)", ingredient_controller_1.IngredientController.remove);
exports.apiRouter.post("/api/recipes/:recipeId(\\d+)/steps", step_controller_1.StepController.create);
exports.apiRouter.post("/api/recipes/:recipeId(\\d+)/steps/:stepId(\\d+)", step_controller_1.StepController.update);
exports.apiRouter.delete("/api/recipes/:recipeId(\\d+)/steps/:stepId(\\d+)", step_controller_1.StepController.remove);
//# sourceMappingURL=api.js.map