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
exports.StepController = void 0;
const step_service_1 = require("../service/step-service");
class StepController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.body;
                request.recipeId = Number(req.params.recipeId);
                const response = yield step_service_1.StepService.create(request);
                res.status(201).json({
                    data: response,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recipeId = Number(req.params.recipeId);
                const response = yield step_service_1.StepService.get(recipeId);
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
                request.recipeId = Number(req.params.recipeId);
                request.id = Number(req.params.stepId);
                const response = yield step_service_1.StepService.update(request);
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
                const stepId = Number(req.params.stepId);
                yield step_service_1.StepService.remove(recipeId, stepId);
                res.status(200).json({
                    data: "OK",
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.StepController = StepController;
//# sourceMappingURL=step-controller.js.map