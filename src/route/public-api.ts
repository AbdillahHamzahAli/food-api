import express from "express";
import { UserController } from "../controller/user-controller";
import { RecipeController } from "../controller/recipe-controller";
import { IngredientController } from "../controller/ingredient-controller";
import { StepController } from "../controller/step-controller";

export const publicRouter = express.Router();

publicRouter.post("/api/users", UserController.register);
publicRouter.post("/api/users/login", UserController.login);

publicRouter.get("/api/recipes/:recipeId(\\d+)", RecipeController.getById);
publicRouter.get("/api/recipes", RecipeController.search);

publicRouter.get(
  "/api/recipes/:recipeId(\\d+)/ingredients",
  IngredientController.get
);

publicRouter.get("/api/recipes/:recipeId(\\d+)/steps", StepController.get);
