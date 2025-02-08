"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const zod_1 = require("zod");
const response_error_1 = require("../error/response-error");
const ErrorMiddleware = (error, req, res, next) => {
    if (error instanceof zod_1.ZodError) {
        res.status(400).json({
            errors: `Validation error: ${JSON.stringify(error)}`,
        });
    }
    else if (error instanceof response_error_1.ResponseError) {
        res.status(error.status).json({
            errors: error.message,
        });
    }
    else {
        res.status(500).json({
            errors: error.message,
        });
    }
};
exports.ErrorMiddleware = ErrorMiddleware;
//# sourceMappingURL=error-middleware.js.map