"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepValidation = void 0;
const zod_1 = require("zod");
class StepValidation {
}
exports.StepValidation = StepValidation;
StepValidation.CREATE = zod_1.z.object({
    recipeId: zod_1.z.number().positive(),
    steps: zod_1.z
        .array(zod_1.z.object({
        stepNumber: zod_1.z.number().positive(),
        instruction: zod_1.z.string().min(1),
    }))
        .min(1),
});
StepValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    recipeId: zod_1.z.number().positive(),
    stepNumber: zod_1.z.number().positive(),
    instruction: zod_1.z.string().min(1),
});
//# sourceMappingURL=step-validation.js.map