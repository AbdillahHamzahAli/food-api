import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  IngredientResponse,
  CreateIngredientRequest,
  toIngredientResponse,
  UpdateIngredientRequest,
} from "../model/ingredient-model";
import { ingredientValidation } from "../validation/ingredient-validation";
import { Validation } from "../validation/validation";

export class IngredientService {
  private static async checkRecipeExists(recipeId: number): Promise<void> {
    const recipe = await prismaClient.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      throw new ResponseError(404, "Recipe not found");
    }
  }

  private static async checkIngredientExists(
    ingredientId: number,
    recipeId: number
  ): Promise<void> {
    const ingredient = await prismaClient.ingredient.findUnique({
      where: { id: ingredientId, recipeId: recipeId },
    });
    if (!ingredient) {
      throw new ResponseError(404, "Ingredient not found");
    }
  }

  static async create(
    request: CreateIngredientRequest
  ): Promise<IngredientResponse[]> {
    const createRequest = Validation.validate(
      ingredientValidation.CREATE,
      request
    );

    await this.checkRecipeExists(request.recipeId);

    return await prismaClient.$transaction(async (prisma) => {
      await prisma.ingredient.createMany({
        data: createRequest.ingredients.map((ingredient) => ({
          recipeId: request.recipeId,
          name: ingredient.name,
          quantity: ingredient.quantity,
        })),
      });

      const createdIngredients = await prisma.ingredient.findMany({
        where: { recipeId: request.recipeId },
      });

      return createdIngredients.map(toIngredientResponse);
    });
  }

  static async get(recipeId: number): Promise<IngredientResponse[]> {
    await this.checkRecipeExists(recipeId);

    const ingredients = await prismaClient.ingredient.findMany({
      where: {
        recipeId: recipeId,
      },
    });

    return ingredients.map(toIngredientResponse);
  }

  static async update(
    request: UpdateIngredientRequest
  ): Promise<IngredientResponse> {
    await this.checkRecipeExists(request.recipeId);
    await this.checkIngredientExists(request.id, request.recipeId);

    const updateRequest = Validation.validate(
      ingredientValidation.UPDATE,
      request
    );
    const ingredient = await prismaClient.ingredient.update({
      where: { id: request.id },
      data: {
        name: updateRequest.name,
        quantity: updateRequest.quantity,
      },
    });

    return toIngredientResponse(ingredient);
  }

  static async remove(recipeId: number, ingredientId: number): Promise<void> {
    await this.checkRecipeExists(recipeId);
    await this.checkIngredientExists(ingredientId, recipeId);

    await prismaClient.ingredient.delete({
      where: { id: ingredientId },
    });

    return;
  }
}
