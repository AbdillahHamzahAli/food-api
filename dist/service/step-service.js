"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const step_model_1 = require("../model/step-model");
const step_validation_1 = require("../validation/step-validation");
const validation_1 = require("../validation/validation");
class StepService {
    static checkRecipeExists(recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipe = yield database_1.prismaClient.recipe.findUnique({
                where: { id: recipeId },
            });
            if (!recipe) {
                throw new response_error_1.ResponseError(404, "Recipe not found");
            }
        });
    }
    static checkStepExists(recipeId, stepId) {
        return __awaiter(this, void 0, void 0, function* () {
            const step = yield database_1.prismaClient.step.findFirst({
                where: {
                    recipeId,
                    id: stepId,
                },
            });
            if (!step) {
                throw new response_error_1.ResponseError(404, "Step not found");
            }
        });
    }
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(step_validation_1.StepValidation.CREATE, request);
            yield this.checkRecipeExists(request.recipeId);
            return yield database_1.prismaClient.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                yield prisma.step.createMany({
                    data: createRequest.steps.map((step) => ({
                        recipeId: createRequest.recipeId,
                        stepNumber: step.stepNumber,
                        instruction: step.instruction,
                    })),
                });
                const createSteps = yield prisma.step.findMany({
                    where: {
                        recipeId: createRequest.recipeId,
                    },
                    orderBy: {
                        stepNumber: "asc",
                    },
                });
                return createSteps.map(step_model_1.toStepResponse);
            }));
        });
    }
    static get(recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkRecipeExists(recipeId);
            const steps = yield database_1.prismaClient.step.findMany({
                where: {
                    recipeId,
                },
                orderBy: {
                    stepNumber: "asc",
                },
            });
            return steps.map(step_model_1.toStepResponse);
        });
    }
    static update(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkRecipeExists(request.recipeId);
            yield this.checkStepExists(request.recipeId, request.id);
            const updateRequest = validation_1.Validation.validate(step_validation_1.StepValidation.UPDATE, request);
            const step = yield database_1.prismaClient.step.update({
                where: {
                    id: updateRequest.id,
                },
                data: {
                    stepNumber: updateRequest.stepNumber,
                    instruction: updateRequest.instruction,
                },
            });
            return (0, step_model_1.toStepResponse)(step);
        });
    }
    static remove(recipeId, stepId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkRecipeExists(recipeId);
            yield this.checkStepExists(recipeId, stepId);
            yield database_1.prismaClient.step.delete({
                where: {
                    id: stepId,
                },
            });
        });
    }
}
exports.StepService = StepService;
//# sourceMappingURL=step-service.js.map