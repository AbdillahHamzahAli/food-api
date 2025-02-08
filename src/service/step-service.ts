import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import {
  CreateStepRequest,
  StepResponse,
  toStepResponse,
  UpdateStepRequest,
} from "../model/step-model";
import { StepValidation } from "../validation/step-validation";
import { Validation } from "../validation/validation";

export class StepService {
  private static async checkRecipeExists(recipeId: number): Promise<void> {
    const recipe = await prismaClient.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      throw new ResponseError(404, "Recipe not found");
    }
  }

  private static async checkStepExists(
    recipeId: number,
    stepId: number
  ): Promise<void> {
    const step = await prismaClient.step.findFirst({
      where: {
        recipeId,
        id: stepId,
      },
    });

    if (!step) {
      throw new ResponseError(404, "Step not found");
    }
  }

  static async create(request: CreateStepRequest): Promise<StepResponse[]> {
    const createRequest = Validation.validate(StepValidation.CREATE, request);

    await this.checkRecipeExists(request.recipeId);

    return await prismaClient.$transaction(async (prisma) => {
      await prisma.step.createMany({
        data: createRequest.steps.map((step) => ({
          recipeId: createRequest.recipeId,
          stepNumber: step.stepNumber,
          instruction: step.instruction,
        })),
      });

      const createSteps = await prisma.step.findMany({
        where: {
          recipeId: createRequest.recipeId,
        },
        orderBy: {
          stepNumber: "asc",
        },
      });

      return createSteps.map(toStepResponse);
    });
  }

  static async get(recipeId: number): Promise<StepResponse[]> {
    await this.checkRecipeExists(recipeId);

    const steps = await prismaClient.step.findMany({
      where: {
        recipeId,
      },
      orderBy: {
        stepNumber: "asc",
      },
    });

    return steps.map(toStepResponse);
  }

  static async update(request: UpdateStepRequest): Promise<StepResponse> {
    await this.checkRecipeExists(request.recipeId);
    await this.checkStepExists(request.recipeId, request.id);

    const updateRequest = Validation.validate(StepValidation.UPDATE, request);

    const step = await prismaClient.step.update({
      where: {
        id: updateRequest.id,
      },
      data: {
        stepNumber: updateRequest.stepNumber,
        instruction: updateRequest.instruction,
      },
    });

    return toStepResponse(step);
  }

  static async remove(recipeId: number, stepId: number): Promise<void> {
    await this.checkRecipeExists(recipeId);
    await this.checkStepExists(recipeId, stepId);

    await prismaClient.step.delete({
      where: {
        id: stepId,
      },
    });
  }
}
