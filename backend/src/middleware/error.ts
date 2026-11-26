import type { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import mongoose from "mongoose";

export default (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  //wrong mongodb id Error
  if (err instanceof mongoose.Error.CastError) {
    const message = `Resources not found with this id. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //duploicate key Error
  if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //wrong jwt Error
  if (err instanceof Error && err.name === "JsonWebTokenError") {
    const message = "Your url is Invalid please try again later";
    err = new ErrorHandler(message, 400); //JWT errors use 400 to match the tutorial, not 401
  }

  //jwt expired
  if (err instanceof Error && err.name === "TokenExpiredError") {
    const message = "Your url is expired please try again later";
    err = new ErrorHandler(message, 400); //JWT errors use 400 to match the tutorial, not 401
  }

  if (err instanceof ErrorHandler) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
};
