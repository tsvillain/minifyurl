import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http.error";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
