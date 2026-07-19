"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const exploreTools_route_1 = __importDefault(require("./routes/exploreTools.route"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const settings_route_1 = __importDefault(require("./routes/settings.route"));
const agent_route_1 = __importDefault(require("./routes/agent.route"));
const userDashboard_routes_1 = __importDefault(require("./routes/userDashboard.routes"));
const adminSettings_route_1 = __importDefault(require("./routes/adminSettings.route"));
const training_route_1 = __importDefault(require("./routes/training.route"));
const aiAnalytics_route_1 = __importDefault(require("./routes/aiAnalytics.route"));
const prompt_route_1 = __importDefault(require("./routes/prompt.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/user", user_routes_1.default);
app.use("/api/exploreTools", exploreTools_route_1.default);
app.use("/api/ai", ai_routes_1.default);
app.use("/api/settings", settings_route_1.default);
app.use("/api/agents", agent_route_1.default);
app.use("/api/userDashboard", userDashboard_routes_1.default);
app.use("/api/admin", adminSettings_route_1.default);
app.use("/api/training", training_route_1.default);
app.use("/api/ai-analytics", aiAnalytics_route_1.default);
app.use("/api/prompts", prompt_route_1.default);
app.get("/", (req, res) => {
    res.send("🚀 SCIC A-5 Server Running...");
});
exports.default = app;
