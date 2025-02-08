"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientValidation = void 0;
const zod_1 = require("zod");
class ingredientValidation {
}
exports.ingredientValidation = ingredientValidation;
ingredientValidation.CREATE = zod_1.z.object({
    recipeId: zod_1.z.number().positive(),
    ingredients: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string().min(1),
        quantity: zod_1.z.string().min(1),
    }))
        .min(1),
});
ingredientValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    recipeId: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1),
    quantity: zod_1.z.string().min(1),
});
//# sourceMappingURL=ingredient-validation.js.map