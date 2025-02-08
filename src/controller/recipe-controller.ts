import { NextFunction, Request, Response } from "express";
import {
  CreateRecipeRequest,
  SearchRecipeRequest,
  UpdateRecipeRequest,
} from "../model/recipe-model";
import { RecipeService } from "../service/recipe-service";

export class RecipeController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateRecipeRequest = req.body as CreateRecipeRequest;
      const response = await RecipeService.createRecipe(request);
      res.status(201).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const recipeId = Number(req.params.recipeId);
      const response = await RecipeService.getRecipe(recipeId);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateRecipeRequest = req.body as UpdateRecipeRequest;
      request.id = Number(req.params.recipeId);
      const response = await RecipeService.update(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const recipeId = Number(req.params.recipeId);
      const response = await RecipeService.remove(recipeId);
      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }

  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const request: SearchRecipeRequest = {
        title: req.query.title as string,
        category: req.query.category as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 5,
      };
      const response = await RecipeService.search(request);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
