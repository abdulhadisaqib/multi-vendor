import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import ErrorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: path.resolve(import.meta.dirname, "../.env"),
  });
}

app.use(ErrorHandler);

export default app;
