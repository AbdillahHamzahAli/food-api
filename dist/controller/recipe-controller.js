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
exports.RecipeController = void 0;
const recipe_service_1 = require("../service/recipe-service");
class RecipeController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                const response = yield recipe_service_1.RecipeService.createRecipe(request);
                res.status(201).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recipeId = Number(req.params.recipeId);
                const response = yield recipe_service_1.RecipeService.getRecipe(recipeId);
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.id = Number(req.params.recipeId);
                const response = yield recipe_service_1.RecipeService.update(request);
                res.status(200).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recipeId = Number(req.params.recipeId);
                const response = yield recipe_service_1.RecipeService.remove(recipeId);
                res.status(200).json({
                    data: "OK",
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = {
                    title: req.query.title,
                    category: req.query.category,
                    page: req.query.page ? Number(req.query.page) : 1,
                    size: req.query.size ? Number(req.query.size) : 5,
                };
                const response = yield recipe_service_1.RecipeService.search(request);
                res.status(200).json(response);
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.RecipeController = RecipeController;
//# sourceMappingURL=recipe-controller.js.map