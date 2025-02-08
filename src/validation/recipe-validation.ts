import { z, ZodType } from "zod";

export class RecipeValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(100).optional(),
    cookingTime: z.number().min(1).max(1000),
    servings: z.number().min(1).max(1000),
    category: z.string().min(3).max(100),
    thumbnail: z.string().min(3).max(100).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(100).optional(),
    cookingTime: z.number().min(1).max(1000),
    servings: z.number().min(1).max(1000),
    category: z.string().min(3).max(100),
    thumbnail: z.string().min(3).max(100).optional(),
  });

  static readonly SEARCH: ZodType = z.object({
    title: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
