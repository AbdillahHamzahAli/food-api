import { CreateStepRequest, UpdateStepRequest } from "../model/step-model";
import { Response, Request, NextFunction } from "express";
import { StepService } from "../service/step-service";

export class StepController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateStepRequest = req.body as CreateStepRequest;
      request.recipeId = Number(req.params.recipeId);
      const response = await StepService.create(request);
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
      const response = await StepService.get(recipeId);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateStepRequest = req.body as UpdateStepRequest;
      request.recipeId = Number(req.params.recipeId);
      request.id = Number(req.params.stepId);
      const response = await StepService.update(request);
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
      const stepId = Number(req.params.stepId);
      await StepService.remove(recipeId, stepId);
      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }
}
