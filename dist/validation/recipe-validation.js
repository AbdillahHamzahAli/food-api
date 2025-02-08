"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeValidation = void 0;
const zod_1 = require("zod");
class RecipeValidation {
}
exports.RecipeValidation = RecipeValidation;
RecipeValidation.CREATE = zod_1.z.object({
    title: zod_1.z.string().min(3).max(100),
    description: zod_1.z.string().min(3).max(100).optional(),
    cookingTime: zod_1.z.number().min(1).max(1000),
    servings: zod_1.z.number().min(1).max(1000),
    category: zod_1.z.string().min(3).max(100),
    thumbnail: zod_1.z.string().min(3).max(100).optional(),
});
RecipeValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    title: zod_1.z.string().min(3).max(100),
    description: zod_1.z.string().min(3).max(100).optional(),
    cookingTime: zod_1.z.number().min(1).max(1000),
    servings: zod_1.z.number().min(1).max(1000),
    category: zod_1.z.string().min(3).max(100),
    thumbnail: zod_1.z.string().min(3).max(100).optional(),
});
RecipeValidation.SEARCH = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    category: zod_1.z.string().min(1).optional(),
    page: zod_1.z.number().min(1).positive(),
    size: zod_1.z.number().min(1).max(100).positive(),
});
//# sourceMappingURL=recipe-validation.js.map