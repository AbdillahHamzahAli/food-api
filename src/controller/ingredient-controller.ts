import { NextFunction, Request, Response } from "express";
import {
  CreateIngredientRequest,
  UpdateIngredientRequest,
} from "../model/ingredient-model";
import { IngredientService } from "../service/ingredient-service";

export class IngredientController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateIngredientRequest =
        req.body as CreateIngredientRequest;
      request.recipeId = Number(req.params.recipeId);

      const response = await IngredientService.create(request);
      res.status(201).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const recipeId = Number(req.params.recipeId);
      const response = await IngredientService.get(recipeId);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateIngredientRequest =
        req.body as UpdateIngredientRequest;
      request.recipeId = Number(req.params.recipeId);
      request.id = Number(req.params.ingredientId);

      const response = await IngredientService.update(request);
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
      const ingredientId = Number(req.params.ingredientId);

      await IngredientService.remove(recipeId, ingredientId);
      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }
}
