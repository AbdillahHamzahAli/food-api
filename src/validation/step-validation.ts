import { ZodType, z } from "zod";

export class StepValidation {
  static readonly CREATE: ZodType = z.object({
    recipeId: z.number().positive(),
    steps: z
      .array(
        z.object({
          stepNumber: z.number().positive(),
          instruction: z.string().min(1),
        })
      )
      .min(1),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    recipeId: z.number().positive(),
    stepNumber: z.number().positive(),
    instruction: z.string().min(1),
  });
}
