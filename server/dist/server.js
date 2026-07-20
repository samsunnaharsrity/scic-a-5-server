"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const dotenv_1 = __importDefault(require("dotenv"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const app_1 = __importDefault(require("./app"));
const mongodb_1 = require("./config/mongodb");
dotenv_1.default.config();
let connected = false;
const handler = (0, serverless_http_1.default)(app_1.default);
async function default_1(req, res) {
    if (!connected) {
        await (0, mongodb_1.connectDB)();
        connected = true;
    }
    return handler(req, res);
}
