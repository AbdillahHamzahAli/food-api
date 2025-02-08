"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toIngredientResponse = toIngredientResponse;
function toIngredientResponse(ingredient) {
    return {
        id: ingredient.id,
        name: ingredient.name,
        quantity: ingredient.quantity,
    };
}
//# sourceMappingURL=ingredient-model.js.map