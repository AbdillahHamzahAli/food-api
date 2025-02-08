import { Recipe } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";
import {
  CreateRecipeRequest,
  RecipeResponse,
  SearchRecipeRequest,
  toRecipeResponse,
  UpdateRecipeRequest,
} from "../model/recipe-model";
import { RecipeValidation } from "../validation/recipe-validation";
import { Validation } from "../validation/validation";
import { tuple } from "zod";

export class RecipeService {
  static async createRecipe(
    request: CreateRecipeRequest
  ): Promise<RecipeResponse> {
    const createRequest = Validation.validate(RecipeValidation.CREATE, request);

    const newRecipe = await prismaClient.recipe.create({
      data: createRequest,
    });

    return toRecipeResponse(newRecipe);
  }

  static async getRecipe(recipeId: number): Promise<RecipeResponse> {
    const recipe = await prismaClient.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        ingredients: true,
        steps: true,
      },
    });

    if (!recipe) {
      throw new ResponseError(404, `Recipe with ID ${recipeId} not found`);
    }

    return toRecipeResponse(recipe, recipe.ingredients, recipe.steps);
  }

  static async update(request: UpdateRecipeRequest): Promise<RecipeResponse> {
    const updateRequest = Validation.validate(RecipeValidation.UPDATE, request);
    const isExists = await prismaClient.recipe.findUnique({
      where: { id: request.id },
    });

    if (!isExists) {
      throw new ResponseError(404, `Recipe not found`);
    }

    const recipe = await prismaClient.recipe.update({
      where: { id: updateRequest.id },
      data: updateRequest,
    });

    return toRecipeResponse(recipe);
  }

  static async remove(recipeId: number): Promise<RecipeResponse> {
    const isExists = await prismaClient.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!isExists) {
      throw new ResponseError(404, `Recipe not found`);
    }

    const recipe = await prismaClient.recipe.delete({
      where: { id: recipeId },
      include: {
        ingredients: true,
        steps: true,
      },
    });

    return toRecipeResponse(recipe);
  }

  static async search(
    request: SearchRecipeRequest
  ): Promise<Pageable<RecipeResponse>> {
    const searchRequest = Validation.validate(RecipeValidation.SEARCH, request);
    const skip = (searchRequest.page - 1) * searchRequest.size;

    const filters: any = {};

    if (searchRequest.title) {
      filters.title = {
        contains: searchRequest.title,
      };
    }

    if (searchRequest.category) {
      filters.category = {
        contains: searchRequest.category,
      };
    }

    const recipes = await prismaClient.recipe.findMany({
      where: filters,
      include: {
        ingredients: true,
        steps: true,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await prismaClient.recipe.count({
      where: filters,
    });

    return {
      data: recipes.map((recipe) =>
        toRecipeResponse(recipe, recipe.ingredients, recipe.steps)
      ),
      paging: {
        current_page: searchRequest.page,
        size: searchRequest.size,
        total_page: Math.ceil(total / searchRequest.size),
      },
    };
  }
}
