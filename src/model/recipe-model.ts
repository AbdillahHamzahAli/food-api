import { Ingredient, Recipe, Step } from "@prisma/client";
import { IngredientResponse, toIngredientResponse } from "./ingredient-model";
import { StepResponse, toStepResponse } from "./step-model";

export type RecipeResponse = {
  id: number;
  title: string;
  description?: string | null;
  cookingTime: number;
  servings: number;
  category: string;
  thumbnail?: string | null;
  ingredients?: IngredientResponse[] | null;
  steps?: StepResponse[] | null;
};

export type CreateRecipeRequest = {
  title: string;
  description?: string;
  cookingTime: number;
  servings: number;
  category: string;
  thumbnail?: string;
};

export type UpdateRecipeRequest = {
  id: number;
  title: string;
  description?: string;
  cookingTime: number;
  servings: number;
  category: string;
  thumbnail?: string;
};

export type SearchRecipeRequest = {
  title?: string;
  category?: string;
  page: number;
  size: number;
};

export function toRecipeResponse(
  recipe: Recipe,
  ingredients?: Ingredient[],
  steps?: Step[]
): RecipeResponse {
  return {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    cookingTime: recipe.cookingTime,
    servings: recipe.servings,
    category: recipe.category,
    thumbnail: recipe.thumbnail,
    ingredients: ingredients?.map(toIngredientResponse) || null,
    steps: steps?.map(toStepResponse) || null,
  };
}
