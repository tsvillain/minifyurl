import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http.error";
import { createResponse } from "../utils/response";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpError) {
    res.status(error.status).json(createResponse("error", error.message, null));
  } else {
    res
      .status(500)
      .json(createResponse("error", "Internal Server Error", null));
  }
};
