import express from "express";
import cors from "cors";

import subjectsRouter from "./routes/subjects";
import securityMiddleware from "./middleware/security";

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

app.use(express.json());

app.use(securityMiddleware);

app.use("/api/subjects", subjectsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
