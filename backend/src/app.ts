import express from "express";
import dotenv from "dotenv";
import path from "node:path";
import ErrorHandler from "./middleware/error.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Root");
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: path.resolve(import.meta.dirname, "../.env"),
  });
}

app.use(ErrorHandler);

export default app;
