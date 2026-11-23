import app from "./app.js";
import dotenv from "dotenv";
import path from "node:path";
import connectDatabase from "./db/database.js";

// Handle Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({
    path: path.resolve(import.meta.dirname, "../.env"),
  });
}

// connect database
connectDatabase();

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
