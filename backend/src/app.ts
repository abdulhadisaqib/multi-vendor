import express from "express";
import dotenv from "dotenv";
import path from "node:path";

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

export default app;
