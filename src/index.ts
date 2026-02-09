import AgentAPI from "apminsight";
AgentAPI.config();

import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import subjectsRouter from "./routes/subjects.js";
import securityMiddleware from "./middleware/security.js";
import { auth } from "./lib/auth.js";

const app = express();
const PORT = 8000;

if (!process.env.FRONTEND_URL)
  throw new Error("FRONTEND_URL is not set in the environment variables");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use(securityMiddleware);

app.use("/api/subjects", subjectsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Allthroughout the project, i used the complete file extensions ".js" whenever im importing components from other file locations all throughout the websites because ESM Modules requires them // 6:03:00
