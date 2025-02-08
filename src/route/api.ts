import express from "express";
import { AuthMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { RecipeController } from "../controller/recipe-controller";
import { IngredientController } from "../controller/ingredient-controller";
import { StepController } from "../controller/step-controller";

export const apiRouter = express.Router();
apiRouter.use(AuthMiddleware);

apiRouter.get("/api/users/me", UserController.get);
apiRouter.patch("/api/users/me", UserController.update);

apiRouter.post("/api/recipes", RecipeController.create);
apiRouter.put("/api/recipes/:recipeId(\\d+)", RecipeController.update);
apiRouter.delete("/api/recipes/:recipeId(\\d+)", RecipeController.remove);

apiRouter.post(
  "/api/recipes/:recipeId(\\d+)/ingredients",
  IngredientController.create
);
apiRouter.put(
  "/api/recipes/:recipeId(\\d+)/ingredients/:ingredientId(\\d+)",
  IngredientController.update
);
apiRouter.delete(
  "/api/recipes/:recipeId(\\d+)/ingredients/:ingredientId(\\d+)",
  IngredientController.remove
);

apiRouter.post("/api/recipes/:recipeId(\\d+)/steps", StepController.create);
apiRouter.post(
  "/api/recipes/:recipeId(\\d+)/steps/:stepId(\\d+)",
  StepController.update
);
apiRouter.delete(
  "/api/recipes/:recipeId(\\d+)/steps/:stepId(\\d+)",
  StepController.remove
);
