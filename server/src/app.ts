import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import exploreToolsRoute from "./routes/exploreTools.route";
import aiRoutes from "./routes/ai.routes";

const app = express();

app.use(
  cors({
    origin: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    credentials: true,              
  })
);app.use(express.json());
app.use(cookieParser());




app.use("/api/user", userRoutes);


app.use("/api/exploreTools", exploreToolsRoute);



app.use(
"/api/ai",
aiRoutes
);




app.get("/", (req, res) => {
  res.send("🚀 SCIC A-5 Server Running...");
});

export default app;