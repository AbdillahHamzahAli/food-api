import { Step } from "@prisma/client";

export type StepResponse = {
  id: number;
  stepNumber: number;
  intruction: string;
};

export type CreateStepRequest = {
  recipeId: number;
  steps: {
    stepNumber: number;
    instruction: string;
  }[];
};

export type UpdateStepRequest = {
  id: number;
  recipeId: number;
  stepNumber: number;
  instruction: string;
};

export function toStepResponse(step: Step): StepResponse {
  return {
    id: step.id,
    stepNumber: step.stepNumber,
    intruction: step.instruction,
  };
}
