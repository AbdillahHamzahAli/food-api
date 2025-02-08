import { ZodType, z } from "zod";
import { CreateIngredientRequest } from "../model/ingredient-model";

export class ingredientValidation {
  static readonly CREATE: ZodType = z.object({
    recipeId: z.number().positive(),
    ingredients: z
      .array(
        z.object({
          name: z.string().min(1),
          quantity: z.string().min(1),
        })
      )
      .min(1),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    recipeId: z.number().positive(),
    name: z.string().min(1),
    quantity: z.string().min(1),
  });
}
