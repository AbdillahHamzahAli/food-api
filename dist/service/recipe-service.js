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
exports.RecipeService = void 0;
const database_1 = require("../application/database");
const response_error_1 = require("../error/response-error");
const recipe_model_1 = require("../model/recipe-model");
const recipe_validation_1 = require("../validation/recipe-validation");
const validation_1 = require("../validation/validation");
class RecipeService {
    static createRecipe(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const createRequest = validation_1.Validation.validate(recipe_validation_1.RecipeValidation.CREATE, request);
            const newRecipe = yield database_1.prismaClient.recipe.create({
                data: createRequest,
            });
            return (0, recipe_model_1.toRecipeResponse)(newRecipe);
        });
    }
    static getRecipe(recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipe = yield database_1.prismaClient.recipe.findUnique({
                where: {
                    id: recipeId,
                },
                include: {
                    ingredients: true,
                    steps: true,
                },
            });
            if (!recipe) {
                throw new response_error_1.ResponseError(404, `Recipe with ID ${recipeId} not found`);
            }
            return (0, recipe_model_1.toRecipeResponse)(recipe, recipe.ingredients, recipe.steps);
        });
    }
    static update(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateRequest = validation_1.Validation.validate(recipe_validation_1.RecipeValidation.UPDATE, request);
            const isExists = yield database_1.prismaClient.recipe.findUnique({
                where: { id: request.id },
            });
            if (!isExists) {
                throw new response_error_1.ResponseError(404, `Recipe not found`);
            }
            const recipe = yield database_1.prismaClient.recipe.update({
                where: { id: updateRequest.id },
                data: updateRequest,
            });
            return (0, recipe_model_1.toRecipeResponse)(recipe);
        });
    }
    static remove(recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExists = yield database_1.prismaClient.recipe.findUnique({
                where: { id: recipeId },
            });
            if (!isExists) {
                throw new response_error_1.ResponseError(404, `Recipe not found`);
            }
            const recipe = yield database_1.prismaClient.recipe.delete({
                where: { id: recipeId },
                include: {
                    ingredients: true,
                    steps: true,
                },
            });
            return (0, recipe_model_1.toRecipeResponse)(recipe);
        });
    }
    static search(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchRequest = validation_1.Validation.validate(recipe_validation_1.RecipeValidation.SEARCH, request);
            const skip = (searchRequest.page - 1) * searchRequest.size;
            const filters = {};
            if (searchRequest.title) {
                filters.title = {
                    contains: searchRequest.title,
                };
            }
            if (searchRequest.category) {
                filters.category = {
                    contains: searchRequest.category,
                };
            }
            const recipes = yield database_1.prismaClient.recipe.findMany({
                where: filters,
                include: {
                    ingredients: true,
                    steps: true,
                },
                take: searchRequest.size,
                skip: skip,
            });
            const total = yield database_1.prismaClient.recipe.count({
                where: filters,
            });
            return {
                data: recipes.map((recipe) => (0, recipe_model_1.toRecipeResponse)(recipe, recipe.ingredients, recipe.steps)),
                paging: {
                    current_page: searchRequest.page,
                    size: searchRequest.size,
                    total_page: Math.ceil(total / searchRequest.size),
                },
            };
        });
    }
}
exports.RecipeService = RecipeService;
//# sourceMappingURL=recipe-service.js.map