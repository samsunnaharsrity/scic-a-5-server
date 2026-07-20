import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import exploreToolsRoute from "./routes/exploreTools.route";
import aiRoutes from "./routes/ai.routes";
import settingsRoute from "./routes/settings.route";
import agentRoutes from "./routes/agent.route";
import dashboardRouter from "./routes/userDashboard.routes";
import adminSettingsRoute from "./routes/adminSettings.route";
import trainingRoute from "./routes/training.route";
import aiAnalyticsRoute from "./routes/aiAnalytics.route";
import promptRoute from "./routes/prompt.route";
import analyticsRoute from "./routes/analytics.route";
import reviewRoutes from "./routes/review.routes";
import templateRoutes from "./routes/template.route";
import chatHistoryRoute from "./routes/chatHistory.route";
import adminRoutes from "./routes/adminRoutes";



const app = express();

app.use(
  cors({
        origin:[
      "http://localhost:3000",
      "https://scic-a-5.vercel.app"
    ],
    credentials: true,              
  })
);
app.use(express.json());
app.use(cookieParser());




app.use("/api/user", userRoutes);


app.use("/api/exploreTools", exploreToolsRoute);



app.use("/api/ai", aiRoutes);


app.use("/api/settings", settingsRoute);



app.use(
"/api/agents",
agentRoutes
);



app.use("/api/userDashboard", dashboardRouter);


app.use(
"/api/admin",
adminSettingsRoute
);



app.use(
"/api/training",
trainingRoute
);




app.use(
"/api/ai-analytics",
aiAnalyticsRoute
);


app.use(
"/api/prompts",
promptRoute
);



app.use(
    "/api/analytics",
    analyticsRoute
);



app.use("/api", reviewRoutes);



app.use(
"/api",
chatHistoryRoute
);


app.use("/api/admin", adminRoutes)


app.use(
"/api",
templateRoutes
);

app.get("/", (req, res) => {
  res.send("🚀 SCIC A-5 Server Running...");
});

export default app;