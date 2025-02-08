"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = __importDefault(require("./application/web"));
const logging_1 = require("./application/logging");
web_1.default.listen(3000, () => {
    logging_1.logger.info("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map