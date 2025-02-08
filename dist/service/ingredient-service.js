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
exports.IngredientService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const ingredient_model_1 = require("../model/ingredient-model");
const ingredient_validation_1 = require("../validation/ingredient-validation");
const validation_1 = require("../validation/validation");
class IngredientService {
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
    static checkIngredientExists(ingredientId, recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const ingredient = yield database_1.prismaClient.ingredient.findUnique({
                where: { id: ingredientId, recipeId: recipeId },
            });
            if (!ingredient) {
                throw new response_error_1.ResponseError(404, "Ingredient not found");
            }
        });
    }
    static create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(ingredient_validation_1.ingredientValidation.CREATE, request);
            yield this.checkRecipeExists(request.recipeId);
            return yield database_1.prismaClient.$transaction((prisma) => __awaiter(this, void 0, void 0, function* () {
                yield prisma.ingredient.createMany({
                    data: createRequest.ingredients.map((ingredient) => ({
                        recipeId: request.recipeId,
                        name: ingredient.name,
                        quantity: ingredient.quantity,
                    })),
                });
                const createdIngredients = yield prisma.ingredient.findMany({
                    where: { recipeId: request.recipeId },
                });
                return createdIngredients.map(ingredient_model_1.toIngredientResponse);
            }));
        });
    }
    static get(recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkRecipeExists(recipeId);
            const ingredients = yield database_1.prismaClient.ingredient.findMany({
                where: {
                    recipeId: recipeId,
                },
            });
            return ingredients.map(ingredient_model_1.toIngredientResponse);
        });
    }
    static update(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkRecipeExists(request.recipeId);
            yield this.checkIngredientExists(request.id, request.recipeId);
            const updateRequest = validation_1.Validation.validate(ingredient_validation_1.ingredientValidation.UPDATE, request);
            const ingredient = yield database_1.prismaClient.ingredient.update({
                where: { id: request.id },
                data: {
                    name: updateRequest.name,
                    quantity: updateRequest.quantity,
                },
            });
            return (0, ingredient_model_1.toIngredientResponse)(ingredient);
        });
    }
    static remove(recipeId, ingredientId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkRecipeExists(recipeId);
            yield this.checkIngredientExists(ingredientId, recipeId);
            yield database_1.prismaClient.ingredient.delete({
                where: { id: ingredientId },
            });
            return;
        });
    }
}
exports.IngredientService = IngredientService;
//# sourceMappingURL=ingredient-service.js.map