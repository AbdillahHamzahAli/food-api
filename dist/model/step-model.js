"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toStepResponse = toStepResponse;
function toStepResponse(step) {
    return {
        id: step.id,
        stepNumber: step.stepNumber,
        intruction: step.instruction,
    };
}
//# sourceMappingURL=step-model.js.map