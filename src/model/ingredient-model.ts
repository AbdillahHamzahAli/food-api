import { Ingredient } from "@prisma/client";

export type IngredientResponse = {
  id: number;
  name: string;
  quantity: string;
};

export type CreateIngredientRequest = {
  recipeId: number;
  ingredients: {
    name: string;
    quantity: string;
  }[];
};

export type UpdateIngredientRequest = {
  id: number;
  recipeId: number;
  name: string;
  quantity: string;
};

export function toIngredientResponse(
  ingredient: Ingredient
): IngredientResponse {
  return {
    id: ingredient.id,
    name: ingredient.name,
    quantity: ingredient.quantity,
  };
}
