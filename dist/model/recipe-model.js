"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRecipeResponse = toRecipeResponse;
const ingredient_model_1 = require("./ingredient-model");
const step_model_1 = require("./step-model");
function toRecipeResponse(recipe, ingredients, steps) {
    return {
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        cookingTime: recipe.cookingTime,
        servings: recipe.servings,
        category: recipe.category,
        thumbnail: recipe.thumbnail,
        ingredients: (ingredients === null || ingredients === void 0 ? void 0 : ingredients.map(ingredient_model_1.toIngredientResponse)) || null,
        steps: (steps === null || steps === void 0 ? void 0 : steps.map(step_model_1.toStepResponse)) || null,
    };
}
//# sourceMappingURL=recipe-model.js.map