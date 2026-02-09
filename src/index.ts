import AgentAPI from "apminsight";
AgentAPI.config();

import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import subjectsRouter from "./routes/subjects";
import securityMiddleware from "./middleware/security";
import { auth } from "./lib/auth";

const app = express();

// For local development
const PORT = process.env.PORT || 8000;

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

// For local development, start the server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless deployment
export default app;
